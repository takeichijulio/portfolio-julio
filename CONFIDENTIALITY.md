# Confidentiality Policy / Política de Confidencialidade

This repository powers a public portfolio site. Three of the featured case
studies describe work done as an employee of Botafogo (NSP — Núcleo de Saúde
e Performance). The rules below are **non-negotiable** and apply to all code,
copy, assets, commit history, and metadata in this repository.

## Never allowed in this repository

- Real names of athletes or staff. Age-group labels (Sub-15/Sub-17/Sub-20 /
  U15/U17/U20) are allowed only as generic context.
- Real GPS, wellness, or strength (VALD) metrics — no real exports, no real
  database rows, no unblurred production screenshots.
- Internal deploy URLs, Google Drive file/folder IDs, Supabase keys or project
  URLs, service-account files or paths, passwords, API tokens.
- Code copied from private repositories that exposes business logic.
- Any identifiable data about minors.

## Mandatory for Botafogo/NSP case studies

- Every interactive demo displays a visible badge:
  **"Demo — fictional data" / "Demonstração — dados fictícios"**.
- All demo data comes from a single centralized `lib/mock/` module with
  generators (athletes named "Athlete A"/"Atleta A" style, rounded values).
  See `content-kit/mock-data-spec.md`.
- No `fetch` to any real API. Demo components are 100% static or client-side
  mock only.

## Allowed

- Naming Botafogo NSP as employer and naming the internal projects.
- Describing stack, architecture, and technical decisions at case-study level
  (e.g. local-first processing, upsert-only sync, name-resolution strategy).
- Linking GitHub repositories **only if they are public**. As of 2026-07-11
  none of the five case-study repos is public — case studies say
  *"code private — available on request"*. Two unrelated public repos
  (`vald-dashboard`, `handball-planner`) may be linked as extras.

## Pre-publish checklist (run before every deploy)

- [ ] `git grep` for Drive IDs, Supabase URLs/keys, `service_account`, `.env` values
- [ ] No real athlete/staff names anywhere (code, copy, alt text, OG images)
- [ ] All NSP demos render the fictional-data badge in both locales
- [ ] No screenshots of production UIs without explicit prior sanitization review
- [ ] Commit history clean of any of the above

---

## Resumo em português

Este repositório alimenta um site público. Três cases descrevem trabalho feito
como funcionário do Botafogo (NSP). É proibido, sem exceção: nomes reais de
atletas/staff, métricas reais de GPS/wellness/força, screenshots de produção
sem tratamento, URLs internas, IDs de Drive, chaves Supabase, código de repos
privados e qualquer dado identificável de menores. Todo demo NSP usa apenas
dados fictícios gerados em `lib/mock/`, com badge visível "Demonstração —
dados fictícios", e nunca chama API real. Links de GitHub só para repos
públicos (hoje: nenhum dos 5 cases é público).
