import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/utils/prismaDB";

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
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  const eventType = event.type;
  console.log("📦 Stripe webhook event received:", eventType);

  // Helper: Get user email from event object
  async function resolveEmail(obj: any): Promise<string | undefined> {
    if ('customer_email' in obj && obj.customer_email) return obj.customer_email;
    if ('customer_details' in obj && obj.customer_details?.email) return obj.customer_details.email;
    if ('customer' in obj && typeof obj.customer === "string") {
      const customer = await stripe.customers.retrieve(obj.customer);
      if (customer && !("deleted" in customer)) {
        return (customer as Stripe.Customer).email ?? undefined;
      }
    }
    return undefined;
  }

  // ✅ Handle one-time checkout payment (optional, doesn't upgrade user)
  if (eventType === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = await resolveEmail(session);
    const amountTotal = session.amount_total;

    if (!email || !amountTotal) {
      console.warn("⚠️ Missing email or amount in checkout session");
      return NextResponse.json({ status: "ignored" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      await prisma.stripePayment.create({
        data: {
          userId: user.id,
          amount: amountTotal / 100,
        },
      });
      console.log(`💸 Recorded payment for ${email}`);
    } else {
      console.warn(`⚠️ User not found for payment recording: ${email}`);
    }
  }

  // ✅ Handle subscription created/updated
  if (
    eventType === "customer.subscription.created" ||
    eventType === "customer.subscription.updated"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const email = await resolveEmail(subscription);

    if (!email || !subscription.current_period_end) {
      console.warn("⚠️ Missing email or period end in subscription update");
      return NextResponse.json({ status: "ignored" });
    }

    const premiumExpiry = new Date(subscription.current_period_end * 1000);

    try {
      await prisma.user.update({
        where: { email },
        data: {
          isPremium: true,
          premiumExpiry,
        },
      });

      console.log(`✅ ${email} upgraded to Premium until ${premiumExpiry.toLocaleString()}`);
    } catch (err) {
      console.error(`❌ Failed to upgrade ${email} to Premium:`, err);
    }
  }

  return NextResponse.json({ received: true });
}
