"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  Play,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Check,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Package,
  AlertCircle,
  HelpCircle,
  Brain,
  Edit
} from "lucide-react";

interface RepresentativeSnippets {
  positive: string[];
  negative: string[];
}

interface ProsConsItem {
  id: string;
  productName: string;
  brand: string;
  category: string;
  topPros: string[];
  topCons: string[];
  trustScore: number;
  confidence: "High" | "Medium" | "Low";
  sourcesCount: number;
  sourcesList: string[];
  status: "Pending" | "Needs Review" | "Approved" | "Escalated";
  thumbnail: React.ReactNode;
  aiSummary: string;
  mentionsCount: number;
  prosPercent: number;
  consPercent: number;
  representativeSnippets: RepresentativeSnippets;
}

const HeadphoneIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-blue-600 bg-blue-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <path d="M6 18c0-5.5 4.5-10 10-10s10 4.5 10 10M6 18h4v6H6v-6zm16 0h4v6h-4v-6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CreamIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-emerald-600 bg-emerald-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="10" y="10" width="12" height="15" rx="2" fill="currentColor" opacity="0.8" />
    <path d="M12 10v-3h8v3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const FryerIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-amber-600 bg-amber-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="8" y="10" width="16" height="15" rx="3" fill="currentColor" opacity="0.8" />
    <circle cx="16" cy="15" r="2.5" fill="#fff" />
  </svg>
);

const AirPodsIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-indigo-600 bg-indigo-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <path d="M9 10a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0M17 10a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-slate-600 bg-slate-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="6" y="8" width="20" height="13" rx="1.5" fill="currentColor" opacity="0.8" />
    <path d="M12 21h8M16 21v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PotIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-purple-600 bg-purple-50 rounded-lg p-1.5 border border-slate-150 shrink-0">
    <rect x="8" y="12" width="16" height="12" rx="2" fill="currentColor" opacity="0.8" />
    <path d="M12 12V9h8v3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const mockItems: ProsConsItem[] = [
  {
    id: "1",
    productName: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Headphones",
    topPros: [
      "Excellent noise cancellation",
      "Superior sound quality",
      "Long battery life (30+ hours)",
      "Comfortable over-ear design",
      "Premium build quality"
    ],
    topCons: [
      "High price compared to competitors",
      "Slightly heavy for extended use",
      "No foldable design",
      "Touch controls can be finicky",
      "Limited color options"
    ],
    trustScore: 87,
    confidence: "High",
    sourcesCount: 4,
    sourcesList: ["Amazon", "Best Buy", "Walmart", "YouTube Reviews"],
    status: "Pending",
    thumbnail: <HeadphoneIcon />,
    aiSummary: "Customers are highly satisfied with the Sony WH-1000XM5 for its industry-leading noise cancellation, sound quality, and long battery life. The main concerns are the premium price and slight weight during extended use.",
    mentionsCount: 1248,
    prosPercent: 57,
    consPercent: 43,
    representativeSnippets: {
      positive: [
        "Best noise cancellation I've ever used. Blocks out everything.",
        "Battery lasts forever. I get a week on a single charge.",
        "Sound quality is phenomenal, especially with LDAC."
      ],
      negative: [
        "Too expensive for what it is.",
        "A bit heavy after a few hours of use.",
        "Wish it folded for easier travel."
      ]
    }
  },
  {
    id: "2",
    productName: "Apple AirPods Pro",
    brand: "Apple",
    category: "Earbuds",
    topPros: [
      "Great sound quality",
      "Seamless pairing",
      "Adaptive transparency",
      "Comfortable fit"
    ],
    topCons: [
      "Expensive",
      "Battery life avg.",
      "Case scratches easily"
    ],
    trustScore: 82,
    confidence: "High",
    sourcesCount: 5,
    sourcesList: ["Amazon", "Best Buy", "Walmart", "Target", "Apple Store"],
    status: "Needs Review",
    thumbnail: <AirPodsIcon />,
    aiSummary: "The Apple AirPods Pro receive widespread praise for their seamless integration with iOS devices and excellent active noise cancellation. However, average battery life remains a point of criticism.",
    mentionsCount: 954,
    prosPercent: 60,
    consPercent: 40,
    representativeSnippets: {
      positive: [
        "Seamless integration with my iPhone.",
        "The transparency mode feels incredibly natural.",
        "Extremely comfortable for daily workouts."
      ],
      negative: [
        "Battery runs down faster than expected.",
        "Charging case got scratched in my pocket on day one.",
        "Replacement tips are expensive."
      ]
    }
  },
  {
    id: "3",
    productName: "Ninja Air Fryer AF101",
    brand: "Ninja",
    category: "Air Fryers",
    topPros: [
      "Crispy results",
      "Easy to use",
      "Fast preheating",
      "Dishwasher safe parts"
    ],
    topCons: [
      "Loud beeping",
      "Bulky size",
      "Plastic smell initially"
    ],
    trustScore: 78,
    confidence: "Medium",
    sourcesCount: 4,
    sourcesList: ["Amazon", "Best Buy", "Walmart", "Target"],
    status: "Approved",
    thumbnail: <FryerIcon />,
    aiSummary: "Users highly rate the Ninja Air Fryer AF101 for delivering crispy and quick meals with minimal effort. Minor complaints focus on initial setup odors and a loud alert buzzer.",
    mentionsCount: 712,
    prosPercent: 65,
    consPercent: 35,
    representativeSnippets: {
      positive: [
        "Cooks fries to perfect crispiness without oil.",
        "Cleaning is a breeze, nonstick basket is great.",
        "Very quick cooking compared to my oven."
      ],
      negative: [
        "The initial plastic smell took 3 washes to go away.",
        "Takes up a lot of space on the kitchen counter.",
        "Beeping sound is loud and cannot be disabled."
      ]
    }
  },
  {
    id: "4",
    productName: "CeraVe Moisturizing Cream",
    brand: "CeraVe",
    category: "Skincare",
    topPros: [
      "Hydrating; gentle on skin",
      "Dermatologist recommended",
      "Fragrance-free",
      "Contains ceramides"
    ],
    topCons: [
      "Too thick; takes time to absorb",
      "Tub packaging is unhygienic",
      "Heavier feel for summer"
    ],
    trustScore: 76,
    confidence: "Medium",
    sourcesCount: 6,
    sourcesList: ["Amazon", "CVS", "Walgreens", "Walmart", "Target", "Ulta"],
    status: "Approved",
    thumbnail: <CreamIcon />,
    aiSummary: "CeraVe Moisturizing Cream is widely celebrated for its deep hydration capabilities and gentle formula suitable for sensitive skin. Some users find the thick texture heavy.",
    mentionsCount: 1845,
    prosPercent: 70,
    consPercent: 30,
    representativeSnippets: {
      positive: [
        "Only cream that doesn't trigger my eczema.",
        "Keeps my skin hydrated through cold dry winters.",
        "Dermatologist recommended and absolutely works."
      ],
      negative: [
        "It's a bit too heavy under makeup.",
        "Really wish it came with a pump instead of a tub.",
        "Takes too long to sink into the skin."
      ]
    }
  },
  {
    id: "5",
    productName: "LG 27-inch Monitor",
    brand: "LG",
    category: "Monitors",
    topPros: [
      "Sharp display",
      "Good color accuracy",
      "Thin bezels",
      "Great refresh rate"
    ],
    topCons: [
      "Limited ergonomics",
      "No built-in speakers",
      "Stand is wobbly"
    ],
    trustScore: 74,
    confidence: "Medium",
    sourcesCount: 3,
    sourcesList: ["Amazon", "Best Buy", "Newegg"],
    status: "Escalated",
    thumbnail: <MonitorIcon />,
    aiSummary: "The LG 27-inch Monitor offers crisp graphics and exceptional color accuracy, making it ideal for creative professionals. The static wobbly stand is its primary drawback.",
    mentionsCount: 628,
    prosPercent: 62,
    consPercent: 38,
    representativeSnippets: {
      positive: [
        "Color accuracy is perfect out of the box.",
        "IPS panel is gorgeous with very wide viewing angles.",
        "G-Sync works flawlessly for gaming."
      ],
      negative: [
        "Stand is wobbly and only has simple tilt adjustment.",
        "Speakers are completely missing from this model.",
        "HDR mode is too dim to be useful."
      ]
    }
  },
  {
    id: "6",
    productName: "Instant Pot Duo",
    brand: "Instant Pot",
    category: "Pressure Cookers",
    topPros: [
      "Versatile; time-saving",
      "Large capacity",
      "Safe pressure release"
    ],
    topCons: [
      "Learning curve",
      "Sealing issues over time",
      "Bulky to clean"
    ],
    trustScore: 71,
    confidence: "Low",
    sourcesCount: 5,
    sourcesList: ["Amazon", "Best Buy", "Walmart", "Kohl's", "Target"],
    status: "Needs Review",
    thumbnail: <PotIcon />,
    aiSummary: "The Instant Pot Duo is highly rated for its versatility, performing the functions of seven appliances in one. Beginners report a steep initial learning curve.",
    mentionsCount: 1430,
    prosPercent: 68,
    consPercent: 32,
    representativeSnippets: {
      positive: [
        "Cooks rice, beans, and meat incredibly fast.",
        "Set it and forget it makes weeknight dinners easy.",
        "Saute function works great before pressure cooking."
      ],
      negative: [
        "The instruction manual is confusing for beginners.",
        "Sealing ring absorbs food odors permanently.",
        "The lid is heavy and awkward to clean."
      ]
    }
  }
];

