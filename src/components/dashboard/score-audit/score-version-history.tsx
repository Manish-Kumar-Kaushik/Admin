"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ArrowLeft,
  Download,
  ExternalLink,
  ChevronDown,
  BarChart2,
  TrendingDown,
  TrendingUp,
  MessageSquare,
  PlayCircle,
  User,
  Activity,
  FileText
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────────────────────

interface TimelineEvent {
  id: string;
  type: "score_change" | "override" | "initial";
  date: string;
  version: string;
  title: string;
  reason: string;
  before: number | null;
  after: number;
  changedInputs: { label: string; trend?: "down" | "up" | "neutral"; status?: string }[];
  changedRules: { label: string; active?: boolean }[];
  adminOverride: string | null;
  aiModelVersion: string;
  changedBy: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "evt-1",
    type: "score_change",
    date: "May 17, 2026",
    version: "electronics-v1.2",
    title: "Score changed from 82 to 76",
    reason: "Price increased above 90-day average",
    before: 82,
    after: 76,
    changedInputs: [
      { label: "Price Score", trend: "down" },
      { label: "Retailer Prices Updated", status: "blue" },
    ],
    changedRules: [{ label: "electronics-v1.2", active: true }],
    adminOverride: null,
    aiModelVersion: "gpt-4.1-score-v2.3",
    changedBy: "Scoring Engine",
  },
  {
    id: "evt-2",
    type: "score_change",
    date: "May 14, 2026",
    version: "electronics-v1.1",
    title: "Score changed from 86 to 82",
    reason: "Review Trust Score decreased after new review analysis",
    before: 86,
    after: 82,
    changedInputs: [
      { label: "Review Trust", trend: "down" },
      { label: "New Review Cluster", status: "blue" },
    ],
    changedRules: [{ label: "electronics-v1.1", active: true }],
    adminOverride: null,
    aiModelVersion: "gpt-4.1-score-v2.2",
    changedBy: "Scoring Engine",
  },
  {
    id: "evt-3",
    type: "initial",
    date: "May 10, 2026",
    version: "electronics-v1.0",
    title: "Initial score generated: 86",
    reason: "Initial scoring run completed",
    before: null,
    after: 86,
    changedInputs: [{ label: "Initial Data Load", status: "green" }],
    changedRules: [{ label: "electronics-v1.0", active: true }],
    adminOverride: null,
    aiModelVersion: "gpt-4.1-score-v2.1",
    changedBy: "Scoring Engine",
  },
  {
    id: "evt-4",
    type: "override",
    date: "May 18, 2026",
    version: "electronics-v1.2",
    title: "Admin override applied: score adjusted from 76 to 78",
    reason: "Temporary price dip validated manually",
    before: 76,
    after: 78,
    changedInputs: [{ label: "Manual Verification", status: "blue" }],
    changedRules: [{ label: "electronics-v1.2", active: true }],
    adminOverride: "Override",
    aiModelVersion: "gpt-4.1-score-v2.3",
    changedBy: "Admin Lee",
  },
];

