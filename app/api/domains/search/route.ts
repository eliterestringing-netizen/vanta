import { NextRequest, NextResponse } from "next/server";
import { domainService, isLiveDomainSearchConfigured } from "@/lib/domains";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query) return NextResponse.json({ error: "Enter a domain name." }, { status: 400 });

  try {
    const results = await domainService.search(query);
    return NextResponse.json({ results, live: isLiveDomainSearchConfigured });
  } catch {
    return NextResponse.json({ error: "We could not check that domain right now. Please try again." }, { status: 503 });
  }
}
