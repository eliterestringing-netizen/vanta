"use client";

import { useState } from "react";

import { domainStoreUrl } from "@/lib/domain-store";

export function DomainSearch({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);

  function search(event: React.FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;

    // Availability and purchase are handled by the live registrar storefront.
    // This avoids displaying mock availability as a real result.
    window.location.assign(domainStoreUrl);
  }

  return (
    <>
      <form onSubmit={search} className="searchbox" role="search">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="Domain name"
          placeholder="mybusiness.com.au"
        />
        <button className="button" type="submit">Search live domains</button>
      </form>
      <p className="search-note">Live availability and secure checkout open in our domain store.</p>
      <div className="pills" aria-label="Popular extensions">
        {[".com", ".com.au", ".au", ".net", ".org"].map((extension) => (
          <button key={extension} type="button" className="pill" onClick={() => setValue(`mybusiness${extension}`)}>
            {extension}
          </button>
        ))}
      </div>
    </>
  );
}
