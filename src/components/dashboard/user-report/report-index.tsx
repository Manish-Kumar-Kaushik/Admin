import React from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  RefreshCcw,
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Info,
  ExternalLink
} from "lucide-react";

// Mock Data
const REPORTS_DATA = [
  {
    id: "RPT-2024-05128",
    type: "Wrong product match",
    productName: "Apple AirPods Pro 2",
    productContext: "Product Page",
    productImg: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&q=80",
    userName: "jason.t@example.com",
    userId: "User ID: U-48392",
    priority: "High",
    status: "Open",
    assignedTo: "Sarah Johnson",
    created: "May 20, 2024\n10:15 AM",
    lastUpdated: "May 20, 2024\n11:42 AM",
  },
  {
    id: "RPT-2024-05127",
    type: "Incorrect price",
    productName: "Sony A7 IV Mirrorless",
    productContext: "Product Page",
    productImg: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&q=80",
    userName: "mike.lee@example.com",
    userId: "User ID: U-39211",
    priority: "Medium",
    status: "Open",
    assignedTo: "Alex Rivera",
    created: "May 20, 2024\n9:32 AM",
    lastUpdated: "May 20, 2024\n10:01 AM",
  },
  {
    id: "RPT-2024-05126",
    type: "Bad recommendation",
    productName: "The Ordinary Niacinamide",
    productContext: "Product Page",
    productImg: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80",
    userName: "sarah.w@example.com",
    userId: "User ID: U-76422",
    priority: "High",
    status: "Open",
    assignedTo: "You",
    created: "May 20, 2024\n8:45 AM",
    lastUpdated: "May 20, 2024\n9:15 AM",
  },
  {
    id: "RPT-2024-05125",
    type: "Broken affiliate link",
    productName: "Dyson V15 Detect",
    productContext: "Retailer: Amazon",
    productImg: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&q=80",
    userName: "david.k@example.com",
    userId: "User ID: U-12839",
    priority: "Medium",
    status: "Open",
    assignedTo: "Link Team",
    created: "May 19, 2024\n11:12 PM",
    lastUpdated: "May 20, 2024\n8:22 AM",
  },
  {
    id: "RPT-2024-05124",
    type: "Unsafe health claim",
    productName: "Keto Advanced ACV Gummies",
    productContext: "Product Page",
    productImg: "https://images.unsplash.com/photo-1616671285406-8d76d4911295?w=100&q=80",
    userName: "linda.p@example.com",
    userId: "User ID: U-55673",
    priority: "High",
    status: "Open",
    assignedTo: "Dr. Melissa Chen",
    created: "May 19, 2024\n7:45 PM",
    lastUpdated: "May 20, 2024\n8:10 AM",
  },
  {
    id: "RPT-2024-05123",
    type: "Missing source",
    productName: "CeraVe Moisturizing Cream",
    productContext: "Product Page",
    productImg: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=100&q=80",
    userName: "robert.b@example.com",
    userId: "User ID: U-33142",
    priority: "Low",
    status: "Open",
    assignedTo: "Emily Clark",
    created: "May 19, 2024\n6:33 PM",
    lastUpdated: "May 19, 2024\n9:08 PM",
  },
  {
    id: "RPT-2024-05122",
    type: "Incorrect price",
    productName: "Nintendo Switch OLED",
    productContext: "Retailer: Walmart",
    productImg: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=100&q=80",
    userName: "andrew.s@example.com",
    userId: "User ID: U-99021",
    priority: "Medium",
    status: "Open",
    assignedTo: "Alex Rivera",
    created: "May 19, 2024\n5:18 PM",
    lastUpdated: "May 19, 2024\n6:02 PM",
  },
  {
    id: "RPT-2024-05121",
    type: "Wrong product match",
    productName: "LEGO Star Wars AT-AT",
    productContext: "Product Page",
    productImg: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=100&q=80",
    userName: "emily.r@example.com",
    userId: "User ID: U-77120",
    priority: "Medium",
    status: "Open",
    assignedTo: "You",
    created: "May 19, 2024\n3:55 PM",
    lastUpdated: "May 19, 2024\n4:11 PM",
  },
  {
    id: "RPT-2024-05120",
    type: "Broken affiliate link",
    productName: "Bose QuietComfort Ultra",
    productContext: "Retailer: Best Buy",
    productImg: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
    userName: "kevin.h@example.com",
    userId: "User ID: U-22844",
    priority: "Low",
    status: "Open",
    assignedTo: "Link Team",
    created: "May 18, 2024\n10:22 PM",
    lastUpdated: "May 19, 2024\n1:05 PM",
  },
  {
    id: "RPT-2024-05119",
    type: "Other",
    productName: "Atomic Habits Book",
    productContext: "Product Page",
    productImg: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=100&q=80",
    userName: "nancy.d@example.com",
    userId: "User ID: U-44567",
    priority: "Low",
    status: "Open",
    assignedTo: "Content Team",
    created: "May 18, 2024\n8:41 PM",
    lastUpdated: "May 18, 2024\n9:17 PM",
  }
];

