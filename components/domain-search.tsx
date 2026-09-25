"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DomainSearch({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const router = useRouter();

  function search(event: React.FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;

    router.push(`/domains?q=${encodeURIComponent(value.trim())}`);
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
        <button className="button" type="submit">Search domains</button>
      </form>
      <p className="search-note">Search and manage your domains in one place.</p>
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
