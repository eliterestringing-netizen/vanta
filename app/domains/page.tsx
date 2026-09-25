import { DomainSearch } from "@/components/domain-search";
import { SiteHeader } from "@/components/site-header";

export default async function Domains({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="shell">
          <div className="pagehead">
            <div>
              <h1>Find your perfect domain</h1>
              <p className="muted">Search live availability and finish securely in our domain store.</p>
            </div>
          </div>
          <DomainSearch initial={q} />
          <section className="card domain-store-card">
            <span className="eyebrow">Live domain search</span>
            <h2>Real availability. Clear pricing.</h2>
            <p className="muted">
              Domain results, registration and payment are provided by our secure registrar storefront, so you only see names that can actually be registered.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
