"use client";

import React from "react";
import ScoreRulePreview from "@/components/dashboard/score-audit/score-rule-preview";

export default function ScoreRulePreviewPage() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 bg-slate-50">
      <ScoreRulePreview />
    </main>
  );
}
