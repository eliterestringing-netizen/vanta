import Link from "next/link";
import { DomainSearch } from "@/components/domain-search";
import { SiteHeader } from "@/components/site-header";

const extensions = [[".com", "$16.07/yr"], [".com.au", "From $20.99/yr"], [".net", "$18.49/yr"], [".org", "$11.79/yr"]];

export default function Home() {
  return <><SiteHeader /><main className="lucky-home">
    <section className="lucky-hero"><div className="shell lucky-hero-grid">
      <div className="hero-copy">
        <p className="hero-kicker">Big ideas deserve a great name</p>
        <h1>The good name<br />starts here<span>.</span></h1>
        <p className="hero-description">Register, transfer and manage your domain with confidence. Simple tools, clear prices and real support for Australian businesses.</p>
        <DomainSearch />
        <div className="extension-strip"><p>Popular extensions</p><div className="extension-cards">{extensions.map(([name, price], index) => <div className="extension-card" key={name}>{index === 1 && <span className="extension-badge">Aussie favourite</span>}<strong>{name}</strong><small>{price}</small></div>)}</div></div>
      </div>
      <div className="hero-art" aria-label="Domain extensions illustration">
        <div className="scribble scribble-top">Ideas<br />go further<br />here.</div><div className="domain-tile tile-com">.com</div><div className="domain-tile tile-au">.com.au</div><div className="domain-tile tile-ai">.ai</div>
        <div className="art-clover" aria-hidden="true"><i /><i /><i /><i /></div><div className="scribble scribble-bottom">Good business<br />lives here.</div>
      </div>
    </div></section>
    <section className="trust-row"><div className="shell trust-grid">
      <div><b>↯</b><span><strong>Fast registration</strong>Get online in minutes</span></div><div><b>⌾</b><span><strong>Trusted &amp; secure</strong>Your name, protected</span></div><div><b>◔</b><span><strong>Local support</strong>Real people in Australia</span></div><div><b>♡</b><span><strong>Built for small business</strong>Big dreams welcome</span></div>
    </div></section>
    <section className="lucky-promise"><div className="shell promise-grid"><strong>Fair prices.<br />No surprises.</strong><strong>A luckier internet<br />for everyone.</strong><Link href="/domains" className="promise-link">Search a domain <span>→</span></Link></div></section>
  </main><footer className="footer"><div className="shell">© 2026 Lucky Domains. Your good luck online.</div></footer></>;
}
