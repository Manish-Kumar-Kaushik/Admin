"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  MoreVertical,
  Globe,
  Users,
  Award,
  Monitor,
  Smartphone,
  Play,
  Shield,
  FileText,
  TrendingUp,
  Puzzle,
  Bot,
  Scale,
  Flag,
  CheckCircle,
  Clock,
  XCircle,
  Info,
} from "lucide-react";

interface FeatureRow {
  id: string;
  name: string;
  badge?: {
    text: string;
    style: string;
  };
  description: string;
  environment: "Production" | "Staging" | "Development";
  status: "Enabled" | "In Progress" | "Disabled";
  rollout: number;
  audience: string;
  audienceIcon: React.ComponentType<{ className?: string }>;
  lastChanged: string;
  changedBy: string;
  avatar: string;
  icon: React.ComponentType<{ className?: string }>;
  iconStyle: string;
}

export default function FeatureFlags() {
  // Feature flags initial dataset state
  const [features, setFeatures] = useState<FeatureRow[]>([
    {
      id: "yt-evidence",
      name: "YouTube Evidence",
      badge: { text: "New", style: "bg-violet-50 text-violet-650 border-violet-100" },
      description: "Show trusted YouTube reviews and summaries as evidence.",
      environment: "Production",
      status: "Enabled",
      rollout: 100,
      audience: "All Users",
      audienceIcon: Globe,
      lastChanged: "May 20, 2024 10:15 AM",
      changedBy: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      icon: Play,
      iconStyle: "bg-rose-50 text-rose-600 border border-rose-100",
    },
    {
      id: "beauty-safety",
      name: "Beauty Safety Score",
      badge: { text: "New", style: "bg-violet-50 text-violet-650 border-violet-100" },
      description: "Display safety score for beauty and personal care products.",
      environment: "Production",
      status: "Enabled",
      rollout: 75,
      audience: "Women 18-45",
      audienceIcon: Users,
      lastChanged: "May 19, 2024 04:32 PM",
      changedBy: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      icon: Shield,
      iconStyle: "bg-red-50 text-red-600 border border-red-100",
    },
    {
      id: "receipt-upload",
      name: "Receipt Upload",
      description: "Allow users to upload purchase receipts for better insights.",
      environment: "Production",
      status: "Enabled",
      rollout: 50,
      audience: "All Users",
      audienceIcon: Globe,
      lastChanged: "May 18, 2024 09:11 AM",
      changedBy: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80",
      icon: FileText,
      iconStyle: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      id: "price-pred",
      name: "Price Prediction",
      badge: { text: "Beta", style: "bg-blue-50 text-blue-650 border-blue-100" },
      description: "Predict future price trends using historical data.",
      environment: "Production",
      status: "Enabled",
      rollout: 25,
      audience: "Premium Users",
      audienceIcon: Award,
      lastChanged: "May 17, 2024 02:45 PM",
      changedBy: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      icon: TrendingUp,
      iconStyle: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      id: "chrome-ext",
      name: "Chrome Extension Overlay",
      description: "Show AI insights overlay on supported retail sites.",
      environment: "Production",
      status: "In Progress",
      rollout: 40,
      audience: "Extension Users",
      audienceIcon: Monitor,
      lastChanged: "May 16, 2024 11:08 AM",
      changedBy: "Robert Taylor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      icon: Puzzle,
      iconStyle: "bg-purple-50 text-purple-600 border border-purple-100",
    },
    {
      id: "barcode-scan",
      name: "Mobile Barcode Scan",
      description: "Scan product barcode to search instantly.",
      environment: "Staging",
      status: "Enabled",
      rollout: 100,
      audience: "Mobile Users",
      audienceIcon: Smartphone,
      lastChanged: "May 15, 2024 05:20 PM",
      changedBy: "Jennifer Lee",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      icon: Smartphone,
      iconStyle: "bg-violet-50 text-violet-650 border border-violet-100",
    },
    {
      id: "ai-chatbot",
      name: "AI Chatbot",
      badge: { text: "Beta", style: "bg-blue-50 text-blue-650 border-blue-100" },
      description: "AI assistant to answer product questions.",
      environment: "Staging",
      status: "In Progress",
      rollout: 10,
      audience: "Premium Users",
      audienceIcon: Award,
      lastChanged: "May 15, 2024 09:34 AM",
      changedBy: "Kevin Clark",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
      icon: Bot,
      iconStyle: "bg-teal-50 text-teal-600 border border-teal-100",
    },
    {
      id: "adv-compare",
      name: "Advanced Comparison",
      badge: { text: "Disabled", style: "bg-slate-105 text-slate-500 border-slate-200 bg-slate-100" },
      description: "Detailed side-by-side comparison with AI insights.",
      environment: "Production",
      status: "Disabled",
      rollout: 0,
      audience: "All Users",
      audienceIcon: Globe,
      lastChanged: "May 14, 2024 01:10 PM",
      changedBy: "Lisa Martinez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      icon: Scale,
      iconStyle: "bg-slate-100 text-slate-500 border border-slate-200",
    },
  ]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [envFilter, setEnvFilter] = useState("All Environments");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [audienceFilter, setAudienceFilter] = useState("All Audiences");

  // KPI States
  const [totalCount, setTotalCount] = useState(28);
  const [enabledCount, setEnabledCount] = useState(16);
  const [inProgressCount, setInProgressCount] = useState(7);
  const [disabledCount, setDisabledCount] = useState(5);
  const [targetedCount, setTargetedCount] = useState(13);

  // Re-calculate KPIs dynamically whenever features state updates
  useEffect(() => {
    setTotalCount(features.length);
    setEnabledCount(features.filter((f) => f.status === "Enabled").length);
    setInProgressCount(features.filter((f) => f.status === "In Progress").length);
    setDisabledCount(features.filter((f) => f.status === "Disabled").length);
    setTargetedCount(features.filter((f) => f.audience !== "All Users").length);
  }, [features]);

  // Handle status toggle switch interactively
  const handleToggle = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          let nextStatus: "Enabled" | "In Progress" | "Disabled" = "Disabled";
          let nextRollout = f.rollout;

          if (f.status === "Disabled") {
            nextStatus = "Enabled";
            nextRollout = f.rollout === 0 ? 50 : f.rollout; // give active rollout if previously 0
          } else if (f.status === "Enabled") {
            nextStatus = "In Progress";
          } else if (f.status === "In Progress") {
            nextStatus = "Disabled";
            nextRollout = 0; // disable rollout indicator
          }

          return { ...f, status: nextStatus, rollout: nextRollout };
        }
        return f;
      })
    );
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchQuery("");
    setEnvFilter("All Environments");
    setStatusFilter("All Statuses");
    setAudienceFilter("All Audiences");
  };

  // Compute filters counts dynamically
  const activeFiltersCount =
    (envFilter !== "All Environments" ? 1 : 0) +
    (statusFilter !== "All Statuses" ? 1 : 0) +
    (audienceFilter !== "All Audiences" ? 1 : 0) +
    (searchQuery !== "" ? 1 : 0);

  // Filtered rows calculation
  const filteredFeatures = features.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEnv =
      envFilter === "All Environments" || f.environment === envFilter;

    const matchesStatus =
      statusFilter === "All Statuses" || f.status === statusFilter;

    const matchesAudience =
      audienceFilter === "All Audiences" || f.audience === audienceFilter;

    return matchesSearch && matchesEnv && matchesStatus && matchesAudience;
  });

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-6">
        
        {/* ─── Page Header ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full max-w-full border-b border-slate-100 pb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Feature Flags
              </h1>
              <span className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors select-none cursor-pointer">
                <Info className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Manage feature availability and rollout across environments and audiences.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0 select-none">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
              Import Flags
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
              Export Flags
            </button>
            
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#4338ca] shadow-xs">
              <Plus className="h-3.5 w-3.5" />
              Create Feature Flag
            </button>
          </div>
        </div>

        {/* ─── KPI Metrics Cards Section ─── */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 select-none w-full max-w-full">
          {[
            {
              title: "Total Features",
              value: totalCount,
              subtitle: "All environments",
              icon: Flag,
              color: "bg-[#EEF2FF] text-[#4F46E5]",
            },
            {
              title: "Enabled",
              value: enabledCount,
              subtitle: `${Math.round((enabledCount / (features.length || 1)) * 1000) / 10}% of total`,
              icon: CheckCircle,
              color: "bg-[#DCFCE7] text-[#15803D]",
            },
            {
              title: "In Progress",
              value: inProgressCount,
              subtitle: `${Math.round((inProgressCount / (features.length || 1)) * 1000) / 10}% of total`,
              icon: Clock,
              color: "bg-[#FFFBEB] text-[#B45309]",
            },
            {
              title: "Disabled",
              value: disabledCount,
              subtitle: `${Math.round((disabledCount / (features.length || 1)) * 1000) / 10}% of total`,
              icon: XCircle,
              color: "bg-[#FEE2E2] text-[#B91C1C]",
            },
            {
              title: "Targeted Features",
              value: targetedCount,
              subtitle: "With audience rules",
              icon: Users,
              color: "bg-[#E0F2FE] text-[#0369A1]",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs flex items-start gap-4 hover:border-slate-300 transition-colors">
                <div className={`mt-0.5 shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{card.title}</div>
                  <h2 className="mt-1 text-2xl font-extrabold text-slate-800 leading-none">{card.value}</h2>
                  <p className="mt-1.5 text-[11px] text-slate-400 font-semibold">{card.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Search & Filters Row ─── */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs w-full max-w-full flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between min-w-0 overflow-hidden">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 min-w-0 w-full">
            {/* Search Input */}
            <div className="sm:col-span-1 flex flex-col justify-end">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search feature name or description..."
                  className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs font-semibold text-slate-700 outline-none hover:border-slate-350 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Environment Dropdown */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Environment</label>
              <div className="relative">
                <select
                  value={envFilter}
                  onChange={(e) => setEnvFilter(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-8 py-2 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option>All Environments</option>
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-8 py-2 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option>All Statuses</option>
                  <option>Enabled</option>
                  <option>In Progress</option>
                  <option>Disabled</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Audience Dropdown */}
            <div className="flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Audience</label>
              <div className="relative">
                <select
                  value={audienceFilter}
                  onChange={(e) => setAudienceFilter(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-8 py-2 text-xs font-bold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option>All Audiences</option>
                  <option>All Users</option>
                  <option>Premium Users</option>
                  <option>Extension Users</option>
                  <option>Mobile Users</option>
                  <option>Women 18-45</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Reset Actions */}
          <div className="flex items-center gap-2.5 shrink-0 select-none justify-end">
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              Clear Filters
            </button>

            <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs select-none">
              <Sliders className="h-3.5 w-3.5 text-slate-400" />
              <span>Filters</span>
              <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200/50">
                {activeFiltersCount}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Features Interactive Table Section ─── */}
        <section className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs min-w-0">
          <div className="overflow-x-auto select-none">
            <table className="w-full min-w-[950px] text-xs text-left border-collapse">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 text-[10px] uppercase tracking-wider bg-slate-50/20">
                  <th className="py-3 px-4 font-bold">
                    <div className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600 transition-colors">
                      <span>Feature</span>
                      <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    </div>
                  </th>
                  <th className="py-3 font-bold w-[25%]">Description</th>
                  <th className="py-3 font-bold text-center pr-12">Environment</th>
                  <th className="py-3 font-bold pl-8">Status</th>
                  <th className="py-3 font-bold text-center w-[12%]">Rollout %</th>
                  <th className="py-3 font-bold">Audience</th>
                  <th className="py-3 font-bold">
                    <div className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600 transition-colors">
                      <span>Last Changed</span>
                      <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    </div>
                  </th>
                  <th className="py-3 text-center font-bold w-12 pr-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filteredFeatures.map((feature) => {
                  const Icon = feature.icon;
                  const AudienceIcon = feature.audienceIcon;

                  return (
                    <tr key={feature.id} className="hover:bg-slate-50/10 transition-colors">
                      {/* Feature Name */}
                      <td className="py-2.5 px-4 pr-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl shrink-0 ${feature.iconStyle}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-800 leading-tight truncate">{feature.name}</span>
                              {feature.badge && (
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${feature.badge.style}`}>
                                  {feature.badge.text}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="py-2.5 pr-3 text-slate-500 font-medium leading-relaxed">
                        {feature.description}
                      </td>

                      {/* Environment */}
                      <td className="py-2.5 text-center pr-12">
                        <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[10px] font-bold border ${
                          feature.environment === "Production"
                            ? "bg-[#DCFCE7]/70 text-[#15803D] border-[#DCFCE7]"
                            : "bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]"
                        }`}>
                          {feature.environment}
                        </span>
                      </td>

                      {/* Status Toggle Button */}
                      <td className="py-2.5 pl-8">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggle(feature.id)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              feature.status === "Enabled"
                                ? "bg-emerald-500"
                                : feature.status === "In Progress"
                                ? "bg-amber-500"
                                : "bg-slate-200"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                                feature.status === "Disabled" ? "translate-x-0" : "translate-x-4"
                              }`}
                            />
                          </button>
                          <span className={`text-[11px] font-bold ${
                            feature.status === "Enabled"
                              ? "text-emerald-700"
                              : feature.status === "In Progress"
                              ? "text-amber-700"
                              : "text-slate-400"
                          }`}>
                            {feature.status}
                          </span>
                        </div>
                      </td>

                      {/* Rollout % Bar */}
                      <td className="py-2.5 px-2">
                        <div className="flex flex-col gap-1 w-full max-w-[90px] mx-auto">
                          <div className="text-[10px] font-extrabold text-slate-700">{feature.rollout}%</div>
                          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
                              style={{ width: `${feature.rollout}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Audience */}
                      <td className="py-2.5 font-semibold text-slate-650 pr-2">
                        <div className="flex items-center gap-1.5">
                          <AudienceIcon className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>{feature.audience}</span>
                        </div>
                      </td>

                      {/* Last Changed */}
                      <td className="py-2.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={feature.avatar}
                            alt={feature.changedBy}
                            className="h-7 w-7 rounded-full object-cover border border-slate-250 shrink-0 shadow-xs"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-700 leading-none truncate">{feature.lastChanged}</div>
                            <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1 truncate">{feature.changedBy}</div>
                          </div>
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="py-2.5 text-center pr-4">
                        <button className="p-1 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredFeatures.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-450 font-semibold select-none text-slate-400">
                      No feature flags match the selected search or filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="p-4 border-t border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 select-none">
            <span>Showing 1 to {filteredFeatures.length} of {features.length} features</span>
            
            <div className="flex items-center gap-4 flex-wrap justify-end">
              {/* Labeled Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  className="appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-8 py-1.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-350 cursor-pointer"
                  defaultValue="10"
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
                <span className="px-2.5 py-1.5 text-slate-400 font-bold border-l border-slate-200 bg-slate-50/20">
                  ...
                </span>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold transition-colors">
                  Next
                </button>
                <button className="p-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-400 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
