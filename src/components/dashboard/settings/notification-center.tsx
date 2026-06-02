"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  BellRing, 
  BrainCircuit, 
  Plug, 
  User, 
  Link as LinkIcon, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Send, 
  FileText, 
  Settings,
  ChevronRight,
  Database,
  ChevronDown,
  Settings2
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const kpis = [
  {
    title: "Critical Alerts",
    value: "7",
    subtitle: "Requires immediate action →",
    icon: ShieldAlert,
    iconColor: "text-rose-600 bg-rose-50 border border-rose-100",
  },
  {
    title: "System Alerts",
    value: "18",
    subtitle: "Needs attention →",
    icon: BellRing,
    iconColor: "text-amber-500 bg-amber-50 border border-amber-100",
  },
  {
    title: "AI Review Alerts",
    value: "26",
    subtitle: "Pending reviews →",
    icon: BrainCircuit,
    iconColor: "text-blue-600 bg-blue-50 border border-blue-100",
  },
  {
    title: "Retailer Connector Alerts",
    value: "9",
    subtitle: "Connector issues →",
    icon: Plug,
    iconColor: "text-violet-600 bg-violet-50 border border-violet-100",
  },
  {
    title: "User Report Alerts",
    value: "12",
    subtitle: "New reports →",
    icon: User,
    iconColor: "text-emerald-600 bg-emerald-50 border border-emerald-100",
  },
  {
    title: "Affiliate Link Alerts",
    value: "8",
    subtitle: "Link issues →",
    icon: LinkIcon,
    iconColor: "text-cyan-600 bg-cyan-50 border border-cyan-100",
  },
];

const notifications = [
  {
    id: 1,
    title: "Walmart connector error rate increased to 6.2%.",
    subtitle: "Error rate is above the 5% threshold.",
    icon: ShieldAlert,
    iconColor: "text-rose-600",
    category: "Retailer Connector",
    categoryColor: "bg-violet-50 text-violet-700",
    priority: "Critical",
    priorityColor: "bg-rose-50 text-rose-700",
    time: "5m ago",
    assignedTo: "Dev Team",
    isCritical: true,
    hasRedDot: true,
  },
  {
    id: 2,
    title: "Search service response time is high",
    subtitle: "Average response time is 2.8s (threshold: 2s).",
    icon: Database,
    iconColor: "text-amber-500",
    category: "System",
    categoryColor: "bg-amber-50 text-amber-700",
    priority: "High",
    priorityColor: "bg-orange-50 text-orange-700",
    time: "15m ago",
    assignedTo: "SRE Team",
    isCritical: false,
    hasBlueDot: true,
  },
  {
    id: 3,
    title: "AI review queue backlog is growing",
    subtitle: "152 items waiting for review.",
    icon: BrainCircuit,
    iconColor: "text-blue-600",
    category: "AI Review",
    categoryColor: "bg-blue-50 text-blue-700",
    priority: "High",
    priorityColor: "bg-orange-50 text-orange-700",
    time: "22m ago",
    assignedTo: "AI Reviewers",
    isCritical: false,
    hasBlueDot: true,
  },
  {
    id: 4,
    title: "New user report received",
    subtitle: 'Report regarding product "XYZ Ultra Serum".',
    icon: User,
    iconColor: "text-emerald-600",
    category: "User Report",
    categoryColor: "bg-emerald-50 text-emerald-700",
    priority: "Medium",
    priorityColor: "bg-amber-50 text-amber-700",
    time: "35m ago",
    assignedTo: "Trust & Safety",
    isCritical: false,
    hasBlueDot: true,
  },
  {
    id: 5,
    title: "Affiliate link not resolving",
    subtitle: "LinkID 984321 is returning HTTP 404.",
    icon: LinkIcon,
    iconColor: "text-violet-600",
    category: "Affiliate Link",
    categoryColor: "bg-cyan-50 text-cyan-700",
    priority: "Medium",
    priorityColor: "bg-amber-50 text-amber-700",
    time: "1h ago",
    assignedTo: "Affiliate Team",
    isCritical: false,
  },
  {
    id: 6,
    title: "Best Buy connector rate limit reached",
    subtitle: "API rate limit reached 90% in the last 10 minutes.",
    icon: Plug,
    iconColor: "text-violet-600",
    category: "Retailer Connector",
    categoryColor: "bg-violet-50 text-violet-700",
    priority: "Medium",
    priorityColor: "bg-amber-50 text-amber-700",
    time: "1h 20m ago",
    assignedTo: "Dev Team",
    isCritical: false,
  },
  {
    id: 7,
    title: "Database backup completed with warnings",
    subtitle: "Some tables took longer than expected.",
    icon: BellRing,
    iconColor: "text-amber-500",
    category: "System",
    categoryColor: "bg-amber-50 text-amber-700",
    priority: "Low",
    priorityColor: "bg-emerald-50 text-emerald-700",
    time: "2h ago",
    assignedTo: "SRE Team",
    isCritical: false,
  },
  {
    id: 8,
    title: "AI model accuracy drift detected",
    subtitle: "Confidence score drifted by -3.7%.",
    icon: BrainCircuit,
    iconColor: "text-blue-600",
    category: "AI Review",
    categoryColor: "bg-blue-50 text-blue-700",
    priority: "Low",
    priorityColor: "bg-emerald-50 text-emerald-700",
    time: "3h ago",
    assignedTo: "ML Team",
    isCritical: false,
  },
];