const CHANGED_INPUTS = [
  { label: "Retailer Prices", status: "Fresh", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { label: "Review Clusters", status: "Updated", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { label: "Price History (90d)", status: "Fresh", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { label: "YouTube Evidence", status: "Fresh", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { label: "Expert Reviews", status: "Stable", color: "text-slate-600 bg-slate-100 border-slate-200" },
  { label: "User Reports", status: "Stable", color: "text-slate-600 bg-slate-100 border-slate-200" },
];

export default function ScoreVersionHistory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Events");

  const tabs = ["All Events", "Score Changes", "Rule Changes", "Overrides", "Model Changes"];

  return (
    <div className="flex h-full bg-[#f8fafc] min-h-0">
      <div className="flex-1 overflow-y-auto min-w-0">
        <div className="px-6 py-5">
          {/* Breadcrumb + Actions */}
          <div className="flex items-center justify-between mb-2">
            <nav className="flex items-center gap-1 text-[12px]">
              <button onClick={() => router.push("/dashboard")} className="text-blue-600 hover:underline font-medium">Home</button>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <button onClick={() => router.push("/dashboard/audit")} className="text-blue-600 hover:underline font-medium">Score Audit</button>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <button onClick={() => router.push("/dashboard/audit/B09X57JWHH")} className="text-blue-600 hover:underline font-medium">Sony WH-1000XM5</button>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-500">History</span>
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()} className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Score Detail
              </button>
              <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold bg-white border border-slate-200 rounded-lg text-blue-600 hover:bg-slate-50 shadow-sm transition-all">
                <Download className="w-3.5 h-3.5" /> Export History <ChevronDown className="w-3 h-3 text-blue-400" />
              </button>
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-5">
            <h1 className="text-[24px] font-bold text-slate-800 leading-tight">Score Version History</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Track score changes, version updates, model changes, and admin overrides over time.</p>
          </div>

          {/* Hero Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-5 flex flex-wrap lg:flex-nowrap items-center gap-6">
            <div className="w-[88px] h-[88px] rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-5xl">🎧</div>
            <div className="flex-1 min-w-[200px]">
              <h2 className="text-[18px] font-bold text-slate-800 leading-snug">Sony WH-1000XM5 Wireless Headphones</h2>
              <p className="text-[13px] text-slate-500 mt-1">Electronics &gt; Headphones</p>
            </div>
            <div className="flex items-center gap-6 divide-x divide-slate-100 shrink-0">
              <div className="px-4 text-center">
                <p className="text-[11px] text-slate-500 font-medium mb-1.5">AI Verdict</p>
                <span className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-200 text-[13px] font-bold flex items-center gap-1.5 justify-center"><Activity className="w-3.5 h-3.5"/> Wait</span>
              </div>
              <div className="px-4 text-center">
                <p className="text-[11px] text-slate-500 font-medium mb-1">Current Overall AI Buy Score</p>
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-[32px] font-extrabold text-blue-600 leading-none">76</span>
                  <span className="text-[14px] text-slate-400 font-medium">/ 100</span>
                </div>
              </div>
              <div className="px-4 text-center">
                <p className="text-[11px] text-slate-500 font-medium mb-1.5">Confidence</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[13px] font-semibold"><BarChart2 className="w-3.5 h-3.5" /> High</span>
              </div>
              <div className="px-4 text-center">
                <p className="text-[11px] text-slate-500 font-medium mb-1.5">Current Score Version</p>
                <span className="inline-block px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-600 text-[12px] font-mono font-medium shadow-sm">electronics-v1.2</span>
              </div>
              <div className="px-4 text-center">
                <p className="text-[11px] text-slate-500 font-medium mb-1.5">AI Model Version</p>
                <span className="inline-block px-3 py-1 rounded-full bg-white border border-purple-200 text-purple-600 text-[12px] font-mono font-medium shadow-sm">gpt-4.1-score-v2.3</span>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* LEFT COLUMN: Timeline */}
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                {/* Tabs */}
                <div className="flex items-center gap-6 px-6 pt-4 border-b border-slate-100">
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-[13px] font-semibold transition-colors border-b-2 ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Timeline Header */}
                <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  <div className="w-[120px]">Date</div>
                  <div className="flex-1">Event Summary</div>
                  <div className="w-[100px] text-center">Before / After</div>
                  <div className="w-[140px]">Changed Inputs</div>
                  <div className="w-[120px]">Changed Rules</div>
                  <div className="w-[100px] text-center">Admin Override</div>
                  <div className="w-[130px]">AI Model Version</div>
                </div>

                {/* Timeline Events */}
                <div className="p-6 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-100 z-0" />

                  <div className="space-y-8 relative z-10">
                    {TIMELINE_EVENTS.map((evt, i) => (
                      <div key={evt.id} className="flex items-start gap-4">
                        {/* Icon Badge */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm
                          ${evt.type === 'score_change' ? 'bg-blue-500 text-white' : evt.type === 'initial' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}
                        `}>
                          {evt.type === 'score_change' && i === 1 ? <MessageSquare className="w-4 h-4" /> : evt.type === 'score_change' ? <TrendingDown className="w-4 h-4" /> : evt.type === 'initial' ? <PlayCircle className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>

                        {/* Date & Version */}
                        <div className="w-[80px] shrink-0 pt-0.5">
                          <p className="text-[12px] font-bold text-slate-800">{evt.date}</p>
                          <span className="inline-block mt-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[10px] font-mono whitespace-nowrap">{evt.version}</span>
                        </div>

                        {/* Event Summary */}
                        <div className="flex-1 pt-0.5 pl-4 min-w-0 pr-4">
                          <p className="text-[13px] font-bold text-slate-800">{evt.title}</p>
                          <p className="text-[12px] text-slate-500 mt-1 leading-snug"><span className="font-semibold text-slate-600">Reason:</span> {evt.reason}</p>
                          <p className="text-[10px] text-slate-400 mt-3 font-mono">Score version: <span className="text-blue-500">{evt.version}</span> &nbsp;&nbsp; Model version: <span className="text-purple-500">{evt.aiModelVersion}</span> &nbsp;&nbsp; Changed by: {evt.changedBy === 'Admin Lee' ? <span className="text-blue-600">{evt.changedBy}</span> : evt.changedBy}</p>
                        </div>

                        {/* Before / After */}
                        <div className="w-[100px] shrink-0 pt-0.5 flex items-center justify-center gap-2">
                          {evt.before !== null ? (
                            <>
                              <span className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 rounded font-bold text-[12px]">{evt.before}</span>
                              <span className="text-slate-400">→</span>
                              <span className={`w-7 h-7 flex items-center justify-center rounded font-bold text-[12px] ${evt.after > evt.before ? 'bg-emerald-100 text-emerald-700' : evt.after < evt.before ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>{evt.after}</span>
                            </>
                          ) : (
                            <>
                              <span className="w-7 h-7 flex items-center justify-center text-slate-400 font-bold text-[12px]">—</span>
                              <span className="text-slate-400">→</span>
                              <span className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 rounded font-bold text-[12px]">{evt.after}</span>
                            </>
                          )}
                        </div>

                        {/* Changed Inputs */}
                        <div className="w-[140px] shrink-0 pt-0.5 flex flex-col gap-1.5">
                          {evt.changedInputs.map((input, idx) => (
                            <span key={idx} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border w-fit ${
                              input.trend === 'down' ? 'bg-red-50 text-red-600 border-red-100' :
                              input.status === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                              input.status === 'green' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              'bg-slate-50 text-slate-600 border-slate-200'
                            }`}>
                              {input.label}
                              {input.trend === 'down' && <span className="text-[10px]">↓</span>}
                            </span>
                          ))}
                        </div>

                        {/* Changed Rules */}
                        <div className="w-[120px] shrink-0 pt-0.5">
                          {evt.changedRules.map((rule, idx) => (
                            <div key={idx} className="inline-flex flex-col border border-emerald-200 rounded overflow-hidden">
                               <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono border-b border-emerald-100">{rule.label}</span>
                               <span className="px-2 py-0.5 bg-white text-emerald-600 text-[9px] font-bold text-center uppercase">active</span>
                            </div>
                          ))}
                        </div>

                        {/* Admin Override */}
                        <div className="w-[100px] shrink-0 pt-0.5 flex flex-col items-center">
                          {evt.adminOverride ? (
                            <div className="flex flex-col items-center gap-1.5">
                              <span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-200 rounded text-[10px] font-bold">Override</span>
                              <div className="flex items-center gap-1">
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Admin" className="w-4 h-4 rounded-full" />
                                <span className="text-[10px] text-slate-600">Admin Lee</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </div>

                        {/* AI Model Version */}
                        <div className="w-[130px] shrink-0 pt-0.5">
                           <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-100 rounded text-[10px] font-mono">{evt.aiModelVersion}</span>
                           <p className="text-[10px] text-slate-400 mt-1.5">{evt.changedBy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar Widgets */}
            <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-4">
              
              {/* Version Summary */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[13px] font-bold text-slate-800">Version Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Current Version</span>
                    <span className="text-[11px] font-mono text-blue-600">electronics-v1.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Total Versions</span>
                    <span className="text-[12px] font-bold text-slate-800">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Manual Overrides</span>
                    <span className="text-[12px] font-bold text-slate-800">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Last Change</span>
                    <span className="text-[12px] text-slate-800">2h ago</span>
                  </div>
                </div>
              </div>

              {/* Changed Inputs */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[13px] font-bold text-slate-800">Changed Inputs</h3>
                </div>
                <div className="space-y-2.5">
                  {CHANGED_INPUTS.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-[12px] text-slate-600 flex items-center gap-1.5">
                        <FileText className="w-3 h-3 text-slate-400" />
                        {item.label}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Change Reason Distribution */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">Change Reason Distribution</h3>
                <div className="flex items-center gap-4">
                  {/* Donut Chart placeholder */}
                  <div className="w-[72px] h-[72px] rounded-full border-[10px] border-blue-500 relative flex items-center justify-center shrink-0" style={{ borderRightColor: '#ef4444', borderBottomColor: '#ef4444', borderLeftColor: '#8b5cf6'}}>
                    <div className="absolute inset-0 rounded-full border-[10px] border-transparent" style={{ borderTopColor: '#3b82f6', transform: 'rotate(-45deg)'}}></div>
                    <div className="text-center">
                       <span className="block text-[14px] font-bold leading-none">4</span>
                       <span className="block text-[10px] text-slate-500">Total</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Price Change</span>
                      <span className="text-slate-400">50% (2)</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-red-500"></span> Review Trust Change</span>
                      <span className="text-slate-400">25% (1)</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Rule Update</span>
                      <span className="text-slate-400">0% (0)</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Manual Override</span>
                      <span className="text-slate-400">25% (1)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Override History */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[13px] font-bold text-slate-800">Admin Override History</h3>
                </div>
                
                <div className="grid grid-cols-[auto_auto_1fr] gap-x-3 gap-y-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide border-b border-slate-100 pb-2 mb-2">
                  <div>Admin</div>
                  <div>When</div>
                  <div>Reason</div>
                </div>
                
                <div className="grid grid-cols-[auto_auto_1fr] gap-x-3 items-start pb-4 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-1.5">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Admin" className="w-5 h-5 rounded-full" />
                    <span className="text-[11px] text-slate-700 font-medium">Admin Lee</span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-0.5">
                    May 18, 2026<br/>12:15 PM
                  </div>
                  <div className="text-[11px] text-slate-600 pt-0.5">
                    Temporary price dip validated manually
                  </div>
                </div>

                <button className="text-[12px] text-blue-600 font-semibold hover:underline flex items-center gap-1">
                  View all override events <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
