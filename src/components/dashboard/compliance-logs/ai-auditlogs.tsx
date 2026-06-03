"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  Search,
  CheckCircle2,
  FileText,
  Plus,
  Settings,
  SlidersHorizontal,
  Copy,
  Eye,
  MoreVertical,
  ExternalLink,
  User,
  Clock,
  Bell,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Laptop,
} from "lucide-react";

// Types
interface AuditLog {
  id: string;
  timestamp: string;
  utcTimestamp: string;
  model: "GPT-4o" | "Claude 3.5" | "Gemini 1.5";
  actionType: "Review Summary" | "Pros & Cons" | "Price Analysis" | "Alternative Finder" | "Trust Score" | "YouTube Summary" | "Price Prediction";
  productName: string;
  productCategory: string;
  productImage: string;
  productAsin: string;
  userName: string;
  userEmail: string;
  status: "Completed" | "Flagged" | "Modified";
  confidence: number;
  ipAddress: string;
  source: string;
  sessionId: string;
  prompt: string;
  outputSummary: string;
}

export default function AIAuditLogs() {
  // Mock Logs Database
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "AI-2025-0526-000482",
      timestamp: "May 26, 2025 10:24:31 AM",
      utcTimestamp: "May 26, 2025 10:24:31 AM (UTC)",
      model: "GPT-4o",
      actionType: "Review Summary",
      productName: "Sony WH-1000XM5",
      productCategory: "Headphones",
      productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
      productAsin: "B09XS7JWHH",
      userName: "Sarah Johnson",
      userEmail: "sarah.j@email.com",
      status: "Completed",
      confidence: 0.94,
      ipAddress: "203.0.113.42",
      source: "Web App",
      sessionId: "sess_7f3b7c2a8d4e9f1a",
      prompt: "Generate a comprehensive analysis of Amazon reviews for Sony WH-1000XM5 headphones, focusing on sound quality, comfort, and noise cancelling capabilities.",
      outputSummary: "The Sony WH-1000XM5 receives exceptional scores for its class-leading active noise cancelling and balanced audio profile. Main consumer complaints focus on the non-folding design and slightly higher launch price compared to competitors."
    },
    {
      id: "AI-2025-0526-000481",
      timestamp: "May 26, 2025 10:23:08 AM",
      utcTimestamp: "May 26, 2025 10:23:08 AM (UTC)",
      model: "Claude 3.5",
      actionType: "Pros & Cons",
      productName: "iPhone 15 (128GB)",
      productCategory: "Smartphone",
      productImage: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=100&q=80",
      productAsin: "B0CHWT49T3",
      userName: "Michael Chen",
      userEmail: "michael.c@email.com",
      status: "Completed",
      confidence: 0.91,
      ipAddress: "198.51.100.12",
      source: "API Client",
      sessionId: "sess_9a2f1c8e7b3d5d4c",
      prompt: "Extract the core pros and cons of the iPhone 15 based on verified buyer reviews from major retail connectors.",
      outputSummary: "Pros include the dynamic island feature, USB-C transition, and upgraded 48MP main camera. Cons are centered around the 60Hz display refresh rate and lack of telephoto lens compared to Pro models."
    },
    {
      id: "AI-2025-0526-000480",
      timestamp: "May 26, 2025 10:21:45 AM",
      utcTimestamp: "May 26, 2025 10:21:45 AM (UTC)",
      model: "Gemini 1.5",
      actionType: "Price Analysis",
      productName: "MacBook Air M3",
      productCategory: "Laptop",
      productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80",
      productAsin: "B0CX21VFSS",
      userName: "Robert Garcia",
      userEmail: "robert.g@email.com",
      status: "Flagged",
      confidence: 0.72,
      ipAddress: "203.0.113.88",
      source: "Web App",
      sessionId: "sess_4f8c2e6d9b1a5e7f",
      prompt: "Perform a historical price analysis of the MacBook Air M3, checking for current discount trends vs price history.",
      outputSummary: "Current price represents an all-time low discount. Flagged due to conflicting pricing data scraped from third-party retailer connectors."
    },
    {
      id: "AI-2025-0526-000479",
      timestamp: "May 26, 2025 10:20:12 AM",
      utcTimestamp: "May 26, 2025 10:20:12 AM (UTC)",
      model: "GPT-4o",
      actionType: "Alternative Finder",
      productName: "Dyson V15 Detect",
      productCategory: "Vacuum Cleaner",
      productImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&q=80",
      productAsin: "B095J5H5V5",
      userName: "Emily Davis",
      userEmail: "emily.d@email.com",
      status: "Completed",
      confidence: 0.89,
      ipAddress: "198.51.100.230",
      source: "Slack Bot",
      sessionId: "sess_3e1a7b8c9d2e4f5a",
      prompt: "Find top alternative products for Dyson V15 Detect that offer high laser detection and battery efficiency.",
      outputSummary: "Recommended alternatives include the Shark Stratos Cordless and Samsung Bespoke Jet, both offering similar suction efficiency at a lower market price point."
    },
    {
      id: "AI-2025-0526-000478",
      timestamp: "May 26, 2025 10:18:55 AM",
      utcTimestamp: "May 26, 2025 10:18:55 AM (UTC)",
      model: "Claude 3.5",
      actionType: "Trust Score",
      productName: "Samsung Galaxy S24",
      productCategory: "Smartphone",
      productImage: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&q=80",
      productAsin: "B0CSM5S4NF",
      userName: "David Wilson",
      userEmail: "david.w@email.com",
      status: "Modified",
      confidence: 0.86,
      ipAddress: "203.0.113.111",
      source: "Web App",
      sessionId: "sess_8c7d5e9b1f2a3c4d",
      prompt: "Verify the review trust score for Samsung Galaxy S24 by filtering out potential bot reviews.",
      outputSummary: "Initial automated trust score of 91% was modified to 86% by administrative reviewer Sarah Johnson following manual override verification."
    },
    {
      id: "AI-2025-0526-000477",
      timestamp: "May 26, 2025 10:17:32 AM",
      utcTimestamp: "May 26, 2025 10:17:32 AM (UTC)",
      model: "Gemini 1.5",
      actionType: "YouTube Summary",
      productName: "ASUS ROG Strix G16",
      productCategory: "Gaming Laptop",
      productImage: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=100&q=80",
      productAsin: "B0C1D7M9Z4",
      userName: "Lisa Martinez",
      userEmail: "lisa.m@email.com",
      status: "Completed",
      confidence: 0.93,
      ipAddress: "198.51.100.45",
      source: "Web App",
      sessionId: "sess_5a6b7c8d9e0f1a2b",
      prompt: "Analyze the top 5 YouTube video reviews for the ASUS ROG Strix G16 and summarize reviewer consensus on thermals.",
      outputSummary: "Reviewers agree the thermal system performs incredibly well due to the triple-fan technology, though the fan noise is noticeably high under full gaming load."
    },
    {
      id: "AI-2025-0526-000476",
      timestamp: "May 26, 2025 10:16:09 AM",
      utcTimestamp: "May 26, 2025 10:16:09 AM (UTC)",
      model: "GPT-4o",
      actionType: "Review Summary",
      productName: "Instant Pot Duo 7-in-1",
      productCategory: "Pressure Cooker",
      productImage: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=100&q=80",
      productAsin: "B00FLYWNYQ",
      userName: "James Anderson",
      userEmail: "james.a@email.com",
      status: "Completed",
      confidence: 0.90,
      ipAddress: "203.0.113.5",
      source: "Web App",
      sessionId: "sess_2b3c4d5e6f7a8b9c",
      prompt: "Summarize buyer reviews for the Instant Pot Duo, focusing on ease of cleaning and longevity.",
      outputSummary: "Consensus shows extreme satisfaction with build longevity and versatility. Some complaints focus on the sealing ring retaining food odors."
    },
    {
      id: "AI-2025-0526-000475",
      timestamp: "May 26, 2025 10:14:48 AM",
      utcTimestamp: "May 26, 2025 10:14:48 AM (UTC)",
      model: "Claude 3.5",
      actionType: "Price Prediction",
      productName: "Sony PlayStation 5",
      productCategory: "Gaming Console",
      productImage: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&q=80",
      productAsin: "B08FC5L3RG",
      userName: "Sophie Lee",
      userEmail: "sophie.l@email.com",
      status: "Flagged",
      confidence: 0.68,
      ipAddress: "198.51.100.99",
      source: "Web App",
      sessionId: "sess_1f2a3b4c5d6e7f8a",
      prompt: "Predict holiday pricing trends for the Sony PlayStation 5 console based on previous annual data.",
      outputSummary: "Flagged because model confidence dropped below 70% threshold due to unpredictable hardware supply chain announcements."
    }
  ]);

  // Selected Log state for side drawer
  const [selectedLogId, setSelectedLogId] = useState<string>("AI-2025-0526-000482");
  
  // Filter States
  const [dateRange, setDateRange] = useState<string>("May 13 – May 26, 2025");
  const [selectedModel, setSelectedModel] = useState<string>("All Models");
  const [selectedActionType, setSelectedActionType] = useState<string>("All Actions");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Statuses");
  const [selectedUser, setSelectedUser] = useState<string>("All Users");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("All Logs");
  const [sortBy, setSortBy] = useState<string>("Newest First");

  // Accordion details panel states
  const [showPrompt, setShowPrompt] = useState<boolean>(true);
  const [showOutput, setShowOutput] = useState<boolean>(true);
  const [showMetadata, setShowMetadata] = useState<boolean>(true);

  // Copy Tooltip Indicator
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Find currently active log
  const activeLog = useMemo(() => {
    return logs.find((l) => l.id === selectedLogId) || logs[0];
  }, [selectedLogId, logs]);

  // Clear filters helper
  const handleClearFilters = () => {
    setSelectedModel("All Models");
    setSelectedActionType("All Actions");
    setSelectedStatus("All Statuses");
    setSelectedUser("All Users");
    setSearchQuery("");
  };

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Tab Filtering
      if (activeTab === "Flagged" && log.status !== "Flagged") return false;
      if (activeTab === "Reviewed" && log.status !== "Completed") return false; // assuming reviewed are completed
      if (activeTab === "Modified" && log.status !== "Modified") return false;
      if (activeTab === "Alerts" && log.status !== "Flagged") return false; // mapped alerts to flagged logs

      // Search queries
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          log.id.toLowerCase().includes(query) ||
          log.productName.toLowerCase().includes(query) ||
          log.userName.toLowerCase().includes(query) ||
          log.model.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Filter select dropdowns
      if (selectedModel !== "All Models" && log.model !== selectedModel) return false;
      if (selectedActionType !== "All Actions" && log.actionType !== selectedActionType) return false;
      if (selectedStatus !== "All Statuses" && log.status !== selectedStatus) return false;
      
      return true;
    });
  }, [logs, activeTab, searchQuery, selectedModel, selectedActionType, selectedStatus]);

  // Action badge helper
  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "Review Summary":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case "Pros & Cons":
        return "bg-purple-50 text-purple-700 border border-purple-100";
      case "Price Analysis":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "Alternative Finder":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "Trust Score":
        return "bg-indigo-50 text-indigo-700 border border-indigo-100";
      case "YouTube Summary":
        return "bg-red-50 text-red-700 border border-red-150";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  // Status badge colors
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Flagged":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "Modified":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // Model icons
  const getModelIcon = (model: string) => {
    switch (model) {
      case "GPT-4o":
        return <div className="h-5 w-5 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px]">G</div>;
      case "Claude 3.5":
        return <div className="h-5 w-5 rounded bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-[10px]">C</div>;
      case "Gemini 1.5":
        return <div className="h-5 w-5 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">G1</div>;
      default:
        return <Sparkles className="h-4 w-4 text-indigo-500" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-8 py-6 space-y-6">
        
        {/* ─── Page Header area ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight">
              AI Audit Logs
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Track and review all AI model executions, prompts, outputs, and human reviews for transparency and compliance.
              <span title="Click on any log row to review the details card">
                <Info className="inline-block ml-1.5 h-3.5 w-3.5 text-slate-400 cursor-help" />
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
              <Download className="h-4 w-4 text-slate-500" />
              Export
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              Filters
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338ca] text-white px-4 py-2 text-sm font-semibold transition shadow-sm">
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>

        {/* ─── Metric Indicator Widgets row ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Total AI Executions",
              value: "48,392",
              change: "+16.4%",
              desc: "vs last 30 days",
              icon: Sparkles,
              color: "text-purple-600 bg-purple-50 border-purple-100",
              up: true
            },
            {
              title: "Flagged for Review",
              value: "312",
              change: "+8.7%",
              desc: "vs last 30 days",
              icon: Clock,
              color: "text-amber-600 bg-amber-50 border-amber-100",
              up: true
            },
            {
              title: "Human Reviewed",
              value: "286",
              change: "+12.1%",
              desc: "vs last 30 days",
              icon: User,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              up: true
            },
            {
              title: "Modified Outputs",
              value: "74",
              change: "+5.3%",
              desc: "vs last 30 days",
              icon: Laptop,
              color: "text-indigo-600 bg-indigo-50 border-indigo-100",
              up: true
            },
            {
              title: "Compliance Alerts",
              value: "9",
              change: "-10.0%",
              desc: "vs last 30 days",
              icon: Bell,
              color: "text-red-650 bg-red-50 border-red-150",
              up: false
            }
          ].map((widget, i) => {
            const Icon = widget.icon;
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex items-start gap-4">
                <div className={`p-2.5 rounded-lg shrink-0 border ${widget.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">{widget.title}</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{widget.value}</div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] select-none font-bold">
                    {widget.up ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-600 shrink-0" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 shrink-0" />
                    )}
                    <span className={widget.up ? "text-emerald-600" : "text-red-500"}>{widget.change}</span>
                    <span className="text-slate-400 font-medium">{widget.desc}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Search & Responsive Filters Grid ─── */}
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs w-full max-w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 min-w-0">
          <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto">
            
            {/* Date Range Selector */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[185px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Date Range</label>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 leading-none mb-0.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{dateRange}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-auto shrink-0" />
              </div>
            </div>

            {/* Model Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Model</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Models">All Models</option>
                  <option value="GPT-4o">GPT-4o</option>
                  <option value="Claude 3.5">Claude 3.5</option>
                  <option value="Gemini 1.5">Gemini 1.5</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* Action Type Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Action Type</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedActionType}
                  onChange={(e) => setSelectedActionType(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Actions">All Actions</option>
                  <option value="Review Summary">Review Summary</option>
                  <option value="Pros & Cons">Pros & Cons</option>
                  <option value="Price Analysis">Price Analysis</option>
                  <option value="Alternative Finder">Alternative Finder</option>
                  <option value="Trust Score">Trust Score</option>
                  <option value="YouTube Summary">YouTube Summary</option>
                  <option value="Price Prediction">Price Prediction</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Status</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Flagged">Flagged</option>
                  <option value="Modified">Modified</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* User Filter */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-2xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">User</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Users">All Users</option>
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Michael Chen">Michael Chen</option>
                  <option value="Robert Garcia">Robert Garcia</option>
                  <option value="Emily Davis">Emily Davis</option>
                  <option value="David Wilson">David Wilson</option>
                  <option value="Lisa Martinez">Lisa Martinez</option>
                  <option value="James Anderson">James Anderson</option>
                  <option value="Sophie Lee">Sophie Lee</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Reset Action CTAs */}
          <div className="flex items-center gap-4 shrink-0 select-none justify-end lg:justify-start">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <SlidersHorizontal className="h-4 w-4 text-slate-400" />
              More Filters
            </button>
            
            <button
              onClick={handleClearFilters}
              className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338ca] transition-colors hover:underline"
            >
              Clear All
            </button>
          </div>
        </section>

        {/* ─── Split Screen: Logs Table and Details Panel ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full">
          
          {/* Left Column: Logs Table & Navigation (9/12) */}
          <div className="col-span-12 lg:col-span-9 space-y-6 w-full min-w-0">
            
            <div className="rounded-xl border border-slate-200 bg-white shadow-xs min-w-0 overflow-hidden">
              
              {/* Tab Header row */}
              <div className="px-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
                <div className="flex border-b border-transparent pb-0.5">
                  {[
                    { label: "All Logs", count: 48392 },
                    { label: "Flagged", count: 312 },
                    { label: "Reviewed", count: 286 },
                    { label: "Modified", count: 74 },
                    { label: "Alerts", count: 9 }
                  ].map((tab) => {
                    const isActive = activeTab === tab.label;
                    return (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`py-3.5 px-4 font-semibold text-sm transition-all border-b-2 -mb-0.5 shrink-0 ${
                          isActive
                            ? "border-[#4F46E5] text-[#4F46E5]"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {tab.label} ({tab.count.toLocaleString()})
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 py-2 text-xs font-semibold text-slate-500">
                  <span className="select-none text-sm">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent pl-1 pr-6 py-1 outline-none text-slate-800 font-bold select-none cursor-pointer text-sm"
                    >
                      <option>Newest First</option>
                      <option>Oldest First</option>
                      <option>Confidence: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-0.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid Table */}
              <div className="overflow-x-auto select-none">
                <table className="w-full min-w-[950px] text-sm text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 font-semibold border-b border-slate-100 text-xs uppercase tracking-wider bg-slate-50/10">
                      <th className="py-3 px-4 font-bold w-[16%]">Log ID</th>
                      <th className="py-3 font-bold w-[16%]">Timestamp</th>
                      <th className="py-3 font-bold w-[12%]">Model</th>
                      <th className="py-3 font-bold w-[14%]">Action Type</th>
                      <th className="py-3 font-bold w-[16%]">Product / Context</th>
                      <th className="py-3 font-bold w-[14%]">User</th>
                      <th className="py-3 font-bold w-[10%]">Status</th>
                      <th className="py-3 font-bold w-[12%]">Confidence</th>
                      <th className="py-3 text-center font-bold w-[8%] pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredLogs.map((row) => {
                      const isSelected = row.id === selectedLogId;
                      const confidencePercent = Math.round(row.confidence * 100);
                      const confidenceBarColor =
                        confidencePercent >= 90
                          ? "bg-emerald-500"
                          : confidencePercent >= 75
                          ? "bg-indigo-500"
                          : "bg-orange-500";

                      return (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedLogId(row.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-indigo-50/30 hover:bg-indigo-50/40" : "hover:bg-slate-50/30"
                          }`}
                        >
                          {/* Log ID */}
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-800">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold">{row.id}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(row.id, row.id);
                                }}
                                className="p-0.5 text-slate-400 hover:text-slate-600 transition"
                                title="Copy Log ID"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                              {copiedId === row.id && (
                                <span className="absolute text-[10px] bg-slate-900 text-white rounded px-1.5 py-0.5 -mt-6 select-none shadow">
                                  Copied!
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Timestamp */}
                          <td className="py-3.5 text-xs text-slate-500 font-medium">
                            {row.timestamp}
                          </td>

                          {/* Model */}
                          <td className="py-3.5">
                            <div className="flex items-center gap-2">
                              {getModelIcon(row.model)}
                              <span className="font-semibold text-slate-800 text-xs">{row.model}</span>
                            </div>
                          </td>

                          {/* Action Type */}
                          <td className="py-3.5">
                            <span className={`inline-flex rounded-lg px-2 py-0.5 text-[11px] font-bold ${getActionBadgeColor(row.actionType)}`}>
                              {row.actionType}
                            </span>
                          </td>

                          {/* Product / Context */}
                          <td className="py-3.5 pr-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={row.productImage}
                                alt={row.productName}
                                className="h-8.5 w-8.5 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div className="min-w-0 leading-tight">
                                <div className="font-bold text-slate-900 truncate text-xs">{row.productName}</div>
                                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{row.productCategory}</div>
                              </div>
                            </div>
                          </td>

                          {/* User */}
                          <td className="py-3.5 pr-2">
                            <div className="min-w-0 leading-tight text-xs">
                              <div className="font-semibold text-slate-800 truncate">{row.userName}</div>
                              <div className="text-slate-400 font-medium truncate text-[10px] mt-0.5">{row.userEmail}</div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5">
                            <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getStatusBadgeColor(row.status)}`}>
                              {row.status}
                            </span>
                          </td>

                          {/* Confidence */}
                          <td className="py-3.5 pr-3">
                            <div className="flex flex-col gap-1 w-full max-w-[70px]">
                              <div className="text-xs font-bold text-slate-800">{confidencePercent}%</div>
                              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${confidenceBarColor}`}
                                  style={{ width: `${row.confidence * 100}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 text-center pr-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setSelectedLogId(row.id)}
                                className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition"
                                title="View details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-16 text-center text-slate-400 font-bold select-none">
                          No matching logs found. Adjust filters or search parameters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="p-4 border-t border-slate-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500 select-none bg-white">
                <span>Showing 1 to {filteredLogs.length} of {logs.length} results</span>
                
                <div className="flex items-center gap-4 flex-wrap justify-end">
                  {/* Size Selector */}
                  <div className="relative inline-flex items-center">
                    <select
                      className="appearance-none rounded-lg border border-slate-250 bg-white pl-3.5 pr-8 py-1.5 text-sm font-semibold text-slate-700 outline-none hover:border-slate-350 cursor-pointer"
                      defaultValue="10"
                    >
                      <option value="10">10 per page</option>
                      <option value="25">25 per page</option>
                      <option value="50">50 per page</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Paginator */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white text-sm">
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
                    <button className="p-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-400 transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: AI Audit Log Details panel (3/12) */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-xs space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-950">AI Audit Log Details</h3>
                <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getStatusBadgeColor(activeLog.status)}`}>
                  {activeLog.status}
                </span>
              </div>

              {/* Technical identifiers block */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Log ID</div>
                  <div className="mt-1 flex items-center gap-1.5 font-mono text-slate-900 font-semibold">
                    <span>{activeLog.id}</span>
                    <button
                      onClick={() => handleCopy(activeLog.id, "active")}
                      className="p-0.5 text-slate-400 hover:text-slate-600 transition"
                      title="Copy Log ID"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    {copiedId === "active" && (
                      <span className="absolute text-[10px] bg-slate-900 text-white rounded px-1.5 py-0.5 -mt-6 select-none shadow">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timestamp</div>
                  <div className="mt-1 font-semibold text-slate-700">{activeLog.utcTimestamp}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Model</div>
                  <div className="mt-1 flex items-center gap-2">
                    {getModelIcon(activeLog.model)}
                    <span className="font-semibold text-slate-800">{activeLog.model}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action Type</div>
                  <div className="mt-1">
                    <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[10px] font-bold ${getActionBadgeColor(activeLog.actionType)}`}>
                      {activeLog.actionType}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Product block */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product</div>
                  <div className="mt-2 flex items-start gap-3">
                    <img
                      src={activeLog.productImage}
                      alt={activeLog.productName}
                      className="h-11 w-11 rounded-lg object-cover border border-slate-200/60 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-950 truncate leading-tight">{activeLog.productName}</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{activeLog.productCategory}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-slate-500 font-semibold select-none">
                        <span>ASIN: {activeLog.productAsin}</span>
                        <ExternalLink className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* User block */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User</div>
                  <div className="mt-1.5 min-w-0 leading-tight">
                    <div className="text-xs font-bold text-slate-900 truncate">{activeLog.userName}</div>
                    <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{activeLog.userEmail}</div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Confidence score indicator */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Confidence Score</span>
                    <span className="font-extrabold text-slate-800">{Math.round(activeLog.confidence * 100)}%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-150 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${activeLog.confidence * 100}%` }}
                    />
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Prompts Accordion details */}
                <div className="space-y-1">
                  <button
                    onClick={() => setShowPrompt(!showPrompt)}
                    className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer select-none"
                  >
                    <span>Prompt</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showPrompt ? "" : "-rotate-90"}`} />
                  </button>
                  {showPrompt && (
                    <div className="rounded-lg bg-slate-50 border border-slate-200/50 p-2.5 text-[11px] font-medium leading-relaxed text-slate-650 mt-1.5 font-mono max-h-24 overflow-y-auto">
                      {activeLog.prompt}
                    </div>
                  )}
                </div>

                {/* AI Output Accordion details */}
                <div className="space-y-1">
                  <button
                    onClick={() => setShowOutput(!showOutput)}
                    className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer select-none"
                  >
                    <span>AI Output Summary</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showOutput ? "" : "-rotate-90"}`} />
                  </button>
                  {showOutput && (
                    <div className="rounded-lg bg-slate-50 border border-slate-200/50 p-2.5 text-[11px] font-medium leading-relaxed text-slate-650 mt-1.5 font-mono max-h-24 overflow-y-auto">
                      {activeLog.outputSummary}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Human Review</div>
                  <div className="mt-1 text-slate-400 italic">Not reviewed</div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Metadata details accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => setShowMetadata(!showMetadata)}
                    className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer select-none"
                  >
                    <span>Metadata</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showMetadata ? "" : "-rotate-90"}`} />
                  </button>
                  {showMetadata && (
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px] font-bold">IP Address</span>
                        <span className="font-semibold text-slate-700 font-mono text-[11px]">{activeLog.ipAddress}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px] font-bold">Source</span>
                        <span className="font-semibold text-slate-750">{activeLog.source}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px] font-bold font-mono">Session ID</span>
                        <span className="font-semibold text-slate-700 font-mono text-[10px] truncate max-w-[130px]" title={activeLog.sessionId}>
                          {activeLog.sessionId}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white h-9 px-4 text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]/30 transition shadow-xs">
                    View Full Log
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

              </div>

            </div>
          </aside>

        </div>

      </div>
    </div>
  );
}
