"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <html lang="en"><body style={{ margin: 0 }}><main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "Arial, sans-serif", color: "#10223c" }}><section style={{ maxWidth: 460, textAlign: "center" }}><p style={{ color: "#315efb", fontWeight: 700 }}>VANTA</p><h1>We’re refreshing things.</h1><p style={{ color: "#607089", lineHeight: 1.6 }}>The site hit an unexpected problem. Please try again in a moment.</p><button onClick={reset} style={{ border: 0, borderRadius: 9, padding: "12px 17px", background: "#315efb", color: "white", fontWeight: 700, cursor: "pointer" }}>Try again</button></section></main></body></html>;
}
