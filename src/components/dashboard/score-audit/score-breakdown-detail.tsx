"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Download,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  Plus,
  BarChart2,
  Tag,
  Star,
  Users,
  TrendingDown,
  Shield,
  AlertCircle,
  Check,
  PlayCircle,
  BarChart,
  Info,
} from "lucide-react";


// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface ScoreComponent {
  label: string;
  score: number | null;
  color: string;
  barColor: string;
  trackColor: string;
  weight: number;
  weightLabel: string;
}

interface EvidenceRow {
  icon: React.ReactNode;
  source: string;
  items: number | string;
  status: "Fresh" | "Stale" | "OK";
  lastUpdated: string;
}

interface HistoryRow {
  version: string;
  score: number;
  change: string;
  changeDelta: number | null;
  reason: string;
  model: string;
  updatedBy: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────

const SCORE_COMPONENTS: ScoreComponent[] = [
  {
    label: "Value Score",
    score: 74,
    color: "text-amber-600",
    barColor: "bg-amber-400",
    trackColor: "bg-amber-100",
    weight: 25,
    weightLabel: "Weight 25%",
  },
  {
    label: "Quality Score",
    score: 88,
    color: "text-emerald-600",
    barColor: "bg-emerald-500",
    trackColor: "bg-emerald-100",
    weight: 25,
    weightLabel: "Weight 25%",
  },
  {
    label: "Review Trust Score",
    score: 81,
    color: "text-blue-600",
    barColor: "bg-blue-500",
    trackColor: "bg-blue-100",
    weight: 20,
    weightLabel: "Weight 20%",
  },
  {
    label: "Price Score",
    score: 62,
    color: "text-orange-500",
    barColor: "bg-orange-400",
    trackColor: "bg-orange-100",
    weight: 20,
    weightLabel: "Weight 20%",
  },
  {
    label: "Health / Safety Score",
    score: null,
    color: "text-slate-400",
    barColor: "bg-slate-200",
    trackColor: "bg-slate-100",
    weight: 0,
    weightLabel: "Weight 0%",
  },
  {
    label: "Expert / YouTube Evidence Score",
    score: 70,
    color: "text-violet-600",
    barColor: "bg-violet-500",
    trackColor: "bg-violet-100",
    weight: 10,
    weightLabel: "Weight 10%",
  },
];

const WEIGHT_ROWS = [
  { label: "Value Score", pct: 25, barColor: "bg-amber-400" },
  { label: "Quality Score", pct: 25, barColor: "bg-emerald-500" },
  { label: "Review Trust Score", pct: 20, barColor: "bg-blue-500" },
  { label: "Price Score", pct: 20, barColor: "bg-orange-400" },
  { label: "Expert / YouTube Evidence", pct: 10, barColor: "bg-violet-500" },
];

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    icon: <Tag className="w-3.5 h-3.5 text-blue-500" />,
    source: "Retailer Prices",
    items: 12,
    status: "Fresh",
    lastUpdated: "May 18, 2024, 8:45 AM",
  },
  {
    icon: <Star className="w-3.5 h-3.5 text-amber-500" />,
    source: "Review Clusters",
    items: "1,842",
    status: "Fresh",
    lastUpdated: "May 18, 2024, 8:12 AM",
  },
  {
    icon: <PlayCircle className="w-3.5 h-3.5 text-red-500" />,
    source: "YouTube Reviews",
    items: 38,
    status: "Fresh",
    lastUpdated: "May 18, 2024, 6:10 AM",
  },
  {
    icon: <Users className="w-3.5 h-3.5 text-violet-500" />,
    source: "Expert Reviews",
    items: 14,
    status: "Stale",
    lastUpdated: "May 17, 2024, 11:20 PM",
  },
  {
    icon: <BarChart className="w-3.5 h-3.5 text-teal-500" />,
    source: "Price History (90d)",
    items: 90,
    status: "Fresh",
    lastUpdated: "May 18, 2024, 8:40 AM",
  },
  {
    icon: <Shield className="w-3.5 h-3.5 text-slate-400" />,
    source: "User Reports",
    items: 6,
    status: "OK",
    lastUpdated: "May 18, 2024, 6:15 AM",
  },
];

