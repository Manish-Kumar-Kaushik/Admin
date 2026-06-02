"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Download,
  Info,
  Search,
  CheckCircle2,
  MinusCircle,
  FileText,
  Barcode,
  Layers,
  HelpCircle,
} from "lucide-react";

interface SourceRow {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sourceType: "Retailer review" | "Expert review" | "YouTube" | "Price history" | "User receipt" | "Ingredient data" | "Nutrition data";
  sourceName: string;
  sourceLogo: string;
  sourceLogoText?: string;
  sourceLogoBg?: string;
  sourceLogoTextColor?: string;
  retrievedAt: string;
  retrievedTimestamp: number;
  usedInVerdict: boolean;
  licenseStatus: "Licensed" | "Private" | "CC BY-SA" | "Public Domain";
  confidence: number;
}

export default function SourceHistory() {
  // Mock Data
  const initialSources: SourceRow[] = [
    {
      id: "SRC_884512_0001",
      productId: "884512",
      productName: "Apple AirPods Pro (2nd Gen)",
      productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80",
      sourceType: "Retailer review",
      sourceName: "Amazon Customer Review",
      sourceLogo: "a",
      sourceLogoBg: "bg-[#FF9900]/10 border-[#FF9900]/20",
      sourceLogoTextColor: "text-[#FF9900]",
      retrievedAt: "May 20, 2024 10:15 AM",
      retrievedTimestamp: 1716199500000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.92,
    },
    {
      id: "SRC_884512_0002",
      productId: "884512",
      productName: "Apple AirPods Pro (2nd Gen)",
      productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80",
      sourceType: "Expert review",
      sourceName: "RTINGS.com Review",
      sourceLogo: "R",
      sourceLogoBg: "bg-red-50 border-red-150",
      sourceLogoTextColor: "text-red-650 font-extrabold",
      retrievedAt: "May 20, 2024 10:14 AM",
      retrievedTimestamp: 1716199440000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.95,
    },
    {
      id: "SRC_884512_0003",
      productId: "884512",
      productName: "Apple AirPods Pro (2nd Gen)",
      productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80",
      sourceType: "YouTube",
      sourceName: "Dave2D Review",
      sourceLogo: "D",
      sourceLogoBg: "bg-rose-600 border-rose-700",
      sourceLogoTextColor: "text-white font-black",
      retrievedAt: "May 20, 2024 10:12 AM",
      retrievedTimestamp: 1716199320000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.88,
    },
    {
      id: "SRC_884512_0004",
      productId: "884512",
      productName: "Apple AirPods Pro (2nd Gen)",
      productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80",
      sourceType: "Price history",
      sourceName: "CamelCamelCamel",
      sourceLogo: "C",
      sourceLogoBg: "bg-amber-100 border-amber-250",
      sourceLogoTextColor: "text-amber-800 font-extrabold",
      retrievedAt: "May 20, 2024 10:11 AM",
      retrievedTimestamp: 1716199260000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.90,
    },
    {
      id: "SRC_884512_0005",
      productId: "884512",
      productName: "Apple AirPods Pro (2nd Gen)",
      productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80",
      sourceType: "Retailer review",
      sourceName: "Best Buy Customer Review",
      sourceLogo: "B",
      sourceLogoBg: "bg-blue-50 border-blue-200",
      sourceLogoTextColor: "text-blue-700 font-bold",
      retrievedAt: "May 20, 2024 10:09 AM",
      retrievedTimestamp: 1716199140000,
      usedInVerdict: false,
      licenseStatus: "Licensed",
      confidence: 0.74,
    },
    {
      id: "SRC_773311_0001",
      productId: "773311",
      productName: "Dyson V15 Detect",
      productImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=120&q=80",
      sourceType: "Expert review",
      sourceName: "Wirecutter Review",
      sourceLogo: "T",
      sourceLogoBg: "bg-slate-900 border-slate-950",
      sourceLogoTextColor: "text-white font-serif",
      retrievedAt: "May 20, 2024 10:08 AM",
      retrievedTimestamp: 1716199080000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.93,
    },
    {
      id: "SRC_773311_0002",
      productId: "773311",
      productName: "Dyson V15 Detect",
      productImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=120&q=80",
      sourceType: "YouTube",
      sourceName: "Vacuum Wars",
      sourceLogo: "V",
      sourceLogoBg: "bg-red-500 border-red-650",
      sourceLogoTextColor: "text-white font-bold",
      retrievedAt: "May 20, 2024 10:07 AM",
      retrievedTimestamp: 1716199020000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.86,
    },
    {
      id: "SRC_662211_0001",
      productId: "662211",
      productName: "Sony WH-1000XM5",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80",
      sourceType: "Retailer review",
      sourceName: "Amazon Customer Review",
      sourceLogo: "a",
      sourceLogoBg: "bg-[#FF9900]/10 border-[#FF9900]/20",
      sourceLogoTextColor: "text-[#FF9900]",
      retrievedAt: "May 20, 2024 10:05 AM",
      retrievedTimestamp: 1716198900000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.91,
    },
    {
      id: "SRC_662211_0002",
      productId: "662211",
      productName: "Sony WH-1000XM5",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80",
      sourceType: "YouTube",
      sourceName: "Z Reviews",
      sourceLogo: "Z",
      sourceLogoBg: "bg-amber-500 border-amber-600",
      sourceLogoTextColor: "text-black font-black",
      retrievedAt: "May 20, 2024 10:04 AM",
      retrievedTimestamp: 1716198840000,
      usedInVerdict: true,
      licenseStatus: "Licensed",
      confidence: 0.87,
    },
    {
      id: "SRC_551122_0001",
      productId: "551122",
      productName: "Ninja AF101 Air Fryer",
      productImage: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=120&q=80",
      sourceType: "Retailer review",
      sourceName: "Walmart Customer Review",
      sourceLogo: "W",
      sourceLogoBg: "bg-sky-50 border-sky-150",
      sourceLogoTextColor: "text-sky-600 font-black",
      retrievedAt: "May 20, 2024 10:03 AM",
      retrievedTimestamp: 1716198780000,
      usedInVerdict: false,
      licenseStatus: "Licensed",
      confidence: 0.68,
    },
    {
      id: "SRC_651122_0002",
      productId: "551122",
      productName: "Ninja AF101 Air Fryer",
      productImage: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=120&q=80",
      sourceType: "User receipt",
      sourceName: "User Receipt Upload",
      sourceLogo: "F",
      sourceLogoBg: "bg-indigo-50 border-indigo-150",
      sourceLogoTextColor: "text-indigo-650",
      retrievedAt: "May 20, 2024 09:59 AM",
      retrievedTimestamp: 1716198540000,
      usedInVerdict: true,
      licenseStatus: "Private",
      confidence: 0.98,
    },
    {
      id: "SRC_331100_0001",
      productId: "331100",
      productName: "Optimum Nutrition Gold Whey",
      productImage: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=120&q=80",
      sourceType: "Ingredient data",
      sourceName: "OpenFoodFacts",
      sourceLogo: "O",
      sourceLogoBg: "bg-emerald-50 border-emerald-150",
      sourceLogoTextColor: "text-emerald-700 font-bold",
      retrievedAt: "May 20, 2024 09:56 AM",
      retrievedTimestamp: 1716198360000,
      usedInVerdict: true,
      licenseStatus: "CC BY-SA",
      confidence: 0.94,
    },
    {
      id: "SRC_331100_0002",
      productId: "331100",
      productName: "Optimum Nutrition Gold Whey",
      productImage: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=120&q=80",
      sourceType: "Nutrition data",
      sourceName: "USDA FoodData Central",
      sourceLogo: "U",
      sourceLogoBg: "bg-green-50 border-green-200",
      sourceLogoTextColor: "text-green-700 font-bold",
      retrievedAt: "May 20, 2024 09:54 AM",
      retrievedTimestamp: 1716198240000,
      usedInVerdict: true,
      licenseStatus: "Public Domain",
      confidence: 0.97,
    },
  ];

  const [sources, setSources] = useState<SourceRow[]>(initialSources);

  // States
  const [sourceTypeFilter, setSourceTypeFilter] = useState("All Types");
  const [licenseFilter, setLicenseFilter] = useState("All Statuses");
  const [searchQuery, setSearchQuery] = useState("");
  const [verdictFilter, setVerdictFilter] = useState("All");
  const [confidenceFilter, setConfidenceFilter] = useState("All");

  // Sort State
  const [sortAscending, setSortAscending] = useState(false);

  // Clear filters
  const handleClearFilters = () => {
    setSourceTypeFilter("All Types");
    setLicenseFilter("All Statuses");
    setSearchQuery("");
    setVerdictFilter("All");
    setConfidenceFilter("All");
  };

  // Filtered Rows Calculation
  const filteredSources = useMemo(() => {
    let result = sources.filter((row) => {
      // Source Type
      const matchesType =
        sourceTypeFilter === "All Types" || row.sourceType === sourceTypeFilter;

      // License Status
      const matchesLicense =
        licenseFilter === "All Statuses" || row.licenseStatus === licenseFilter;

      // Product search
      const matchesSearch =
        searchQuery === "" ||
        row.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.productId.includes(searchQuery);

      // Used in Verdict
      const matchesVerdict =
        verdictFilter === "All" ||
        (verdictFilter === "Yes" && row.usedInVerdict) ||
        (verdictFilter === "No" && !row.usedInVerdict);

      // Confidence Filter
      let matchesConfidence = true;
      if (confidenceFilter === "High (≥ 0.90)") {
        matchesConfidence = row.confidence >= 0.9;
      } else if (confidenceFilter === "Med (0.70 - 0.89)") {
        matchesConfidence = row.confidence >= 0.7 && row.confidence < 0.9;
      } else if (confidenceFilter === "Low (< 0.70)") {
        matchesConfidence = row.confidence < 0.7;
      }

      return matchesType && matchesLicense && matchesSearch && matchesVerdict && matchesConfidence;
    });

    // Sort by Date/Timestamp
    result.sort((a, b) => {
      return sortAscending
        ? a.retrievedTimestamp - b.retrievedTimestamp
        : b.retrievedTimestamp - a.retrievedTimestamp;
    });

    return result;
  }, [sources, sourceTypeFilter, licenseFilter, searchQuery, verdictFilter, confidenceFilter, sortAscending]);

  // Handle Sort Toggle
  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  // Styles Map
  const typeBadgeStyles = {
    "Retailer review": "bg-blue-50 text-blue-700 border border-blue-150",
    "Expert review": "bg-purple-50 text-purple-700 border border-purple-150",
    YouTube: "bg-red-50 text-red-650 border border-red-150",
    "Price history": "bg-orange-50 text-orange-700 border border-orange-150",
    "User receipt": "bg-emerald-50 text-emerald-700 border border-emerald-150",
    "Ingredient data": "bg-teal-50 text-teal-700 border border-teal-150",
    "Nutrition data": "bg-amber-50 text-amber-700 border border-amber-150",
  };

  const licenseBadgeStyles = {
    Licensed: "bg-emerald-50 text-emerald-700 border border-emerald-150",
    Private: "bg-blue-50 text-blue-700 border border-blue-150",
    "CC BY-SA": "bg-purple-50 text-purple-700 border border-purple-150",
    "Public Domain": "bg-slate-100 text-slate-600 border border-slate-200",
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-5">
        
        {/* ─── Page Header ─── */}
        <div className="w-full max-w-full pb-4 select-none">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full mt-2">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight">
                Source History
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Track all data sources that were retrieved and used in AI verdicts.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Date-Range Selector */}
              <div className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:border-slate-350 transition-colors">
                <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>May 14, 2024 – May 20, 2024</span>
                <ChevronDown className="ml-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
              </div>

              {/* Export Button */}
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Download className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                Export Sources
              </button>
            </div>
          </div>
        </div>

        {/* ─── Search & Responsive Filters Grid ─── */}
        <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm w-full max-w-full flex flex-col gap-4.5 xl:flex-row xl:items-end xl:justify-between min-w-0 overflow-hidden">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 min-w-0 w-full">
            
            {/* Source Type Filter */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 select-none">
                Source Type
              </label>
              <div className="relative">
                <select
                  value={sourceTypeFilter}
                  onChange={(e) => setSourceTypeFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-8 py-2.5 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option>All Types</option>
                  <option>Retailer review</option>
                  <option>Expert review</option>
                  <option>YouTube</option>
                  <option>Price history</option>
                  <option>User receipt</option>
                  <option>Ingredient data</option>
                  <option>Nutrition data</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* License Status Filter */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 select-none">
                License Status
              </label>
              <div className="relative">
                <select
                  value={licenseFilter}
                  onChange={(e) => setLicenseFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-8 py-2.5 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option>All Statuses</option>
                  <option>Licensed</option>
                  <option>Private</option>
                  <option>CC BY-SA</option>
                  <option>Public Domain</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Product Search Select */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 select-none">
                Product
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Search className="h-3.5 w-3.5" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search product..."
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-350 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Used in Verdict */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 select-none">
                Used In Verdict
              </label>
              <div className="relative">
                <select
                  value={verdictFilter}
                  onChange={(e) => setVerdictFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-8 py-2.5 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Confidence Filter */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 select-none">
                Confidence
              </label>
              <div className="relative">
                <select
                  value={confidenceFilter}
                  onChange={(e) => setConfidenceFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-8 py-2.5 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option>All</option>
                  <option>High (&ge; 0.90)</option>
                  <option>Med (0.70 - 0.89)</option>
                  <option>Low (&lt; 0.70)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Reset Action CTAs */}
          <div className="flex items-center gap-3 shrink-0 select-none justify-end xl:mb-0.5">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Clear Filters
            </button>

            <button
              className="inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4338ca] shadow-sm cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </section>

        {/* ─── Source History Tabular Layout ─── */}
        <div className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm min-w-0">
          {/* Metric Indicator Card Header */}
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center select-none bg-slate-50/5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Total 18,765 sources
            </span>
          </div>

          <div className="overflow-x-auto select-none">
            <table className="w-full min-w-[950px] text-xs text-left border-collapse">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 text-[10px] uppercase tracking-wider bg-slate-50/20">
                  <th className="py-3 px-4 font-bold w-[12%]">Source ID</th>
                  <th className="py-3 font-bold w-[22%]">Product</th>
                  <th className="py-3 font-bold w-[12%]">Source Type</th>
                  <th className="py-3 font-bold w-[18%]">Source Name</th>
                  
                  {/* Retrieved At Header with sort indicators */}
                  <th className="py-3 font-bold w-[15%]">
                    <button
                      onClick={toggleSort}
                      className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer outline-none uppercase font-bold"
                    >
                      <span>Retrieved At</span>
                      <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    </button>
                  </th>

                  <th className="py-3 font-bold w-[10%]">Used In Verdict</th>
                  <th className="py-3 font-bold w-[10%]">License Status</th>
                  
                  {/* Confidence Header with informational icon */}
                  <th className="py-3 font-bold w-[10%]">
                    <div className="flex items-center gap-1">
                      <span>Confidence</span>
                      <span title="Model confidence score for data source verdict relevance.">
                        <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 cursor-help" />
                      </span>
                    </div>
                  </th>

                  <th className="py-3 text-center font-bold w-[8%] pr-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filteredSources.map((row) => {
                  const badgeClass = typeBadgeStyles[row.sourceType] || "bg-slate-50 text-slate-500 border border-slate-200";
                  const licenseClass = licenseBadgeStyles[row.licenseStatus] || "bg-slate-100 text-slate-600 border border-slate-200";

                  // Decide color for the confidence progress indicator bar
                  const confidenceBarColor = "bg-emerald-500";

                  return (
                    <tr key={row.id} className="hover:bg-slate-50/10 transition-colors">
                      {/* Monospace Source ID */}
                      <td className="py-4 px-4 font-mono font-semibold text-slate-800 text-[11px]">
                        {row.id}
                      </td>

                      {/* Product details */}
                      <td className="py-4 pr-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={row.productImage}
                            alt={row.productName}
                            className="h-9 w-9 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800 leading-tight truncate">
                              {row.productName}
                            </div>
                            <div className="text-[10px] text-slate-400 font-semibold mt-1">
                              Product ID: {row.productId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Source Type Badge */}
                      <td className="py-4 pr-2">
                        <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[10px] font-bold ${badgeClass}`}>
                          {row.sourceType}
                        </span>
                      </td>

                      {/* Source Name Logo & Label */}
                      <td className="py-4 pr-2">
                        <div className="flex items-center gap-2">
                          {/* Beautiful Custom Brand Logo Graphic */}
                          <div className={`h-[26px] w-[26px] shrink-0 rounded flex items-center justify-center border text-[11px] ${
                            row.sourceLogoBg || "bg-slate-100 border-slate-200"
                          } ${row.sourceLogoTextColor || "text-slate-700 font-bold"}`}>
                            {row.sourceLogo}
                          </div>
                          <span className="font-semibold text-slate-750 truncate">
                            {row.sourceName}
                          </span>
                        </div>
                      </td>

                      {/* Retrieved Date */}
                      <td className="py-4 text-slate-500 font-semibold">
                        {row.retrievedAt}
                      </td>

                      {/* Used in Verdict Check/Minus */}
                      <td className="py-4">
                        {row.usedInVerdict ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                            <MinusCircle className="h-4 w-4 text-slate-350 shrink-0" />
                            <span>No</span>
                          </div>
                        )}
                      </td>

                      {/* License Status badge */}
                      <td className="py-4">
                        <span className={`inline-flex rounded-lg px-2 py-0.5 text-[10px] font-bold ${licenseClass}`}>
                          {row.licenseStatus}
                        </span>
                      </td>

                      {/* Confidence Score with Visual Indicator */}
                      <td className="py-4 pr-3">
                        <div className="flex flex-col gap-1 w-full max-w-[75px]">
                          <div className="text-[11px] font-extrabold text-slate-800">
                            {row.confidence.toFixed(2)}
                          </div>
                          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${confidenceBarColor}`}
                              style={{ width: `${row.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions Dual-Button Dropdown CTA */}
                      <td className="py-4 text-center pr-4">
                        <div className="inline-flex rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden select-none hover:bg-slate-50 transition-colors">
                          <button className="px-3.5 py-1.5 text-xs font-bold text-indigo-650 outline-none">
                            View
                          </button>
                          <div className="w-px bg-slate-200" />
                          <button className="px-1.5 py-1.5 hover:bg-slate-100 text-slate-400 transition-colors">
                            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredSources.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-400 font-bold select-none">
                      No matching sources found. Check your search query or clear active filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Pagination Footer */}
          <div className="p-4 border-t border-slate-150 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 select-none">
            <span>Showing 1 to {filteredSources.length} of 18,765 sources</span>
            
            <div className="flex items-center gap-4 flex-wrap justify-end">
              {/* Size Selector */}
              <div className="relative inline-flex items-center">
                <select
                  className="appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none hover:border-slate-350 cursor-pointer"
                  defaultValue="25"
                >
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Paginator */}
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200 text-slate-400 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="px-3 py-1.5 bg-[#4F46E5] text-white font-bold transition-colors">
                  1
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                  2
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                  3
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                  4
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                  5
                </button>
                <span className="px-2.5 py-1.5 text-slate-400 font-bold border-l border-slate-200 bg-slate-50/20">
                  ...
                </span>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                  751
                </button>
                <button className="p-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-400 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
