import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripeClient, isStripeTestMode } from "@/lib/stripe";
import { domainService, isLiveDomainSearchConfigured } from "@/lib/domains";

export const runtime = "nodejs";

const requestSchema = z.object({
  items: z.array(z.object({
    domain: z.string().trim().toLowerCase().regex(/^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/),
    years: z.coerce.number().int().min(1).max(10),
  })).min(1).max(20),
});

async function priceForDomain(domain: string) {
  if (!isLiveDomainSearchConfigured) return undefined;
  const results = await domainService.search(domain);
  const result = results.find((item) => item.domain.toLowerCase() === domain);
  return result?.status === "available" ? result.price : undefined;
}

export async function POST(request: NextRequest) {
  if (!isStripeTestMode()) return NextResponse.json({ error: "Test payments are not configured yet." }, { status: 503 });
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Your cart contains an invalid domain." }, { status: 400 });

  const quotedItems = await Promise.all(parsed.data.items.map(async (item) => ({ ...item, unitAmount: await priceForDomain(item.domain) })));
  if (quotedItems.some((item) => !item.unitAmount)) return NextResponse.json({ error: "One or more domains have changed price or are no longer available." }, { status: 400 });

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    success_url: request.nextUrl.origin + "/checkout?success=1&session_id={CHECKOUT_SESSION_ID}",
    cancel_url: request.nextUrl.origin + "/checkout?cancelled=1",
    integration_identifier: "lucky_domains_" + randomBytes(4).toString("hex"),
    line_items: quotedItems.map((item) => ({
      quantity: item.years,
      price_data: { currency: "aud", unit_amount: Math.round(item.unitAmount! * 100), product_data: { name: item.domain + " registration", description: item.years + " year" + (item.years === 1 ? "" : "s") + " · test payment" } },
    })),
    metadata: { environment: "test", product: "domain-registration" },
  });

  if (!session.url) return NextResponse.json({ error: "Stripe could not open checkout." }, { status: 502 });
  return NextResponse.json({ url: session.url });
}
