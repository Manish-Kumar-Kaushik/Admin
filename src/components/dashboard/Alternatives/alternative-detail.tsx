"use client";

import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Eye,
  CheckCircle2,
  XCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Video,
  FileText,
  MessageSquare,
  MessageCircle,
  FileCode,
  Download,
  AlertCircle,
  Star,
  ShieldCheck,
  ThumbsUp,
  Tag,
  Shield,
  CreditCard,
  Target
} from "lucide-react";

// ─── SVG Circular Progress Component ─────────────────────────────────────────
const CircularProgress = ({ score, colorClass }: { score: number, colorClass: string }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center w-12 h-12 shrink-0 ${colorClass}`}>
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} className="stroke-slate-100" strokeWidth="3" fill="none" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[14px] font-bold z-10 text-slate-800">{score}</span>
    </div>
  );
};

export default function AlternativeDetail() {
  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* ── Main Container ── */}
      <main className="w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Title & Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Alternative Detail</h1>
              <span className="bg-orange-50 text-orange-700 border border-orange-200 font-bold px-2 py-0.5 rounded-md text-xs">
                Pending Review
              </span>
            </div>
            <p className="text-[13px] text-slate-500 mt-1.5">
              Review the AI-recommended alternative and decide whether to approve, reject, or request more evidence.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[13px] font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <Link href="/dashboard/alternatives/review" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-[13px] font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Alternatives
            </Link>
          </div>
        </div>

        {/* ── Grid Layout (70/30) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (Main Content - 70%) */}
          <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
            
            {/* Top Cards (Comparison) */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              
              {/* ORIGINAL PRODUCT */}
              <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col relative self-stretch min-w-0">
                <div className="bg-rose-50 border-b border-rose-100 px-4 sm:px-6 py-2 text-[11px] font-bold text-rose-700 tracking-wider">
                  ORIGINAL PRODUCT
                </div>
                <div className="p-4 sm:p-6 flex gap-3 sm:gap-5 flex-1 min-w-0">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80" alt="Sony Headphones" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
                    <h3 className="text-[13px] sm:text-[15px] font-bold text-slate-900 leading-tight truncate sm:whitespace-normal">
                      Sony WH-1000XM5 Wireless Noise Cancelling Headphones
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-[12px] text-slate-500">
                      <span>ASIN:</span>
                      <span className="font-semibold text-slate-700">B09XS7JJWH</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600 ml-1 cursor-pointer hover:underline" />
                    </div>
                    <div className="text-[11px] sm:text-[12px] text-slate-500 truncate">
                      Category: Electronics {'>'} Headphones
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-auto pt-2 sm:pt-0 gap-2 sm:gap-0">
                      <div className="flex flex-col gap-0.5 sm:gap-1">
                        <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Current Price:</span>
                        <span className="text-[13px] sm:text-[15px] font-bold text-red-600">$348.00</span>
                      </div>
                      <div className="flex flex-row items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                        <div className="flex flex-col items-start sm:items-end gap-1">
                          <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">AI Buy Score: <span className="font-bold text-rose-600">72/100</span></span>
                          <span className="text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 whitespace-nowrap">Needs Better Alternative</span>
                        </div>
                        <CircularProgress score={72} colorClass="text-amber-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 z-10 shadow-sm text-slate-400 hidden md:flex">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* RECOMMENDED ALTERNATIVE */}
              <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col relative self-stretch min-w-0">
                <div className="bg-emerald-50 border-b border-emerald-100 px-4 sm:px-6 py-2 text-[11px] font-bold text-emerald-700 tracking-wider">
                  RECOMMENDED ALTERNATIVE
                </div>
                <div className="p-4 sm:p-6 flex gap-3 sm:gap-5 flex-1 min-w-0">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1647427017066-5197828ceb4e?w=200&q=80" alt="Bose Headphones" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
                    <h3 className="text-[13px] sm:text-[15px] font-bold text-slate-900 leading-tight truncate sm:whitespace-normal">
                      Bose QuietComfort Ultra Wireless Headphones
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-[12px] text-slate-500">
                      <span>ASIN:</span>
                      <span className="font-semibold text-slate-700">B0BSLHDVJY</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600 ml-1 cursor-pointer hover:underline" />
                    </div>
                    <div className="text-[11px] sm:text-[12px] text-slate-500 truncate">
                      Category: Electronics {'>'} Headphones
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-auto pt-2 sm:pt-0 gap-2 sm:gap-0">
                      <div className="flex flex-col gap-0.5 sm:gap-1">
                        <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Current Price:</span>
                        <span className="text-[13px] sm:text-[15px] font-bold text-emerald-600">$379.00</span>
                      </div>
                      <div className="flex flex-row items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                        <div className="flex flex-col items-start sm:items-end gap-1">
                          <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">AI Buy Score: <span className="font-bold text-emerald-600">84/100</span></span>
                          <span className="text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">Recommended Alternative</span>
                        </div>
                        <CircularProgress score={84} colorClass="text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Metadata Ribbon */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 px-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-slate-500">Alternative Type:</span>
                <span className="text-[12px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">Better for slightly more</span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-slate-500">Price Difference:</span>
                <span className="text-[12px] font-bold text-red-600">+$31.00 (+8.9%)</span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-slate-500">Confidence:</span>
                <div className="flex items-center gap-1 text-[12px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  92% High
                </div>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden lg:block xl:hidden"></div>
              <div className="flex flex-col text-[11px] text-slate-500 leading-tight">
                <span>Found By: <span className="text-slate-700 font-medium">AI Alternative Engine</span></span>
                <span>Analysis Date: <span className="text-slate-700 font-medium">May 18, 2024 10:45 AM</span></span>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-900">Side-by-Side Comparison</h3>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto w-full">
                  <div className="min-w-[700px] w-full flex flex-col">
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 p-4 px-6 border-b border-slate-200 bg-slate-50 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                      <div>Criteria</div>
                      <div className="text-slate-700">Original Product (Sony WH-1000XM5)</div>
                      <div className="text-emerald-700">Alternative (Bose QuietComfort Ultra)</div>
                      <div className="text-right">Difference</div>
                    </div>

                    {/* AI Buy Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 items-center">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Star className="w-4 h-4 text-slate-400" /> AI Buy Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-[3px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-bold text-slate-900">72<span className="text-slate-400 font-medium">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-[3px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-bold text-slate-900">84<span className="text-slate-400 font-medium">/100</span></span>
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        +12
                      </div>
                    </div>

                    {/* Value Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Star className="w-4 h-4 text-slate-400" /> Value Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">68<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">78<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        +10
                      </div>
                    </div>

                    {/* Quality Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-slate-400" /> Quality Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">74<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">88<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        +14
                      </div>
                    </div>

                    {/* Review Trust */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <ThumbsUp className="w-4 h-4 text-slate-400" /> Review Trust
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">71<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">87<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        +16
                      </div>
                    </div>

                    {/* Price Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Tag className="w-4 h-4 text-slate-400" /> Price Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">62<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900">72<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        +10
                      </div>
                    </div>

                    {/* Warranty */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Shield className="w-4 h-4 text-slate-400" /> Warranty
                      </div>
                      <div className="text-sm font-medium text-slate-700 flex items-center">
                        1 Year <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 ml-1.5" />
                      </div>
                      <div className="text-sm font-medium text-slate-700 flex items-center">
                        1 Year <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-1.5" />
                      </div>
                      <div className="text-right text-sm font-medium text-slate-500">
                        Same
                      </div>
                    </div>

                    {/* Current Price */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <CreditCard className="w-4 h-4 text-slate-400" /> Current Price
                      </div>
                      <div className="text-sm font-bold text-rose-600">
                        $348.00
                      </div>
                      <div className="text-sm font-bold text-rose-600">
                        $379.00
                      </div>
                      <div className="text-right text-sm font-bold text-rose-600">
                        +$31.00
                      </div>
                    </div>

                    {/* Price History */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <TrendingUp className="w-4 h-4 text-slate-400" /> Price History <span className="text-[11px] text-slate-400 font-normal">(90 Days)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[13px] text-rose-600 font-medium">
                        <TrendingUp className="w-3.5 h-3.5" /> 12% <span className="text-slate-500 ml-1">Trending up</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[13px] text-emerald-600 font-medium">
                        <TrendingDown className="w-3.5 h-3.5" /> 4% <span className="text-slate-500 ml-1">Trending down</span>
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        Better
                      </div>
                    </div>

                    {/* Main Complaint */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 border-b border-slate-100 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <MessageCircle className="w-4 h-4 text-slate-400" /> Main Complaint
                      </div>
                      <div className="text-sm text-rose-600 font-medium pr-2">
                        Build quality, ear cup durability
                      </div>
                      <div className="text-sm text-amber-600 font-medium pr-2">
                        Occasional app connectivity issues
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        Better
                      </div>
                    </div>

                    {/* Best Use Case */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 px-6 py-4 items-center">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Target className="w-4 h-4 text-slate-400" /> Best Use Case
                      </div>
                      <div className="text-sm text-slate-700 pr-2">
                        Frequent travelers, long battery life
                      </div>
                      <div className="text-sm text-slate-700 pr-2">
                        All-day comfort, noise cancellation, calls
                      </div>
                      <div className="text-right text-sm font-bold text-emerald-600">
                        Better
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: AI Reasoning & Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              
              {/* AI Reasoning */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                  <Star className="w-5 h-5 text-blue-600 fill-blue-600" /> AI Reasoning
                </div>
                <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                  <p>
                    Bose QuietComfort Ultra offers a significantly better overall experience based on higher quality, review trust, and price performance.
                  </p>
                  <p>
                    It provides comparable noise cancellation, superior comfort, and more consistent user satisfaction based on review analysis.
                  </p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Higher review trust score due to more verified purchases and consistent positive sentiment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Better quality indicators from expert reviews and long-term durability feedback.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Price trend is favorable and the premium is justified by quality and performance gains.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Strong performance across most evaluation criteria with high confidence.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Evidence & Sources */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="text-slate-900 font-bold text-lg">
                  Evidence & Sources <span className="text-slate-500 font-medium ml-1 text-sm">(6)</span>
                </div>
                <div className="flex flex-col gap-3 mt-1">
                  {[
                    { title: "YouTube Review - TechGearLab", date: "May 12, 2024", type: "Video", bg: "bg-emerald-50 text-emerald-700", icon: <Video className="w-3.5 h-3.5" /> },
                    { title: "RTINGS.com Review", date: "May 10, 2024", type: "Article", bg: "bg-blue-50 text-blue-700", icon: <FileText className="w-3.5 h-3.5" /> },
                    { title: "1,248 Customer Reviews (Bose QC Ultra)", date: "May 18, 2024", type: "Reviews", bg: "bg-purple-50 text-purple-700", icon: <MessageSquare className="w-3.5 h-3.5" /> },
                    { title: "Reddit Discussion - r/headphones", date: "May 14, 2024", type: "Forum", bg: "bg-orange-50 text-orange-700", icon: <MessageCircle className="w-3.5 h-3.5" /> },
                    { title: "Price History (Amazon)", date: "May 18, 2024", type: "Price Data", bg: "bg-amber-50 text-amber-700", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                    { title: "Manufacturer Specs Comparison", date: "May 11, 2024", type: "Specs", bg: "bg-slate-100 text-slate-700", icon: <FileCode className="w-3.5 h-3.5" /> },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2.5 border-b border-slate-100 group">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 hidden sm:block">{item.date}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.bg}`}>{item.type}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 cursor-pointer transition-colors" />
                      </div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1 transition-colors">
                      View all evidence <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (Sidebar - 30%) */}
          <div className="lg:col-span-4 shrink-0 flex flex-col gap-6 min-w-0">
            
            {/* Affiliate Link Status */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900">Affiliate Link Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-900 rounded-[4px] flex items-center justify-center text-white font-bold text-[10px]">a</div>
                  <span className="text-sm font-bold text-slate-900">Amazon</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">Active</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-slate-500">Affiliate Link:</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer truncate font-medium">https://amazon.com/dp/B0BSLHDVJY</span>
                  <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" />
                </div>
              </div>
              <button className="w-full mt-2 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                <Eye className="w-4 h-4" /> Preview Product Page
              </button>
            </div>

            {/* Admin Decision Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-5">
              <h3 className="text-lg font-bold text-slate-900">Admin Decision Panel</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Current Status</span>
                <span className="bg-orange-50 text-orange-700 border border-orange-200 font-bold px-2 py-0.5 rounded-md text-xs">
                  Pending Review
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Decision Notes</span>
                <textarea 
                  className="w-full h-24 p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  placeholder="Add notes about this alternative..."
                />
                <span className="text-[11px] text-slate-400 text-right">0 / 1000</span>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <span className="text-sm font-semibold text-slate-700 mb-1">Actions</span>
                
                <button className="flex flex-col items-start w-full p-4 rounded-lg border border-emerald-500 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 hover:text-emerald-800 transition-colors group">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-bold">Approve Alternative</span>
                  </div>
                  <span className="text-xs opacity-80 mt-1 ml-6 font-medium">Make this the recommended alternative</span>
                </button>

                <button className="flex flex-col items-start w-full p-4 rounded-lg border border-rose-500 text-rose-700 bg-rose-50/50 hover:bg-rose-50 hover:text-rose-800 transition-colors group">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">Reject Alternative</span>
                  </div>
                  <span className="text-xs opacity-80 mt-1 ml-6 font-medium">Do not show this alternative</span>
                </button>

                <button className="flex flex-col items-start w-full p-4 rounded-lg border border-blue-500 text-blue-700 bg-blue-50/50 hover:bg-blue-50 hover:text-blue-800 transition-colors group">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm font-bold">Replace Alternative</span>
                  </div>
                  <span className="text-xs opacity-80 mt-1 ml-6 font-medium">Choose a different alternative</span>
                </button>

                <button className="flex flex-col items-start w-full p-4 rounded-lg border border-purple-200 text-purple-700 bg-purple-50/50 hover:bg-purple-50 hover:text-purple-800 transition-colors group">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">Request More Evidence</span>
                  </div>
                  <span className="text-xs opacity-80 mt-1 ml-6 font-medium">Ask AI to gather more supporting data</span>
                </button>
              </div>

            </div>

            {/* Alternative Details */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900">Alternative Details</h3>
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 font-medium">Alternative ID</span>
                  <span className="text-sm text-slate-800 font-medium">ALT-2024-0518001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 font-medium">Discovered</span>
                  <span className="text-sm text-slate-800 font-medium">May 17, 2024 08:32 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 font-medium">Discovered By</span>
                  <span className="text-sm text-slate-800 font-medium">AI Alternative Engine v2.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 font-medium">Last Updated</span>
                  <span className="text-sm text-slate-800 font-medium">May 18, 2024 10:45 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 font-medium">Priority</span>
                  <span className="bg-red-50 text-red-600 border border-red-100 font-bold px-2 py-0.5 rounded text-[11px] leading-none">
                    High
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
