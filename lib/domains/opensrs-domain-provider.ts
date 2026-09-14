import type { DomainProvider } from "./domain-provider";
/** Server-only adapter placeholder. Keep provider credentials in environment variables. */
export class OpenSRSDomainProvider implements DomainProvider { private unavailable(): never { throw new Error("Domain provider is not configured."); } async search(){return this.unavailable()} async getDomain(){return this.unavailable()} async register(){return this.unavailable()} async renew(){return this.unavailable()} async transfer(){return this.unavailable()} }
