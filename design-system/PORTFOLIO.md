# Design System — Pitch Tech (v4)

Direção visual do portfolio: **Pitch Tech** — dark premium tech + futebol.
Substitui a "Performance Dark" da v1 do scaffold (mesma base escura; ganha o
acento `turf`, o pattern de campo e a spec de motion). Alternativas
consideradas e descartadas: Editorial Light (conta a história errada — o
diferencial é sistema em produção) e Terminal Scout (subrepresenta o trabalho
visual dos dashboards).

**v4 (2026-07-26):** adota a Linguagem Visual "HUD" definida em
`portfolio-freela/docs/PRD-01-redesign-futurista.md` §3.2–3.3. Tipografia,
anti-padrões e motion spec atualizadas com tetos numéricos nos efeitos de glow
e parallax, que agora são permitidos sob controle explícito. Adicionada seção
sobre a camada de linguagem acessível (`<TechDetails>`).

**Regra de marca:** nunca usar nome, logo ou cores institucionais de clube.
A identidade é do Júlio, não de empregador.

## Tokens (fonte de verdade: `src/app/globals.css` via `@theme`)

| Token | Hex | Uso |
|---|---|---|
| `pitch` | `#0A0A0A` | Fundo principal |
| `line` | `#1A2E1A` | Grid/pattern de campo (decorativo, opacidade baixa) |
| `surface` | `#141414` | Cards, seções alternadas |
| `elevated` | `#1C1C1F` | Hover, camada acima do card |
| `border` | `#26262B` | Bordas e divisores |
| `turf` | `#22A855` | Sucesso, acento primário (verde do skill) |
| `data` | `#38BDF8` | Links, CTAs, gráficos, acento tech |
| `chalk` | `#FFFFFF` | Texto principal |
| `muted` | `#C0C0C0` | Texto secundário |
| `alert` | `#E07820` | Alertas, badge "dados fictícios" |
| `error` | `#D93025` | Erros |

Tipografia: **Orbitron** (display: H1/H2 e rótulos uppercase, pesos 500/700 apenas) · **Inter** (body) ·
**JetBrains Mono** (métricas/KPI). Via next/font, variáveis
`--font-display` / `--font-body` / `--font-mono`. **Space Grotesk descontinuada** — Orbitron
substitui como única fonte display. Orbitron **nunca** em parágrafo ou texto corrido.

## Componentes base (shadcn-style, `src/components/ui/`)

`Button` (primary/outline/ghost) · `Card` (+Title/Description) ·
`Badge` (default/turf/data/alert) · `Skeleton`. Copy-in, sem dependência de
CLI; `cn()` em `src/lib/utils.ts` (clsx + tailwind-merge).

`FictionalBadge` (`src/components/fictional-badge.tsx`) usa `Badge`
variant `alert` — obrigatório em todo demo de futebol.

## Motion spec (Camada HUD)

Implementação: CSS via `globals.css` + IntersectionObserver puro em `src/components/fx/HudEffects.tsx`.
Nenhuma animação renderiza se `prefers-reduced-motion: reduce` estiver ativa no SO do usuário.

### Efeitos base (obrigatórios, densidade alta)

| # | Efeito | CSS / JS | Uso |
|---|---|---|---|
| 6.1 | **Scroll progress bar** — barra 2px no topo, gradiente ciano, `scaleX` conforme scroll | `rAF` + `transform` | Todas as páginas |
| 6.2 | **Reveal on scroll com stagger** — elementos sobem 28px + fade; delay 90ms por índice dentro da seção | `[data-reveal]` + `IntersectionObserver` | Todas as seções |
| 6.3 | **Kinetic heading** — H1/H2 entra com `blur(8px) → 0` + `scale(0.98) → 1` | CSS transition | Títulos de seção |
| 6.5 | **Magnetic card** — card translada ±6px seguindo cursor, volta ao `mouseleave`. Só em `pointer: fine` | `[data-magnetic]` + `mousemove` | Cards de projeto |
| 6.6 | **Border glow no hover** — `border-border` → `border-data/50` | CSS puro, 500ms | Todos os cards |
| 6.7 | **Botão fill-sweep** — camada branca sobe de `translate-y-full` até `0` no hover | `.btn-sweep::before` | CTAs principais |
| 6.15 | **Corner brackets** — colchetes L nos 4 cantos, aparecem/expandem no hover | `::before`/`::after` com gradientes | Cards temáticos |

### Camadas decorativas (complementares)