const HISTORY_ROWS: HistoryRow[] = [
  {
    version: "electronics-v1.2",
    score: 76,
    change: "-6",
    changeDelta: -6,
    reason: "Price increased above 90-day average",
    model: "v1.2",
    updatedBy: "Scoring Engine",
    updatedAt: "May 18, 2024, 9:23 AM",
  },
  {
    version: "electronics-v1.1",
    score: 82,
    change: "-4",
    changeDelta: -4,
    reason: "Lower Review Trust Score",
    model: "v1.1",
    updatedBy: "Scoring Engine",
    updatedAt: "May 16, 2024, 8:12 AM",
  },
  {
    version: "electronics-v1.0",
    score: 86,
    change: "—",
    changeDelta: null,
    reason: "Initial score",
    model: "v1.0",
    updatedBy: "Scoring Engine",
    updatedAt: "May 10, 2024, 10:05 AM",
  },
];

// ─────────────────────────────────────────────────────────────
// HELPER: Status Badge
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "Fresh" | "Stale" | "OK" }) {
  const styles = {
    Fresh: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Stale: "bg-amber-50 text-amber-700 border border-amber-200",
    OK: "bg-slate-100 text-slate-600 border border-slate-200",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPER: Radial Score Ring (SVG)
// ─────────────────────────────────────────────────────────────

function RadialScore({ score }: { score: number }) {
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const gap = 0;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="16" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${filled - gap} ${circ - filled + gap}`} transform="rotate(-90 90 90)" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="48" fontWeight="800" fill="#0f172a" fontFamily="Inter, sans-serif">{score}</text>
      <text x={cx} y={cy + 28} textAnchor="middle" fontSize="16" fontWeight="600" fill="#64748b" fontFamily="Inter, sans-serif">/100</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPER: Area Sparkline (SVG)
// ─────────────────────────────────────────────────────────────

function ScoreSparkline() {
  const data = [76, 76, 84, 83, 82, 88, 88, 76, 72, 78, 77, 75, 76, 76, 65, 65];
  const W = 320;
  const H = 140;
  const padLeft = 24;
  const padRight = 10;
  const padY = 10;
  const minVal = 0;
  const maxVal = 100;

  const toX = (i: number) => padLeft + (i / (data.length - 1)) * (W - padLeft - padRight);
  const toY = (v: number) =>
    H - padY - ((v - minVal) / (maxVal - minVal)) * (H - padY * 2);

  const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
  const areaBase = toY(minVal);
  const area = `${toX(0)},${areaBase} ${pts} ${toX(data.length - 1)},${areaBase}`;

  return (
    <div className="w-full">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Horizontal Grid lines and Y-axis labels */}
        {[100, 75, 50, 25, 0].map((v) => (
          <g key={v}>
            <text
              x={0}
              y={toY(v) + 4}
              fontSize="11"
              fill="#64748b"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {v}
            </text>
            <line
              x1={padLeft}
              y1={toY(v)}
              x2={W - padRight}
              y2={toY(v)}
              stroke="#f1f5f9"
              strokeWidth="1.5"
            />
          </g>
        ))}
        {/* Area fill */}
        <polygon points={area} fill="url(#areaGrad)" />
        {/* Line */}
        <polyline
          points={pts}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Last dot */}
        <circle
          cx={toX(data.length - 1)}
          cy={toY(data[data.length - 1])}
          r="4.5"
          fill="#3b82f6"
        />
      </svg>
      <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-3" style={{ paddingLeft: padLeft, paddingRight: padRight }}>
        <span>Apr 19</span>
        <span>Apr 29</span>
        <span>May 9</span>
        <span>May 18</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ScoreBreakdownDetail() {
  const router = useRouter();
  const [overrideEnabled, setOverrideEnabled] = useState(false);
  const [newScore, setNewScore] = useState("");
  const [reason, setReason] = useState("");
  const [adminNote, setAdminNote] = useState("");

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans px-2 sm:px-3 py-6 space-y-6">

      {/* ── Breadcrumb + Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-[13px]">
          <button onClick={() => router.push("/dashboard/audit")} className="text-blue-600 hover:underline font-semibold">Home</button>
          <span className="text-slate-300">/</span>
          <button onClick={() => router.push("/dashboard/audit")} className="text-blue-600 hover:underline font-semibold">Score Audit</button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Sony WH-1000XM5</span>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/dashboard/audit")} className="flex items-center gap-1.5 h-9 px-4 text-[13px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Score Audit
          </button>
          <button className="flex items-center gap-1.5 h-9 px-4 text-[13px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4" /> Export <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>
        </div>
      </div>

      {/* ── Page Title ── */}
      <div>
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">Score Breakdown Detail</h1>
        <p className="text-[15px] text-slate-500 mt-1">Review score components, evidence, version history, and manual overrides.</p>
      </div>

      {/* ── Product Hero Card ── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Image & Title */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0">
              <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80" alt="Sony WH-1000XM5" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-start gap-2">
                <h2 className="text-[20px] font-bold text-slate-900 leading-tight">Sony WH-1000XM5 Wireless Headphones</h2>
                <ExternalLink className="w-4 h-4 text-blue-500 mt-1 shrink-0 cursor-pointer" />
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 mt-3">
                <span className="text-[13px] text-slate-500 font-medium">Category</span>
                <span className="text-[13px] text-slate-700">Electronics &gt; Headphones</span>
                <span className="text-[13px] text-slate-500 font-medium">ASIN</span>
                <span className="text-[13px] font-mono text-slate-700 font-medium">B09XS7JWHH</span>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="w-full xl:w-auto xl:ml-auto">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-start xl:justify-end divide-x divide-slate-200 shrink-0">
              <div className="pr-4 xl:pr-5 text-center shrink-0">
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide mb-2">AI Verdict</p>
                <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-white border border-amber-400 text-amber-600 text-[14px] font-bold">Wait</span>
              </div>
              <div className="px-4 xl:px-5 text-center shrink-0">
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide mb-1">Overall AI Buy Score</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[40px] font-extrabold text-blue-600 leading-none">76</span>
                  <span className="text-[15px] text-slate-400 font-semibold">/100</span>
                </div>
              </div>
              <div className="px-4 xl:px-5 text-center shrink-0">
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide mb-2">Confidence</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[13px] font-bold">
                  <BarChart2 className="w-4 h-4" /> High
                </span>
              </div>
              <div className="px-6 xl:px-8 text-left shrink-0">
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide mb-1.5">Score Version</p>
                <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[13px] font-mono font-bold">electronics-v1.2</span>
              </div>
              <div className="pl-6 xl:pl-8 text-left shrink-0">
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide mb-1.5">Last Updated</p>
                <p className="text-[13px] text-slate-800 font-bold whitespace-nowrap">May 18, 2024, 9:23 AM</p>
                <p className="text-[11px] text-slate-500 whitespace-nowrap">by Scoring Engine</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3-Column Grid Layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-3 items-start w-full min-w-0">

        {/* LEFT & MIDDLE COMBINED */}
        <div className="w-full space-y-6 min-w-0">
          <div className="grid grid-cols-1 xl:grid-cols-[250px_1fr] gap-3 items-start w-full min-w-0">

            {/* LEFT COLUMN */}
            <div className="w-full space-y-6 min-w-0">
              {/* Overall Score */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col items-center">
                <div className="self-start mb-5">
                  <h3 className="text-[15px] font-bold text-slate-900">Overall AI Buy Score</h3>
                </div>
                <RadialScore score={76} />
                <div className="mt-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-bold">
                    <BarChart2 className="w-3.5 h-3.5" /> High Confidence
                  </span>
                </div>
                {/* Meta */}
                <div className="w-full space-y-3">
                  {[
                    { k: "Model", v: "electronics-v1.2", mono: true },
                    { k: "Calculated", v: "May 18, 2024, 9:23 AM" },
                    { k: "Category", v: "Electronics" },
                    { k: "Data Freshness", v: "Up to date", green: true },
                  ].map((item) => (
                    <div key={item.k} className="flex justify-between items-start gap-4">
                      <span className="text-[12px] text-slate-500 font-medium flex items-center gap-1.5 shrink-0">
                        {item.k === "Model" && <Tag className="w-3.5 h-3.5" />}
                        {item.k === "Calculated" && <BarChart className="w-3.5 h-3.5" />}
                        {item.k === "Category" && <Tag className="w-3.5 h-3.5" />}
                        {item.k === "Data Freshness" && <Check className="w-3.5 h-3.5" />}
                        {item.k}
                      </span>
                      <span className={`text-[12px] text-right ${item.mono ? 'font-mono text-slate-700' : item.green ? 'text-emerald-600 font-bold' : 'text-slate-900 font-medium'}`}>
                        {item.v}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center mt-6 pt-5 border-t border-slate-100">
                  <button className="text-[13px] text-blue-600 hover:underline font-semibold flex items-center gap-1.5">
                    <Info className="w-4 h-4" /> View score explanation
                  </button>
                </div>
              </div>
            </div>

            {/* MIDDLE COLUMN */}
            <div className="w-full space-y-6 min-w-0">
              {/* Score Components */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-1.5 mb-5">
                  <h3 className="text-[15px] font-bold text-slate-900">Score Components</h3>
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
                  {SCORE_COMPONENTS.map((c) => (
                    <div key={c.label} className="flex flex-col border border-slate-200 rounded-xl p-4 justify-between h-full bg-white">
                      <div>
                        <p className="text-[13px] text-slate-700 font-bold leading-tight mb-3 min-h-[36px]">{c.label}</p>
                        {c.score === null ? (
                          <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-[36px] font-black text-slate-300 leading-none tracking-tight">N/A</span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1 mb-4">
                            <span className={`text-[36px] font-black leading-none tracking-tight ${c.color}`}>{c.score}</span>
                            <span className="text-[14px] text-slate-400 font-bold">/100</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-auto">
                        <div className={`w-full h-1.5 ${c.trackColor} rounded-full overflow-hidden mb-2.5`}>
                          <div className={`h-full rounded-full ${c.barColor} transition-all`} style={{ width: c.score === null ? "0%" : `${c.score}%` }} />
                        </div>
                        <p className="text-[12px] text-slate-500 font-semibold">{c.weightLabel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weight Breakdown & Input Evidence */}
              <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4 min-w-0">
                {/* Weight Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                  <div className="flex items-center gap-1.5 mb-4">
                    <h3 className="text-[15px] font-bold text-slate-900">Weight Breakdown</h3>
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between text-[12px] text-slate-500 font-semibold mb-3 border-b border-slate-100 pb-2">
                    <span>Category: Electronics</span>
                    <span>Total 100%</span>
                  </div>
                  <div className="space-y-3">
                    {WEIGHT_ROWS.map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-2">
                        <span className="text-[12px] text-slate-600 font-medium whitespace-nowrap">{row.label}</span>
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden min-w-[30px] max-w-[60px] ml-auto">
                          <div className={`h-full rounded-full ${row.barColor}`} style={{ width: `${row.pct * 2}%` }} />
                        </div>
                        <span className="text-[12px] text-slate-500 font-semibold text-right shrink-0 w-[28px]">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Evidence */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-1.5 mb-4">
                    <h3 className="text-[15px] font-bold text-slate-900">Input Evidence</h3>
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="w-full overflow-x-auto custom-scrollbar pb-2 -mb-2">
                    <div className="min-w-[400px]">
                      <div className="grid grid-cols-[1fr_60px_80px_130px] gap-3 pb-2 border-b border-slate-100 mb-2 min-w-0">
                        {["Source", "Items", "Status", "Last Updated"].map((h) => (
                          <span key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{h}</span>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {EVIDENCE_ROWS.map((e) => (
                          <div key={e.source} className="grid grid-cols-[1fr_60px_80px_130px] gap-3 items-center py-1.5 px-1 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              {e.icon}
                              <span className="text-[12px] text-slate-700 font-medium truncate">{e.source}</span>
                            </div>
                            <span className="text-[12px] text-slate-600 font-medium">{e.items}</span>
                            <div>
                              <StatusBadge status={e.status} />
                            </div>
                            <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap text-right">{e.lastUpdated}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COMBINED SCORE HISTORY CARD */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-6">
              <h3 className="text-[15px] font-bold text-slate-900">Score History</h3>
              <Info className="w-4 h-4 text-slate-400" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6 items-start min-w-0">
              {/* Graph on the left */}
              <div className="w-full flex flex-col">
                <ScoreSparkline />
              </div>

              {/* Table on the right */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {["Version", "Score", "Change", "Reason", "Model", "Updated By", "Updated At"].map((h) => (
                        <th key={h} className="pb-3 text-[12px] font-medium text-slate-500 whitespace-nowrap pr-8">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {HISTORY_ROWS.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                        <td className="py-4 pr-8">
                          <span className="text-[13px] font-bold text-slate-900 whitespace-nowrap">
                            {row.version}
                          </span>
                        </td>
                        <td className="py-4 pr-8 text-[13px] font-bold text-slate-900">{row.score}</td>
                        <td className="py-4 pr-8">
                          {row.changeDelta !== null ? (
                            <span className={`text-[13px] font-bold flex items-center gap-1 ${row.changeDelta < 0 ? "text-red-500" : "text-emerald-600"}`}>
                              {row.changeDelta < 0 && <TrendingDown className="w-3.5 h-3.5" />}
                              {row.change}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[13px]">—</span>
                          )}
                        </td>
                        <td className="py-4 pr-8 text-[13px] text-slate-600 whitespace-nowrap">{row.reason}</td>
                        <td className="py-4 pr-8 text-[13px] font-mono text-slate-500">{row.model}</td>
                        <td className="py-4 pr-8 text-[13px] text-slate-600 whitespace-nowrap">{row.updatedBy}</td>
                        <td className="py-4 text-[13px] text-slate-500 whitespace-nowrap">{row.updatedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* View Full History Link */}
            <div className="mt-8 flex justify-center border-t border-slate-100 pt-5">
              <button onClick={() => router.push('/dashboard/audit/B09X57JWHH/history')} className="text-[13px] text-blue-600 hover:underline font-semibold flex items-center gap-1.5">
                View full score history <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full space-y-6 min-w-0">
          {/* Current Verdict Summary */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <h3 className="text-[15px] font-bold text-slate-900 mb-4">Current Verdict Summary</h3>
            <div className="flex items-center gap-3 mb-5 p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <span className="inline-block px-3 py-1 rounded border-2 border-amber-300 bg-white text-amber-600 text-[12px] font-bold">Wait</span>
              <span className="text-[13px] text-slate-600 font-medium">Not enough confidence for Buy/Don't Buy.</span>
            </div>
            <div className="mb-5">
              <p className="text-[13px] font-bold text-slate-900 mb-2">Why Wait?</p>
              <ul className="space-y-2">
                {["Price is above 90-day average", "Mixed expert opinions", "Slight decline in Review Trust Score"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-5">
              <p className="text-[13px] font-bold text-slate-900 mb-2">What needs to improve?</p>
              <ul className="space-y-2">
                {["Lower price or better promotions", "More positive expert reviews", "Increase high-trust review volume"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <button className="text-[13px] text-blue-600 hover:underline font-semibold flex items-center gap-1">
              View full explanation <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Manual Override */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-1.5 mb-4">
              <h3 className="text-[15px] font-bold text-slate-900">Manual Override</h3>
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-[13px] text-slate-700 font-medium">Override score?</span>
              <button
                onClick={() => setOverrideEnabled(!overrideEnabled)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${overrideEnabled ? "bg-blue-600" : "bg-slate-200"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${overrideEnabled ? "left-6" : "left-1"}`} />
              </button>
            </div>
            <div className={`transition-opacity duration-200 ${!overrideEnabled ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="mb-4">
                <label className="block text-[13px] text-slate-700 font-medium mb-1.5">New score (0–100)</label>
                <input disabled={!overrideEnabled} type="number" min="0" max="100" value={newScore} onChange={(e) => setNewScore(e.target.value)} placeholder="Enter new score" className="w-full h-10 px-3 text-[13px] border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-50" />
              </div>
              <div className="mb-5">
                <label className="block text-[13px] text-slate-700 font-medium mb-1.5">Reason</label>
                <textarea disabled={!overrideEnabled} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain why you're overriding this score..." rows={3} maxLength={500} className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all disabled:bg-slate-50" />
                <div className="text-right text-[11px] text-slate-400 mt-1">{reason.length} / 500</div>
              </div>
              <div className="flex gap-3 mb-3">
                <button disabled={!overrideEnabled} className="flex-1 h-9 text-[13px] font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:bg-slate-300">
                  <Check className="w-4 h-4" /> Save Override
                </button>
                <button disabled={!overrideEnabled} className="flex-1 h-9 text-[13px] font-bold bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 disabled:text-slate-400 disabled:border-slate-200">
                  <AlertCircle className="w-4 h-4" /> Remove Override
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 text-center">Overrides are logged and visible in score history.</p>
          </div>

          {/* Admin Notes */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[15px] font-bold text-slate-900">Admin Notes</h3>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>
              <button className="flex items-center gap-1 text-[12px] text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md font-semibold transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Note
              </button>
            </div>
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Admin User" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[13px] font-bold text-slate-900">Admin User</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">Super Admin</span>
                </div>
                <p className="text-[12px] text-slate-600 mb-1">Price spike likely temporary due to limited stock. Re-check after next price drop.</p>
                <p className="text-[11px] text-slate-400">May 18, 2024, 9:25 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}