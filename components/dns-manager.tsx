"use client";

import { FormEvent, useEffect, useState } from "react";
import { dnsService } from "@/lib/dns/mock-dns-service";
import type { DNSRecord } from "@/types";

const recordTypes: DNSRecord["type"][] = ["A", "AAAA", "CNAME", "MX", "TXT", "NS"];

export function DNSManager() {
  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState<DNSRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshRecords = async () => setRecords(await dnsService.getRecords());
  useEffect(() => { refreshRecords().finally(() => setLoading(false)); }, []);
  async function removeRecord(id: string) { await dnsService.deleteRecord(id); await refreshRecords(); }
  async function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const record = { type: data.get("type") as DNSRecord["type"], name: String(data.get("name")), value: String(data.get("value")), ttl: Number(data.get("ttl")) };
    if (editing) await dnsService.updateRecord(editing.id, record); else await dnsService.createRecord(record);
    await refreshRecords(); setEditing(null); setIsAdding(false);
  }
  const formRecord = editing ?? (isAdding ? { type: "A" as const, name: "", value: "", ttl: 3600 } : null);
  return <section className="card"><div className="pagehead"><div><h3>DNS records</h3><p className="muted">Changes are simulated in this development build.</p></div><button className="button" onClick={() => { setEditing(null); setIsAdding(true); }}>Add record</button></div>
    {formRecord && <form onSubmit={saveRecord} className="record-form"><div className="notice">Check every value carefully. Incorrect DNS records can interrupt a website or email.</div><select name="type" defaultValue={formRecord.type} aria-label="Record type">{recordTypes.map(type => <option key={type}>{type}</option>)}</select><input name="name" required defaultValue={formRecord.name} placeholder="Name, e.g. @ or www" aria-label="Record name"/><input name="value" required defaultValue={formRecord.value} placeholder="Value or destination" aria-label="Record value"/><select name="ttl" defaultValue={formRecord.ttl} aria-label="TTL">{[300, 600, 1800, 3600, 14400].map(ttl => <option key={ttl} value={ttl}>{ttl} seconds</option>)}</select><button className="button">{editing ? "Save changes" : "Add record"}</button><button type="button" className="button ghost" onClick={() => { setEditing(null); setIsAdding(false); }}>Cancel</button></form>}
    {loading ? <p className="muted">Loading DNS records…</p> : <table className="table"><thead><tr><th>Type</th><th>Name</th><th>Value</th><th>TTL</th><th>Actions</th></tr></thead><tbody>{records.map(record => <tr key={record.id}><td>{record.type}</td><td>{record.name}</td><td>{record.value}</td><td>{record.ttl}</td><td className="table-actions"><button className="button ghost" onClick={() => { setIsAdding(false); setEditing(record); }}>Edit</button><button className="button ghost danger" onClick={() => removeRecord(record.id)}>Delete</button></td></tr>)}</tbody></table>}
  </section>;
}
