"use client";

import * as React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, ChevronLeft, ChevronRight, MoreVertical, Download, RefreshCw } from "lucide-react";

type User = {
  id: string;
  email: string;
  status: "Active" | "Pending Verification" | "Suspended" | "Inactive";
  savedProducts: number;
  priceAlerts: number;
  receiptsUploaded: number;
  lastActive: string;
  createdDate: string;
};

const users: User[] = [
  { id: "U-1048921", email: "jason.t@example.com", status: "Active", savedProducts: 24, priceAlerts: 5, receiptsUploaded: 3, lastActive: "May 20, 2024 10:15 AM", createdDate: "Feb 12, 2024" },
  { id: "U-1048922", email: "sarah.w@example.com", status: "Active", savedProducts: 57, priceAlerts: 12, receiptsUploaded: 8, lastActive: "May 20, 2024 9:42 AM", createdDate: "Jan 28, 2024" },
  { id: "U-1048923", email: "mike.lee@example.com", status: "Pending Verification", savedProducts: 8, priceAlerts: 1, receiptsUploaded: 0, lastActive: "May 19, 2024 8:31 PM", createdDate: "May 19, 2024" },
  { id: "U-1048924", email: "emily.r@example.com", status: "Active", savedProducts: 31, priceAlerts: 7, receiptsUploaded: 2, lastActive: "May 19, 2024 6:23 PM", createdDate: "Mar 05, 2024" },
  { id: "U-1048925", email: "david.k@example.com", status: "Suspended", savedProducts: 12, priceAlerts: 0, receiptsUploaded: 1, lastActive: "May 18, 2024 11:05 AM", createdDate: "Dec 31, 2023" },
];

function StatusPill({ status }: { status: User["status"] }) {
  const map = {
    Active: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    "Pending Verification": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    Suspended: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
    Inactive: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" },
  } as const;

  const cfg = map[status];

  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", cfg.bg, cfg.text)}>
      <span className={cn("w-2 h-2 rounded-full mr-2", cfg.dot)} />
      {status}
    </span>
  );
}

