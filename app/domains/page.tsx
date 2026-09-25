import { DomainSearch } from "@/components/domain-search";
import { SiteHeader } from "@/components/site-header";
import { domainService, isLiveDomainSearchConfigured } from "@/lib/domains";

export const dynamic = "force-dynamic";

export default async function Domains({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  const results = q ? await domainService.search(q) : [];

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
          {!isLiveDomainSearchConfigured && q ? <section className="card domain-store-card"><span className="eyebrow">Setup in progress</span><h2>Live registrar search is being connected.</h2><p className="muted">These development results are not purchase-ready yet. We will switch this to live ResellerClub availability after the private server connection is approved.</p></section> : null}
          {isLiveDomainSearchConfigured && q ? <section className="results" style={{ marginTop: 30 }}>{results.map((item) => <article className="result" key={item.domain}><div className="resultName">{item.domain}<div className={item.status === "available" ? "available" : "unavailable"}>{item.status === "available" ? "Available" : "Unavailable"}</div></div><div className="price">{item.price ? `$${item.price.toFixed(2)}` : "Price at checkout"}</div></article>)}</section> : null}
        </div>
      </main>
    </>
  );
}
