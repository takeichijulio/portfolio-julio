# portfolio-julio

Personal portfolio of **Júlio Takeichi** — Sports Data professional in
football, building toward data engineering. Premium, bilingual (PT/EN) site
built with Next.js.

**Status:** Phase 2 — core pages live (home, about, projects grid, contact,
custom 404); interactive case studies come next.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| UI | Tailwind CSS 4 + shadcn-style components + Lucide |
| i18n | next-intl (`/pt` and `/en` routes, header toggle) |
| Demo charts | Recharts, mock data only (`src/lib/mock/`) |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Deploy | Vercel (free tier) |

## Structure

```
content-kit/            Inputs for the build sessions (bio, case summaries,
                        mock-data spec). Source of truth for copy.
design-system/          PORTFOLIO.md — Pitch Tech tokens, motion spec,
                        ui-ux-pro-max checklist.
messages/               pt.json / en.json (all UI copy).
src/app/[locale]/       Pages (home, about, projects, contact, 404).
src/components/         Shell + motion + ui/ (shadcn-style).
src/lib/mock/           Deterministic mock generators for all demos.
CONFIDENTIALITY.md      Non-negotiable rules. Read before contributing.
```

## Case studies (5)

1. **GPS & Load Dashboard** — full-stack GPS/wellness/strength platform *(football domain, mock demo)*
2. **Multi-department Performance Hub** — Streamlit dashboard in production *(football domain, mock demo)*
3. **Academy Evaluations Hub** — evaluations/attendance hub on shared database *(football domain, mock demo)*
4. **Local AI Agent (Human-in-the-Loop)** — Tauri + Rust desktop agent *(personal)*
5. **Personal Ops + Telegram Bot** — Flask agenda with local-LLM bot *(personal)*

All football-domain demos use fictional data only — see
[CONFIDENTIALITY.md](CONFIDENTIALITY.md).

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (all routes SSG)
```
