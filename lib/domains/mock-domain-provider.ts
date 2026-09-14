import type { DomainProvider } from "./domain-provider";
const extensions = [{ suffix: ".com", price: 29.95 }, { suffix: ".com.au", price: 24.95 }, { suffix: ".au", price: 19.95 }, { suffix: ".net", price: 25.95 }, { suffix: ".org", price: 19.95 }];
// Development-only examples of names that are already registered. Replace this
// check with the provider response when the live registrar adapter is connected.
const registeredDomains = new Set(["goelitewebsite.com"]);
export const mockDomainProvider: DomainProvider = { async search(query) { const stem = query.trim().toLowerCase().replace(/\.(com|com\.au|au|net|org)$/," ").trim().replace(/\s/g,"") || "yourbrand"; return extensions.map(({suffix,price}) => { const domain = stem + suffix; return { domain, price, transferPrice: price + 8, status: registeredDomains.has(domain) || suffix === ".net" ? "unavailable" : "available" }; }); }, async getDomain(domain) { return { domain, registeredAt: "14 Sep 2025", expiresAt: "14 Sep 2027", status: "Active" }; }, async register() { return { orderId: "VNT-" + Math.random().toString(36).slice(2,8).toUpperCase() }; }, async renew() {}, async transfer() {} };
