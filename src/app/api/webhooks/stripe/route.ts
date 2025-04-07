import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/utils/prismaDB";

// Disable body parsing for raw Stripe signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle subscription lifecycle events
  if (
    event.type === "checkout.session.completed" ||
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated"
  ) {
    const session = event.data.object as Stripe.Checkout.Session | Stripe.Subscription;

    let email: string | undefined;

    // Try multiple ways to extract email
    if ("customer_email" in session && session.customer_email) {
      email = session.customer_email;
    } else if ("customer_details" in session && session.customer_details?.email) {
      email = session.customer_details.email;
    } else if ("customer" in session && typeof session.customer === "string") {
      const customer = await stripe.customers.retrieve(session.customer);
      if (customer && !("deleted" in customer)) {
        email = (customer as Stripe.Customer).email ?? undefined;
      }
    }

    const subscriptionData =
      "current_period_end" in session
        ? session
        : (session as any).subscription;

    if (email && subscriptionData?.current_period_end) {
      const periodEnd = new Date(subscriptionData.current_period_end * 1000);

      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        // 1. Update premium status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            isPremium: true,
            premiumExpiry: periodEnd,
          },
        });

        // 2. Record the payment
        if ("amount_total" in session && session.amount_total) {
          await prisma.stripePayment.create({
            data: {
              userId: user.id,
              amount: session.amount_total / 100, // Stripe sends cents
            },
          });
        }

        console.log(`✅ Premium activated for ${email} until ${periodEnd.toLocaleString()}`);
      }
    } else {
      console.warn("⚠️ Missing email or subscription period end. User not updated.");
    }
  }

  return NextResponse.json({ received: true });
}
