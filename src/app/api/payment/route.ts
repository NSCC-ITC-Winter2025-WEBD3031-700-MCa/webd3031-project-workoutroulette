import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  let data = await request.json();
  let priceId = data.priceId;

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 }); // Added validation for missing priceId
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`, // Changed SITE_URL to NEXT_PUBLIC_DOMAIN
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,   // Changed SITE_URL to NEXT_PUBLIC_DOMAIN
  });

  return NextResponse.json({ url: session.url }); // Changed to return an object with `url` instead of just the session URL string
}
