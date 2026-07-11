# Case 5 — Agenda Pessoal (agenda-pessoal)

- **Slug:** `personal-agenda-bot`
- **Tipo:** pessoal — demo com dados fictícios
- **Código:** privado (sem repo público) — "available on request"

## PT

**Problema.** Organizar rotina pessoal e planejamento de treinos de handebol
universitário num lugar só — com lembretes proativos e controle por conversa
no Telegram, sem pagar API de LLM e sem mandar dados pessoais pra terceiros.

**Usuário-alvo.** Eu mesmo (uso exclusivo, autenticado, servidor só em
localhost).

**Meu papel.** Único desenvolvedor.

**Processo.** Servidor único Flask servindo site + API REST; frontend sem
build (HTML/CSS/JS puro, Tailwind e FullCalendar via CDN); dados em JSON
simples — deliberadamente sem banco. Bot de conversa no Telegram usando
modelo local (Ollama): perguntas livres sobre a agenda, criação/edição/
conclusão/exclusão de tarefas e eventos, ações em lote — sempre com
confirmação explícita antes de gravar. Notificações automáticas com resumo
periódico e um watchdog independente que avisa se o servidor cair.

**Decisões-chave.**
- Simplicidade radical: Flask + JSON + CDN — zero build, zero dependência de
  infra; o app inicia com um `.bat` no Startup do Windows.
- Toda escrita disparada por conversa pede confirmação "sim/não" antes de
  gravar — inclusive em lote (a lista real é mostrada antes de confirmar).
- Quando falta informação (local do evento, data real de conclusão), o bot
  pergunta em vez de assumir — e entende "hoje", "ontem", dias da semana e
  datas explícitas.
- Autenticação dupla: sessão de navegador pra UI, token Bearer pra automação.
- Anti-alucinação em código, não em prompt: notificação gerada pelo modelo só
  é aceita se citar todos os títulos reais dos itens; no cenário "nada
  pendente", um filtro heurístico rejeita resposta com cara de lista
  inventada — nos dois casos, cai pra texto determinístico.

**Resultado.** Em uso diário: CRUD completo via web e via conversa, resumos
periódicos até o comando "finaliza o dia", campo de data real de conclusão
separado do prazo, UI agrupada por data com seção de concluídas, e vigia
avisando queda/retorno do servidor.

**O que aprendi.** Modelo local alucina mesmo com instrução explícita de
"nunca inventar" — a proteção que funciona é validar a saída em código contra
os dados reais, com fallback determinístico. E que a stack mais simples
possível (sem build, sem banco) é uma feature quando o objetivo é rodar todo
dia sem manutenção.

## EN

**Problem.** Organizing my personal routine and university handball training
planning in one place — with proactive reminders and conversational control
through Telegram, without paying for an LLM API or sending personal data to
third parties.

**Target user.** Myself (single user, authenticated, server bound to
localhost only).

**My role.** Sole developer.

**Process.** Single Flask server for site + REST API; no-build frontend
(plain HTML/CSS/JS, Tailwind and FullCalendar via CDN); data in plain JSON —
deliberately no database. Telegram conversation bot backed by a local model
(Ollama): free-form questions about the agenda, create/edit/complete/delete
for tasks and events, batch actions — always with explicit confirmation
before writing. Automatic notifications with periodic summaries and an
independent watchdog that pings me if the server goes down.

**Key decisions.**
- Radical simplicity: Flask + JSON + CDN — zero build, zero infra; the app
  starts from a `.bat` in Windows Startup.
- Every conversation-triggered write asks "yes/no" before saving — batch
  actions included (the real item list is shown before confirming).
- When information is missing (event location, actual completion date), the
  bot asks instead of assuming — understanding "today", "yesterday", weekdays
  and explicit dates.
- Dual auth: browser session for the UI, Bearer token for automation.
- Anti-hallucination in code, not in the prompt: model-generated
  notifications are only accepted if they mention every real item title; in
  the "nothing pending" case a heuristic filter rejects anything that looks
  like an invented list — both fall back to deterministic text.

**Final result.** In daily use: full CRUD via web and via conversation,
periodic summaries until an "end the day" command, actual-completion date
separate from the deadline, date-grouped UI with a completed section, and a
watchdog reporting server down/up.

**What I learned.** Local models hallucinate even with an explicit "never
invent" instruction — the protection that works is validating output in code
against real data, with a deterministic fallback. And the simplest possible
stack (no build, no database) is a feature when the goal is running every day
with zero maintenance.

## Demo no site

Mock de UI calendário/tarefas + transcrição fake de conversa com o bot
(fluxo de confirmação). Dados fictícios.
