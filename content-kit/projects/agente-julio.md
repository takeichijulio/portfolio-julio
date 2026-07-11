# Case 4 — Agente Júlio (agente-julio)

- **Slug:** `local-ai-agent`
- **Tipo:** pessoal — demo com estado fake ok (não é dado de empregador)
- **Código:** privado (sem repo público) — "available on request"

## PT

**Problema.** Eu queria um agente de IA de verdade rodando 100% na minha
máquina — sem API paga, sem dado saindo do PC — mas sem abrir mão de
segurança: um modelo local não pode ter permissão de escrever arquivo ou
rodar comando sozinho.

**Usuário-alvo.** Eu mesmo (ferramenta pessoal; escopo de dados exclui
explicitamente qualquer coisa do trabalho — Botafogo/NSP/menores nunca
entram no workspace).

**Meu papel.** Único desenvolvedor: app desktop, backend Rust, integração LLM.

**Processo.** App desktop Tauri 2 (Rust) + React + TypeScript, LLM local via
Ollama. Desenvolvido com TDD real no backend Rust (sandbox, agenda, auditoria
têm suítes de teste). O modelo responde numa "intenção estruturada" (JSON com
ação proposta: escrever arquivo, ler, rodar comando) que cai numa fila de
aprovação com diff antes de qualquer execução.

**Decisões-chave.**
- **Human-in-the-loop inegociável:** o modelo só propõe; toda execução passa
  por Aprovar/Rejeitar. Não existe modo autônomo, nem escondido.
- Tauri em vez de Electron: sandboxing declarativo real — o frontend nunca
  toca filesystem/processo direto, só via comandos Rust expostos.
- Sandbox de arquivo com `canonicalize()` + verificação de prefixo do
  workspace (testado contra `..`, paths absolutos, arquivos novos).
- Limite do sandbox de terminal documentado honestamente: `cwd` fixo no
  workspace, mas a defesa real é a aprovação manual do comando exato.
- Preview de escrita separado do commit (diff antes de gravar).
- Log de auditoria append-only (JSONL), tolerante a linha corrompida.

**Resultado.** Agente funcional: chat com modelo local, fila de aprovação com
diff, execução sandboxed de arquivo/terminal, histórico de conversas, agenda
pessoal em checklist e aba de relatórios de ação — tudo offline.

**O que aprendi.** Rust + Tauri pra valer (capabilities, testes, parsing
defensivo — modelo local às vezes embrulha JSON em code fence e o parser tem
que aguentar). E que a arquitetura de segurança de um agente é decisão de
produto, não detalhe: propor ≠ executar, e essa linha precisa estar no
runtime, não no prompt.

## EN

**Problem.** I wanted a real AI agent running 100% on my machine — no paid
API, no data leaving the PC — without giving up safety: a local model must
not be able to write files or run commands on its own.

**Target user.** Myself (personal tool; the data scope explicitly excludes
anything work-related — Botafogo/NSP/minors never enter the workspace).

**My role.** Sole developer: desktop app, Rust backend, LLM integration.

**Process.** Tauri 2 (Rust) + React + TypeScript desktop app, local LLM via
Ollama. Built with real TDD on the Rust backend (sandbox, agenda and audit
modules have test suites). The model answers with a "structured intent"
(JSON proposing an action: write file, read, run command) that lands in an
approval queue with a diff before anything executes.

**Key decisions.**
- **Non-negotiable human-in-the-loop:** the model only proposes; every
  execution goes through Approve/Reject. No autonomous mode, hidden or
  otherwise.
- Tauri over Electron: real declarative sandboxing — the frontend never
  touches filesystem/processes directly, only through exposed Rust commands.
- File sandbox with `canonicalize()` + workspace prefix check (tested against
  `..`, absolute paths, new files).
- Terminal sandbox limits documented honestly: `cwd` pinned to the workspace,
  but the real defense is manual approval of the exact command.
- Write preview separated from commit (diff before saving).
- Append-only audit log (JSONL), tolerant to corrupted lines.

**Final result.** Working agent: chat with a local model, approval queue with
diffs, sandboxed file/terminal execution, conversation history, personal
checklist agenda and an action-reports view — all offline.

**What I learned.** Rust + Tauri for real (capabilities, tests, defensive
parsing — local models sometimes wrap JSON in code fences and the parser must
survive it). And that an agent's safety architecture is a product decision,
not a detail: proposing ≠ executing, and that line must live in the runtime,
not in the prompt.

## Demo no site

Mock da fila de aprovação human-in-the-loop: proposta fake com diff +
botões Aprovar/Rejeitar mudando estado client-side. Sem LLM real no site.
