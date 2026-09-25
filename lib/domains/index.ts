import { mockDomainProvider } from "./mock-domain-provider";
import { ResellerClubProxyProvider } from "./resellerclub-proxy-provider";

const proxyUrl = process.env.RESELLERCLUB_PROXY_URL;
const proxyToken = process.env.RESELLERCLUB_PROXY_TOKEN;

export const isLiveDomainSearchConfigured = Boolean(proxyUrl && proxyToken);
export const domainService = isLiveDomainSearchConfigured
  ? new ResellerClubProxyProvider(proxyUrl!, proxyToken!)
  : mockDomainProvider;
