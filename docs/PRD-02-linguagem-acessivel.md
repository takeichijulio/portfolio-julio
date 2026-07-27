# PRD-02 — portfolio-julio: camada de linguagem acessível + adoção da Linguagem Visual "HUD"

**Status:** proposto, aguardando validação
**Data:** 2026-07-26
**Ordem de execução:** 2º — só começa depois do [PRD-01](../../portfolio-freela/docs/PRD-01-redesign-futurista.md) fechar
**Dependência dura:** a Linguagem Visual "HUD" é definida na **seção 3 do PRD-01** e consumida aqui sem redefinição

---

## 1. Contexto

### Problema
O `portfolio-julio` está tecnicamente muito bem resolvido — Next.js 15, i18n
PT/EN, 6 case studies com demos interativas, Lighthouse 96/100/96/92. Mas ele
foi escrito **por um técnico, para um técnico**.

Evidência concreta e não hipotética: você passou o portfólio para uma gestora, e
ela não conseguiu aproveitar o conteúdo. A linguagem estava acima do repertório
dela.

Exemplo real, do case `gps-load-dashboard.json`:

> "Implementei sync incremental com Google Drive (por data de modificação) para
> GPS, wellness e testes de força, e sync opcional unidirecional local → nuvem
> (sempre upsert) para leitura remota."

Isso é uma frase excelente — **para um lead de engenharia**. Para a gestora que
decide se te chama pra conversar, é ruído. Ela não consegue extrair a informação
que importa: *esse cara resolveu um problema real de um clube e o sistema está
em produção.*

O problema não é o conteúdo técnico existir. É ele ser **a única porta de
entrada**.

### Quem é afetado
- **Gestor / RH / recrutador não técnico** — hoje o site perde essa pessoa. É o
  público que mais frequentemente faz a primeira triagem.
- **Lead técnico / engenheiro** — precisa do conteúdo técnico intacto, sem
  diluição. Se a simplificação *substituir* o técnico, o site perde credibilidade
  no público que decide a contratação de fato.
- **Júlio** — precisa de um único link que sirva pros dois.

---

## 2. Objetivo

### O que o sistema deve fazer
1. Tornar a **primeira leitura de toda página acessível a um leitor não
   técnico**, sem jargão.
2. Preservar 100% do conteúdo técnico atual, movido para **blocos expansíveis
   por seção** ("ver detalhes técnicos"), fechados por padrão.
3. Adotar a Linguagem Visual "HUD" definida no PRD-01, na "temperatura alta"
   (coluna Julio do catálogo de efeitos).
4. Manter tudo em PT e EN.

### Fora do escopo
- **Remover ou diluir qualquer conteúdo técnico.** Nada é apagado — só reordenado.
- Trocar o tom da página inteira via toggle global. *(Descartado na entrevista:
  você escolheu blocos expansíveis por seção.)*
- Mudar as demos interativas, os mocks ou o `CONFIDENTIALITY.md`.
- Adicionar dados reais de clube. As regras de confidencialidade continuam
  intocadas e acima deste PRD.
- Novos case studies.

### ⚠️ Regra global sendo conscientemente adaptada
O `CLAUDE.md` global e o `design-system/PORTFOLIO.md` puxam pra profundidade
técnica. Este PRD **não remove** essa profundidade — reordena a hierarquia de
leitura. O técnico deixa de ser o primeiro parágrafo e passa a ser o segundo
clique. Foi uma decisão sua, validada na entrevista, e está registrada aqui de
propósito.

---

## 3. Modelo de conteúdo em duas camadas

### 3.1 Camada Simples (padrão, sempre visível)
- Frases curtas, voz ativa.
- **Zero jargão sem tradução.** Proibidos sem explicação: *pipeline, upsert,
  fuzzy matching, monorepo, SSG, fragment shader, sync incremental,
  human-in-the-loop, LLM local, sandbox.*
- Responde sempre 3 perguntas, nessa ordem: **Qual era o problema de quem usa?
  O que eu construí? O que mudou depois?**
- Números só quando forem verdadeiros e verificáveis.

### 3.2 Camada Técnica (colapsada)
- É **literalmente o conteúdo atual**: `problem`, `process`, `keyDecisions`,
  `learned` como estão hoje nos JSONs. Nada reescrito, nada perdido.

### 3.3 Mudança na estrutura dos JSONs de case

Hoje (`src/content/{pt,en}/cases/*.json`):
```
title, tagline, problem, targetUser, myRole, process, keyDecisions[], result, learned
```