export default function UserList() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="w-full max-w-[1500px] mx-auto p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-950">Users</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="default" size="sm">Refresh</Button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end">
            <div className="sm:col-span-5 grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Account Status</label>
                <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Pending Verification</option>
                  <option>Suspended</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Has Receipts</label>
                <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white">
                  <option>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Has Price Alerts</label>
                <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white">
                  <option>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Date Joined</label>
                <input placeholder="Start date — End date" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Last Active</label>
                <input placeholder="Start date — End date" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="sm">Clear Filters</Button>
              <Button variant="default" size="sm">Apply Filters</Button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="mb-4 text-sm text-slate-600">Total Users: <span className="font-semibold text-slate-900">12,845</span></div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">User ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead className="text-right">Saved Products</TableHead>
                  <TableHead className="text-right">Price Alerts</TableHead>
                  <TableHead className="text-right">Receipts Uploaded</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-mono text-xs text-slate-500">{u.id}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><StatusPill status={u.status} /></TableCell>
                    <TableCell className="text-right">{u.savedProducts}</TableCell>
                    <TableCell className="text-right">{u.priceAlerts}</TableCell>
                    <TableCell className="text-right">{u.receiptsUploaded}</TableCell>
                    <TableCell>{u.lastActive}</TableCell>
                    <TableCell>{u.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">View User</Button>
                        <Button variant="ghost" size="sm" className="text-rose-600">Suspend</Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1"><MoreVertical className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-600">Total Users: <span className="font-semibold text-slate-900">12,845</span></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">10 per page</span>
              <div className="inline-flex items-center rounded-md border border-slate-200 overflow-hidden">
                <button className="px-3 py-1 text-sm text-slate-700 bg-white"><ChevronLeft className="w-4 h-4" /></button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white">1</button>
                <button className="px-3 py-1 text-sm text-slate-700 bg-white">2</button>
                <button className="px-3 py-1 text-sm text-slate-700 bg-white">3</button>
                <button className="px-3 py-1 text-sm text-slate-700 bg-white"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-transparent rounded-md px-4 py-3 flex items-center gap-3 text-sm text-slate-600">
          <Info className="w-4 h-4 text-blue-500" />
          Showing 1 to 10 of 12,845 users
        </div>
      </main>
    </div>
  );
}

                {/* Has Price Alerts */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Has Price Alerts</label>
                  <div className="relative">
                    <select
                      value={hasPriceAlerts}
                      onChange={(e) => setHasPriceAlerts(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option>All</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Joined */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date Joined</label>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <input type="text" placeholder="Start date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <span className="text-slate-300 px-1">—</span>
                    <input type="text" placeholder="End date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                  </div>
                </div>

                {/* Last Active */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Active</label>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <input type="text" placeholder="Start date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <span className="text-slate-300 px-1">—</span>
                    <input type="text" placeholder="End date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Filter Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => { setAccountStatus("All Statuses"); setHasReceipts("All"); setHasPriceAlerts("All"); }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear Filters
                </button>
                <button className="rounded-lg bg-[#4F46E5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4338CA]">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          {/* Table Toolbar */}
          <div className="flex flex-col gap-4 px-4 sm:px-6 py-4 border-b border-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-[#4F46E5]">Total Users: 12,845</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Per page */}
              <div className="relative">
                <select className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
              {/* Pagination */}
              <nav className="inline-flex items-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <button className="flex h-8 w-8 items-center justify-center border-r border-slate-200 text-slate-500 hover:bg-slate-50 transition">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center bg-[#4F46E5] text-sm font-semibold text-white">1</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">2</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">3</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">4</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">5</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm text-slate-400">...</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">1,285</button>
                <button className="flex h-8 w-8 items-center justify-center border-l border-slate-200 text-slate-500 hover:bg-slate-50 transition">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">User ID</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Account Status</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-center">
                    <span className="inline-flex items-center gap-1">Saved Products <Info className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-center">
                    <span className="inline-flex items-center gap-1">Price Alerts <Info className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-center">
                    <span className="inline-flex items-center gap-1">Receipts Uploaded <Info className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Last Active</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <span className="inline-flex items-center gap-1">Created Date <ChevronDown className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">{user.id}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{user.email}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 text-center">{user.savedProducts}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 text-center">{user.priceAlerts}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 text-center">{user.receiptsUploaded}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-slate-700">{user.lastActive}</p>
                      <p className="text-xs text-slate-400">{user.lastActiveTime}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{user.createdDate}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50">
                          <Eye className="h-3.5 w-3.5" />
                          View User
                        </button>
                        <button
                          disabled={user.status === "Suspended"}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                            user.status === "Suspended"
                              ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                              : "border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                          }`}
                        >
                          <ShieldOff className="h-3.5 w-3.5" />
                          Suspend
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                          Privacy Actions
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info Bar */}
          <div className="flex items-center gap-2 border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-3">
            <Info className="h-4 w-4 text-blue-500 shrink-0" />
            <p className="text-sm text-slate-600">Showing 1 to 10 of 12,845 users</p>
          </div>
        </div>

      </div>
    </div>
  );
}
import * as React from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Info, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"

type User = {
  id: string
  email: string
  status: "Active" | "Pending Verification" | "Suspended" | "Inactive"
  savedProducts: number
  priceAlerts: number
  receipts: number
  lastActive: string
  createdDate: string
}