| # | Efeito | Implementação | Densidade |
|---|---|---|---|
| 6.8 | **CRT scanlines** — linhas horizontais 4px, overlay fixo | `linear-gradient` + `background-size` | Alta (opacidade 0.4) |
| 6.9 | **Vertical light streaks** — linhas ciano a cada 10vw | `linear-gradient` repetido | Baixa (opacidade 0.03) |
| 6.10 | **Vinheta radial** — `radial-gradient` do centro ciano → preto | CSS puro | Baixa (opacidade controlada) |
| 6.11 | **Scan line horizontal** — linha que varre elemento em 3s | `@keyframes hud-scan` | Rótulos e divisores |
| 6.13 | **Scrollbar customizada** — 6px, thumb ciano translúcido | `::-webkit-scrollbar` | Global |
| 6.14 | **Parallax de fundo** — camada decorativa `speed -0.14`, teto 0.15 | `[data-parallax-speed]` + `rAF` | Fundo apenas |
| 6.16 | **Índices mono `01/02/03`** — numeração translúcida atrás de cards | `position: absolute` + `.hud-index` | Cards temáticos |
| 6.17 | **Spotlight de cursor** — `radial-gradient` 400px, opacidade 8% | `[data-spotlight]` + `mousemove` | Cards de case |
| 6.18 | **Grain overlay** — textura `feTurbulence`, opacidade 0.04 | SVG inline via `background-image` | Subtil, global |

**Rede de segurança (1500ms):** se o IntersectionObserver falhar,
`[data-reveal]` revela tudo automaticamente. Invisível em operação normal.

## Decisões de Arquitetura (resolvem bugs reais)

### Sem `<script>` mutante na árvore do layout
Antes da v4, um `<script>` na árvore do layout escrevia uma classe `js` no `<html>`
depois da hidratação React. **Problema:** className diverge entre servidor e cliente,
quebrando a hidratação e derrubando os listeners do HudEffects.

**Solução:** nenhum `<script>` na árvore. CSS esconde `[data-reveal]` por padrão.
Um `<noscript><style>` no `<body>` desfaz o CSS quando JS está desligado — nada
fica invisível. Markup é idêntico servidor×cliente.

## Padrões permitidos com teto numérico (v3 → v4)

A v3 proibia "glow excessivo" e "parallax pesado" sem número. A v4 **permite ambos**
com limites explícitos, inspirada na `referencia_futurista` sob controle.

### Glow (box-shadow ciano)
- **Julio (densidade alta):** opacidade ≤ 0.10 (ex.: `rgb(56 189 248 / 0.1)`)
- Aplicado em cards de destaque e na interação de hover
- **Proibido:** glow em rótulos ou detalhe pequeno (causa piscada)

### Parallax
- **Teto:** `speed` ≤ 0.15
- **Aplicação:** só camadas decorativas de fundo (`HudBackgrounds`)
- **Proibido:** parallax em conteúdo textual (prejudica leitura)

### Gradiente ciano
- **Aplicação:** scroll progress bar (6.1) e vinheta radial (6.10)
- **Proibido:** gradiente neon em fundo ou bordas de card

### Borda arredondada
- **Padrão:** `rounded-none` (cantos 90°) em todos os elementos UI
- **Exceção única:** botão flutuante de WhatsApp no freela (convenção reconhecível)

### Fonte Orbitron em headlines
- **Uso:** H1, H2, rótulos `uppercase` com `tracking-[0.3em]`
- **Pesos:** 500 (display) e 700 (emphasis) apenas
- **Proibido:** Orbitron em parágrafo, corpo de texto ou caption

### Proibições absolutas
- Lorem ipsum (zero tolerância em copy)
- Runtime de terceiro no cliente (nada de WebGL, Iconify CDN, embed externo)
- Efeito cinematográfico dissonante com a estética "painel/HUD" (e.g., blur
  excessivo em fundo, múltiplos acentos de cor, layout fluido com muita margem)

## Camada de Linguagem Acessível

Componente `<TechDetails>` em `src/components/tech-details.tsx`:

- Baseado em `<details>`/`<summary>` nativo — **funciona sem JavaScript**
- Fechado por padrão em todas as instâncias
- Rótulo i18n: PT "Ver detalhes técnicos" / EN "View technical details"
- Indicador visual: chevron rotacionando no hover/open
- Conteúdo presente no HTML inicial — **indexável pelo Google**, não lazy
- Respeita `prefers-reduced-motion`: sem animação de abertura
- Navegável por teclado (Enter/Espaço), foco visível automático
- **CLS = 0** quando abre: empurra conteúdo abaixo, nunca sobrepõe

**Regra:** primeira leitura de toda página acessível a leitor não técnico, sem jargão.
Conteúdo técnico preservado 100%, apenas reordenado para o segundo clique.

## Checklist ui-ux-pro-max (gate de merge por componente)

- [ ] Loading state (Skeleton) — em toda seção assíncrona/demo
- [ ] Empty state (mensagem + CTA)
- [ ] Error state (mensagem visível + retry) — nunca falhar em silêncio
- [ ] Responsivo mobile → desktop
- [ ] Tipografia hierárquica clara
- [ ] Cores só do design system
- [ ] Ações destrutivas com confirmação (se houver)
- [ ] `prefers-reduced-motion` respeitado

Nota: páginas 100% estáticas (sem fetch nem demo) não têm estado de
loading/erro real — o checklist de estados aplica-se às demos mock e a
qualquer seção com carregamento adiado.
