import React from "react";
import { 
  MoreHorizontal, 
  ArrowUpRight, 
  Minus, 
  Search, 
  ChevronDown, 
  Check, 
  Info,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const partnersData = [
  {
    id: 1,
    name: "Amazon Associates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    tier: "Tier 1",
    category: "General Merchandise",
    programType: "In-House Affiliate",
    priority: "High",
    status: "Live",
    targetMonth: "Jan 2025",
    apiAccess: { status: "PA API", icon: "check" },
    lastFollowUp: "May 18, 2024",
    owner: { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" }
  },
  {
    id: 2,
    name: "Walmart Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    tier: "Tier 1",
    category: "General Merchandise",
    programType: "In-House Affiliate",
    priority: "High",
    status: "Live",
    targetMonth: "Jan 2025",
    apiAccess: { status: "API Access", icon: "check", info: true },
    lastFollowUp: "May 20, 2024",
    owner: { name: "Michael Lee", avatar: "https://i.pravatar.cc/150?u=michael" }
  },
  {
    id: 3,
    name: "Best Buy Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
    tier: "Tier 1",
    category: "Electronics",
    programType: "In-House Affiliate",
    priority: "High",
    status: "Applied",
    targetMonth: "Feb 2025",
    apiAccess: { status: "Pending", icon: null, info: true },
    lastFollowUp: "May 17, 2024",
    owner: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?u=sarah" }
  },
  {
    id: 4,
    name: "Target Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
    tier: "Tier 1",
    category: "General Merchandise",
    programType: "In-House Affiliate",
    priority: "High",
    status: "Approved",
    targetMonth: "Feb 2025",
    apiAccess: { status: "API Access", icon: "check", info: true },
    lastFollowUp: "May 15, 2024",
    owner: { name: "David Brown", avatar: "https://i.pravatar.cc/150?u=david" }
  },
  {
    id: 5,
    name: "eBay Partner Network",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    tier: "Tier 1",
    category: "Marketplace",
    programType: "Affiliate Network",
    priority: "Medium",
    status: "Live",
    targetMonth: "Mar 2025",
    apiAccess: { status: "API Access", icon: "check", info: true },
    lastFollowUp: "May 19, 2024",
    owner: { name: "Emily Davis", avatar: "https://i.pravatar.cc/150?u=emily" }
  },
  {
    id: 6,
    name: "Newegg Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Newegg_logo.svg",
    tier: "Tier 1",
    category: "Electronics",
    programType: "In-House Affiliate",
    priority: "Medium",
    status: "Needs Follow-up",
    targetMonth: "Mar 2025",
    apiAccess: { status: "Limited", icon: null, info: true, color: "text-amber-500" },
    lastFollowUp: "May 10, 2024",
    owner: { name: "James Wilson", avatar: "https://i.pravatar.cc/150?u=james" }
  },
  {
    id: 7,
    name: "B&H Photo Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/B%26H_Photo_Video_logo.svg",
    tier: "Tier 1",
    category: "Electronics",
    programType: "In-House Affiliate",
    priority: "Medium",
    status: "Applied",
    targetMonth: "Apr 2025",
    apiAccess: { status: "Pending", icon: null },
    lastFollowUp: "May 12, 2024",
    owner: { name: "Lisa Chen", avatar: "https://i.pravatar.cc/150?u=lisa" }
  },
  {
    id: 8,
    name: "Home Depot Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/TheHomeDepot.svg",
    tier: "Tier 1",
    category: "Home & Garden",
    programType: "In-House Affiliate",
    priority: "Medium",
    status: "Rejected",
    targetMonth: "Apr 2025",
    apiAccess: { status: "-", icon: null },
    lastFollowUp: "May 05, 2024",
    owner: { name: "Robert Taylor", avatar: "https://i.pravatar.cc/150?u=robert" }
  },
  {
    id: 9,
    name: "Lowe's Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Lowes_Companies_Logo.svg",
    tier: "Tier 1",
    category: "Home & Garden",
    programType: "In-House Affiliate",
    priority: "Medium",
    status: "Not Started",
    targetMonth: "May 2025",
    apiAccess: { status: "-", icon: null },
    lastFollowUp: "-",
    owner: { name: "Amanda White", avatar: "https://i.pravatar.cc/150?u=amanda" }
  },
  {
    id: 10,
    name: "Costco Affiliate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg",
    tier: "Tier 1",
    category: "General Merchandise",
    programType: "In-House Affiliate",
    priority: "High",
    status: "Paused",
    targetMonth: "Q2 2025",
    apiAccess: { status: "Limited", icon: null, info: true, color: "text-amber-500" },
    lastFollowUp: "May 02, 2024",
    owner: { name: "Daniel Martinez", avatar: "https://i.pravatar.cc/150?u=daniel" }
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Live":
      return "bg-emerald-50 text-emerald-700";
    case "Approved":
      return "bg-emerald-50 text-emerald-700";
    case "Applied":
      return "bg-sky-50 text-sky-700";
    case "Rejected":
      return "bg-rose-50 text-rose-700";
    case "Needs Follow-up":
      return "bg-amber-50 text-amber-700";
    case "Paused":
      return "bg-slate-100 text-slate-700";
    case "Not Started":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "General Merchandise":
      return "bg-sky-50 text-sky-700";
    case "Electronics":
      return "bg-amber-50 text-amber-700";
    case "Marketplace":
      return "bg-purple-50 text-purple-700";
    case "Home & Garden":
      return "bg-emerald-50 text-emerald-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

export default function PartnerList() {
  return (
    <div className="flex-1 bg-slate-50 font-sans min-h-screen w-full overflow-x-hidden m-0 p-0">
      <div className="w-full px-2 sm:px-4 lg:px-4 py-2 sm:py-4 flex flex-col gap-3 sm:gap-4 min-w-0 max-w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-950 mb-1 truncate">Affiliate Partners</h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate">Manage affiliate and retailer partnerships, track status, and monitor program performance.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button variant="outline" className="font-semibold border-slate-200 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" /> Add Partner
            </Button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm flex flex-col min-w-0 w-full overflow-hidden max-w-full">
          
          {/* Filters Bar */}
          <div className="flex flex-col xl:flex-row gap-3 sm:gap-4 justify-between items-start xl:items-center mb-4 sm:mb-6 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full xl:w-auto">
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <select className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>All Tiers</option>
                  <option>Tier 1</option>
                  <option>Tier 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <select className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Home & Garden</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <select className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>All Program Types</option>
                  <option>In-House Affiliate</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <select className="w-full sm:w-auto h-9 sm:h-10 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>All Statuses</option>
                  <option>Live</option>
                  <option>Pending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="relative w-full xl:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by partner..." 
                className="w-full h-9 sm:h-10 rounded-md border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-slate-400" 
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full border border-slate-100 rounded-lg hide-scrollbar min-w-0 max-w-full">
            <Table>
              <TableHeader>
                <TableRow className="border-b-slate-200 hover:bg-transparent bg-slate-50/50">
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 min-w-[200px]">Partner</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4">Tier</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 min-w-[150px]">Category</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 min-w-[140px]">Program Type</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4">Priority</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4">Status</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 min-w-[120px]">Target Month</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 min-w-[150px]">API / Feed Access</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 min-w-[120px]">Last Follow-up</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 min-w-[140px]">Owner</TableHead>
                  <TableHead className="text-xs uppercase font-semibold text-slate-500 py-3 px-4 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnersData.map((partner) => (
                  <TableRow key={partner.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-sm bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          <img src={partner.logo} alt={partner.name} className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                        </div>
                        <span className="text-[11px] md:text-xs xl:text-sm font-semibold text-slate-950">{partner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] md:text-[11px] xl:text-xs font-medium bg-purple-50 text-purple-700">
                        {partner.tier}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] md:text-[11px] xl:text-xs font-medium ${getCategoryBadge(partner.category)}`}>
                        {partner.category}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <span className="text-[11px] md:text-xs xl:text-sm text-slate-600 font-medium">{partner.programType}</span>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {partner.priority === "High" ? (
                          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-rose-500" />
                        ) : (
                          <Minus className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                        )}
                        <span className="text-[11px] md:text-xs xl:text-sm text-slate-700">{partner.priority}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] md:text-[11px] xl:text-xs font-medium ${getStatusBadge(partner.status)}`}>
                        {partner.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <span className="text-[11px] md:text-xs xl:text-sm text-slate-700">{partner.targetMonth}</span>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {partner.apiAccess.icon === "check" && <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 shrink-0" />}
                        <span className={`text-[11px] md:text-xs xl:text-sm ${partner.apiAccess.color || "text-slate-700"} ${partner.apiAccess.status === "Pending" ? "text-slate-400" : ""}`}>
                          {partner.apiAccess.status}
                        </span>
                        {partner.apiAccess.info && <Info className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-400 shrink-0 ml-0.5" />}
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <span className="text-[11px] md:text-xs xl:text-sm text-slate-700">{partner.lastFollowUp}</span>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <img src={partner.owner.avatar} alt={partner.owner.name} className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover shrink-0" />
                        <span className="text-[11px] md:text-xs xl:text-sm text-slate-700 font-medium">{partner.owner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5 px-3 md:px-4 text-center whitespace-nowrap">
                      {partner.name === "Amazon Associates" ? (
                        <Link href="/dashboard/affiliate-programs/amazon-associates" passHref>
                          <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                          <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-sm text-slate-500 font-medium">Showing 1 to 10 of 24 partners</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="default" className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700 text-white p-0">
                1
              </Button>
              <Button variant="outline" className="h-8 w-8 border-slate-200 text-slate-600 p-0">
                2
              </Button>
              <Button variant="outline" className="h-8 w-8 border-slate-200 text-slate-600 p-0">
                3
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200">
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              <div className="relative ml-2 hidden sm:block">
                <select className="h-8 pl-3 pr-8 rounded-md border border-slate-200 bg-white text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-600 appearance-none outline-none">
                  <option>10 / page</option>
                  <option>20 / page</option>
                  <option>50 / page</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Guide Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm flex flex-col min-w-0 w-full overflow-hidden max-w-full">
          {/* Status Guide */}
          <div className="w-full overflow-x-auto hide-scrollbar">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 sm:mb-4">Status Guide</h3>
            <div className="flex gap-4 sm:grid sm:grid-cols-4 lg:grid-cols-7 min-w-max sm:min-w-0">
              <div className="flex flex-col items-start gap-1 sm:gap-2 w-32 sm:w-auto">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-600 whitespace-nowrap">Not Started</span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">Partnership not initiated</p>
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2 w-32 sm:w-auto">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-sky-50 text-sky-700 whitespace-nowrap">Applied</span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">Application submitted</p>
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2 w-32 sm:w-auto">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-emerald-50 text-emerald-700 whitespace-nowrap">Approved</span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">Approved, setup in progress</p>
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2 w-32 sm:w-auto">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-rose-50 text-rose-700 whitespace-nowrap">Rejected</span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">Application was rejected</p>
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2 w-32 sm:w-auto">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-amber-50 text-amber-700 whitespace-nowrap">Needs Follow-up</span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">Waiting on partner response</p>
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2 w-32 sm:w-auto">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-emerald-50 text-emerald-700 whitespace-nowrap">Live</span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">Actively tracking & earning</p>
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2 w-32 sm:w-auto">
                <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap">Paused</span>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">Temporarily paused</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text Outside Card */}
        <div className="mt-2 text-center pb-4">
          <p className="text-xs text-slate-400 font-medium">All times in Eastern Time (ET)</p>
        </div>

      </div>
    </div>
  );
}
