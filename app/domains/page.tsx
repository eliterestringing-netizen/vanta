import { DomainSearch } from "@/components/domain-search";
import { SiteHeader } from "@/components/site-header";
import { domainService, isLiveDomainSearchConfigured } from "@/lib/domains";
import { checkAuRegistry } from "@/lib/domains/au-registry";
import type { DomainResult } from "@/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const suggestedExtensions = [".com", ".net", ".org", ".com.au", ".au"];

function domainSuggestions(query: string) {
  const normalised = query
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
  const base = normalised.replace(/\.(?:com\.au|net\.au|org\.au|asn\.au|id\.au)$/, "").replace(/\.[^.]+$/, "");

  return [...new Set([normalised, ...suggestedExtensions.map((extension) => `${base}${extension}`)])];
}

export default async function Domains({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  let results: DomainResult[] = [];
  let searchError = false;

  if (q) {
    try {
      const suggestions = domainSuggestions(q);
      const searches = await Promise.all(suggestions.map((domain) => domainService.search(domain)));
      const registryStatuses = await Promise.all(suggestions.map((domain) => checkAuRegistry(domain)));
      const registryStatusByDomain = new Map(
        suggestions.map((domain, index) => [domain, registryStatuses[index]]),
      );

      results = searches.flat().map((item) => ({
        ...item,
        // Australian availability is verified against auDA's registry rather
        // than inferred solely from one registrar's product catalogue.
        status: registryStatusByDomain.get(item.domain) ?? item.status,
      }));
    } catch {
      // The registrar connection is optional while it is being configured.
      // Keep the public search page available if the upstream bridge is offline.
      searchError = true;
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="shell">
          <div className="pagehead">
            <div>
              <h1>Find your perfect domain</h1>
              <p className="muted">Search availability and buy your domain without leaving Lucky Domains.</p>
            </div>
          </div>
          <DomainSearch initial={q} />
          {!isLiveDomainSearchConfigured && q ? <section className="card domain-store-card"><span className="eyebrow">Setup in progress</span><h2>Live registrar search is being connected.</h2><p className="muted">These development results are not purchase-ready yet. We will switch this to live Dynadot availability once the private connection is enabled.</p></section> : null}
          {isLiveDomainSearchConfigured && searchError ? <section className="card domain-store-card"><span className="eyebrow">Connection update</span><h2>Domain search is almost ready.</h2><p className="muted">We’re completing the secure registrar connection. Please try again in a few minutes.</p></section> : null}
          {isLiveDomainSearchConfigured && q ? <section className="results" style={{ marginTop: 30 }}><p className="muted">We checked your exact name plus popular extensions.</p>{results.map((item) => <article className="result" key={item.domain}><div className="resultName">{item.domain}<div className={item.status === "available" ? "available" : "unavailable"}>{item.status === "available" ? "Available" : item.status === "unavailable" ? "Unavailable" : "Could not confirm"}</div></div><div className="price">{item.status === "available" && item.price ? `$${item.price.toFixed(2)}` : item.status === "available" ? "Price at checkout" : ""}</div></article>)}</section> : null}
        </div>
      </main>
    </>
  );
}