Proposto — campos novos, nenhum removido:
```json
{
  "title": "...",
  "tagline": "...",
  "simple": {
    "tagline": "versão sem jargão da tagline",
    "summary": "3–5 frases respondendo problema / o que construí / resultado",
    "highlights": ["até 3 bullets curtos, sem termo técnico"]
  },
  "problem": "...", "targetUser": "...", "myRole": "...",
  "process": "...", "keyDecisions": [...], "result": "...", "learned": "..."
}
```

**Custo real:** 6 cases × 2 idiomas = **12 arquivos**, mais as chaves novas em
`messages/pt.json` e `messages/en.json`. É a maior parte do esforço deste PRD.

---

## 4. Proposta de copy simplificada (para sua revisão)

Você pediu que eu já escrevesse. Estes textos são **proposta**, derivados do
conteúdo existente em `src/content/pt/cases/` — nada inventado. Revise antes de
comitar; especialmente os números e o quanto revelar sobre o clube.

> ⚠️ Todos seguem a regra do `CONFIDENTIALITY.md`: "um clube de futebol", nunca
> o nome.

### 4.1 GPS & Load Dashboard
**Tagline simples:** *Um painel que transforma os dados dos coletes GPS em
decisão de treino no mesmo dia.*

> O departamento de performance de um clube recebia os dados dos coletes GPS dos
> atletas em planilhas soltas, e levava horas pra transformar isso em algo útil.
> Construí um sistema que faz esse trabalho sozinho: o preparador abre o
> computador e vê, no mesmo dia, quanto cada atleta correu, como ele está se
> sentindo e se está pegando carga demais.
> O sistema roda dentro do clube — sem mensalidade de nuvem e sem que os dados
> dos atletas saiam de lá. Está em produção, processando milhares de registros
> por temporada.

**Highlights:** `Em produção` · `11 áreas do dia a dia num lugar só` · `Custo de servidor: zero`

### 4.2 Multi-department Performance Hub
**Tagline simples:** *Sete áreas do clube, uma ficha só por atleta.*

> Fisiologia, medicina, fisioterapia, psicologia, nutrição, serviço social e
> pedagogia anotavam as avaliações cada uma na sua planilha. Ninguém conseguia
> ver a ficha completa de um atleta, e a comissão técnica não tinha um relatório
> consolidado.
> Construí um painel onde cada área continua registrando do seu jeito, mas tudo
> se junta numa ficha única — e de onde sai um relatório em PDF por atleta.
> Está em uso diário, validado com centenas de atletas reais.

**Highlights:** `7 áreas integradas` · `Relatório em PDF por atleta` · `Em uso diário`

### 4.3 Academy Evaluations Hub
**Tagline simples:** *Calendário de avaliações e presença, sem ninguém digitar duas vezes.*

> O calendário de avaliações e o controle de presença viviam espalhados entre
> seis departamentos. Fiz um hub que mostra o dia, a semana e o mês num lugar só.
> A parte que mais economiza tempo: ele puxa automaticamente os dados que o
> painel de GPS já tinha processado, então ninguém precisa digitar a mesma
> informação duas vezes. Mais de cem atletas sincronizados.

**Highlights:** `6 departamentos` · `Zero digitação duplicada` · `100+ atletas sincronizados`

### 4.4 Jarvis — Assistente de Voz Pessoal
**Tagline simples:** *Um assistente pessoal que eu falo e ele responde — e que roda no meu próprio computador.*

> Queria um assistente que juntasse agenda, e-mail e notícias num lugar só, sem
> pagar mensalidade e sem mandar minha vida pessoal pra fora do computador.
> Construí um: eu falo, ele responde. Lê minha agenda, separa os e-mails em três
> pilhas por prioridade, e me dá um resumo falado do dia de manhã. Também
> organiza minhas anotações — 22 delas, em 7 áreas — e as envia pro meu caderno
> digital com um clique.

**Highlights:** `Roda 100% local` · `Voz e texto` · `Sem custo de assinatura`

### 4.5 Local AI Agent (Human-in-the-Loop)
**Tagline simples:** *Uma IA que nunca age sozinha: mostra o que pretende fazer e espera eu aprovar.*

> Projetei um assistente de IA que roda inteiro no meu computador, sem serviço
> pago e sem nada saindo da máquina. A regra central do projeto é de segurança:
> a IA **não tem permissão** para mexer em arquivo nenhum por conta própria.
> Antes de qualquer ação, ela mostra exatamente o que pretende mudar e fica
> parada esperando eu aprovar ou recusar.

