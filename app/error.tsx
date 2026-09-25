"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "Arial, sans-serif", color: "#102b25" }}>
    <section style={{ maxWidth: 460, textAlign: "center" }}><p style={{ color: "#159662", fontWeight: 700 }}>LUCKY DOMAINS</p><h1>Something went wrong.</h1><p style={{ color: "#62746f", lineHeight: 1.6 }}>Please try again. If the problem continues, our team has the details needed to investigate.</p><button onClick={reset} style={{ border: 0, borderRadius: 9, padding: "12px 17px", background: "#159662", color: "white", fontWeight: 700, cursor: "pointer" }}>Try again</button></section>
  </main>;
}
