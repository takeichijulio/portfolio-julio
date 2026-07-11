"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FileText, RotateCcw, TerminalSquare } from "lucide-react";
import { MOCK_PROPOSALS, type MockProposal } from "@/lib/mock/agenda";
import { Button } from "@/components/ui/button";

interface AuditEntry {
  id: string;
  summary: string;
  decision: "approved" | "rejected";
  at: string;
}

export default function AgentDemo() {
  const t = useTranslations("demos.agent");
  const locale = useLocale() as "pt" | "en";
  const [proposals, setProposals] = useState<MockProposal[]>(MOCK_PROPOSALS);
  const [audit, setAudit] = useState<AuditEntry[]>([]);

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

  function reset() {
    setProposals(MOCK_PROPOSALS);
    setAudit([]);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {t("queue")}
        </h4>
        {proposals.length === 0 ? (
          <p className="text-sm text-muted">{t("queueEmpty")}</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {proposals.map((proposal) => (
              <li
                key={proposal.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-elevated p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  {proposal.kind === "write_file" ? (
                    <FileText aria-hidden size={16} className="mt-0.5 text-data" />
                  ) : (
                    <TerminalSquare
                      aria-hidden
                      size={16}
                      className="mt-0.5 text-data"
                    />
                  )}
                  <div>
                    <p className="text-sm text-chalk">
                      {proposal.summary[locale]}
                    </p>
                    <p className="font-mono text-xs text-muted">
                      {proposal.detail}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
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
              </li>
            ))}
          </ul>
        )}
      </div>

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

      {(audit.length > 0 || proposals.length < MOCK_PROPOSALS.length) && (
        <Button
          variant="ghost"
          className="self-start px-0 py-0 text-xs"
          onClick={reset}
        >
          <RotateCcw aria-hidden size={13} />
          {t("reset")}
        </Button>
      )}
    </div>
  );
}
