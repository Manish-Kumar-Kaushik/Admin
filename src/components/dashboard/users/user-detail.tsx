"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Shield,
  Info,
  Trash2,
  UserMinus,
  Download,
  AlertTriangle,
  Calendar,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Lock,
  ChevronRight,
  ShieldCheck,
  FileText,
  UserCheck,
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const savedProducts = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    asin: "B09XS7JWHH",
    addedDate: "May 18, 2024",
    price: 348.0,
    merchant: "Amazon",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro (256GB)",
    asin: "B0CHX979R1",
    addedDate: "May 10, 2024",
    price: 999.0,
    merchant: "Best Buy",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&q=80",
  },
  {
    id: 3,
    name: "Dyson V15 Detect Cordless Vacuum",
    asin: "B08N85K2ZP",
    addedDate: "Apr 28, 2024",
    price: 649.99,
    merchant: "Walmart",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&q=80",
  },
  {
    id: 4,
    name: "Instant Pot Duo 7-in-1 Pressure Cooker",
    asin: "B07QJ39YQ3",
    addedDate: "Apr 18, 2024",
    price: 79.99,
    merchant: "Target",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=100&q=80",
  },
  {
    id: 5,
    name: "The Ordinary Niacinamide 10% + Zinc 1% Serum",
    asin: "B07H7P7T9B",
    addedDate: "Mar 30, 2024",
    price: 6.8,
    merchant: "Ulta",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&q=80",
  },
];

const priceAlerts = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    targetPrice: 299.0,
    currentPrice: 348.0,
    merchant: "Amazon",
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro (256GB)",
    targetPrice: 899.0,
    currentPrice: 999.0,
    merchant: "Best Buy",
  },
  {
    id: 3,
    name: "Dyson V15 Detect Cordless Vacuum",
    targetPrice: 599.0,
    currentPrice: 649.99,
    merchant: "Walmart",
  },
  {
    id: 4,
    name: "Instant Pot Duo 7-in-1 Pressure Cooker",
    targetPrice: 69.0,
    currentPrice: 79.99,
    merchant: "Target",
  },
  {
    id: 5,
    name: "AirPods Pro (2nd Generation)",
    targetPrice: 199.0,
    currentPrice: 229.0,
    merchant: "Amazon",
  },
];

const receiptUploads = [
  {
    id: 1,
    filename: "Walmart_2024-05-18_0012.jpg",
    date: "May 18, 2024",
    size: "1.2 MB",
    status: "Processed",
  },
  {
    id: 2,
    filename: "BestBuy_2024-05-05_8431.jpg",
    date: "May 5, 2024",
    size: "1.6 MB",
    status: "Processed",
  },
  {
    id: 3,
    filename: "Target_2024-04-27_5522.jpg",
    date: "Apr 27, 2024",
    size: "1.1 MB",
    status: "Processed",
  },
];

