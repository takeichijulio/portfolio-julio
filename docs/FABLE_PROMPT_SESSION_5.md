# Fable 5 — Sessão 5: Upgrade de demos + copy profissional + auto-review

> Copie o bloco **PROMPT** abaixo inteiro para o Claude Fable 5.
> Repo: `C:\Users\julio\Documentos\GitHub\portfolio-julio`
> Estado anterior: Sessões 1–4 concluídas (commit `48a0a84`), site deploy-ready local.

---

## PROMPT (colar no Fable 5)

```
GOAL
Upgrade all five interactive case-study demos in my portfolio to reflect the real
complexity of the underlying products — not just single line charts — plus rewrite
case copy in a more professional tone, then self-review the entire site and propose
concrete improvements.

USER
Tech recruiters in sports data / full-stack. They should understand in 30 seconds
what I build and see believable product demos (mock data only).

CONTEXT
I am Júlio — Sports Data Professional in Football (NOT "Data Engineer" yet;
tagline: building toward data engineering). Portfolio is bilingual PT/EN,
Pitch Tech design system, Next.js 15 + next-intl + Tailwind 4 + shadcn-style
components + Recharts + Framer Motion.

The site already works locally (5 cases, hero, about, contact, Lighthouse a11y 100).
The owner feedback: demos feel too shallow — mostly line charts — missing the
interactivity that real apps have (maximos, metas, PSE, weekly load grids, etc.).
Copy can be more polished/professional. Formatting is improving but needs a critical
pass with improvement suggestions.

INPUTS — read before coding
1. Repo root: C:\Users\julio\Documentos\GitHub\portfolio-julio
   - HANDOFF.md, CONFIDENTIALITY.md, design-system/PORTFOLIO.md
   - content-kit/mock-data-spec.md, content-kit/projects/*.md
   - src/components/demos/*.tsx (current demos)
   - src/lib/mock/*.ts (extend here — never hardcode demo data in components)
   - src/content/{pt,en}/cases/*.json (case copy to improve)
2. Source-of-truth for REAL product features (read for inspiration, do NOT copy
   private code or real data):
   - Wiki vault: C:\Users\julio\Documentos\Wikia do Júlio\wiki\projetos\webapp-catapult.md
   - Wiki: wiki/projetos/dashboard-nsp-botafogo.md
   - Wiki: wiki/projetos/clube-avaliacoes.md
   - Wiki: wiki/projetos/agente-julio.md
   - Wiki: wiki/projetos/agenda-pessoal.md
3. Skill ui-ux-pro-max (MANDATORY for every UI change):
   C:\Users\julio\.claude\skills\ui-ux-pro-max\SKILL.md
   — Skeleton loaders, empty/error states, consistent tokens, Lucide icons,
     shadcn-style components, no silent failures.

REQUIREMENTS

### A) Demo upgrades — GPS & Load Dashboard (flagship, highest priority)
File: src/components/demos/gps-demo.tsx + lib/mock/*

Current: tabs Session / Load / Wellness with table + 2 line charts (distance, Hooper).

Upgrade to a mini product surface inspired by the real app (wiki webapp-catapult):
- Keep tabs but enrich each:
  1. **Sessão** — table stays; add sortable columns hint or row highlight on click
     that selects athlete for other tabs.
  2. **Carga** — weekly load grid (7 columns = days) showing PSE + UA (player load)
     per day for selected athlete; color cells by load band (low/medium/high mock).
     Add secondary chart: dual-axis bar (distance) + line (PSE) OR ComposedChart.
  3. **Relatórios / Metas** (new tab or sub-tab under Carga) — WoW-style table:
     metric rows (distance, HSR, sprints) with columns: realizado | meta | % meta;
     highlight cells where realized < 80% or > 120% of target (mock thresholds).
  4. **Máximos** (new tab or section) — card grid or compact table: per athlete
     snapshot of personal bests (top speed, max distance session, max player load)
     with "scope" badge (season / last 90 days) — all mock from lib/mock/maximos.ts.
  5. **Wellness** — multi-metric: Hooper line + PSE post-training bars on same
     week selector; optional toggle metrics (sleep, fatigue, muscle soreness).
- Athlete selector shared across tabs; changing athlete updates all views.
- All data from lib/mock/ with deterministic seed; extend mock-data-spec.md.

### B) Demo upgrades — Multi-department Performance Hub
File: src/components/demos/performance-hub-demo.tsx

Current: strength asymmetry table + Hooper line chart.

Upgrade inspired by wiki dashboard-nsp-botafogo (Streamlit + ECharts patterns):
- Use **st.radio-style** section switcher (already have DemoRadio — keep the
  lesson note about st.tabs vs st.radio visible but subtle).
- Sections:
  1. **Fisiologia / GPS** — grouped bar or dual-axis chart (distance + high intensity)
     for last 7 days; mock category filter U15/U17/U20.
  2. **Força** — keep asymmetry table; add scatter plot (force L vs R) with
     quadrant coloring for flagged |asym| > 10%.
  3. **Wellness** — THREE charts like production: (a) Hooper trend multi-line
     (sleep, fatigue, stress, soreness), (b) PSE bars, (c) pain-by-region horizontal
     bar chart (mock body regions: quadriceps, hamstring, ankle, etc.).
  4. **Multidisciplinar** (light) — radar chart with 4 generic area scores (mock).
- Mini KPI strip at top: sessions this week, avg Hooper, flagged asymmetry count.

### C) Demo upgrades — Academy Evaluations Hub
File: src/components/demos/evaluations-demo.tsx

Current: static compliance table.

Upgrade:
- Split view: **Compliance table** (keep, polish bars) + **Calendar strip**
  (next 14 days with assessment dots per area — click day shows detail panel).
- Filter by category U15/U17; attendance pills interactive (click toggles mock state
  for demo only, resets on page leave).
- Empty state if filter yields no rows.

### D) Demo upgrades — Local AI Agent
File: src/components/demos/agent-demo.tsx

Upgrade:
- Richer approval queue: multiple proposal types (WriteFile, RunCommand, ReadFile)
  with expandable diff preview (fake content).
- Status timeline: proposed → approved/rejected → audit log entry with timestamp.
- Side panel "Ollama local" indicator (static badge, no real connection).
- Empty queue state + "Simulate new proposal" button (adds mock item).

### E) Demo upgrades — Personal Ops + Telegram Bot
File: src/components/demos/personal-ops-demo.tsx

Upgrade:
- Two-pane layout: task list grouped by date (today / upcoming / done) +
  Telegram transcript with multi-turn confirmation flow (create task → confirm → done).
- Calendar mini-month with dots for events (mock).
- Toggle PT/EN obeys locale for mock messages.

### F) Shared demo infrastructure
- Extract reusable chart wrappers in src/components/demos/charts/ if duplication
  grows (DualAxisChart, MetricToggle, WeeklyGrid).
- Every demo: FictionalBadge visible, Skeleton while dynamic import loads, empty
  states, error boundary or graceful fallback.
- Extend lib/mock/: maximos.ts, metas.ts, pse.ts, weeklyLoad.ts, painRegions.ts
- Update content-kit/mock-data-spec.md with new faixas.
- Add i18n keys in messages/pt.json and messages/en.json for all new labels.

### G) Copy — more professional tone
Rewrite src/content/{pt,en}/cases/*.json AND messages where case-adjacent:
- Short sentences, active voice, precise verbs (designed, implemented, validated).
- Avoid casual filler ("comecei", "adoro") in case bodies — keep About page warm
  but cases should read like strong portfolio case studies.
- Maintain v3 positioning:
  - PT headline domain: "Profissional de Sports Data no futebol"
  - NEVER "Engenheiro de dados" / "Data Engineer" as current title
  - NEVER club name, logo, or "futebol profissional" — say "futebol"
  - myRole: honest ("desenvolvedor principal", "responsável pelo pipeline") not inflated
- Problem/Result/Learned: quantifiable where wiki supports it ("11 modules", "86 tests")
  but never invent numbers not in wiki/HANDOFF.
- Run grep after copy pass: zero club names in public copy.

### H) Self-review pass (mandatory before finishing)
Act as design director + senior frontend engineer + recruiter. Produce:

1. **IMPROVEMENTS.md** in repo root with sections:
   - Visual (typography, spacing, motion excess/deficit)
   - UX (demo discoverability, mobile breakpoints, tab overload)
   - Copy (per case, 1–2 bullet fixes if any remain)
   - Performance (bundle, lazy load, chart count)
   - a11y (focus order, chart aria labels)
   - Prioritized backlog: P0 fix now / P1 nice / P2 post-deploy

2. Implement **all P0 items** from that review in the same session.

3. Re-run `npm run build` (dev server MUST be stopped first — never build with
   dev running; corrupts .next).

4. Update HANDOFF.md with Session 5 changes.

CONSTRAINTS
- ALL football-domain demo data: fictional only (Atleta A, Athlete B…).
- NO fetch, NO env secrets, NO Drive IDs, NO Supabase keys, NO club branding.
- Do NOT copy proprietary source code from private repos — recreate UI patterns only.
- ui-ux-pro-max checklist on every new/changed component.
- prefers-reduced-motion: disable tilt, stagger, counter animations.
- Cost zero: no paid services.
- Do not break existing routes or i18n structure.

PROCESS
1. Read HANDOFF + current demos + wiki project pages (grep feature lists).
2. Plan mock data extensions (list new lib/mock files).
3. Implement GPS demo first (flagship), then Performance Hub, then other three.
4. Professional copy pass on all case JSON files.
5. Self-review → IMPROVEMENTS.md → fix P0.
6. Build verify + update HANDOFF.

DELIVERABLES
- Upgraded demo components (5)
- Extended lib/mock/* + updated mock-data-spec.md
- Polished case JSON (pt + en)
- IMPROVEMENTS.md with prioritized suggestions
- Updated HANDOFF.md
- New i18n keys as needed

DEFINITION OF DONE
- GPS demo shows ≥4 distinct interactive views (session table, weekly PSE/UA grid,
  metas vs realizado, maximos) — not just one line chart.
- Performance Hub demo shows ≥3 chart types (not only line + table).
- All 5 demos pass ui-ux-pro-max checklist (loading/empty/error/responsive).
- Copy reads professional; v3 positioning intact; grep shows zero club names.
- npm run build passes; IMPROVEMENTS.md exists; P0 fixes applied.
- Brief summary for owner: what changed + what remains P1 for post-deploy.
```

