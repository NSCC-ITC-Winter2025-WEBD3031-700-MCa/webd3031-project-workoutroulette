import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prismaDB';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      isPremium: true,
      premiumExpiry: true,
      monthlySpins: true,
      spinResetDate: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const now = new Date();
  const resetDate = user.spinResetDate ? new Date(user.spinResetDate) : null;

  console.log('🕒 Now:', now.toLocaleString()); // 
console.log('🔁 Reset At:', resetDate?.toLocaleString()); // 

  // ✅ Reset spins every 1 minute
  
  if (!resetDate || now.getTime() > resetDate.getTime()) {
    const newResetDate = new Date(now);
    newResetDate.setMonth(newResetDate.getMonth() + 1); // 🔁 Reset exactly 1 month later
    // const newResetDate = new Date(now.getTime() + 1 * 60 * 1000); // 🔁 1-minute reset for testing

    await prisma.user.update({
      where: { email: user.email! },
      data: {
        monthlySpins: 0,
        spinResetDate: newResetDate,
      },
    });

    console.log('✅ Spins reset. Next reset at:', newResetDate.toISOString());

    user.monthlySpins = 0;
    user.spinResetDate = newResetDate;
  }

  // ✅ Check Premium
  const isPremium =
    user.isPremium &&
    user.premiumExpiry &&
    new Date(user.premiumExpiry) > now;

  // ✅ Apply spin limit for non-premium users
  if (!isPremium && user.monthlySpins >= 20) {
    return NextResponse.json(
      {
        error:
          'You’ve reached your 20 free spins. Please wait until your spin reset date or upgrade to WR Premium for unlimited spins.',
      },
      { status: 403 }
    );
  }

  const body = await request.json();
  const workouts: string[] = body.exercises;

  if (!workouts || workouts.length === 0) {
    return NextResponse.json({ error: 'No exercises provided.' }, { status: 400 });
    
  }

  const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];

  //  Count spins for non-premium users
  if (!isPremium) {
    await prisma.user.update({
      where: { email: user.email! },
      data: {
        monthlySpins: { increment: 1 },
      },
    });

    user.monthlySpins += 1;
  }

  return NextResponse.json({
    success: true,
    workout: `Your workout is: ${randomWorkout}`,
    isPremium,
    spinsUsed: user.monthlySpins,
    spinResetDate: user.spinResetDate?.toISOString(), // 👈 Add this
  });
}