const chartData = [
  { name: "Critical", value: 7, color: "#E11D48" }, // rose-600
  { name: "High", value: 26, color: "#F97316" },    // orange-500
  { name: "Medium", value: 27, color: "#EAB308" },  // yellow-500
  { name: "Low", value: 20, color: "#22C55E" },     // green-500
];

const recentActivity = [
  {
    title: "Notification settings updated",
    subtitle: "by Sarah Johnson",
    time: "2h ago",
    icon: CheckCircle2,
    iconColor: "text-emerald-500 bg-emerald-50",
  },
  {
    title: "Amazon connector recovered",
    subtitle: "Error rate back to normal",
    time: "3h ago",
    icon: Plug,
    iconColor: "text-violet-600 bg-violet-50",
  },
  {
    title: "User report resolved",
    subtitle: "Report ID #UR-2456 closed",
    time: "5h ago",
    icon: User,
    iconColor: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "AI review completed",
    subtitle: "25 items reviewed",
    time: "6h ago",
    icon: BrainCircuit,
    iconColor: "text-blue-600 bg-blue-50",
  },
];

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState("All Notifications");

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 min-w-0">
      <div className="flex-1 w-full p-3 sm:p-4 lg:p-6 flex flex-col gap-4 sm:gap-6 min-w-0">
        
        {/* Header Area */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Notification Center
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor system activity, alerts, and important updates across the platform.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                <option>All Categories</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
              Mark all as read
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area: Asymmetric Grid */}
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 min-w-0">
          
          {/* Left/Center: Top KPIs & Main Notification Table (75%) */}
          <div className="xl:w-[75%] flex flex-col gap-4 sm:gap-6 min-w-0">
            
            {/* Top KPI Row */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6 w-full">
              {kpis.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-3 relative group overflow-hidden min-h-[80px]">
                    <div className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full ${card.iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden text-left">
                      <div className="text-[10px] font-bold text-slate-500 truncate">{card.title}</div>
                      <h2 className="text-base font-bold text-slate-950 leading-tight">{card.value}</h2>
                      <div className="text-[9px] text-slate-400 group-hover:text-indigo-600 transition-colors truncate">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col gap-4 sm:gap-6 min-w-0">
            
            {/* Tabs & Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-4">
              <nav className="flex items-center gap-6 overflow-x-auto min-w-0">
                {["All Notifications", "Unread (42)", "Assigned to Me (5)", "Mentions (3)"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap pb-4 text-sm font-semibold transition-colors relative ${
                      activeTab === tab
                        ? "text-indigo-600"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full min-w-0">
              <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Notification</th>
                    <th className="px-4 py-3 font-semibold text-slate-500 text-xs text-center">Category</th>
                    <th className="px-4 py-3 font-semibold text-slate-500 text-xs text-center">Priority</th>
                    <th className="px-4 py-3 font-semibold text-slate-500 text-xs text-center">Time</th>
                    <th className="px-4 py-3 font-semibold text-slate-500 text-xs text-center">Assigned To</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <tr 
                        key={notif.id} 
                        className={`transition-colors hover:bg-slate-50/50 ${notif.isCritical ? 'bg-rose-50/40' : 'bg-white'}`}
                      >
                        <td className="px-4 py-4 align-top">
                          <div className="flex items-center gap-2 mt-1">
                            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                            <div className="w-2 flex justify-center">
                              {notif.hasRedDot && <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />}
                              {notif.hasBlueDot && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top w-full">
                          <div className="flex items-start gap-4">
                            <div className={`mt-0.5 shrink-0 ${notif.iconColor}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">{notif.title}</p>
                              <p className="mt-0.5 text-xs text-slate-500 truncate">{notif.subtitle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top text-center">
                          <span className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide ${notif.categoryColor}`}>
                            {notif.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top text-center">
                          <span className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide ${notif.priorityColor}`}>
                            {notif.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top text-center">
                          <span className="text-xs font-medium text-slate-500">{notif.time}</span>
                        </td>
                        <td className="px-4 py-4 align-top text-center">
                          <span className="text-xs font-medium text-slate-600">{notif.assignedTo}</span>
                        </td>
                        <td className="px-4 py-4 align-top text-right">
                          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">Showing 1 to 8 of 42 notifications</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="relative">
                    <select className="appearance-none rounded-md border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                      <option>10 per page</option>
                      <option>20 per page</option>
                      <option>50 per page</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </label>
                <nav className="inline-flex items-center rounded-md bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
                  <button className="px-3 py-1.5 text-slate-500 hover:text-slate-900 border-r border-slate-200 transition-colors bg-white hover:bg-slate-50">
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </button>
                  <button className="px-3.5 py-1.5 text-sm font-semibold text-white bg-[#4F46E5]">1</button>
                  <button className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">2</button>
                  <button className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">3</button>
                  <button className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">4</button>
                  <button className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors border-r border-slate-200">5</button>
                  <button className="px-3 py-1.5 text-slate-500 hover:text-slate-900 transition-colors bg-white hover:bg-slate-50">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
          </div>

          {/* Right Sidebar (25%) */}
          <div className="xl:w-[25%] flex flex-col gap-4 sm:gap-6 min-w-0">
            
            {/* Notification Card Example */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900">Notification Card Example</h3>
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 rounded-full bg-violet-100 p-1.5 text-violet-600">
                    <Plug className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 leading-tight">Walmart connector error rate increased to 6.2%.</h4>
                    <p className="mt-1.5 text-[13px] text-slate-600 leading-snug">Error rate is above the 5% threshold for the last 15 minutes.</p>
                    <p className="mt-3 text-xs font-medium text-slate-400">10:24 AM • May 20, 2024</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button className="w-full justify-center rounded-lg border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm transition hover:bg-violet-50">
                    View Connector
                  </button>
                  <button className="w-full justify-center rounded-lg border border-transparent bg-transparent px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>

            {/* Alert Summary */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Alert Summary</h3>
              <div className="flex items-center justify-between">
                <div className="relative h-32 w-32 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900 leading-none">80</span>
                    <span className="text-[10px] font-semibold uppercase text-slate-500 mt-1">Total</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2.5 flex-1 pl-6">
                  {chartData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{item.value}</span>
                        <span className="text-slate-400 w-8 text-right">({Math.round((item.value / 80) * 100)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="flex flex-col gap-5">
                {recentActivity.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 mt-0.5 rounded-full p-1.5 ${activity.iconColor}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{activity.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-400 shrink-0">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:bg-slate-50 hover:border-indigo-200 group">
                  <div className="flex items-center gap-3">
                    <Send className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-900">Create Notification</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:bg-slate-50 hover:border-indigo-200 group">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-500 group-hover:text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-900">Notification Templates</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:bg-slate-50 hover:border-indigo-200 group">
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-slate-500 group-hover:text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-900">Notification Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