**Highlights:** `Aprovação humana obrigatória` · `Funciona offline` · `Nada sai do computador`

### 4.6 Personal Ops + Telegram Bot
**Tagline simples:** *Minha agenda e meus treinos, controlados por conversa no Telegram.*

> Juntei minha rotina pessoal e o planejamento dos treinos de handebol
> universitário num sistema só. O diferencial é que eu não preciso abrir nada:
> converso com ele pelo Telegram, ele me lembra do que ainda falta ao longo do
> dia e, quando eu digo "finaliza o dia", fecha o resumo.

**Highlights:** `Controle por conversa` · `Lembretes automáticos` · `Em uso diário`

---

## 5. Requisitos Funcionais

### RF-01 — Componente `<TechDetails>`
Bloco colapsável reutilizável, alinhado ao visual HUD.
**Aceitação:**
- Baseado em `<details>`/`<summary>` nativo — **funciona sem JavaScript**
- Fechado por padrão em todas as instâncias
- Rótulo i18n: PT "Ver detalhes técnicos" / EN "View technical details"
- Indicador visual de estado (chevron rotacionando, `aria-hidden`)
- Conteúdo presente no HTML inicial → **indexável pelo Google**, não lazy
- `prefers-reduced-motion`: sem animação de abertura
- Navegável por teclado (Enter/Espaço), foco visível
- **CLS = 0** — abrir empurra conteúdo abaixo, nunca sobrepõe

### RF-02 — Página de case em duas camadas
Reordenar `src/app/[locale]/projects/[slug]/page.tsx` (164 linhas hoje):

```
Hero: title + simple.tagline
Bloco simples: simple.summary + simple.highlights
Demo interativa + FictionalBadge   ← permanece exatamente onde está
▸ Ver detalhes técnicos            ← COLAPSADO
    Problema · Público · Meu papel · Processo
    Decisões-chave · Resultado · O que aprendi   (conteúdo atual, intacto)
```
**Aceitação:** nenhum texto dos JSONs atuais desaparece do DOM.

### RF-03 — Home e About também simplificadas
A camada acessível não pode existir só nos cases — a home é a primeira página.
**Aceitação:** revisão de `messages/{pt,en}.json` (255 linhas cada) marcando
todo jargão; hero, seção de projetos e about reescritos em linguagem simples,
com `<TechDetails>` onde houver profundidade técnica a preservar.

### RF-04 — Controle "expandir tudo"
Um botão discreto no topo da página de case: "Expandir tudo / Recolher tudo".
Serve pro leitor técnico que quer ler direto.
**Aceitação:** alterna todos os `<details>` da página; estado **não** persiste
entre navegações (evita cookie/localStorage e a complexidade que vem junto).

### RF-05 — Adoção da Linguagem Visual HUD
Aplicar os efeitos da coluna "Julio ✅" do catálogo (PRD-01 seção 6): scroll
progress (6.1), reveal com stagger (6.2), kinetic heading (6.3), magnetic card
(6.5), border glow (6.6), botão fill-sweep (6.7), scanlines (6.8), streaks
(6.9), corner brackets (6.15), índices mono (6.16), spotlight de cursor (6.17),
grain (6.18), ticker de stack (6.19), view transitions (6.22).
**Aceitação:** cada um verificado com `prefers-reduced-motion: reduce` ativo.

### RF-06 — Atualizar o design system
`design-system/PORTFOLIO.md` passa a v4, incorporando o HUD e — se você aprovar
a seção 3.2 do PRD-01 — **reescrevendo a lista de anti-padrões**, que hoje
proíbe glow e parallax.
**Aceitação:** o documento não contradiz o código implementado.

### RF-07 — Paridade PT/EN
**Aceitação:** todo campo `simple.*` existe nos 12 arquivos; nenhuma chave de
`messages/*.json` órfã em um dos idiomas.

---

## 6. Requisitos Técnicos

### Stack
Sem stack nova. Tudo com o que já existe: Next.js 15, Tailwind 4, next-intl,
Framer Motion, lucide-react.

Um único componente novo: `src/components/tech-details.tsx`.

### Restrições
- **Sem regressão de Lighthouse.** O baseline atual é 96/100/96/92 e é o piso.
- Conteúdo técnico no HTML inicial (SEO + acessibilidade), nunca carregado sob
  demanda.
