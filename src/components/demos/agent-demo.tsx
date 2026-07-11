"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  Eye,
  FileText,
  Plus,
  RotateCcw,
  TerminalSquare,
} from "lucide-react";
import {
  MOCK_PROPOSALS,
  MOCK_PROPOSAL_POOL,
  type MockProposal,
} from "@/lib/mock/agenda";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AuditEntry {
  id: string;
  summary: string;
  decision: "approved" | "rejected";
  at: string;
}

const KIND_ICON = {
  write_file: FileText,
  run_command: TerminalSquare,
  read_file: Eye,
} as const;

export default function AgentDemo() {
  const t = useTranslations("demos.agent");
  const locale = useLocale() as "pt" | "en";
  const [proposals, setProposals] = useState<MockProposal[]>(MOCK_PROPOSALS);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [poolIndex, setPoolIndex] = useState(0);

  const kindLabel = {
    write_file: t("typeWrite"),
    run_command: t("typeRun"),
    read_file: t("typeRead"),
  } as const;

  function decide(id: string, decision: "approved" | "rejected") {
    const proposal = proposals.find((p) => p.id === id);
    if (!proposal) return;
    setProposals((prev) => prev.filter((p) => p.id !== id));
    setAudit((prev) => [
      {
        id,
        summary: proposal.summary[locale],
        decision,
        at: new Date().toLocaleTimeString(locale === "pt" ? "pt-BR" : "en-US"),
      },
      ...prev,
    ]);
  }

  function simulate() {
    const template = MOCK_PROPOSAL_POOL[poolIndex % MOCK_PROPOSAL_POOL.length];
    setPoolIndex((i) => i + 1);
    setProposals((prev) => [
      ...prev,
      { ...template, id: `sim-${Date.now()}` },
    ]);
  }

  function reset() {
    setProposals(MOCK_PROPOSALS);
    setAudit([]);
    setExpanded(null);
    setPoolIndex(0);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
          {t("queue")}
        </h4>
        <Badge variant="turf">
          <Cpu aria-hidden size={12} />
          {t("ollamaBadge")}
        </Badge>
      </div>

      {proposals.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-border px-4 py-6">
          <p className="text-sm text-muted">{t("queueEmpty")}</p>
          <Button
            variant="outline"
            className="px-3 py-1.5 text-xs"
            onClick={simulate}
          >
            <Plus aria-hidden size={13} />
            {t("simulate")}
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {proposals.map((proposal) => {
            const Icon = KIND_ICON[proposal.kind];
            const isOpen = expanded === proposal.id;
            return (
              <li
                key={proposal.id}
                className="rounded-lg border border-border bg-elevated p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <Icon aria-hidden size={16} className="mt-0.5 text-data" />
                    <div>
                      <p className="text-sm text-chalk">
                        {proposal.summary[locale]}
                      </p>
                      <p className="font-mono text-xs text-muted">
                        {kindLabel[proposal.kind]} · {proposal.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() => setExpanded(isOpen ? null : proposal.id)}
                      aria-expanded={isOpen}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:text-chalk"
                    >
                      {isOpen ? (
                        <ChevronUp aria-hidden size={13} />
                      ) : (
                        <ChevronDown aria-hidden size={13} />
                      )}
                      {isOpen ? t("diffHide") : t("diffShow")}
                    </button>
                    <Button
                      variant="primary"
                      className="px-3 py-1.5 text-xs"
                      onClick={() => decide(proposal.id, "approved")}
                    >
                      {t("approve")}
                    </Button>
                    <Button
                      variant="outline"
                      className="px-3 py-1.5 text-xs hover:border-error hover:text-error"
                      onClick={() => decide(proposal.id, "rejected")}
                    >
                      {t("reject")}
                    </Button>
                  </div>
                </div>
                {isOpen && (
                  <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-pitch p-3 font-mono text-[11px] leading-relaxed">
                    {proposal.diff.map((line, i) => (
                      <div
                        key={i}
                        className={cn(
                          line.startsWith("+")
                            ? "text-turf"
                            : line.startsWith("-")
                              ? "text-error"
                              : line.startsWith("$")
                                ? "text-data"
                                : "text-muted",
                        )}
                      >
                        {line}
                      </div>
                    ))}
                  </pre>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {t("audit")}
        </h4>
        {audit.length === 0 ? (
          <p className="text-sm text-muted">{t("auditEmpty")}</p>
        ) : (
          <ul className="flex flex-col gap-1 font-mono text-xs">
            {audit.map((entry) => (
              <li key={`${entry.id}-${entry.at}`} className="text-muted">
                <span className="text-muted/60">{entry.at}</span>{" "}
                <span
                  className={
                    entry.decision === "approved" ? "text-turf" : "text-error"
                  }
                >
                  [{t(entry.decision)}]
                </span>{" "}
                {entry.summary}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {proposals.length > 0 && (
          <Button
            variant="ghost"
            className="px-0 py-0 text-xs"
            onClick={simulate}
          >
            <Plus aria-hidden size={13} />
            {t("simulate")}
          </Button>
        )}
        {(audit.length > 0 || proposals.length !== MOCK_PROPOSALS.length) && (
          <Button
            variant="ghost"
            className="px-0 py-0 text-xs"
            onClick={reset}
          >
            <RotateCcw aria-hidden size={13} />
            {t("reset")}
          </Button>
        )}
      </div>
    </div>
  );
}
