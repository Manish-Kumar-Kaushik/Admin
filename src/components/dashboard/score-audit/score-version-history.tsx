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
    iconBg: "bg-[#2563eb]",
    date: "May 17,\n2026",
    tag: "electronics-v1.2",
    tagBg: "bg-blue-50 text-blue-600 border-blue-200",
    summaryTitle: "Score changed from 82 to 76",
    summaryTitleHighlight: "82 to 76",
    summaryReason: "Price increased above 90-day average",
    before: 82,
    after: 76,
    beforeBox: "bg-[#f1f5f9] border-[#e2e8f0] text-[#475569]",
    afterBox: "bg-[#fff7ed] border-[#fed7aa] text-[#ea580c]",
    changedInputs: [
      { label: "Price Score ↓", color: "text-[#dc2626] bg-[#fef2f2] border-[#fecaca]" },
      { label: "Retailer Prices Updated", color: "text-[#2563eb] bg-[#eff6ff] border-[#bfdbfe]" }
    ],
    changedRules: [{ label: "electronics-v1.2\nactive", color: "text-[#16a34a] bg-[#f0fdf4] border-[#bbf7d0]" }],
    adminOverride: "—",
    model: "gpt-4.1-score-v2.3",
    changedBy: "Scoring Engine",
    cardBg: "bg-[#f8faff] border-[#dbeafe]"
  },
  {
    icon: <MessageSquare className="w-[14px] h-[14px] text-white" />,
    iconBg: "bg-[#2563eb]",
    date: "May 14,\n2026",
    tag: "electronics-v1.1",
    tagBg: "bg-blue-50 text-blue-600 border-blue-200",
    summaryTitle: "Score changed from 86 to 82",
    summaryTitleHighlight: "86 to 82",
    summaryReason: "Review Trust Score decreased after new review analysis",
    before: 86,
    after: 82,
    beforeBox: "bg-[#f1f5f9] border-[#e2e8f0] text-[#475569]",
    afterBox: "bg-[#fff7ed] border-[#fed7aa] text-[#ea580c]",
    changedInputs: [
      { label: "Review Trust ↓", color: "text-[#dc2626] bg-[#fef2f2] border-[#fecaca]" },
      { label: "New Review Cluster", color: "text-[#2563eb] bg-[#eff6ff] border-[#bfdbfe]" }
    ],
    changedRules: [{ label: "electronics-v1.1\nactive", color: "text-[#16a34a] bg-[#f0fdf4] border-[#bbf7d0]" }],
    adminOverride: "—",
    model: "gpt-4.1-score-v2.2",
    changedBy: "Scoring Engine",
    cardBg: "bg-[#f8faff] border-[#dbeafe]"
  },
  {
    icon: <Play className="w-[14px] h-[14px] text-white ml-0.5" />,
    iconBg: "bg-[#16a34a]",
    date: "May 10,\n2026",
    tag: "electronics-v1.0",
    tagBg: "bg-blue-50 text-blue-600 border-blue-200",
    summaryTitle: "Initial score generated: 86",
    summaryTitleHighlight: "86",
    summaryReason: "Initial scoring run completed",
    before: null,
    after: 86,
    beforeBox: "transparent",
    afterBox: "bg-[#eef2ff] border-[#c7d2fe] text-[#4f46e5]",
    changedInputs: [
      { label: "Initial Data Load", color: "text-[#16a34a] bg-[#f0fdf4] border-[#bbf7d0]" }
    ],
    changedRules: [{ label: "electronics-v1.0\nactive", color: "text-[#16a34a] bg-[#f0fdf4] border-[#bbf7d0]" }],
    adminOverride: "—",
    model: "gpt-4.1-score-v2.1",
    changedBy: "Scoring Engine",
    cardBg: "bg-[#f8faff] border-[#dbeafe]"
  },
  {
    icon: <User className="w-[14px] h-[14px] text-white" />,
    iconBg: "bg-[#ea580c]",
    date: "May 18,\n2026",
    tag: "electronics-v1.2",
    tagBg: "bg-orange-50 text-orange-600 border-orange-200",
    summaryTitle: "Admin override applied:\nscore adjusted from 76 to 78",
    summaryTitleHighlight: "76 to 78",
    summaryReason: "Temporary price dip validated manually",
    before: 76,
    after: 78,
    beforeBox: "bg-[#fff7ed] border-[#fed7aa] text-[#ea580c]",
    afterBox: "bg-[#f0fdf4] border-[#bbf7d0] text-[#16a34a]",
    changedInputs: [
      { label: "Manual Verification", color: "text-[#2563eb] bg-[#eff6ff] border-[#bfdbfe]" }
    ],
    changedRules: [{ label: "electronics-v1.2\nactive", color: "text-[#16a34a] bg-[#f0fdf4] border-[#bbf7d0]" }],
    adminOverride: "Override",
    model: "gpt-4.1-score-v2.3",
    changedBy: "Admin Lee",
    cardBg: "bg-[#fff7ed] border-[#fed7aa]"
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
        <div className="px-2 sm:px-4 lg:px-6 py-5 max-w-none w-full min-w-0">
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
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[24px] sm:text-[28px] font-bold text-slate-900 leading-tight">
                  Score Version History
                </h1>
                <p className="text-[13px] sm:text-[14px] text-slate-500 mt-1">
                  Track score changes, version updates, model changes, and admin overrides over time.
                </p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 h-10 px-4 text-[13px] sm:text-[14px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Score Detail</span>
                  <span className="inline sm:hidden">Back</span>
                </button>
                <button className="flex items-center gap-2 h-10 px-4 text-[13px] sm:text-[14px] font-semibold bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 shadow-sm transition-all whitespace-nowrap">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export History</span>
                  <span className="inline sm:hidden">Export</span>
                  <ChevronDown className="w-4 h-4 ml-1 hidden sm:inline" />
                </button>
              </div>
            </div>
          </div>

          {/* Top Hero Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 mb-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5 w-full xl:w-auto">
              <div className="w-[64px] h-[64px] sm:w-[84px] sm:h-[84px] rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                <span className="text-4xl sm:text-5xl">🎧</span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] sm:text-[18px] font-bold text-slate-900 leading-snug truncate">
                  Sony WH-1000XM5 Wireless Headphones
                </h2>
                <p className="text-[12px] sm:text-[13px] text-slate-500 mt-0.5 truncate">
                  Electronics {'>'} Headphones
                </p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    AI Verdict
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-orange-200 bg-orange-50 text-orange-700 text-[12px] sm:text-[13px] font-bold shrink-0">
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    </span>
                    Wait
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap xl:flex-nowrap items-center gap-4 sm:gap-8 px-0 xl:px-6 border-t xl:border-t-0 border-l-0 xl:border-l border-slate-100 pt-4 xl:pt-0 w-full xl:w-auto">
              <div className="text-center">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Current Overall AI Buy Score
                </p>
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-[28px] sm:text-[36px] font-extrabold text-blue-600 leading-none">
                    76
                  </span>
                  <span className="text-[14px] sm:text-[16px] text-slate-400 font-medium">
                    / 100
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Confidence
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[12px] sm:text-[13px] font-bold">
                  High
                  <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </div>
              
              <div className="text-center">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Current Score Version
                </p>
                <span className="inline-block px-3 py-1 rounded border border-blue-200 bg-blue-50 text-blue-700 text-[12px] sm:text-[13px] font-mono font-semibold">
                  electronics-v1.2
                </span>
              </div>

              <div className="text-center">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                  AI Model Version
                </p>
                <span className="inline-block px-3 py-1 rounded border border-purple-200 bg-purple-50 text-purple-700 text-[12px] sm:text-[13px] font-mono font-semibold">
                  gpt-4.1-score-v2.3
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-slate-200 mb-6 px-2 overflow-x-auto min-w-0 hide-scrollbar">
            {[
              { label: "All Events", active: true },
              { label: "Score Changes", active: false },
              { label: "Rule Changes", active: false },
              { label: "Overrides", active: false },
              { label: "Model Changes", active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`pb-3 text-[13px] sm:text-[14px] font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  tab.active 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col xl:flex-row gap-6 items-start min-w-0">
            {/* Timeline Column */}
            <div className="flex-1 w-full bg-white border border-slate-200 rounded-xl shadow-sm pb-6 min-w-0 order-last xl:order-first overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-slate-100 font-bold text-[14px] sm:text-[15px]">
                Version Timeline
              </div>
              
              <div className="px-2 sm:px-6 pt-4 min-w-0 w-full overflow-x-auto">
                <div className="w-full">
                  {/* Timeline Header (Aligned with inner card content) */}
                <div className="flex gap-4">
                  {/* Space for the vertical line and icon */}
                  <div className="w-[32px] shrink-0"></div>
                  
                  {/* Grid header that matches the row inner grid */}
                  <div className="flex-1 px-4 min-w-0">
                    <div className="grid grid-cols-[80px_minmax(180px,1.5fr)_80px_minmax(140px,1.2fr)_minmax(120px,1fr)_100px_minmax(120px,1fr)] gap-4 pb-3 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      <div className="text-center">Date</div>
                      <div>Event Summary</div>
                      <div className="text-center">Before / After</div>
                      <div className="text-center">Changed Inputs</div>
                      <div className="text-center">Changed Rules</div>
                      <div className="text-center">Admin Override</div>
                      <div className="text-center">AI Model Version</div>
                    </div>
                  </div>
                </div>

                <div className="relative mt-4">
                  {/* Vertical Line */}
                  <div className="absolute left-[15px] top-4 bottom-10 w-[2px] bg-slate-200" />

                  {/* Events */}
                  {EVENTS.map((ev, i) => {
                    const titleParts = ev.summaryTitle.split(ev.summaryTitleHighlight);

                    return (
                      <div key={i} className="relative flex items-stretch gap-4 mb-4 min-w-0">
                        {/* Icon */}
                        <div className="relative z-10 w-[32px] flex flex-col items-center pt-5 shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ev.iconBg} shadow-sm border-4 border-white relative z-10`}>
                            {ev.icon}
                          </div>
                        </div>

                        {/* Card Wrapper for the row */}
                        <div className={`flex-1 min-w-0 rounded-xl p-4 border ${ev.cardBg} flex flex-col justify-center`}>
                          <div className="grid grid-cols-[80px_minmax(180px,1.5fr)_80px_minmax(140px,1.2fr)_minmax(120px,1fr)_100px_minmax(120px,1fr)] gap-4 items-start min-w-0">
                            
                            {/* Date & Tag */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="bg-white border border-slate-200 rounded-lg py-1.5 px-2 flex items-center justify-center text-center w-full shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                <span className="text-[12px] font-bold text-slate-800 leading-tight whitespace-pre-line">
                                  {ev.date}
                                </span>
                              </div>
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${ev.tagBg}`}>
                                {ev.tag}
                              </span>
                            </div>

                            {/* Summary */}
                            <div className="flex flex-col h-full">
                              <div>
                                <p className="text-[14px] font-bold text-slate-900 leading-snug whitespace-pre-line">
                                  {titleParts[0]}
                                  <span className={ev.cardBg.includes("orange") ? "text-orange-600" : "text-orange-500"}>{ev.summaryTitleHighlight}</span>
                                  {titleParts[1]}
                                </p>
                                <p className="text-[12px] text-slate-600 mt-1.5 leading-snug">
                                  <span className="font-bold text-slate-800">Reason:</span> {ev.summaryReason}
                                </p>
                              </div>
                              
                              <div className="mt-auto pt-4 flex items-center gap-2 text-[11px] text-slate-500 whitespace-nowrap">
                                <span>Score version: <span className="font-mono text-blue-600 font-semibold">{ev.tag}</span></span>
                                <span className="text-slate-300">|</span>
                                <span>Model version: <span className="font-mono text-purple-600 font-semibold">{ev.model}</span></span>
                                <span className="text-slate-300">|</span>
                                <span>Changed by: <span className={ev.changedBy === "Admin Lee" ? "text-blue-600 font-bold" : "text-slate-600 font-semibold"}>{ev.changedBy}</span></span>
                              </div>
                            </div>

                            {/* Before/After */}
                            <div className="flex items-center justify-center gap-2 pt-2">
                              {ev.before ? (
                                <>
                                  <span className={`w-8 h-8 rounded border flex items-center justify-center text-[13px] font-bold ${ev.beforeBox}`}>
                                    {ev.before}
                                  </span>
                                  <ArrowRight className="w-3 h-3 text-slate-700" />
                                  <span className={`w-8 h-8 rounded border flex items-center justify-center text-[13px] font-bold ${ev.afterBox}`}>
                                    {ev.after}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="w-4 flex justify-center text-slate-700 font-bold">—</span>
                                  <ArrowRight className="w-3 h-3 text-slate-700" />
                                  <span className={`w-8 h-8 rounded border flex items-center justify-center text-[13px] font-bold ${ev.afterBox}`}>
                                    {ev.after}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Changed Inputs */}
                            <div className="flex flex-col items-center gap-2 pt-1">
                              {ev.changedInputs.map((input, idx) => (
                                <span key={idx} className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${input.color} w-max max-w-[150px] text-center`}>
                                  {input.label}
                                </span>
                              ))}
                            </div>

                            {/* Changed Rules */}
                            <div className="flex flex-col items-center gap-2 pt-1">
                              {ev.changedRules.map((rule, idx) => (
                                <span key={idx} className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${rule.color} w-max max-w-[130px] whitespace-pre-line text-center leading-tight`}>
                                  {rule.label}
                                </span>
                              ))}
                            </div>

                            {/* Admin Override */}
                            <div className="flex flex-col items-center gap-2 pt-1.5">
                              {ev.adminOverride !== "—" ? (
                                <>
                                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-md border border-orange-200">
                                    {ev.adminOverride}
                                  </span>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                      <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-800">{ev.changedBy}</span>
                                  </div>
                                </>
                              ) : (
                                <span className="text-slate-800 text-[14px] font-bold">—</span>
                              )}
                            </div>

                            {/* AI Model Version */}
                            <div className="flex flex-col items-center gap-1 pt-1.5">
                              <span className="inline-block px-2.5 py-1 rounded-md border border-purple-200 bg-purple-50 text-purple-700 text-[11px] font-mono font-bold w-max">
                                {ev.model}
                              </span>
                              <span className="text-[11px] text-slate-600 font-semibold mt-1">
                                {ev.adminOverride !== "—" ? "Admin Override" : "Scoring Engine"}
                              </span>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Widgets */}
            <div className="w-full xl:w-[320px] flex flex-col sm:flex-row xl:flex-col gap-5 shrink-0 order-first xl:order-last">
              {/* Widget: Version Summary */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex-1">
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
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex-1">
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
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex-1">
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
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex-1">
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
