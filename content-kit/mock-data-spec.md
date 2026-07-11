# Mock Data Spec

Regras para TODOS os dados exibidos nos demos dos cases Botafogo/NSP.
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

### Wellness (demos Catapult / Dashboard NSP)
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
