# Confidentiality Policy / Política de Confidencialidade (v3)

This repository powers a public portfolio site. Three of the featured case
studies describe systems built for a football club's youth academy as employer
work. The rules below are **non-negotiable** and apply to all code, copy,
assets, commit history, and metadata in this repository.

## Never allowed in this repository

- **Club name, logo, or institutional brand colors — anywhere.** Case studies
  are presented as *types of systems* ("GPS & Load Dashboard"), never tied to
  a named employer. Generic context is fine: "a football club's academy
  performance department".
- Real names of athletes or staff. Age-group labels (U15/U17/U20) allowed
  only as generic context.
- Real GPS, wellness, or strength metrics — no real exports, no real database
  rows, no production screenshots.
- Internal deploy URLs, Google Drive file/folder IDs, Supabase keys or project
  URLs, service-account files or paths, passwords, API tokens.
- Code copied from private repositories that exposes business logic.
- Any identifiable data about minors.
- Inflated titles in copy: no "Data Engineer" / "Engenheiro de dados" as
  current role; no "professional football" — say "football".

## Mandatory for football-domain case studies

- Every interactive demo displays a visible badge:
  **"Demo — fictional data" / "Demonstração — dados fictícios"**.
- All demo data comes from a single centralized `lib/mock/` module with
  generators (athletes named "Athlete A"/"Atleta A" style, rounded values).
  See `content-kit/mock-data-spec.md`.
- No `fetch` to any real API. Demo components are 100% static or client-side
  mock only.

## Allowed

- Describing the domain: football, youth academy, GPS data,
  wellness, strength testing.
- Describing stack, architecture, and technical decisions at case-study level
  (local-first processing, upsert-only sync, name-resolution strategy).
- *"Code private — available on request"* for private repos. Linking GitHub
  repositories **only if public** (extras: `vald-dashboard`,
  `handball-planner`).

## Pre-publish checklist (run before every deploy)

- [ ] `git grep -i` for club names/brands, Drive IDs, Supabase URLs/keys,
      `service_account`, `.env` values
- [ ] No real athlete/staff names anywhere (code, copy, alt text, OG images)
- [ ] No "Data Engineer"/"Engenheiro de dados" as current title; no
      "professional football"
- [ ] All football demos render the fictional-data badge in both locales
- [ ] No production screenshots
- [ ] Commit history clean of any of the above

---

## Resumo em português

Este repositório alimenta um site público. É proibido, sem exceção: nome,
logo ou cores de marca de clube (cases são descritos como tipos de sistema,
com contexto genérico "clube de futebol / departamento de performance de
base"); nomes reais de atletas/staff; métricas reais de GPS/wellness/força;
screenshots de produção; URLs internas, IDs de Drive, chaves Supabase; código
de repos privados; qualquer dado identificável de menores; e cargo inflado no
copy ("engenheiro de dados" como título atual, "futebol profissional"). Todo
demo do domínio do futebol usa apenas dados fictícios gerados em `lib/mock/`,
com badge visível, e nunca chama API real.
