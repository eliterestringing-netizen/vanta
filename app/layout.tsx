import type { Metadata } from "next";
import "./globals.css";
import "./lucky-theme.css";

export const metadata: Metadata = { title: { default: "Lucky Domains — find your good name", template: "%s | Lucky Domains" }, description: "Search, register and manage domains with clear pricing and free DNS.", metadataBase: new URL("https://luckydomains.com.au"), alternates: { canonical: "/" }, openGraph: { title: "Lucky Domains — find your good name", description: "Your good luck online starts with the right domain.", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
