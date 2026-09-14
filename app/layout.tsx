import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Vanta — domains & hosting", template: "%s | Vanta" }, description: "Register domains, launch websites and manage your online presence from one calm, capable platform.", metadataBase: new URL("https://vanta.example"), alternates: { canonical: "/" }, openGraph: { title: "Vanta — domains & hosting", description: "Your domain. Your website. Your business.", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