const sampleUsers: User[] = [
  { id: "U-1048921", email: "jason.t@example.com", status: "Active", savedProducts: 24, priceAlerts: 5, receipts: 3, lastActive: "May 20, 2024 10:15 AM", createdDate: "Feb 12, 2024" },
  { id: "U-1048922", email: "sarah.w@example.com", status: "Active", savedProducts: 57, priceAlerts: 12, receipts: 8, lastActive: "May 20, 2024 9:42 AM", createdDate: "Jan 28, 2024" },
  { id: "U-1048923", email: "mike.lee@example.com", status: "Pending Verification", savedProducts: 8, priceAlerts: 1, receipts: 0, lastActive: "May 19, 2024 8:31 PM", createdDate: "May 19, 2024" },
  { id: "U-1048924", email: "emily.r@example.com", status: "Active", savedProducts: 31, priceAlerts: 7, receipts: 2, lastActive: "May 19, 2024 6:23 PM", createdDate: "Mar 05, 2024" },
  { id: "U-1048925", email: "david.k@example.com", status: "Suspended", savedProducts: 12, priceAlerts: 0, receipts: 1, lastActive: "May 18, 2024 11:05 AM", createdDate: "Dec 31, 2023" },
  { id: "U-1048926", email: "linda.p@example.com", status: "Active", savedProducts: 63, priceAlerts: 15, receipts: 6, lastActive: "May 18, 2024 9:17 AM", createdDate: "Feb 20, 2024" },
  { id: "U-1048927", email: "robert.b@example.com", status: "Inactive", savedProducts: 4, priceAlerts: 0, receipts: 0, lastActive: "May 17, 2024 2:11 PM", createdDate: "Nov 15, 2023" },
  { id: "U-1048928", email: "amanda.c@example.com", status: "Active", savedProducts: 19, priceAlerts: 4, receipts: 2, lastActive: "May 17, 2024 8:45 PM", createdDate: "Apr 02, 2024" },
  { id: "U-1048929", email: "kevin.h@example.com", status: "Active", savedProducts: 27, priceAlerts: 3, receipts: 5, lastActive: "May 17, 2024 7:33 PM", createdDate: "Jan 10, 2024" },
]

function StatusPill({ status }: { status: User["status"] }) {
  const map = {
    "Active": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    "Pending Verification": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    "Suspended": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
    "Inactive": { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" },
  } as const

  const cfg = map[status]

  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", cfg.bg, cfg.text)}>
      <span className={cn("w-2 h-2 rounded-full mr-2", cfg.dot)} />
      {status}
    </span>
  )
}

export default function UserList() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="w-full max-w-[1500px] mx-auto p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-950">Users</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="default" size="sm">Refresh</Button>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end">
            <div className="sm:col-span-5 grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Account Status</label>
                <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Pending Verification</option>
                  <option>Suspended</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Has Receipts</label>
                <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white">
                  <option>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Has Price Alerts</label>
                <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white">
                  <option>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Date Joined</label>
                <input placeholder="Start date — End date" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Last Active</label>
                <input placeholder="Start date — End date" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="sm">Clear Filters</Button>
              <Button variant="default" size="sm">Apply Filters</Button>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="mb-4 text-sm text-slate-600">Total Users: <span className="font-semibold text-slate-900">12,845</span></div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">User ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead className="text-right">Saved Products</TableHead>
                  <TableHead className="text-right">Price Alerts</TableHead>
                  <TableHead className="text-right">Receipts Uploaded</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-mono text-xs text-slate-500">{u.id}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><StatusPill status={u.status} /></TableCell>
                    <TableCell className="text-right">{u.savedProducts}</TableCell>
                    <TableCell className="text-right">{u.priceAlerts}</TableCell>
                    <TableCell className="text-right">{u.receipts}</TableCell>
                    <TableCell>{u.lastActive}</TableCell>
                    <TableCell>{u.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">View User</Button>
                        <Button variant="ghost" size="sm" className="text-rose-600">Suspend</Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1"><MoreVertical className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-600">Total Users: <span className="font-semibold text-slate-900">12,845</span></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">10 per page</span>
              <div className="inline-flex items-center rounded-md border border-slate-200 overflow-hidden">
                <button className="px-3 py-1 text-sm text-slate-700 bg-white"><ChevronLeft className="w-4 h-4" /></button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white">1</button>
                <button className="px-3 py-1 text-sm text-slate-700 bg-white">2</button>
                <button className="px-3 py-1 text-sm text-slate-700 bg-white">3</button>
                <button className="px-3 py-1 text-sm text-slate-700 bg-white"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="bg-slate-50 border border-transparent rounded-md px-4 py-3 flex items-center gap-3 text-sm text-slate-600">
          <Info className="w-4 h-4 text-blue-500" />
          Showing 1 to 10 of 12,845 users
        </div>
      </main>
    </div>
  )
}
"use client";

