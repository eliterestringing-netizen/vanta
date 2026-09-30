import { get as httpsGet } from "node:https";
import { HttpsProxyAgent } from "https-proxy-agent";
import type { DomainResult } from "@/types";
import type { DomainProvider } from "./domain-provider";

type DynadotResponse = {
  SearchResponse?: {
    ResponseCode?: string;
    Error?: string;
    SearchResults?: Array<{
      DomainName?: string;
      Available?: "yes" | "no";
      Price?: string;
    }>;
  };
};

function normaliseDomain(value: string) {
  const domain = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  // A live registrar check must be for a complete domain name. This avoids
  // guessing at extensions and sending unnecessary requests to Dynadot.
  if (!/^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)) {
    throw new Error("Enter a complete domain name, such as example.com.au.");
  }

  return domain;
}

function readJson(url: URL, proxyUrl: string): Promise<DynadotResponse> {
  return new Promise((resolve, reject) => {
    const request = httpsGet(
      url,
      {
        agent: new HttpsProxyAgent(proxyUrl),
        headers: { Accept: "application/json" },
        timeout: 12_000,
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if ((response.statusCode ?? 500) >= 400) {
            reject(new Error("Dynadot search service was unavailable."));
            return;
          }

          try {
            resolve(JSON.parse(body) as DynadotResponse);
          } catch {
            reject(new Error("Dynadot returned an unreadable response."));
          }
        });
      },
    );

    request.on("timeout", () => request.destroy(new Error("Dynadot search timed out.")));
    request.on("error", reject);
  });
}

function parsePrice(price?: string) {
  const match = price?.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : undefined;
}

/** Server-only Dynadot availability provider. Requests leave Vercel via Fixie. */
export class DynadotProvider implements DomainProvider {
  constructor(
    private readonly apiKey: string,
    private readonly proxyUrl: string,
  ) {}

  async search(query: string): Promise<DomainResult[]> {
    const domain = normaliseDomain(query);
    const url = new URL("https://api.dynadot.com/api3.json");
    url.search = new URLSearchParams({
      key: this.apiKey,
      command: "search",
      domain0: domain,
      show_price: "1",
    }).toString();

    const response = await readJson(url, this.proxyUrl);
    const search = response.SearchResponse;
    if (search?.ResponseCode !== "0") {
      throw new Error("Dynadot could not complete the availability check.");
    }

    return (search.SearchResults ?? []).map((item) => ({
      domain: item.DomainName ?? domain,
      status: item.Available === "yes" ? "available" : "unavailable",
      price: parsePrice(item.Price),
    }));
  }

  async getDomain(_domain: string): Promise<{ domain: string; registeredAt: string; expiresAt: string; status: string }> {
    throw new Error("Domain management will be enabled after checkout is connected.");
  }

  async register(_domain: string, _years: number): Promise<{ orderId: string }> {
    throw new Error("Domain registration will be enabled after checkout is connected.");
  }

  async renew(_domain: string, _years: number): Promise<void> {
    throw new Error("Domain renewal will be enabled after checkout is connected.");
  }

  async transfer(_domain: string, _eppCode: string): Promise<void> {
    throw new Error("Domain transfers will be enabled after checkout is connected.");
  }
}
