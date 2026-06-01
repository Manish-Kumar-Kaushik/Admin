"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HelpCircle,
  Bell,
  ChevronDown,
  ArrowLeft,
  Download,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  FileText,
  CheckSquare,
} from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────

const SCORE_METRICS = [
  { label: "Verified Purchase Ratio", value: "78%" },
  { label: "Review Age Distribution", value: "Good" },
  { label: "Review Length Quality", value: "Good" },
  { label: "5★ / 1★ Imbalance", value: "Normal" },
  { label: "Sentiment Consistency", value: "Good" },
  { label: "Complaint Consistency", value: "Good" },
  { label: "Incentivized Indicators", value: "Low Risk" },
];

const POSITIVE_THEMES = [
  { theme: "Sound Quality", mentions: "42,381", pct: "33.0%", sentiment: "Very Positive" },
  { theme: "Noise Cancellation", mentions: "38,742", pct: "30.1%", sentiment: "Very Positive" },
  { theme: "Comfort", mentions: "22,165", pct: "17.3%", sentiment: "Positive" },
  { theme: "Battery Life", mentions: "15,231", pct: "11.8%", sentiment: "Positive" },
  { theme: "Build Quality", mentions: "9,314", pct: "7.2%", sentiment: "Positive" },
];

const COMPLAINT_THEMES = [
  { theme: "Price", mentions: "8,214", pct: "6.4%", severity: "Medium" },
  { theme: "Battery Life Decrease", mentions: "5,432", pct: "4.2%", severity: "Medium" },
  { theme: "Bluetooth Connectivity", mentions: "3,124", pct: "2.4%", severity: "Medium" },
  { theme: "App Issues", mentions: "2,187", pct: "1.7%", severity: "Low" },
  { theme: "Ear Pad Wear", mentions: "1,023", pct: "0.8%", severity: "Low" },
];

const SAMPLES = [
  {
    id: 1,
    verified: true,
    rating: 5,
    date: "May 10, 2024",
    title: "Excellent sound and noise cancellation!",
    body: "The sound quality is amazing and the noise cancellation is the best I've ever used. Worth every penny.",
    words: 28,
  },
  {
    id: 2,
    verified: true,
    rating: 5,
    date: "May 8, 2024",
    title: "Super comfortable for long use",
    body: "I wear these for hours while working and they are incredibly comfortable. No ear fatigue at all.",
    words: 21,
  },
  {
    id: 3,
    verified: true,
    rating: 5,
    date: "May 5, 2024",
    title: "Battery lasts forever",
    body: "I get easily 30+ hours on a single charge. Charging is also really fast.",
    words: 16,
  },
];

