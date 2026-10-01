import type { DomainStatus } from "@/types";

/**
 * Uses auDA's public registry data for Australian domains. A 404 means the
 * name is not registered in the .au registry; a successful RDAP response
 * means it is already registered. We deliberately return "unknown" for any
 * other response rather than incorrectly saying a customer cannot buy it.
 */
export async function checkAuRegistry(domain: string): Promise<DomainStatus | null> {
  if (!/\.(?:com\.au|au)$/.test(domain)) return null;

  const response = await fetch(`https://rdap.cctld.au/rdap/domain/${encodeURIComponent(domain)}`, {
    headers: { Accept: "application/rdap+json, application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (response.status === 404) return "available";
  if (response.ok) return "unavailable";
  return "unknown";
}
