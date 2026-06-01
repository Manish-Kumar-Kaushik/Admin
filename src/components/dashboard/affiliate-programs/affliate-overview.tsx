"use client";

import React, { useState } from "react";
import { 
  Users, 
  FileText, 
  MousePointer2, 
  ShoppingCart, 
  Link as LinkIcon, 
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  MoreVertical,
  ArrowRight,
  Scale,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Link from "next/link";

const mockData = [
  { partner: "Amazon Associates", brand: "Amazon", network: "Amazon Associates", status: "Active", joinDate: "Jan 12, 2023", countries: "US, CA, UK + 8", links: "24,531", clicks: "8,742", clickTrend: "14.2%", isClickUp: true, conv: "565", convTrend: "11.3%", isConvUp: true, comm: "$18,742.34", disc: "Compliant", health: "98.7%", isHealthBad: false, logo: "bg-black" },
  { partner: "Best Buy Affiliate", brand: "CJ Affiliate", network: "CJ Affiliate", status: "Active", joinDate: "Feb 3, 2023", countries: "US, CA", links: "8,742", clicks: "1,942", clickTrend: "8.1%", isClickUp: true, conv: "183", convTrend: "5.6%", isConvUp: true, comm: "$4,823.12", disc: "Compliant", health: "99.2%", isHealthBad: false, logo: "bg-blue-600" },
  { partner: "Walmart Affiliate", brand: "Impact", network: "Impact", status: "Active", joinDate: "Mar 18, 2023", countries: "US", links: "6,218", clicks: "912", clickTrend: "3.7%", isClickUp: true, conv: "96", convTrend: "2.1%", isConvUp: true, comm: "$1,982.90", disc: "Compliant", health: "99.1%", isHealthBad: false, logo: "bg-sky-500" },
  { partner: "Target Affiliate", brand: "Impact", network: "Impact", status: "Active", joinDate: "Apr 5, 2023", countries: "US", links: "3,112", clicks: "421", clickTrend: "6.2%", isClickUp: true, conv: "41", convTrend: "7.9%", isConvUp: true, comm: "$876.43", disc: "Compliant", health: "97.8%", isHealthBad: false, logo: "bg-red-600" },
  { partner: "Newegg Affiliate", brand: "Commission Junction", network: "CJ Affiliate", status: "Active", joinDate: "May 22, 2023", countries: "US, CA", links: "5,670", clicks: "683", clickTrend: "2.3%", isClickUp: false, conv: "58", convTrend: "1.7%", isConvUp: false, comm: "$1,203.55", disc: "Compliant", health: "95.4%", isHealthBad: false, logo: "bg-orange-500" },
  { partner: "eBay Partner Network", brand: "eBay Partner Network", network: "eBay Partner Network", status: "Active", joinDate: "Jun 10, 2023", countries: "US, UK, CA + 12", links: "12,332", clicks: "1,221", clickTrend: "9.4%", isClickUp: true, conv: "117", convTrend: "8.2%", isConvUp: true, comm: "$2,985.22", disc: "Compliant", health: "98.1%", isHealthBad: false, logo: "bg-green-600" },
  { partner: "B&H Photo Video", brand: "Impact", network: "Impact", status: "Pending", joinDate: "May 10, 2024", countries: "US", links: "1,024", clicks: "0", clickTrend: "0", isClickUp: true, conv: "0", convTrend: "0", isConvUp: true, comm: "$0.00", disc: "Pending", health: "-", isHealthBad: false, logo: "bg-emerald-800" },
  { partner: "Adorama Affiliate", brand: "ShareASale", network: "ShareASale", status: "Pending", joinDate: "May 12, 2024", countries: "US", links: "732", clicks: "0", clickTrend: "0", isClickUp: true, conv: "0", convTrend: "0", isConvUp: true, comm: "$0.00", disc: "Pending", health: "-", isHealthBad: false, logo: "bg-slate-800" },
  { partner: "Etsy Affiliate", brand: "Impact", network: "Impact", status: "Blocked", joinDate: "Nov 2, 2023", countries: "US, CA, UK", links: "412", clicks: "0", clickTrend: "0", isClickUp: true, conv: "0", convTrend: "0", isConvUp: true, comm: "$0.00", disc: "Not Compliant", health: "42.1%", isHealthBad: true, logo: "bg-orange-600" },
  { partner: "AliExpress Affiliate", brand: "Admitad", network: "Admitad", status: "Inactive", joinDate: "Aug 18, 2023", countries: "US, CA", links: "298", clicks: "0", clickTrend: "0", isClickUp: true, conv: "0", convTrend: "0", isConvUp: true, comm: "$0.00", disc: "N/A", health: "-", isHealthBad: false, logo: "bg-red-500" },
];

const pieData = [
  { name: 'Compliant', value: 12542, color: '#10b981' },
  { name: 'Pending', value: 324, color: '#f59e0b' },
  { name: 'Not Compliant', value: 104, color: '#ef4444' }
];

export default function AffiliateOverview() {
  const [activeTab, setActiveTab] = useState("Partners");

  return (
    <div className="flex-1 bg-slate-50 font-sans min-h-screen w-full overflow-x-hidden">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-3 sm:py-6 flex flex-col gap-3 sm:gap-6 min-w-0">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 mb-1 truncate">Affiliate Overview</h1>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 sm:line-clamp-1">Manage affiliate partners, monitor link performance, and ensure compliance and disclosure standards.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            <Button variant="outline" className="font-semibold border-slate-200 h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" /> Export
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4">
              + Add Partner
            </Button>
          </div>
        </div>

        {/* 6-Column KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-4 lg:gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-5 lg:p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 truncate">Active Partners</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 mb-1 sm:mb-2 truncate">128</h3>
            <p className="text-[10px] sm:text-xs font-medium text-emerald-600 flex items-center mt-auto truncate">
              <ArrowUp className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" /> <span className="truncate">6.7% vs yesterday</span>
            </p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-5 lg:p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 truncate">Pending Apps</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 mb-1 sm:mb-2 truncate">14</h3>
            <p className="text-[10px] sm:text-xs font-medium text-amber-600 flex items-center mt-auto truncate">
              <ArrowUp className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" /> <span className="truncate">27.3% vs yesterday</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-5 lg:p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <MousePointer2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 truncate">Clicks Today</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 mb-1 sm:mb-2 truncate">18,642</h3>
            <p className="text-[10px] sm:text-xs font-medium text-blue-600 flex items-center mt-auto truncate">
              <ArrowUp className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" /> <span className="truncate">12.4% vs yesterday</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-5 lg:p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 truncate">Est. Conversions</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 mb-1 sm:mb-2 truncate">1,243</h3>
            <p className="text-[10px] sm:text-xs font-medium text-purple-600 flex items-center mt-auto truncate">
              <ArrowUp className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" /> <span className="truncate">9.8% vs yesterday</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-5 lg:p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 truncate">Broken Links</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 mb-1 sm:mb-2 truncate">23</h3>
            <p className="text-[10px] sm:text-xs font-medium text-rose-600 flex items-center mt-auto truncate">
              <ArrowDown className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" /> <span className="truncate">8.0% vs yesterday</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-5 lg:p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 truncate">Disclosure Coverage</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 mb-1 sm:mb-2 truncate">96.3%</h3>
            <p className="text-[10px] sm:text-xs font-medium text-emerald-600 flex items-center mt-auto truncate">
              <ArrowUp className="w-3 h-3 mr-0.5 sm:mr-1 shrink-0" /> <span className="truncate">1.6% vs yesterday</span>
            </p>
          </div>
        </div>

        {/* Main Data Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col w-full min-w-0">
          
          {/* Tabs */}
          <div className="border-b border-slate-200 px-2 sm:px-6 flex overflow-x-auto hide-scrollbar w-full">
            {["Partners", "Affiliate Links", "Clicks", "Conversions", "Disclosure", "Network Health"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 sm:py-4 px-3 sm:px-4 whitespace-nowrap text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "Partners" && <Users className="w-4 h-4 inline-block mr-2 mb-0.5" />}
                {tab === "Affiliate Links" && <LinkIcon className="w-4 h-4 inline-block mr-2 mb-0.5" />}
                {tab === "Clicks" && <MousePointer2 className="w-4 h-4 inline-block mr-2 mb-0.5" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-200 flex flex-col xl:flex-row gap-3 xl:gap-4 items-start xl:items-center justify-between bg-slate-50/50 rounded-t-xl xl:rounded-t-none w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full xl:w-auto">
              <div className="relative w-full sm:w-64 max-w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search partners..." className="w-full h-9 sm:h-10 rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <select className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>All Networks</option>
                  <option>Amazon Associates</option>
                  <option>Impact</option>
                </select>
              </div>
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <select className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <select className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>All Countries</option>
                  <option>US</option>
                  <option>Global</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 ml-0 mt-2 xl:mt-0 xl:ml-auto w-full xl:w-auto justify-between xl:justify-end shrink-0">
              <Button variant="outline" className="h-9 sm:h-10 bg-white font-medium text-xs sm:text-sm px-3 sm:px-4">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" /> Filters
              </Button>
              <Button variant="outline" className="h-9 sm:h-10 bg-white font-medium text-xs sm:text-sm px-3 sm:px-4">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-slate-400" /> May 18, 2024
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b-slate-200 hover:bg-transparent bg-slate-50/80">
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap pl-6">Partner</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Network</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Status</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Join Date</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Countries</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap text-right">Affiliate Links</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap text-right">Clicks (Today)</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap text-right">Conversions (30d)</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap text-right">Est. Commission (30d)</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap text-center">Disclosure Status</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Link Health</TableHead>
                  <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row, idx) => (
                  <TableRow key={idx} className="border-b-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="py-3 pl-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md ${row.logo} flex items-center justify-center shrink-0`}>
                          <span className="text-white text-xs font-bold tracking-wider">{row.partner.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{row.partner}</span>
                          <span className="text-xs text-slate-500">{row.brand}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-sm text-slate-600 whitespace-nowrap">{row.network}</TableCell>
                    <TableCell className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        row.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                        row.status === "Pending" ? "bg-amber-50 text-amber-700" :
                        row.status === "Blocked" ? "bg-rose-50 text-rose-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-sm text-slate-600 whitespace-nowrap">{row.joinDate}</TableCell>
                    <TableCell className="py-3 text-sm text-slate-600 whitespace-nowrap">{row.countries}</TableCell>
                    <TableCell className="py-3 text-sm font-medium text-slate-700 text-right">{row.links}</TableCell>
                    <TableCell className="py-3 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-slate-700">{row.clicks}</span>
                        {row.clickTrend !== "0" && (
                          <span className={`text-[10px] font-bold flex items-center mt-0.5 ${row.isClickUp ? "text-emerald-600" : "text-rose-600"}`}>
                            {row.isClickUp ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                            {row.clickTrend}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-slate-700">{row.conv}</span>
                        {row.convTrend !== "0" && (
                          <span className={`text-[10px] font-bold flex items-center mt-0.5 ${row.isConvUp ? "text-emerald-600" : "text-rose-600"}`}>
                            {row.isConvUp ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                            {row.convTrend}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-sm font-semibold text-slate-700 text-right">{row.comm}</TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold gap-1 ${
                          row.disc === "Compliant" ? "bg-emerald-50 text-emerald-700" :
                          row.disc === "Pending" ? "bg-amber-50 text-amber-700" :
                          row.disc === "Not Compliant" ? "bg-rose-50 text-rose-700" :
                          "text-slate-500"
                        }`}>
                          {row.disc === "Compliant" && <ShieldCheck className="w-3.5 h-3.5" />}
                          {row.disc === "Not Compliant" && <XCircle className="w-3.5 h-3.5" />}
                          {row.disc === "Pending" && <AlertCircle className="w-3.5 h-3.5" />}
                          {row.disc}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 whitespace-nowrap">
                      {row.health !== "-" ? (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${row.isHealthBad ? "bg-rose-500" : "bg-emerald-500"}`} />
                          <span className={`text-sm font-semibold ${row.isHealthBad ? "text-rose-600" : "text-emerald-600"}`}>{row.health}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400 pl-4">{row.health}</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 pr-6 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-slate-500">Showing 1 to 10 of 128 partners</span>
            <div className="flex items-center gap-2">
              <select className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm font-medium focus:outline-none">
                <option>10 per page</option>
                <option>20 per page</option>
                <option>50 per page</option>
              </select>
              <div className="flex items-center ml-2 border border-slate-200 rounded-md overflow-hidden bg-white">
                <button className="px-3 py-1.5 text-sm text-slate-400 hover:bg-slate-50 border-r border-slate-200">&lt;</button>
                <button className="px-3 py-1.5 text-sm font-semibold bg-indigo-600 text-white">1</button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">3</button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hidden sm:block">4</button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hidden sm:block">5</button>
                <span className="px-2 py-1.5 text-sm text-slate-400 hidden md:block">...</span>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hidden md:block">13</button>
                <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 border-l border-slate-200">&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary Panels (4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-0">
          
          {/* Commission-Blind Engine */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">Commission-Blind</h3>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 sm:mb-2 line-clamp-2">Our recommendation engine is commission-blind.</p>
            <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed line-clamp-3">Affiliate or non-affiliate links are attached after a recommendation is selected.</p>
          </div>

          {/* Disclosure Coverage Donut */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm flex flex-col min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 sm:mb-4 truncate">Disclosure Coverage</h3>
            <div className="flex items-center gap-3 sm:gap-4 mt-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={22}
                      outerRadius={30}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <span className="absolute text-xs sm:text-sm font-bold text-slate-900">96.3%</span>
              </div>
              <div className="flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-0">
                {[
                  { label: "Compliant", count: "12,542", color: "bg-emerald-500" },
                  { label: "Pending", count: "324", color: "bg-amber-500" },
                  { label: "Not Compliant", count: "104", color: "bg-rose-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                      <span className="text-[10px] font-semibold text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Partners */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm flex flex-col min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 sm:mb-4 truncate">Top Performing Partners (30d)</h3>
            <div className="flex flex-col gap-2 sm:gap-2.5 mb-3 sm:mb-4">
              {[
                { name: "1. Amazon Associates", value: "$18,742" },
                { name: "2. Best Buy Affiliate", value: "$4,823" },
                { name: "3. eBay Partner Network", value: "$2,985" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-700 truncate mr-2">{item.name}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900 shrink-0">{item.value}</span>
                </div>
              ))}
            </div>
            <Link href="#" className="mt-auto text-[10px] sm:text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center w-fit">
              View all performance <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />
            </Link>
          </div>

          {/* Network Health Summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm flex flex-col min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 sm:mb-4 truncate">Network Health Summary</h3>
            <div className="flex flex-col gap-2 sm:gap-2.5 mb-3 sm:mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-600 truncate mr-1">Total Affiliate Links</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-900 shrink-0">68,219</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-600 truncate mr-1">Healthy Links</span>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 shrink-0">65,642</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-600 truncate mr-1">Broken Links</span>
                <span className="text-[10px] sm:text-xs font-bold text-rose-600 shrink-0">2,577</span>
              </div>
            </div>
            <Link href="#" className="mt-auto text-[10px] sm:text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center w-fit">
              View network health <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