export default function ClusterDetails() {
  const [activeTab, setActiveTab] = useState("Positive (3)");

  // Trust Score Recharts Data
  const score = 86;
  const pieData = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];
  const COLORS = ["#10b981", "#f1f5f9"]; // Emerald-500, Slate-100

  const router = useRouter();

  return (
    <div className="w-full h-full bg-slate-50 font-sans p-3 sm:p-4 text-slate-900">
      <div className="w-full mx-auto flex flex-col xl:flex-row gap-3">
        
        {/* ======================= LEFT MAIN COLUMN ======================= */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          
          {/* ── HEADER ── */}
          <div className="flex flex-col gap-1 mb-2">
            <div className="hidden sm:flex items-center gap-2 text-[13px] text-slate-500">
              <span>Review Intelligence</span>
              <span>&gt;</span>
              <span>Review Clusters</span>
              <span>&gt;</span>
              <span className="font-semibold text-slate-900">Cluster Details</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-950">Review Cluster Details</h1>
                  <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md bg-purple-100 text-purple-700 text-[10px] md:text-[12px] lg:text-[14px] font-bold border border-purple-200">
                    Cluster ID: CLU-78421
                  </span>
                </div>
                <p className="text-[14px] text-slate-500 mt-1">Detailed analysis of review cluster patterns, themes, and trust signals.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => router.back()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-slate-200 rounded-lg text-[13px] font-semibold text-slate-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Clusters
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
                  <Download className="w-4 h-4" /> Export Report
                </button>
              </div>
            </div>
          </div>

          {/* ── TOP INFO CARD (Combined) ── */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-slate-200">
              {/* Product Info Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 lg:gap-10 lg:pr-8 pb-8 lg:pb-0">
                <img 
                  src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&q=80" 
                  alt="Product" 
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain rounded-lg border border-slate-200 shrink-0 p-1" 
                />
                <div className="flex flex-col justify-center">
                  <h2 className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-slate-950 leading-tight">
                    Sony WH-1000XM5 Wireless<br className="hidden sm:block"/>Noise Cancelling Headphones
                  </h2>
                  <div className="mt-3 space-y-1.5 w-full flex flex-col items-center sm:items-start">
                    <p className="text-[11px] sm:text-[12px] text-slate-600"><span className="text-slate-500">ASIN:</span> B09XS7JWHH</p>
                    <p className="text-[11px] sm:text-[12px] text-slate-600"><span className="text-slate-500">Category:</span> Electronics &gt; Headphones</p>
                    <div className="flex items-center gap-1 text-[11px] sm:text-[12px] text-slate-600">
                      <span className="text-slate-500">Source:</span> 
                      <div className="w-4 h-4 bg-slate-900 rounded-sm flex items-center justify-center text-white font-bold text-[9px] ml-1">a</div>
                    </div>
                    <p className="text-[11px] sm:text-[12px] text-slate-600 mt-2"><span className="text-slate-500">Total Reviews Analyzed:</span> 128,450</p>
                    <p className="text-[11px] sm:text-[12px] text-slate-600"><span className="text-slate-500">Last Analyzed:</span> May 18, 2024 10:32 AM</p>
                  </div>
                </div>
              </div>

              {/* Trust Score Section */}
              <div className="pt-6 lg:pt-0 lg:pl-8">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                  <h3 className="text-[13px] sm:text-[14px] font-bold text-slate-900">Review Trust Score</h3>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-2">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-32 h-32 relative">
                      <PieChart width={128} height={128}>
                        <Pie
                          data={pieData}
                          cx={64}
                          cy={64}
                          innerRadius={50}
                          outerRadius={60}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                          stroke="none"
                          cornerRadius={10}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                      </PieChart>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-bold text-slate-900 leading-none">86</span>
                        <span className="text-[11px] text-slate-400 font-medium">/100</span>
                      </div>
                    </div>
                    <span className="text-emerald-600 font-bold text-[14px] mt-1">High Trust</span>
                  </div>
                  <div className="flex-1 w-full max-w-[280px] grid grid-cols-1 gap-y-2.5 text-[11px] sm:text-[12px]">
                    {SCORE_METRICS.map((m, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-slate-600">{m.label}</span>
                        </div>
                        <span className="font-semibold text-slate-900">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── MIDDLE SECTION (3 COLS) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1.25fr_1fr] gap-3">
            
            {/* Positive Theme Clusters */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-slate-900">Positive Theme Clusters</h3>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] sm:text-[10px] font-bold border border-emerald-100">Top Themes</span>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-[11px] sm:text-[12px] lg:text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 whitespace-nowrap">
                      <th className="pb-2 font-medium">Theme</th>
                      <th className="pb-2 font-medium">Mentions</th>
                      <th className="pb-2 font-medium">% of Reviews</th>
                      <th className="pb-2 font-medium text-right">Sentiment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {POSITIVE_THEMES.map((item, i) => (
                      <tr key={i} className="whitespace-nowrap">
                        <td className="py-3 font-semibold text-slate-800">{item.theme}</td>
                        <td className="py-3 text-slate-600">{item.mentions}</td>
                        <td className="py-3 text-slate-600">{item.pct}</td>
                        <td className="py-3 text-right">
                          <span className="inline-flex px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            {item.sentiment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 w-full">
                View all positive themes (12) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Complaint Clusters */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-slate-900">Complaint Clusters</h3>
                <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[9px] sm:text-[10px] font-bold border border-rose-100">Top Issues</span>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 whitespace-nowrap">
                      <th className="pb-2 font-medium">Theme</th>
                      <th className="pb-2 font-medium">Mentions</th>
                      <th className="pb-2 font-medium">% of Reviews</th>
                      <th className="pb-2 font-medium text-right">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {COMPLAINT_THEMES.map((item, i) => (
                      <tr key={i} className="whitespace-nowrap">
                        <td className="py-3 font-semibold text-slate-800">{item.theme}</td>
                        <td className="py-3 text-slate-600">{item.mentions}</td>
                        <td className="py-3 text-slate-600">{item.pct}</td>
                        <td className="py-3 text-right">
                          <span className={`inline-flex px-1.5 py-0.5 rounded-sm text-[10px] font-bold ${
                            item.severity === "Medium" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700 opacity-70"
                          }`}>
                            {item.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 text-[11px] sm:text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 w-full">
                View all complaint themes (8) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Suspicious Patterns */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-[12px] sm:text-[14px] lg:text-[15px] font-bold text-slate-900">Suspicious Patterns</h3>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[9px] sm:text-[10px] font-bold border border-amber-100">Detected</span>
              </div>
              
              <div className="flex-1">
                <p className="text-[11px] sm:text-[12px] font-medium text-slate-500 mb-1">Pattern Detected</p>
                <div className="inline-flex px-2 py-1 rounded bg-orange-50 text-orange-800 text-[11px] sm:text-[12px] font-bold border border-orange-200 mb-4">
                  Sudden Rating Spike
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] sm:text-[12px] font-medium text-slate-500">Risk Level</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[11px] sm:text-[12px] font-bold text-amber-600">Medium</span>
                </div>

                <p className="text-[11px] sm:text-[12px] font-medium text-slate-500 mb-1">Description</p>
                <p className="text-[11px] sm:text-[12px] text-slate-700 mb-4 leading-relaxed">
                  Detected a sharp increase in 5-star reviews within a short time window. <br/><br/>
                  <span className="font-semibold text-slate-900">5,231 reviews (4.1%)</span> were posted within 48 hours on Apr 20-21, 2024.
                </p>

                <p className="text-[11px] sm:text-[12px] font-medium text-slate-500 mb-1">Why it matters</p>
                <p className="text-[11px] sm:text-[12px] text-slate-700 leading-relaxed">
                  Sudden spikes may indicate incentivized reviews, promotions, or manipulation.
                </p>
              </div>

              <button className="mt-4 text-[11px] sm:text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 w-full">
                View pattern analysis <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
          </div>

          {/* ── CLUSTER INSIGHTS ── */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-[12px] sm:text-[14px] font-bold text-slate-900 mb-4">Cluster Insights</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {[
                { l: "Verified Purchase Ratio", v: "78%", s: "Good", c: "text-emerald-600" },
                { l: "Review Age (Median)", v: "142 days", s: "Good", c: "text-emerald-600" },
                { l: "Review Length (Median)", v: "68 words", s: "Good", c: "text-emerald-600" },
                { l: "5★ / 1★ Ratio", v: "6.2 : 1", s: "Normal", c: "text-blue-600" },
                { l: "Sentiment Consistency", v: "91%", s: "Good", c: "text-emerald-600" },
                { l: "Incentivized Signals", v: "Low Risk", s: "Low", c: "text-emerald-600" },
                { l: "Return/Durability Complaints", v: "4.2%", s: "Moderate", c: "text-amber-500" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col border-l-2 border-slate-100 pl-3">
                  <span className="text-[10px] font-medium text-slate-500 mb-1 leading-tight">{item.l}</span>
                  <span className="text-[14px] sm:text-[16px] font-bold text-slate-950 leading-none">{item.v}</span>
                  <span className={`text-[10px] sm:text-[11px] font-bold mt-1 ${item.c}`}>{item.s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── ADMIN DECISION PANEL ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            
            {/* Left Side: Admin Decision Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] sm:text-[16px] font-bold text-slate-900">Admin Decision Panel</h3>
                <button className="flex items-center gap-1 text-[12px] sm:text-[13px] font-semibold text-indigo-600 hover:text-indigo-800">
                  <Plus className="w-3.5 h-3.5" /> Add Note
                </button>
              </div>
              
              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 sm:p-6 flex flex-row items-stretch justify-between h-full gap-4">
                
                {/* Column 1: Trust Score */}
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[11px] sm:text-[13px] font-semibold text-slate-700 mb-4 text-center">Current Review Trust Score</span>
                  <div className="flex flex-col items-center justify-center flex-1">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 mb-3">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" className="stroke-slate-100" strokeWidth="4" />
                        <circle cx="18" cy="18" r="15" fill="none" className="stroke-emerald-500" strokeWidth="4" strokeDasharray="94.2" strokeDashoffset={94.2 - (94.2 * 86) / 100} strokeLinecap="round" />
                      </svg>
                      <div className="relative flex flex-col items-center justify-center mt-0.5">
                        <span className="text-[18px] sm:text-[24px] font-bold text-slate-900 leading-none">86</span>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">/100</span>
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-[14px] font-bold text-emerald-600">High Trust</span>
                  </div>
                </div>

                {/* Divider 1 */}
                <div className="w-px bg-slate-100 shrink-0" />

                {/* Column 2: AI Recommendation */}
                <div className="flex-1 flex flex-col items-start pl-2">
                  <span className="text-[11px] sm:text-[13px] font-semibold text-slate-700 mb-4 text-left">AI Recommendation</span>
                  <div className="flex flex-col items-start justify-center flex-1 gap-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                      <p className="text-[11px] sm:text-[14px] font-semibold text-emerald-700">Score is appropriate</p>
                    </div>
                    <p className="text-[10px] sm:text-[12px] font-medium text-slate-500 ml-6 sm:ml-7">No action required</p>
                  </div>
                </div>

                {/* Divider 2 */}
                <div className="w-px bg-slate-100 shrink-0" />

                {/* Column 3: Confidence in Score */}
                <div className="flex-1 flex flex-col items-start pl-2">
                  <span className="text-[11px] sm:text-[13px] font-semibold text-slate-700 mb-4 text-left">Confidence in Score</span>
                  <div className="flex flex-col items-start justify-center flex-1 gap-2 sm:gap-3">
                    <p className="text-[11px] sm:text-[14px] font-semibold text-emerald-700">High</p>
                    <div className="flex items-end gap-1 sm:gap-1.5 h-6">
                      <div className="w-3 sm:w-4 rounded-sm bg-emerald-600" style={{ height: '20%' }} />
                      <div className="w-3 sm:w-4 rounded-sm bg-emerald-600" style={{ height: '35%' }} />
                      <div className="w-3 sm:w-4 rounded-sm bg-emerald-600" style={{ height: '50%' }} />
                      <div className="w-3 sm:w-4 rounded-sm bg-emerald-600" style={{ height: '70%' }} />
                      <div className="w-3 sm:w-4 rounded-sm bg-emerald-200" style={{ height: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Admin Actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col h-full">
              <h3 className="text-[14px] sm:text-[16px] font-bold text-slate-900 mb-4">Admin Actions</h3>
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <button className="w-full text-left p-3 rounded-xl bg-white border border-emerald-200 hover:bg-emerald-50 transition-colors group shadow-sm">
                  <div className="flex items-center gap-2 mb-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[12px] sm:text-[13px] font-bold text-emerald-700">Confirm Review Trust Score</span>
                  </div>
                  <p className="text-[11px] text-emerald-600/80 ml-6">Confirm that the current score is accurate</p>
                </button>

                <button className="w-full text-left p-3 rounded-xl bg-white border border-amber-200 hover:bg-amber-50 transition-colors group shadow-sm">
                  <div className="flex items-center gap-2 mb-0.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[12px] sm:text-[13px] font-bold text-amber-700">Mark Source Unreliable</span>
                  </div>
                  <p className="text-[11px] text-amber-600/80 ml-6">Flag this source as unreliable</p>
                </button>
                
                <button className="w-full text-left p-3 rounded-xl bg-white border border-purple-200 hover:bg-purple-50 transition-colors group shadow-sm">
                  <div className="flex items-center gap-2 mb-0.5">
                    <CheckSquare className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[12px] sm:text-[13px] font-bold text-purple-700">Send Product to AI Review</span>
                  </div>
                  <p className="text-[11px] text-purple-600/80 ml-6">Queue this product for full AI review</p>
                </button>
                
                <button className="w-full text-left p-3 rounded-xl bg-white border border-blue-200 hover:bg-blue-50 transition-colors group shadow-sm">
                  <div className="flex items-center gap-2 mb-0.5">
                    <MessageSquare className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[12px] sm:text-[13px] font-bold text-blue-700">Add Admin Note</span>
                  </div>
                  <p className="text-[11px] text-blue-600/80 ml-6">Add internal note about this cluster</p>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ======================= RIGHT SIDEBAR ======================= */}
        <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-3">
          
          {/* Review Samples Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col h-full min-h-[700px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-slate-900">Review Samples</h3>
              <button className="text-slate-400 hover:text-slate-600"><Plus className="w-4 h-4 rotate-45" /></button>
            </div>
            
            <div className="px-6 flex items-center gap-6 border-b border-slate-100">
              {["Positive (3)", "Negative (3)", "All (6)"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-[13px] font-semibold border-b-2 transition-colors ${
                    activeTab === tab ? "border-emerald-500 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 flex-1 flex flex-col gap-4 overflow-y-auto">
              {SAMPLES.map(sample => (
                <div key={sample.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold">Verified Purchase</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(star => (
                        <StarIcon key={star} className={`w-3 h-3 ${star <= sample.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mb-2">
                    <span className="text-[11px] text-slate-400">{sample.date}</span>
                  </div>
                  <h4 className="text-[13px] font-bold text-slate-900 mb-1">{sample.title}</h4>
                  <p className="text-[12px] text-slate-600 leading-relaxed mb-3">
                    {sample.body}
                  </p>
                  <p className="text-[11px] text-slate-400">Length: {sample.words} words</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <button className="w-full py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[13px] font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors">
                View all 128,450 reviews <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cluster Summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">Cluster Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-start text-[13px]">
                <span className="text-slate-500">Total Reviews</span>
                <span className="font-medium text-slate-900">128,450</span>
              </div>
              <div className="flex justify-between items-start text-[13px]">
                <span className="text-slate-500">Cluster Coverage</span>
                <span className="font-medium text-slate-900">94.2%</span>
              </div>
              <div className="flex justify-between items-start text-[13px]">
                <span className="text-slate-500">Time Range</span>
                <span className="font-medium text-slate-900">Mar 15, 2023 – May 17, 2024</span>
              </div>
              <div className="flex justify-between items-start text-[13px]">
                <span className="text-slate-500">Primary Source</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-900">
                  <div className="w-4 h-4 bg-slate-900 rounded-sm flex items-center justify-center text-white font-bold text-[9px]">a</div>
                  Amazon
                </div>
              </div>
              <div className="flex justify-between items-start text-[13px]">
                <span className="text-slate-500">Other Sources</span>
                <span className="font-medium text-slate-900">3</span>
              </div>
            </div>
            <button className="mt-5 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View cluster timeline <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

// Simple internal icon for stars
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
