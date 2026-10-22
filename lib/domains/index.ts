import { mockDomainProvider } from "./mock-domain-provider";
import { DynadotProvider } from "./dynadot-provider";

const dynadotApiKey = process.env.DYNADOT_API_KEY;
const fixieUrl = process.env.FIXIE_URL;

export const isLiveDomainSearchConfigured = Boolean(dynadotApiKey && fixieUrl);
export const domainService = isLiveDomainSearchConfigured
  ? new DynadotProvider(dynadotApiKey!, fixieUrl!)
  : mockDomainProvider;
