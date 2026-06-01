"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ArrowLeft,
  Download,
  BarChart2,
  MessageSquare,
  Play,
  User,
  ArrowRight,
  FileText,
  Clock,
  CheckSquare,
  PieChart,
  ChevronDown
} from "lucide-react";

const EVENTS = [
  {
    icon: <BarChart2 className="w-[14px] h-[14px] text-white" />,
    iconBg: "bg-blue-500",
    date: "May 17,\n2026",
    tag: "electronics-v1.2",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200",
    summaryTitle: "Score changed from 82 to 76",
    summaryTitleHighlight: "82 to 76",
    summaryReason: "Price increased above 90-day average",
    before: 82,
    after: 76,
    changedInputs: [
      { label: "Price Score ↓", color: "text-red-600 bg-red-50 border-red-200" },
      { label: "Retailer Prices Updated", color: "text-blue-600 bg-blue-50 border-blue-200" }
    ],
    changedRules: [{ label: "electronics-v1.2\nactive", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }],
    adminOverride: "—",
    model: "gpt-4.1-score-v2.3",
    changedBy: "Scoring Engine",
  },
  {
    icon: <MessageSquare className="w-[14px] h-[14px] text-white" />,
    iconBg: "bg-blue-500",
    date: "May 14,\n2026",
    tag: "electronics-v1.1",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200",
    summaryTitle: "Score changed from 86 to 82",
    summaryTitleHighlight: "86 to 82",
    summaryReason: "Review Trust Score decreased after new review analysis",
    before: 86,
    after: 82,
    changedInputs: [
      { label: "Review Trust ↓", color: "text-red-600 bg-red-50 border-red-200" },
      { label: "New Review Cluster", color: "text-blue-600 bg-blue-50 border-blue-200" }
    ],
    changedRules: [{ label: "electronics-v1.1\nactive", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }],
    adminOverride: "—",
    model: "gpt-4.1-score-v2.2",
    changedBy: "Scoring Engine",
  },
  {
    icon: <Play className="w-[14px] h-[14px] text-white ml-0.5" />,
    iconBg: "bg-emerald-500",
    date: "May 10,\n2026",
    tag: "electronics-v1.0",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200",
    summaryTitle: "Initial score generated: 86",
    summaryTitleHighlight: "86",
    summaryReason: "Initial scoring run completed",
    before: null,
    after: 86,
    changedInputs: [
      { label: "Initial Data Load", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }
    ],
    changedRules: [{ label: "electronics-v1.0\nactive", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }],
    adminOverride: "—",
    model: "gpt-4.1-score-v2.1",
    changedBy: "Scoring Engine",
  },
  {
    icon: <User className="w-[14px] h-[14px] text-white" />,
    iconBg: "bg-orange-500",
    date: "May 18,\n2026",
    tag: "electronics-v1.2",
    tagBg: "bg-orange-50 text-orange-600 border-orange-200",
    summaryTitle: "Admin override applied: score adjusted from 76 to 78",
    summaryTitleHighlight: "76 to 78",
    summaryReason: "Temporary price dip validated manually",
    before: 76,
    after: 78,
    changedInputs: [
      { label: "Manual Verification", color: "text-blue-600 bg-blue-50 border-blue-200" }
    ],
    changedRules: [{ label: "electronics-v1.2\nactive", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }],
    adminOverride: "Override",
    model: "gpt-4.1-score-v2.3",
    changedBy: "Admin Lee",
  }
];

