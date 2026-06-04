"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  SlidersHorizontal,
  Copy,
  Eye,
  MoreVertical,
  ExternalLink,
  User,
  ArrowUpRight,
  ArrowDownRight,
  X,
  FileText,
  Rocket,
  TrendingUp,
  RotateCcw,
  Sparkles,
  GitCompare,
} from "lucide-react";

// Types
interface ModelLog {
  version: string;
  buildId: string;
  modelName: string;
  modelType: string;
  status: "Active" | "Superseded" | "Archived" | "Reverted";
  environment: "Production" | "Staging";
  deployedOn: string;
  deployedTime: string;
  utcDeployedTime: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  impactValue: string;
  impactLabel: string;
  impactUp: boolean;
  deploymentType: string;
  trafficAllocation: string;
  accuracy: string;
  precision: string;
  recall: string;
  userSatisfaction: string;
  whatsNew: string;
}

export default function ModelVersionLogs() {
  // Mock Data
  const [logs, setLogs] = useState<ModelLog[]>([
    {
      version: "v2.4.1",
      buildId: "20250524.1",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Active",
      environment: "Production",
      deployedOn: "May 24, 2025",
      deployedTime: "10:24 AM",
      utcDeployedTime: "May 24, 2025 10:24 AM (UTC)",
      userName: "Sarah Johnson",
      userEmail: "sarah.j@email.com",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
      impactValue: "+2.34%",
      impactLabel: "Accuracy",
      impactUp: true,
      deploymentType: "Full Deployment",
      trafficAllocation: "100%",
      accuracy: "+2.34%",
      precision: "+1.87%",
      recall: "+1.02%",
      userSatisfaction: "+0.75%",
      whatsNew: "Improved review sentiment analysis and price trend detection.",
    },
    {
      version: "v2.4.0",
      buildId: "20250520.2",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Superseded",
      environment: "Production",
      deployedOn: "May 20, 2025",
      deployedTime: "02:15 PM",
      utcDeployedTime: "May 20, 2025 02:15 PM (UTC)",
      userName: "Michael Chen",
      userEmail: "michael.c@email.com",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
      impactValue: "+1.12%",
      impactLabel: "Accuracy",
      impactUp: true,
      deploymentType: "Full Deployment",
      trafficAllocation: "100%",
      accuracy: "+1.12%",
      precision: "+0.95%",
      recall: "+0.88%",
      userSatisfaction: "+0.54%",
      whatsNew: "Scoring algorithm optimization and enhanced weight tuning features.",
    },
    {
      version: "v2.3.2",
      buildId: "20250515.1",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Archived",
      environment: "Production",
      deployedOn: "May 15, 2025",
      deployedTime: "09:40 AM",
      utcDeployedTime: "May 15, 2025 09:40 AM (UTC)",
      userName: "James Anderson",
      userEmail: "james.a@email.com",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
      impactValue: "-0.45%",
      impactLabel: "Accuracy",
      impactUp: false,
      deploymentType: "Rolling Update",
      trafficAllocation: "100%",
      accuracy: "-0.45%",
      precision: "-0.21%",
      recall: "+0.15%",
      userSatisfaction: "-0.10%",
      whatsNew: "Security hardening patches and minor API schema updates.",
    },
    {
      version: "v2.3.1",
      buildId: "20250510.3",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Archived",
      environment: "Staging",
      deployedOn: "May 10, 2025",
      deployedTime: "11:30 AM",
      utcDeployedTime: "May 10, 2025 11:30 AM (UTC)",
      userName: "Emily Davis",
      userEmail: "emily.d@email.com",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
      impactValue: "+0.68%",
      impactLabel: "Accuracy",
      impactUp: true,
      deploymentType: "Canary Deployment",
      trafficAllocation: "10%",
      accuracy: "+0.68%",
      precision: "+0.54%",
      recall: "+0.32%",
      userSatisfaction: "+0.45%",
      whatsNew: "Alternative product finder scoring bug fixes and testing variables.",
    },
    {
      version: "v2.3.0",
      buildId: "20250508.1",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Reverted",
      environment: "Production",
      deployedOn: "May 08, 2025",
      deployedTime: "04:20 PM",
      utcDeployedTime: "May 08, 2025 04:20 PM (UTC)",
      userName: "David Wilson",
      userEmail: "david.w@email.com",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
      impactValue: "-1.89%",
      impactLabel: "Accuracy",
      impactUp: false,
      deploymentType: "Full Deployment",
      trafficAllocation: "100%",
      accuracy: "-1.89%",
      precision: "-1.75%",
      recall: "-1.43%",
      userSatisfaction: "-0.95%",
      whatsNew: "Initial implementation of deep-learning trust score model (reverted due to latency).",
    },
    {
      version: "v2.2.5",
      buildId: "20250428.2",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Archived",
      environment: "Production",
      deployedOn: "Apr 28, 2025",
      deployedTime: "01:05 PM",
      utcDeployedTime: "Apr 28, 2025 01:05 PM (UTC)",
      userName: "Sarah Johnson",
      userEmail: "sarah.j@email.com",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
      impactValue: "+0.32%",
      impactLabel: "Accuracy",
      impactUp: true,
      deploymentType: "Full Deployment",
      trafficAllocation: "100%",
      accuracy: "+0.32%",
      precision: "+0.25%",
      recall: "+0.18%",
      userSatisfaction: "+0.20%",
      whatsNew: "Trust score adjustments and Amazon review crawl speed updates.",
    },
    {
      version: "v2.2.4",
      buildId: "20250420.1",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Archived",
      environment: "Staging",
      deployedOn: "Apr 20, 2025",
      deployedTime: "10:15 AM",
      utcDeployedTime: "Apr 20, 2025 10:15 AM (UTC)",
      userName: "Michael Chen",
      userEmail: "michael.c@email.com",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
      impactValue: "+0.91%",
      impactLabel: "Accuracy",
      impactUp: true,
      deploymentType: "Canary Deployment",
      trafficAllocation: "20%",
      accuracy: "+0.91%",
      precision: "+0.85%",
      recall: "+0.60%",
      userSatisfaction: "+0.70%",
      whatsNew: "Confidence threshold checks and expert review weighting improvements.",
    },
    {
      version: "v2.2.3",
      buildId: "20250415.1",
      modelName: "BuyWise Score Model",
      modelType: "Scoring & Recommendations",
      status: "Archived",
      environment: "Production",
      deployedOn: "Apr 15, 2025",
      deployedTime: "08:45 AM",
      utcDeployedTime: "Apr 15, 2025 08:45 AM (UTC)",
      userName: "Emily Davis",
      userEmail: "emily.d@email.com",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
      impactValue: "-0.12%",
      impactLabel: "Accuracy",
      impactUp: false,
      deploymentType: "Full Deployment",
      trafficAllocation: "100%",
      accuracy: "-0.12%",
      precision: "-0.05%",
      recall: "-0.08%",
      userSatisfaction: "-0.02%",
      whatsNew: "Minor latency bug fixes and database indexing optimizations.",
    }
  ]);

  // Selected State
  const [selectedVersionId, setSelectedVersionId] = useState<string>("v2.4.1");
  
  // Filter States
  const [dateRange, setDateRange] = useState<string>("May 13 – May 26, 2025");
  const [selectedModel, setSelectedModel] = useState<string>("All Models");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Statuses");
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("All Environments");
  const [activeTab, setActiveTab] = useState<string>("All Versions");
  const [sortBy, setSortBy] = useState<string>("Newest First");

  // Selection state
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    "v2.4.1": true,
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleClearFilters = () => {
    setSelectedModel("All Models");
    setSelectedStatus("All Statuses");
    setSelectedEnvironment("All Environments");
  };

  const activeLog = useMemo(() => {
    return logs.find((l) => l.version === selectedVersionId) || logs[0];
  }, [selectedVersionId, logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Tab Filtering
      if (activeTab === "Deployments" && log.status !== "Active" && log.status !== "Superseded") return false;
      if (activeTab === "Reverted Versions" && log.status !== "Reverted") return false;

      // Dropdown filters
      if (selectedModel !== "All Models" && log.modelName !== selectedModel) return false;
      if (selectedStatus !== "All Statuses" && log.status !== selectedStatus) return false;
      if (selectedEnvironment !== "All Environments" && log.environment !== selectedEnvironment) return false;
      
      return true;
    });
  }, [logs, activeTab, selectedModel, selectedStatus, selectedEnvironment]);

  // Status badges
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-emerald-700 bg-emerald-50 border border-emerald-250";
      case "Superseded":
        return "text-blue-700 bg-blue-50 border border-blue-200";
      case "Archived":
        return "text-slate-650 bg-slate-50 border border-slate-200";
      case "Reverted":
        return "text-rose-700 bg-rose-50 border border-rose-250";
      default:
        return "text-slate-700 bg-slate-100";
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated: Record<string, boolean> = {};
    if (e.target.checked) {
      filteredLogs.forEach((l) => {
        updated[l.version] = true;
      });
    }
    setCheckedIds(updated);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6">
        
        {/* ─── Page Header area ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight flex items-center gap-2">
              Model Version Logs
              <span title="Track all AI model versions and changes" className="cursor-help">
                <Info className="h-4.5 w-4.5 text-slate-400" />
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Track all AI model versions, deployments, changes, and their impact on scoring and recommendations.
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
              <GitCompare className="h-4 w-4" />
              Compare Versions
            </button>
          </div>
        </div>

        {/* ─── Split Screen Grid Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full">
          
          {/* Left Column: Metrics, Filters, Logs Table & Navigation (9/12) */}
          <div className="col-span-12 lg:col-span-9 space-y-6 w-full min-w-0">

            {/* ─── Metric Indicator Widgets row (Shrunk Size) ─── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {[
                {
                  title: "Total Versions",
                  value: "18",
                  change: "2 new",
                  desc: "this month",
                  icon: FileText,
                  color: "text-purple-600 bg-purple-50 border-purple-100",
                  up: true
                },
                {
                  title: "Active Version",
                  value: "v2.4.1",
                  change: "",
                  desc: "May 24, 2025",
                  icon: Sparkles,
                  color: "text-emerald-600 bg-emerald-50 border-emerald-100",
                  up: true
                },
                {
                  title: "Deployments",
                  value: "42",
                  change: "8 new",
                  desc: "this month",
                  icon: Rocket,
                  color: "text-blue-600 bg-blue-50 border-blue-100",
                  up: true
                },
                {
                  title: "Impact Changes",
                  value: "+2.34%",
                  change: "",
                  desc: "Avg. impact",
                  icon: TrendingUp,
                  color: "text-indigo-600 bg-indigo-50 border-indigo-100",
                  up: true
                },
                {
                  title: "Reverted Versions",
                  value: "2",
                  change: "",
                  desc: "Last 30 days",
                  icon: RotateCcw,
                  color: "text-red-650 bg-red-50 border-red-150",
                  up: false
                }
              ].map((widget, i) => {
                const Icon = widget.icon;
                return (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex items-center gap-3 w-full min-h-[90px]">
                    <div className={`p-2 rounded-lg shrink-0 border ${widget.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex flex-col gap-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none leading-tight">{widget.title}</div>
                      <div className="text-xl md:text-2xl font-bold text-slate-900 leading-none">{widget.value}</div>
                      <div className="flex items-center gap-1 text-[10px] md:text-[11px] select-none font-bold leading-none">
                        {widget.change && (
                          <>
                            {widget.up ? (
                              <ArrowUpRight className="h-3 w-3 text-emerald-600 shrink-0" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 text-red-500 shrink-0" />
                            )}
                            <span className={widget.up ? "text-emerald-600" : "text-red-500"}>{widget.change}</span>
                          </>
                        )}
                        <span className="text-slate-400 font-medium">{widget.desc}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─── Filters Grid ─── */}
            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs w-full max-w-full flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 min-w-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full xl:w-auto">
                
                {/* Date Range Selector */}
                <div className="col-span-2 md:col-span-1 flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 w-full h-[52px] justify-between relative shadow-2xs">
                  <label className="text-[9px] md:text-[10px] text-slate-400 font-bold select-none block leading-none">Date Range</label>
                  <div className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-800 leading-none mb-0.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{dateRange}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-auto shrink-0" />
                  </div>
                </div>

                {/* Model Filter */}
                <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 w-full h-[52px] justify-between relative shadow-2xs">
                  <label className="text-[9px] md:text-[10px] text-slate-400 font-bold select-none block leading-none">Model</label>
                  <div className="relative w-full flex items-center mb-0.5">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-transparent text-[11px] md:text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                    >
                      <option value="All Models">All Models</option>
                      <option value="BuyWise Score Model">BuyWise Score Model</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 w-full h-[52px] justify-between relative shadow-2xs">
                  <label className="text-[9px] md:text-[10px] text-slate-400 font-bold select-none block leading-none">Status</label>
                  <div className="relative w-full flex items-center mb-0.5">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full bg-transparent text-[11px] md:text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                    >
                      <option value="All Statuses">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Superseded">Superseded</option>
                      <option value="Archived">Archived</option>
                      <option value="Reverted">Reverted</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
                  </div>
                </div>

                {/* Environment Filter */}
                <div className="col-span-2 md:col-span-1 flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 w-full h-[52px] justify-between relative shadow-2xs">
                  <label className="text-[9px] md:text-[10px] text-slate-400 font-bold select-none block leading-none">Environment</label>
                  <div className="relative w-full flex items-center mb-0.5">
                    <select
                      value={selectedEnvironment}
                      onChange={(e) => setSelectedEnvironment(e.target.value)}
                      className="w-full bg-transparent text-[11px] md:text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                    >
                      <option value="All Environments">All Environments</option>
                      <option value="Production">Production</option>
                      <option value="Staging">Staging</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Reset Action CTAs */}
              <div className="flex items-center gap-4 shrink-0 select-none justify-end lg:justify-start">
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338ca] transition-colors hover:underline"
                >
                  Clear All
                </button>
              </div>
            </section>
            
            <div className="rounded-xl border border-slate-200 bg-white shadow-xs min-w-0 overflow-hidden">
              
              {/* Tab Header row */}
              <div className="px-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                <div className="flex border-b border-transparent pb-0.5 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {[
                    { label: "All Versions", count: 18 },
                    { label: "Deployments", count: 42 },
                    { label: "Changes", count: 12 },
                    { label: "Performance Impact", count: 8 },
                    { label: "Reverted Versions", count: 2 }
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
                        {tab.label}
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
                      <th className="py-3 px-4 w-[4%]">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={filteredLogs.length > 0 && filteredLogs.every((l) => checkedIds[l.version])}
                          className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                        />
                      </th>
                      <th className="py-3 font-bold w-[16%]">Version</th>
                      <th className="py-3 font-bold w-[20%]">Model Name</th>
                      <th className="py-3 font-bold w-[12%]">Status</th>
                      <th className="py-3 font-bold w-[12%]">Environment</th>
                      <th className="py-3 font-bold w-[14%]">Deployed On</th>
                      <th className="py-3 font-bold w-[14%]">Deployed By</th>
                      <th className="py-3 font-bold w-[12%]">Impact</th>
                      <th className="py-3 text-center font-bold w-[6%] pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredLogs.map((row) => {
                      const isSelected = row.version === selectedVersionId;
                      const isChecked = !!checkedIds[row.version];

                      return (
                        <tr
                          key={row.version}
                          onClick={() => setSelectedVersionId(row.version)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-indigo-50/30 hover:bg-indigo-50/40" : "hover:bg-slate-50/30"
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => handleSelectOne(row.version, e.target.checked)}
                              className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>

                          {/* Version & Build */}
                          <td className="py-3.5">
                            <div className="leading-tight">
                              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                <span>{row.version}</span>
                                {row.status === "Active" && (
                                  <span className="inline-flex rounded-full bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.25 font-bold">
                                    Latest
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Build {row.buildId}</div>
                            </div>
                          </td>

                          {/* Model Name */}
                          <td className="py-3.5">
                            <div className="leading-tight">
                              <div className="font-bold text-slate-800 text-xs">{row.modelName}</div>
                              <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{row.modelType}</div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5">
                            <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getStatusBadgeColor(row.status)}`}>
                              {row.status}
                            </span>
                          </td>

                          {/* Environment */}
                          <td className="py-3.5 text-xs text-slate-500 font-medium">
                            {row.environment}
                          </td>

                          {/* Deployed On */}
                          <td className="py-3.5 text-xs text-slate-500 font-medium">
                            <div>{row.deployedOn}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{row.deployedTime}</div>
                          </td>

                          {/* Deployed By */}
                          <td className="py-3.5 pr-2">
                            <div className="flex items-center gap-2 min-w-0 leading-tight">
                              <img
                                src={row.userAvatar}
                                alt={row.userName}
                                className="h-7 w-7 rounded-full object-cover border border-slate-200 shrink-0"
                              />
                              <div className="min-w-0 text-xs">
                                <div className="font-bold text-slate-900 truncate">{row.userName}</div>
                                <div className="text-[9px] text-slate-400 font-medium truncate mt-0.5">{row.userEmail}</div>
                              </div>
                            </div>
                          </td>

                          {/* Impact */}
                          <td className="py-3.5 text-xs font-semibold">
                            <div className="flex items-center gap-1">
                              <span className={row.impactUp ? "text-emerald-600" : "text-red-500"}>
                                {row.impactValue}
                              </span>
                              {row.impactUp ? (
                                <ArrowUpRight className="h-3 w-3 text-emerald-500 shrink-0" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 text-red-400 shrink-0" />
                              )}
                              <span className="text-[10px] text-slate-400 font-normal">{row.impactLabel}</span>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 text-center pr-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setSelectedVersionId(row.version)}
                                className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition"
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
                          No matching versions found. Adjust filters.
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
                    <button className="p-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-400 transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Version Details panel (3/12) */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-xs space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-950">Version Details</h3>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex rounded-lg bg-[#4F46E5] text-white text-[10px] px-2 py-0.5 font-bold">
                    {activeLog.version}
                  </span>
                  <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getStatusBadgeColor(activeLog.status)}`}>
                    {activeLog.status}
                  </span>
                </div>
              </div>

              {/* Model Information */}
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Model Information</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Model Name</span>
                      <span className="font-semibold text-slate-800">{activeLog.modelName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Model Type</span>
                      <span className="font-semibold text-slate-800">{activeLog.modelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Version</span>
                      <span className="font-semibold text-slate-800">{activeLog.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Build ID</span>
                      <span className="font-semibold text-slate-800 font-mono">{activeLog.buildId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Environment</span>
                      <span className="font-semibold text-slate-800">{activeLog.environment}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Deployment Information */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Deployment Information</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Deployed On</span>
                      <span className="font-semibold text-slate-800">{activeLog.utcDeployedTime}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-slate-500 font-medium shrink-0">Deployed By</span>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img
                          src={activeLog.userAvatar}
                          alt={activeLog.userName}
                          className="h-6 w-6 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="text-right min-w-0 leading-tight">
                          <div className="font-bold text-slate-900 truncate text-[11px]">{activeLog.userName}</div>
                          <div className="text-[9px] text-slate-400 font-medium truncate mt-0.5 flex items-center justify-end gap-1">
                            <span>{activeLog.userEmail}</span>
                            <Copy className="h-3 w-3 cursor-pointer text-slate-350 hover:text-slate-500" onClick={() => handleCopy(activeLog.userEmail, "user-email")} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Deployment Type</span>
                      <span className="font-semibold text-slate-800">{activeLog.deploymentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Traffic Allocation</span>
                      <span className="font-semibold text-slate-800">{activeLog.trafficAllocation}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Performance Impact */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Performance Impact</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Accuracy</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                        {activeLog.accuracy}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Precision</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                        {activeLog.precision}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Recall</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                        {activeLog.recall}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">User Satisfaction</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                        {activeLog.userSatisfaction}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Change Summary */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Change Summary</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                    {activeLog.whatsNew}
                  </p>
                  <button className="mt-2 text-xs font-bold text-[#4F46E5] hover:text-[#4338ca] transition hover:underline">
                    View all changes
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-center">
                  <button className="w-fit inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white h-7 px-3 text-[10px] font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]/30 transition shadow-xs">
                    View Full Log
                    <ExternalLink className="h-2.5 w-2.5" />
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
