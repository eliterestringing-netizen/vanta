export interface SSLService { issueCertificate(domain:string, product:string):Promise<void>; renewCertificate(id:string):Promise<void>; getCertificate(id:string):Promise<{status:string;expiresAt:string}> }
export const sslService:SSLService={async issueCertificate(){},async renewCertificate(){},async getCertificate(){return {status:"Active",expiresAt:"14 Sep 2027"}}};
