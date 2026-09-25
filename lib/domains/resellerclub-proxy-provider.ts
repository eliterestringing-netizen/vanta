import type { DomainResult } from "@/types";
import type { DomainProvider } from "./domain-provider";

type ProxyAvailability = {
  domain: string;
  status: "available" | "unavailable" | "unknown";
  price?: number;
  transferPrice?: number;
};

/**
 * Talks only to our private WebSpaceKit bridge. The ResellerClub API key stays
 * on WebSpaceKit, where its fixed outgoing IP can be whitelisted.
 */
export class ResellerClubProxyProvider implements DomainProvider {
  constructor(private readonly proxyUrl: string, private readonly proxyToken: string) {}

  async search(query: string): Promise<DomainResult[]> {
    const parsed = splitDomain(query);
    const response = await fetch(this.proxyUrl, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${this.proxyToken}` },
      body: JSON.stringify({ action: "availability", domain: parsed.name, tlds: parsed.tlds }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("The registrar is temporarily unavailable.");
    const body = (await response.json()) as { results?: ProxyAvailability[] };
    if (!Array.isArray(body.results)) throw new Error("The registrar returned an unexpected result.");

    return body.results
      .filter((item) => item.status !== "unknown")
      .map((item) => ({
        domain: item.domain,
        status: item.status === "available" ? "available" : "unavailable",
        price: item.price,
        transferPrice: item.transferPrice,
      }));
  }

  async getDomain(domain: string) { return { domain, registeredAt: "", expiresAt: "", status: "Pending" }; }
  async register(_domain: string, _years: number): Promise<{ orderId: string }> { throw new Error("Registration is not connected yet."); }
  async renew(_domain: string, _years: number): Promise<void> { throw new Error("Renewal is not connected yet."); }
  async transfer(_domain: string, _eppCode: string): Promise<void> { throw new Error("Transfer is not connected yet."); }
}

function splitDomain(query: string) {
  const normalised = query.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "");
  const knownTlds = ["com.au", "com", "au", "net", "org"];
  const matchingTld = knownTlds.find((tld) => normalised.endsWith(`.${tld}`));
  const name = (matchingTld ? normalised.slice(0, -(matchingTld.length + 1)) : normalised).replace(/[^a-z0-9-]/g, "");
  if (!name || name.length > 63) throw new Error("Enter a valid domain name.");
  return { name, tlds: matchingTld ? [matchingTld] : knownTlds };
}
