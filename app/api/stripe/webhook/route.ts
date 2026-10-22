import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!signingSecret || !signature) return new NextResponse("Webhook not configured.", { status: 400 });

  let event;
  try {
    event = getStripeClient().webhooks.constructEvent(await request.text(), signature, signingSecret);
  } catch {
    return new NextResponse("Invalid webhook signature.", { status: 400 });
  }

  // Payment fulfillment belongs here—not on the success page. Domain registration
  // remains deliberately disabled until the registrar purchase flow is live.
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (session.payment_status !== "unpaid") {
      console.info("Stripe test payment confirmed", { sessionId: session.id, mode: session.mode });
    }
  }

  return NextResponse.json({ received: true });
}
