"use client";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useEffect, useState } from "react";

type CartItem = { domain: string; years: number };

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);
  const labels = ["Account", "Registrant", "Payment", "Review"];

  useEffect(() => setPaid(new URLSearchParams(window.location.search).get("success") === "1"), []);

  async function beginTestPayment() {
    const stored = JSON.parse(localStorage.getItem("lucky-domains-cart") || "[]") as CartItem[];
    if (!stored.length) { setError("Add a domain to your cart before starting test checkout."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: stored.map(({ domain, years }) => ({ domain, years })) }),
      });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Stripe checkout could not start.");
      window.location.assign(result.url);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Stripe checkout could not start."); setLoading(false); }
  }

  if (paid) return <><SiteHeader /><main className="page"><div className="shell" style={{ maxWidth: 720 }}><section className="card" style={{ textAlign: "center", padding: 48 }}><span className="icon" style={{ margin: "auto", fontSize: 22 }}>✓</span><h1>Test payment completed.</h1><p className="muted">Stripe confirmed the test checkout. No real card was charged and no domain has been registered.</p><Link className="button" href="/">Return home</Link></section></div></main></>;

  return <><SiteHeader /><main className="page"><div className="shell" style={{ maxWidth: 760 }}><h1>Checkout</h1><div className="pills">{labels.map((label, index) => <span className="pill" key={label} style={index + 1 === step ? { background: "#315efb", color: "#fff" } : {}}>{index + 1}. {label}</span>)}</div><section className="card" style={{ marginTop: 24 }}><h2>{labels[step - 1]}</h2>{step === 3 ? <><div className="notice">Test mode only. Stripe collects the card details on its secure checkout page; Lucky Domains never sees them.</div><p className="muted">Use Stripe’s test card <strong>4242 4242 4242 4242</strong>, any future expiry date, any CVC and any postcode.</p></> : <><p className="muted">{step === 1 ? "Create an account or sign in to continue." : step === 2 ? "We use this information to register and manage your domain." : "Review your test order before continuing to secure Stripe checkout."}</p><input aria-label="Full name" placeholder="Full name" style={{ padding: 12, border: "1px solid var(--line)", borderRadius: 8, width: "100%" }} /></>} {error && <p className="unavailable" role="alert">{error}</p>}<div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}><button className="button ghost" disabled={step === 1 || loading} onClick={() => setStep(step - 1)}>Back</button>{step === 4 ? <button className="button" disabled={loading} onClick={beginTestPayment}>{loading ? "Opening Stripe…" : "Pay in Stripe test mode"}</button> : <button className="button" onClick={() => setStep(step + 1)}>Continue</button>}</div></section></div></main></>;
}
