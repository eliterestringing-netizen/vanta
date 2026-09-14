export type DomainStatus = "available" | "unavailable";
export type DomainResult = { domain: string; status: DomainStatus; price?: number; transferPrice?: number };
export type DNSRecord = { id: string; type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"; name: string; value: string; ttl: number };
export type CartItem = { domain: string; years: number; price: number; autoRenew: boolean };
