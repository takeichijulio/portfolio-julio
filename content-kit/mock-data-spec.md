# Mock Data Spec

Regras para TODOS os dados exibidos nos demos dos cases do domínio do futebol.
Implementar como geradores centralizados em `lib/mock/` (seed determinística,
pra demo ser estável entre builds). Nenhum componente de demo pode ter dado
hardcoded fora de `lib/mock/`.

## Regras gerais

1. **Badge obrigatório** em todo demo: "Demo — fictional data" (EN) /
   "Demonstração — dados fictícios" (PT), visível sem hover.
2. **Zero fetch** — nenhum request de rede; tudo estático ou gerado client-side.
3. Nomes de atleta: `Atleta A` … `Atleta Z` (PT) / `Athlete A` … (EN).
   Nunca nomes plausíveis de pessoa real.
4. Categorias: usar apenas rótulos genéricos `U15`, `U17`, `U20`.
5. Datas: janela relativa (últimos 7/30 dias a partir do build), nunca datas
   de jogos/sessões reais.
6. Valores redondos ou visivelmente sintéticos — plausíveis o bastante pra
   demo fazer sentido, mas sem corresponder a nenhum atleta real.

## Faixas por domínio (plausíveis, fictícias)

### GPS (demo Catapult)
| Métrica | Faixa mock |
|---|---|
| Distância total (sessão) | 3.500–8.500 m |
| Distância alta intensidade | 300–900 m |
| Sprints (contagem) | 5–30 |
| Velocidade máxima | 27,0–33,5 km/h |
| Player load / UA | 200–650 |

### Wellness (demos GPS & Load Dashboard / Performance Hub)
| Métrica | Faixa mock |
|---|---|
| Sono (horas) | 6,0–9,5 |
| Qualidade do sono / cansaço / estresse / dor muscular | escala 1–7 |
| Hooper Index | soma das 4 escalas (4–28) |
| PSE pós-treino | 1–10 |

### Força (referência VALD, se aparecer no demo)
| Métrica | Faixa mock |
|---|---|
| Força por membro (L/R) | 250–450 N |
| Assimetria | −15% a +15% (destacar |>10%|) |

### Avaliações / compliance (demo clube-avaliacoes)
- 6 áreas genéricas (Fisiologia, Medicina, Fisioterapia, Nutrição,
  Psicologia, Pedagogia)
- Presença: 4 estados (presente, ausente, justificado, reagendado)
- Compliance semanal: 40–100%

### Agenda / agente (demos pessoais)
- Tarefas/eventos genéricos ("Treino UVA", "Revisar planilha", "Consulta")
- Times: usar nomes fictícios de time se necessário; os nomes reais dos times
  universitários são públicos e podem aparecer no texto do case, mas nos demos
  preferir genérico
- Fila de aprovação do agente: propostas fake (escrever arquivo, rodar comando)
  com estados Aprovar/Rejeitar simulados

### Grade semanal de carga (demo GPS & Load — aba Carga)
| Métrica | Faixa mock |
|---|---|
| PSE da sessão | 2–9 (dias de descanso = célula vazia) |
| UA da sessão | 220–640 |
| Banda de carga | baixa < 350 UA · média 350–520 · alta > 520 |

### Metas semanais (demo GPS & Load — aba Metas)
| Métrica | Meta fixa | Realizado |
|---|---|---|
| Distância total | 30.000 m | 62–132% da meta |
| Alta intensidade | 3.500 m | idem |
| Sprints | 120 | idem |
| Destaque | < 80% (vermelho) ou > 120% (laranja) | |

### Máximos (demo GPS & Load — aba Máximos)
| Métrica | Faixa mock | Escopos |
|---|---|---|
| Velocidade máxima | 29,0–34,5 km/h | Temporada / Últimos 90 dias (90d ≤ temporada) |
| Maior distância em sessão | 7.800–10.800 m | idem |
| Maior UA em sessão | 500–780 | idem |

### Dores por região (demo Performance Hub — Wellness)
Regiões genéricas (posterior de coxa, quadríceps, tornozelo, joelho, lombar,
adutor), 0–9 relatos por semana no grupo.

### Multidisciplinar (demo Performance Hub — radar)
4 áreas genéricas (Psicologia, Nutrição, Serviço Social, Pedagogia),
notas 5,5–9,5 (escala 0–10).

### Calendário de avaliações (demo Evaluations Hub)
Próximos 14 dias, 0–3 avaliações/dia, categorias U15/U17 apenas —
**U20 fica sem agenda de propósito** para exercitar o empty state.

## Estrutura sugerida

```
lib/mock/
  athletes.ts        # gerador de atletas fictícios (nome, categoria)
  gps.ts             # sessões GPS mock
  wellness.ts        # respostas wellness/PSE mock
  strength.ts        # testes de força mock (L/R + assimetria)
  evaluations.ts     # calendário/compliance mock
  agenda.ts          # tarefas/eventos/propostas mock
  seed.ts            # PRNG com seed fixa
```