// Helper to render the donut chart inline
function DonutChart() {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" className="transform -rotate-90">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="16" />
      {/* Blue 50% */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="125.6 251.2" strokeDashoffset="0" />
      {/* Red 25% */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray="62.8 251.2" strokeDashoffset="-125.6" />
      {/* Purple 25% */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="62.8 251.2" strokeDashoffset="-188.4" />
      {/* Center text */}
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="bold" fill="#1e293b" transform="rotate(90 50 50)">4</text>
      <text x="50" y="65" textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#64748b" transform="rotate(90 50 50)">Total</text>
    </svg>
  );
}

export default function ScoreVersionHistory() {
  const router = useRouter();

  return (
    <div className="flex h-full bg-[#f8fafc] min-h-0 text-slate-800 font-sans">
      <div className="flex-1 overflow-y-auto min-w-0">
        <div className="px-6 py-5 max-w-[1400px]">
          <div className="mb-6">
            <nav className="flex items-center gap-1.5 text-[13px] text-blue-600 font-medium mb-3">
              <span className="hover:underline cursor-pointer">Home</span>
              <span className="text-slate-400">/</span>
              <span className="hover:underline cursor-pointer">Score Audit</span>
              <span className="text-slate-400">/</span>
              <span className="hover:underline cursor-pointer">Sony WH-1000XM5</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500 font-normal">History</span>
            </nav>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[28px] font-bold text-slate-900 leading-tight">
                  Score Version History
                </h1>
                <p className="text-[14px] text-slate-500 mt-1">
                  Track score changes, version updates, model changes, and admin overrides over time.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 h-10 px-4 text-[14px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Score Detail
                </button>
                <button className="flex items-center gap-2 h-10 px-4 text-[14px] font-semibold bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 shadow-sm transition-all">
                  <Download className="w-4 h-4" />
                  Export History
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Top Hero Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-[84px] h-[84px] rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                <span className="text-5xl">🎧</span>
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-slate-900 leading-snug">
                  Sony WH-1000XM5 Wireless Headphones
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Electronics {'>'} Headphones
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    AI Verdict
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-orange-200 bg-orange-50 text-orange-700 text-[13px] font-bold">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    </span>
                    Wait
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 px-6 border-l border-slate-100">
              <div className="text-center">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Current Overall AI Buy Score
                </p>
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-[36px] font-extrabold text-blue-600 leading-none">
                    76
                  </span>
                  <span className="text-[16px] text-slate-400 font-medium">
                    / 100
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Confidence
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[13px] font-bold">
                  High
                  <BarChart2 className="w-4 h-4" />
                </span>
              </div>
              
              <div className="text-center">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Current Score Version
                </p>
                <span className="inline-block px-3 py-1 rounded border border-blue-200 bg-blue-50 text-blue-700 text-[13px] font-mono font-semibold">
                  electronics-v1.2
                </span>
              </div>

              <div className="text-center">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                  AI Model Version
                </p>
                <span className="inline-block px-3 py-1 rounded border border-purple-200 bg-purple-50 text-purple-700 text-[13px] font-mono font-semibold">
                  gpt-4.1-score-v2.3
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-200 mb-6 px-2">
            {[
              { label: "All Events", active: true },
              { label: "Score Changes", active: false },
              { label: "Rule Changes", active: false },
              { label: "Overrides", active: false },
              { label: "Model Changes", active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${
                  tab.active 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-6 items-start">
            {/* Timeline Column */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm pb-6">
              <div className="px-6 py-4 border-b border-slate-100 font-bold text-[15px]">
                Version Timeline
              </div>
              
              <div className="px-6 pt-4">
                {/* Timeline Header */}
                <div className="grid grid-cols-[80px_1fr_100px_160px_140px_100px_160px] gap-4 pb-3 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <div className="text-center">Date</div>
                  <div>Event Summary</div>
                  <div className="text-center">Before / After</div>
                  <div>Changed Inputs</div>
                  <div>Changed Rules</div>
                  <div className="text-center">Admin Override</div>
                  <div>AI Model Version</div>
                </div>

                <div className="relative mt-6">
                  {/* Vertical Line */}
                  <div className="absolute left-[39px] top-4 bottom-10 w-[2px] bg-slate-200" />

                  {/* Events */}
                  {EVENTS.map((ev, i) => {
                    const isScoreChange = ev.summaryTitle.includes("changed from");
                    const titleParts = ev.summaryTitle.split(ev.summaryTitleHighlight);

                    return (
                      <div key={i} className="relative flex items-start gap-4 mb-8">
                        {/* Date & Tag */}
                        <div className="w-[80px] shrink-0 flex flex-col items-center relative z-10 pt-1">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${ev.iconBg} shadow-sm border-2 border-white absolute -left-5 -top-1`}>
                            {ev.icon}
                          </div>
                          <span className="text-[12px] font-semibold text-slate-700 text-center whitespace-pre-line leading-tight">
                            {ev.date}
                          </span>
                          <span className={`mt-2 inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${ev.tagBg}`}>
                            {ev.tag}
                          </span>
                        </div>

                        {/* Row Data */}
                        <div className="flex-1 grid grid-cols-[1fr_100px_160px_140px_100px_160px] gap-4 pt-1 items-start">
                          {/* Summary */}
                          <div>
                            <p className="text-[13px] font-bold text-slate-900 leading-snug">
                              {titleParts[0]}
                              <span className={ev.iconBg.includes("orange") ? "text-orange-600" : "text-slate-900"}>{ev.summaryTitleHighlight}</span>
                              {titleParts[1]}
                            </p>
                            <p className="text-[12px] text-slate-500 mt-1 leading-snug">
                              <span className="font-semibold text-slate-700">Reason:</span> {ev.summaryReason}
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400">
                              <span>Score version: <span className="font-mono text-blue-500">{ev.tag}</span></span>
                              <span>Model version: <span className="font-mono text-purple-500">{ev.model}</span></span>
                              <span>Changed by: <span className={ev.changedBy === "Admin Lee" ? "text-blue-600 font-semibold" : "text-slate-500"}>{ev.changedBy}</span></span>
                            </div>
                          </div>

                          {/* Before/After */}
                          <div className="flex items-center justify-center gap-2 pt-1">
                            {ev.before ? (
                              <>
                                <span className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px] font-bold text-slate-600">
                                  {ev.before}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                                <span className={`w-8 h-8 rounded border flex items-center justify-center text-[13px] font-bold ${
                                  ev.iconBg.includes("orange") 
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                                    : "bg-orange-50 border-orange-200 text-orange-600"
                                }`}>
                                  {ev.after}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-slate-400">—</span>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                                <span className="w-8 h-8 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-[13px] font-bold text-blue-700">
                                  {ev.after}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Changed Inputs */}
                          <div className="flex flex-col gap-1.5 pt-1">
                            {ev.changedInputs.map((input, idx) => (
                              <span key={idx} className={`inline-block px-2 py-1 rounded text-[11px] font-semibold border ${input.color} w-fit`}>
                                {input.label}
                              </span>
                            ))}
                          </div>

                          {/* Changed Rules */}
                          <div className="flex flex-col gap-1.5 pt-1">
                            {ev.changedRules.map((rule, idx) => (
                              <span key={idx} className={`inline-block px-2 py-1 rounded text-[11px] font-semibold border ${rule.color} w-fit whitespace-pre-line text-center`}>
                                {rule.label}
                              </span>
                            ))}
                          </div>

                          {/* Admin Override */}
                          <div className="flex flex-col items-center gap-1.5 pt-1">
                            {ev.adminOverride !== "—" ? (
                              <>
                                <span className="text-[12px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                                  {ev.adminOverride}
                                </span>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                    <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-700">{ev.changedBy}</span>
                                </div>
                              </>
                            ) : (
                              <span className="text-slate-400 text-[13px] font-bold">—</span>
                            )}
                          </div>

                          {/* AI Model Version */}
                          <div className="flex flex-col gap-1 pt-1">
                            <span className="inline-block px-2 py-1 rounded border border-purple-200 bg-purple-50 text-purple-700 text-[11px] font-mono font-semibold w-fit">
                              {ev.model}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Scoring Engine</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Sidebar Widgets */}
            <div className="w-[320px] flex flex-col gap-5 shrink-0">
              {/* Widget: Version Summary */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[14px] font-bold text-slate-900">Version Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-slate-500 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Current Version</span>
                    <span className="font-mono text-blue-600 font-semibold">electronics-v1.2</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-slate-500 flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5" /> Total Versions</span>
                    <span className="font-bold text-slate-800">4</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-slate-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Manual Overrides</span>
                    <span className="font-bold text-slate-800">1</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Last Change</span>
                    <span className="font-semibold text-slate-800">2h ago</span>
                  </div>
                </div>
              </div>

              {/* Widget: Changed Inputs */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[14px] font-bold text-slate-900">Changed Inputs</h3>
                </div>
                <div className="space-y-2.5">
                  {[
                    { icon: "Retailer Prices", status: "Fresh", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                    { icon: "Review Clusters", status: "Updated", color: "text-blue-700 bg-blue-50 border-blue-200" },
                    { icon: "Price History (90d)", status: "Fresh", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                    { icon: "YouTube Evidence", status: "Fresh", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                    { icon: "Expert Reviews", status: "Stable", color: "text-slate-600 bg-slate-100 border-slate-200" },
                    { icon: "User Reports", status: "Stable", color: "text-slate-600 bg-slate-100 border-slate-200" },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[13px]">
                      <span className="text-slate-600 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        {row.icon}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${row.color}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget: Change Reason Distribution */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[14px] font-bold text-slate-900">Change Reason Distribution</h3>
                </div>
                <div className="flex items-center gap-4">
                  <DonutChart />
                  <div className="flex-1 space-y-2">
                    {[
                      { label: "Price Change", pct: "50%", count: "2", color: "bg-blue-500" },
                      { label: "Review Trust Change", pct: "25%", count: "1", color: "bg-red-500" },
                      { label: "Rule Update", pct: "0%", count: "0", color: "bg-yellow-500" },
                      { label: "Manual Override", pct: "25%", count: "1", color: "bg-purple-500" },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${row.color}`} />
                          <span className="text-slate-700">{row.label}</span>
                        </div>
                        <span className="text-slate-500">{row.pct} ({row.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Widget: Admin Override History */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[14px] font-bold text-slate-900">Admin Override History</h3>
                </div>
                
                <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-2 pb-2 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase">
                  <span>Admin</span>
                  <span>When</span>
                  <span>Reason</span>
                </div>
                <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-2 py-3 items-start border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-[12px] font-semibold text-slate-800">Admin Lee</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    May 18, 2026<br/>12:15 PM
                  </div>
                  <div className="text-[11px] text-slate-600 leading-tight">
                    Temporary price dip validated manually
                  </div>
                </div>
                
                <button className="text-[13px] text-blue-600 font-semibold mt-4 flex items-center gap-1 hover:underline">
                  View all override events <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