export default function ProsConsReview() {
  const [selectedItem, setSelectedItem] = useState<ProsConsItem>(mockItems[0]);
  const [notes, setNotes] = useState<string>("");

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-1 overflow-x-hidden">
      <div className="w-full max-w-full min-w-0 px-3 sm:px-4 md:px-5 pt-4 md:pt-6 pb-1 md:pb-2 space-y-4 md:space-y-6 overflow-x-hidden">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              Pros / Cons Review
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              Review extracted customer sentiment themes, validate pros and cons summaries, and approve product-facing review insights before publishing.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <RefreshCw className="h-3.5 w-3.5 text-slate-400" /> Refresh Extraction
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition whitespace-nowrap">
              <Play className="h-3.5 w-3.5 text-slate-400 fill-current" /> Run Re-analysis
            </button>
            <button className="flex justify-center items-center gap-1.5 h-9 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap">
              <Download className="h-3.5 w-3.5" /> Export Review Summary
            </button>
          </div>
        </div>

        {/* 6 Stats KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-3.5 w-full min-w-0">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Products Reviewed</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">1,264</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ▲ 16% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-3.5 w-full min-w-0">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ThumbsUp className="h-5 w-5 fill-emerald-50" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Auto-extracted Pros</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">4,982</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ▲ 12% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-3.5 w-full min-w-0">
            <div className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <ThumbsDown className="h-5 w-5 fill-red-50" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Auto-extracted Cons</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">3,741</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ▲ 9% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-3.5 w-full min-w-0">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Needs Manual Review</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">86</span>
              <span className="text-[9px] text-red-500 font-bold block">
                ▼ 5% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-3.5 w-full min-w-0">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Low Confidence</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">42</span>
              <span className="text-[9px] text-red-500 font-bold block">
                ▼ 8% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-3.5 w-full min-w-0">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg. Approval Time</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">19m 12s</span>
              <span className="text-[9px] text-emerald-600 font-bold block">
                ▼ 6% <span className="text-slate-400 font-medium">vs prior 7 days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch lg:items-start">
          
          {/* Left Column: Queue Table */}
          <div className="flex-1 w-full min-w-0 space-y-4 sm:space-y-5">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden w-full min-w-0">
              {/* Header inside card */}
              <div className="flex items-center justify-between p-4 pb-2 select-none border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">Pros / Cons Queue</h2>
                  <span className="px-1.5 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                    86 pending
                  </span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3 w-full p-4 select-none">
                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs min-w-[120px]">
                    <option>Risk Level</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs min-w-[110px]">
                    <option>Source</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs min-w-[120px]">
                    <option>Category</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs min-w-[120px]">
                    <option>Confidence</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 min-w-[180px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search product or pattern..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-slate-350 transition-colors shadow-3xs font-medium"
                  />
                </div>

                <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-3xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[900px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3.5 px-4 w-[4%] text-center">
                        <input type="checkbox" className="rounded border-slate-350 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-3.5 px-4 w-[22%]">Product</th>
                      <th className="py-3.5 px-4 w-[12%]">Category</th>
                      <th className="py-3.5 px-4 w-[18%]">Top Pros</th>
                      <th className="py-3.5 px-4 w-[18%]">Top Cons</th>
                      <th className="py-3.5 px-4 w-[10%] text-center">Trust Score</th>
                      <th className="py-3.5 px-4 w-[8%] text-center">Confidence</th>
                      <th className="py-3.5 px-4 w-[6%] text-center">Sources</th>
                      <th className="py-3.5 px-4 w-[8%] text-center">Status</th>
                      <th className="py-3.5 px-4 w-[6%] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {mockItems.map((item) => {
                      const isSelected = item.id === selectedItem.id;
                      return (
                        <tr
                          key={item.id}
                          className={cn(
                            "hover:bg-slate-50/40 transition-colors cursor-pointer",
                            isSelected ? "bg-blue-50/40" : ""
                          )}
                          onClick={() => setSelectedItem(item)}
                        >
                          <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => setSelectedItem(item)}
                              className="rounded border-slate-350 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {item.thumbnail}
                              <div className="leading-tight min-w-0">
                                <span className="text-xs font-bold text-slate-900 block truncate max-w-[130px]">{item.productName}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-slate-550 font-medium">
                            {item.category}
                          </td>

                          <td className="py-4 px-4 text-slate-600 font-medium max-w-[150px] truncate">
                            {item.topPros[0]}
                          </td>

                          <td className="py-4 px-4 text-slate-600 font-medium max-w-[150px] truncate">
                            {item.topCons[0]}
                          </td>

                          <td className="py-4 px-4 text-center select-none" onClick={(e) => e.stopPropagation()}>
                            <span className={cn(
                              "inline-flex justify-center items-center w-9 h-6 rounded text-xs font-black shadow-3xs",
                              item.trustScore < 75 ? "bg-red-50 text-red-555 border border-red-100" :
                              item.trustScore < 80 ? "bg-amber-50 text-amber-550 border border-amber-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            )}>
                              {item.trustScore}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-center select-none">
                            <span className={cn(
                              "inline-flex justify-center px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase border shadow-3xs",
                              item.confidence === "High" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                              item.confidence === "Medium" && "bg-amber-50 text-amber-550 border-amber-100",
                              item.confidence === "Low" && "bg-red-50 text-red-655 border-red-100"
                            )}>
                              {item.confidence}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-center font-bold">
                            {item.sourcesCount}
                          </td>

                          <td className="py-4 px-4 text-center select-none" onClick={(e) => e.stopPropagation()}>
                            <span className={cn(
                              "inline-flex justify-center px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase shadow-3xs",
                              item.status === "Pending" && "bg-amber-50 text-amber-550 border border-amber-100",
                              item.status === "Needs Review" && "bg-blue-50 text-[#4F46E5] border border-blue-100",
                              item.status === "Approved" && "bg-emerald-50 text-emerald-600 border border-emerald-100",
                              item.status === "Escalated" && "bg-red-50 text-red-655 border border-red-100"
                            )}>
                              {item.status}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white">
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                              <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white">
                                <MoreVertical className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table pagination footer */}
              <div className="px-4 py-3 border-t border-slate-150 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-400 font-bold select-none text-[11px]">
                <span>Showing 1 to 6 of 86 entries</span>
                
                <div className="flex items-center gap-1">
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="h-7 w-7 rounded bg-[#4F46E5] text-white flex items-center justify-center font-bold">1</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">2</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">3</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">4</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">5</button>
                  <span className="px-1 text-slate-300">...</span>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">15</button>
                  <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Detail Card */}
          <div className="w-full lg:w-[460px] xl:w-[480px] space-y-4 sm:space-y-5 shrink-0 flex flex-col">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs flex flex-col h-[625px] overflow-hidden">
              {/* Header */}
              <div className="p-5 pb-3 flex justify-between items-start select-none shrink-0 border-b border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Pros / Cons Detail</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Confidence</span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase border shadow-3xs",
                    selectedItem.confidence === "High" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                    selectedItem.confidence === "Medium" && "bg-amber-50 text-amber-550 border-amber-100",
                    selectedItem.confidence === "Low" && "bg-red-50 text-red-655 border-red-100"
                  )}>
                    {selectedItem.confidence}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                
                {/* Product Name Info */}
                <div className="flex items-start gap-3.5 border-b border-slate-100 pb-3">
                  {selectedItem.thumbnail}
                  <div className="leading-tight min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{selectedItem.productName}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 truncate">{selectedItem.brand} • {selectedItem.category}</span>
                    <span className="text-[9px] text-slate-400 font-medium block mt-1">
                      Sources: <span className="text-slate-600 font-bold">{selectedItem.sourcesList.join(" • ")}</span>
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 select-none">
                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center w-[75px] shadow-3xs">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wide block leading-none">Trust Score</span>
                      <span className="text-sm font-black text-emerald-600 block mt-1 leading-none">{selectedItem.trustScore} <span className="text-[8px] text-slate-400 font-medium">/100</span></span>
                    </div>
                  </div>
                </div>

                {/* AI Summary Preview */}
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3.5 space-y-1 relative overflow-hidden leading-relaxed">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#4F46E5] uppercase tracking-wider">
                    <Brain className="h-3.5 w-3.5 fill-blue-50 text-[#4F46E5] shrink-0" />
                    AI Summary Preview
                  </div>
                  <p className="text-[11px] font-semibold text-slate-800 mt-1">
                    {selectedItem.aiSummary}
                  </p>
                </div>

                {/* Pros and Cons Split List */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  {/* Pros */}
                  <div className="space-y-2">
                    <h5 className="text-[9.5px] font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3 fill-emerald-50 text-emerald-600" /> Top Pros
                    </h5>
                    <ul className="space-y-1.5 text-[9.5px] font-semibold text-slate-700">
                      {selectedItem.topPros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-1.5 leading-normal">
                          <Check className="h-3.5 w-3.5 text-emerald-600 bg-emerald-50 rounded-full p-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="space-y-2">
                    <h5 className="text-[9.5px] font-extrabold text-red-500 uppercase tracking-wider flex items-center gap-1">
                      <ThumbsDown className="h-3 w-3 fill-red-50 text-red-500" /> Top Cons
                    </h5>
                    <ul className="space-y-1.5 text-[9.5px] font-semibold text-slate-700">
                      {selectedItem.topCons.map((con, index) => (
                        <li key={index} className="flex items-start gap-1.5 leading-normal">
                          <span className="h-3.5 w-3.5 text-red-600 bg-red-50 rounded-full flex items-center justify-center font-black text-[10px] shrink-0">-</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pros vs Cons Balance Slider Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-655">
                    <span className="text-emerald-600 font-extrabold">Pros vs Cons Balance</span>
                    <span className="text-slate-400 font-medium">Based on {selectedItem.mentionsCount.toLocaleString()} extracted mentions</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-emerald-600">{selectedItem.prosPercent}%</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full" style={{ width: `${selectedItem.prosPercent}%` }}></div>
                      <div className="bg-red-500 h-full" style={{ width: `${selectedItem.consPercent}%` }}></div>
                    </div>
                    <span className="text-xs font-black text-red-500">{selectedItem.consPercent}%</span>
                  </div>
                </div>

                {/* Reviewer Notes Textarea */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9.5px] font-bold text-slate-500">
                    <span className="uppercase tracking-wide">Reviewer Notes</span>
                    <span>{notes.length}/500</span>
                  </div>
                  <textarea
                    placeholder="Add internal notes about this summary..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, 500))}
                    className="w-full h-16 p-2 bg-white border border-slate-200 rounded-lg text-[10.5px] font-medium text-slate-800 outline-none focus:border-slate-350 transition-colors shadow-3xs"
                  />
                </div>

                {/* Evidence Sources List */}
                <div className="space-y-1.5">
                  <h5 className="text-[9.5px] font-extrabold text-slate-800 uppercase tracking-wider">Evidence Sources</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.sourcesList.map((src, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[8.5px] font-bold bg-slate-100 text-slate-600 border border-slate-200/50 shadow-3xs">
                        {src}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-[8.5px] font-bold bg-blue-50 text-blue-600 border border-blue-100 shadow-3xs">
                      Expert Reviews
                    </span>
                    <span className="px-2 py-0.5 rounded text-[8.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-3xs">
                      Verified Reviews
                    </span>
                  </div>
                </div>

                {/* Representative Snippets */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <span className="text-[9.5px] font-extrabold text-slate-800 uppercase tracking-wider block">Positive ({selectedItem.representativeSnippets.positive.length})</span>
                    <div className="space-y-1.5">
                      {selectedItem.representativeSnippets.positive.map((snip, idx) => (
                        <div key={idx} className="bg-slate-50/60 border border-slate-100 rounded-lg p-2 text-[9px] font-medium text-slate-600 italic leading-snug">
                          "{snip}"
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9.5px] font-extrabold text-slate-800 uppercase tracking-wider block">Negative ({selectedItem.representativeSnippets.negative.length})</span>
                    <div className="space-y-1.5">
                      {selectedItem.representativeSnippets.negative.map((snip, idx) => (
                        <div key={idx} className="bg-slate-50/60 border border-slate-100 rounded-lg p-2 text-[9px] font-medium text-slate-600 italic leading-snug">
                          "{snip}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 justify-between select-none shrink-0 bg-slate-50/50">
                <button className="flex-1 min-w-[110px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition">
                  <Check className="h-4 w-4" /> Approve Summary
                </button>
                <button className="flex-1 min-w-[105px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition shadow-sm">
                  <Edit className="h-3.5 w-3.5" /> Edit Pros / Cons
                </button>
                <button className="flex-1 min-w-[110px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-red-600 rounded-lg transition shadow-sm">
                  <XCircle className="h-3.5 w-3.5" /> Reject Summary
                </button>
                <button className="flex-1 min-w-[120px] flex items-center justify-center gap-1 h-9 text-xs font-bold text-white bg-orange-500 rounded-lg transition shadow-sm">
                  <Brain className="h-3.5 w-3.5" /> Send to AI Review
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Rows: 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
          
          {/* Pros / Cons Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between select-none">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Pros / Cons Breakdown</h3>
            
            <div className="flex items-center justify-center gap-6 mt-4">
              {/* Donut Graphic */}
              <div className="relative h-24 w-24 flex items-center justify-center shrink-0">
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes rotate-in {
                    from {
                      transform: rotate(-270deg) scale(0.5);
                      opacity: 0;
                    }
                    to {
                      transform: rotate(0deg) scale(1);
                      opacity: 1;
                    }
                  }
                  @keyframes draw-pie {
                    from {
                      stroke-dasharray: 0 100;
                    }
                  }
                  .animate-donut-wrapper {
                    animation: rotate-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    transform-origin: center;
                  }
                  .animate-segment {
                    animation: draw-pie 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                  }
                `}} />
                <div className="h-full w-full animate-donut-wrapper">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F5F9" strokeWidth="4.5" />
                    {/* Positive Quality (blue) 40.5% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4.5" strokeDasharray="40.5 59.5" strokeDashoffset="0" className="animate-segment" />
                    {/* Price Concern (red) 24.1% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeDasharray="24.1 75.9" strokeDashoffset="-40.5" className="animate-segment" />
                    {/* Usability (green) 18.3% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4.5" strokeDasharray="18.3 81.7" strokeDashoffset="-64.6" className="animate-segment" />
                    {/* Durability (yellow) 9.4% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="9.4 90.6" strokeDashoffset="-82.9" className="animate-segment" />
                    {/* Comfort (purple) 4.6% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8B5CF6" strokeWidth="4.5" strokeDasharray="4.6 95.4" strokeDashoffset="-92.3" className="animate-segment" />
                    {/* Reliability (pink) 3.0% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EC4899" strokeWidth="4.5" strokeDasharray="3.0 97.0" strokeDashoffset="-96.9" className="animate-segment" />
                  </svg>
                </div>
                <div className="absolute text-center leading-none">
                  <span className="text-base font-extrabold text-slate-900 block">4,982</span>
                  <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5 block">Total Themes</span>
                </div>
              </div>

              {/* Legends list */}
              <div className="space-y-1 text-[9px] font-bold text-slate-655 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0"></span>
                    <span>Positive Quality</span>
                  </div>
                  <span className="text-slate-900">2,018 <span className="text-slate-400 font-medium">(40.5%)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500 shrink-0"></span>
                    <span>Price Concern</span>
                  </div>
                  <span className="text-slate-900">1,204 <span className="text-slate-400 font-medium">(24.1%)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>Usability</span>
                  </div>
                  <span className="text-slate-900">912 <span className="text-slate-400 font-medium">(18.3%)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 shrink-0"></span>
                    <span>Durability</span>
                  </div>
                  <span className="text-slate-900">468 <span className="text-slate-400 font-medium">(9.4%)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-500 shrink-0"></span>
                    <span>Comfort</span>
                  </div>
                  <span className="text-slate-900">230 <span className="text-slate-400 font-medium">(4.6%)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-pink-500 shrink-0"></span>
                    <span>Reliability</span>
                  </div>
                  <span className="text-slate-900">150 <span className="text-slate-400 font-medium">(3.0%)</span></span>
                </div>
              </div>
            </div>

            <button className="w-full text-center text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4">
              View full breakdown →
            </button>
          </div>

          {/* Extraction Quality Checklist */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between select-none">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Extraction Quality Checklist</h3>
            
            <div className="space-y-3.5 mt-4 flex-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>Themes are non-duplicative</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100">Pass</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>Claims are source-backed</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100">Pass</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>Sentiment wording is balanced</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100">Pass</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>Low-confidence phrases flagged</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100">Pass</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-3xs shrink-0 select-none">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>No policy violations detected</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100">Pass</span>
              </div>
            </div>

            <button className="w-full text-center text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] transition mt-4">
              View quality rules →
            </button>
          </div>

          {/* Recent Decisions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs select-none flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Recent Decisions</h3>
                <span className="text-[10px] font-bold text-[#4F46E5] hover:text-[#4338CA] cursor-pointer">View all →</span>
              </div>

              <div className="divide-y divide-slate-100 text-[10.5px]">
                
                {/* Decision 1 */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <CreamIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">CeraVe Moisturizing Cream</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Approved by Sarah K.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Approved</span>
                    <span className="text-slate-400 font-semibold text-[9px]">15m ago</span>
                  </div>
                </div>

                {/* Decision 2 */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <MonitorIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">LG 27-inch Monitor</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Rejected by James L.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-red-50 text-red-655 border border-red-100">Rejected</span>
                    <span className="text-slate-400 font-semibold text-[9px]">32m ago</span>
                  </div>
                </div>

                {/* Decision 3 */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <PotIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">Instant Pot Duo</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Sent to AI Review by Priya M.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-orange-50 text-orange-600 border border-orange-100">AI Review</span>
                    <span className="text-slate-400 font-semibold text-[9px]">1h ago</span>
                  </div>
                </div>

                {/* Decision 4 */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <AirPodsIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">Apple AirPods Pro</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate">Approved by Sarah K.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">Approved</span>
                    <span className="text-slate-400 font-semibold text-[9px]">2h ago</span>
                  </div>
                </div>

                {/* Decision 5 */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <FryerIcon />
                    <div className="leading-tight min-w-0">
                      <span className="text-slate-800 font-bold block truncate">Ninja Air Fryer AF101</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 truncate font-semibold">Needs Review by Mark T.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-blue-50 text-[#4F46E5] border border-blue-100">Needs Review</span>
                    <span className="text-slate-400 font-semibold text-[9px]">3h ago</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
