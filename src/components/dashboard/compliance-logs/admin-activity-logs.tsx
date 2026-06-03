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
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit3,
  Check,
  RefreshCw,
  Flag,
  XCircle,
  HelpCircle,
  EyeOff,
  UserCheck,
  Terminal,
} from "lucide-react";

// Types
interface AdminLog {
  id: string;
  time: string;
  utcTime: string;
  adminName: string;
  adminEmail: string;
  adminAvatar: string;
  role: "Super Admin" | "Content Manager" | "Reviewer" | "Affiliate Manager";
  action: string;
  actionIcon: React.ComponentType<any>;
  actionColor: string;
  risk: "Low" | "Moderate" | "High";
  page: string;
  targetType: string;
  targetId: string;
  targetName?: string;
  ip: string;
  device: string;
  status: "Success" | "Failed";
  details: string;
  metadata?: Record<string, string>;
}

export default function AdminActivityLogs() {
  // Mock Data
  const [logs] = useState<AdminLog[]>([
    {
      id: "ACT-001",
      time: "May 20, 2024 10:28:45 AM",
      utcTime: "May 20, 2024 10:28:45 AM (UTC)",
      adminName: "John Smith",
      adminEmail: "john.smith@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
      role: "Super Admin",
      action: "Deleted product",
      actionIcon: Trash2,
      actionColor: "text-red-500 bg-red-50 border-red-100",
      risk: "High",
      page: "/admin/products",
      targetType: "Product ID",
      targetId: "884512",
      targetName: "Apple AirPods Pro (2nd Gen)",
      ip: "192.168.1.45",
      device: "Chrome / Windows",
      status: "Success",
      details: "Product and all related data deleted",
      metadata: {
        category: "Electronics",
        deletionReason: "Out of stock permanently / merchant request",
        backupId: "BKP-884512-PROD",
      },
    },
    {
      id: "ACT-002",
      time: "May 20, 2024 10:15:12 AM",
      utcTime: "May 20, 2024 10:15:12 AM (UTC)",
      adminName: "Sarah Johnson",
      adminEmail: "sarah.j@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
      role: "Content Manager",
      action: "Updated AI verdict",
      actionIcon: Edit3,
      actionColor: "text-amber-500 bg-amber-50 border-amber-100",
      risk: "Moderate",
      page: "/admin/ai-review",
      targetType: "Verdict ID",
      targetId: "VD-771122",
      targetName: "Product ID: 662211",
      ip: "192.168.1.67",
      device: "Safari / macOS",
      status: "Success",
      details: "Changed verdict from Avoid to Wait",
      metadata: {
        previousState: "Avoid",
        newState: "Wait",
        justification: "Additional user reviews crawled showed positive shift",
      },
    },
    {
      id: "ACT-003",
      time: "May 20, 2024 09:52:33 AM",
      utcTime: "May 20, 2024 09:52:33 AM (UTC)",
      adminName: "Michael Brown",
      adminEmail: "michael.b@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
      role: "Reviewer",
      action: "Approved human review",
      actionIcon: Check,
      actionColor: "text-emerald-500 bg-emerald-50 border-emerald-100",
      risk: "Low",
      page: "/admin/ai-review",
      targetType: "Review ID",
      targetId: "HR-55211",
      targetName: "Product ID: 773311",
      ip: "192.168.1.89",
      device: "Firefox / Windows",
      status: "Success",
      details: "Review approved and published",
      metadata: {
        reviewerNotes: "Verified purchase badge confirmed. Rating is accurate.",
        pointsAwarded: "10 XP",
      },
    },
    {
      id: "ACT-004",
      time: "May 20, 2024 09:31:08 AM",
      utcTime: "May 20, 2024 09:31:08 AM (UTC)",
      adminName: "Emily Davis",
      adminEmail: "emily.d@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
      role: "Affiliate Manager",
      action: "Updated affiliate link",
      actionIcon: Edit3,
      actionColor: "text-amber-500 bg-amber-50 border-amber-100",
      risk: "Moderate",
      page: "/admin/affiliate-links",
      targetType: "Partner",
      targetId: "Amazon Associates",
      targetName: "Product ID: 884512",
      ip: "192.168.1.23",
      device: "Chrome / Windows",
      status: "Success",
      details: "Replaced broken link with new URL",
      metadata: {
        oldUrl: "https://amazon.com/dp/B09XS7JWHH?tag=oldtag",
        newUrl: "https://amazon.com/dp/B09XS7JWHH?tag=buywish-20",
        linkCheck: "Active / Status 200 OK",
      },
    },
    {
      id: "ACT-005",
      time: "May 20, 2024 09:12:19 AM",
      utcTime: "May 20, 2024 09:12:19 AM (UTC)",
      adminName: "David Wilson",
      adminEmail: "david.w@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
      role: "Super Admin",
      action: "Restored product",
      actionIcon: RefreshCw,
      actionColor: "text-emerald-500 bg-emerald-50 border-emerald-100",
      risk: "High",
      page: "/admin/products",
      targetType: "Product ID",
      targetId: "551122",
      targetName: "Ninja AF101 Air Fryer",
      ip: "192.168.1.45",
      device: "Edge / Windows",
      status: "Success",
      details: "Product restored from trash",
      metadata: {
        restorationPath: "/archive/trash",
        approvedBy: "John Smith",
      },
    },
    {
      id: "ACT-006",
      time: "May 20, 2024 08:45:17 AM",
      utcTime: "May 20, 2024 08:45:17 AM (UTC)",
      adminName: "Lisa Martinez",
      adminEmail: "lisa.m@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
      role: "Content Manager",
      action: "Flagged content",
      actionIcon: Flag,
      actionColor: "text-amber-500 bg-amber-50 border-amber-100",
      risk: "Moderate",
      page: "/admin/user-reports",
      targetType: "Report ID",
      targetId: "REP-88991",
      targetName: "Product ID: 331100",
      ip: "192.168.1.76",
      device: "Chrome / macOS",
      status: "Success",
      details: "Content flagged for policy violation",
      metadata: {
        reason: "Suspected spam / promotional links in review description",
        violatingText: "Click here to win a free iphone...",
      },
    },
    {
      id: "ACT-007",
      time: "May 20, 2024 08:22:03 AM",
      utcTime: "May 20, 2024 08:22:03 AM (UTC)",
      adminName: "Robert Taylor",
      adminEmail: "robert.t@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
      role: "Reviewer",
      action: "Rejected human review",
      actionIcon: XCircle,
      actionColor: "text-red-500 bg-red-50 border-red-100",
      risk: "Low",
      page: "/admin/ai-review",
      targetType: "Review ID",
      targetId: "HR-55209",
      targetName: "Product ID: 662211",
      ip: "192.168.1.101",
      device: "Safari / iOS",
      status: "Success",
      details: "Review rejected due to insufficient evidence",
      metadata: {
        rejectionReason: "No photos uploaded to support quality complaints.",
        appealWindow: "14 days",
      },
    },
    {
      id: "ACT-008",
      time: "May 20, 2024 07:55:46 AM",
      utcTime: "May 20, 2024 07:55:46 AM (UTC)",
      adminName: "Jennifer Lee",
      adminEmail: "jennifer.l@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
      role: "Affiliate Manager",
      action: "Disabled affiliate link",
      actionIcon: XCircle,
      actionColor: "text-red-500 bg-red-50 border-red-100",
      risk: "High",
      page: "/admin/affiliate-links",
      targetType: "Partner",
      targetId: "Best Buy",
      targetName: "Product ID: 773311",
      ip: "192.168.1.23",
      device: "Chrome / Windows",
      status: "Success",
      details: "Link disabled due to low conversion rate",
      metadata: {
        clicksLast30Days: "1,200",
        purchases: "0",
        alternativePartner: "Amazon",
      },
    },
    {
      id: "ACT-009",
      time: "May 20, 2024 07:33:11 AM",
      utcTime: "May 20, 2024 07:33:11 AM (UTC)",
      adminName: "Kevin Clark",
      adminEmail: "kevin.c@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80",
      role: "Super Admin",
      action: "Updated user role",
      actionIcon: UserCheck,
      actionColor: "text-blue-500 bg-blue-50 border-blue-100",
      risk: "High",
      page: "/admin/users",
      targetType: "User ID",
      targetId: "user_89231",
      targetName: "user@example.com",
      ip: "192.168.1.45",
      device: "Chrome / Windows",
      status: "Success",
      details: "Changed role from Reviewer to Admin",
      metadata: {
        approvalTicket: "JIRA-4821",
        prevRole: "Reviewer",
        newRole: "Admin",
      },
    },
    {
      id: "ACT-010",
      time: "May 20, 2024 07:10:28 AM",
      utcTime: "May 20, 2024 07:10:28 AM (UTC)",
      adminName: "Amanda White",
      adminEmail: "amanda.w@happyadmin.com",
      adminAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
      role: "Content Manager",
      action: "Deleted user report",
      actionIcon: Trash2,
      actionColor: "text-red-500 bg-red-50 border-red-100",
      risk: "High",
      page: "/admin/user-reports",
      targetType: "Report ID",
      targetId: "REP-88912",
      targetName: "Product ID: 884512",
      ip: "192.168.1.76",
      device: "Firefox / Windows",
      status: "Success",
      details: "Report deleted after review",
      metadata: {
        reviewerNotes: "Duplicate report submitted by the same user.",
        discardedDate: "May 20, 2024",
      },
    },
  ]);

  // Selected Log State (Drawer)
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  // Filter States
  const [adminFilter, setAdminFilter] = useState<string>("All Admins");
  const [roleFilter, setRoleFilter] = useState<string>("All Roles");
  const [actionFilter, setActionFilter] = useState<string>("All Actions");
  const [dateRange, setDateRange] = useState<string>("May 14, 2024 – May 20, 2024");
  const [highRiskOnly, setHighRiskOnly] = useState<boolean>(false);

  const activeLog = useMemo(() => {
    return logs.find((l) => l.id === selectedLogId) || null;
  }, [selectedLogId, logs]);

  // Clear filters
  const handleClearFilters = () => {
    setAdminFilter("All Admins");
    setRoleFilter("All Roles");
    setActionFilter("All Actions");
    setHighRiskOnly(false);
  };

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (adminFilter !== "All Admins" && log.adminName !== adminFilter) return false;
      if (roleFilter !== "All Roles" && log.role !== roleFilter) return false;
      if (actionFilter !== "All Actions" && log.action !== actionFilter) return false;
      if (highRiskOnly && log.risk !== "High") return false;
      return true;
    });
  }, [logs, adminFilter, roleFilter, actionFilter, highRiskOnly]);

  // Unique filters data lists
  const adminsList = useMemo(() => {
    const list = new Set(logs.map((l) => l.adminName));
    return Array.from(list);
  }, [logs]);

  const rolesList = useMemo(() => {
    const list = new Set(logs.map((l) => l.role));
    return Array.from(list);
  }, [logs]);

  const actionsList = useMemo(() => {
    const list = new Set(logs.map((l) => l.action));
    return Array.from(list);
  }, [logs]);

  // Badge coloring helper for Role
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE]";
      case "Content Manager":
        return "text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD]";
      case "Reviewer":
        return "text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0]";
      case "Affiliate Manager":
        return "text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE]";
      default:
        return "text-slate-700 bg-slate-100 border-slate-200";
    }
  };

  // Badge coloring for Risk status
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-red-700 bg-red-50 border border-red-200";
      case "Moderate":
        return "text-amber-700 bg-amber-50 border border-amber-200";
      case "Low":
        return "text-emerald-700 bg-emerald-50 border border-emerald-250";
      default:
        return "text-slate-650 bg-slate-50 border border-slate-200";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-8 py-6 space-y-6">
        

        {/* ─── Page Header ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight flex items-center gap-2">
              Admin Activity Logs
              <span title="Audits administrator actions, product changes, and user report details" className="cursor-help">
                <Info className="h-4.5 w-4.5 text-slate-400" />
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Track all actions performed by administrators in the system.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 select-none">
            {/* Header Date Range Button */}
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-250 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
            </button>
            {/* Export Logs Button */}
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <Download className="h-4 w-4 text-slate-500" />
              Export Logs
            </button>
          </div>
        </div>

        {/* ─── Filters Section ─── */}
        <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs w-full max-w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 min-w-0">
          <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto">
            
            {/* Admin selector */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-3xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Admin</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={adminFilter}
                  onChange={(e) => setAdminFilter(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Admins">All Admins</option>
                  {adminsList.map((admin) => (
                    <option key={admin} value={admin}>{admin}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* Role selector */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-3xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Role</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Roles">All Roles</option>
                  {rolesList.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* Action Type selector */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[140px] h-[52px] justify-between relative shadow-3xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Action Type</label>
              <div className="relative w-full flex items-center mb-0.5">
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-5 appearance-none select-none"
                >
                  <option value="All Actions">All Actions</option>
                  {actionsList.map((action) => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4F46E5] pointer-events-none" />
              </div>
            </div>

            {/* Time Range */}
            <div className="flex flex-col border border-slate-200 rounded-xl bg-white px-3 py-1.5 min-w-[185px] h-[52px] justify-between relative shadow-3xs">
              <label className="text-[10px] text-slate-400 font-bold select-none block leading-none">Time Range</label>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 leading-none mb-0.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="whitespace-nowrap">{dateRange}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-auto shrink-0" />
              </div>
            </div>

            {/* Checkbox / High Risk Only toggle */}
            <div className="flex items-center h-[52px] select-none">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-650">
                <input
                  type="checkbox"
                  checked={highRiskOnly}
                  onChange={(e) => setHighRiskOnly(e.target.checked)}
                  className="rounded border-slate-350 text-[#4F46E5] focus:ring-[#4F46E5] h-4 w-4 cursor-pointer"
                />
                <Shield className="h-4 w-4 text-red-500 shrink-0" />
                <span className="whitespace-nowrap">High-risk actions only</span>
              </label>
            </div>

          </div>

          <div className="flex items-center gap-3.5 shrink-0 h-[52px] select-none justify-end lg:justify-start">
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

        {/* ─── Metric Indicator Summary Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full select-none">
          {[
            {
              title: "Total Activities",
              value: "2,341",
              desc: "vs May 7 – May 13 2,189",
              change: "+6.94%",
              icon: Info,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              up: true
            },
            {
              title: "High-risk Actions",
              value: "128",
              desc: "vs May 7 – May 13 104",
              change: "+23.08%",
              icon: Shield,
              color: "text-red-600 bg-red-50 border-red-100",
              up: true
            },
            {
              title: "Moderate-risk Actions",
              value: "315",
              desc: "vs May 7 – May 13 298",
              change: "+5.70%",
              icon: AlertTriangle,
              color: "text-amber-600 bg-amber-50 border-amber-100",
              up: true
            },
            {
              title: "Low-risk Actions",
              value: "1,898",
              desc: "vs May 7 – May 13 1,787",
              change: "+6.21%",
              icon: CheckCircle2,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              up: true
            }
          ].map((widget, i) => {
            const Icon = widget.icon;
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-2xs flex items-center gap-4.5">
                <div className={`p-2.5 rounded-xl shrink-0 border ${widget.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none leading-none">{widget.title}</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2 leading-none">{widget.value}</div>
                  <div className="flex items-center gap-1 mt-2 text-[10px] font-bold leading-none select-none">
                    <span className="text-slate-400 font-medium">{widget.desc}</span>
                    <span className="flex items-center ml-0.5">
                      {widget.up ? (
                        <ArrowUpRight className="h-3 w-3 text-emerald-600 shrink-0" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500 shrink-0" />
                      )}
                      <span className={widget.up ? "text-emerald-600" : "text-red-500"}>{widget.change}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Logs Data Table Card ─── */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs min-w-0 overflow-hidden">
          <div className="overflow-x-auto select-none">
            <table className="w-full min-w-[1200px] text-sm text-left border-collapse">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 text-xs uppercase tracking-wider bg-slate-50/10">
                  <th className="py-3 px-5 font-bold w-[13%]">Time</th>
                  <th className="py-3 font-bold w-[12%]">Admin</th>
                  <th className="py-3 font-bold w-[12%]">Role</th>
                  <th className="py-3 font-bold w-[13%]">Action</th>
                  <th className="py-3 font-bold w-[12%]">Page</th>
                  <th className="py-3 font-bold w-[14%]">Target Object</th>
                  <th className="py-3 font-bold w-[12%]">IP / Device</th>
                  <th className="py-3 font-bold w-[6%]">Status</th>
                  <th className="py-3 font-bold w-[14%]">Details</th>
                  <th className="py-3 text-center font-bold w-[6%] pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLogs.map((row) => {
                  const ActionIcon = row.actionIcon;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedLogId(row.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedLogId === row.id ? "bg-indigo-50/30 hover:bg-indigo-50/40" : "hover:bg-slate-50/30"
                      }`}
                    >
                      {/* Time */}
                      <td className="py-4 px-5 text-xs text-slate-500 font-medium">
                        {row.time}
                      </td>

                      {/* Admin Info */}
                      <td className="py-4">
                        <div className="flex items-center gap-2.5 min-w-0 leading-tight">
                          <img
                            src={row.adminAvatar}
                            alt={row.adminName}
                            className="h-7 w-7 rounded-full object-cover border border-slate-250 shrink-0"
                          />
                          <span className="font-bold text-slate-900 text-xs truncate">{row.adminName}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4">
                        <span className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold ${getRoleBadgeStyle(row.role)}`}>
                          {row.role}
                        </span>
                      </td>

                      {/* Action (Icon + Name) */}
                      <td className="py-4">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                          <span className={`p-1 rounded ${row.actionColor} shrink-0`}>
                            <ActionIcon className="h-3.5 w-3.5" />
                          </span>
                          <span>{row.action}</span>
                        </div>
                      </td>

                      {/* Page */}
                      <td className="py-4 text-xs font-mono text-slate-500">
                        {row.page}
                      </td>

                      {/* Target Object */}
                      <td className="py-4">
                        <div className="leading-tight text-xs">
                          <span className="text-slate-400 font-bold pr-1">{row.targetType}:</span>
                          <span className="font-bold text-slate-800">{row.targetId}</span>
                          {row.targetName && (
                            <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{row.targetName}</div>
                          )}
                        </div>
                      </td>

                      {/* IP / Device */}
                      <td className="py-4">
                        <div className="leading-tight">
                          <div className="text-xs font-semibold text-slate-800 font-mono">{row.ip}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-0.5">{row.device}</div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-0.5 font-bold border border-emerald-200">
                          Success
                        </span>
                      </td>

                      {/* Details */}
                      <td className="py-4 pr-2">
                        <span className="text-xs text-slate-500 font-medium truncate block max-w-[200px]" title={row.details}>
                          {row.details}
                        </span>
                      </td>

                      {/* View Action CTA */}
                      <td className="py-4 text-center pr-5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedLogId(row.id)}
                            className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-[#4F46E5] hover:bg-slate-50 transition shadow-3xs"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setSelectedLogId(row.id)}
                            className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition"
                          >
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
                      No administrator logs match your current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="p-4 border-t border-slate-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500 select-none bg-white">
            <span>Showing 1 to {filteredLogs.length} of 2,341 activities</span>
            
            <div className="flex items-center gap-4 flex-wrap justify-end">
              {/* Size Selector */}
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

              {/* Paginator */}
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white text-xs">
                <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200 text-slate-400 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="px-3 py-1.5 bg-[#4F46E5] text-white font-bold transition-colors">
                  1
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-755 font-semibold transition-colors">
                  2
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-755 font-semibold transition-colors">
                  3
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-755 font-semibold transition-colors">
                  4
                </button>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-755 font-semibold transition-colors">
                  5
                </button>
                <span className="px-2.5 py-1.5 border-l border-slate-200 text-slate-400 select-none">...</span>
                <button className="px-3 py-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-755 font-semibold transition-colors">
                  94
                </button>
                <button className="p-1.5 hover:bg-slate-50 border-l border-slate-200 text-slate-400 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ─── Premium Action Drawer Panel (Slide-Over) ─── */}
      {selectedLogId && activeLog && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-500/30 backdrop-blur-xs transition-opacity" 
              onClick={() => setSelectedLogId(null)}
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out border-l border-slate-100">
                <div className="flex h-full flex-col overflow-y-auto">
                  
                  {/* Drawer Header */}
                  <div className="bg-slate-50/60 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900" id="slide-over-title">
                        Log Action Details
                      </h2>
                      <p className="mt-0.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        {activeLog.id}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-md text-slate-400 hover:text-slate-600 outline-none p-1 hover:bg-slate-100/50"
                      onClick={() => setSelectedLogId(null)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 px-5 py-5 space-y-6 text-xs">
                    
                    {/* Status Summary */}
                    <div className="rounded-xl border border-slate-150 p-4 bg-slate-50/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Risk Assessment</span>
                        <span className={`inline-flex rounded px-1.5 py-0.5 text-[9px] font-bold ${getRiskBadgeColor(activeLog.risk)}`}>
                          {activeLog.risk} Risk
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Status</span>
                        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-0.5 font-bold border border-emerald-200">
                          Success
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Time Taken</span>
                        <span className="font-semibold text-slate-800 font-mono">145ms</span>
                      </div>
                    </div>

                    {/* Admin Profile Details */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Administrator</h4>
                      <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl bg-white shadow-3xs">
                        <img
                          src={activeLog.adminAvatar}
                          alt={activeLog.adminName}
                          className="h-10 w-10 rounded-full object-cover border border-slate-200"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm leading-tight">{activeLog.adminName}</div>
                          <span className={`inline-flex rounded px-1.5 py-0.25 text-[8.5px] font-bold mt-1.5 ${getRoleBadgeStyle(activeLog.role)}`}>
                            {activeLog.role}
                          </span>
                          <div className="text-[9px] text-slate-400 font-medium mt-1 truncate flex items-center gap-1 select-all">
                            <span>{activeLog.adminEmail}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Meta Details */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action & Target</h4>
                      <div className="border border-slate-150 rounded-xl overflow-hidden divide-y divide-slate-100">
                        <div className="p-3 flex justify-between bg-white">
                          <span className="text-slate-500 font-medium">Action Performed</span>
                          <span className="font-bold text-slate-900">{activeLog.action}</span>
                        </div>
                        <div className="p-3 flex justify-between bg-white">
                          <span className="text-slate-500 font-medium">Page Location</span>
                          <span className="font-mono font-semibold text-slate-700">{activeLog.page}</span>
                        </div>
                        <div className="p-3 flex justify-between bg-white">
                          <span className="text-slate-500 font-medium">Target Type</span>
                          <span className="font-semibold text-slate-800">{activeLog.targetType}</span>
                        </div>
                        <div className="p-3 flex justify-between bg-white">
                          <span className="text-slate-500 font-medium">Target ID</span>
                          <span className="font-mono font-bold text-slate-900">{activeLog.targetId}</span>
                        </div>
                        {activeLog.targetName && (
                          <div className="p-3 bg-white">
                            <div className="text-slate-500 font-medium mb-1">Target Object Label</div>
                            <div className="font-bold text-slate-800 break-all">{activeLog.targetName}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Network & Browser details */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security & Environment</h4>
                      <div className="border border-slate-150 rounded-xl overflow-hidden divide-y divide-slate-100">
                        <div className="p-3 flex justify-between bg-white">
                          <span className="text-slate-500 font-medium">IP Address</span>
                          <span className="font-mono font-bold text-slate-900">{activeLog.ip}</span>
                        </div>
                        <div className="p-3 flex justify-between bg-white">
                          <span className="text-slate-500 font-medium">Agent Details</span>
                          <span className="font-semibold text-slate-800">{activeLog.device}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Metadata details */}
                    {activeLog.metadata && (
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Extended Payload</h4>
                        <div className="border border-slate-150 rounded-xl p-3 bg-slate-50/40 font-mono text-[10px] text-slate-750 space-y-2 whitespace-pre-wrap break-all leading-normal select-all">
                          {JSON.stringify(activeLog.metadata, null, 2)}
                        </div>
                      </div>
                    )}

                    {/* Action Log Narrative */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Change Narrative</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-semibold bg-[#EEF2FF]/20 border border-[#EEF2FF] rounded-xl p-3">
                        {activeLog.details}.
                      </p>
                    </div>

                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/50 flex gap-2">
                    <button 
                      onClick={() => setSelectedLogId(null)}
                      className="flex-1 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white h-9 text-xs font-semibold text-slate-700 hover:bg-slate-100/50 transition shadow-3xs"
                    >
                      Close Details
                    </button>
                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338ca] text-white h-9 text-xs font-semibold transition shadow-2xs">
                      View Raw JSON
                      <Terminal className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
