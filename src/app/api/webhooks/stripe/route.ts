// app/api/webhooks/stripe/route.ts

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

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const amountTotal = session.amount_total;

    if (!email || !amountTotal) return NextResponse.json({ status: "ignored" });

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
        await prisma.stripePayment.create({
            data: {
          userId: user.id,
          amount: amountTotal / 100, // Stripe sends amounts in cents
        },
      });
    }
  }

  return new NextResponse("Success", { status: 200 });
}
