"use client";

import React, { useState, useEffect } from "react";
import { 
  RefreshCw, 
  PlayCircle, 
  Download, 
  ChevronDown, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Link2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  CheckSquare,
  ShieldCheck,
  UserCheck,
  Star,
  ArrowRight,
  Headphones,
  Monitor,
  Camera,
  Mouse,
  Smartphone,
  Cpu
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

const queueData = [
  {
    id: 1,
    original: { name: "Sony WH-1000XM5", category: "Electronics", icon: Headphones },
    alternative: { name: "Bose QuietComfort Ultra", category: "Electronics", icon: Headphones },
    type: "Better for slightly more",
    priceDiff: "+$80.00",
    pricePct: "+18%",
    origScore: 82,
    altScore: 91,
    confidence: "92%",
    affiliate: "Active",
    status: "Pending"
  },
  {
    id: 2,
    original: { name: "Ninja Air Fryer AF101", category: "Kitchen", icon: Cpu },
    alternative: { name: "Cosori Pro LE 5.8QT", category: "Kitchen", icon: Cpu },
    type: "Best similar price",
    priceDiff: "-$20.00",
    pricePct: "-11%",
    origScore: 76,
    altScore: 85,
    confidence: "88%",
    affiliate: "Active",
    status: "Needs Review"
  },
  {
    id: 3,
    original: { name: "Apple AirPods Pro (2nd Gen)", category: "Electronics", icon: Headphones },
    alternative: { name: "Beats Studio Buds+", category: "Electronics", icon: Headphones },
    type: "Cheaper but good enough",
    priceDiff: "-$70.00",
    pricePct: "-28%",
    origScore: 83,
    altScore: 79,
    confidence: "81%",
    affiliate: "Active",
    status: "Pending"
  },
  {
    id: 4,
    original: { name: "LG 27GL850-B Monitor", category: "Computers", icon: Monitor },
    alternative: { name: "Dell G2724D Monitor", category: "Computers", icon: Monitor },
    type: "Best similar price",
    priceDiff: "-$40.00",
    pricePct: "-9%",
    origScore: 78,
    altScore: 84,
    confidence: "87%",
    affiliate: "Missing",
    status: "Needs Review"
  },
  {
    id: 5,
    original: { name: "iRobot Roomba j7+", category: "Home", icon: Cpu },
    alternative: { name: "Roborock Q5+", category: "Home", icon: Cpu },
    type: "Cheaper but good enough",
    priceDiff: "-$150.00",
    pricePct: "-22%",
    origScore: 75,
    altScore: 82,
    confidence: "86%",
    affiliate: "Active",
    status: "Approved"
  },
  {
    id: 6,
    original: { name: "Canon EOS R10", category: "Cameras", icon: Camera },
    alternative: { name: "Sony ZV-E10 II", category: "Cameras", icon: Camera },
    type: "Premium upgrade",
    priceDiff: "+$200.00",
    pricePct: "+24%",
    origScore: 84,
    altScore: 92,
    confidence: "93%",
    affiliate: "Non-affiliate only",
    status: "Approved"
  },
  {
    id: 7,
    original: { name: "Logitech G502 Hero", category: "Computers", icon: Mouse },
    alternative: { name: "Redragon M808 Storm", category: "Computers", icon: Mouse },
    type: "Budget pick",
    priceDiff: "-$35.00",
    pricePct: "-49%",
    origScore: 71,
    altScore: 74,
    confidence: "76%",
    affiliate: "Active",
    status: "Rejected"
  }
];

const breakdownData = [
  { name: "Best similar price", value: 1104, percentage: "38.9%", color: "#3B82F6" },
  { name: "Better for slightly more", value: 742, percentage: "26.1%", color: "#38BDF8" },
  { name: "Cheaper but good enough", value: 648, percentage: "22.8%", color: "#22C55E" },
  { name: "Premium upgrade", value: 210, percentage: "7.4%", color: "#8B5CF6" },
  { name: "Budget pick", value: 137, percentage: "4.8%", color: "#F97316" }
];

export default function AlternativeRecommendations() {
  const [isChartMounted, setIsChartMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth entry animation for chart
    const timer = setTimeout(() => setIsChartMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "Better for slightly more": return "bg-blue-50 text-blue-700";
      case "Best similar price": return "bg-indigo-50 text-indigo-700";
      case "Cheaper but good enough": return "bg-emerald-50 text-emerald-700";
      case "Premium upgrade": return "bg-purple-50 text-purple-700";
      case "Budget pick": return "bg-orange-50 text-orange-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-50 text-amber-700";
      case "Needs Review": return "bg-blue-50 text-blue-700";
      case "Approved": return "bg-emerald-50 text-emerald-700";
      case "Rejected": return "bg-rose-50 text-rose-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getAffiliateStyle = (status: string) => {
    switch (status) {
      case "Active": return "text-emerald-600";
      case "Missing": return "text-rose-600";
      case "Non-affiliate only": return "text-slate-500";
      default: return "text-slate-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 80) return "text-amber-500";
    return "text-slate-700";
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col overflow-x-hidden">
      {/* Main Container */}
      <div className="flex-1 w-full py-4 px-2 sm:py-6 sm:px-4 flex flex-col gap-4 sm:gap-6 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Alternative Recommendations</h1>
            <p className="text-sm text-slate-500 mt-1">
              Review AI-suggested better alternatives, compare trade-offs, and approve recommendations before publishing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              <PlayCircle className="w-4 h-4" /> Run Recheck
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export Review <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
            </button>
          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block truncate">Total Recommendations</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">2,841</span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center mt-1">
                +12.4% vs last 7 days
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block truncate">Pending Review</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">512</span>
              <span className="text-[10px] font-semibold text-slate-500 flex items-center mt-1">
                18.0% of total
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block truncate">High Confidence</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">1,482</span>
              <span className="text-[10px] font-semibold text-slate-500 flex items-center mt-1">
                52.2% of total
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Link2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block truncate">Affiliate Ready</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">1,926</span>
              <span className="text-[10px] font-semibold text-slate-500 flex items-center mt-1">
                67.8% of total
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block truncate">Rejected Today</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">76</span>
              <span className="text-[10px] font-semibold text-slate-500 flex items-center mt-1">
                2.7% of reviewed
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-500 block truncate">Avg. Approval Time</span>
              <span className="text-2xl font-black text-slate-950 block mt-0.5">2h 34m</span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center mt-1">
                ↓ 12m vs last 7 days
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Queue & Comparison */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_600px] gap-4 sm:gap-6 min-w-0">
          
          {/* Recommendation Queue */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-w-0">
            <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-slate-950">Recommendation Queue</h2>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-semibold">512</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <select className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-md px-3 py-1.5 outline-none">
                    <option>All Statuses</option>
                  </select>
                  <select className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-md px-3 py-1.5 outline-none">
                    <option>All Types</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50">
                  <Layers className="w-3.5 h-3.5" /> Filters <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-3 text-xs font-bold text-slate-950">Original Product</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950">Recommended Alternative</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950">Alternative Type</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950 text-right">Price Difference</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950 text-center">Original Score</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950 text-center">Alternative Score</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950 text-center">Confidence</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950 text-center">Affiliate Status</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-950 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {queueData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 group cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                            <item.original.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{item.original.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{item.original.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                            <item.alternative.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{item.alternative.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{item.alternative.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[11px] font-bold ${getTypeStyle(item.type)}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-bold text-slate-900 block">{item.priceDiff}</span>
                        <span className={`text-xs font-semibold ${item.pricePct.startsWith('+') ? 'text-slate-500' : 'text-emerald-600'}`}>({item.pricePct})</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-sm font-bold ${getScoreColor(item.origScore)}`}>{item.origScore}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-sm font-bold ${getScoreColor(item.altScore)}`}>{item.altScore}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${parseInt(item.confidence) >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          {item.confidence}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-semibold ${getAffiliateStyle(item.affiliate)}`}>{item.affiliate}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">1-7 of 512 recommendations</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">3</button>
                  <span className="text-slate-400 px-1">...</span>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-xs font-bold">73</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-md px-2 py-1 outline-none">
                    <option>10 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Preview */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-950 mb-6">Comparison Preview</h2>
            <div className="flex items-stretch justify-center relative min-h-[300px]">
              
              {/* Original Card */}
              <div className="flex-1 border border-slate-200 rounded-xl p-4 flex flex-col">
                <p className="text-xs font-bold text-slate-500 mb-4">Original Product</p>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Headphones className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 leading-tight mb-1">Sony WH-1000XM5</h3>
                    <p className="text-sm font-black text-slate-900">$399.99</p>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-600">AI Buy Score</span>
                    <span className="font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">82/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-4">
                    <span className="font-semibold text-slate-600">Review Trust</span>
                    <span className="font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">87%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '87%' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-4">
                    <span className="font-semibold text-slate-600">Value Score</span>
                    <span className="font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">7.6/10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-950 mb-3">Why it may be better</h4>
                  <ul className="space-y-2 text-xs font-medium text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">-</span> Strong noise cancellation and audio quality
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">-</span> Wide feature set and brand reliability
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">-</span> Great choice if price isn't a constraint
                    </li>
                  </ul>
                </div>
              </div>

              {/* Center Arrow */}
              <div className="absolute left-1/2 top-[120px] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md border-4 border-white">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>

              <div className="w-4"></div> {/* Spacing */}

              {/* Alternative Card */}
              <div className="flex-1 border border-slate-200 rounded-xl p-4 flex flex-col relative overflow-hidden bg-emerald-50/10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold text-slate-500">Recommended Alternative</p>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">High Confidence (92%)</span>
                </div>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Headphones className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 leading-tight mb-1">Bose QuietComfort Ultra</h3>
                    <p className="text-sm font-black text-slate-900">$479.99</p>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-600">AI Buy Score</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">91/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '91%' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-4">
                    <span className="font-semibold text-slate-600">Review Trust</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">91%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '91%' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-4">
                    <span className="font-semibold text-slate-600">Value Score</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">8.7/10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-950 mb-3">Why it may be better</h4>
                  <ul className="space-y-2 text-xs font-medium text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">-</span> Better noise cancellation in real tests
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">-</span> More comfortable for long sessions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">-</span> Superior call quality and spatial audio
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: 3 Cols */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
          
          {/* Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-950 mb-4">Alternative Type Breakdown</h2>
            <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
              <div className="absolute inset-0 flex items-center justify-start w-1/2">
                {isChartMounted && (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={breakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        stroke="none"
                        dataKey="value"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {breakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }}
                        itemStyle={{ color: '#0F172A' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {/* Center text */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className="block text-xl font-black text-slate-900 leading-none">2,841</span>
                  <span className="block text-[10px] font-bold text-slate-500 mt-1">Total</span>
                </div>
              </div>
              
              {/* Custom Legend */}
              <div className="w-1/2 ml-auto pl-4 flex flex-col gap-3 justify-center">
                {breakdownData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px] group-hover:text-slate-950 transition-colors">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-xs font-bold text-slate-900">{item.value.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-medium w-9">{item.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                View full breakdown <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Decision Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-950 mb-6">Decision Notes & Review Tips</h2>
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Check score gap</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">Prefer alternatives with +5 or more AI Buy Score advantage.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Verify price difference</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">Ensure the price difference aligns with the value improvement.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Verify review trust</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">Confirm the alternative has an equal or higher review trust.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Confirm affiliate link status</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">Ensure the alternative has an active affiliate link if required.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Validate user-fit trade-offs</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">Make sure the alternative truly better fits the target user needs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Decisions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-950 mb-6">Recent Decisions</h2>
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">Approved: Bose QuietComfort Ultra</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">for Sony WH-1000XM5</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-semibold text-slate-500">May 17, 2025</p>
                  <p className="text-[10px] font-medium text-slate-400">10:42 AM</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">Approved: Dell G2724D Monitor</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">for LG 27GL850-B Monitor</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-semibold text-slate-500">May 17, 2025</p>
                  <p className="text-[10px] font-medium text-slate-400">9:56 AM</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">Needs Review: Beats Studio Buds+</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">for Apple AirPods Pro (2nd Gen)</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-semibold text-slate-500">May 17, 2025</p>
                  <p className="text-[10px] font-medium text-slate-400">9:21 AM</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">Rejected: Redragon M808 Storm</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">for Logitech G502 Hero</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-semibold text-slate-500">May 17, 2025</p>
                  <p className="text-[10px] font-medium text-slate-400">8:47 AM</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">Approved: Cosori Pro LE 5.8QT</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">for Ninja Air Fryer AF101</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-semibold text-slate-500">May 17, 2025</p>
                  <p className="text-[10px] font-medium text-slate-400">8:12 AM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                View all recent decisions <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
