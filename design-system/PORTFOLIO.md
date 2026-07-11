# Design System — Pitch Tech (v3)

Direção visual do portfolio: **Pitch Tech** — dark premium tech + futebol.
Substitui a "Performance Dark" da v1 do scaffold (mesma base escura; ganha o
acento `turf`, o pattern de campo e a spec de motion). Alternativas
consideradas e descartadas: Editorial Light (conta a história errada — o
diferencial é sistema em produção) e Terminal Scout (subrepresenta o trabalho
visual dos dashboards).

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

Tipografia: **Space Grotesk** (headlines) · **Inter** (body) ·
**JetBrains Mono** (métricas/KPI). Via next/font, variáveis
`--font-display` / `--font-body` / `--font-mono`.

## Componentes base (shadcn-style, `src/components/ui/`)

`Button` (primary/outline/ghost) · `Card` (+Title/Description) ·
`Badge` (default/turf/data/alert) · `Skeleton`. Copy-in, sem dependência de
CLI; `cn()` em `src/lib/utils.ts` (clsx + tailwind-merge).

`FictionalBadge` (`src/components/fictional-badge.tsx`) usa `Badge`
variant `alert` — obrigatório em todo demo de futebol.

## Motion spec

| Onde | Efeito | Implementação |
|---|---|---|
| Hero | Grid de campo sutil no fundo | SVG/CSS decorativo, `aria-hidden`, opacidade baixa |
| Hero | Headline com stagger por palavra | Framer Motion, `useReducedMotion` |
| Hero | KPI counters animados (dados de `lib/mock/`, rotulados como fictícios) | Framer Motion `useInView` + contagem |
| Projects | Tilt 3D sutil no hover dos cards | CSS `.card-tilt`, desligado em `prefers-reduced-motion` |
| Global | Header glass (blur on scroll) | `backdrop-blur` no header sticky |
| 404 | Bola "fora do campo" | SVG leve com animação CSS |

**Regra:** todo efeito respeita `prefers-reduced-motion` (hook
`useReducedMotion` do Framer Motion ou media query CSS).

**Anti-padrões (look genérico de template AI):** gradientes neon, glow
excessivo, borda arredondada em tudo, parallax pesado, lorem ipsum.

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
