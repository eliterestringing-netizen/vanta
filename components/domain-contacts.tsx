"use client";

import { FormEvent, useState } from "react";

type Contact = { name: string; email: string; phone: string; company: string; address: string };
const startingContact: Contact = { name: "Alex Morgan", email: "alex@example.com", phone: "+61 400 000 000", company: "Example Studio", address: "1 Collins Street, Melbourne VIC 3000, Australia" };

export function DomainContacts() {
  const [contact, setContact] = useState(startingContact);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    setContact({ name: String(data.get("name")), email: String(data.get("email")), phone: String(data.get("phone")), company: String(data.get("company")), address: String(data.get("address")) });
    setSaved(true); setEditing(false);
  }
  return <section className="card" style={{ maxWidth: 760, marginTop: 24 }}><div className="pagehead"><div><h3>Registrant contact</h3><p className="muted">This person or business is the legal owner contact for the domain.</p></div>{!editing && <button className="button" onClick={() => { setSaved(false); setEditing(true); }}>Edit contact</button>}</div>{saved && <p className="available">Contact details saved in development mode.</p>}
    {editing ? <form onSubmit={save} className="contact-form"><label>Full name<input name="name" required defaultValue={contact.name}/></label><label>Business name<input name="company" defaultValue={contact.company}/></label><label>Email address<input name="email" type="email" required defaultValue={contact.email}/></label><label>Phone number<input name="phone" required defaultValue={contact.phone}/></label><label className="full">Address<textarea name="address" required defaultValue={contact.address}/></label><div className="full"><button className="button">Save contact</button><button type="button" className="button ghost" onClick={() => setEditing(false)}>Cancel</button></div></form> : <dl className="contact-list"><div><dt>Name</dt><dd>{contact.name}</dd></div><div><dt>Business</dt><dd>{contact.company}</dd></div><div><dt>Email</dt><dd>{contact.email}</dd></div><div><dt>Phone</dt><dd>{contact.phone}</dd></div><div><dt>Address</dt><dd>{contact.address}</dd></div></dl>}
  </section>;
}