const supportReports = [
  {
    id: 1,
    issue: "Incorrect price information",
    reportId: "RPT-2024-05127",
    date: "May 20, 2024",
    status: "Open",
    statusColor: "bg-amber-50 text-amber-700 border-amber-150",
  },
  {
    id: 2,
    issue: "Broken affiliate link",
    reportId: "RPT-2024-05098",
    date: "May 10, 2024",
    status: "Closed",
    statusColor: "bg-blue-50 text-blue-700 border-blue-150",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// ─── Main Component ──────────────────────────────────────────────────────────

export default function UserDetail() {
  const [adminNote, setAdminNote] = useState("");
  const [elevatedAccess, setElevatedAccess] = useState(false);

  const handleSaveNote = () => {
    if (!adminNote.trim()) return;
    alert("Admin note saved successfully!");
    setAdminNote("");
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden font-sans">
      <div className="w-full max-w-full px-4 sm:px-6 py-6 space-y-6">

        {/* ─── Breadcrumb & Top Bar ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl leading-tight">
                User Detail
              </h1>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-150">
                Active
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500 font-medium flex flex-wrap gap-x-4 gap-y-1">
              <span>User ID: <span className="text-slate-900 font-semibold">U-1048921</span></span>
              <span className="text-slate-200">|</span>
              <span>Member since: <span className="text-slate-900 font-semibold">Feb 12, 2024</span></span>
              <span className="text-slate-200">|</span>
              <span>Last active: <span className="text-slate-900 font-semibold">May 20, 2024 at 10:15 AM (EDT)</span></span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/users"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              Back to Users
            </Link>
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Pencil className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              Edit User
            </button>
          </div>
        </div>

        {/* ─── Main Content Grid ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-10 w-full max-w-full items-start">

          {/* Left / Middle Columns (User summary + details cards) -> 70% width */}
          <div className="lg:col-span-7 flex flex-col gap-4 min-w-0">
            
            {/* User Profile Summary Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">User Profile Summary</h3>
                
                <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-between w-full">
                  {/* Left info: avatar and text */}
                  <div className="flex gap-4 items-start min-w-0 flex-1">
                    <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-650 font-extrabold text-xl shrink-0 select-none shadow-xs border border-indigo-100">
                      JA
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-slate-950 truncate">Jason T.</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap pb-1">
                        <span className="text-xs text-slate-500 font-semibold truncate">jason.t@example.com</span>
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-700 border border-emerald-100 select-none">
                          Verified
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1.5 select-none text-[11px] text-slate-500 font-medium leading-tight">
                        <div className="flex flex-wrap gap-x-4">
                          <span>Plan: <span className="text-slate-800 font-semibold">Free</span></span>
                          <span>Platform: <span className="text-slate-800 font-semibold">Web</span></span>
                          <span>Language: <span className="text-slate-800 font-semibold">English (US)</span></span>
                        </div>
                        <div className="flex flex-wrap gap-x-4">
                          <span>Country: <span className="text-slate-800 font-semibold">United States</span></span>
                          <span>Timezone: <span className="text-slate-800 font-semibold">Eastern Time (ET)</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5 metric counters - next to details, no boxes, separated by lines */}
                  <div className="flex flex-row items-center lg:border-l lg:border-slate-200 divide-x divide-slate-200 select-none w-full lg:w-auto overflow-x-auto lg:overflow-x-visible scrollbar-none py-2 lg:py-0 shrink-0">
                    {[
                      { label: "Saved Products", val: "24" },
                      { label: "Price Alerts", val: "5" },
                      { label: "Receipts Uploaded", val: "3" },
                      { label: "Support Reports", val: "2" },
                      { label: "Privacy Requests", val: "0" },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col items-center px-4 sm:px-6 shrink-0 text-center min-w-[85px] sm:min-w-[110px] lg:min-w-[90px] xl:min-w-[115px]">
                        <span className="text-[9px] sm:text-[10.5px] text-slate-800 font-bold tracking-tight mb-2.5 block leading-tight">
                          {m.label}
                        </span>
                        <span className="text-2xl sm:text-3xl font-bold text-slate-950">{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Collapsible Info Alert Banners */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs leading-relaxed text-blue-700 select-none">
                <div className="flex gap-2.5 items-start">
                  <Info className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">This view contains limited data to protect user privacy.</span>
                    <span className="text-[11px] font-semibold text-blue-600 block mt-0.5">Sensitive shopping and order data are hidden. Request elevated access if needed for support.</span>
                  </div>
                </div>
                <button
                  onClick={() => setElevatedAccess(!elevatedAccess)}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-blue-200 bg-white text-[11px] font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm shrink-0 whitespace-nowrap"
                >
                  <Lock className="h-3 w-3 text-blue-400" />
                  {elevatedAccess ? "Revoke Elevated Access" : "Request Elevated Access"}
                </button>
              </div>
            </div>

            {/* Sub Row 1: Saved Products + Price Alerts */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
              
              {/* Saved Products Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-950">Saved Products <span className="text-slate-400 font-semibold">(24)</span></h3>
                  <span className="text-xs font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-3.5 flex-1">
                  {savedProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-3 text-xs min-w-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate leading-tight">{p.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5 truncate">
                            ASIN: {p.asin} • Added {p.addedDate}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-slate-950">{fmt(p.price)}</div>
                        <div className="text-xs text-slate-400">{p.merchant}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-indigo-650 hover:underline cursor-pointer select-none inline-flex items-center gap-0.5 pt-1.5">
                  View all 24 saved products <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Price Alerts Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-950">Price Alerts <span className="text-slate-400 font-semibold">(5)</span></h3>
                  <span className="text-xs font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-3.5 flex-1">
                  {priceAlerts.map((a) => (
                    <div key={a.id} className="flex items-center justify-between gap-3 text-xs min-w-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-indigo-50/50 flex items-center justify-center shrink-0 border border-slate-100">
                          <ShieldCheck className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate leading-tight">{a.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Target price: <span className="font-semibold">{fmt(a.targetPrice)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-semibold text-emerald-605">{fmt(a.currentPrice)}</div>
                        <div className="text-xs text-slate-400">{a.merchant}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-indigo-650 hover:underline cursor-pointer select-none inline-flex items-center gap-0.5 pt-1.5">
                  View all 5 price alerts <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Sub Row 2: Receipt Uploads + Support Reports + Privacy Requests */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full">
              
              {/* Receipt Uploads */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-950">Receipt Uploads <span className="text-slate-400 font-semibold">(3)</span></h3>
                  <span className="text-xs font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-3 flex-1">
                  {receiptUploads.map((r) => (
                    <div key={r.id} className="flex items-center justify-between gap-2.5 text-xs min-w-0">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center shrink-0 border border-slate-100">
                          <FileText className="h-4 w-4 text-blue-550" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 truncate leading-tight">{r.filename}</div>
                          <div className="text-[10px] text-slate-450 font-semibold mt-0.5">
                            {r.date} • {r.size}
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-indigo-650 hover:underline cursor-pointer select-none inline-flex items-center gap-0.5 pt-1.5">
                  View all 3 receipts <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Support Reports */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-950">Support Reports <span className="text-slate-400 font-semibold">(2)</span></h3>
                  <span className="text-xs font-bold text-indigo-650 cursor-pointer hover:underline select-none">View all</span>
                </div>
                <div className="space-y-3.5 flex-1">
                  {supportReports.map((s) => (
                    <div key={s.id} className="flex items-start justify-between gap-2.5 text-xs min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold border ${s.statusColor} select-none`}>
                            {s.status}
                          </span>
                          <span className="font-bold text-slate-800 truncate leading-tight">{s.issue}</span>
                        </div>
                        <p className="text-[10px] text-slate-450 font-semibold mt-1">
                          Report ID: {s.reportId} • {s.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-indigo-650 hover:underline cursor-pointer select-none inline-flex items-center gap-0.5 pt-1.5">
                  View all reports <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Privacy Requests */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between items-center text-center space-y-4 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-sm font-bold text-slate-950">Privacy Requests <span className="text-slate-400 font-semibold">(0)</span></h3>
                </div>
                
                <div className="flex flex-col items-center justify-center flex-1 space-y-2 py-4 select-none">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Shield className="h-6 w-6 text-emerald-550" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-805 leading-tight">No privacy requests</h4>
                    <p className="text-[10px] text-slate-450 font-semibold mt-1 max-w-[160px] leading-tight">
                      This user has not submitted any privacy-related requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Privacy actions, Notes, Data Access Notice) -> 30% width */}
          <div className="lg:col-span-3 flex flex-col gap-4 min-w-0">
            
            {/* Privacy Actions Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4.5 w-4.5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-950">Privacy Actions</h3>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Perform privacy-safe actions. These actions are logged and cannot be undone.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {/* Export Data */}
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs text-left group">
                  <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                    <Download className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Export User Data</div>
                    <div className="text-[10px] text-slate-450 font-semibold mt-0.5">Export account data and activity</div>
                  </div>
                </button>

                {/* Delete Receipts */}
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs text-left group">
                  <div className="h-8 w-8 rounded-md bg-rose-50 flex items-center justify-center shrink-0">
                    <Trash2 className="h-4 w-4 text-rose-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-800 group-hover:text-rose-600 transition-colors">Delete Receipt History</div>
                    <div className="text-[10px] text-slate-450 font-semibold mt-0.5">Permanently delete all receipts</div>
                  </div>
                </button>

                {/* Anonymize */}
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs text-left group">
                  <div className="h-8 w-8 rounded-md bg-purple-50 flex items-center justify-center shrink-0">
                    <UserMinus className="h-4 w-4 text-purple-550" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Anonymize User</div>
                    <div className="text-[10px] text-slate-450 font-semibold mt-0.5">Remove personal identifiers</div>
                  </div>
                </button>

                {/* Suspend */}
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-rose-200 bg-rose-50/20 hover:bg-rose-50/50 transition-colors shadow-2xs text-left group">
                  <div className="h-8 w-8 rounded-md bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100 shadow-xs">
                    <AlertTriangle className="h-4 w-4 text-rose-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-rose-600">Suspend Account</div>
                    <div className="text-[10px] text-rose-500 font-semibold mt-0.5">Temporarily restrict account access</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Admin Notes Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-950">Admin Notes</h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">
                  Add internal notes about this user. Notes are visible only to admins.
                </p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={1000}
                    placeholder="Write a note..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-850 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none font-semibold"
                  />
                  <div className="absolute bottom-2.5 right-3 text-[9px] text-slate-400 font-bold">
                    {adminNote.length}/1000
                  </div>
                </div>
                <button
                  onClick={handleSaveNote}
                  className="w-full h-9 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm select-none shadow-indigo-100"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Data Access Notice Card */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-6 shadow-xs space-y-4 flex flex-col justify-between items-center text-center">
              <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Lock className="h-4.5 w-4.5 text-blue-500" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Data Access Notice</h4>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed max-w-[210px] mx-auto">
                  You are viewing limited user data. Request elevated access if you need to see additional information for support or verification.
                </p>
              </div>
              <button
                onClick={() => setElevatedAccess(!elevatedAccess)}
                className="w-full h-9 rounded-lg border border-blue-200 bg-white text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center gap-1.5 select-none"
              >
                <Lock className="h-3.5 w-3.5 text-blue-400" />
                {elevatedAccess ? "Revoke Elevated Access" : "Request Elevated Access"}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
