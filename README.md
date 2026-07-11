# portfolio-julio

Personal portfolio of **Júlio Takeichi** — Sports Data Engineer at Botafogo
(NSP). Premium, bilingual (PT/EN) site built with Next.js.

**Status:** content-kit phase — site scaffold not started yet.

## Planned stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS 4 |
| i18n | next-intl (`/pt` and `/en` routes, header toggle) |
| Demo charts | Recharts, mock data only |
| Animations | Framer Motion (respects `prefers-reduced-motion`) |
| Deploy | Vercel (free tier) |

## Structure

```
content-kit/            Inputs for the build sessions (bio, case summaries,
                        mock-data spec, links). Source of truth for copy.
CONFIDENTIALITY.md      Non-negotiable rules for employer-related content.
                        Read it before contributing anything.
```

The site itself (app/, lib/, content/) will be scaffolded in Session 1
(spec + visual directions + design system + shell).

## Case studies (5)

1. **Dashboard Métricas CTR (webapp-catapult)** — GPS/wellness/strength platform, Next.js + FastAPI + SQLite → Supabase *(employer, mock demo)*
2. **Dashboard NSP** — Streamlit dashboard in production, dark theme + PDF engine *(employer, mock demo)*
3. **Hub de Avaliações (clube-avaliacoes)** — evaluations/attendance hub on shared Supabase *(employer, mock demo)*
4. **Agente Júlio** — local AI desktop agent (Tauri + Rust), human-in-the-loop *(personal)*
5. **Agenda Pessoal** — Flask agenda with local-LLM Telegram bot *(personal)*

All employer demos use fictional data only — see [CONFIDENTIALITY.md](CONFIDENTIALITY.md).

## Setup / deploy

To be documented when the scaffold lands (Session 1). Target: `npm run dev`
locally, auto-deploy on Vercel from `main`.