// Helper functions for badges
const getTypeBadge = (type: string) => {
  switch (type) {
    case "Wrong product match":
      return "bg-indigo-50 text-indigo-700";
    case "Incorrect price":
      return "bg-orange-50 text-orange-700";
    case "Bad recommendation":
    case "Unsafe health claim":
      return "bg-rose-50 text-rose-700";
    case "Broken affiliate link":
      return "bg-amber-50 text-amber-700";
    case "Missing source":
    case "Other":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700">
          High <ArrowUp className="w-3 h-3" />
        </span>
      );
    case "Medium":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700">
          Medium
        </span>
      );
    case "Low":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">
          Low
        </span>
      );
    default:
      return null;
  }
};

export default function UserReportsInbox() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden text-slate-900">
      <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6 min-w-0 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="min-w-0 w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight truncate">User Reports Inbox</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 truncate">
              Review and respond to user-submitted reports about product data, recommendations, pricing, links, or safety concerns.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
            <button className="flex-1 sm:flex-none flex justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Filters</span>
            </button>
            <button className="flex-1 sm:flex-none flex justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Export</span>
            </button>
            <button className="w-full sm:w-auto flex justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-xs sm:text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm">
              <RefreshCcw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* KPI / Status Filters Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-4">
            <button className="flex items-center gap-2 pb-1 border-b-2 border-indigo-600 text-indigo-600 font-semibold text-[13px] sm:text-sm">
              Open <span className="bg-indigo-100 text-indigo-700 py-0.5 px-2 rounded-full text-xs">128</span>
            </button>
            <button className="flex items-center gap-2 pb-1 text-slate-600 hover:text-slate-900 font-medium text-[13px] sm:text-sm transition-colors border-b-2 border-transparent hover:border-slate-300">
              High Priority <span className="bg-rose-50 text-rose-700 py-0.5 px-2 rounded-full text-xs font-semibold">16</span>
            </button>
            <button className="flex items-center gap-2 pb-1 text-slate-600 hover:text-slate-900 font-medium text-[13px] sm:text-sm transition-colors border-b-2 border-transparent hover:border-slate-300">
              Assigned to Me <span className="bg-blue-50 text-blue-700 py-0.5 px-2 rounded-full text-xs font-semibold">12</span>
            </button>
            <div className="hidden lg:block h-6 w-px bg-slate-200 mx-1" />
            <button className="flex items-center gap-2 pb-1 text-slate-600 hover:text-slate-900 font-medium text-[13px] sm:text-sm transition-colors border-b-2 border-transparent hover:border-slate-300">
              Product Data <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs font-semibold">28</span>
            </button>
            <button className="flex items-center gap-2 pb-1 text-slate-600 hover:text-slate-900 font-medium text-[13px] sm:text-sm transition-colors border-b-2 border-transparent hover:border-slate-300">
              Wrong Recommendation <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs font-semibold">22</span>
            </button>
            <button className="flex items-center gap-2 pb-1 text-slate-600 hover:text-slate-900 font-medium text-[13px] sm:text-sm transition-colors border-b-2 border-transparent hover:border-slate-300">
              Broken Link <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs font-semibold">18</span>
            </button>
            <button className="flex items-center gap-2 pb-1 text-slate-600 hover:text-slate-900 font-medium text-[13px] sm:text-sm transition-colors border-b-2 border-transparent hover:border-slate-300">
              Safety Concern <span className="bg-orange-50 text-orange-700 py-0.5 px-2 rounded-full text-xs font-semibold">14</span>
            </button>
            <div className="hidden lg:block h-6 w-px bg-slate-200 mx-1" />
            <button className="flex items-center gap-2 pb-1 text-slate-600 hover:text-slate-900 font-medium text-[13px] sm:text-sm transition-colors border-b-2 border-transparent hover:border-slate-300">
              Closed <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs font-semibold">342</span>
            </button>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-6 shadow-sm flex flex-col min-w-0 overflow-hidden">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <button className="flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 w-full sm:w-40 hover:bg-slate-50 transition-colors">
              All Types <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by product, user, or report ID..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px] sm:min-h-[500px] -mx-3 sm:mx-0 px-3 sm:px-0">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Report ID</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product / Page</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REPORTS_DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{row.id}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${getTypeBadge(row.type)}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={row.productImg} 
                          alt={row.productName} 
                          className="w-8 h-8 rounded object-cover border border-slate-200 shrink-0 bg-white"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-slate-950 truncate">{row.productName}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{row.productContext}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">{row.userName}</span>
                        <span className="text-xs text-slate-500 mt-0.5">{row.userId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getPriorityBadge(row.priority)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-medium">
                      {row.assignedTo}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col text-sm text-slate-500">
                        <span className="whitespace-nowrap font-medium text-slate-700">{row.created.split('\n')[0]}</span>
                        <span className="whitespace-nowrap text-xs mt-0.5">{row.created.split('\n')[1]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col text-sm text-slate-500">
                        <span className="whitespace-nowrap font-medium text-slate-700">{row.lastUpdated.split('\n')[0]}</span>
                        <span className="whitespace-nowrap text-xs mt-0.5">{row.lastUpdated.split('\n')[1]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/reports/${row.id}`} className="px-3 py-1.5 border border-indigo-200 bg-indigo-50 rounded-lg text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                          View Report
                        </Link>
                        <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pt-4 mt-auto border-t border-slate-200">
            <span className="text-xs sm:text-sm text-slate-500 font-medium w-full sm:w-auto text-center sm:text-left">
              Showing 1 to 10 of 128 results
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="flex items-center justify-between px-2 sm:px-3 py-1.5 border border-slate-200 rounded-md bg-white text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                10 per page <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 ml-1 sm:ml-2 text-slate-400" />
              </button>
              <div className="flex items-center gap-1">
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors bg-white">
                  <ChevronLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white text-xs sm:text-sm font-semibold">1</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-medium bg-white transition-colors">2</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 hidden sm:flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-medium bg-white transition-colors">3</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 hidden sm:flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-medium bg-white transition-colors">4</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 hidden sm:flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-medium bg-white transition-colors">5</button>
                <span className="w-4 sm:w-6 text-center text-slate-400 text-xs sm:text-sm">...</span>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-medium bg-white transition-colors">13</button>
                <button className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors bg-white">
                  <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info Bar */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-indigo-200 bg-white flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-sm text-slate-700 font-medium">
              User reports help us improve data accuracy, recommendations, and safety. Please review and take appropriate action.
            </p>
          </div>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1.5 whitespace-nowrap pl-11 sm:pl-0">
            Report a system issue or false report <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
