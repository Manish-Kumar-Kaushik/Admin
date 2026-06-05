"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Activity,
  Download,
  ChevronDown,
  Globe,
  AlertTriangle,
  Layers,
  Clock,
  Zap,
  Info,
  MoreVertical,
  ShieldCheck,
  CheckCircle2,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// ----------------------------------------------------------------------
// Mock Data
// ----------------------------------------------------------------------

const usageData = [
  {
    "time": "12:00 PM",
    "amazon": 74.3,
    "walmart": 37.1,
    "bestBuy": 29.3,
    "target": 23.9,
    "ebay": 7.3
  },
  {
    "time": "",
    "amazon": 71.9,
    "walmart": 38.4,
    "bestBuy": 26.8,
    "target": 22,
    "ebay": 6.8
  },
  {
    "time": "",
    "amazon": 73.4,
    "walmart": 36.8,
    "bestBuy": 26.6,
    "target": 22.7,
    "ebay": 6
  },
  {
    "time": "",
    "amazon": 73.7,
    "walmart": 36.3,
    "bestBuy": 26.5,
    "target": 24.6,
    "ebay": 5.5
  },
  {
    "time": "",
    "amazon": 72.5,
    "walmart": 35,
    "bestBuy": 28.1,
    "target": 23.7,
    "ebay": 5.7
  },
  {
    "time": "",
    "amazon": 70.8,
    "walmart": 36,
    "bestBuy": 28.6,
    "target": 22.4,
    "ebay": 7.1
  },
  {
    "time": "",
    "amazon": 71.9,
    "walmart": 38.5,
    "bestBuy": 28.7,
    "target": 20.9,
    "ebay": 8.3
  },
  {
    "time": "",
    "amazon": 74.5,
    "walmart": 38.2,
    "bestBuy": 28.9,
    "target": 19.9,
    "ebay": 7
  },
  {
    "time": "",
    "amazon": 72.6,
    "walmart": 36.7,
    "bestBuy": 28.2,
    "target": 19.9,
    "ebay": 6.1
  },
  {
    "time": "",
    "amazon": 74.9,
    "walmart": 37.5,
    "bestBuy": 28.5,
    "target": 20.8,
    "ebay": 4.9
  },
  {
    "time": "",
    "amazon": 76.5,
    "walmart": 38.1,
    "bestBuy": 27.6,
    "target": 19.1,
    "ebay": 5.9
  },
  {
    "time": "3:00 PM",
    "amazon": 78,
    "walmart": 35.6,
    "bestBuy": 29.4,
    "target": 19.7,
    "ebay": 4.9
  },
  {
    "time": "",
    "amazon": 74.6,
    "walmart": 36.2,
    "bestBuy": 30.3,
    "target": 21.2,
    "ebay": 6.3
  },
  {
    "time": "",
    "amazon": 71.3,
    "walmart": 37.6,
    "bestBuy": 28.6,
    "target": 22.5,
    "ebay": 4.8
  },
  {
    "time": "",
    "amazon": 72.3,
    "walmart": 36.1,
    "bestBuy": 26.9,
    "target": 23.4,
    "ebay": 5.8
  },
  {
    "time": "",
    "amazon": 72.9,
    "walmart": 38.7,
    "bestBuy": 29.2,
    "target": 24.2,
    "ebay": 6.2
  },
  {
    "time": "",
    "amazon": 69.5,
    "walmart": 41.2,
    "bestBuy": 27.9,
    "target": 24.4,
    "ebay": 6.6
  },
  {
    "time": "",
    "amazon": 66.8,
    "walmart": 43.2,
    "bestBuy": 27.1,
    "target": 25.8,
    "ebay": 6.2
  },
  {
    "time": "",
    "amazon": 65.9,
    "walmart": 44.5,
    "bestBuy": 27.1,
    "target": 24.6,
    "ebay": 5.1
  },
  {
    "time": "",
    "amazon": 67.5,
    "walmart": 42.8,
    "bestBuy": 27.5,
    "target": 24.1,
    "ebay": 6.1
  },
  {
    "time": "",
    "amazon": 66.8,
    "walmart": 45.3,
    "bestBuy": 27.4,
    "target": 22.5,
    "ebay": 7
  },
  {
    "time": "",
    "amazon": 67.5,
    "walmart": 42.4,
    "bestBuy": 26.7,
    "target": 22.6,
    "ebay": 7.3
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 43.9,
    "bestBuy": 25.6,
    "target": 22,
    "ebay": 7.8
  },
  {
    "time": "6:00 PM",
    "amazon": 65,
    "walmart": 44.5,
    "bestBuy": 26.5,
    "target": 22,
    "ebay": 6.9
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 47,
    "bestBuy": 27.2,
    "target": 23,
    "ebay": 5.7
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 47.5,
    "bestBuy": 26.7,
    "target": 23.3,
    "ebay": 4.8
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 50,
    "bestBuy": 25,
    "target": 22.1,
    "ebay": 5.5
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 50.2,
    "bestBuy": 25,
    "target": 23.8,
    "ebay": 6
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 52,
    "bestBuy": 25,
    "target": 22.3,
    "ebay": 6.2
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 55,
    "bestBuy": 25.5,
    "target": 21.4,
    "ebay": 5.9
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 57.4,
    "bestBuy": 26.8,
    "target": 20,
    "ebay": 5.8
  },
  {
    "time": "",
    "amazon": 65.3,
    "walmart": 57.4,
    "bestBuy": 26,
    "target": 18.4,
    "ebay": 6.7
  },
  {
    "time": "",
    "amazon": 69.1,
    "walmart": 59.8,
    "bestBuy": 25.8,
    "target": 19.5,
    "ebay": 6.1
  },
  {
    "time": "",
    "amazon": 72.2,
    "walmart": 57.6,
    "bestBuy": 27.3,
    "target": 19.5,
    "ebay": 6.2
  },
  {
    "time": "9:00 PM",
    "amazon": 74.1,
    "walmart": 59.1,
    "bestBuy": 26.3,
    "target": 19.8,
    "ebay": 4.7
  },
  {
    "time": "",
    "amazon": 77.5,
    "walmart": 60.4,
    "bestBuy": 27.4,
    "target": 21,
    "ebay": 4.9
  },
  {
    "time": "",
    "amazon": 75.7,
    "walmart": 59.4,
    "bestBuy": 27.7,
    "target": 19.4,
    "ebay": 6.2
  },
  {
    "time": "",
    "amazon": 72.6,
    "walmart": 60.2,
    "bestBuy": 25.4,
    "target": 19.9,
    "ebay": 5.5
  },
  {
    "time": "",
    "amazon": 69.1,
    "walmart": 60.3,
    "bestBuy": 25.1,
    "target": 19.6,
    "ebay": 4.7
  },
  {
    "time": "",
    "amazon": 69.4,
    "walmart": 60.5,
    "bestBuy": 25,
    "target": 21.6,
    "ebay": 5.6
  },
  {
    "time": "",
    "amazon": 71.2,
    "walmart": 58.9,
    "bestBuy": 25.7,
    "target": 21,
    "ebay": 6.1
  },
  {
    "time": "",
    "amazon": 71.2,
    "walmart": 58.5,
    "bestBuy": 26.8,
    "target": 22,
    "ebay": 5.8
  },
  {
    "time": "",
    "amazon": 73.3,
    "walmart": 60.5,
    "bestBuy": 27.6,
    "target": 21.1,
    "ebay": 4.9
  },
  {
    "time": "",
    "amazon": 74.7,
    "walmart": 61.4,
    "bestBuy": 26.1,
    "target": 22.3,
    "ebay": 4.2
  },
  {
    "time": "",
    "amazon": 72.8,
    "walmart": 61.3,
    "bestBuy": 26.6,
    "target": 23.7,
    "ebay": 3.2
  },
  {
    "time": "12:00 AM",
    "amazon": 69.3,
    "walmart": 60.4,
    "bestBuy": 25.1,
    "target": 21.8,
    "ebay": 2.2
  },
  {
    "time": "",
    "amazon": 65.6,
    "walmart": 63,
    "bestBuy": 26.3,
    "target": 20.2,
    "ebay": 2
  },
  {
    "time": "",
    "amazon": 65.5,
    "walmart": 64.8,
    "bestBuy": 25.1,
    "target": 21.5,
    "ebay": 2.2
  },
  {
    "time": "",
    "amazon": 65.4,
    "walmart": 62.6,
    "bestBuy": 26.5,
    "target": 20.8,
    "ebay": 3.3
  },
  {
    "time": "",
    "amazon": 68.5,
    "walmart": 60.8,
    "bestBuy": 26.1,
    "target": 20,
    "ebay": 3.3
  },
  {
    "time": "",
    "amazon": 66.4,
    "walmart": 60.4,
    "bestBuy": 27,
    "target": 20.9,
    "ebay": 3.9
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 59.1,
    "bestBuy": 27.2,
    "target": 19.9,
    "ebay": 3.4
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 59.2,
    "bestBuy": 26.2,
    "target": 20,
    "ebay": 2.8
  },
  {
    "time": "",
    "amazon": 65.8,
    "walmart": 59.1,
    "bestBuy": 25,
    "target": 20.5,
    "ebay": 3.4
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 61.3,
    "bestBuy": 25.2,
    "target": 22.2,
    "ebay": 3.8
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 64,
    "bestBuy": 25,
    "target": 23.4,
    "ebay": 4.1
  },
  {
    "time": "3:00 AM",
    "amazon": 66.2,
    "walmart": 61.3,
    "bestBuy": 25,
    "target": 24.1,
    "ebay": 4.5
  },
  {
    "time": "",
    "amazon": 65.4,
    "walmart": 64.1,
    "bestBuy": 26.9,
    "target": 23.7,
    "ebay": 5.7
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 64.9,
    "bestBuy": 29.1,
    "target": 22.7,
    "ebay": 5.9
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 63,
    "bestBuy": 29.8,
    "target": 24.3,
    "ebay": 5.9
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 64.1,
    "bestBuy": 30.4,
    "target": 25.2,
    "ebay": 5
  },
  {
    "time": "",
    "amazon": 68.8,
    "walmart": 64.8,
    "bestBuy": 32.3,
    "target": 27,
    "ebay": 4.3
  },
  {
    "time": "",
    "amazon": 66,
    "walmart": 65,
    "bestBuy": 30.4,
    "target": 26.7,
    "ebay": 4.3
  },
  {
    "time": "",
    "amazon": 66.5,
    "walmart": 62.5,
    "bestBuy": 32.2,
    "target": 24.9,
    "ebay": 4.6
  },
  {
    "time": "",
    "amazon": 67,
    "walmart": 65,
    "bestBuy": 31.5,
    "target": 26.8,
    "ebay": 5.4
  },
  {
    "time": "",
    "amazon": 69.2,
    "walmart": 65,
    "bestBuy": 33.1,
    "target": 25.9,
    "ebay": 5.7
  },
  {
    "time": "",
    "amazon": 69.7,
    "walmart": 63.6,
    "bestBuy": 34.1,
    "target": 25.6,
    "ebay": 4.8
  },
  {
    "time": "",
    "amazon": 67,
    "walmart": 65,
    "bestBuy": 33.8,
    "target": 25.3,
    "ebay": 3.7
  },
  {
    "time": "6:00 AM",
    "amazon": 66.4,
    "walmart": 65,
    "bestBuy": 35.3,
    "target": 25.6,
    "ebay": 2.3
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 63.9,
    "bestBuy": 33.8,
    "target": 27.3,
    "ebay": 2
  },
  {
    "time": "",
    "amazon": 67.7,
    "walmart": 62,
    "bestBuy": 32.3,
    "target": 26.8,
    "ebay": 2
  },
  {
    "time": "",
    "amazon": 65.2,
    "walmart": 60.2,
    "bestBuy": 30.9,
    "target": 26.4,
    "ebay": 2.7
  },
  {
    "time": "",
    "amazon": 67.5,
    "walmart": 59,
    "bestBuy": 30.5,
    "target": 27.1,
    "ebay": 2.1
  },
  {
    "time": "",
    "amazon": 68.9,
    "walmart": 57.3,
    "bestBuy": 31.8,
    "target": 28.6,
    "ebay": 3.2
  },
  {
    "time": "",
    "amazon": 66,
    "walmart": 57.2,
    "bestBuy": 29.6,
    "target": 30,
    "ebay": 4.4
  },
  {
    "time": "",
    "amazon": 65,
    "walmart": 56.1,
    "bestBuy": 29.7,
    "target": 30.8,
    "ebay": 5.7
  },
  {
    "time": "",
    "amazon": 67.1,
    "walmart": 58.9,
    "bestBuy": 27.9,
    "target": 29.1,
    "ebay": 5.4
  },
  {
    "time": "",
    "amazon": 66,
    "walmart": 61,
    "bestBuy": 27.8,
    "target": 31,
    "ebay": 5.5
  },
  {
    "time": "",
    "amazon": 66.6,
    "walmart": 60.6,
    "bestBuy": 27.8,
    "target": 29.4,
    "ebay": 4.4
  },
  {
    "time": "9:00 AM",
    "amazon": 65,
    "walmart": 60.6,
    "bestBuy": 27.8,
    "target": 27.5,
    "ebay": 3.4
  }
];

