# IMPROVEMENTS — auto-review (Sessão 5, 2026-07-11)

Review feita em três papéis: design director, engenheiro frontend sênior e
recrutador (teste dos 30 segundos). P0 = corrigido nesta sessão; P1 = vale
fazer antes/logo após o deploy; P2 = backlog.

## Visual

- ✅ Demos agora têm densidade de produto real (grades, dual-axis, scatter,
  radar, pills) — deixou de parecer "gráfico de linha genérico".
- **P1** — OG image dedicada (hoje o compartilhamento usa só título/descrição;
  um card 1200×630 com headline + mini-chart elevaria o primeiro contato).
- **P1** — Hero: o pitch grid SVG fica quase invisível em telas muito largas
  (>1600px); considerar aumentar levemente a opacidade ou escalar o viewBox.
- **P2** — Footer sem ano/nota de copyright.

## UX

- **P0 (corrigido)** — Demo Personal Ops agrupava tarefa atrasada sob "Hoje";
  agora há grupo "Atrasadas" próprio, como no produto real.
- **P1** — `DemoRadio` usa `role="radio"` sem navegação por setas (padrão
  ARIA de radiogroup). Funciona por Tab (são buttons), mas não é idiomático.
  Trocar por roving tabindex ou por radios nativos estilizados.
- **P1** — Na aba Sessão do GPS demo, a seleção de atleta por clique na linha
  é discreta; considerar coluna com radio explícito ou ícone.
- **P2** — Demos poderiam ter um botão "resetar tudo" global por página.

## Copy

- ✅ Passe profissional aplicado nos 10 JSONs (voz ativa, sem "comecei/eu
  queria/pra", verbos precisos), posicionamento v3 intacto, grep de clube limpo.
- **P1** — `personal-ops.myRole` ("Desenvolvedor único.") é curto demais em
  relação aos outros cases; aceitável, mas pode ganhar meia linha de escopo.
- **P2** — Revisar EN com falante nativo antes de divulgar amplamente.

## Performance

- ✅ Demos continuam lazy (next/dynamic + Skeleton); Recharts só entra no
  chunk das páginas de case.
- **P1** — GPS demo importa ComposedChart + LineChart; consolidar num único
  tipo reduziria ~2-3 kB. Baixo impacto.
- **P2** — `sitemap.xml` quando houver domínio final.

## a11y

- ✅ `scope="col"` em todas as tabelas; toggles com `aria-pressed`; radios com
  `aria-checked`; empty states textuais.
- **P0 (corrigido)** — Gráfico principal de Wellness no GPS demo não tinha
  rótulo acessível (caption era <p> solto); agora tem `role="img"` +
  `aria-label`.
- **P1** — Gráficos Recharts não expõem dados a leitores de tela (limitação
  da lib); mitigação futura: tabela visualmente oculta com os dados.

## Recruiter 30s (re-teste após Sessão 5)

Home → headline honesta + KPIs + 3 destaques ✅. Case GPS → badge fictício,
5 vistas de produto, narrativa Problem→Learned ✅. Nenhum blocker novo.

## Backlog priorizado

| P | Item | Status |
|---|---|---|
| P0 | Grupo "Atrasadas" no Personal Ops demo | ✅ feito |
| P0 | aria-label no chart de Wellness (GPS demo) | ✅ feito |
| P1 | OG image dedicada | pós-deploy |
| P1 | DemoRadio com navegação por setas | pós-deploy |
| P1 | Seleção de atleta mais explícita na tabela de Sessão | pós-deploy |
| P1 | Repos bônus (vald-dashboard, handball-planner) na UI | pós-deploy |
| P2 | Sitemap, footer year, revisão EN nativa, reset global de demo | backlog |
