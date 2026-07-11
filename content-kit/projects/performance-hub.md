# Case 2 — Multi-department Performance Hub

- **Slug:** `performance-hub`
- **Tipo:** employer — clube de futebol (nome não publicado, v3) — demo só com mock data + badge
- **Código:** privado — "available on request"

## PT

**Problema.** Os departamentos do núcleo de saúde e performance da base
(fisiologia, medicina, fisioterapia, psicologia, nutrição, serviço social,
pedagogia) registravam avaliações em planilhas separadas — sem visão unificada
por atleta e sem relatório consolidado pra comissão.

**Usuário-alvo.** Staff multidisciplinar da base; acesso com dois perfis
(comum e admin).

**Meu papel.** Único desenvolvedor, do pipeline de importação ao deploy.

**Processo.** App Streamlit monolítico com SQLite sincronizado via Google
Drive (o banco nunca vai pro git), pipeline de parsers por departamento
(GPS, composição corporal, força, saúde, multidisciplinar, wellness) rodando
local ou via página de importação. Iterei o visual em rodadas curtas de
feedback direto com o usuário real. Gerador de PDF por atleta reconstruído
com react-pdf (Node chamado por subprocess do Python) depois de uma primeira
tentativa descartada.

**Decisões-chave.**
- Streamlit Community Cloud + SQLite no Drive = produção com custo zero.
- Autenticação bcrypt + rate limiting no login (janela deslizante por IP),
  com storage de rate limit separado do banco principal (que é sobrescrito
  pelo sync do Drive).
- Tema dark completo com paleta própria e regra de acessibilidade: cor de
  status nunca é cor de texto — só ícone ou fundo de badge/pill.
- Wellness só entra no gráfico em dias com sessão GPS real do atleta (join
  com as métricas de sessão) — evita pontos soltos sem contexto.
- 86 testes pytest cobrindo parsers, rate limiting e a ponte de PDF.

**Resultado.** Em produção, uso diário: dashboards por departamento, importação
self-service, PDF por atleta validado com centenas de atletas reais, backup e
restauração com confirmação em 2 passos.

**O que aprendi.** Três lições de produção que viraram regra: (1) pipeline de
teste automatizado aprovou um PDF visualmente quebrado — validação visual do
artefato real a cada rodada é inegociável; (2) um `.gitignore` sem âncora de
raiz (`dist/` vs `/dist/`) corrompeu pacotes vendorizados só no deploy — o
clone limpo local virou etapa obrigatória antes do push; (3) componente de
abas que esconde painel com `display:none` zera a altura de gráficos em
iframe pra sempre — troquei abas por radio buttons e o problema sumiu.

## EN

**Problem.** The youth academy's health & performance departments (physiology,
medicine, physiotherapy, psychology, nutrition, social work, pedagogy) kept
evaluations in separate spreadsheets — no unified per-athlete view, no
consolidated report for staff.

**Target user.** Academy multidisciplinary staff; two access profiles (regular
and admin).

**My role.** Sole developer, from import pipeline to deploy.

**Process.** Monolithic Streamlit app with SQLite synced via Google Drive
(the database never touches git), a parser pipeline per department (GPS, body
composition, strength, health, multidisciplinary, wellness) running locally or
through an import page. Iterated the visuals in short feedback rounds with the
real user. Per-athlete PDF engine rebuilt with react-pdf (Node called via
Python subprocess) after a first attempt was discarded.

**Key decisions.**
- Streamlit Community Cloud + SQLite on Drive = zero-cost production.
- bcrypt auth + login rate limiting (sliding window per IP), with rate-limit
  storage kept separate from the main DB (which Drive sync overwrites).
- Full dark theme with its own palette and an accessibility rule: status
  color is never text color — icon or badge/pill background only.
- Wellness only charts on days with a real GPS session for that athlete
  (join with session metrics) — no context-free floating points.
- 86 pytest cases covering parsers, rate limiting and the PDF bridge.

**Final result.** In production, daily use: per-department dashboards,
self-service imports, per-athlete PDF validated against hundreds of real
athletes, 2-step-confirmed backup/restore.

**What I learned.** Three production lessons that became rules: (1) an
automated test pipeline approved a visually broken PDF — visually validating
the real artifact every round is non-negotiable; (2) an unanchored
`.gitignore` pattern (`dist/` vs `/dist/`) corrupted vendored packages only
in deploy — a local clean-clone check became mandatory before pushing;
(3) tab components that hide panels with `display:none` permanently zero the
height of iframe-based charts — replaced tabs with radio buttons and the
problem disappeared.

## Demo no site

Screenshots recriados/sanitizados **ou** mini-demo estático estilo Streamlit
com dados fictícios (preferível: recriar do zero, sem asset de produção).
Badge fictício obrigatório.
