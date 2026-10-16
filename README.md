# Portfolio — Júlio Murashima

Personal bilingual (PT/EN) software portfolio built with Next.js and TypeScript.

The site presents six case studies with interactive demonstrations. All sports-domain demos use fictional data. Source code for the underlying private systems is not included in this repository.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| UI | Tailwind CSS 4 + shadcn-style components + Lucide |
| i18n | next-intl (`/pt` and `/en` routes) |
| Demo charts | Recharts and generated fictional data in `src/lib/mock/` |
| Motion | Framer Motion |
| Deploy | Vercel |

## Structure

```text
messages/               PT and EN interface copy
src/app/[locale]/       Localized pages
src/components/         Site shell, demos, and UI components
src/content/{pt,en}/    Portfolio case study copy
src/lib/mock/           Fictional data generators for public demos
design-system/          Visual tokens and interface guidance
CONFIDENTIALITY.md      Public-content and demo-data rules
```

## Case studies

The football-domain case studies describe project goals at a high level. Their interactive demos use fictional data only; source code for the underlying systems is private. Personal projects are also presented as case studies.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run start
```

## Deployment

The portfolio is available at [portfolio-julio-theta.vercel.app](https://portfolio-julio-theta.vercel.app).
