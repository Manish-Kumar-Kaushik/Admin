"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HelpCircle,
  Bell,
  ChevronDown,
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
  Menu,
  Star,
  ShieldCheck,
  ThumbsUp,
  Tag,
  Shield,
  CreditCard,
  Target,
  LogOut,
  User,
  Settings
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/dashboard/sidebar-context";

// ─── SVG Circular Progress Component ─────────────────────────────────────────

const CircularProgress = ({ score, colorClass }: { score: number, colorClass: string }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
      <svg className="w-12 h-12 rotate-[-90deg]">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-slate-100"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={colorClass}
        />
      </svg>
      <span className="absolute text-[13px] font-bold text-slate-800">{score}</span>
    </div>
  );
};

export default function AlternativeDetail() {
  const { toggle } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* ── Top Header ── */}
      <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu in Header */}
          <button
            onClick={toggle}
            className="p-1.5 -ml-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-[13px] text-slate-500 hidden sm:flex">
            <span>AI Review</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Alternatives Review</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-900">Alternative Detail</span>
          </div>
        </div>
        
        <div className="flex-none flex items-center gap-4 md:gap-5 relative" ref={dropdownRef}>
          <button className="flex items-center gap-1.5 text-[13px] text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Help</span>
          </button>

          {/* Notification Bell */}
          <button
            className="relative w-8 h-8 flex items-center justify-center border border-slate-200 bg-white hover:border-slate-300 rounded-full text-slate-500 hover:text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#EF4444] border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold leading-none shadow-sm">
              2
            </span>
          </button>

          {/* User Profile */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
              alt="Admin Avatar"
              className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200"
            />
            <div className="hidden lg:flex flex-col leading-none">
              <span className="text-[12px] font-bold text-slate-800">Admin User</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Super Admin</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-500 ml-1 hidden lg:block" />
          </div>

          {/* Admin User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">admin@buywish.ai</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                <LogOut className="w-4 h-4 text-red-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Main Container ── */}
      <main className="w-full px-4 md:px-6 py-6 flex-1 flex flex-col gap-6 overflow-x-hidden min-w-0">
        
        {/* Title & Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Alternative Detail</h1>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-semibold px-2 py-0.5 rounded-md text-xs">
                Pending Review
              </Badge>
            </div>
            <p className="text-[13px] text-slate-500 mt-1.5">
              Review the AI-recommended alternative and decide whether to approve, reject, or request more evidence.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <Button variant="outline" className="h-9 gap-2 text-slate-600 text-[13px] font-semibold border-slate-200 bg-white shadow-sm rounded-lg hover:bg-slate-50">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Link href="/dashboard/alternatives/review" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300 bg-white hover:bg-slate-50 h-9 px-4 text-slate-600 text-[13px] gap-2 shadow-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Alternatives
            </Link>
          </div>
        </div>

        {/* ── Grid Layout ── */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Top Cards (Comparison) */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              
              {/* ORIGINAL PRODUCT */}
              <Card className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col relative self-stretch">
                <div className="bg-rose-50 border-b border-rose-100 px-4 py-2 text-[11px] font-bold text-rose-700 tracking-wider">
                  ORIGINAL PRODUCT
                </div>
                <div className="p-5 flex gap-4 flex-1">
                  <div className="w-20 h-20 aspect-square shrink-0 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-2 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80" alt="Sony Headphones" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-[15px] font-bold text-slate-900 leading-tight">
                      Sony WH-1000XM5 Wireless<br/>Noise Cancelling Headphones
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                      <span>ASIN:</span>
                      <span className="font-semibold text-slate-700">B09XS7JJWH</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600 ml-1 cursor-pointer hover:underline" />
                    </div>
                    <div className="text-[12px] text-slate-500">
                      Category: Electronics {'>'} Headphones
                    </div>
                    <div className="flex items-end justify-between mt-auto pt-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-slate-500 font-medium">Current Price:</span>
                        <span className="text-[15px] font-bold text-red-600">$348.00</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[11px] text-slate-500 font-medium">AI Buy Score: <span className="font-bold text-slate-700">72/100</span></span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">Needs Better Alternative</span>
                        </div>
                        <CircularProgress score={72} colorClass="text-amber-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Arrow */}
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 z-10 shadow-sm text-slate-400 hidden md:flex">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* RECOMMENDED ALTERNATIVE */}
              <Card className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col relative self-stretch">
                <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 text-[11px] font-bold text-emerald-700 tracking-wider">
                  RECOMMENDED ALTERNATIVE
                </div>
                <div className="p-5 flex gap-4 flex-1">
                  <div className="w-20 h-20 aspect-square shrink-0 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-2 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&q=80" alt="Bose Headphones" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-[15px] font-bold text-slate-900 leading-tight">
                      Bose QuietComfort Ultra<br/>Wireless Headphones
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                      <span>ASIN:</span>
                      <span className="font-semibold text-slate-700">B0BSLHDVJY</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600 ml-1 cursor-pointer hover:underline" />
                    </div>
                    <div className="text-[12px] text-slate-500">
                      Category: Electronics {'>'} Headphones
                    </div>
                    <div className="flex items-end justify-between mt-auto pt-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-slate-500 font-medium">Current Price:</span>
                        <span className="text-[15px] font-bold text-emerald-600">$379.00</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[11px] text-slate-500 font-medium">AI Buy Score: <span className="font-bold text-slate-700">84/100</span></span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Recommended Alternative</span>
                        </div>
                        <CircularProgress score={84} colorClass="text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

            </div>

            {/* Metadata Ribbon */}
            <Card className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
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
              <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col text-[11px] text-slate-500 leading-tight">
                <span>Found By: <span className="text-slate-700 font-medium">AI Alternative Engine</span></span>
                <span>Analysis Date: <span className="text-slate-700 font-medium">May 18, 2024 10:45 AM</span></span>
              </div>
            </Card>

            {/* Side-by-Side Comparison */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[15px] font-bold text-slate-900">Side-by-Side Comparison</h3>
              <Card className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <div className="min-w-[700px] w-full flex flex-col">
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 p-4 border-b border-slate-200 bg-slate-50 text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                      <div>Evaluation Criteria</div>
                      <div className="text-slate-800">Original Product</div>
                      <div className="text-blue-700">Recommended Alternative</div>
                      <div className="text-right">Difference</div>
                    </div>

                    {/* AI Buy Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
                        <Star className="w-4 h-4 text-slate-400" /> AI Buy Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-[3px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-bold text-slate-900">72<span className="text-slate-400 font-medium">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-[3px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-bold text-slate-900">84<span className="text-slate-400 font-medium">/100</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">+12</span>
                      </div>
                    </div>

                    {/* Value Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <Star className="w-4 h-4 text-slate-400" /> Value Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">68<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">78<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">+10</span>
                      </div>
                    </div>

                    {/* Quality Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-slate-400" /> Quality Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">74<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">88<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">+14</span>
                      </div>
                    </div>

                    {/* Review Trust */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <ThumbsUp className="w-4 h-4 text-slate-400" /> Review Trust
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">71<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">87<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">+16</span>
                      </div>
                    </div>

                    {/* Price Score */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <Tag className="w-4 h-4 text-slate-400" /> Price Score
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">62<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 border-r-slate-200 rotate-45 shrink-0"></div>
                        <span className="text-[13px] font-semibold text-slate-900">72<span className="text-slate-400 font-normal">/100</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">+10</span>
                      </div>
                    </div>

                    {/* Warranty */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <Shield className="w-4 h-4 text-slate-400" /> Warranty
                      </div>
                      <div className="text-[13px] font-medium text-slate-700 flex items-center">
                        1 Year <CheckCircle2 className="w-3 h-3 text-amber-500 ml-1.5" />
                      </div>
                      <div className="text-[13px] font-medium text-slate-700 flex items-center">
                        1 Year <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-1.5" />
                      </div>
                      <div className="text-right">
                        <span className="text-[13px] font-medium text-slate-500">Same</span>
                      </div>
                    </div>

                    {/* Current Price */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <CreditCard className="w-4 h-4 text-slate-400" /> Current Price
                      </div>
                      <div className="text-[13px] font-bold text-rose-600">
                        $348.00
                      </div>
                      <div className="text-[13px] font-bold text-rose-600">
                        $379.00
                      </div>
                      <div className="text-right">
                        <span className="text-[13px] font-bold text-rose-600">+$31.00</span>
                      </div>
                    </div>

                    {/* Price History */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <TrendingUp className="w-4 h-4 text-slate-400" /> Price History <span className="text-[11px] text-slate-400 font-normal">(90 Days)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-rose-600 font-medium">
                        <TrendingUp className="w-3.5 h-3.5" /> 12% <span className="text-slate-500 ml-1">Trending up</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-emerald-600 font-medium">
                        <TrendingDown className="w-3.5 h-3.5" /> 4% <span className="text-slate-500 ml-1">Trending down</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Better</span>
                      </div>
                    </div>

                    {/* Main Complaint */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <MessageCircle className="w-4 h-4 text-slate-400" /> Main Complaint
                      </div>
                      <div className="text-[12px] text-rose-600 font-medium pr-2">
                        Build quality, ear cup durability
                      </div>
                      <div className="text-[12px] text-amber-600 font-medium pr-2">
                        Occasional app connectivity issues
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Better</span>
                      </div>
                    </div>

                    {/* Best Use Case */}
                    <div className="grid grid-cols-[1.1fr_1fr_1fr_0.75fr] gap-4 gap-4 items-center px-4 py-3">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                        <Target className="w-4 h-4 text-slate-400" /> Best Use Case
                      </div>
                      <div className="text-[12px] text-slate-700 pr-2">
                        Frequent travelers, long battery life
                      </div>
                      <div className="text-[12px] text-slate-700 pr-2">
                        All-day comfort, noise cancellation, calls
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Better</span>
                      </div>
                    </div>

                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom Row: AI Reasoning & Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              
              {/* AI Reasoning */}
              <Card className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-[15px]">
                  <Star className="w-4 h-4 text-blue-600 fill-blue-600" /> AI Reasoning
                </div>
                <div className="text-[13px] text-slate-600 leading-relaxed space-y-3">
                  <p>
                    Bose QuietComfort Ultra offers a significantly better overall experience based on higher quality, review trust, and price performance.
                  </p>
                  <p>
                    It provides comparable noise cancellation, superior comfort, and more consistent user satisfaction based on review analysis.
                  </p>
                  <ul className="space-y-2 mt-4">
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
              </Card>

              {/* Evidence & Sources */}
              <Card className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <div className="text-slate-900 font-bold text-[15px]">
                  Evidence & Sources <span className="text-slate-500 font-medium ml-1">(6)</span>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  {[
                    { title: "YouTube Review - TechGearLab", date: "May 12, 2024", type: "Video", bg: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: <Video className="w-3.5 h-3.5" /> },
                    { title: "RTINGS.com Review", date: "May 10, 2024", type: "Article", bg: "bg-blue-50 text-blue-700 border-blue-100", icon: <FileText className="w-3.5 h-3.5" /> },
                    { title: "1,248 Customer Reviews (Bose QC Ultra)", date: "May 18, 2024", type: "Reviews", bg: "bg-purple-50 text-purple-700 border-purple-100", icon: <MessageSquare className="w-3.5 h-3.5" /> },
                    { title: "Reddit Discussion - r/headphones", date: "May 14, 2024", type: "Forum", bg: "bg-orange-50 text-orange-700 border-orange-100", icon: <MessageCircle className="w-3.5 h-3.5" /> },
                    { title: "Price History (Amazon)", date: "May 18, 2024", type: "Price Data", bg: "bg-amber-50 text-amber-700 border-amber-100", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                    { title: "Manufacturer Specs Comparison", date: "May 11, 2024", type: "Specs", bg: "bg-slate-100 text-slate-700 border-slate-200", icon: <FileCode className="w-3.5 h-3.5" /> },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 group">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-[13px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 hidden sm:block">{item.date}</span>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border", item.bg)}>{item.type}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 cursor-pointer transition-colors" />
                      </div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <Button variant="ghost" className="px-0 h-auto text-[13px] text-blue-600 font-medium hover:bg-transparent hover:text-blue-800 gap-1">
                      View all evidence <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>

            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            
            {/* Affiliate Link Status */}
            <Card className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-[15px] font-bold text-slate-900">Affiliate Link Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-900 rounded-[4px] flex items-center justify-center text-white font-bold text-[10px]">a</div>
                  <span className="text-[14px] font-bold text-slate-900">Amazon</span>
                </div>
                <span className="text-[12px] font-bold text-emerald-600">Active</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-slate-500">Affiliate Link:</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] text-blue-600 hover:underline cursor-pointer truncate font-medium">https://amazon.com/dp/B0BSLHDVJY</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2 gap-2 text-[13px] font-semibold text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100">
                <Eye className="w-4 h-4" /> Preview Product Page
              </Button>
            </Card>

            {/* Admin Decision Panel */}
            <Card className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-5">
              <h3 className="text-[15px] font-bold text-slate-900">Admin Decision Panel</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-700">Current Status</span>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-semibold px-2 py-0.5 rounded-md text-xs">
                  Pending Review
                </Badge>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-slate-700">Decision Notes</span>
                <textarea 
                  className="w-full h-24 p-3 text-[13px] border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  placeholder="Add notes about this alternative..."
                />
                <span className="text-[11px] text-slate-400 text-right">0 / 1000</span>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <span className="text-[13px] font-semibold text-slate-700 mb-1">Actions</span>
                
                <Button variant="outline" className="flex flex-col items-start w-full px-4 py-3 h-auto rounded-lg border-emerald-500 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 hover:text-emerald-800 transition-colors group relative shadow-none">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[13px] font-bold">Approve Alternative</span>
                  </div>
                  <span className="text-[11px] opacity-80 mt-0.5 ml-6 font-normal">Make this the recommended alternative</span>
                </Button>

                <Button variant="outline" className="flex flex-col items-start w-full px-4 py-3 h-auto rounded-lg border-rose-500 text-rose-700 bg-rose-50/50 hover:bg-rose-50 hover:text-rose-800 transition-colors group relative shadow-none">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span className="text-[13px] font-bold">Reject Alternative</span>
                  </div>
                  <span className="text-[11px] opacity-80 mt-0.5 ml-6 font-normal">Do not show this alternative</span>
                </Button>

                <Button variant="outline" className="flex flex-col items-start w-full px-4 py-3 h-auto rounded-lg border-blue-500 text-blue-700 bg-blue-50/50 hover:bg-blue-50 hover:text-blue-800 transition-colors group relative shadow-none">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-[13px] font-bold">Replace Alternative</span>
                  </div>
                  <span className="text-[11px] opacity-80 mt-0.5 ml-6 font-normal">Choose a different alternative</span>
                </Button>

                <Button variant="outline" className="flex flex-col items-start w-full px-4 py-3 h-auto rounded-lg border-purple-200 text-purple-700 bg-purple-50/50 hover:bg-purple-50 hover:text-purple-800 transition-colors group relative shadow-none">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[13px] font-bold">Request More Evidence</span>
                  </div>
                  <span className="text-[11px] opacity-80 mt-0.5 ml-6 font-normal">Ask AI to gather more supporting data</span>
                </Button>
              </div>

            </Card>

            {/* Alternative Details */}
            <Card className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
              <h3 className="text-[14px] font-bold text-slate-900">Alternative Details</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500 font-medium">Alternative ID</span>
                  <span className="text-[12px] text-slate-800 font-medium">ALT-2024-0518001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500 font-medium">Discovered</span>
                  <span className="text-[12px] text-slate-800 font-medium">May 17, 2024 08:32 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500 font-medium">Discovered By</span>
                  <span className="text-[12px] text-slate-800 font-medium">AI Alternative Engine v2.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500 font-medium">Last Updated</span>
                  <span className="text-[12px] text-slate-800 font-medium">May 18, 2024 10:45 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-500 font-medium">Priority</span>
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 font-bold px-2 py-0 rounded text-[10px] leading-none">
                    High
                  </Badge>
                </div>
              </div>
            </Card>

          </div>

        </div>

      </main>
    </div>
  );
}
