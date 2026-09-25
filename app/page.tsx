import Link from "next/link";
import { DomainSearch } from "@/components/domain-search";
import { SiteHeader } from "@/components/site-header";

const features = [["⌕", "Find the right name", "Search domain names with clear, simple pricing."], ["◌", "Free DNS included", "Point your domain wherever you need, with DNS included at no extra cost."], ["✓", "Help when you need it", "Clear steps and friendly support for every stage of your domain journey."]];

export default function Home() {
  return <><SiteHeader/><main>
    <section className="hero"><div className="shell"><span className="eyebrow">Simple domains, good luck</span><h1>Your idea deserves a great domain.</h1><p className="lead">Find and register the right domain for your business. Clear pricing, free DNS, and one simple place to manage it all.</p><DomainSearch/></div></section>
    <section className="section"><div className="shell"><h2>Domains made simple.</h2><p className="muted">Everything you need to get your name online, without the confusing extras.</p><div className="grid3">{features.map(([icon,title,text])=><article className="card" key={title}><div className="icon">{icon}</div><h3>{title}</h3><p className="muted">{text}</p></article>)}</div></div></section>
    <section className="dark section"><div className="shell"><div className="split"><div><span className="eyebrow">Lucky starts here</span><h2>Find a name that feels right.</h2><p className="muted">Search domains, register with confidence, and manage your online address from one calm dashboard.</p><Link className="button" href="/domains">Search domains</Link></div><div className="grid3" style={{gridTemplateColumns:"repeat(3,1fr)",alignSelf:"end"}}>{[["Free","DNS included"],["24/7","support"],["1 place","to manage"]].map(([value,label])=><div key={label}><div className="metric">{value}</div><div className="muted">{label}</div></div>)}</div></div></div></section>
  </main><footer className="footer"><div className="shell">© 2026 Lucky Domains. Your good luck online.</div></footer></>;
}