import React, { useState } from "react";
import {
  Download,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Eye,
  ShieldOff,
  MoreVertical,
  Calendar,
} from "lucide-react";

type AccountStatus = "Active" | "Pending Verification" | "Suspended" | "Inactive";

const statusStyles: Record<AccountStatus, { badge: string; dot: string }> = {
  Active: { badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  "Pending Verification": { badge: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  Suspended: { badge: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
  Inactive: { badge: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
};

interface User {
  id: string;
  email: string;
  status: AccountStatus;
  savedProducts: number;
  priceAlerts: number;
  receiptsUploaded: number;
  lastActive: string;
  lastActiveTime: string;
  createdDate: string;
}

const users: User[] = [
  { id: "U-1048921", email: "jason.t@example.com",   status: "Active",               savedProducts: 24, priceAlerts: 5,  receiptsUploaded: 3, lastActive: "May 20, 2024", lastActiveTime: "10:15 AM", createdDate: "Feb 12, 2024" },
  { id: "U-1048922", email: "sarah.w@example.com",   status: "Active",               savedProducts: 57, priceAlerts: 12, receiptsUploaded: 8, lastActive: "May 20, 2024", lastActiveTime: "9:42 AM",  createdDate: "Jan 28, 2024" },
  { id: "U-1048923", email: "mike.lee@example.com",  status: "Pending Verification", savedProducts: 8,  priceAlerts: 1,  receiptsUploaded: 0, lastActive: "May 19, 2024", lastActiveTime: "8:31 PM",  createdDate: "May 19, 2024" },
  { id: "U-1048924", email: "emily.r@example.com",   status: "Active",               savedProducts: 31, priceAlerts: 7,  receiptsUploaded: 2, lastActive: "May 19, 2024", lastActiveTime: "6:23 PM",  createdDate: "Mar 05, 2024" },
  { id: "U-1048925", email: "david.k@example.com",   status: "Suspended",            savedProducts: 12, priceAlerts: 0,  receiptsUploaded: 1, lastActive: "May 18, 2024", lastActiveTime: "11:05 AM", createdDate: "Dec 31, 2023" },
  { id: "U-1048926", email: "linda.p@example.com",   status: "Active",               savedProducts: 63, priceAlerts: 15, receiptsUploaded: 6, lastActive: "May 18, 2024", lastActiveTime: "9:17 AM",  createdDate: "Feb 20, 2024" },
  { id: "U-1048927", email: "robert.b@example.com",  status: "Inactive",             savedProducts: 4,  priceAlerts: 0,  receiptsUploaded: 0, lastActive: "Apr 22, 2024", lastActiveTime: "2:11 PM",  createdDate: "Nov 15, 2023" },
  { id: "U-1048928", email: "amanda.c@example.com",  status: "Active",               savedProducts: 19, priceAlerts: 4,  receiptsUploaded: 2, lastActive: "May 17, 2024", lastActiveTime: "8:45 PM",  createdDate: "Apr 02, 2024" },
  { id: "U-1048929", email: "kevin.h@example.com",   status: "Active",               savedProducts: 27, priceAlerts: 3,  receiptsUploaded: 5, lastActive: "May 17, 2024", lastActiveTime: "7:33 PM",  createdDate: "Jan 10, 2024" },
  { id: "U-1048930", email: "nancy.d@example.com",   status: "Inactive",             savedProducts: 7,  priceAlerts: 0,  receiptsUploaded: 0, lastActive: "Apr 30, 2024", lastActiveTime: "1:22 PM",  createdDate: "Dec 18, 2023" },
];

function StatusBadge({ status }: { status: AccountStatus }) {
  const s = statusStyles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export default function UserList() {
  const [showFilters, setShowFilters] = useState(true);
  const [accountStatus, setAccountStatus] = useState("All Statuses");
  const [hasReceipts, setHasReceipts] = useState("All");
  const [hasPriceAlerts, setHasPriceAlerts] = useState("All");

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 min-w-0">
      <div className="w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-6 min-w-0">

        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">Users</h1>
            <p className="mt-1 text-sm text-slate-500">
              View and manage users for support and account administration. We respect user privacy and data protection.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4338CA]">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-950">Filters</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 flex-1">
                {/* Account Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Account Status</label>
                  <div className="relative">
                    <select
                      value={accountStatus}
                      onChange={(e) => setAccountStatus(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option>All Statuses</option>
                      <option>Active</option>
                      <option>Pending Verification</option>
                      <option>Suspended</option>
                      <option>Inactive</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Has Receipts */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Has Receipts</label>
                  <div className="relative">
                    <select
                      value={hasReceipts}
                      onChange={(e) => setHasReceipts(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option>All</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Has Price Alerts */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Has Price Alerts</label>
                  <div className="relative">
                    <select
                      value={hasPriceAlerts}
                      onChange={(e) => setHasPriceAlerts(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option>All</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Joined */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date Joined</label>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <input type="text" placeholder="Start date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <span className="text-slate-300 px-1">—</span>
                    <input type="text" placeholder="End date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                  </div>
                </div>

                {/* Last Active */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Active</label>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <input type="text" placeholder="Start date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <span className="text-slate-300 px-1">—</span>
                    <input type="text" placeholder="End date" className="w-full text-sm text-slate-500 bg-transparent outline-none placeholder:text-slate-400" />
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Filter Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => { setAccountStatus("All Statuses"); setHasReceipts("All"); setHasPriceAlerts("All"); }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear Filters
                </button>
                <button className="rounded-lg bg-[#4F46E5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4338CA]">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          {/* Table Toolbar */}
          <div className="flex flex-col gap-4 px-4 sm:px-6 py-4 border-b border-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-[#4F46E5]">Total Users: 12,845</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Per page */}
              <div className="relative">
                <select className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
              {/* Pagination */}
              <nav className="inline-flex items-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <button className="flex h-8 w-8 items-center justify-center border-r border-slate-200 text-slate-500 hover:bg-slate-50 transition">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center bg-[#4F46E5] text-sm font-semibold text-white">1</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">2</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">3</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">4</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">5</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm text-slate-400">...</button>
                <button className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition">1,285</button>
                <button className="flex h-8 w-8 items-center justify-center border-l border-slate-200 text-slate-500 hover:bg-slate-50 transition">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">User ID</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Account Status</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-center">
                    <span className="inline-flex items-center gap-1">Saved Products <Info className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-center">
                    <span className="inline-flex items-center gap-1">Price Alerts <Info className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-center">
                    <span className="inline-flex items-center gap-1">Receipts Uploaded <Info className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Last Active</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <span className="inline-flex items-center gap-1">Created Date <ChevronDown className="h-3.5 w-3.5 text-slate-400" /></span>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">{user.id}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{user.email}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 text-center">{user.savedProducts}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 text-center">{user.priceAlerts}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-700 text-center">{user.receiptsUploaded}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-slate-700">{user.lastActive}</p>
                      <p className="text-xs text-slate-400">{user.lastActiveTime}</p>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{user.createdDate}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50">
                          <Eye className="h-3.5 w-3.5" />
                          View User
                        </button>
                        <button
                          disabled={user.status === "Suspended"}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                            user.status === "Suspended"
                              ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                              : "border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                          }`}
                        >
                          <ShieldOff className="h-3.5 w-3.5" />
                          Suspend
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                          Privacy Actions
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info Bar */}
          <div className="flex items-center gap-2 border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-3">
            <Info className="h-4 w-4 text-blue-500 shrink-0" />
            <p className="text-sm text-slate-600">Showing 1 to 10 of 12,845 users</p>
          </div>
        </div>

      </div>
    </div>
  );
}
