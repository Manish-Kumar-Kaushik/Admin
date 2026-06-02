"use client";

import React, { useState } from "react";
import {
  Shield,
  Users,
  Star,
  Percent,
  HelpCircle,
  Eye,
  Info,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Pencil,
  Copy,
  Trash2,
  Upload,
  Plus,
  Search,
  MoreHorizontal,
  X,
  ShieldCheck,
} from "lucide-react";

// Definitions of roles with their custom stylings
interface Role {
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  suggestedDesc: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  allowed: number;
  denied: number;
}

const rolesData: Role[] = [
  {
    name: "Super Admin",
    count: 8,
    icon: Shield,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    badgeBg: "bg-[#EEF2FF]",
    badgeText: "text-[#4F46E5]",
    description: "Has full control over the entire system including all modules, settings, and user management.",
    suggestedDesc: "Full access to all modules and settings.",
    createdAt: "Jan 2, 2024 11:22 AM",
    createdBy: "System",
    updatedAt: "May 10, 2024 02:15 PM",
    allowed: 48,
    denied: 0,
  },
  {
    name: "Operations Admin",
    count: 6,
    icon: Users,
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#0369A1]",
    badgeBg: "bg-[#E0F2FE]",
    badgeText: "text-[#0369A1]",
    description: "Responsible for operational content, product listings, and retailer sync checks.",
    suggestedDesc: "Manage day-to-day operations and content.",
    createdAt: "Jan 5, 2024 09:15 AM",
    createdBy: "System",
    updatedAt: "May 12, 2024 10:45 AM",
    allowed: 28,
    denied: 20,
  },
  {
    name: "AI Reviewer",
    count: 7,
    icon: Star,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#15803D]",
    badgeBg: "bg-[#DCFCE7]",
    badgeText: "text-[#15803D]",
    description: "Dedicated to analyzing and approving automated AI review verdicts and score audits.",
    suggestedDesc: "Review AI verdicts and provide approvals.",
    createdAt: "Feb 1, 2024 02:30 PM",
    createdBy: "System",
    updatedAt: "May 15, 2024 04:20 PM",
    allowed: 18,
    denied: 30,
  },
  {
    name: "Affiliate Manager",
    count: 4,
    icon: Percent,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#B45309]",
    badgeBg: "bg-[#FEF3C7]",
    badgeText: "text-[#B45309]",
    description: "Manages partner relations, affiliate links, conversion statistics, and commission rates.",
    suggestedDesc: "Manage affiliate links, partners, and performance.",
    createdAt: "Feb 10, 2024 10:00 AM",
    createdBy: "System",
    updatedAt: "May 18, 2024 11:30 AM",
    allowed: 14,
    denied: 34,
  },
  {
    name: "Support Admin",
    count: 5,
    icon: HelpCircle,
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-[#0F766E]",
    badgeBg: "bg-[#D1FAE5]",
    badgeText: "text-[#0F766E]",
    description: "Handles customer inquiries, user feedback reports, price corrections, and support logs.",
    suggestedDesc: "Handle user support and reports.",
    createdAt: "Mar 1, 2024 08:30 AM",
    createdBy: "System",
    updatedAt: "May 20, 2024 09:00 AM",
    allowed: 8,
    denied: 40,
  },
  {
    name: "Read Only",
    count: 9,
    icon: Eye,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-[#4B5563]",
    badgeBg: "bg-[#F3F4F6]",
    badgeText: "text-[#4B5563]",
    description: "Auditing and observer role. Can view dashboard metrics, tables, and logs but cannot modify.",
    suggestedDesc: "View-only access across the platform.",
    createdAt: "Jan 1, 2024 09:00 AM",
    createdBy: "System",
    updatedAt: "May 1, 2024 12:00 PM",
    allowed: 11,
    denied: 37,
  },
];

const modules = [
  "Dashboard",
  "Products",
  "Retailers",
  "AI Review Queue",
  "Score Audit",
  "Affiliate Programs",
  "Analytics",
  "Users",
  "Receipts",
  "Compliance Logs",
  "Settings",
  "System",
];

// Matrix representing checked permissions per role (Row = module, Col = permission)
// Check = true, Dash = false
const superAdminMatrix: Record<string, boolean[]> = {
  Dashboard: [true, true, true, true, true, true, true],
  Products: [true, true, true, true, true, true, true],
  Retailers: [true, true, true, true, true, true, true],
  "AI Review Queue": [true, true, true, true, true, true, true],
  "Score Audit": [true, true, true, true, true, true, true],
  "Affiliate Programs": [true, true, true, true, true, true, true],
  Analytics: [true, true, true, true, true, true, true],
  Users: [true, true, true, true, true, true, true],
  Receipts: [true, false, false, false, false, false, false],
  "Compliance Logs": [true, false, false, false, false, false, true],
  Settings: [true, false, false, false, false, false, false],
  System: [false, false, false, false, false, false, false],
};

const otherRolesMatrix: Record<string, Record<string, boolean[]>> = {
  "Operations Admin": {
    Dashboard: [true, true, true, false, false, false, true],
    Products: [true, true, true, false, false, false, false],
    Retailers: [true, true, true, false, false, false, false],
    "AI Review Queue": [true, false, false, false, false, false, false],
    "Score Audit": [true, false, false, false, false, false, false],
    "Affiliate Programs": [true, false, true, false, false, false, false],
    Analytics: [true, false, false, false, false, false, true],
    Users: [true, false, true, false, false, false, false],
    Receipts: [true, false, false, false, false, false, false],
    "Compliance Logs": [true, false, false, false, false, false, false],
    Settings: [true, false, false, false, false, false, false],
    System: [false, false, false, false, false, false, false],
  },
  "AI Reviewer": {
    Dashboard: [true, false, false, false, false, false, false],
    Products: [true, false, false, false, false, false, false],
    Retailers: [true, false, false, false, false, false, false],
    "AI Review Queue": [true, false, true, true, true, false, false],
    "Score Audit": [true, false, true, true, false, false, false],
    "Affiliate Programs": [true, false, false, false, false, false, false],
    Analytics: [true, false, false, false, false, false, false],
    Users: [false, false, false, false, false, false, false],
    Receipts: [true, false, false, false, false, false, false],
    "Compliance Logs": [true, false, false, false, false, false, false],
    Settings: [false, false, false, false, false, false, false],
    System: [false, false, false, false, false, false, false],
  },
  "Affiliate Manager": {
    Dashboard: [true, false, false, false, false, false, false],
    Products: [true, false, false, false, false, false, false],
    Retailers: [true, false, false, false, false, false, false],
    "AI Review Queue": [false, false, false, false, false, false, false],
    "Score Audit": [false, false, false, false, false, false, false],
    "Affiliate Programs": [true, true, true, false, false, true, true],
    Analytics: [true, false, false, false, false, false, true],
    Users: [false, false, false, false, false, false, false],
    Receipts: [true, true, false, false, false, false, false],
    "Compliance Logs": [true, false, false, false, false, false, false],
    Settings: [false, false, false, false, false, false, false],
    System: [false, false, false, false, false, false, false],
  },
  "Support Admin": {
    Dashboard: [true, false, false, false, false, false, false],
    Products: [true, false, false, false, false, false, false],
    Retailers: [true, false, false, false, false, false, false],
    "AI Review Queue": [false, false, false, false, false, false, false],
    "Score Audit": [false, false, false, false, false, false, false],
    "Affiliate Programs": [false, false, false, false, false, false, false],
    Analytics: [false, false, false, false, false, false, false],
    Users: [true, false, true, false, false, false, false],
    Receipts: [true, false, false, false, false, false, false],
    "Compliance Logs": [false, false, false, false, false, false, false],
    Settings: [false, false, false, false, false, false, false],
    System: [false, false, false, false, false, false, false],
  },
  "Read Only": {
    Dashboard: [true, false, false, false, false, false, false],
    Products: [true, false, false, false, false, false, false],
    Retailers: [true, false, false, false, false, false, false],
    "AI Review Queue": [true, false, false, false, false, false, false],
    "Score Audit": [true, false, false, false, false, false, false],
    "Affiliate Programs": [true, false, false, false, false, false, false],
    Analytics: [true, false, false, false, false, false, false],
    Users: [true, false, false, false, false, false, false],
    Receipts: [true, false, false, false, false, false, false],
    "Compliance Logs": [true, false, false, false, false, false, false],
    Settings: [true, false, false, false, false, false, false],
    System: [false, false, false, false, false, false, false],
  },
};

interface AdminAssignment {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Disabled";
  assignedAt: string;
  lastLogin: string;
  avatar: string;
}

const adminsData: AdminAssignment[] = [
  {
    name: "John Smith",
    email: "john.smith@happy.com",
    role: "Super Admin",
    status: "Active",
    assignedAt: "Jan 5, 2024",
    lastLogin: "May 20, 2024 10:28 AM",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@happy.com",
    role: "Operations Admin",
    status: "Active",
    assignedAt: "Jan 12, 2024",
    lastLogin: "May 20, 2024 09:41 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@happy.com",
    role: "AI Reviewer",
    status: "Active",
    assignedAt: "Feb 3, 2024",
    lastLogin: "May 19, 2024 05:33 PM",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@happy.com",
    role: "Affiliate Manager",
    status: "Active",
    assignedAt: "Feb 18, 2024",
    lastLogin: "May 18, 2024 04:21 PM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    name: "David Wilson",
    email: "david.wilson@happy.com",
    role: "Support Admin",
    status: "Active",
    assignedAt: "Mar 1, 2024",
    lastLogin: "May 17, 2024 11:07 AM",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
];

export default function RolesPermission() {
  const [selectedRoleName, setSelectedRoleName] = useState<string>("Super Admin");
  const [roleSearchText, setRoleSearchText] = useState<string>("");
  const [adminSearchText, setAdminSearchText] = useState<string>("");
  const [adminRoleFilter, setAdminRoleFilter] = useState<string>("All Roles");
  const [activeDetailsTab, setActiveDetailsTab] = useState<"Overview" | "Permissions" | "Admins">("Overview");
  
  // Find current role detail
  const currentRole = rolesData.find((r) => r.name === selectedRoleName) || rolesData[0];
  const [isActiveStatus, setIsActiveStatus] = useState<boolean>(true);

  // Filter roles list
  const filteredRoles = rolesData.filter((r) =>
    r.name.toLowerCase().includes(roleSearchText.toLowerCase())
  );

  // Filter admins list
  const filteredAdmins = adminsData.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(adminSearchText.toLowerCase()) ||
      a.email.toLowerCase().includes(adminSearchText.toLowerCase());
    const matchesRole =
      adminRoleFilter === "All Roles" || a.role === adminRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Get active matrix for matrix table rendering
  const activeMatrix =
    currentRole.name === "Super Admin"
      ? superAdminMatrix
      : otherRolesMatrix[currentRole.name] || otherRolesMatrix["Read Only"];

  const handleRoleSelect = (roleName: string) => {
    setSelectedRoleName(roleName);
    setIsActiveStatus(true); // reset switch to default active
    setActiveDetailsTab("Overview"); // reset tab
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-6">
        
        {/* ─── Page Header ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full max-w-full">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Roles & Permissions
            </h1>
            <p className="mt-1 sm:mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage administrator roles and fine-grained permissions.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Upload className="h-4 w-4 rotate-180" />
              Export Matrix
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#4F46E5]/10 transition hover:bg-[#4338ca]">
              <Plus className="h-4 w-4" />
              Create Role
            </button>
          </div>
        </div>

        {/* ─── Main Grid Layout (3-6-3 Columns) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── Left Column: Role list & Suggested ── */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* Role List Card */}
            <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-700">Role List</h3>
              
              {/* Role Search */}
              <div className="mt-3 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={roleSearchText}
                  onChange={(e) => setRoleSearchText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Roles List */}
              <ul className="mt-4 space-y-2">
                {filteredRoles.map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = role.name === selectedRoleName;
                  return (
                    <li
                      key={role.name}
                      onClick={() => handleRoleSelect(role.name)}
                      className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-indigo-50/60 border-indigo-100/80 text-indigo-900"
                          : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "bg-white border-indigo-200/60 text-indigo-600"
                              : `${role.iconBg} border-transparent ${role.iconColor}`
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className={`text-sm font-semibold truncate ${isSelected ? "text-indigo-950" : "text-slate-800"}`}>
                            {role.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {role.count} admins
                          </div>
                        </div>
                      </div>
                      <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </li>
                  );
                })}
                {filteredRoles.length === 0 && (
                  <div className="text-center py-6 text-sm text-slate-400">
                    No roles found
                  </div>
                )}
              </ul>
            </section>

            {/* Suggested Roles Card */}
            <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-semibold text-slate-700">Suggested Roles</h3>
                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  + Add Role
                </button>
              </div>
              <div className="space-y-2.5">
                {rolesData.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <div
                      key={role.name}
                      onClick={() => handleRoleSelect(role.name)}
                      className="group rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 hover:border-slate-200 cursor-pointer transition-all flex items-start gap-2.5"
                    >
                      <div className={`mt-0.5 h-7 w-7 rounded-md shrink-0 flex items-center justify-center ${role.iconBg} ${role.iconColor}`}>
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-950 transition-colors">
                          {role.name}
                        </div>
                        <div className="mt-0.5 text-[11px] leading-relaxed text-slate-500 italic">
                          {role.suggestedDesc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>

              {/* ── Center Column: Permission Matrix & Assignments ── */}
              <section className="col-span-12 lg:col-span-6 space-y-6">
            
            {/* Permission Matrix Card */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900">Permission Matrix</h4>
                  <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-medium text-slate-500">Role:</span>
                  <div className="relative">
                    <select
                      value={selectedRoleName}
                      onChange={(e) => handleRoleSelect(e.target.value)}
                      className="appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-8 py-1.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                    >
                      {rolesData.map((role) => (
                        <option key={role.name} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="mt-4 overflow-x-auto select-none">
                <table className="w-full min-w-[620px] text-sm text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                      <th className="py-2.5 font-bold w-1/3">Module</th>
                      <th className="py-2.5 font-bold text-center">View</th>
                      <th className="py-2.5 font-bold text-center">Create</th>
                      <th className="py-2.5 font-bold text-center">Edit</th>
                      <th className="py-2.5 font-bold text-center">Approve</th>
                      <th className="py-2.5 font-bold text-center">Reject</th>
                      <th className="py-2.5 font-bold text-center">Delete</th>
                      <th className="py-2.5 font-bold text-center">Export</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {modules.map((module) => {
                      const rowPermissions = activeMatrix[module] || [false, false, false, false, false, false, false];
                      return (
                        <tr key={module} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-2 pr-4 font-medium text-xs text-slate-800">{module}</td>
                          {rowPermissions.map((allowed, idx) => (
                            <td key={idx} className="py-2 text-center">
                              {allowed ? (
                                <CheckCircle className="h-4.5 w-4.5 text-emerald-500 inline-block fill-emerald-50/60" />
                              ) : (
                                <span className="text-slate-300 font-bold">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Matrix Legend */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-5 text-xs text-slate-500">
                <div className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                  <CheckCircle className="h-4 w-4 text-emerald-500 fill-emerald-50" />
                  <span>Allowed</span>
                </div>
                <div className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                  <span className="text-slate-300 font-bold">—</span>
                  <span>Not Allowed</span>
                </div>
              </div>
            </div>

            {/* Admin Assignments Card */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
                <h4 className="text-sm font-semibold text-slate-900">Admin Assignments</h4>
                
                {/* Search & Filter */}
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center w-full sm:w-auto">
                  <div className="relative w-full sm:w-44">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Search className="h-3.5 w-3.5" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search admin..."
                      value={adminSearchText}
                      onChange={(e) => setAdminSearchText(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-8.5 pr-3 text-xs outline-none transition focus:border-indigo-500"
                    />
                  </div>
                  <div className="relative w-full sm:w-auto">
                    <select
                      value={adminRoleFilter}
                      onChange={(e) => setAdminRoleFilter(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-8 py-1.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 cursor-pointer"
                    >
                      <option value="All Roles">All Roles</option>
                      {rolesData.map((role) => (
                        <option key={role.name} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Admins Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[620px] text-sm border-collapse text-left">
                  <thead>
                    <tr className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                      <th className="py-2.5 font-bold w-[26%]">Admin</th>
                      <th className="py-2.5 font-bold">Email</th>
                      <th className="py-2.5 font-bold">Role</th>
                      <th className="py-2.5 font-bold text-center">Status</th>
                      <th className="py-2.5 font-bold">Assigned At</th>
                      <th className="py-2.5 font-bold text-center w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAdmins.map((admin) => {
                      // Find badge colors matching the admin's role
                      const adminRoleData = rolesData.find((r) => r.name === admin.role) || rolesData[0];
                      return (
                        <tr key={admin.email} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-2.5 flex items-center gap-3">
                            <img
                              src={admin.avatar}
                              alt={admin.name}
                              className="h-8.5 w-8.5 rounded-full object-cover border border-slate-200 shadow-xs"
                            />
                            <span className="font-semibold text-slate-800 text-xs">{admin.name}</span>
                          </td>
                          <td className="py-2.5 text-slate-500 text-xs">{admin.email}</td>
                          <td className="py-2.5">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${adminRoleData.badgeBg} ${adminRoleData.badgeText}`}>
                              {admin.role}
                            </span>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                              {admin.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-slate-500 text-xs">{admin.assignedAt}</td>
                          <td className="py-2.5 text-center">
                            <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredAdmins.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-sm text-slate-400">
                          No matching administrators found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
                <span>Showing 1 to {filteredAdmins.length} of {adminsData.length} admins</span>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span>10 per page</span>
                  <nav className="inline-flex items-center rounded-2xl bg-white shadow-xs border border-slate-200 overflow-hidden">
                    <button className="px-2.5 py-1.5 text-slate-400 hover:text-slate-700 transition-colors border-r border-slate-200">
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button className="px-3.5 py-1.5 font-bold text-white bg-[#4F46E5]">1</button>
                    <button className="px-3.5 py-1.5 font-medium text-slate-600 hover:bg-slate-50 transition-colors">2</button>
                    <button className="px-3.5 py-1.5 font-medium text-slate-600 hover:bg-slate-50 transition-colors">3</button>
                    <span className="px-2.5 py-1.5 text-slate-400 select-none">...</span>
                    <button className="px-3.5 py-1.5 font-medium text-slate-600 hover:bg-slate-50 transition-colors">5</button>
                    <button className="px-2.5 py-1.5 text-slate-400 hover:text-slate-700 transition-colors border-l border-slate-200">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </nav>
                </div>
                </div>
              </div>
            </section>

          {/* ── Right Column: Role Details Panel (starts below the header!) ── */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Role Details</h3>
                <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Role Title Block */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3.5">
                  <div className={`h-11 w-11 rounded-full shrink-0 flex items-center justify-center border border-slate-200/60 ${currentRole.iconBg} ${currentRole.iconColor}`}>
                    <currentRole.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-slate-900 truncate">{currentRole.name}</div>
                    <div className="mt-1 text-xs leading-relaxed text-slate-500">
                      Full access to all modules, settings, and system administration.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-100 pb-0.5">
                {(["Overview", "Permissions", "Admins"] as const).map((tab) => {
                  const isActive = activeDetailsTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveDetailsTab(tab)}
                      className={`flex-1 text-center pb-2.5 text-xs font-bold border-b-2 transition-all ${
                        isActive
                          ? "text-[#4F46E5] border-[#4F46E5]"
                          : "text-slate-400 border-transparent hover:text-slate-600"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Tab Views */}
              {activeDetailsTab === "Overview" && (
                <div className="space-y-4.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Role Name</label>
                    <input
                      type="text"
                      readOnly
                      value={currentRole.name}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none select-none"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Description</label>
                    <textarea
                      readOnly
                      rows={3}
                      value={currentRole.name === "Super Admin" ? "Has full control over the entire system including all modules, settings, and user management." : currentRole.description}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 leading-relaxed outline-none resize-none select-none"
                    />
                  </div>

                  {/* Toggle Status */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-500">Status</span>
                    <div className="flex items-center gap-2 mt-1">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isActiveStatus}
                          onChange={() => setIsActiveStatus(!isActiveStatus)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500" />
                      </label>
                      <span className="text-sm font-semibold text-slate-800 leading-none">
                        {isActiveStatus ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Meta Timeline */}
                  <div className="pt-3 border-t border-slate-100 space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-500">Created At</div>
                      <div className="text-sm font-semibold text-slate-850 mt-1">{currentRole.createdAt}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500">Created By</div>
                      <div className="text-sm font-semibold text-slate-850 mt-1">{currentRole.createdBy}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500">Updated At</div>
                      <div className="text-sm font-semibold text-slate-850 mt-1">{currentRole.updatedAt}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailsTab === "Permissions" && (
                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  <div className="text-xs font-semibold text-slate-500">Allowed Modules</div>
                  {modules.map((mod) => {
                    const rowPermissions = activeMatrix[mod] || [false, false, false, false, false, false, false];
                    const hasAny = rowPermissions.some(Boolean);
                    if (!hasAny) return null;
                    return (
                      <div key={mod} className="flex justify-between items-center bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-xs font-semibold text-slate-800">{mod}</span>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                          {rowPermissions.filter(Boolean).length} allowed
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeDetailsTab === "Admins" && (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  <div className="text-xs font-semibold text-slate-500">Assigned Administrators</div>
                  {adminsData
                    .filter((a) => a.role === currentRole.name)
                    .map((admin) => (
                      <div key={admin.email} className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                        <img src={admin.avatar} alt={admin.name} className="h-8 w-8 rounded-full object-cover border border-slate-200" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-800 truncate">{admin.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">{admin.email}</div>
                        </div>
                      </div>
                    ))}
                  {adminsData.filter((a) => a.role === currentRole.name).length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-400">
                      No administrators assigned to this role
                    </div>
                  )}
                </div>
              )}

            </div> {/* End of Main Role Details Card */}

            {/* Separate Card for Quick Actions & Permission Summary */}
            <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm space-y-4">
              
              {/* Quick Actions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                    <Pencil className="h-4 w-4 text-slate-400" />
                    Edit Role
                  </button>
                  <button className="w-full inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                    <Copy className="h-4 w-4 text-slate-400" />
                    Duplicate Role
                  </button>
                  <button className="w-full inline-flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 shadow-sm transition hover:bg-red-50 hover:border-red-200">
                    <Trash2 className="h-4 w-4 text-red-500" />
                    Delete Role
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Permission Summary */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Permission Summary</h4>
                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2.5 text-emerald-600 font-semibold">
                      <CheckCircle className="h-4.5 w-4.5 text-emerald-500 fill-emerald-50/60" />
                      <span>{currentRole.allowed} Allowed</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-400 font-semibold pl-0.5">
                      <span className="text-slate-350 font-bold w-4 text-center">—</span>
                      <span>{currentRole.denied} Denied</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex items-center justify-between text-xs font-bold text-slate-850">
                    <span>Total Permissions</span>
                    <span>{currentRole.allowed + currentRole.denied}</span>
                  </div>
                </div>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