---

## Follow-up prompts (usar na mesma sessão ou depois)

### Se demos ficarem pesadas no mobile
```
Review all case demos at 375px width. Any horizontal overflow or unreadable chart?
Simplify: stack tabs vertically, reduce chart height, hide secondary metrics on xs.
Update IMPROVEMENTS.md.
```

### Se copy ainda soar informal
```
Review all src/content/{pt,en}/cases/*.json as a technical hiring manager.
Rewrite any sentence that sounds like a blog post. Keep facts identical.
Max 120 words per section field.
```

### Recruiter 30s (re-run)
```
You are a recruiter with 30 seconds. Open /pt and the GPS case.
Can you tell: who I am, what domain, what I built, proof in the demo?
List 3 blockers; fix the highest-impact one immediately.
```

---

## Referência rápida — features reais → demo mock

| Produto real (wiki) | O que a demo deve sugerir |
|---------------------|---------------------------|
| webapp-catapult `/carga` | Grade semanal PSE/UA |
| webapp-catapult `/relatorios` | WoW, metas, % atingimento |
| webapp-catapult `/individual` | Máximos + wellness overlay |
| webapp-catapult `/wellness` | Hooper + PSE pós-treino |
| dashboard-nsp `wellness_tab` | 3 gráficos ECharts + dores por região |
| dashboard-nsp fisiologia | GPS + composição + força |
| clube-avaliacoes | Calendário + compliance por área |
| agente-julio | Fila aprovação + audit.jsonl |
| agenda-pessoal | Tarefas + bot Telegram confirmação |