- `CONFIDENTIALITY.md` continua acima deste PRD. A copy simplificada **não pode**
  vazar nada que a técnica já não vazava — traduzir para linguagem simples é
  justamente onde esse risco aumenta.
- Todas as rotas continuam SSG.
- `prefers-reduced-motion` obrigatório.

---

## 7. Critérios de Sucesso

1. **Teste do leitor não técnico** — alguém sem background em dados lê a página
   de um case sem expandir nada e consegue explicar, com as próprias palavras,
   o que você construiu e pra que serviu. *Idealmente a mesma gestora, ou
   alguém de perfil equivalente.* Este é o critério que gerou o PRD.
2. **Teste do leitor técnico** — um engenheiro expande os blocos e encontra
   exatamente a mesma profundidade de hoje, sem perda.
3. Lighthouse ≥ 96/100/96/92 (sem regressão).
4. CLS = 0 com blocos abrindo e fechando.
5. Conteúdo técnico visível no `view-source` e indexado.
6. Coerência visual com o `portfolio-freela` já migrado — validada por você,
   lado a lado.
7. PT e EN em paridade total.

---

## 8. Riscos e Dependências

| Risco | Impacto | Mitigação |
|---|---|---|
| Simplificar demais e parecer júnior | Perde o público técnico | O bloco técnico está sempre a 1 clique, e a copy simples cita "em produção", "milhares de registros" — o peso continua visível na primeira camada |
| A tradução pra linguagem simples vazar detalhe operacional do clube | **Quebra de confidencialidade** | Revisar cada texto da seção 4 contra o `CONFIDENTIALITY.md` **antes de comitar**. Risco maior que o normal: linguagem simples é mais concreta |
| 12 JSONs + 2 arquivos de messages = volume alto de edição manual | Inconsistência PT/EN | Fazer um case por vez, PT e EN juntos, e um script de checagem de chaves |
| `<details>` nativo é difícil de animar com fidelidade entre browsers | Abertura brusca | Aceitar a abertura instantânea — é o comportamento nativo e acessível. Priorizar funcionar sem JS sobre animar |
| Blocos fechados escondem conteúdo do usuário que não percebe que existe | Perde os dois públicos | Rótulo explícito + contador ("6 seções") + RF-04 "expandir tudo" |
| Adotar HUD junto com a mudança de conteúdo = dois riscos num commit | Difícil isolar regressão | **Fasear:** camada de conteúdo primeiro, visual HUD depois, commits separados |
| Anti-padrões do `PORTFOLIO.md` conflitam com o HUD | Design system mentindo | Bloqueado pela decisão da seção 3.2 do PRD-01 |

### ✅ Discrepância resolvida (2026-07-26)
O `README.md` dizia **"5 case studies"**, mas `src/content/pt/cases/` tem **6
arquivos** (`jarvis-assistente-voz.json` não aparecia no README).
**Decisão do Júlio: incluir todos os 6.** O README está desatualizado e passa a
ser corrigido como parte da entrega (`docs-scribe`).

Confirmado também que os 6 têm nota correspondente no vault
(`wiki/projetos/`: `webapp-catapult`, `dashboard-nsp-botafogo`,
`clube-avaliacoes`, `agente-julio`, `agenda-pessoal`,
`jarvis-assistente-voz`) — essas notas têm contexto que os JSONs não têm e
devem ser lidas pelo `content-writer` antes de escrever a copy simples.

### Dependências
- **PRD-01 concluído** — a linguagem visual vem de lá.
- ~~Decisão sobre a seção 3.2 do PRD-01~~ ✅ resolvida: Orbitron, glow e
  parallax **entram**, com teto por efeito. Julio = densidade alta.
- Sua revisão da copy da seção 4 — em especial a checagem de confidencialidade.
- ~~Discrepância do README~~ ✅ resolvida acima.

### Consequência da decisão tipográfica
`Space Grotesk` sai e `Orbitron` entra como `--font-display` (PRD-01 §3.2/3.3).
Isso **mexe em código já existente e funcionando** do `portfolio-julio`:
`src/app/globals.css`, a config de `next/font` e toda classe `font-display`.
É a mudança de maior superfície de regressão visual deste PRD — o `verifier`
precisa varrer as 5 rotas × 2 locales depois da troca.

---

## 9. Próximo passo

Execução por subagentes, não por issues (decisão 2026-07-26). Ver
[PLANO-EXECUCAO.md](../../portfolio-freela/docs/PLANO-EXECUCAO.md).

Ainda pendente de você: revisar a copy da seção 4 (gate de confidencialidade).
