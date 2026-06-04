"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Download,
  Filter,
  Calendar,
  Eye,
  MoreVertical,
  Lock,
  Edit2,
  ExternalLink,
  ChevronDown,
  Shield,
} from "lucide-react";

interface PrivacyRequest {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  type: {
    name: string;
    desc: string;
    icon: React.ReactNode;
    colorClass: string;
  };
  status: "Pending" | "In Progress" | "Completed" | "Rejected";
  requestedOn: string;
  dueDate: string;
  dueDaysText: string;
  dueColorClass?: string;
}

const mockRequests: PrivacyRequest[] = [
  {
    id: "PR-84231",
    user: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    type: {
      name: "Data Export",
      desc: "Download my data",
      icon: <FileText className="h-3.5 w-3.5" />,
      colorClass: "bg-indigo-50 text-indigo-600 border border-indigo-150",
    },
    status: "Pending",
    requestedOn: "May 26, 2025 10:24 AM",
    dueDate: "May 30, 2025",
    dueDaysText: "in 4 days",
    dueColorClass: "text-amber-600",
  },
  {
    id: "PR-84230",
    user: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    type: {
      name: "Account Deletion",
      desc: "Delete my account",
      icon: <Lock className="h-3.5 w-3.5" />,
      colorClass: "bg-emerald-50 text-emerald-600 border border-emerald-150",
    },
    status: "In Progress",
    requestedOn: "May 26, 2025 09:58 AM",
    dueDate: "May 31, 2025",
    dueDaysText: "in 5 days",
    dueColorClass: "text-blue-600",
  },
  {
    id: "PR-84229",
    user: {
      name: "Emily Davis",
      email: "emily.davis@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    type: {
      name: "Data Correction",
      desc: "Correct my information",
      icon: <Edit2 className="h-3.5 w-3.5" />,
      colorClass: "bg-amber-50 text-amber-600 border border-amber-150",
    },
    status: "Pending",
    requestedOn: "May 25, 2025 08:15 AM",
    dueDate: "May 29, 2025",
    dueDaysText: "in 3 days",
    dueColorClass: "text-amber-600",
  },
  {
    id: "PR-84228",
    user: {
      name: "David Wilson",
      email: "david.wilson@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
    type: {
      name: "Data Export",
      desc: "Download my data",
      icon: <FileText className="h-3.5 w-3.5" />,
      colorClass: "bg-indigo-50 text-indigo-600 border border-indigo-150",
    },
    status: "Completed",
    requestedOn: "May 24, 2025 03:32 PM",
    dueDate: "May 27, 2025",
    dueDaysText: "",
  },
  {
    id: "PR-84227",
    user: {
      name: "Jessica Brown",
      email: "jessica.brown@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    },
    type: {
      name: "Account Deletion",
      desc: "Delete my account",
      icon: <Lock className="h-3.5 w-3.5" />,
      colorClass: "bg-emerald-50 text-emerald-600 border border-emerald-150",
    },
    status: "Completed",
    requestedOn: "May 24, 2025 11:21 AM",
    dueDate: "May 27, 2025",
    dueDaysText: "",
  },
  {
    id: "PR-84226",
    user: {
      name: "Robert Garcia",
      email: "robert.garcia@email.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    },
    type: {
      name: "Data Correction",
      desc: "Correct my information",
      icon: <Edit2 className="h-3.5 w-3.5" />,
      colorClass: "bg-amber-50 text-amber-600 border border-amber-150",
    },
    status: "Rejected",
    requestedOn: "May 23, 2025 04:57 PM",
    dueDate: "May 26, 2025",
    dueDaysText: "",
  },
  {
    id: "PR-84225",
    user: {
      name: "Lisa Martinez",
      email: "lisa.martinez@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    },
    type: {
      name: "Data Export",
      desc: "Download my data",
      icon: <FileText className="h-3.5 w-3.5" />,
      colorClass: "bg-indigo-50 text-indigo-600 border border-indigo-150",
    },
    status: "Completed",
    requestedOn: "May 23, 2025 09:13 AM",
    dueDate: "May 26, 2025",
    dueDaysText: "",
  },
  {
    id: "PR-84224",
    user: {
      name: "James Anderson",
      email: "james.anderson@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
    type: {
      name: "Account Deletion",
      desc: "Delete my account",
      icon: <Lock className="h-3.5 w-3.5" />,
      colorClass: "bg-emerald-50 text-emerald-600 border border-emerald-150",
    },
    status: "In Progress",
    requestedOn: "May 22, 2025 02:44 PM",
    dueDate: "May 27, 2025",
    dueDaysText: "in 1 day",
    dueColorClass: "text-rose-600",
  },
];

export default function PrivacyActions() {
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "In Progress" | "Completed" | "Rejected">("All");

  const filteredRequests = mockRequests.filter((r) => {
    if (activeTab === "All") return true;
    return r.status === activeTab;
  });

  return (
    <div className="bg-slate-50 min-h-full w-full font-sans pb-4">
      <div className="w-full max-w-full px-2 sm:px-4 md:px-5 py-5 space-y-5">
        
        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Privacy Actions
              </h1>
              <span className="h-4.5 w-4.5 rounded-full border border-slate-350 flex items-center justify-center text-[10px] font-bold text-slate-450 cursor-help" title="User privacy management">i</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-550 mt-1 select-none">
              Manage and review user privacy requests including data access, export, deletion, and corrections.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 select-none">
            <button className="flex justify-center items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors whitespace-nowrap">
              <Download className="h-3.5 w-3.5" /> Download Report
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {/* Card 1: Total Requests */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-indigo-50/60 text-indigo-650 flex items-center justify-center shrink-0">
              <FileText className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Requests</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">1,248</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 14.6%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 2: Pending */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-amber-50/60 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">236</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 11.2%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 3: In Progress */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-blue-50/60 text-blue-600 flex items-center justify-center shrink-0">
              <RefreshCw className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">In Progress</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">98</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 5.3%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 4: Completed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-emerald-50/60 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">842</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-emerald-600 font-bold">↗ 18.7%</span> vs last 30 days
              </span>
            </div>
          </div>

          {/* Card 5: Rejected */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:py-5 sm:px-4.5 shadow-xs flex items-center gap-2 sm:gap-3.5 w-full">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-rose-50/60 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rejected</span>
              <span className="text-base sm:text-2xl font-extrabold text-slate-900 leading-tight mt-0.5 block">72</span>
              <span className="text-[8.5px] sm:text-[10px] text-slate-500 block mt-0.5 whitespace-nowrap">
                <span className="text-rose-605 font-bold">↘ 8.4%</span> vs last 30 days
              </span>
            </div>
          </div>
        </div>

        {/* Filters Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4 select-none">
          <div className="flex flex-wrap items-center gap-3">
            {/* Request Type */}
            <div className="flex flex-col gap-1 w-full sm:w-[150px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Request Type</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Types</option>
                  <option>Data Export</option>
                  <option>Account Deletion</option>
                  <option>Data Correction</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1 w-full sm:w-[130px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Rejected</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Date Range */}
            <div className="flex flex-col gap-1 w-full sm:w-[180px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date Range</span>
              <div className="relative flex items-center border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-55 transition overflow-hidden">
                <span className="pl-3 text-slate-400"><Calendar className="h-3.5 w-3.5" /></span>
                <input
                  type="text"
                  defaultValue="May 13 – May 26, 2025"
                  className="w-full border-0 bg-transparent py-1.5 pl-2 pr-3 text-xs font-bold text-slate-700 outline-none"
                />
              </div>
            </div>

            {/* User Location */}
            <div className="flex flex-col gap-1 w-full sm:w-[150px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">User Location</span>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50/50 hover:bg-slate-55 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer transition">
                  <option>All Locations</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Europe</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:self-end ml-auto">
              <button className="flex items-center gap-1.5 h-8.5 px-3.5 text-xs font-bold text-slate-750 bg-slate-50/70 border border-slate-200 rounded-lg hover:bg-slate-50 shadow-3xs transition">
                <Filter className="h-3.5 w-3.5 text-slate-400" /> Filters
              </button>
              <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition">
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Table Section */}
          <div className="min-w-0 lg:col-span-9 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
              
              {/* Table Toolbar */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 select-none">
                <div className="flex items-center gap-5 text-xs font-bold overflow-x-auto whitespace-nowrap pb-1 scrollbar-none w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("All")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "All" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    All Requests (1,248)
                  </button>
                  <button
                    onClick={() => setActiveTab("Pending")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Pending" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Pending (236)
                  </button>
                  <button
                    onClick={() => setActiveTab("In Progress")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "In Progress" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    In Progress (98)
                  </button>
                  <button
                    onClick={() => setActiveTab("Completed")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Completed" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Completed (842)
                  </button>
                  <button
                    onClick={() => setActiveTab("Rejected")}
                    className={cn("pb-1 border-b-2 transition-colors", activeTab === "Rejected" ? "border-[#4F46E5] text-slate-900" : "border-transparent text-slate-455 hover:text-slate-700")}
                  >
                    Rejected (72)
                  </button>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                  <div className="relative">
                    <select className="appearance-none bg-transparent pl-1 pr-6 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer">
                      <option>Sort by: Newest First</option>
                      <option>Sort by: Oldest First</option>
                      <option>Sort by: Highest Priority</option>
                    </select>
                    <ChevronDown className="absolute right-0.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-450 font-bold uppercase tracking-wider text-[10px] select-none">
                      <th className="py-3 px-4 w-[12%] font-bold">Request ID</th>
                      <th className="py-3 px-4 w-[20%] font-bold">User</th>
                      <th className="py-3 px-4 w-[24%] font-bold">Request Type</th>
                      <th className="py-3 px-4 w-[12%] font-bold">Status</th>
                      <th className="py-3 px-4 w-[16%] font-bold">Requested On</th>
                      <th className="py-3 px-4 w-[16%] font-bold">Due Date</th>
                      <th className="py-3 px-4 w-[8%] text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {filteredRequests.map((row) => {
                      return (
                        <tr
                          key={row.id}
                          className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        >
                          <td className="py-4 px-4 text-slate-900 font-bold">
                            {row.id}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img src={row.user.avatar} className="h-7 w-7 rounded-full object-cover shadow-3xs border border-slate-200" alt="" />
                              <div className="leading-tight min-w-0">
                                <span className="text-xs font-bold text-slate-900 block truncate">{row.user.name}</span>
                                <span className="text-[10px] text-slate-450 font-medium block mt-0.5 truncate">{row.user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className={cn("h-7 w-7 rounded-lg flex items-center justify-center shrink-0", row.type.colorClass)}>
                                {row.type.icon}
                              </span>
                              <div className="leading-tight min-w-0">
                                <span className="font-bold text-slate-900 block">{row.type.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium block mt-0.5 truncate">{row.type.desc}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 select-none">
                            {row.status === "Completed" || row.status === "Rejected" ? (
                              <span className={cn(
                                "inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-extrabold leading-none tracking-wide uppercase",
                                row.status === "Completed" ? "text-emerald-700 bg-emerald-50 border border-emerald-250" : "text-rose-700 bg-rose-50 border border-rose-250"
                              )}>
                                {row.status}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-xs font-bold">
                                <span className={cn(
                                  "h-1.5 w-1.5 rounded-full shrink-0",
                                  row.status === "Pending" ? "bg-amber-500" : "bg-blue-500"
                                )}></span>
                                <span className={row.status === "Pending" ? "text-amber-700" : "text-blue-700"}>{row.status}</span>
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="leading-tight text-slate-600">
                              <span className="font-bold block text-slate-800">{row.requestedOn.split(" ").slice(0, 3).join(" ")}</span>
                              <span className="text-[10px] font-medium text-slate-450 block mt-0.5">{row.requestedOn.split(" ").slice(3).join(" ")}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="leading-tight">
                              <span className="font-bold text-slate-800 block">{row.dueDate}</span>
                              {row.dueDaysText && (
                                <span className={cn("text-[10px] font-bold block mt-0.5", row.dueColorClass)}>
                                  {row.dueDaysText}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-2xs transition">
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                              {row.status === "Completed" && (
                                <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-2xs transition" title="Download privacy file">
                                  <Download className="h-3.5 w-3.5" />
                                </button>
                              )}
                              <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50/50 shadow-2xs transition">
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

              {/* Table Footer Pagination */}
              <div className="px-5 py-4 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-455 font-bold select-none">
                <span className="text-[11px] font-bold">
                  Showing 1 to 8 of 1,248 results
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-450">Rows per page</span>
                    <div className="relative">
                      <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-650 outline-none cursor-pointer shadow-2xs hover:bg-slate-55 transition">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-450">&lt;</button>
                    <button className="h-8 w-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center text-xs font-black shadow-sm">1</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">2</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">3</button>
                    <span className="px-1 text-slate-350 text-xs">...</span>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition text-slate-600">125</button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-450">&gt;</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Info Panel */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100 select-none">
              <Shield className="h-4.5 w-4.5 text-[#4F46E5]" />
              <h2 className="text-sm font-bold text-slate-800">About Privacy Actions</h2>
            </div>

            <p className="text-xs text-slate-550 leading-relaxed font-medium">
              Manage user privacy requests in accordance with data protection regulations.
            </p>

            <div className="space-y-4">
              {/* Bullet 1 */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-50/60 text-indigo-650 flex items-center justify-center shrink-0 shadow-3xs">
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight text-xs font-semibold">
                  <span className="font-bold text-slate-900 block">Data Export</span>
                  <span className="text-[10.5px] text-slate-450 font-medium block mt-0.5">Users can request a copy of their personal data.</span>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-50/60 text-emerald-600 flex items-center justify-center shrink-0 shadow-3xs">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight text-xs font-semibold">
                  <span className="font-bold text-slate-900 block">Account Deletion</span>
                  <span className="text-[10.5px] text-slate-450 font-medium block mt-0.5">Users can request to delete their account and all associated data.</span>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-50/60 text-amber-600 flex items-center justify-center shrink-0 shadow-3xs">
                  <Edit2 className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight text-xs font-semibold">
                  <span className="font-bold text-slate-900 block">Data Correction</span>
                  <span className="text-[10.5px] text-slate-450 font-medium block mt-0.5">Users can request corrections to inaccurate personal information.</span>
                </div>
              </div>

              {/* Bullet 4 */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-50/60 text-[#4F46E5] flex items-center justify-center shrink-0 shadow-3xs">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight text-xs font-semibold">
                  <span className="font-bold text-slate-900 block">Request Timeline</span>
                  <span className="text-[10.5px] text-slate-450 font-medium block mt-0.5">Requests are typically completed within 30 days.</span>
                </div>
              </div>

              {/* Bullet 5 */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-50/60 text-blue-600 flex items-center justify-center shrink-0 shadow-3xs">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <div className="leading-tight text-xs font-semibold">
                  <span className="font-bold text-slate-900 block">Secure & Compliant</span>
                  <span className="text-[10.5px] text-slate-450 font-medium block mt-0.5">All requests are verified and processed securely.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 select-none">
              <button className="w-full py-2 bg-white hover:bg-slate-50 border border-slate-250 text-xs font-bold text-slate-700 rounded-lg transition shadow-2xs flex items-center justify-center gap-1.5">
                <span>View Privacy Policy</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
