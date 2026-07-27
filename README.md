# portfolio-julio

Personal portfolio of **Júlio Takeichi** — Sports Data professional in
football, building toward data engineering. Premium, bilingual (PT/EN) site
built with Next.js.

**Status:** v4 in progress on branch `linguagem-acessivel-hud` — 6 case studies with
interactive mock demos, dual-layer text (accessible + technical), both locales. Current prod
(main branch): 96+/100/96/92 Lighthouse (perf/a11y/bp/seo). v4 updates: Pitch Tech v4 design
system (HUD visual language, Orbitron font, glow/parallax under numeric limits), two-layer
content model (`<TechDetails>` native collapse), 12 HUD effects (reveal, magnetic, scanlines,
etc.). See [HANDOFF.md](HANDOFF.md) for current deploy; branch deploy pending.

## Design & Content

**Pitch Tech v4** — dark premium tech visual language inspired by `referencia_futurista/`.
Token-based color system, Orbitron display font, 12 HUD effects (reveal on scroll, magnetic
cards, kinetic headlines, glow/parallax under numeric limits, scanlines, grain, etc.). All
animations respect `prefers-reduced-motion`.

**Dual-layer content model** — first read always accessible to non-technical audience (no jargon).
Technical depth preserved in collapsible `<TechDetails>` blocks (native `<details>`/`<summary>`,
works without JS, indexable).

See [design-system/PORTFOLIO.md](design-system/PORTFOLIO.md) for full spec.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| UI | Tailwind CSS 4 + shadcn-style components + Lucide |
| i18n | next-intl (`/pt` and `/en` routes, header toggle) |
| Demo charts | Recharts, mock data only (`src/lib/mock/`) |
| Motion | CSS + IntersectionObserver (12 HUD effects, native `<details>` for tech layer) |
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

## Case studies (6)

1. **GPS & Load Dashboard** — full-stack GPS/wellness/strength platform *(football domain, mock demo)*
2. **Multi-department Performance Hub** — Streamlit dashboard in production *(football domain, mock demo)*
3. **Academy Evaluations Hub** — evaluations/attendance hub on shared database *(football domain, mock demo)*
4. **Jarvis — Personal Voice Assistant** — local voice-first personal assistant (schedule, email, notes) *(personal project)*
5. **Local AI Agent (Human-in-the-Loop)** — Tauri + Rust desktop agent *(personal)*
6. **Personal Ops + Telegram Bot** — Flask agenda with local-LLM bot *(personal)*

All football-domain demos use fictional data only — see
[CONFIDENTIALITY.md](CONFIDENTIALITY.md).

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (all routes SSG) — stop the dev server first
npm run start  # serve the production build
```

## Deploy (Vercel)

Import the GitHub repo on vercel.com (Next.js preset auto-detected, no build
config needed). Optional env var: `NEXT_PUBLIC_SITE_URL=https://<domain>` for
OG/canonical metadata. Full steps + pre-publish confidentiality checklist in
[HANDOFF.md](HANDOFF.md).
