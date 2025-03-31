import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/utils/prismaDB';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  const rawBody = await req.text(); // use `text()` instead of `buffer()` if needed
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle only subscription creation or update
  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    const session = event.data.object as any;

    const email = session.customer_email || session.customer_details?.email;
    const subscription = session.subscription || session;

    const periodEnd = new Date(subscription.current_period_end * 1000); // Convert to ms

    //  Update user in DB
    if (email) {
      await prisma.user.updateMany({
        where: { email },
        data: {
          isPremium: true,
          premiumExpiry: periodEnd,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
