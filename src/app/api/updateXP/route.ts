import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";
import { xpForLevel, getLevelFromXp } from "@/utils/XP";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { xpEarned } = await req.json();
    if (typeof xpEarned !== "number") {
      return NextResponse.json({ message: "Invalid xpEarned" }, { status: 400 });
    }

    // Get the user's ID from session
    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "User not found in session" }, { status: 404 });
    }

    // Fetch the user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Calculate new XP & level
    const newXp = user.xp + xpEarned;
    const newLevel = getLevelFromXp(newXp);

    // Update user in DB
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXp,
        level: newLevel,
      },
    });

    return NextResponse.json({ xp: newXp, level: newLevel }, { status: 200 });
  } catch (err) {
    console.error("Error updating XP:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
