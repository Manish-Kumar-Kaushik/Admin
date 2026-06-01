"use client";

import React, { useState } from "react";
import {
  Download,
  RotateCw,
  Search,
  Plus,
  Eye,
  LineChart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  ClipboardCheck,
  Award,
  AlertTriangle,
  AlertCircle,
  ListChecks,
  ArrowUp,
  CheckCircle2,
  Calendar,
  FileText,
  TrendingUp,
  AlignLeft,
  Star,
  MessageSquare,
  Tag,
  AlertOctagon,
  RefreshCcw,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────

const KPI_DATA = [
  {
    title: "Products Analyzed",
    value: "24,681",
    subtext: "+8.7% vs yesterday",
    subtextPositive: true,
    icon: <ClipboardCheck className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-50",
  },
  {
    title: "Avg. Review Trust Score",
    value: "78/100",
    subtext: "+3.2 vs yesterday",
    subtextPositive: true,
    icon: <Award className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50",
  },
  {
    title: "High Trust (80+)",
    value: "11,243",
    subtext: "45.6% of total",
    subtextPositive: null,
    icon: <ClipboardCheck className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50",
  },
  {
    title: "Low Trust (<50)",
    value: "2,104",
    subtext: "8.5% of total",
    subtextPositive: null,
    icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
    iconBg: "bg-rose-50",
  },
  {
    title: "Suspicious Detected",
    value: "1,872",
    subtext: "7.6% of total",
    subtextPositive: null,
    icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
    iconBg: "bg-rose-50",
  },
  {
    title: "Total Reviews Analyzed",
    value: "5.82M",
    subtext: "+12.4% vs yesterday",
    subtextPositive: true,
    icon: <ListChecks className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-50",
  },
];

const PRODUCTS_DATA = [
  {
    id: "p1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    asin: "B09XS7JWHH",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
    trustScore: 86,
    trustLabel: "High Trust",
    trustColor: "text-emerald-600",
    trustBorder: "border-emerald-500",
    positiveThemes: ["Sound Quality", "Noise Cancellation", "Comfort"],
    morePositive: 2,
    complaintThemes: ["Price", "Battery Life", "App Issues"],
    moreComplaint: 1,
    suspiciousPattern: "Sudden Rating Spike",
    reviewCount: "128,450",
    source: "Amazon",
    sourceColor: "bg-slate-900 text-white",
    lastAnalyzed: "May 18, 2024\n10:32 AM",
  },
  {
    id: "p2",
    name: "Orgain Organic Protein Powder",
    asin: "B07NZ2JXRD",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&q=80",
    trustScore: 72,
    trustLabel: "Good",
    trustColor: "text-emerald-500",
    trustBorder: "border-emerald-400",
    positiveThemes: ["Taste", "Mixability", "Ingredients"],
    morePositive: 2,
    complaintThemes: ["Price", "Packaging", "Bad Aftertaste"],
    moreComplaint: 1,
    suspiciousPattern: "Repeated Wording",
    reviewCount: "8,742",
    source: "Amazon",
    sourceColor: "bg-slate-900 text-white",
    lastAnalyzed: "May 18, 2024\n09:15 AM",
  },
  {
    id: "p3",
    name: "Ninja Air Fryer AF101",
    asin: "B07VY78Z19",
    image: "https://images.unsplash.com/photo-1626200419189-39c8c60f5e13?w=100&q=80",
    trustScore: 48,
    trustLabel: "Low Trust",
    trustColor: "text-orange-500",
    trustBorder: "border-orange-400",
    positiveThemes: ["Easy to Use", "Cooks Well", "Size"],
    morePositive: 1,
    complaintThemes: ["Durability", "Stops Working", "Hard to Clean"],
    moreComplaint: 2,
    suspiciousPattern: "Short Review Burst",
    reviewCount: "3,124",
    source: "Walmart",
    sourceColor: "bg-blue-600 text-white",
    lastAnalyzed: "May 18, 2024\n08:47 AM",
  },
  {
    id: "p4",
    name: "Apple MacBook Air M2 13-inch",
    asin: "B0B3C3ZCJN",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80",
    trustScore: 83,
    trustLabel: "High Trust",
    trustColor: "text-emerald-600",
    trustBorder: "border-emerald-500",
    positiveThemes: ["Performance", "Battery Life", "Design"],
    morePositive: 2,
    complaintThemes: ["Price", "Port Selection", "Overheating"],
    moreComplaint: 1,
    suspiciousPattern: "Sentiment Mismatch",
    reviewCount: "6,582",
    source: "Best Buy",
    sourceColor: "bg-yellow-400 text-black",
    lastAnalyzed: "May 18, 2024\n10:10 AM",
  },
  {
    id: "p5",
    name: "CeraVe Hydrating Cleanser",
    asin: "B01N1LLOPR",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&q=80",
    trustScore: 69,
    trustLabel: "Good",
    trustColor: "text-amber-500",
    trustBorder: "border-amber-400",
    positiveThemes: ["Gentle", "Moisturizing", "Non-Irritating"],
    morePositive: 2,
    complaintThemes: ["Pump Issues", "Not Effective", "Causes Breakouts"],
    moreComplaint: 1,
    suspiciousPattern: "Incentivized Review Signal",
    reviewCount: "5,430",
    source: "Target",
    sourceColor: "bg-red-600 text-white",
    lastAnalyzed: "May 18, 2024\n09:05 AM",
  },
  {
    id: "p6",
    name: "Keurig K-Elite Coffee Maker",
    asin: "B07JJY2CMM",
    image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=100&q=80",
    trustScore: 55,
    trustLabel: "Medium",
    trustColor: "text-amber-500",
    trustBorder: "border-amber-400",
    positiveThemes: ["Easy to Use", "Brew Quality", "Fast"],
    morePositive: 1,
    complaintThemes: ["Leaks", "Durability", "Loud Noise"],
    moreComplaint: 1,
    suspiciousPattern: "Unusual 5-star/1-star Imbalance",
    reviewCount: "4,102",
    source: "Amazon",
    sourceColor: "bg-slate-900 text-white",
    lastAnalyzed: "May 18, 2024\n07:52 AM",
  },
  {
    id: "p7",
    name: "Nature Made Vitamin D3 2000 IU",
    asin: "B0096J9GSY",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&q=80",
    trustScore: 41,
    trustLabel: "Low Trust",
    trustColor: "text-red-500",
    trustBorder: "border-red-400",
    positiveThemes: ["Affordable", "Good Value", "Small Size"],
    morePositive: 0,
    complaintThemes: ["No Effect", "Quality Control", "Missing Pills"],
    moreComplaint: 1,
    suspiciousPattern: "Repeated Wording",
    reviewCount: "2,987",
    source: "iHerb",
    sourceColor: "bg-green-600 text-white",
    lastAnalyzed: "May 18, 2024\n07:20 AM",
  },
];

const FACTORS_DATA = [
  { title: "Verified Purchase Ratio", desc: "38% of reviews verified", icon: <CheckCircle2 className="w-4 h-4 text-blue-500" /> },
  { title: "Review Age Distribution", desc: "Good spread", icon: <Calendar className="w-4 h-4 text-emerald-500" /> },
  { title: "Repeated Wording", desc: "Low risk", icon: <FileText className="w-4 h-4 text-emerald-500" /> },
  { title: "Rating Spikes", desc: "No recent spikes", icon: <TrendingUp className="w-4 h-4 text-blue-500" /> },
  { title: "Review Length", desc: "Balanced", icon: <AlignLeft className="w-4 h-4 text-blue-500" /> },
  { title: "5★/1★ Imbalance", desc: "Normal", icon: <Star className="w-4 h-4 text-purple-500" /> },
  { title: "Sentiment Mismatch", desc: "Low", icon: <MessageSquare className="w-4 h-4 text-rose-500" /> },
  { title: "Incentivized Indicators", desc: "Low risk", icon: <Tag className="w-4 h-4 text-emerald-500" /> },
  { title: "Complaint Consistency", desc: "Moderate", icon: <AlertOctagon className="w-4 h-4 text-amber-500" /> },
  { title: "Return/Durability Complaints", desc: "Low", icon: <RefreshCcw className="w-4 h-4 text-emerald-500" /> },
];

export default function ReviewClusters() {
  const [activeTab, setActiveTab] = useState("Review Clusters");

  const tabs = ["Review Clusters", "Suspicious Patterns", "Complaint Trends", "Source Quality"];

  return (
    <div className="w-full h-full bg-slate-50 font-sans p-3 sm:p-4 text-slate-900">
      <div className="w-full mx-auto space-y-4">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-1">
              <span>Review Intelligence</span>
              <span>&gt;</span>
              <span className="font-semibold text-slate-900">Review Clusters</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-950">Review Intelligence</h1>
            <p className="text-[12px] md:text-[14px] text-slate-500 mt-1">Analyze review quality, themes, and trust signals across products and sources.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] md:text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 border border-indigo-600 rounded-lg text-[12px] md:text-[13px] font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm">
              <RotateCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 gap-4 pb-0">
          <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[13px] md:text-[14px] font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="pb-3 text-[11px] md:text-[12px] text-slate-500 whitespace-nowrap mt-2 sm:mt-0">
            Last updated: May 18, 2024 10:45 AM
          </div>
        </div>

        {/* ── KPI METRICS ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {KPI_DATA.map((kpi, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 flex flex-col justify-between shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${kpi.iconBg}`}>
                  {kpi.icon}
                </div>
                <div>
                  <h3 className="text-[11px] md:text-[12px] font-medium text-slate-500 leading-tight">{kpi.title}</h3>
                </div>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-slate-950">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {kpi.subtextPositive && <ArrowUp className="w-3 h-3 text-emerald-600" />}
                  <span className={`text-[10px] md:text-[12px] font-medium ${kpi.subtextPositive === true ? "text-emerald-600" : "text-slate-400"}`}>
                    {kpi.subtext}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTER BAR ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full">
            <div className="w-full sm:max-w-[280px]">
              <label className="block text-[12px] font-medium text-slate-500 mb-1.5">Search Product</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by product name, ASIN, SKU..."
                  className="w-full h-9 pl-9 pr-4 text-[13px] bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
            {["Category", "Review Trust Score", "Suspicious Pattern", "Source"].map((filter) => (
              <div key={filter} className="w-full sm:w-auto min-w-[140px]">
                <label className="block text-[12px] font-medium text-slate-500 mb-1.5">{filter}</label>
                <div className="relative cursor-pointer">
                  <select className="w-full h-9 pl-3 pr-8 text-[13px] bg-slate-50 border border-slate-200 rounded-lg text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                    <option>{filter === "Category" ? "All Categories" : filter === "Source" ? "All Sources" : "All"}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 pt-5 lg:pt-0">
            <label className="block text-[12px] font-medium text-slate-500 mb-1.5 opacity-0 lg:opacity-100 hidden lg:block">More</label>
            <button className="flex items-center gap-1.5 h-9 px-4 text-[13px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all whitespace-nowrap w-full lg:w-auto justify-center">
              <Plus className="w-4 h-4" /> Add Filter
            </button>
          </div>
        </div>

        {/* ── MAIN DATA TABLE ── */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col w-full overflow-x-auto">
          <div className="overflow-x-auto custom-scrollbar w-full">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Product</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Review Trust Score <HelpCircle className="inline-block w-3 h-3 text-slate-400 ml-0.5" /></th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Positive Themes</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Complaint Themes</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Suspicious Pattern</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Review Count</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Source</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">Last Analyzed</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRODUCTS_DATA.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-start gap-3">
                        <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-slate-200 object-contain bg-white shrink-0 p-0.5" />
                        <div>
                          <p className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight line-clamp-2 max-w-[200px]">{product.name}</p>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-1">ASIN: {product.asin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                          {/* Background Circle */}
                          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15" fill="none" className="stroke-slate-100" strokeWidth="3" />
                            {/* Progress Circle */}
                            <circle 
                              cx="18" cy="18" r="15" fill="none" 
                              className={`stroke-current ${product.trustColor}`} 
                              strokeWidth="3"
                              strokeDasharray="94.2"
                              strokeDashoffset={94.2 - (94.2 * product.trustScore) / 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className={`relative text-[12px] font-bold ${product.trustColor}`}>{product.trustScore}</span>
                        </div>
                        <span className={`text-[12px] font-bold ${product.trustColor} whitespace-nowrap`}>{product.trustLabel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top max-w-[200px]">
                      <div className="flex flex-wrap gap-1.5">
                        {product.positiveThemes.map((theme) => (
                          <span key={theme} className="inline-flex px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-100/50 whitespace-nowrap">
                            {theme}
                          </span>
                        ))}
                        {product.morePositive > 0 && (
                          <button className="inline-flex px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[11px] font-semibold whitespace-nowrap hover:bg-slate-100 hover:text-indigo-600 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                            +{product.morePositive} more
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top max-w-[200px]">
                      <div className="flex flex-wrap gap-1.5">
                        {product.complaintThemes.map((theme) => (
                          <span key={theme} className="inline-flex px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-100/50 whitespace-nowrap">
                            {theme}
                          </span>
                        ))}
                        {product.moreComplaint > 0 && (
                          <button className="inline-flex px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[11px] font-semibold whitespace-nowrap hover:bg-slate-100 hover:text-indigo-600 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                            +{product.moreComplaint} more
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      {product.suspiciousPattern && (
                        <span className="inline-flex px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200/50">
                          {product.suspiciousPattern}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top text-[12px] sm:text-[13px] font-bold text-slate-900">
                      {product.reviewCount}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-md flex items-center justify-center text-[9px] sm:text-[10px] font-bold ${product.sourceColor}`}>
                          {product.source.charAt(0)}
                        </div>
                        <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800">{product.source}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top text-[11px] sm:text-[12px] text-slate-600 whitespace-pre-line leading-tight">
                      {product.lastAnalyzed}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-center justify-center gap-1">
                        <a href="/dashboard/review-intelligence/clusters/CLU-78421" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors border border-transparent hover:border-indigo-100 inline-flex">
                          <Eye className="w-4 h-4" />
                        </a>
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors border border-transparent hover:border-indigo-100">
                          <LineChart className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="border-t border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <span className="text-[13px] text-slate-500 font-medium">Showing 1 to 20 of 24,681 results</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select className="h-8 pl-3 pr-8 text-[12px] font-medium bg-white border border-slate-200 rounded-md text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer">
                  <option>20 per page</option>
                  <option>50 per page</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white text-[13px] font-semibold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-transparent text-slate-600 hover:bg-slate-100 text-[13px] font-semibold transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-transparent text-slate-600 hover:bg-slate-100 text-[13px] font-semibold transition-colors">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-transparent text-slate-600 hover:bg-slate-100 text-[13px] font-semibold transition-colors">4</button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-transparent text-slate-600 hover:bg-slate-100 text-[13px] font-semibold transition-colors">1,235</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER SCORE FACTORS ── */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-[13px] font-bold text-slate-900">Review Trust Score Factors</h3>
            <a href="#" className="text-[12px] font-semibold text-indigo-600 hover:underline">Learn more</a>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar pb-2">
            {FACTORS_DATA.map((factor, i) => (
              <div key={i} className="flex flex-col gap-1 shrink-0">
                <div className="flex items-center gap-1.5">
                  {factor.icon}
                  <span className="text-[12px] font-semibold text-slate-700">{factor.title}</span>
                </div>
                <span className="text-[11px] text-slate-500 pl-5">{factor.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
