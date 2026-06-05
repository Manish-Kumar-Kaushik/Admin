"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  RefreshCw, 
  Download, 
  ChevronDown, 
  Filter,
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Eye,
  Search,
  FileText,
  Clock,
  AlertCircle
} from "lucide-react";

const queueData = [
  {
    id: 1,
    original: { name: "Sony WH-1000XM5", subtitle: "Wireless Headphones", identifier: "ASIN: B09X57JWHH", score: 72 },
    alternative: { name: "Bose QuietComfort Ultra", subtitle: "Headphones", identifier: "ASIN: B0BSLKDVSY", score: 84 },
    type: "Better for slightly more",
    typeColor: "text-blue-600 bg-blue-50",
    priceDiff: "+$30.00",
    pricePercent: "(+18%)",
    priceNegative: false,
    confidence: "92%",
    confidenceLevel: "High",
    affiliate: "Active",
    affiliateStore: "Amazon",
    status: "Pending Review",
  },
  {
    id: 2,
    original: { name: "Keurig K-Elite Coffee Maker", subtitle: "", identifier: "ASIN: B07VY76Z19", score: 65 },
    alternative: { name: "Ninja Hot & Iced Coffee Maker", subtitle: "", identifier: "ASIN: B09031DTZ7", score: 74 },
    type: "Best similar price",
    typeColor: "text-emerald-600 bg-emerald-50",
    priceDiff: "+$4.99",
    pricePercent: "(+4%)",
    priceNegative: false,
    confidence: "86%",
    confidenceLevel: "High",
    affiliate: "Active",
    affiliateStore: "Amazon",
    status: "Approved",
  },
  {
    id: 3,
    original: { name: "Optimum Nutrition Gold", subtitle: "Standard Whey", identifier: "ASIN: B000QST1R6", score: 68 },
    alternative: { name: "Dymatize ISO100", subtitle: "Hydrolyzed Whey", identifier: "ASIN: B00E97M5V2", score: 64 },
    type: "Cheaper but good enough",
    typeColor: "text-amber-600 bg-amber-50",
    priceDiff: "-$15.00",
    pricePercent: "(-21%)",
    priceNegative: true,
    confidence: "75%",
    confidenceLevel: "Medium",
    affiliate: "Active",
    affiliateStore: "Amazon",
    status: "Pending Review",
  },
  {
    id: 4,
    original: { name: "iRobot Roomba j7+ Robot", subtitle: "Vacuum", identifier: "ASIN: B0B6XGGRQP", score: 70 },
    alternative: { name: "Roborock Q5+ Robot", subtitle: "Vacuum", identifier: "ASIN: B09ZKQKQPD", score: 85 },
    type: "Better for slightly more",
    typeColor: "text-blue-600 bg-blue-50",
    priceDiff: "+$150.00",
    pricePercent: "(+28%)",
    priceNegative: false,
    confidence: "90%",
    confidenceLevel: "High",
    affiliate: "Active",
    affiliateStore: "Amazon",
    status: "Approved",
  },
  {
    id: 5,
    original: { name: "Fitbit Charge 5", subtitle: "Fitness Tracker", identifier: "ASIN: B09B2DFB5S", score: 48 },
    alternative: { name: "Garmin Vivosmart 5", subtitle: "Fitness Tracker", identifier: "ASIN: B09KKP7VJX", score: 72 },
    type: "Avoid and replace",
    typeColor: "text-rose-600 bg-rose-50",
    priceDiff: "+$20.00",
    pricePercent: "(+25%)",
    priceNegative: false,
    confidence: "88%",
    confidenceLevel: "High",
    affiliate: "Active",
    affiliateStore: "Amazon",
    status: "Rejected",
  },
  {
    id: 6,
    original: { name: "Intel Core i5-12400F", subtitle: "Desktop Processor", identifier: "ASIN: B09NPHHSM5", score: 66 },
    alternative: { name: "Intel Core i5-13400F", subtitle: "Desktop Processor", identifier: "ASIN: B0BQ6K4BZG", score: 83 },
    type: "Premium upgrade",
    typeColor: "text-purple-600 bg-purple-50",
    priceDiff: "+$40.00",
    pricePercent: "(+15%)",
    priceNegative: false,
    confidence: "80%",
    confidenceLevel: "High",
    affiliate: "Active",
    affiliateStore: "Newegg",
    status: "Pending Review",
  },
  {
    id: 7,
    original: { name: "Samsung T7 1TB", subtitle: "Portable SSD", identifier: "ASIN: B0874XN4D8", score: 74 },
    alternative: { name: "Crucial X8 1TB", subtitle: "Portable SSD", identifier: "ASIN: B07YFFX5MD", score: 66 },
    type: "Budget pick",
    typeColor: "text-cyan-600 bg-cyan-50",
    priceDiff: "-$30.00",
    pricePercent: "(-25%)",
    priceNegative: true,
    confidence: "72%",
    confidenceLevel: "Medium",
    affiliate: "Active",
    affiliateStore: "Amazon",
    status: "Needs More Info",
  },
  {
    id: 8,
    original: { name: "Logitech G Pro X", subtitle: "Superlight Mouse", identifier: "ASIN: B08MVQ6G49", score: 78 },
    alternative: { name: "Razer DeathAdder V3 Pro", subtitle: "Wireless Mouse", identifier: "ASIN: B0BYP9LTKM", score: 82 },
    type: "Best similar price",
    typeColor: "text-emerald-600 bg-emerald-50",
    priceDiff: "+$5.00",
    pricePercent: "(+5%)",
    priceNegative: false,
    confidence: "78%",
    confidenceLevel: "High",
    affiliate: "Active",
    affiliateStore: "Amazon",
    status: "Approved",
  }
];

