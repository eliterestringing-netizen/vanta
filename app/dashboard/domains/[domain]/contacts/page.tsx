import { DashboardLayout } from "@/components/dashboard-nav";
import { DomainContacts } from "@/components/domain-contacts";

export default async function Contacts({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  return <DashboardLayout><h1>Domain contacts</h1><p className="muted">Update the people and business details attached to {domain}.</p><DomainContacts/></DashboardLayout>;
}
