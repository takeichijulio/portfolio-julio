# HANDOFF — portfolio-julio

Estado do projeto em **2026-07-11**, fim da Sessão 4. Este documento permite
que qualquer pessoa (ou modelo) continue o trabalho sem contexto anterior.

## O que é

Portfolio pessoal bilíngue (PT/EN) do Júlio Takeichi — **Profissional de
Sports Data no futebol, construindo caminho para engenharia de dados**
(posicionamento v3: honesto, sem cargo inflado, sem nome de clube em nenhum
lugar público). 5 case studies com demos mock interativas.

## Estado: pronto para deploy

- ✅ 4 sessões concluídas (content kit → scaffold → páginas core → cases → QA)
- ✅ Build limpo: 22 rotas, todas SSG exceto o catch-all da 404
- ✅ Lighthouse (build de produção local): `/pt` **96/100/96/92**,
  `/en/projects/gps-load-dashboard` **97/100/96/92**
  (performance/accessibility/best-practices/seo) — meta a11y ≥ 90 ✅
- ✅ Checklist de confidencialidade passou (ver abaixo)
- ⬜ Deploy Vercel (passos abaixo — precisa da conta do Júlio)
- ⬜ Criar remote público no GitHub (só após revisão final do Júlio)

## Deploy (Vercel free tier)

1. Criar o repo no GitHub (público) e dar push:
   `git remote add origin <url> && git push -u origin main`
2. Em vercel.com: **Add New → Project → Import** do repo. Framework preset
   Next.js é detectado sozinho; nenhuma configuração extra é necessária.
3. Única env var (opcional, recomendada): `NEXT_PUBLIC_SITE_URL` =
   `https://<dominio-final>` — usada como `metadataBase` das tags OG/canonical.
4. Deploy automático a cada push em `main`.
5. Pós-deploy: testar `/` (redireciona pra `/pt`), toggle PT/EN, os 5 cases,
   uma URL inexistente (404 custom) e o OG preview (ex. opengraph.xyz).

## Checklist de confidencialidade (rodado 2026-07-11)

Comandos e resultado — rodar de novo antes de todo deploy:

| Verificação | Comando | Resultado |
|---|---|---|
| Nome de clube | `git grep -iE "botafogo\|\bnsp\b"` | ✅ zero (fora docs de política) |
| Drive/keys/URLs internas | `git grep -iE "drive.google\|supabase.co\|service_account\|API_KEY"` | ✅ zero |
| Cargo inflado | `git grep -iE "data engineer\|engenheiro de dados"` em src/messages | ✅ só frases "building toward/caminho para" |
| "Futebol profissional" | `git grep -i "futebol profissional\|professional football"` | ✅ só nos docs de política |
| Screenshots de produção | inspeção manual `public/` | ✅ só foto de perfil |

## Arquitetura (resumo)

- **Next.js 15 App Router + TS 5 + Tailwind 4** (tokens `@theme` em
  `src/app/globals.css`), **next-intl 4** (`/pt`, `/en`; copy de UI em
  `messages/*.json`), Framer Motion, Recharts.
- **Design system:** `design-system/PORTFOLIO.md` (direção **Pitch Tech**,
  tokens, motion spec, checklist ui-ux-pro-max). Componentes shadcn-style
  copy-in em `src/components/ui/`.
- **Conteúdo dos cases:** `src/content/{pt,en}/cases/<slug>.json`
  (Problem → Learned). Metadados/tags/slugs em `src/lib/projects.ts`.
- **Demos:** `src/components/demos/` — client-side, lazy (next/dynamic +
  Skeleton), dados exclusivamente de `src/lib/mock/` (PRNG seed fixa).
  Regra dura: demo nunca faz fetch; badge fictício obrigatório nos 3 cases
  de futebol.
- **Fonte de copy longa:** `content-kit/` (bio, resumos, mock-data-spec) —
  entrada das sessões de build, não é servido pelo site.

## Regras que não podem ser quebradas

1. Tudo em `CONFIDENTIALITY.md` (clube, atletas, métricas reais, keys).
2. Copy: nunca "Engenheiro de dados/Data Engineer" como cargo atual; nunca
   "futebol profissional"; headline/tagline v3 exatas.
3. Demos: só `lib/mock/`, badge visível, zero fetch.
4. Todo motion respeita `prefers-reduced-motion`.
5. **Nunca rodar `npm run build` com o dev server aberto** — corrompe
   `.next` (aconteceu 2×; fix: parar server + `rm -rf .next`).

## Backlog (não bloqueia deploy)

- Repos públicos bônus (`vald-dashboard`, `handball-planner`) ainda não
  linkados na UI — decidido que entram; sugestão: seção "Extras" no About
  ou no fim de Projects.
- LinkedIn: Júlio não tem — quando criar, adicionar em Contact/footer.
- Sitemap.xml (opcional; precisa do domínio final).
- OG image dedicada (hoje usa só title/description).
- Form de contato (Formspree/Resend) se o mailto não bastar.

## Contexto externo

- Wiki do projeto (fonte de verdade das decisões):
  `C:\Users\julio\Documentos\Wikia do Júlio\wiki\projetos\portfolio-julio.md`
- Plano v3: `C:\Users\julio\.cursor\plans\portfolio_premium_fable_704bdb83.plan.md`
