// /app/api/webhooks/stripe/route.ts
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

  // Define a shared email resolution strategy
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

  // Handle checkout session (payment success)
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
          amount: amountTotal / 100, // Convert cents to dollars
        },
      });
    }

    console.log(`✅ Payment recorded for ${email}`);
  }

  // Handle subscription creation/updates
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

    const premiumExpiry = new Date(subscription.current_period_end * 1000); // Convert from seconds

    await prisma.user.updateMany({
      where: { email },
      data: {
        isPremium: true,
        premiumExpiry,
      },
    });

    console.log(`✅ Updated premium for ${email} until ${premiumExpiry.toLocaleString()}`);
  }

  return NextResponse.json({ received: true });
}