const thresholdAlerts = [
  { severity: "Critical", connector: "Best Buy", message: "Usage above 95% of limit", usage: 97, time: "9:41 AM" },
  { severity: "Critical", connector: "eBay", message: "Burst usage above 90%", usage: 93, time: "9:35 AM" },
  { severity: "Warning", connector: "Target", message: "Usage above 80% of limit", usage: 84, time: "9:28 AM" },
  { severity: "Warning", connector: "Walmart", message: "High retry queue depth", usage: null, extra: "1,247", time: "9:12 AM" },
  { severity: "Warning", connector: "Amazon", message: "Approaching burst limit", usage: 81, time: "9:05 AM" },
];

const connectorStatus = [
  { retailer: "Amazon", color: "bg-blue-500", window: "1 minute", used: "3,842", remaining: "1,158", usagePct: 76.8, burst: "8,000", reset: "00:00:27", status: "Healthy" },
  { retailer: "Walmart", color: "bg-teal-500", window: "1 minute", used: "2,964", remaining: "1,536", usagePct: 65.8, burst: "6,000", reset: "00:00:27", status: "Healthy" },
  { retailer: "Best Buy", color: "bg-indigo-600", window: "1 minute", used: "5,812", remaining: "188", usagePct: 96.9, burst: "6,000", reset: "00:00:27", status: "Critical" },
  { retailer: "Target", color: "bg-orange-500", window: "1 minute", used: "4,238", remaining: "762", usagePct: 84.8, burst: "5,000", reset: "00:00:27", status: "Warning" },
  { retailer: "eBay", color: "bg-rose-500", window: "1 minute", used: "4,652", remaining: "348", usagePct: 93.0, burst: "5,000", reset: "00:00:27", status: "Critical" },
];

