# Case 1 — Dashboard Métricas CTR (webapp-catapult)

- **Slug:** `ctr-metrics-platform`
- **Tipo:** employer (Botafogo NSP) — demo só com mock data + badge
- **Flagship:** sim (case mais completo, demo interativa Recharts)
- **Código:** privado — "available on request"

## PT

**Problema.** O núcleo de performance da base do Botafogo precisava transformar
exports brutos de GPS (Catapult), formulários de wellness e testes de força em
informação diária utilizável — sem custo de nuvem e sem processar dados
sensíveis de atletas fora da máquina do clube.

**Usuário-alvo.** Comissão técnica e staff de fisiologia das categorias de
base (U15/U17/U20).

**Meu papel.** Único desenvolvedor: arquitetura, pipeline de dados, backend,
frontend e deploy.

**Processo.** Comecei em Streamlit, validei o fluxo com o staff e migrei para
um monorepo: webapp Next.js + React + Tailwind, backend local FastAPI + pandas,
SQLite como fonte de verdade, shell desktop Tauri. Sync incremental com Google
Drive (por data de modificação) para GPS, wellness e testes de força; sync
opcional e unidirecional local → Supabase (sempre upsert) para leitura na nuvem.

**Decisões-chave.**
- Local-first: nenhum CSV processado na nuvem; custo de hospedagem zero.
- Nenhum cálculo de negócio no banco ou no front — tudo numa camada Python.
- Upsert com chave natural em toda tabela; nunca insert simples.
- Resolução de nomes de atleta por fuzzy matching contra um registry central,
  com fila de pendências revisada manualmente (nome não resolvido não entra).
- Dados de força (VALD) só locais na v1 — menor superfície de exposição.

**Resultado.** Plataforma em produção com 11 módulos: sessão GPS diária,
relatórios semana-a-semana com metas, carga/PSE, acompanhamento ao vivo,
perfil individual, wellness (Hooper + pós-treino + calendário de avaliações),
força (3 aparelhos VALD), gestão de atletas/empréstimos, admin de sync e
export PDF client-side. Milhares de registros processados por temporada.

**O que aprendi.** O nome que vem do próprio ecossistema de origem
(`catapult_name`) é mais confiável pra matching do que o nome oficial
cadastrado — matching por nome "bonito" gera falsos positivos com sobrenomes
comuns. E manter todo o cálculo numa camada só paga a dívida rápido: trocar a
visualização (Streamlit → Next.js) não tocou o pipeline.

## EN

**Problem.** Botafogo's youth-academy performance department needed to turn
raw GPS exports (Catapult), wellness forms and strength tests into usable
daily information — with zero cloud cost and without processing sensitive
athlete data outside club machines.

**Target user.** Coaching and physiology staff of the youth academy
(U15/U17/U20).

**My role.** Sole developer: architecture, data pipeline, backend, frontend,
deploy.

**Process.** Started in Streamlit to validate the workflow with staff, then
migrated to a monorepo: Next.js + React + Tailwind webapp, local FastAPI +
pandas backend, SQLite as source of truth, Tauri desktop shell. Incremental
Google Drive sync (by modified time) for GPS, wellness and strength files;
optional one-way local → Supabase sync (always upsert) for cloud reads.

**Key decisions.**
- Local-first: no CSV ever processed in the cloud; zero hosting cost.
- No business calculations in the database or frontend — single Python layer.
- Natural-key upserts everywhere; never plain inserts.
- Athlete-name resolution via fuzzy matching against a central registry, with
  a manually reviewed pending queue (unresolved names never enter the DB).
- Strength (VALD) data local-only in v1 — smaller exposure surface.

**Final result.** Production platform with 11 modules: daily GPS session,
week-over-week reports with targets, load/RPE, live monitoring, individual
athlete profile, wellness (Hooper + post-training + assessment calendar),
strength (3 VALD devices), athlete/loan management, sync admin, and
client-side PDF export. Thousands of records processed per season.

**What I learned.** The name coming from the source ecosystem
(`catapult_name`) beats the official registered name for matching — "pretty
name" matching produces false positives on common surnames. And keeping all
computation in one layer pays off fast: swapping the visualization layer
(Streamlit → Next.js) didn't touch the pipeline.

## Demo no site

Mock interativo (Recharts): gráfico de sessão GPS + tabela de atletas
fictícios + mini-painel wellness. Dados de `lib/mock/` conforme
`mock-data-spec.md`, badge fictício obrigatório.
