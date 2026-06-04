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
  Shield,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  X,
  User,
  Bot,
  Eye,
  Cpu,
  Lock,
  Link2,
  Clock,
  BookOpen,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Trash2,
  Flag,
  RefreshCw,
  GitBranch,
  ExternalLink,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────
type LogType =
  | "AI Audit"
  | "Human Review"
  | "Affiliate Disclosure"
  | "Source History"
  | "Admin Activity"
  | "Model Version"
  | "Privacy Action";

type LogStatus = "Completed" | "Reviewed" | "Deployed" | "Warning" | "Failed";

interface ComplianceLog {
  id: string;
  time: string;
  logType: LogType;
  productName?: string;
  productId?: string;
  productImage?: string;
  userEmail?: string;
  userId?: string;
  adminEmail?: string;
  adminId?: string;
  action: string;
  modelVersion: string;
  promptVersion: string;
  scoreVersion: string;
  actorType: "AI System" | "admin@happy.com" | "System" | "System Monitor";
  status: LogStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────
const MOCK_LOGS: ComplianceLog[] = [
  {
    id: "LOG-001",
    time: "May 20, 2024 10:15:43 AM",
    logType: "AI Audit",
    productName: "Apple Watch Series 9",
    productId: "884512",
    productImage: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=80&q=80",
    action: "AI verdict generated",
    modelVersion: "gpt-4o-2024-05-13",
    promptVersion: "v2.3.1",
    scoreVersion: "v1.7.0",
    actorType: "AI System",
    status: "Completed",
  },
  {
    id: "LOG-002",
    time: "May 20, 2024 10:14:22 AM",
    logType: "Human Review",
    productName: "Apple Watch Series 9",
    productId: "884512",
    productImage: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=80&q=80",
    action: "Human review completed (No changes)",
    modelVersion: "gpt-4o-2024-05-13",
    promptVersion: "v2.3.1",
    scoreVersion: "v1.7.0",
    actorType: "admin@happy.com",
    status: "Reviewed",
  },
  {
    id: "LOG-003",
    time: "May 20, 2024 09:58:11 AM",
    logType: "Affiliate Disclosure",
    productName: "Dyson V15 Detect",
    productId: "773311",
    productImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=80&q=80",
    action: "Disclosure displayed",
    modelVersion: "N/A",
    promptVersion: "N/A",
    scoreVersion: "N/A",
    actorType: "System",
    status: "Completed",
  },
  {
    id: "LOG-004",
    time: "May 20, 2024 09:48:05 AM",
    logType: "Source History",
    productName: "Sony WH-1000XM5",
    productId: "662211",
    productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=80&q=80",
    action: "Sources retrieved (23 sources)",
    modelVersion: "gpt-4o-2024-05-13",
    promptVersion: "v2.3.1",
    scoreVersion: "v1.7.0",
    actorType: "AI System",
    status: "Completed",
  },
  {
    id: "LOG-005",
    time: "May 20, 2024 09:30:54 AM",
    logType: "Admin Activity",
    adminEmail: "admin@happy.com",
    adminId: "1001",
    action: "Product override (Changed verdict)",
    modelVersion: "N/A",
    promptVersion: "N/A",
    scoreVersion: "N/A",
    actorType: "admin@happy.com",
    status: "Completed",
  },
  {
    id: "LOG-006",
    time: "May 20, 2024 09:22:18 AM",
    logType: "AI Audit",
    productName: "Ninja AF101 Air Fryer",
    productId: "551122",
    productImage: "https://images.unsplash.com/photo-1612883338060-c6a8b5b64d2c?w=80&q=80",
    action: "AI verdict generated",
    modelVersion: "gpt-4o-2024-05-13",
    promptVersion: "v2.3.1",
    scoreVersion: "v1.7.0",
    actorType: "AI System",
    status: "Completed",
  },
  {
    id: "LOG-007",
    time: "May 20, 2024 09:10:33 AM",
    logType: "Model Version",
    action: "Model version deployed",
    modelVersion: "gpt-4o-2024-05-13",
    promptVersion: "v2.3.1",
    scoreVersion: "v1.7.0",
    actorType: "System",
    status: "Deployed",
  },
  {
    id: "LOG-008",
    time: "May 20, 2024 09:05:09 AM",
    logType: "Privacy Action",
    userEmail: "user_89231@example.com",
    userId: "89231",
    action: "Data exported",
    modelVersion: "N/A",
    promptVersion: "N/A",
    scoreVersion: "N/A",
    actorType: "admin@happy.com",
    status: "Completed",
  },
  {
    id: "LOG-009",
    time: "May 20, 2024 08:59:47 AM",
    logType: "Affiliate Disclosure",
    productName: "Samsung Galaxy S24 Ultra",
    productId: "331100",
    productImage: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80&q=80",
    action: "Disclosure missing warning",
    modelVersion: "N/A",
    promptVersion: "N/A",
    scoreVersion: "N/A",
    actorType: "System Monitor",
    status: "Warning",
  },
  {
    id: "LOG-010",
    time: "May 20, 2024 08:45:21 AM",
    logType: "AI Audit",
    productName: "Instant Pot Duo 7-in-1",
    productId: "229977",
    productImage: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&q=80",
    action: "AI verdict generated",
    modelVersion: "gpt-4o-2024-05-06",
    promptVersion: "v2.2.0",
    scoreVersion: "v1.6.4",
    actorType: "AI System",
    status: "Completed",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────
const getLogTypeBadge = (type: LogType) => {
  switch (type) {
    case "AI Audit":
      return "text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE]";
    case "Human Review":
      return "text-[#0891B2] bg-[#ECFEFF] border border-[#A5F3FC]";
    case "Affiliate Disclosure":
      return "text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A]";
    case "Source History":
      return "text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0]";
    case "Admin Activity":
      return "text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA]";
    case "Model Version":
      return "text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE]";
    case "Privacy Action":
      return "text-[#DB2777] bg-[#FDF2F8] border border-[#FBCFE8]";
    default:
      return "text-slate-700 bg-slate-100 border-slate-200";
  }
};

const getStatusBadge = (status: LogStatus) => {
  switch (status) {
    case "Completed":
      return "text-emerald-700 bg-emerald-50 border border-emerald-200";
    case "Reviewed":
      return "text-blue-700 bg-blue-50 border border-blue-200";
    case "Deployed":
      return "text-purple-700 bg-purple-50 border border-purple-200";
    case "Warning":
      return "text-amber-700 bg-amber-50 border border-amber-200";
    case "Failed":
      return "text-red-700 bg-red-50 border border-red-200";
    default:
      return "text-slate-700 bg-slate-100 border-slate-200";
  }
};

const getActorIcon = (actorType: string) => {
  switch (actorType) {
    case "AI System":
      return Bot;
    case "admin@happy.com":
      return User;
    case "System":
    case "System Monitor":
      return Activity;
    default:
      return User;
  }
};

// ─── Component ────────────────────────────────────────────────────────────
export default function ComplianceLog() {
  const [dateRange] = useState("May 14, 2024 – May 20, 2024");
  const [logTypeFilter, setLogTypeFilter] = useState("All Types");
  const [productSearch, setProductSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [actorFilter, setActorFilter] = useState("All Actors");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const handleClearFilters = () => {
    setLogTypeFilter("All Types");
    setProductSearch("");
    setUserSearch("");
    setActorFilter("All Actors");
    setStatusFilter("All Statuses");
  };

  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter((log) => {
      if (logTypeFilter !== "All Types" && log.logType !== logTypeFilter) return false;
      if (productSearch && !log.productName?.toLowerCase().includes(productSearch.toLowerCase()) && !log.productId?.includes(productSearch)) return false;
      if (userSearch && !log.userEmail?.toLowerCase().includes(userSearch.toLowerCase()) && !log.adminEmail?.toLowerCase().includes(userSearch.toLowerCase()) && !log.userId?.includes(userSearch)) return false;
      if (actorFilter !== "All Actors" && log.actorType !== actorFilter) return false;
      if (statusFilter !== "All Statuses" && log.status !== statusFilter) return false;
      return true;
    });
  }, [logTypeFilter, productSearch, userSearch, actorFilter, statusFilter]);

  // ─── Category Summary Cards ─────────────────────────────────────────────
  const categoryCards = [
    { label: "AI Audit Logs", value: "12,842", href: "/dashboard/compliance/ai", color: "text-[#4F46E5] bg-[#EEF2FF] border-[#C7D2FE]", icon: Bot, selected: true },
    { label: "Affiliate Disclosure Logs", value: "4,215", href: "/dashboard/compliance/affiliate", color: "text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]", icon: Link2, selected: false },
    { label: "Source History", value: "18,765", href: "/dashboard/compliance/source", color: "text-[#16A34A] bg-[#F0FDF4] border-[#BBF7D0]", icon: BookOpen, selected: false },
    { label: "Model Version Logs", value: "45", href: "/dashboard/compliance/model", color: "text-[#7C3AED] bg-[#F5F3FF] border-[#DDD6FE]", icon: Cpu, selected: false },
    { label: "Admin Activity", value: "2,341", href: "/dashboard/compliance/admin", color: "text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]", icon: Shield, selected: false },
    { label: "Privacy Actions", value: "856", href: "#", color: "text-[#DB2777] bg-[#FDF2F8] border-[#FBCFE8]", icon: Lock, selected: false },
  ];

  // ─── KPI Metrics Row ────────────────────────────────────────────────────
  const kpiMetrics = [
    { title: "Total Logs", value: "12,842", prev: "vs May 7 – May 13 10,882", change: "+15.6%", up: true, icon: FileText, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "AI Verdicts Logged", value: "8,921", prev: "vs May 7 – May 13 7,810", change: "+14.3%", up: true, icon: Bot, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { title: "Human Reviews", value: "1,243", prev: "vs May 7 – May 13 1,146", change: "+8.7%", up: true, icon: Eye, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
    { title: "Overrides / Edits", value: "342", prev: "vs May 7 – May 13 354", change: "-3.2%", up: false, icon: Edit3, color: "text-amber-600 bg-amber-50 border-amber-100" },
    { title: "Model Versions Used", value: "5", prev: "vs May 7 – May 13  —", change: "—", up: true, icon: GitBranch, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { title: "Compliance Issues", value: "23", prev: "vs May 7 – May 13 26", change: "-11.5%", up: false, icon: AlertTriangle, color: "text-red-600 bg-red-50 border-red-100" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-8 py-6 space-y-6">

        {/* ─── Page Header ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight">
              Compliance Logs
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Audit trail for AI decisions, sources, affiliate disclosures, models, and admin actions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 select-none">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-250 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <Download className="h-4 w-4 text-slate-500" />
              Export Logs
            </button>
          </div>
        </div>

        {/* ─── Category Summary Cards ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoryCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.href}
                className={`rounded-xl border p-3.5 flex flex-col gap-2 transition hover:shadow-sm cursor-pointer ${
                  card.selected
                    ? "bg-[#4F46E5] border-[#4338CA] text-white shadow-md"
                    : `bg-white border-slate-200 hover:border-slate-300`
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`p-1 rounded-md border ${card.selected ? "bg-white/20 border-white/30 text-white" : card.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className={`text-[10px] font-bold leading-tight ${card.selected ? "text-white/80" : "text-slate-500"}`}>{card.label}</span>
                </div>
                <div className={`text-xl font-bold leading-none ${card.selected ? "text-white" : "text-slate-900"}`}>{card.value}</div>
              </a>
            );
          })}
        </div>

        {/* ─── KPI Metrics ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpiMetrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`p-1 rounded-md border ${m.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">{m.title}</span>
                </div>
                <div className="text-xl font-bold text-slate-900 leading-none">{m.value}</div>
                <div className="flex items-center gap-0.5 mt-1.5 text-[9px] font-bold leading-none select-none flex-wrap">
                  {m.change !== "—" && (
                    <>
                      {m.up ? (
                        <ArrowUpRight className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                      ) : (
                        <ArrowDownRight className="h-2.5 w-2.5 text-red-500 shrink-0" />
                      )}
                      <span className={m.up ? "text-emerald-600" : "text-red-500"}>{m.change}</span>
                    </>
                  )}
                  <span className="text-slate-400 font-medium ml-0.5">{m.prev}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Filters Row ─── */}
        <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs w-full max-w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 min-w-0">
          <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto">

            {/* Log Type */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-700 select-none leading-none">Log Type</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white px-3 min-w-[140px] h-[38px] relative shadow-3xs">
                <div className="relative w-full flex items-center">
                  <select
                    value={logTypeFilter}
                    onChange={(e) => setLogTypeFilter(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                  >
                    <option value="All Types">All Types</option>
                    <option value="AI Audit">AI Audit</option>
                    <option value="Human Review">Human Review</option>
                    <option value="Affiliate Disclosure">Affiliate Disclosure</option>
                    <option value="Source History">Source History</option>
                    <option value="Admin Activity">Admin Activity</option>
                    <option value="Model Version">Model Version</option>
                    <option value="Privacy Action">Privacy Action</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Search */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-700 select-none leading-none">Product</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white px-3 min-w-[180px] h-[38px] gap-1.5 shadow-3xs">
                <input
                  suppressHydrationWarning
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search product ID or name..."
                  className="flex-1 bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal min-w-0"
                />
                <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </div>
            </div>

            {/* User Search */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-700 select-none leading-none">User</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white px-3 min-w-[180px] h-[38px] gap-1.5 shadow-3xs">
                <input
                  suppressHydrationWarning
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user email or ID..."
                  className="flex-1 bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal min-w-0"
                />
                <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </div>
            </div>

            {/* Actor Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-700 select-none leading-none">Actor</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white px-3 min-w-[140px] h-[38px] relative shadow-3xs">
                <div className="relative w-full flex items-center">
                  <select
                    value={actorFilter}
                    onChange={(e) => setActorFilter(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                  >
                    <option value="All Actors">All Actors</option>
                    <option value="AI System">AI System</option>
                    <option value="admin@happy.com">admin@happy.com</option>
                    <option value="System">System</option>
                    <option value="System Monitor">System Monitor</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-700 select-none leading-none">Status</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white px-3 min-w-[140px] h-[38px] relative shadow-3xs">
                <div className="relative w-full flex items-center">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Warning">Warning</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-3.5 shrink-0 select-none">
            <button
              onClick={handleClearFilters}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors px-3 py-2 whitespace-nowrap"
            >
              Clear Filters
            </button>
            <button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-5 py-2 text-sm font-semibold rounded-lg transition shadow-sm whitespace-nowrap">
              Apply Filters
            </button>
          </div>
        </section>

        {/* ─── Data Table ─── */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs min-w-0 overflow-hidden">
          <div className="overflow-x-auto select-none">
            <table className="w-full min-w-[1200px] text-sm text-left border-collapse">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 text-xs uppercase tracking-wider bg-slate-50/10">
                  <th className="py-3 px-5 font-bold w-[13%]">
                    <span className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600 transition">
                      Time
                      <ChevronDown className="h-3 w-3" />
                    </span>
                  </th>
                  <th className="py-3 font-bold w-[10%]">Log Type</th>
                  <th className="py-3 font-bold w-[16%]">Product / User / Admin</th>
                  <th className="py-3 font-bold w-[13%]">Action</th>
                  <th className="py-3 font-bold w-[13%]">Model Version</th>
                  <th className="py-3 font-bold w-[8%]">Prompt Version</th>
                  <th className="py-3 font-bold w-[8%]">Score Version</th>
                  <th className="py-3 font-bold w-[10%]">Actor</th>
                  <th className="py-3 font-bold w-[7%]">Status</th>
                  <th className="py-3 text-center font-bold w-[8%] pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLogs.map((row) => {
                  const ActorIcon = getActorIcon(row.actorType);
                  return (
                    <tr key={row.id} className="cursor-pointer hover:bg-slate-50/40 transition-colors">

                      {/* Time */}
                      <td className="py-3.5 px-5 text-xs text-slate-500 font-medium whitespace-nowrap">{row.time}</td>

                      {/* Log Type Badge */}
                      <td className="py-3.5">
                        <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap ${getLogTypeBadge(row.logType)}`}>
                          {row.logType}
                        </span>
                      </td>

                      {/* Product / User / Admin */}
                      <td className="py-3.5 pr-3">
                        {row.productName ? (
                          <div className="flex items-center gap-2 min-w-0">
                            {row.productImage && (
                              <img src={row.productImage} alt={row.productName} className="h-7 w-7 rounded-md object-cover border border-slate-150 shrink-0" />
                            )}
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">{row.productName}</div>
                              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Product ID: {row.productId}</div>
                            </div>
                          </div>
                        ) : row.adminEmail ? (
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate">{row.adminEmail}</div>
                            <div className="text-[10px] text-slate-400 font-medium mt-0.5">Admin ID: {row.adminId}</div>
                          </div>
                        ) : row.userEmail ? (
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate">{row.userEmail}</div>
                            <div className="text-[10px] text-slate-400 font-medium mt-0.5">User ID: {row.userId}</div>
                          </div>
                        ) : (
                          <span className="text-slate-350 text-xs">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 text-xs text-slate-700 font-medium pr-3 max-w-[160px]">
                        <span title={row.action}>{row.action}</span>
                      </td>

                      {/* Model Version */}
                      <td className="py-3.5 text-[10px] font-mono text-slate-600 font-semibold">{row.modelVersion}</td>

                      {/* Prompt Version */}
                      <td className="py-3.5 text-[10px] font-mono text-slate-600 font-semibold">{row.promptVersion}</td>

                      {/* Score Version */}
                      <td className="py-3.5 text-[10px] font-mono text-slate-600 font-semibold">{row.scoreVersion}</td>

                      {/* Actor */}
                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                          <ActorIcon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[100px]" title={row.actorType}>{row.actorType}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${getStatusBadge(row.status)}`}>
                          {row.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 text-center pr-5">
                        <div className="flex items-center justify-center gap-1">
                          <button className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-[#4F46E5] hover:bg-slate-50 transition shadow-3xs whitespace-nowrap">
                            View Details
                          </button>
                          <button className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-slate-400 font-bold select-none">
                      No compliance logs match your current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="p-4 border-t border-slate-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500 select-none bg-white">
            <span className="text-xs font-semibold">Showing 1 to {filteredLogs.length} of 12,842 logs</span>

            <div className="flex items-center gap-4 flex-wrap justify-end">
              <div className="relative inline-flex items-center">
                <select
                  className="appearance-none rounded-lg border border-slate-250 bg-white pl-3.5 pr-8 py-1.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-350 cursor-pointer"
                  defaultValue="25"
                >
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white text-xs">
                <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200 text-slate-400 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="px-3 py-1.5 bg-[#4F46E5] text-white font-bold">1</button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold">2</button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold">3</button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold">4</button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold">5</button>
                <span className="px-2.5 py-1.5 border-l border-slate-200 text-slate-400 select-none">...</span>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-700 font-semibold">514</button>
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
