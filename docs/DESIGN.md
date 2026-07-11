# Design — direções visuais e decisão

## As 3 direções propostas

### 1. Performance Dark ✅ (escolhida)
Dark premium de análise esportiva: fundo quase-preto, superfícies em camadas,
tipografia Space Grotesk (display) + Inter (corpo) + JetBrains Mono (dados),
acento **sky `#38BDF8`** — deliberadamente diferente do ouro Botafogo
(`#C9A227`/`#E8A020` dos dashboards internos) para o portfolio parecer produto
do Júlio, não clone do trabalho. Números e métricas em mono, gráficos como
protagonistas.

### 2. Editorial Light (descartada)
Fundo claro, serif + sans, gráficos tratados como ilustração editorial.
Bonito, mas conta a história errada: o diferencial do Júlio é sistema de
dados em produção, não editorial. Contraste com os dashboards internos viraria
distância deles.

### 3. Terminal Minimal (descartada)
JetBrains Mono dominante, verde/cyan, estética de terminal. Destaca o lado
Rust/IA local mas subrepresenta o trabalho visual (dashboards, PDF, design
system) que é metade dos cases.

**Racional da escolha:** o público é recrutador de sports data / full-stack;
Performance Dark posiciona no domínio certo à primeira vista, permite demos
Recharts que parecem produto real, e o acento sky + camadas próprias evitam o
"clone Botafogo" (risco mapeado no plano). Mono entra só em dados/código —
herança da direção 3 sem o custo dela.

## Tokens (fonte de verdade: `src/app/globals.css` via `@theme`)

| Token | Valor | Uso |
|---|---|---|
| `bg` | `#0A0A0A` | Fundo da página |
| `surface` | `#141414` | Cards, seções alternadas |
| `elevated` | `#1C1C1F` | Hover, elementos sobre cards |
| `border` | `#26262B` | Bordas e divisores |
| `text` | `#F4F4F5` | Texto principal |
| `muted` | `#9F9FA8` | Texto secundário |
| `accent` | `#38BDF8` | Links, CTAs, destaque de dados |
| `success` | `#4ADE80` | Métricas positivas |
| `warning` | `#FBBF24` | Alertas, badge fictício |
| `danger` | `#F87171` | Métricas negativas |

Fontes (next/font, variáveis CSS): `--font-display` Space Grotesk,
`--font-body` Inter, `--font-mono` JetBrains Mono.

## Regras

- **Dark-only por decisão** (não é falta de tema claro): a identidade é
  analytics premium; um toggle claro dobraria o custo de manutenção visual
  sem ganho pro público-alvo.
- Cor de acento nunca como cor de texto longo — só em links, CTAs, números
  de destaque e marcas de gráfico.
- Badge "dados fictícios" sempre em `warning`, visível sem hover, nos demos NSP.
- Animações via Framer Motion, sempre condicionadas a `prefers-reduced-motion`.
- Gráficos Recharts usam a paleta de tokens (accent/success/warning/danger +
  muted para eixos) — nunca cores default da lib.