const topEndpoints = [
  { id: 1, endpoint: "/search", connector: "Amazon", usage: 92, reqMin: "1,842" },
  { id: 2, endpoint: "/catalog/items", connector: "Best Buy", usage: 89, reqMin: "1,128" },
  { id: 3, endpoint: "/items/{id}", connector: "eBay", usage: 87, reqMin: "965" },
  { id: 4, endpoint: "/prices", connector: "Target", usage: 81, reqMin: "812" },
  { id: 5, endpoint: "/inventory", connector: "Walmart", usage: 76, reqMin: "652" },
];

const errorTrend = [
  { date: "May 11", errors: 198 },
  { date: "May 12", errors: 214 },
  { date: "May 13", errors: 276 },
  { date: "May 14", errors: 341 },
  { date: "May 15", errors: 289 },
  { date: "May 16", errors: 256 },
  { date: "May 17", errors: 312 },
];

// ----------------------------------------------------------------------
// Helper Components
// ----------------------------------------------------------------------

const ProgressBar = ({ percent, colorClass }: { percent: number; colorClass: string }) => (
  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex items-center">
    <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${percent}%` }} />
  </div>
);

const SeverityPill = ({ type }: { type: string }) => {
  if (type === "Critical") {
    return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">Critical</span>;
  }
  if (type === "Warning") {
    return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">Warning</span>;
  }
  return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Healthy</span>;
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export default function RateLimitMonitor() {
  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden flex flex-col">
      {/* Main Container */}
      <div className="w-full flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Rate Limit Monitor</h1>
            <p className="text-sm text-slate-500 mt-1">
              Track API usage, throttling, and quota consumption across retailer connectors.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              <Activity className="w-4 h-4" /> Run Health Check
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export Report <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
            </button>
          </div>
        </div>

        {/* Row 1: KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {/* KPI 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block">Remaining Global Quota</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">68.4%</span>
              <span className="text-[10px] text-slate-400 block mt-1">6,840,000 / 10,000,000</span>
            </div>
          </div>
          {/* KPI 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block">Requests / Minute</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">4,263</span>
              <span className="text-[10px] text-slate-400 block mt-1">Peak: 8,732</span>
            </div>
          </div>
          {/* KPI 3 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block">429 Errors Today</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">312</span>
              <span className="text-[10px] text-slate-400 block mt-1">0.78% of requests</span>
            </div>
          </div>
          {/* KPI 4 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block">Retry Queue</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">1,247</span>
              <span className="text-[10px] text-slate-400 block mt-1">Next in 23s</span>
            </div>
          </div>
          {/* KPI 5 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block">Average Response Time</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">412 ms</span>
              <span className="text-[10px] text-slate-400 block mt-1">P95: 1,236 ms</span>
            </div>
          </div>
          {/* KPI 6 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block">Peak Burst Usage</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">88.6%</span>
              <span className="text-[10px] text-slate-400 block mt-1">of burst limit</span>
            </div>
          </div>
        </div>

        {/* Row 2: Charts and Alerts (50/50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                Rate Limit Usage Over Time
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h2>
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-md pl-3 pr-8 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 min-h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData.map((d, i) => ({ ...d, id: i }))} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="id" 
                    type="number"
                    domain={[0, 79]}
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} 
                    dy={10} 
                    ticks={[0, 11, 23, 34, 45, 56, 68, 79]}
                    tickFormatter={(val) => {
                      const labels = ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM", "12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM"];
                      const index = [0, 11, 23, 34, 45, 56, 68, 79].indexOf(val);
                      return index !== -1 ? labels[index] : "";
                    }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} 
                    tickFormatter={(val) => `${val}%`}
                    ticks={[0, 25, 50, 75, 100]}
                    domain={[0, 100]}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                    labelStyle={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}
                  />
                  <Line type="linear" dataKey="amazon" stroke="#2563EB" strokeWidth={2} dot={false} name="Amazon" />
                  <Line type="linear" dataKey="walmart" stroke="#0D9488" strokeWidth={2} dot={false} name="Walmart" />
                  <Line type="linear" dataKey="bestBuy" stroke="#7C3AED" strokeWidth={2} dot={false} name="Best Buy" />
                  <Line type="linear" dataKey="target" stroke="#F97316" strokeWidth={2} dot={false} name="Target" />
                  <Line type="linear" dataKey="ebay" stroke="#E11D48" strokeWidth={2} dot={false} name="eBay" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2"><span className="w-4 h-[3px] rounded-full bg-[#2563EB]"></span><span className="text-xs font-bold text-slate-600">Amazon</span></div>
              <div className="flex items-center gap-2"><span className="w-4 h-[3px] rounded-full bg-[#0D9488]"></span><span className="text-xs font-bold text-slate-600">Walmart</span></div>
              <div className="flex items-center gap-2"><span className="w-4 h-[3px] rounded-full bg-[#7C3AED]"></span><span className="text-xs font-bold text-slate-600">Best Buy</span></div>
              <div className="flex items-center gap-2"><span className="w-4 h-[3px] rounded-full bg-[#F97316]"></span><span className="text-xs font-bold text-slate-600">Target</span></div>
              <div className="flex items-center gap-2"><span className="w-4 h-[3px] rounded-full bg-[#E11D48]"></span><span className="text-xs font-bold text-slate-600">eBay</span></div>
            </div>
          </div>

          {/* Alerts Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                Threshold Alerts
                <span className="inline-flex items-center justify-center bg-rose-100 text-rose-700 text-[10px] font-bold h-5 w-5 rounded-full">5</span>
              </h2>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                View all alerts
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Severity</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Connector</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Message</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Usage</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right pl-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {thresholdAlerts.map((alert, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <SeverityPill type={alert.severity} />
                      </td>
                      <td className="py-3 pr-4 text-xs font-bold text-slate-900">{alert.connector}</td>
                      <td className="py-3 pr-4 text-xs text-slate-600 font-medium truncate max-w-[150px]">{alert.message}</td>
                      <td className="py-3 pr-4 text-right align-middle w-24">
                        {alert.usage !== null ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-[11px] font-bold text-slate-700">{alert.usage}%</span>
                            <div className="w-12 shrink-0">
                              <ProgressBar percent={alert.usage} colorClass={alert.usage > 90 ? "bg-rose-500" : alert.usage > 80 ? "bg-orange-500" : "bg-emerald-500"} />
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-700">{alert.extra}</span>
                        )}
                      </td>
                      <td className="py-3 pl-4 text-right text-[11px] font-semibold text-slate-500 whitespace-nowrap">{alert.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-auto pt-4 flex justify-center border-t border-slate-100">
              <button className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors">
                <Settings className="w-3.5 h-3.5" /> Configure Thresholds
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Connector Rate Limit Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
          <div className="p-6 pb-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-950">Connector Rate Limit Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Retailer</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <div className="flex items-center gap-1">Limit Window <Info className="w-3 h-3 opacity-50" /></div>
                  </th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Requests Used</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Requests Remaining</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 w-48">Usage %</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Burst Limit</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <div className="flex items-center gap-1">Reset Time <Info className="w-3 h-3 opacity-50" /></div>
                  </th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {connectorStatus.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${row.color}`}></span>
                        <span className="text-xs font-bold text-slate-900">{row.retailer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{row.window}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-900">{row.used}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-900">{row.remaining}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-700 w-9">{row.usagePct}%</span>
                        <ProgressBar percent={row.usagePct} colorClass={row.usagePct > 90 ? "bg-rose-500" : row.usagePct > 80 ? "bg-orange-500" : "bg-blue-500"} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{row.burst}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600 tabular-nums">{row.reset}</td>
                    <td className="px-6 py-4">
                      <SeverityPill type={row.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded-md text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                          View
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors border border-transparent hover:border-slate-200 hover:bg-slate-50 rounded-md">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500 bg-slate-50/50">
            <span>1-5 of 5 connectors</span>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-600 disabled:opacity-50">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-blue-600 bg-blue-600 text-white font-bold">
                1
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-600 disabled:opacity-50">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 4: Bottom 3 Cards (33/33/33) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Limited Endpoints */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-950 flex items-center gap-1.5 mb-5">
              Top Limited Endpoints
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </h2>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 w-8">#</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Endpoint</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Connector</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 w-24">Usage %</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Requests / Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topEndpoints.map((ep) => (
                    <tr key={ep.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 text-xs font-semibold text-slate-400">{ep.id}</td>
                      <td className="py-2.5 text-xs font-bold text-slate-900">{ep.endpoint}</td>
                      <td className="py-2.5 text-xs font-medium text-slate-600">{ep.connector}</td>
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-700 w-7">{ep.usage}%</span>
                          <ProgressBar percent={ep.usage} colorClass={ep.usage > 90 ? "bg-rose-500" : ep.usage > 80 ? "bg-orange-500" : "bg-blue-500"} />
                        </div>
                      </td>
                      <td className="py-2.5 text-xs font-bold text-slate-900 text-right">{ep.reqMin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                View all endpoints
              </button>
            </div>
          </div>

          {/* 429 Error Trend */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                429 Error Trend
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h2>
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-md pl-2 pr-6 py-1 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={errorTrend} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} />
                  <RechartsTooltip 
                    cursor={{ fill: '#F1F5F9' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="errors" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={32}>
                    {/* Recharts automatically renders labels if desired, or custom */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
                <span className="text-[11px] font-bold text-slate-600">429 Errors</span>
              </div>
            </div>
          </div>

          {/* Rate Limit Policy Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-950 flex items-center gap-1.5 mb-6">
              Rate Limit Policy Notes
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </h2>
            <div className="flex flex-col gap-5 flex-1">
              
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Dynamic Quotas</h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Global quota is shared across all connectors and adjusts based on plan limits.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Burst Handling</h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Burst limits allow short spikes. Sustained overage may trigger throttling.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">Reset Windows</h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    All limits reset at the end of each window. Real-time usage may vary slightly.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">429 Handling</h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    After repeated 429s, connectors enter exponential backoff for protection.
                  </p>
                </div>
              </div>

            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                View full rate limit policy
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
