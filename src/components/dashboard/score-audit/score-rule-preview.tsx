"use client";

import React, { useState } from "react";
import {
  Layers,
  Edit2,
  LayoutGrid,
  Box,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Play,
  CheckCircle2,
  ChevronDown,
  Info,
  ArrowUp,
  ArrowDown,
  Minus,
  Check,
  Eye,
  FileText,
  Clock
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// --- Mock Data ---

const initialSliders = [
  { name: "Value Score", weight: 30 },
  { name: "Quality Score", weight: 25 },
  { name: "Review Trust", weight: 15 },
  { name: "Price Score", weight: 15 },
  { name: "Expert Evidence", weight: 10 },
  { name: "Health/Safety", weight: 5 },
];

const simulatorData = [
  { id: 1, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=50&q=80", name: "Apple AirPods Pro 2", currScore: 72, currVerdict: "Buy", currColor: "text-emerald-600", draftScore: 78, draftVerdict: "Buy", draftColor: "text-emerald-600", delta: "+6", deltaColor: "text-emerald-600", change: "-" },
  { id: 2, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=50&q=80", name: "Samsung Galaxy S24", currScore: 68, currVerdict: "Wait", currColor: "text-amber-500", draftScore: 74, draftVerdict: "Buy", draftColor: "text-emerald-600", delta: "+6", deltaColor: "text-emerald-600", change: "↑" },
  { id: 3, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=50&q=80", name: "Garmin Forerunner 265", currScore: 49, currVerdict: "Avoid", currColor: "text-rose-600", draftScore: 52, draftVerdict: "Wait", draftColor: "text-amber-500", delta: "+3", deltaColor: "text-emerald-600", change: "↑" },
  { id: 4, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=50&q=80", name: "Sony WH-1000XM5", currScore: 24, currVerdict: "Avoid", currColor: "text-rose-600", draftScore: 22, draftVerdict: "Avoid", draftColor: "text-rose-600", delta: "-2", deltaColor: "text-rose-600", change: "↓" },
  { id: 5, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=50&q=80", name: "TCL 65\" Q7 QLED TV", currScore: 81, currVerdict: "Buy", currColor: "text-emerald-600", draftScore: 79, draftVerdict: "Buy", draftColor: "text-emerald-600", delta: "-2", deltaColor: "text-rose-600", change: "-" },
];

const categoryTableData = [
  { name: "Electronics", currVer: "v2.3.1", draftVer: "v2.4.0", products: "3,842", delta: "+3.1", deltaColor: "text-emerald-600", risk: "Medium", riskColor: "text-amber-600" },
  { name: "Home & Kitchen", currVer: "v2.3.1", draftVer: "v2.4.0", products: "2,156", delta: "+1.8", deltaColor: "text-emerald-600", risk: "Low", riskColor: "text-emerald-600" },
  { name: "Health & Personal Care", currVer: "v2.3.1", draftVer: "v2.4.0", products: "1,987", delta: "+2.6", deltaColor: "text-emerald-600", risk: "Medium", riskColor: "text-amber-600" },
  { name: "Sports & Outdoors", currVer: "v2.3.1", draftVer: "v2.4.0", products: "1,412", delta: "+0.9", deltaColor: "text-emerald-600", risk: "Low", riskColor: "text-emerald-600" },
  { name: "Beauty", currVer: "v2.3.1", draftVer: "v2.4.0", products: "1,061", delta: "+4.2", deltaColor: "text-emerald-600", risk: "High", riskColor: "text-rose-600" },
];

const barChartData = [
  { name: "Value Score", before: 22.0, after: 24.0 },
  { name: "Quality Score", before: 18.5, after: 19.0 },
  { name: "Review Trust", before: 10.5, after: 12.0 },
  { name: "Price Score", before: 10.0, after: 11.5 },
  { name: "Expert Evidence", before: 6.5, after: 7.0 },
  { name: "Health/Safety", before: 2.5, after: 2.5 },
];

const donutData = [
  { name: "Buy (≥ 75)", value: 3842, color: "#22C55E", percent: "30.8%" },
  { name: "Wait (50 - < 75)", value: 4126, color: "#F59E0B", percent: "33.1%" },
  { name: "Avoid (25 - < 50)", value: 2578, color: "#EF4444", percent: "20.7%" },
  { name: "Better Alternative (< 25)", value: 1143, color: "#8B5CF6", percent: "9.2%" },
  { name: "Low Confidence (< 40)", value: 769, color: "#94A3B8", percent: "6.2%" },
];

const recentVersions = [
  { ver: "v2.4.0", status: "Draft", statusColor: "bg-amber-100 text-amber-700", desc: "8 categories affected", time: "May 26, 2025 10:42 AM", user: "Admin User", dot: "bg-emerald-500" },
  { ver: "v2.3.1", status: "Active", statusColor: "bg-emerald-100 text-emerald-700", desc: "All categories", time: "May 10, 2025 09:15 AM", user: "Admin User", dot: "bg-blue-500" },
  { ver: "v2.2.0", status: "Archived", statusColor: "bg-slate-100 text-slate-600", desc: "All categories", time: "Apr 18, 2025 02:31 PM", user: "System", dot: "bg-slate-300" },
];

export default function ScoreRulePreview() {
  const [mounted, setMounted] = useState(false);
  const [sliders, setSliders] = useState(initialSliders);
  
  React.useEffect(() => {
    // Add a slight delay for initial animation trigger
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSliderChange = (idx: number, value: number) => {
    const newSliders = [...sliders];
    newSliders[idx].weight = value;
    setSliders(newSliders);
  };

  return (
    <div className="w-full min-h-full bg-slate-50 font-sans text-slate-900 flex flex-col p-3 sm:p-4 lg:p-6 gap-4 sm:gap-6 min-w-0">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Score Rule Preview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Preview scoring logic, rule thresholds, and the impact of changes before publishing a new score version.
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3 min-w-0 w-full lg:w-auto mt-2 lg:mt-0 pb-1">
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Refresh
          </button>
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap shrink-0">
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Run Simulation
          </button>
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0">
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Publish
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Version Management */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-slate-500">Active Score Version</span>
              <span className="text-xl font-bold text-slate-900">v2.3.1</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1 rounded">Active</span>
                <span className="text-[9px] text-slate-400 truncate">May 10, 2025 • 14 days ago</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-purple-200 bg-purple-50 flex items-center justify-center shrink-0">
              <Edit2 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-slate-500">Draft Rule Changes</span>
              <span className="text-xl font-bold text-slate-900">v2.4.0</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1 rounded">Draft</span>
                <span className="text-[9px] text-slate-400 truncate">Last edited: May 26, 2025</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center shrink-0">
              <LayoutGrid className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-slate-500">Categories Affected</span>
              <span className="text-xl font-bold text-slate-900">8</span>
              <span className="text-[10px] text-slate-500 mt-0.5">36% of total categories</span>
            </div>
          </div>
        </div>

        {/* Simulation Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center shrink-0">
              <Box className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-slate-500">Products Simulated</span>
              <span className="text-xl font-bold text-slate-900">12,458</span>
              <span className="text-[10px] text-slate-500 mt-0.5">98% of active catalog</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-slate-500">Threshold Alerts</span>
              <span className="text-xl font-bold text-slate-900">3</span>
              <span className="text-[10px] text-amber-600 font-medium hover:underline cursor-pointer mt-0.5">View details</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-slate-500">Avg. Score Delta</span>
              <span className="text-xl font-bold text-emerald-600">+2.7</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Improvement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Middle Row (Config & Simulator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Rule Configuration Preview */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-6 min-w-0">
          <div className="flex flex-row items-center justify-between gap-2 mb-6 min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">Rule Configuration Preview</h2>
            <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-600">Total Weight</span>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600">100%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Category</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-semibold text-slate-700 outline-none w-40">
                <option>Electronics</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <div className="grid grid-cols-[minmax(80px,1fr)_minmax(40px,auto)_1.5fr_minmax(30px,auto)] gap-2 sm:gap-4 pb-2 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase border-b border-slate-100 min-w-0">
              <span>Component</span>
              <span className="text-left">Weight</span>
              <span className="text-center">Adjust Weight</span>
              <span className="text-right"></span>
            </div>
            
            <div className="flex flex-col gap-4 sm:gap-5 pt-4 min-w-0">
              {sliders.map((item, idx) => (
                <div key={idx} className="grid grid-cols-[minmax(80px,1fr)_minmax(40px,auto)_1.5fr_minmax(30px,auto)] gap-2 sm:gap-4 items-center min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[11px] sm:text-[13px] font-semibold text-slate-700 truncate">{item.name}</span>
                    <Info className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-left text-[12px] font-bold text-slate-900">
                    {item.weight}%
                  </div>
                  <div className="relative w-full h-1.5 bg-slate-100 rounded-full flex items-center">
                    <div 
                      className="absolute left-0 h-full bg-blue-500 rounded-full" 
                      style={{ width: `${item.weight}%` }}
                    ></div>
                    <div 
                      className="absolute w-3.5 h-3.5 bg-white border-2 border-blue-500 rounded-full shadow-sm cursor-pointer z-10" 
                      style={{ left: `calc(${item.weight}% - 7px)` }}
                    ></div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={item.weight} 
                      onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    />
                  </div>
                  <div className="text-right flex items-center justify-end gap-0.5 sm:gap-1 text-[11px] sm:text-[13px] font-bold text-slate-900 shrink-0">
                    {item.weight} <span className="text-slate-400 font-medium text-[11px]">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict Thresholds */}
          <div className="mt-8 pt-4 border-t border-slate-100">
            <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-3">Verdict Thresholds</h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="flex flex-col gap-1 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] font-bold text-slate-700 truncate">Buy</span>
                  </div>
                  <Edit2 className="w-3 h-3 text-slate-400 shrink-0" />
                </div>
                <span className="text-[13px] font-bold text-slate-900">≥ 75</span>
              </div>
              <div className="flex flex-col gap-1 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                    <span className="text-[11px] font-bold text-slate-700 truncate">Wait</span>
                  </div>
                  <Edit2 className="w-3 h-3 text-slate-400 shrink-0" />
                </div>
                <span className="text-[13px] font-bold text-slate-900">50 - {'<'} 75</span>
              </div>
              <div className="flex flex-col gap-1 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></div>
                    <span className="text-[11px] font-bold text-slate-700 truncate">Avoid</span>
                  </div>
                  <Edit2 className="w-3 h-3 text-slate-400 shrink-0" />
                </div>
                <span className="text-[13px] font-bold text-slate-900">25 - {'<'} 50</span>
              </div>
              <div className="flex flex-col gap-1 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></div>
                    <span className="text-[11px] font-bold text-slate-700 truncate">Better Alt.</span>
                  </div>
                  <Edit2 className="w-3 h-3 text-slate-400 shrink-0" />
                </div>
                <span className="text-[13px] font-bold text-slate-900">{'<'} 25</span>
              </div>
              <div className="flex flex-col gap-1 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 min-w-0">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                    <span className="text-[11px] font-bold text-slate-700 truncate">Low Conf.</span>
                  </div>
                  <Edit2 className="w-3 h-3 text-slate-400 shrink-0" />
                </div>
                <span className="text-[13px] font-bold text-slate-900 truncate">{'<'} 40 <span className="text-[10px] text-slate-500 font-normal">Conf.</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Rule Impact Simulator */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-4 sm:p-6 min-w-0">
          <div className="flex flex-row items-center justify-between gap-2 mb-4 min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">Rule Impact Simulator</h2>
            <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 bg-rose-50 text-rose-700 rounded text-[9px] sm:text-[10px] font-bold shrink-0">
              <AlertTriangle className="w-2.5 h-2.5 sm:w-3 h-3" /> <span className="truncate">High impact changes detected</span>
            </div>
          </div>

          <div className="overflow-x-auto w-full border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr>
                  <th rowSpan={2} className="px-3 py-2 bg-slate-50 border-b border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase align-bottom">Product</th>
                  <th colSpan={2} className="px-3 py-1.5 bg-blue-50/50 border-b border-r border-slate-200 text-[11px] font-bold text-blue-800 text-center">Current Version (v2.3.1)</th>
                  <th colSpan={2} className="px-3 py-1.5 bg-emerald-50/50 border-b border-r border-slate-200 text-[11px] font-bold text-emerald-800 text-center">Draft Version (v2.4.0)</th>
                  <th rowSpan={2} className="px-3 py-2 bg-slate-50 border-b border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase text-center align-bottom">Delta</th>
                  <th rowSpan={2} className="px-3 py-2 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase text-center align-bottom">Change</th>
                </tr>
                <tr>
                  <th className="px-3 py-1.5 bg-slate-50 border-b border-r border-slate-200 text-[10px] font-bold text-slate-500 text-center">Score</th>
                  <th className="px-3 py-1.5 bg-slate-50 border-b border-r border-slate-200 text-[10px] font-bold text-slate-500 text-center">Verdict</th>
                  <th className="px-3 py-1.5 bg-slate-50 border-b border-r border-slate-200 text-[10px] font-bold text-slate-500 text-center">Score</th>
                  <th className="px-3 py-1.5 bg-slate-50 border-b border-r border-slate-200 text-[10px] font-bold text-slate-500 text-center">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {simulatorData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="px-3 py-2 border-r border-slate-100">
                      <div className="flex items-center gap-2">
                        <img src={row.image} alt={row.name} className="w-6 h-6 rounded object-cover border border-slate-200" />
                        <span className="text-[12px] font-semibold text-slate-700 truncate max-w-[120px]">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 border-r border-slate-100 text-center text-[12px] font-bold text-slate-900">{row.currScore}</td>
                    <td className={`px-3 py-2 border-r border-slate-100 text-center text-[11px] font-bold ${row.currColor}`}>{row.currVerdict}</td>
                    <td className="px-3 py-2 border-r border-slate-100 text-center text-[12px] font-bold text-slate-900">{row.draftScore}</td>
                    <td className={`px-3 py-2 border-r border-slate-100 text-center text-[11px] font-bold ${row.draftColor}`}>{row.draftVerdict}</td>
                    <td className={`px-3 py-2 border-r border-slate-100 text-center text-[12px] font-bold ${row.deltaColor}`}>{row.delta}</td>
                    <td className="px-3 py-2 text-center text-[12px] font-bold text-slate-700">
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Projected Verdict Movement (Inner Card) */}
          <div className="mt-auto pt-6">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 sm:p-5">
              <h3 className="text-[12px] font-bold text-slate-900 mb-3">Projected Verdict Movement <span className="font-medium text-slate-500">(12,458 products)</span></h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="flex flex-col gap-1 border-r border-slate-100 last:border-0">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-600">
                  <ArrowUp className="w-3 h-3" /> Move to Buy
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm font-bold text-emerald-600">+842</span>
                  <span className="text-[10px] text-slate-400">(6.8%)</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 border-r border-slate-100 last:border-0">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-amber-600">
                  <ArrowUp className="w-3 h-3" /> Move to Wait
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm font-bold text-amber-600">+1,237</span>
                  <span className="text-[10px] text-slate-400">(9.9%)</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 border-r border-slate-100 last:border-0">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-rose-600">
                  <ArrowUp className="w-3 h-3" /> Move to Avoid
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm font-bold text-rose-600">+412</span>
                  <span className="text-[10px] text-slate-400">(3.3%)</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 border-r border-slate-100 last:border-0">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-purple-600">
                  <ArrowUp className="w-3 h-3" /> Move to Better Alternative
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm font-bold text-purple-600">+128</span>
                  <span className="text-[10px] text-slate-400">(1.0%)</span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          
          {/* Sample Product Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col min-w-0">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Sample Product Breakdown</h3>
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=50&q=80" alt="S24" className="w-8 h-8 rounded border border-slate-200" />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-slate-900">Samsung Galaxy S24</span>
                  <span className="text-[10px] text-slate-500">Category: Electronics • SKU: BW-ELEC-10234</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-slate-500">View</span>
                <select className="appearance-none bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] font-medium text-slate-700 outline-none">
                  <option>Before vs After</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_minmax(40px,auto)_minmax(40px,auto)_minmax(40px,auto)_2fr] gap-3 text-[10px] font-bold text-slate-500 uppercase pb-2">
              <span>Component</span>
              <span className="text-center">Current <span className="font-normal lowercase">(v2.3.1)</span></span>
              <span className="text-center">Draft <span className="font-normal lowercase">(v2.4.0)</span></span>
              <span className="text-center">Delta</span>
              <span className="text-center">Score Contribution (0-100)</span>
            </div>
            
            <div className="flex flex-col gap-3 pt-2 h-[200px]">
               {/* Custom Bar layout since standard recharts horizontal layout is tricky to match perfectly with text grid */}
               {barChartData.map((item, idx) => {
                 const delta = item.after - item.before;
                 const deltaText = delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1);
                 return (
                   <div key={idx} className="grid grid-cols-[1fr_minmax(40px,auto)_minmax(40px,auto)_minmax(40px,auto)_2fr] gap-3 items-center text-[11px]">
                     <span className="font-semibold text-slate-700 truncate">{item.name}</span>
                     <span className="text-center font-medium text-slate-900">{item.before.toFixed(1)}</span>
                     <span className="text-center font-bold text-slate-900">{item.after.toFixed(1)}</span>
                     <span className={`text-center font-bold ${delta > 0 ? 'text-emerald-600' : 'text-slate-500'}`}>{deltaText}</span>
                     <div className="relative w-full h-2 bg-slate-100 rounded-sm flex items-center">
                       {/* Mocking the Before/After lines visually */}
                       <div 
                         className="absolute left-0 h-full bg-slate-300 rounded-sm transition-all duration-1000 ease-out" 
                         style={{ width: mounted ? `${(item.before / 30) * 100}%` : '0%' }}
                       ></div>
                       <div 
                         className="absolute left-0 h-1 bg-blue-600 rounded-sm z-10 transition-all duration-1000 ease-out" 
                         style={{ width: mounted ? `${(item.after / 30) * 100}%` : '0%' }}
                       ></div>
                       <div 
                         className="absolute w-2 h-2 rotate-45 bg-blue-800 z-20 transition-all duration-1000 ease-out" 
                         style={{ left: mounted ? `calc(${(item.after / 30) * 100}% - 4px)` : '-4px' }}
                       ></div>
                     </div>
                   </div>
                 );
               })}
               <div className="grid grid-cols-[1fr_minmax(40px,auto)_minmax(40px,auto)_minmax(40px,auto)_2fr] gap-3 items-center text-[12px] pt-2 mt-2 border-t border-slate-100 font-bold">
                 <span className="text-slate-900">Total Score</span>
                 <span className="text-center text-slate-900">68.0</span>
                 <span className="text-center text-slate-900">74.0</span>
                 <span className="text-center text-emerald-600">+6.0</span>
                 <div className="relative w-full h-2 bg-slate-100 rounded-sm flex items-center">
                   <div 
                     className="absolute left-0 h-full bg-slate-300 rounded-sm transition-all duration-1000 ease-out" 
                     style={{ width: mounted ? '68%' : '0%' }}
                   ></div>
                   <div 
                     className="absolute left-0 h-1 bg-blue-600 rounded-sm z-10 transition-all duration-1000 ease-out" 
                     style={{ width: mounted ? '74%' : '0%' }}
                   ></div>
                   <div 
                     className="absolute w-2 h-2 rotate-45 bg-blue-800 z-20 transition-all duration-1000 ease-out" 
                     style={{ left: mounted ? 'calc(74% - 4px)' : '-4px' }}
                   ></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Category Preview Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col min-w-0">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Category Preview Table</h3>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="py-2 pr-2">Category</th>
                    <th className="py-2 px-2 text-center">Current</th>
                    <th className="py-2 px-2 text-center">Draft</th>
                    <th className="py-2 px-2 text-center">Products</th>
                    <th className="py-2 px-2 text-center">Delta</th>
                    <th className="py-2 px-2 text-center">Risk</th>
                    <th className="py-2 pl-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categoryTableData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 pr-2 text-[11px] font-semibold text-slate-700">{row.name}</td>
                      <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{row.currVer}</td>
                      <td className="py-2.5 px-2 text-[11px] text-slate-500 text-center">{row.draftVer}</td>
                      <td className="py-2.5 px-2 text-[11px] font-medium text-slate-900 text-center">{row.products}</td>
                      <td className={`py-2.5 px-2 text-[11px] font-bold text-center ${row.deltaColor}`}>{row.delta}</td>
                      <td className={`py-2.5 px-2 text-[10px] font-bold text-center ${row.riskColor}`}>{row.risk}</td>
                      <td className="py-2.5 pl-2 text-center">
                        <button className="text-slate-400 hover:text-blue-600"><Eye className="w-3.5 h-3.5 mx-auto" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="text-[11px] font-semibold text-blue-600 mt-3 self-start hover:underline">
              View all 8 categories
            </button>
          </div>

        </div>

        {/* Middle Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          
          {/* Rule Logic Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Rule Logic Notes</h3>
            </div>
            <ul className="flex flex-col gap-3 list-disc pl-5">
              <li className="text-[12px] text-slate-700 leading-relaxed pl-1">
                <span className="font-semibold text-slate-900">Price sensitivity increased by 10%</span> to better reflect market volatility in electronics.
              </li>
              <li className="text-[12px] text-slate-700 leading-relaxed pl-1">
                <span className="font-semibold text-slate-900">Review Trust weight increased</span> to reward consistent, high-quality reviews.
              </li>
              <li className="text-[12px] text-slate-700 leading-relaxed pl-1">
                <span className="font-semibold text-slate-900">Low confidence threshold remains {'<'} 40.</span> Items below this require manual review.
              </li>
              <li className="text-[12px] text-slate-700 leading-relaxed pl-1">
                <span className="font-semibold text-slate-900">Health/Safety logic unchanged</span> to maintain regulatory compliance.
              </li>
              <li className="text-[12px] text-slate-700 leading-relaxed pl-1">
                <span className="font-semibold text-slate-900">Expert Evidence weight reduced slightly</span> to balance crowd-sourced signals.
              </li>
            </ul>
          </div>

          {/* Validation Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col min-w-0">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Validation Checklist</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center bg-slate-50"><Check className="w-2.5 h-2.5 text-slate-400" /></div>
                  <span className="text-[12px] font-medium text-slate-700">Total weight equals 100%</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700"><div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" /></div> Pass</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center bg-slate-50"><Check className="w-2.5 h-2.5 text-slate-400" /></div>
                  <span className="text-[12px] font-medium text-slate-700">Thresholds do not overlap</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700"><div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" /></div> Pass</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center bg-slate-50"><Check className="w-2.5 h-2.5 text-slate-400" /></div>
                  <span className="text-[12px] font-medium text-slate-700">Required explanation added</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700"><div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" /></div> Pass</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center bg-slate-50"><Check className="w-2.5 h-2.5 text-slate-400" /></div>
                  <span className="text-[12px] font-medium text-slate-700">Safety logic unchanged</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700"><div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" /></div> Pass</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center bg-slate-50"><Check className="w-2.5 h-2.5 text-slate-400" /></div>
                  <span className="text-[12px] font-medium text-slate-700">Affiliate neutrality confirmed</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700"><div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" /></div> Pass</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 text-emerald-600 font-bold text-[12px]">
              <div className="w-4 h-4 rounded-full border border-emerald-600 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" /></div> All checks passed
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          
          {/* Threshold Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col min-w-0">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Threshold Distribution</h3>
            <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-2">
              <div className="h-[140px] w-[140px] relative shrink-0">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        isAnimationActive={true}
                        animationBegin={100}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-base font-bold text-slate-900 leading-none">12,458</span>
                  <span className="text-[9px] font-semibold text-slate-500">Products</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2.5 w-full sm:w-auto sm:pl-4">
                {donutData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 min-w-[120px] sm:min-w-[160px]">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[11px] font-semibold text-slate-700 truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6 text-right">
                      <span className="text-[11px] font-medium text-slate-900 w-10 sm:w-12 text-right">{item.value.toLocaleString()}</span>
                      <span className="text-[11px] text-slate-500 w-8 sm:w-10 text-right">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500">
              Distribution reflects draft version (v2.4.0) simulation. <Info className="w-3 h-3" />
            </div>
          </div>

          {/* Recent Score Rule Versions */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col min-w-0 flex-1">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Score Rule Versions</h3>
            <div className="flex flex-col gap-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {recentVersions.map((ver, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 relative z-10 pl-6">
                  <div className={`absolute left-[7px] top-1.5 w-[10px] h-[10px] rounded-full border-2 border-white ${ver.dot}`}></div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-slate-900">{ver.ver}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${ver.statusColor}`}>{ver.status}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{ver.desc}</span>
                  </div>
                  <div className="flex flex-col sm:items-end text-left sm:text-right gap-1">
                    <span className="text-[11px] font-medium text-slate-600">{ver.time}</span>
                    <span className="text-[10px] text-slate-400">{ver.user}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-[11px] font-semibold text-blue-600 mt-auto pt-4 self-start hover:underline">
              View full version history
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