export default function AlternativesReviewDashboard() {

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending Review": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Approved": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected": return "bg-rose-50 text-rose-700 border-rose-200";
      case "Needs More Info": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "border-emerald-500 text-emerald-600";
    if (score >= 70) return "border-emerald-400 text-emerald-500";
    if (score >= 60) return "border-amber-400 text-amber-500";
    if (score >= 50) return "border-orange-400 text-orange-500";
    return "border-rose-500 text-rose-600";
  };

  const ScoreCircle = ({ score }: { score: number }) => {
    const colorClass = getScoreColor(score);
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className={`relative w-10 h-10 flex items-center justify-center font-bold text-sm ${colorClass}`}>
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r={radius} className="stroke-slate-100" strokeWidth="3" fill="none" />
          <circle 
            cx="20" 
            cy="20" 
            r={radius} 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="z-10">{score}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Main Container */}
      <div className="flex-1 w-full p-4 sm:p-6 flex flex-col gap-4 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Alternatives Review</h1>
            <p className="text-sm text-slate-500 mt-1">
              Review and approve alternative product recommendations generated by the AI.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 mt-1 md:mt-0">
            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Export Report
              </button>
              <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Refresh
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Last updated: May 18, 2024 10:45 AM</span>
          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-blue-200 bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-500 mb-1">Total Alternatives</span>
              <span className="text-2xl font-bold text-slate-950 leading-none mb-1.5">12,458</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span className="text-[14px]">↑</span> 8.2% <span className="text-slate-400 font-medium">vs yesterday</span>
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-amber-200 bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-500 mb-1">Pending Review</span>
              <span className="text-2xl font-bold text-slate-950 leading-none mb-1.5">1,248</span>
              <span className="text-xs font-medium text-slate-500">10.0% of total</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-500 mb-1">Approved</span>
              <span className="text-2xl font-bold text-slate-950 leading-none mb-1.5">9,856</span>
              <span className="text-xs font-medium text-slate-500">79.0% of total</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-rose-200 bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-500 mb-1">Rejected</span>
              <span className="text-2xl font-bold text-slate-950 leading-none mb-1.5">1,013</span>
              <span className="text-xs font-medium text-slate-500">8.1% of total</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4 min-w-0">
            <div className="h-10 w-10 rounded-full border border-purple-200 bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-500 mb-1">Needs More Info</span>
              <span className="text-2xl font-bold text-slate-950 leading-none mb-1.5">341</span>
              <span className="text-xs font-medium text-slate-500">2.7% of total</span>
            </div>
          </div>
        </div>

        {/* Filters and Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-w-0">
          
          {/* Filter Bar */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col lg:flex-row items-end gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 flex-1 w-full">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Search Products</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search by product name, ASIN, SKU..." 
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Alternative Type</label>
                  <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                      <option>All Types</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Status</label>
                  <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                      <option>All Status</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Affiliate Status</label>
                  <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                      <option>All Affiliate Status</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Category</label>
                  <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                      <option>All Categories</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap min-w-[1200px]">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Original Product</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Recommended Alternative</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Alternative Type</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Price Difference</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Original Score</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Alternative Score</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Confidence</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Affiliate Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queueData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 group cursor-pointer bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                          <div className="w-6 h-6 bg-slate-800 rounded-sm"></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 leading-tight">{item.original.name}</p>
                          {item.original.subtitle && <p className="text-sm font-semibold text-slate-900 leading-tight">{item.original.subtitle}</p>}
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.original.identifier}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                          <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 leading-tight">{item.alternative.name}</p>
                          {item.alternative.subtitle && <p className="text-sm font-semibold text-slate-900 leading-tight">{item.alternative.subtitle}</p>}
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.alternative.identifier}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${item.typeColor}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-sm font-bold ${item.priceNegative ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {item.priceDiff}
                        </span>
                        <span className={`text-[11px] font-bold ${item.priceNegative ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {item.pricePercent}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <ScoreCircle score={item.original.score} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <ScoreCircle score={item.alternative.score} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-bold text-slate-900">{item.confidence}</span>
                        <span className={`text-[10px] font-bold ${item.confidenceLevel === 'High' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {item.confidenceLevel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded font-bold">a</div>
                          <span className="text-xs font-semibold text-slate-900">{item.affiliateStore}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">{item.affiliate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 border rounded-full text-[11px] font-bold ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-slate-400">
                        <Link href={`/dashboard/alternatives/review/${item.id}`} className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 hover:text-slate-600 transition-colors border border-slate-200">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 hover:text-slate-600 transition-colors border border-slate-200">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-slate-500 font-medium text-center sm:text-left">Showing 1 to 20 of 12,458 results</span>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <select className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-md px-3 py-1.5 outline-none">
                  <option>20 per page</option>
                  <option>50 per page</option>
                  <option>100 per page</option>
                </select>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white text-sm font-bold shadow-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-sm font-bold">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-sm font-bold">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-sm font-bold">4</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-sm font-bold">5</button>
                <span className="text-slate-400 px-1 text-sm font-bold">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 text-slate-700 text-sm font-bold">623</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
