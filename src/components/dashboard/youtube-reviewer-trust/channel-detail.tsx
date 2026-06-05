"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Download,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Clock,
  MessageSquare,
  AlertTriangle,
  Eye,
  SlidersHorizontal,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Play
} from "lucide-react";

interface TrustFactor {
  name: string;
  score: number;
}

interface VideoItem {
  id: string;
  title: string;
  publishDate: string;
  category: string;
  views: string;
  duration: string;
  sponsorship: string;
  disclosure: string;
  depthScore: number;
  aiRelevanceScore: number;
  thumbnail: React.ReactNode;
}

interface DecisionHistoryItem {
  status: "Trusted" | "Note Added" | "Under Review";
  title: string;
  reviewer: string;
  date: string;
  description: string;
}

// Icons for product/video thumbnails
const HeadphoneVideoIcon = () => (
  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-950 shadow-sm group cursor-pointer select-none bg-[#111116] flex items-center justify-between p-2">
    <div className="flex flex-col justify-center h-full z-10 text-left pl-1">
      <span className="text-[8.5px] sm:text-[9.5px] font-black text-white leading-tight uppercase tracking-tight">
        Best<br/>
        <span className="text-sky-400">Wireless</span><br/>
        Headphones<br/>
        <span className="text-white">2024</span>
      </span>
    </div>
    {/* Headphones SVG */}
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-amber-600/60 z-0 stroke-[1.5] shrink-0" fill="none" stroke="currentColor">
      <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9M3 14h3v5H3v-5zm15 0h3v5h-3v-5z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 14c0-2 1-4 3-5M21 14c0-2-1-4-3-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="absolute bottom-1 right-1 bg-black px-1.5 py-0.5 rounded text-[8.5px] font-bold text-white z-20 font-mono leading-none scale-90">14:32</span>
  </div>
);

const LaptopVideoIcon = () => (
  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-950 shadow-sm group cursor-pointer select-none bg-[#091524] flex items-center justify-between p-2">
    <div className="flex flex-col justify-center h-full z-10 text-left pl-1">
      <span className="text-[8.5px] sm:text-[9.5px] font-black text-white leading-tight uppercase tracking-tight">
        Macbook Air<br/>
        <span className="text-sky-400 text-sm">M3</span><br/>
        <span className="text-white">Review</span>
      </span>
    </div>
    {/* Laptop SVG */}
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-sky-500/50 z-0 stroke-[1.5] shrink-0" fill="none" stroke="currentColor">
      <path d="M20 16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10m-2 0h20v2H2v-2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="absolute bottom-1 right-1 bg-black px-1.5 py-0.5 rounded text-[8.5px] font-bold text-white z-20 font-mono leading-none scale-90">12:48</span>
  </div>
);

const ConsoleVideoIcon = () => (
  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-950 shadow-sm group cursor-pointer select-none bg-[#1a1a24] flex items-center justify-between p-2">
    <div className="flex flex-col justify-center h-full z-10 text-left pl-1">
      <span className="text-[8.5px] sm:text-[9.5px] font-black text-white leading-tight uppercase tracking-tight">
        PS5 Slim<br/>
        <span className="text-slate-400">Deep Dive</span>
      </span>
    </div>
    {/* Console SVG */}
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-slate-350/50 z-0 stroke-[1.5] shrink-0" fill="none" stroke="currentColor">
      <rect x="7" y="2" width="10" height="20" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6h4M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="absolute bottom-1 right-1 bg-black px-1.5 py-0.5 rounded text-[8.5px] font-bold text-white z-20 font-mono leading-none scale-90">18:21</span>
  </div>
);

const BudgetVideoIcon = () => (
  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-950 shadow-sm group cursor-pointer select-none bg-[#1c1308] flex items-center justify-between p-2">
    <div className="flex flex-col justify-center h-full z-10 text-left pl-1">
      <span className="text-[8.5px] sm:text-[9.5px] font-black text-white leading-tight uppercase tracking-tight">
        Best<br/>
        <span className="text-amber-500">Budget</span><br/>
        Laptops<br/>
        <span className="text-white">2024</span>
      </span>
    </div>
    {/* Laptop SVG */}
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-amber-500/40 z-0 stroke-[1.5] shrink-0" fill="none" stroke="currentColor">
      <path d="M20 16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10m-2 0h20v2H2v-2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="absolute bottom-1 right-1 bg-black px-1.5 py-0.5 rounded text-[8.5px] font-bold text-white z-20 font-mono leading-none scale-90">11:09</span>
  </div>
);

const mockBreakdown: TrustFactor[] = [
  { name: "Channel Age", score: 90 },
  { name: "Review Consistency", score: 84 },
  { name: "Engagement Quality", score: 78 },
  { name: "Sponsorship Transparency", score: 86 },
  { name: "Product Depth", score: 80 },
  { name: "Category Authority", score: 85 },
  { name: "Past Accuracy", score: 73 }
];

const mockCategoryAuthority = [
  { name: "Electronics", score: 85, level: "High" },
  { name: "Audio", score: 80, level: "High" },
  { name: "Computers", score: 78, level: "High" },
  { name: "Gaming", score: 65, level: "Medium" },
  { name: "Smart Home", score: 62, level: "Medium" }
];

const mockSponsorshipSignals = [
  { name: "Sponsored Video Ratio", value: "18%", status: "Good", isPositive: true },
  { name: "Paid Promotion Disclosure", value: "92%", status: "Excellent", isPositive: true },
  { name: "Affiliate Link Disclosure", value: "89%", status: "Good", isPositive: true },
  { name: "Incentivized Review Detected", value: "Low Risk", status: "Good", isPositive: true },
  { name: "Recent Sponsorship Spike", value: "No", status: "Good", isPositive: true }
];

const mockRecentVideos: VideoItem[] = [
  {
    id: "v1",
    title: "Best Wireless Headphones of 2024 (Top 6 Tested)",
    publishDate: "May 12, 2024",
    category: "Electronics",
    views: "412K",
    duration: "14:32",
    sponsorship: "Yes (2)",
    disclosure: "Shown",
    depthScore: 88,
    aiRelevanceScore: 92,
    thumbnail: <HeadphoneVideoIcon />
  },
  {
    id: "v2",
    title: "Apple MacBook Air M3 Review: Better Than Ever?",
    publishDate: "May 5, 2024",
    category: "Computers",
    views: "326K",
    duration: "12:48",
    sponsorship: "Yes (1)",
    disclosure: "Shown",
    depthScore: 90,
    aiRelevanceScore: 95,
    thumbnail: <LaptopVideoIcon />
  },
  {
    id: "v3",
    title: "PS5 Slim Review: Worth The Upgrade?",
    publishDate: "Apr 28, 2024",
    category: "Gaming",
    views: "298K",
    duration: "18:21",
    sponsorship: "No",
    disclosure: "N/A",
    depthScore: 84,
    aiRelevanceScore: 89,
    thumbnail: <ConsoleVideoIcon />
  },
  {
    id: "v4",
    title: "Best Budget Laptops Under $700 (2024)",
    publishDate: "Apr 21, 2024",
    category: "Computers",
    views: "275K",
    duration: "11:09",
    sponsorship: "Yes (1)",
    disclosure: "Shown",
    depthScore: 81,
    aiRelevanceScore: 88,
    thumbnail: <BudgetVideoIcon />
  }
];

const mockDecisions: DecisionHistoryItem[] = [
  {
    status: "Trusted",
    title: "Trusted for Electronics",
    reviewer: "Admin User",
    date: "Apr 10, 2024",
    description: "Strong testing methodology and consistent quality."
  },
  {
    status: "Note Added",
    title: "General Note",
    reviewer: "Admin User",
    date: "Mar 2, 2024",
    description: "Monitor sponsorship ratio for next 30 days."
  },
  {
    status: "Under Review",
    title: "Manual Review Requested",
    reviewer: "Admin User",
    date: "Jan 15, 2024",
    description: "Sudden increase in sponsored content."
  }
];

export default function ChannelDetail() {
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [adminNote, setAdminNote] = useState<string>("");

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-6 overflow-x-hidden">
      <div className="w-full max-w-full min-w-0 px-3 sm:px-4 md:px-5 py-4 md:py-6 space-y-4 md:space-y-6 overflow-x-hidden">
        

        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              YouTube Channel Detail
            </h1>
          </div>
          <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap self-start sm:self-auto">
            <Download className="h-3.5 w-3.5 text-slate-400" /> Export Report
          </button>
        </div>

        {/* Main Grid: Info Area Left & Decision Panel Right */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-5 items-start">
          
          {/* Left Columns (Summary, Breakdown, Category details) */}
          <div className="xl:col-span-3 space-y-4 sm:space-y-5 w-full min-w-0">
            
            {/* Channel Info Card Header */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col md:flex-row gap-5 items-stretch">
              
              {/* Logo & Info */}
              <div className="flex-1 flex flex-col md:flex-row gap-4 items-start md:items-center min-w-0">
                {/* TechGearLab Logo */}
                <div className="h-20 w-20 rounded-full bg-slate-950 text-white flex items-center justify-center font-extrabold text-[12px] tracking-widest shrink-0 text-center uppercase p-1">
                  Tech<br/>Gear<br/>Lab
                </div>
                
                <div className="leading-tight space-y-2 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">TechGearLab</h2>
                    <ShieldCheck className="h-4.5 w-4.5 text-blue-500 fill-blue-50" />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    <span className="hover:underline cursor-pointer">@techgearlab</span> • United States
                  </div>
                  <p className="text-[11.5px] font-medium text-slate-500 leading-relaxed max-w-sm">
                    In-depth tech reviews and hands-on tests to help you buy the right gear.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Play className="h-3.5 w-3.5 text-red-500 fill-red-500 shrink-0" />
                      <span className="text-indigo-650 hover:underline cursor-pointer">YouTube Channel</span>
                    </span>
                    <span>•</span>
                    <span>Joined Mar 15, 2013</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-3 pt-0.5 text-[11px] font-semibold">
                    <div className="text-slate-400">
                      Primary Category: <span className="text-slate-800 font-bold">Electronics</span> <span className="text-indigo-600 font-bold hover:underline cursor-pointer text-[10px] ml-1">(Edit)</span>
                    </div>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <div className="text-slate-400">
                      Language: <span className="text-slate-800 font-bold">English</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5 shrink-0 justify-items-stretch">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subscribers</span>
                  <span className="text-lg font-extrabold text-slate-900 block mt-1">1.28M</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Videos</span>
                  <span className="text-lg font-extrabold text-slate-900 block mt-1">1,243</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Views</span>
                  <span className="text-lg font-extrabold text-slate-900 block mt-1">352M</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Views / Video</span>
                  <span className="text-lg font-extrabold text-slate-900 block mt-1">283K</span>
                </div>
              </div>

              {/* Overall Trust Score Card */}
              <div className="bg-[#FAFBFD] border border-slate-100 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-3xs shrink-0 md:w-36">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  Overall Trust Score <HelpCircle className="h-3 w-3" />
                </span>
                
                <div className="flex items-baseline gap-1 mt-2.5">
                  <span className="text-3xl font-black text-emerald-600">82</span>
                  <span className="text-xs text-slate-400 font-bold">/100</span>
                </div>
                
                <span className="text-[11px] text-emerald-600 font-extrabold uppercase mt-1">High Trust</span>
                <span className="text-[8.5px] text-slate-400 font-medium mt-1">Calculated May 18, 2024</span>
              </div>

              {/* Trust Score Trend Line Chart */}
              <div className="border border-slate-100 rounded-xl p-4 flex flex-col justify-between shrink-0 md:w-44 bg-white shadow-3xs select-none">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Trust Score Trend (90 Days)</span>
                
                {/* Inline SVG Chart */}
                <div className="h-14 w-full mt-2 relative">
                  <svg className="h-full w-full" viewBox="0 0 100 40">
                    <path
                      d="M0 32 L20 22 L40 28 L60 20 L80 14 L100 12"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Dots at graph points */}
                    <circle cx="0" cy="32" r="1.5" fill="#10B981" />
                    <circle cx="20" cy="22" r="1.5" fill="#10B981" />
                    <circle cx="40" cy="28" r="1.5" fill="#10B981" />
                    <circle cx="60" cy="20" r="1.5" fill="#10B981" />
                    <circle cx="80" cy="14" r="1.5" fill="#10B981" />
                    <circle cx="100" cy="12" r="2.5" fill="#10B981" />
                  </svg>
                </div>

                <div className="flex justify-between text-[8px] text-slate-400 font-bold mt-1">
                  <span>Feb 18</span>
                  <span>Mar 18</span>
                  <span>Apr 18</span>
                  <span>May 18</span>
                </div>
              </div>

            </div>

            {/* Grid Area: Trust Score Breakdown & Recent Videos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full">
              
              {/* Trust Score Breakdown */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                    Trust Score Breakdown <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                  </h3>
                  
                  <div className="space-y-2 mt-2.5">
                    {mockBreakdown.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700">
                          <span>{item.name}</span>
                          <span>{item.score} <span className="text-slate-400 font-medium">/ 100</span></span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.score}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last update box */}
                <div className="mt-3 bg-emerald-50/60 border border-emerald-100 rounded-lg p-2.5 text-[10.5px] font-medium text-emerald-800 leading-tight">
                  <span className="font-bold text-emerald-950 block mb-0.5">Score Last Updated: May 18, 2024 10:45 AM</span>
                  Scores are calculated using our YouTube reviewer trust model v2.1
                </div>
              </div>

              {/* Recent Product Review Videos */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex flex-col justify-between lg:col-span-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Recent Product Review Videos</h3>
                  <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-0.5 cursor-pointer">
                    View all videos <ChevronRight className="h-3 w-3" />
                  </span>
                </div>

                {/* Videos Scroll Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 flex-1">
                  {mockRecentVideos.map((video) => (
                    <div key={video.id} className="space-y-2 group min-w-0">
                      {video.thumbnail}
                      <div className="leading-tight min-w-0">
                        <span className="text-[11px] font-bold text-slate-800 hover:text-indigo-650 transition-colors cursor-pointer block line-clamp-2 min-h-[32px]">
                          {video.title}
                        </span>
                        <div className="text-[9.5px] text-slate-400 font-semibold mt-1 leading-normal">
                          <div className="block">{video.publishDate}</div>
                          <div className="block mt-0.5">{video.views} views</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Low Row Grid: Signals, Category Authority & History */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full">
              
              {/* Sponsorship Signals */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Sponsorship / Disclosure Signals</h3>
                  
                  <div className="space-y-3.5 mt-5">
                    {mockSponsorshipSignals.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-1.5 text-slate-655 font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-350 shrink-0"></span>
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-800 font-bold">{item.value}</span>
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[9.5px] font-extrabold border border-emerald-100">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-5 select-none">
                  <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center justify-center gap-0.5 cursor-pointer">
                    View sponsorship analysis <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              {/* Category Authority */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                    Category Authority <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                  </h3>

                  <div className="space-y-3.5 mt-5">
                    {mockCategoryAuthority.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700">
                          <div className="flex items-center gap-1">
                            <span>{item.name}</span>
                            <span className="text-[9px] font-extrabold text-emerald-600 uppercase ml-1">{item.level}</span>
                          </div>
                          <span>{item.score} <span className="text-slate-400 font-medium">/ 100</span></span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={cn(
                            "h-full rounded-full",
                            item.level === "High" ? "bg-emerald-500" : "bg-amber-500"
                          )} style={{ width: `${item.score}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-5 select-none">
                  <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center justify-center gap-0.5 cursor-pointer">
                    View full category breakdown <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              {/* Past Admin Decisions */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Past Admin Decisions</h3>
                  
                  <div className="relative pl-5 space-y-4 mt-5 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-150">
                    {mockDecisions.map((item, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <span className={cn(
                          "absolute -left-[19px] top-1.5 h-2 w-2 rounded-full ring-4",
                          item.status === "Trusted" ? "bg-emerald-500 ring-emerald-50" :
                          item.status === "Under Review" ? "bg-amber-500 ring-amber-50" : "bg-blue-500 ring-blue-50"
                        )}></span>
                        <div className="leading-tight">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "px-1.5 py-0.2 rounded text-[8.5px] font-extrabold uppercase border",
                              item.status === "Trusted" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                              item.status === "Under Review" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-blue-50 text-blue-600 border-blue-100"
                            )}>
                              {item.status}
                            </span>
                            <span className="text-xs font-bold text-slate-800">{item.title}</span>
                          </div>
                          <span className="text-[9.5px] text-slate-400 font-semibold block mt-1">
                            By {item.reviewer} • {item.date}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium block mt-1 italic leading-relaxed">
                            Note: {item.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-5 select-none">
                  <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center justify-center gap-0.5 cursor-pointer">
                    View full history <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

            </div>

            {/* Video Evidence (Latest 20 Videos Analyzed) */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden w-full min-w-0">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Video Evidence (Latest 20 Videos Analyzed)</h3>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[850px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3.5 px-4 w-[22%]">Video Title</th>
                      <th className="py-3.5 px-4 w-[10%]">Publish Date</th>
                      <th className="py-3.5 px-4 w-[10%]">Category</th>
                      <th className="py-3.5 px-4 w-[8%]">Views</th>
                      <th className="py-3.5 px-4 w-[8%]">Duration</th>
                      <th className="py-3.5 px-4 w-[12%]">Sponsorship</th>
                      <th className="py-3.5 px-4 w-[12%]">Disclosure</th>
                      <th className="py-3.5 px-4 w-[9%] text-center">Depth Score</th>
                      <th className="py-3.5 px-4 w-[9%] text-center">AI Relevance</th>
                      <th className="py-3.5 px-4 w-[10%] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {mockRecentVideos.slice(0, 3).map((video) => (
                      <tr key={video.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Small image placeholder */}
                            <div className="h-10 w-16 bg-slate-900 border border-slate-800 rounded shrink-0 flex items-center justify-center relative overflow-hidden select-none">
                              <Play className="h-3.5 w-3.5 text-white/80 fill-current z-10" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 truncate max-w-[240px] block hover:text-indigo-650 cursor-pointer">{video.title}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-500 font-medium">{video.publishDate}</td>
                        <td className="py-4 px-4 text-slate-655 font-medium">{video.category}</td>
                        <td className="py-4 px-4 text-slate-900">{video.views}</td>
                        <td className="py-4 px-4 text-slate-500 font-medium font-mono">{video.duration}</td>
                        <td className="py-4 px-4 select-none">
                          <span className={cn(
                            "inline-flex justify-center px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase border shadow-3xs",
                            video.sponsorship.startsWith("Yes") ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-slate-55 text-slate-500 border-slate-200"
                          )}>
                            {video.sponsorship}
                          </span>
                        </td>
                        <td className="py-4 px-4 select-none">
                          <span className={cn(
                            "inline-flex justify-center px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase border shadow-3xs",
                            video.disclosure === "Shown" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-55 text-slate-500 border-slate-200"
                          )}>
                            {video.disclosure}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold">
                          <span className="inline-flex px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded">
                            {video.depthScore}<span className="text-[9px] text-slate-400 font-medium">/100</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold">
                          <span className="inline-flex px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded">
                            {video.aiRelevanceScore}<span className="text-[9px] text-slate-400 font-medium">/100</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-white border-t border-slate-100 text-center select-none">
                <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center justify-center gap-0.5 cursor-pointer">
                  View all videos (1,243) <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>

          </div>

          {/* Right Sidebar Column: Decision Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-5 w-full shrink-0 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Decision Panel</h3>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase border shadow-3xs bg-amber-50 text-amber-500 border-amber-100"
                )}>
                  Pending
                </span>
              </div>

              {/* Status Radio Buttons Selector */}
              <div className="space-y-3.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Select Status</span>
                
                <label className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border border-slate-150 cursor-pointer transition select-none hover:bg-slate-50/50",
                  selectedStatus === "Pending" ? "bg-amber-50/20 border-amber-300" : ""
                )}>
                  <input
                    type="radio"
                    name="status"
                    checked={selectedStatus === "Pending"}
                    onChange={() => setSelectedStatus("Pending")}
                    className="mt-1 h-3.5 w-3.5 border-slate-350 text-amber-600 focus:ring-amber-500"
                  />
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-amber-655 block">Pending</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Awaiting admin decision</span>
                  </div>
                </label>

                <label className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border border-slate-150 cursor-pointer transition select-none hover:bg-slate-50/50",
                  selectedStatus === "Trusted" ? "bg-emerald-50/20 border-emerald-300" : ""
                )}>
                  <input
                    type="radio"
                    name="status"
                    checked={selectedStatus === "Trusted"}
                    onChange={() => setSelectedStatus("Trusted")}
                    className="mt-1 h-3.5 w-3.5 border-slate-350 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-emerald-600 block">Trusted</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Fully trusted across all categories</span>
                  </div>
                </label>

                <label className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border border-slate-150 cursor-pointer transition select-none hover:bg-slate-50/50",
                  selectedStatus === "Blocked" ? "bg-red-50/20 border-red-300" : ""
                )}>
                  <input
                    type="radio"
                    name="status"
                    checked={selectedStatus === "Blocked"}
                    onChange={() => setSelectedStatus("Blocked")}
                    className="mt-1 h-3.5 w-3.5 border-slate-350 text-red-655 focus:ring-red-500"
                  />
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-red-655 block">Blocked</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Blocked from being used as source</span>
                  </div>
                </label>

                <label className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border border-slate-150 cursor-pointer transition select-none hover:bg-slate-50/50",
                  selectedStatus === "Category" ? "bg-blue-50/20 border-blue-300" : ""
                )}>
                  <input
                    type="radio"
                    name="status"
                    checked={selectedStatus === "Category"}
                    onChange={() => setSelectedStatus("Category")}
                    className="mt-1 h-3.5 w-3.5 border-slate-350 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="leading-tight">
                    <span className="text-xs font-bold text-blue-650 block">Trusted for Category</span>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Trusted only for selected categories</span>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actions</span>
                
                <button className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-250 rounded-lg transition shadow-3xs">
                  <ShieldCheck className="h-4 w-4" /> Approve as Trusted
                </button>
                
                <button className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-red-655 bg-red-50 hover:bg-red-100/70 border border-red-250 rounded-lg transition shadow-3xs">
                  <AlertTriangle className="h-3.5 w-3.5" /> Block Channel
                </button>
                
                <button className="w-full flex items-center justify-center gap-1.5 h-9 text-xs font-bold text-blue-650 bg-blue-50 hover:bg-blue-100/70 border border-blue-250 rounded-lg transition shadow-3xs">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Trust only for Category
                </button>
              </div>
            </div>

            {/* Note addition */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Admin Notes</span>
              
              <div className="relative">
                <textarea
                  rows={4}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value.slice(0, 1000))}
                  placeholder="Add a note about this channel..."
                  className="w-full bg-slate-55 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:bg-white focus:border-slate-350 transition-colors resize-none placeholder:text-slate-400 font-medium"
                />
                <span className="absolute bottom-1.5 right-2 text-[8.5px] font-bold text-slate-400">
                  {adminNote.length} / 1000
                </span>
              </div>

              <button
                disabled={!adminNote}
                className={cn(
                  "w-full h-8.5 text-xs font-bold rounded-lg shadow-sm transition",
                  adminNote
                    ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                )}
              >
                Save Note
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
