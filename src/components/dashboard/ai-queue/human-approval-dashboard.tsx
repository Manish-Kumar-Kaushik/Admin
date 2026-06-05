"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Flag,
  Clock,
  RefreshCw,
  Download,
  ChevronDown,
  Filter,
  Settings,
  Eye,
  MoreVertical,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Edit3
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// --- Mock Data ---

const kpiData = [
  { title: "Pending Human Approvals", value: "248", trend: "↑ 18 vs last 7 days", trendUp: true, icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { title: "High Priority", value: "36", trend: "↑ 6 vs last 7 days", trendUp: false, icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
  { title: "Low Confidence", value: "54", trend: "↓ 8 vs last 7 days", trendUp: true, icon: HelpCircle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  { title: "Approved Today", value: "72", trend: "↑ 14 vs yesterday", trendUp: true, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { title: "Escalated", value: "15", trend: "↓ 3 vs yesterday", trendUp: true, icon: Flag, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  { title: "Avg. Review Time", value: "24m 18s", trend: "↓ 6m vs last 7 days", trendUp: true, icon: Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
];

const queueData = [
  { id: 1, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80", name: "Sony WH-1000XM5", subtitle: "Headphones", verdict: "Better Alternative Available", score: "82/100", scoreColor: "text-emerald-600", confidence: "92%", confColor: "text-emerald-600", reason: "Better alternative lower price", reviewer: "Sarah Johnson", status: "Pending", selected: true },
  { id: 2, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&q=80", name: "CeraVe Moisturizing", subtitle: "Cream 19oz", verdict: "Good Buy", score: "91/100", scoreColor: "text-emerald-600", confidence: "94%", confColor: "text-emerald-600", reason: "Low risk, high satisfaction", reviewer: "Michael Chen", status: "Needs Review", selected: false },
  { id: 3, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&q=80", name: "Ninja Air Fryer AF101", subtitle: "4QT", verdict: "Budget Pick", score: "76/100", scoreColor: "text-amber-500", confidence: "88%", confColor: "text-emerald-600", reason: "Budget option available", reviewer: "Emily Davis", status: "Pending", selected: false },
  { id: 4, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&q=80", name: "Apple AirPods Pro", subtitle: "(2nd Gen)", verdict: "Good Buy", score: "93/100", scoreColor: "text-emerald-600", confidence: "95%", confColor: "text-emerald-600", reason: "High satisfaction consensus", reviewer: "Daniel Kim", status: "Ready", selected: false },
  { id: 5, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&q=80", name: "LG 27-inch Monitor", subtitle: "27GP850-B", verdict: "Better Alternative Available", score: "68/100", scoreColor: "text-amber-500", confidence: "77%", confColor: "text-amber-500", reason: "Better specs for price", reviewer: "Aisha Patel", status: "Escalated", selected: false },
  { id: 6, image: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=100&q=80", name: "Instant Pot Duo 7-in-1", subtitle: "6 Quart", verdict: "Good Buy", score: "85/100", scoreColor: "text-emerald-600", confidence: "90%", confColor: "text-emerald-600", reason: "Strong reliability signals", reviewer: "John Wilson", status: "Approved", selected: false },
];

const breakdownData = [
  { name: "Pending", value: 128, color: "#F59E0B" },
  { name: "Needs Review", value: 46, color: "#F97316" },
  { name: "Ready", value: 32, color: "#3B82F6" },
  { name: "Approved", value: 28, color: "#22C55E" },
  { name: "Escalated", value: 14, color: "#EF4444" },
];

const checklist = [
  "Verify evidence sources are complete and current",
  "Confirm alternative comparison is accurate and fair",
  "Validate pricing and availability data",
  "Ensure AI reasoning aligns with policy guidelines",
  "Check for potential bias or affiliate influence"
];

const recentDecisions = [
  { status: "Approved", icon: CheckCircle2, color: "text-emerald-600", title: "Sony WH-1000XM5 → Bose QuietComfort Ultra", reviewer: "by Sarah Johnson", time: "10:24 AM" },
  { status: "Rejected", icon: X, color: "text-rose-600", title: "LG 27GP850-B Monitor → Dell S2722DGM", reviewer: "by Michael Chen", time: "09:51 AM" },
  { status: "Escalated", icon: Flag, color: "text-amber-600", title: "Ninja Air Fryer AF101 → Instant Vortex Plus", reviewer: "by Emily Davis", time: "09:22 AM" },
  { status: "Approved", icon: CheckCircle2, color: "text-emerald-600", title: "CeraVe Moisturizing Cream → No Alternative", reviewer: "by Daniel Kim", time: "08:47 AM" },
  { status: "Needs Review", icon: Clock, color: "text-orange-500", title: "Apple AirPods Pro (2nd Gen) → Bose QC Ultra", reviewer: "by Aisha Patel", time: "08:12 AM" },
];

export default function HumanApprovalDashboard() {
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Pending": return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">Pending</span>;
      case "Needs Review": return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-50 text-orange-600 border border-orange-100">Needs Review</span>;
      case "Ready": return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100">Ready</span>;
      case "Escalated": return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100">Escalated</span>;
      case "Approved": return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Approved</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 flex flex-col p-4 sm:p-6 gap-6 min-w-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Human Approval</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review AI-generated verdicts, validate evidence, and approve recommendations before publishing.
          </p>
        </div>
        <div className="flex flex-row items-center gap-2 sm:gap-3 overflow-x-auto hide-scrollbar">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
            <RefreshCw className="w-4 h-4" /> Refresh Queue
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0">
            <CheckCircle2 className="w-4 h-4" /> Bulk Approve
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
            <Download className="w-4 h-4" /> Export Decisions <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.border} ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-semibold text-slate-500 block truncate">{kpi.title}</span>
              <span className="text-2xl font-bold text-slate-950 block leading-tight">{kpi.value}</span>
              <span className={`text-[10px] font-bold mt-1 block truncate ${kpi.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Queue vs Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Approval Queue */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-w-0">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">Approval Queue</h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">248 total</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500">
                  <option>All Flag Reasons</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Filters
              </button>
              <button className="p-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase w-10 text-center"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Original Product</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">AI Verdict</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">AI Buy Score</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Confidence</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Flag Reason</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Reviewer</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queueData.map((row) => (
                  <tr key={row.id} className={`hover:bg-slate-50 transition-colors ${row.selected ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-3 text-center">
                      <input type="checkbox" checked={row.selected} readOnly className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={row.image} alt={row.name} className="w-8 h-8 rounded object-cover border border-slate-200 bg-white p-0.5 shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-slate-900 leading-tight truncate max-w-[160px]">{row.name}</span>
                          <span className="text-xs text-slate-500 truncate max-w-[160px]">{row.subtitle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-slate-700">{row.verdict}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${row.scoreColor}`}>{row.score}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${row.confColor}`}>{row.confidence}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600 line-clamp-2 max-w-[140px]">{row.reason}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-600 whitespace-nowrap">{row.reviewer}</span>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(row.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
            <span className="text-xs font-medium text-slate-500 text-center sm:text-left">Showing 1 to 6 of 248 entries</span>
            <div className="flex items-center justify-center sm:justify-end gap-1.5 w-full sm:w-auto overflow-x-auto hide-scrollbar">
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded bg-blue-600 text-white font-medium text-xs">1</button>
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs">2</button>
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs">3</button>
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs">4</button>
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs">5</button>
              <span className="text-slate-400 tracking-widest px-1">...</span>
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs">42</button>
              <button className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
              
              <div className="relative ml-2 hidden sm:block shrink-0">
                <select className="appearance-none bg-white border border-slate-200 rounded pl-2 pr-6 py-1 text-xs font-medium text-slate-700 outline-none">
                  <option>10 / page</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Approval Review */}
        <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col gap-6">
            
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold text-slate-900">Approval Review</h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-500">ID: AR-2025-005312</span>
                <button className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Product Profile */}
            <div className="flex flex-row gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80" alt="Sony WH-1000XM5" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight truncate sm:whitespace-normal">Sony WH-1000XM5 Wireless Headphones</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 truncate">Over-Ear • Noise Canceling</p>
                <div className="flex items-center gap-3 mt-auto pt-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900">$399.99</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">a Amazon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 py-4 border-y border-slate-100 text-center">
              <div className="flex flex-col gap-1 col-span-3 sm:col-span-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">AI Verdict</span>
                <span className="text-xs font-bold text-rose-600">Better Alternative<br className="hidden sm:block"/>Available</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">AI Buy Score</span>
                <span className="text-sm font-bold text-emerald-600">82<span className="text-slate-400">/100</span></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Confidence</span>
                <span className="text-sm font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded mx-auto">92%</span>
              </div>
              <div className="flex flex-col gap-1 sm:hidden md:flex">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Review Trust</span>
                <span className="text-sm font-bold text-emerald-600">87%</span>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-900">AI Reasoning</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-900">Pros</span>
                  <ul className="flex flex-col gap-1.5">
                    <li className="flex items-start gap-2 text-[11px] sm:text-[12px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Excellent noise cancellation
                    </li>
                    <li className="flex items-start gap-2 text-[11px] sm:text-[12px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Premium sound quality
                    </li>
                    <li className="flex items-start gap-2 text-[11px] sm:text-[12px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Strong brand reputation
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-900">Cons</span>
                  <ul className="flex flex-col gap-1.5">
                    <li className="flex items-start gap-2 text-[11px] sm:text-[12px] text-slate-600">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" /> Higher price than competitors
                    </li>
                    <li className="flex items-start gap-2 text-[11px] sm:text-[12px] text-slate-600">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" /> Slightly heavier than alternatives
                    </li>
                    <li className="flex items-start gap-2 text-[11px] sm:text-[12px] text-slate-600">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" /> Call quality not best in class
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Middle row: Evidence & Alternative */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-900">Evidence Summary</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Price History
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 rounded">Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Review Clusters
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 rounded">Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Retailer Offers
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 rounded">Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Affiliate Status
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 rounded">Compliant</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-900">Recommended Alternative</h4>
                <div className="flex gap-2">
                  <img src="https://images.unsplash.com/photo-1647427017066-5197828ceb4e?w=100&q=80" alt="Bose" className="w-10 h-10 rounded object-cover border border-slate-200 bg-white shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-slate-900 leading-tight truncate">Bose QC Ultra</span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                      <span className="font-bold text-slate-900">$299.99</span>
                      <span className="text-slate-500 font-medium truncate">Amazon</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center mt-1">
                  <div className="flex flex-col">
                     <span className="text-[9px] text-slate-500 uppercase font-semibold">AI Buy Score</span>
                     <span className="text-[11px] font-bold text-emerald-600">91/100</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] text-slate-500 uppercase font-semibold">Price Advantage</span>
                     <span className="text-[11px] font-bold text-emerald-600">-25%</span>
                  </div>
                </div>
                <button className="text-[11px] font-semibold text-blue-600 flex items-center justify-center gap-1 mt-auto pb-1">
                  View full comparison <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              
              <div className="flex flex-col gap-3 h-full col-span-1 sm:col-span-2 lg:col-span-1">
                <h4 className="text-sm font-bold text-slate-900">Reviewer Notes</h4>
                <div className="flex-1 min-h-[80px] lg:min-h-[100px] relative">
                  <textarea 
                    className="w-full h-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:border-blue-500 resize-none"
                    placeholder="Add context..."
                  ></textarea>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">Approval Actions</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <button className="flex flex-col items-center justify-center gap-0.5 bg-emerald-600 text-white rounded-lg py-2 px-1 hover:bg-emerald-700 transition-colors shadow-sm">
                  <div className="flex items-center gap-1 font-bold text-[13px]"><CheckCircle2 className="w-3.5 h-3.5" /> Approve</div>
                  <span className="text-[9px] text-emerald-100 hidden sm:block">Accept AI decision</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-0.5 bg-blue-600 text-white rounded-lg py-2 px-1 hover:bg-blue-700 transition-colors shadow-sm">
                  <div className="flex items-center gap-1 font-bold text-[13px]"><Edit3 className="w-3.5 h-3.5" /> Edit</div>
                  <span className="text-[9px] text-blue-100 hidden sm:block">Edit scores</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-0.5 bg-rose-600 text-white rounded-lg py-2 px-1 hover:bg-rose-700 transition-colors shadow-sm">
                  <div className="flex items-center gap-1 font-bold text-[13px]"><X className="w-3.5 h-3.5" /> Reject</div>
                  <span className="text-[9px] text-rose-100 hidden sm:block">Disagree</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-0.5 bg-amber-500 text-white rounded-lg py-2 px-1 hover:bg-amber-600 transition-colors shadow-sm">
                  <div className="flex items-center gap-1 font-bold text-[13px]"><Flag className="w-3.5 h-3.5" /> Escalate</div>
                  <span className="text-[9px] text-amber-100 hidden sm:block">Senior review</span>
                </button>
              </div>
              <div className="flex items-start gap-2.5 mt-2 bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-blue-900">Policy Reminder</span>
                  <p className="text-[10px] sm:text-[11px] text-blue-700 leading-relaxed">
                    Ensure evidence is sufficient, alternative comparison is valid, and verdict aligns with AI guidelines.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        
        {/* Status Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Approval Status Breakdown</h3>
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 sm:pr-4">
            <div className="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] relative shrink-0">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">248</span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500">Total</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              {breakdownData.map((item, idx) => {
                const total = 248;
                const percentage = ((item.value / total) * 100).toFixed(1);
                return (
                  <div key={idx} className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2 min-w-[90px] sm:min-w-[100px]">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-[12px] sm:text-[13px] font-bold text-slate-900 shrink-0">{item.value} <span className="text-slate-400 font-medium">({percentage}%)</span></span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <button className="text-[11px] sm:text-xs font-semibold text-blue-600 hover:underline flex items-center justify-center w-full gap-1">
              View full breakdown <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Review Checklist */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-5">Review Checklist</h3>
          <ul className="flex flex-col gap-3 sm:gap-4 flex-1">
            {checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-[12px] sm:text-[13px] font-medium text-slate-700 leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <button className="text-[11px] sm:text-xs font-semibold text-blue-600 hover:underline flex items-center justify-center w-full gap-1">
              View checklist guide <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Decisions */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Recent Decisions</h3>
            <button className="text-[11px] sm:text-xs font-semibold text-blue-600 hover:underline">View all</button>
          </div>
          <div className="flex flex-col gap-3 flex-1 overflow-x-auto hide-scrollbar">
            <div className="min-w-[400px]">
              {recentDecisions.map((log, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5 sm:py-2 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 w-full">
                    <div className={`flex items-center gap-1.5 w-[90px] sm:w-24 shrink-0 ${log.color}`}>
                      <log.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[11px] sm:text-xs font-bold">{log.status}</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 pr-2">
                      <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800 truncate">{log.title}</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 truncate">{log.reviewer}</span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
