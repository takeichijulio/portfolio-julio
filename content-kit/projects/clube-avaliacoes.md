# Case 3 — Academy Evaluations Hub (interno: clube-avaliacoes)

- **Slug:** `evaluations-hub`
- **Tipo:** employer — clube de futebol (nome não publicado, v3) — demo só com mock data + badge, sem Supabase real
- **Código:** privado — "available on request"

## PT

**Problema.** Calendário de avaliações, presenças e compliance de 6
departamentos viviam espalhados — e o novo hub precisava conversar com os
dados de GPS/wellness já processados pela plataforma Catapult, sem duplicar
pipeline nem criar segunda fonte de escrita.

**Usuário-alvo.** Equipe técnica e departamentos de performance da base (categorias U15/U17).

**Meu papel.** Único desenvolvedor: modelagem, API, UI e integração.

**Processo.** App full-stack Next.js (App Router) + TypeScript + Tailwind,
Drizzle ORM. Duas implementações de persistência atrás de facades por domínio
(calendário, jogadores, avaliações, compliance): SQLite pra dev local,
Supabase (PostgreSQL) pra produção — alternadas por uma única variável de
ambiente. Integração com a plataforma GPS via projeto Supabase compartilhado:
o hub lê sessões/wellness read-only; a plataforma Catapult continua sendo a
única escritora desses dados.

**Decisões-chave.**
- Um único escritor por domínio de dados: GPS/wellness pertencem ao pipeline
  Catapult; o hub escreve só avaliações/calendário (tabelas próprias com
  prefixo).
- Facade + `DATABASE_MODE`: mesma UI e API rodam em SQLite ou Supabase sem
  mudança de código.
- Nome canônico de atleta compartilhado entre os sistemas (mesma chave usada
  pelo pipeline GPS) — a integração inteira depende dessa convenção.
- Calendário com blocos encadeados (um evento por data+categoria) e presença
  com 4 estados.

**Resultado.** MVP + integração implementados: painel do dia, calendário
mês/semana, perfil de atleta com painel GPS+wellness integrado, compliance
semanal por área, import CSV por departamento e sync de atletas a partir do
registry da plataforma GPS (mais de uma centena de atletas sincronizados).

**O que aprendi.** Integrar dois sistemas pelo mesmo banco só funciona com
regras de propriedade explícitas — quem escreve o quê, e chave de identidade
compartilhada decidida antes do código. E que a fronteira de ambiente importa:
uma variável de produção colocada no `.env` errado do sistema vizinho quebrou
o dev local dele — regra documentada no próprio arquivo depois disso.

## EN

**Problem.** Evaluation calendars, attendance and compliance for 6 departments
lived scattered — and the new hub had to consume GPS/wellness data already
processed by the Catapult platform without duplicating pipelines or creating
a second write source.

**Target user.** Academy technical staff and departments (U15/U17 categories).

**My role.** Sole developer: data modeling, API, UI and integration.

**Process.** Full-stack Next.js (App Router) + TypeScript + Tailwind app with
Drizzle ORM. Two persistence implementations behind per-domain facades
(calendar, players, evaluations, compliance): SQLite for local dev, Supabase
(PostgreSQL) for production — switched by a single environment variable.
Integration with the GPS platform via a shared Supabase project: the hub reads
sessions/wellness read-only; the Catapult platform remains the only writer of
that data.

**Key decisions.**
- Single writer per data domain: GPS/wellness belong to the Catapult pipeline;
  the hub only writes evaluations/calendar (own prefixed tables).
- Facade + `DATABASE_MODE`: same UI and API run on SQLite or Supabase with no
  code changes.
- Canonical athlete name shared across systems (same key the GPS pipeline
  uses) — the whole integration hangs on that convention.
- Calendar with chained blocks (one event per date+category) and 4-state
  attendance.

**Final result.** MVP + integration implemented: day panel, month/week
calendar, athlete profile with integrated GPS+wellness panel, weekly
compliance per area, per-department CSV import, and athlete sync from the GPS
platform registry (a hundred-plus athletes synced).

**What I learned.** Integrating two systems through one database only works
with explicit ownership rules — who writes what, and a shared identity key
agreed before any code. Environment boundaries matter too: one production
variable dropped into the neighbor system's `.env` broke its local dev — the
rule is now documented in the file itself.

## Demo no site

Mock de calendário + painel de compliance (componentes estáticos, dados de
`lib/mock/`). Nenhuma conexão Supabase. Badge fictício obrigatório.
