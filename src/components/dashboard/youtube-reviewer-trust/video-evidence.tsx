"use client";

import React from "react";
import {
  Video,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileX,
  Ban,
  Search,
  ChevronDown,
  Filter,
  Eye,
  MoreVertical,
  Check,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// ── MOCK DATA ──
const kpiData = [
  { label: "All Videos", value: "12,450", icon: Video, color: "text-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200", active: true },
  { label: "Allowed", value: "7,892", icon: CheckCircle2, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-slate-200", active: false },
  { label: "Pending Review", value: "1,456", icon: Clock, color: "text-amber-500", bgColor: "bg-amber-50", borderColor: "border-slate-200", active: false },
  { label: "Needs Source Check", value: "1,102", icon: AlertCircle, color: "text-orange-500", bgColor: "bg-orange-50", borderColor: "border-slate-200", active: false },
  { label: "Transcript Unavailable", value: "895", icon: FileX, color: "text-violet-600", bgColor: "bg-violet-50", borderColor: "border-slate-200", active: false },
  { label: "Blocked", value: "1,105", icon: Ban, color: "text-rose-600", bgColor: "bg-rose-50", borderColor: "border-slate-200", active: false },
];

const tableData = [
  {
    id: "dQw4w9wgXcQ",
    video: { title: "Sony WH-1000XM5 Review: Still The Best in 2024?", duration: "12:45", thumb: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=128&h=128&fit=crop" },
    channel: { name: "TechGearLab", subs: "1.28M subscribers", avatar: "https://ui-avatars.com/api/?name=Tech+Gear+Lab&background=0D8ABC&color=fff" },
    product: "Sony WH-1000XM5 Wireless Headphones",
    confidence: 95, date: "May 15, 2024", evidence: "Allowed", transcript: "Available", summary: "Generated", used: "Yes"
  },
  {
    id: "a1b2c3d4e5f6",
    video: { title: "Best Budget Laptops Under $700 (2024)", duration: "9:18", thumb: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=128&h=128&fit=crop" },
    channel: { name: "Hardware Haven", subs: "872K subscribers", avatar: "https://ui-avatars.com/api/?name=Hardware+Haven&background=F59E0B&color=fff" },
    product: "Acer Aspire 5 A515-58",
    confidence: 88, date: "May 14, 2024", evidence: "Pending Review", transcript: "Available", summary: "Pending", used: "No"
  },
  {
    id: "z9y8x7c6v5b4",
    video: { title: "Do NOT Buy This Protein Powder (Shocking Results)", duration: "7:32", thumb: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=128&h=128&fit=crop" },
    channel: { name: "FitFuel", subs: "615K subscribers", avatar: "https://ui-avatars.com/api/?name=FitFuel&background=EF4444&color=fff" },
    product: "Optimum Nutrition Gold Standard Whey",
    confidence: 75, date: "May 13, 2024", evidence: "Needs Source Check", transcript: "Available", summary: "Generated", used: "Yes"
  },
  {
    id: "y7u6i5o4p3a2",
    video: { title: "AirPods Pro 2 Review: 6 Months Later", duration: "11:04", thumb: "https://images.unsplash.com/photo-1606220588913-b3aec5510680?w=128&h=128&fit=crop" },
    channel: { name: "AudioTech", subs: "452K subscribers", avatar: "https://ui-avatars.com/api/?name=AudioTech&background=10B981&color=fff" },
    product: "Apple AirPods Pro 2",
    confidence: 92, date: "May 12, 2024", evidence: "Allowed", transcript: "Available", summary: "Generated", used: "Yes"
  },
  {
    id: "t1k2j3h4g5f6",
    video: { title: "Ninja Air Fryer AF101 Honest Review", duration: "10:21", thumb: "https://images.unsplash.com/photo-1626201389710-53bc1230e70a?w=128&h=128&fit=crop" },
    channel: { name: "Home Tested", subs: "321K subscribers", avatar: "https://ui-avatars.com/api/?name=Home+Tested&background=6B7280&color=fff" },
    product: "Ninja Air Fryer AF101",
    confidence: 70, date: "May 11, 2024", evidence: "Pending Review", transcript: "Transcript Unavailable", summary: "Pending", used: "No"
  },
  {
    id: "m2n3b4v5c6x7",
    video: { title: "Samsung Galaxy S24 Ultra Full Review", duration: "8:50", thumb: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=128&h=128&fit=crop" },
    channel: { name: "Mobile Matters", subs: "1.01M subscribers", avatar: "https://ui-avatars.com/api/?name=Mobile+Matters&background=3B82F6&color=fff" },
    product: "Samsung Galaxy S24 Ultra",
    confidence: 90, date: "May 10, 2024", evidence: "Allowed", transcript: "Available", summary: "Generated", used: "Yes"
  },
  {
    id: "q9w8e7r6t5y4",
    video: { title: "Why I Returned This Standing Desk", duration: "13:15", thumb: "https://images.unsplash.com/photo-1595353139369-02685718df28?w=128&h=128&fit=crop" },
    channel: { name: "Workspace Setup", subs: "289K subscribers", avatar: "https://ui-avatars.com/api/?name=Workspace+Setup&background=8B5CF6&color=fff" },
    product: "FlexiSpot EN1 Standing Desk",
    confidence: 60, date: "May 9, 2024", evidence: "Blocked", transcript: "Available", summary: "Generated", used: "No"
  },
  {
    id: "u1i2o3p4a5s6",
    video: { title: "Anker 737 Power Bank Review & Test", duration: "7:05", thumb: "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=128&h=128&fit=crop" },
    channel: { name: "Charge Lab", subs: "398K subscribers", avatar: "https://ui-avatars.com/api/?name=Charge+Lab&background=6366F1&color=fff" },
    product: "Anker 737 Power Bank",
    confidence: 85, date: "May 8, 2024", evidence: "Needs Source Check", transcript: "Available", summary: "Pending", used: "No"
  }
];

export default function VideoEvidence() {

  const getBadgeStyles = (status: string) => {
    switch (status) {
      case "Allowed":   return "bg-emerald-50 text-emerald-700";
      case "Pending Review": return "bg-amber-50 text-amber-700";
      case "Needs Source Check": return "bg-orange-50 text-orange-700";
      case "Blocked":   return "bg-rose-50 text-rose-700";
      case "Transcript Unavailable": return "bg-violet-50 text-violet-700";
      case "Yes":       return "bg-emerald-50 text-emerald-700";
      case "No":        return "bg-rose-50 text-rose-700";
      default:          return "bg-slate-100 text-slate-700";
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getSummaryColor = (status: string) =>
    status === "Generated" ? "text-emerald-600" : "text-amber-500";

  return (
    /* 
      KEY FIX:
      - w-full + overflow-x-hidden on root prevents any horizontal scroll
      - px-4 md:px-6 gives slight breathing room without excess whitespace
      - max-w-none so the container always fills 100% of available space
    */
    <div className="w-full min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900">
      <div className="w-full px-4 md:px-6 py-4 flex flex-col gap-5">

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
              <span>YouTube Reviewers</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900 font-medium">Video Evidence</span>
            </div>
            <h1 className="text-xl font-bold text-slate-950 mb-0.5">Video Evidence</h1>
            <p className="text-xs text-slate-500">Review YouTube videos discovered by our system and their usage in AI verdicts.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>
        </div>

        {/* ── KPI METRICS ROW ── */}
        {/* 
          2 cols on mobile → 3 on md → 6 on xl
          No fixed pixel widths — uses grid fractions 
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpiData.map((kpi, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl border p-3 flex items-center justify-between shadow-sm gap-2 min-w-0 ${kpi.active ? "border-indigo-200" : "border-slate-200"}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <kpi.icon className={`w-3.5 h-3.5 shrink-0 ${kpi.color}`} />
                <span className="text-[11px] font-semibold text-slate-700 truncate">{kpi.label}</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${kpi.bgColor} ${kpi.color}`}>
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── ADVANCED FILTER BAR ── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
          {/* 
            flex-wrap so items wrap on smaller screens.
            No fixed px widths on filter buttons — use flex-1 with min-w 
          */}
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-[2] min-w-[160px]">
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">Search Video</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title or video ID..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {[
              { label: "Channel", text: "All Channels" },
              { label: "Product Matched", text: "All Products" },
              { label: "Evidence Status", text: "All Status" },
              { label: "Transcript Status", text: "All" },
              { label: "Summary Status", text: "All" },
              { label: "Used in Verdict", text: "All" },
            ].map((f) => (
              <div key={f.label} className="flex-1 min-w-[110px]">
                <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">{f.label}</label>
                <button className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
                  <span className="truncate">{f.text}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                </button>
              </div>
            ))}

            <div className="flex-none">
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase tracking-wider opacity-0 select-none">Btn</label>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
            </div>
          </div>
        </div>

        {/* ── MAIN DATA TABLE ── */}
        {/*
          overflow-x-auto ONLY on the inner table wrapper, NOT the page.
          The table has min-w to keep columns readable, but page doesn't scroll.
        */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: "900px" }}>
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Video</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Channel</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Product Matched</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Match Confidence</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">
                    Video Date <ChevronDown className="w-3 h-3 inline text-slate-400" />
                  </th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Evidence Status</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Transcript</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Summary</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Used in Verdict?</th>
                  <th className="px-3 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Video */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2" style={{ minWidth: "220px", maxWidth: "260px" }}>
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <img src={row.video.thumb} alt={row.video.title} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[8px] font-medium px-1 rounded">
                            {row.video.duration}
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight" title={row.video.title}>
                            {row.video.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">ID: {row.id}</span>
                        </div>
                      </div>
                    </td>
                    {/* Channel */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2" style={{ minWidth: "120px" }}>
                        <img src={row.channel.avatar} alt={row.channel.name} className="w-6 h-6 rounded-full shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-slate-900 truncate">{row.channel.name}</span>
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                              <Check className="w-2 h-2 text-white stroke-[3]" />
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 truncate">{row.channel.subs}</span>
                        </div>
                      </div>
                    </td>
                    {/* Product */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5" style={{ minWidth: "130px", maxWidth: "180px" }}>
                        <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                          <div className="w-2.5 h-2.5 bg-slate-300 rounded-sm"></div>
                        </div>
                        <span className="text-xs text-slate-700 truncate">{row.product}</span>
                      </div>
                    </td>
                    {/* Confidence */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2" style={{ minWidth: "100px" }}>
                        <span className="text-xs font-bold text-slate-900 w-7 shrink-0">{row.confidence}%</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getConfidenceColor(row.confidence)}`}
                            style={{ width: `${row.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    {/* Date */}
                    <td className="px-3 py-3">
                      <span className="text-xs text-slate-600 whitespace-nowrap">{row.date}</span>
                    </td>
                    {/* Evidence Status */}
                    <td className="px-3 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${getBadgeStyles(row.evidence)}`}>
                        {row.evidence}
                      </span>
                    </td>
                    {/* Transcript */}
                    <td className="px-3 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${getBadgeStyles(row.transcript)}`}>
                        {row.transcript}
                      </span>
                    </td>
                    {/* Summary */}
                    <td className="px-3 py-3">
                      <span className={`text-[10px] font-bold ${getSummaryColor(row.summary)}`}>
                        {row.summary}
                      </span>
                    </td>
                    {/* Used */}
                    <td className="px-3 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${getBadgeStyles(row.used)}`}>
                        {row.used}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 text-slate-400 hover:text-slate-700 transition-colors rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-700 transition-colors rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── PAGINATION FOOTER ── */}
          <div className="px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>Showing 1 to 8 of 12,450 results</div>
            <div className="flex items-center gap-3">
              <button className="border border-slate-200 rounded px-2 py-1 text-slate-700 flex items-center gap-1">
                10 per page <ChevronDown className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-0.5">
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${n === 1 ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {n}
                  </button>
                ))}
                <span className="w-7 h-7 flex items-center justify-center text-slate-400">…</span>
                <button className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium text-slate-600 hover:bg-slate-100">1,245</button>
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
