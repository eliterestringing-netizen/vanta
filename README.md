# Vanta

An original, responsive domain and hosting platform first milestone built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

1. Copy `.env.example` to `.env.local`. Leave provider secrets empty for mock mode.
2. Run `npm install` and `npm run dev`.
3. Open `http://localhost:3000`.

## What is included

- Premium public experience: homepage, domain search, cart, development checkout, hosting, SSL, email, pricing and support.
- Customer workspace: dashboard, domains, domain detail, DNS CRUD mock interface, nameservers and renewal.
- Admin workspace: overview plus future management route structure.
- Provider boundaries: `lib/domains`, `lib/dns`, and `lib/services` use mock implementations. Replace only the adapter selection when live services are connected.
- A Supabase schema with UUID keys, indexes, enum order states and a deny-by-default RLS starting point is in `supabase/schema.sql`.

## Integrations later

Use only server-side route handlers/actions for Stripe, registrars, hosting, DNS and SSL provider calls. `STRIPE_SECRET_KEY`, provider secrets and `SUPABASE_SERVICE_ROLE_KEY` must never be prefixed with `NEXT_PUBLIC_` or returned to the browser. The existing `OpenSRSDomainProvider` is a deliberate server-only placeholder; preserve the `DomainProvider` interface when implementing it.

## Before production

- Apply and review the Supabase schema and RLS policies; add admin-specific policies or use a tightly controlled server service role for administrative operations.
- Complete Supabase Auth email verification, reset-password and session middleware.
- Replace test checkout with Stripe Payment Intents plus verified webhooks.
- Add server-side validation, rate limiting and provider-specific audit logs for all mutations.
- Change `https://vanta.example` metadata/canonical/sitemap URLs to the live domain.
