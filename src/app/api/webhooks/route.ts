import { NextResponse } from 'next/server'; 
import Stripe from 'stripe';
import { prisma } from '@/utils/prismaDB';

// Tell Next.js to disable body parsing (Stripe needs raw body)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  // Get raw body and Stripe signature
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle subscription events
  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    const session = event.data.object as Stripe.Checkout.Session | Stripe.Subscription;

    let email: string | undefined;

    // 1. Try to extract email in different ways
    if ('customer_email' in session && session.customer_email) {
      email = session.customer_email;
    } else if ('customer_details' in session && session.customer_details?.email) {
      email = session.customer_details.email;
    } else if ('customer' in session && typeof session.customer === 'string') {
      const customer = await stripe.customers.retrieve(session.customer);
      if (customer && !('deleted' in customer)) {
        email = (customer as Stripe.Customer).email ?? undefined;
      }
    }

    // 2. Try to get the subscription period end time
    const subscriptionData =
      'current_period_end' in session
        ? session
        : (session as any).subscription;

    // Check if period end is valid before converting
    if (email && subscriptionData?.current_period_end) {
      const periodEnd = new Date(subscriptionData.current_period_end * 1000); // convert from seconds to ms

      // 3. Update user in the database
      await prisma.user.updateMany({
        where: { email },
        data: {
          isPremium: true,
          premiumExpiry: periodEnd,
        },
      });

      console.log(`✅ Premium activated for ${email} until ${periodEnd.toLocaleString()}`);
    } else {
      console.warn('⚠️ Could not update user. Missing email or subscription period end.');
    }
  }

  // Respond to Stripe
  return NextResponse.json({ received: true });
}
