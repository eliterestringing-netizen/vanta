import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return <header className="nav"><div className="shell navin">
    <Link href="/" className="brand" aria-label="Lucky Domains home"><Image src="/lucky-domains-logo.png" alt="Lucky Domains" width={300} height={80} priority className="brand-logo" /></Link>
    <nav className="links" aria-label="Main navigation"><Link href="/domains">Domains</Link><Link href="/pricing">Pricing</Link><Link href="/support">Support</Link></nav>
    <div className="actions"><Link href="/login">Log in</Link><Link href="/signup" className="button">Get started</Link><span className="mobile-menu">☰</span></div>
  </div></header>;
}
