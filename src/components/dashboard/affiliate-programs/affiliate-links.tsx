"use client";

import React from "react";
import {
  Download,
  Filter,
  Link as LinkIcon,
  Search,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Eye,
  ShieldAlert,
  ArrowUpDown,
  Minus
} from "lucide-react";

// Mock Data
const TABLE_DATA = [
  {
    id: "1",
    product: "Apple AirPods Pro 2",
    asin: "B0BDKD8BVD",
    img: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=64&h=64&fit=crop",
    retailer: "Amazon",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    affiliateStatus: "Active",
    nonAffiliate: "Available",
    disclosure: "Disclosure added",
    clicks: "12,842",
    conversions: "1,234",
    lastChecked: "May 20, 2024\n10:15 AM",
    actions: ["Test Link", "View Product"],
  },
  {
    id: "2",
    product: "Dyson V11 Torque Drive",
    asin: "B07YN7L4ZP",
    img: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=64&h=64&fit=crop",
    retailer: "Walmart",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    affiliateStatus: "Broken",
    nonAffiliate: "Available",
    disclosure: "Disclosure added",
    clicks: "4,231",
    conversions: "386",
    lastChecked: "May 20, 2024\n9:42 AM",
    actions: ["Test Link", "Regenerate Link"],
  },
  {
    id: "3",
    product: "iPhone 15 Pro Max",
    asin: "B0CHXIW8N3",
    img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=64&h=64&fit=crop",
    retailer: "Best Buy",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
    affiliateStatus: "Active",
    nonAffiliate: "Not available",
    disclosure: "Disclosure added",
    clicks: "8,921",
    conversions: "874",
    lastChecked: "May 20, 2024\n8:55 AM",
    actions: ["Test Link", "View Product"],
  },
  {
    id: "4",
    product: "Instant Pot Duo 7-in-1",
    asin: "B07B41J2D8",
    img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=64&h=64&fit=crop",
    retailer: "Target",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg",
    affiliateStatus: "Missing",
    nonAffiliate: "Available",
    disclosure: "Disclosure missing",
    clicks: "2,141",
    conversions: "210",
    lastChecked: "May 19, 2024\n5:10 PM",
    actions: ["Regenerate Link", "View Product"],
  },
  {
    id: "5",
    product: 'Samsung 65" QLED Q80C',
    asin: "B0C1Z95WHP",
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=64&h=64&fit=crop",
    retailer: "Samsung",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    affiliateStatus: "Non-affiliate only",
    nonAffiliate: "Available",
    disclosure: "Disclosure added",
    clicks: "1,024",
    conversions: "98",
    lastChecked: "May 19, 2024\n3:33 PM",
    actions: ["Mark Affiliate", "View Product"],
  },
  {
    id: "6",
    product: "LEGO Star Wars AT-AT",
    asin: "B09BNVCRYR",
    img: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=64&h=64&fit=crop",
    retailer: "Amazon",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    affiliateStatus: "Pending approval",
    nonAffiliate: "Available",
    disclosure: "Pending approval",
    clicks: "612",
    conversions: "54",
    lastChecked: "May 18, 2024\n11:20 AM",
    actions: ["Test Link", "View Product"],
  },
  {
    id: "7",
    product: "Nintendo Switch OLED",
    asin: "B098RJVJN8",
    img: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=64&h=64&fit=crop",
    retailer: "Walmart",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    affiliateStatus: "Active",
    nonAffiliate: "Not available",
    disclosure: "Disclosure added",
    clicks: "3,902",
    conversions: "312",
    lastChecked: "May 18, 2024\n10:05 AM",
    actions: ["Test Link", "View Product"],
  },
  {
    id: "8",
    product: "De'Longhi Magnifica Evo",
    asin: "B09SQXJGMP",
    img: "https://images.unsplash.com/photo-1517246286411-8bb31bf407aa?w=64&h=64&fit=crop",
    retailer: "Best Buy",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
    affiliateStatus: "Broken",
    nonAffiliate: "Available",
    disclosure: "Disclosure missing",
    clicks: "821",
    conversions: "72",
    lastChecked: "May 17, 2024\n4:18 PM",
    actions: ["Regenerate Link", "View Product"],
  },
  {
    id: "9",
    product: "Sony WH-1000XM5",
    asin: "B09XS7JWHH",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=64&h=64&fit=crop",
    retailer: "Target",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg",
    affiliateStatus: "Active",
    nonAffiliate: "Available",
    disclosure: "Disclosure added",
    clicks: "5,332",
    conversions: "498",
    lastChecked: "May 17, 2024\n1:07 PM",
    actions: ["Test Link", "View Product"],
  },
  {
    id: "10",
    product: "iRobot Roomba i7+",
    asin: "B08PS14S62",
    img: "https://images.unsplash.com/photo-1589831377283-33cb1cc6ba5a?w=64&h=64&fit=crop",
    retailer: "Amazon",
    retailerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    affiliateStatus: "Missing",
    nonAffiliate: "Available",
    disclosure: "Disclosure missing",
    clicks: "432",
    conversions: "31",
    lastChecked: "May 16, 2024\n9:50 AM",
    actions: ["Regenerate Link", "View Product"],
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
    case "Disclosure added":
      return "bg-emerald-50 text-emerald-700";
    case "Broken":
    case "Disclosure missing":
      return "bg-orange-50 text-orange-700";
    case "Missing":
      return "bg-amber-50 text-amber-700";
    case "Non-affiliate only":
      return "bg-blue-50 text-blue-700";
    case "Pending approval":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

export default function AffiliateLinks() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-5 flex flex-col gap-4 sm:gap-6 min-w-0">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="min-w-0 w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight truncate">Affiliate Links</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 truncate">
              Manage all affiliate and non-affiliate product links, track status, clicks, and conversions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
            <button className="flex-1 sm:flex-none flex justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Export</span>
            </button>
            <button className="flex-1 sm:flex-none flex justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Filters</span>
            </button>
            <button className="w-full sm:w-auto flex justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-xs sm:text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm">
              <LinkIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Add Links
            </button>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-6 shadow-sm flex flex-col min-w-0 overflow-hidden">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm font-medium text-slate-700 sm:w-36 hover:bg-slate-50 transition-colors truncate">
                <span className="truncate">All Retailers</span> <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 shrink-0 ml-1" />
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm font-medium text-slate-700 sm:w-40 hover:bg-slate-50 transition-colors truncate">
                <span className="truncate">All Statuses</span> <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 shrink-0 ml-1" />
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm font-medium text-slate-700 sm:w-44 hover:bg-slate-50 transition-colors truncate">
                <span className="truncate">All Disclosures</span> <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 shrink-0 ml-1" />
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm font-medium text-slate-700 sm:w-36 hover:bg-slate-50 transition-colors truncate">
                <span className="truncate">All Categories</span> <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 shrink-0 ml-1" />
              </button>
            </div>
            <div className="relative flex-1 min-w-0 w-full sm:w-auto mt-2 sm:mt-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by product or ASIN/SKU..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px] sm:min-h-[500px] -mx-3 sm:mx-0 px-3 sm:px-0">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500">Product</th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500">Retailer</th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500">Affiliate Link Status</th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500">Non-affiliate Link</th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500">Disclosure Status</th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500 text-right">
                    <div className="flex items-center justify-end gap-1">
                      Clicks <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500 text-right">
                    <div className="flex items-center justify-end gap-1">
                      Conversions <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500">Last Checked</th>
                  <th className="px-3 sm:px-4 py-3 text-xs font-semibold text-slate-500 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TABLE_DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Product */}
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-[220px]">
                        <img 
                          src={row.img} 
                          alt={row.product} 
                          className="w-10 sm:w-12 h-10 sm:h-12 rounded-md object-cover border border-slate-200 shrink-0 bg-white"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{row.product}</span>
                          <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5">ASIN: {row.asin}</span>
                        </div>
                      </div>
                    </td>

                    {/* Retailer */}
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2">
                        {row.retailerLogo ? (
                          <div className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center shrink-0">
                            <img src={row.retailerLogo} alt={row.retailer} className="max-w-full max-h-full object-contain" />
                          </div>
                        ) : null}
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">{row.retailer}</span>
                      </div>
                    </td>

                    {/* Affiliate Status */}
                    <td className="px-3 sm:px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold ${getStatusBadge(row.affiliateStatus)}`}>
                        {row.affiliateStatus}
                      </span>
                    </td>

                    {/* Non-Affiliate Link */}
                    <td className="px-3 sm:px-4 py-3">
                      {row.nonAffiliate === "Available" ? (
                        <div className="flex flex-col gap-0.5 sm:gap-1">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Available
                          </div>
                          <a href="#" className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-blue-600 hover:text-blue-700 ml-4 sm:ml-5">
                            View Link <ExternalLink className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                          </a>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-slate-400">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <Minus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                          </div>
                          <span className="ml-4 sm:ml-5">Not available</span>
                        </div>
                      )}
                    </td>

                    {/* Disclosure Status */}
                    <td className="px-3 sm:px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold ${getStatusBadge(row.disclosure)}`}>
                        {row.disclosure}
                      </span>
                    </td>

                    {/* Clicks */}
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 text-right">
                      {row.clicks}
                    </td>

                    {/* Conversions */}
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 text-right">
                      {row.conversions}
                    </td>

                    {/* Last Checked */}
                    <td className="px-3 sm:px-4 py-3">
                      <div className="text-[10px] sm:text-xs text-slate-900 font-medium whitespace-pre-line leading-tight">
                        {row.lastChecked}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                        {row.actions.map((act, i) => (
                          <button 
                            key={i}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-200 bg-white rounded-md text-[10px] sm:text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            {act}
                          </button>
                        ))}
                        <button className="p-1 sm:p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                          <MoreVertical className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pt-4 mt-auto border-t border-slate-100">
            <span className="text-[11px] sm:text-sm text-slate-500 font-medium w-full sm:w-auto text-center sm:text-left">
              Showing 1 to 10 of 248 links
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="flex items-center justify-between px-2 sm:px-3 py-1.5 border border-slate-200 rounded-md bg-white text-[11px] sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                10 per page <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 ml-1 sm:ml-2 text-slate-400" />
              </button>
              <div className="flex items-center gap-1">
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors bg-white">
                  <ChevronLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white text-[11px] sm:text-sm font-semibold">1</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] sm:text-sm font-medium bg-white transition-colors">2</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 hidden sm:flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] sm:text-sm font-medium bg-white transition-colors">3</button>
                <span className="w-4 sm:w-6 text-center text-slate-400 text-[11px] sm:text-sm">...</span>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] sm:text-sm font-medium bg-white transition-colors">25</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors bg-white">
                  <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="col-span-2 sm:col-span-1 bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
              <LinkIcon className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-0.5">Total Links</div>
              <div className="text-xl sm:text-2xl font-bold text-slate-950 mb-0.5">248</div>
              <div className="text-[10px] sm:text-xs text-slate-500 truncate">All affiliate &amp; non-affiliate</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-[3px] border-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-0.5">Active Links</div>
              <div className="text-lg sm:text-2xl font-bold text-slate-950 mb-0.5 leading-none sm:leading-normal">162 <span className="block sm:inline text-[10px] sm:text-sm font-semibold text-slate-600">(65.3%)</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
              <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-0.5">Issues</div>
              <div className="text-lg sm:text-2xl font-bold text-slate-950 mb-0.5 leading-none sm:leading-normal">57 <span className="block sm:inline text-[10px] sm:text-sm font-semibold text-slate-600">(23.0%)</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Eye className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-0.5">Non-affiliate</div>
              <div className="text-lg sm:text-2xl font-bold text-slate-950 mb-0.5 leading-none sm:leading-normal">29 <span className="block sm:inline text-[10px] sm:text-sm font-semibold text-slate-600">(11.7%)</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-0.5">Disclosure</div>
              <div className="text-lg sm:text-2xl font-bold text-slate-950 mb-0.5 leading-none sm:leading-normal">18 <span className="block sm:inline text-[10px] sm:text-sm font-semibold text-slate-600">(7.3%)</span></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
