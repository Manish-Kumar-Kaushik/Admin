"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Clock,
  Hourglass,
  RefreshCw,
  ShieldAlert,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  MoreVertical,
  Download,
  SlidersHorizontal
} from "lucide-react";

interface ChannelItem {
  id: string;
  name: string;
  handle: string;
  subscribers: string;
  category: string;
  trustScore: string;
  riskLevel: "Low" | "Medium" | "High";
  addedOn: string;
  addedTime: string;
  status: "Pending Review" | "Needs More Info" | "High Risk";
  avatar: React.ReactNode;
}

const YoutubeIcon = () => (
  <svg className="h-3.5 w-3.5 text-slate-400 fill-current inline-block align-middle ml-1.5 hover:text-red-600 transition-colors cursor-pointer" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GearAvatar = () => (
  <div className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center font-extrabold text-[9.5px] tracking-wide shrink-0">
    TechGear
  </div>
);

const AudioAvatar = () => (
  <div className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center font-extrabold text-[9px] tracking-tight leading-none text-center shrink-0">
    Audio<br/>Pro
  </div>
);

const LifeAvatar = () => (
  <div className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center font-extrabold text-[9.5px] tracking-wide shrink-0">
    FitLife
  </div>
);

const StyledAvatar = ({ name, bg }: { name: string; bg: string }) => (
  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-white text-xs shrink-0 shadow-3xs", bg)}>
    {name.split(" ").map(n => n[0]).join("")}
  </div>
);

const mockChannels: ChannelItem[] = [
  {
    id: "1",
    name: "TechGear",
    handle: "@techgearreviews",
    subscribers: "1.25M",
    category: "Tech",
    trustScore: "— Not Scored",
    riskLevel: "Medium",
    addedOn: "May 20, 2025",
    addedTime: "10:24 AM",
    status: "Pending Review",
    avatar: <GearAvatar />
  },
  {
    id: "2",
    name: "Gadget Guru",
    handle: "@gadgetguru",
    subscribers: "845K",
    category: "Tech",
    trustScore: "— Not Scored",
    riskLevel: "Low",
    addedOn: "May 20, 2025",
    addedTime: "09:58 AM",
    status: "Pending Review",
    avatar: <StyledAvatar name="Gadget Guru" bg="bg-blue-600" />
  },
  {
    id: "3",
    name: "Reviews by Sara",
    handle: "@reviewsbysara",
    subscribers: "632K",
    category: "Lifestyle",
    trustScore: "— Not Scored",
    riskLevel: "Medium",
    addedOn: "May 20, 2025",
    addedTime: "09:41 AM",
    status: "Needs More Info",
    avatar: <StyledAvatar name="Reviews by Sara" bg="bg-purple-600" />
  },
  {
    id: "4",
    name: "Audio Pro Reviews",
    handle: "@audioproreviews",
    subscribers: "412K",
    category: "Tech",
    trustScore: "— Not Scored",
    riskLevel: "High",
    addedOn: "May 20, 2025",
    addedTime: "08:33 AM",
    status: "High Risk",
    avatar: <AudioAvatar />
  },
  {
    id: "5",
    name: "Outdoor Picks",
    handle: "@outdoorpicks",
    subscribers: "298K",
    category: "Outdoor",
    trustScore: "— Not Scored",
    riskLevel: "Low",
    addedOn: "May 20, 2025",
    addedTime: "07:22 AM",
    status: "Pending Review",
    avatar: <StyledAvatar name="Outdoor Picks" bg="bg-emerald-600" />
  },
  {
    id: "6",
    name: "FitLife Daily",
    handle: "@fitlifedaily",
    subscribers: "1.02M",
    category: "Health",
    trustScore: "— Not Scored",
    riskLevel: "Medium",
    addedOn: "May 20, 2025",
    addedTime: "06:11 AM",
    status: "Needs More Info",
    avatar: <LifeAvatar />
  }
];

export default function ChannelQueue() {
  const router = useRouter();
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedChannels(mockChannels.map(item => item.id));
    } else {
      setSelectedChannels([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedChannels(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="bg-[#FAFBFD] min-h-full w-full font-sans pb-6 overflow-x-hidden">
      <div className="w-full max-w-full min-w-0 px-3 sm:px-4 md:px-5 py-4 md:py-6 space-y-4 md:space-y-6 overflow-x-hidden">
        

        {/* Title Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full select-none">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              Channel Queue
            </h1>
            <span className="h-5.5 px-2 rounded-md bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold flex items-center justify-center shadow-3xs">
              24
            </span>
          </div>
          
          <button className="flex justify-center items-center gap-1.5 h-9.5 px-4 text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition whitespace-nowrap self-start sm:self-auto">
            <Download className="h-3.5 w-3.5" /> Export Queue
          </button>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-500 -mt-2 sm:-mt-4 select-none">
          Review and evaluate YouTube channels to determine trustworthiness and eligibility.
        </p>

        {/* 5 KPI Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-4 w-full min-w-0">
            <div className="h-11 w-11 rounded-full bg-purple-50 text-purple-650 flex items-center justify-center shrink-0">
              <Clock className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">24</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">Total in Queue</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-4 w-full min-w-0">
            <div className="h-11 w-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Hourglass className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">16</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">Pending Review</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-4 w-full min-w-0">
            <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <RefreshCw className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">6</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">Needs More Info</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-4 w-full min-w-0">
            <div className="h-11 w-11 rounded-full bg-red-50 text-red-655 flex items-center justify-center shrink-0">
              <ShieldAlert className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">2</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">High Risk</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-4 w-full min-w-0">
            <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">0</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">Ready for Approval</span>
            </div>
          </div>
        </div>

        {/* Channel Queue Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden w-full min-w-0">
          
          {/* Toolbar & Filters (Inside the card wrapper) */}
          <div className="flex flex-wrap items-center gap-3 w-full p-4 select-none">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search channels by name or handle..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-slate-350 transition-colors shadow-3xs font-medium"
              />
            </div>

            <div className="relative w-full sm:w-auto flex-1 sm:flex-initial min-w-[130px]">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs">
                <option>All Risk Levels</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-auto flex-1 sm:flex-initial min-w-[125px]">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs">
                <option>All Categories</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-auto flex-1 sm:flex-initial min-w-[125px]">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs">
                <option>All Languages</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <button className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-3xs w-full sm:w-auto flex-1 sm:flex-initial">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" /> More Filters
            </button>

            <div className="relative w-full sm:w-auto sm:ml-auto">
              <select className="appearance-none w-full bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-50 transition shadow-3xs sm:min-w-[155px]">
                <option>Sort: Newest First</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[950px] text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-150 text-slate-400 font-bold uppercase tracking-wider text-[10px] select-none">
                  <th className="py-4 px-4 w-[4%] text-center">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedChannels.length === mockChannels.length}
                      className="rounded border-slate-350 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4 w-[20%]">Channel</th>
                  <th className="py-4 px-4 w-[10%]">Subscribers</th>
                  <th className="py-4 px-4 w-[10%]">Category</th>
                  <th className="py-4 px-4 w-[12%]">Trust Score</th>
                  <th className="py-4 px-4 w-[12%]">Risk Level</th>
                  <th className="py-4 px-4 w-[12%]">Added On</th>
                  <th className="py-4 px-4 w-[12%]">Status</th>
                  <th className="py-4 px-4 w-[8%] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {mockChannels.map((item) => {
                  const isChecked = selectedChannels.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={cn(
                        "hover:bg-slate-50/40 transition-colors cursor-pointer",
                        isChecked ? "bg-blue-50/40" : ""
                      )}
                      onClick={() => handleSelectRow(item.id)}
                    >
                      <td className="py-4.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(item.id)}
                          className="rounded border-slate-350 text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5 cursor-pointer"
                        />
                      </td>

                      <td className="py-4.5 px-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {item.avatar}
                          <div className="leading-tight min-w-0">
                            <span className="text-sm font-bold text-slate-900 block truncate">{item.name}</span>
                            <div className="flex items-center mt-0.5 min-w-0">
                              <span className="text-[11px] text-slate-500 font-medium truncate">{item.handle}</span>
                              <YoutubeIcon />
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4.5 px-4 text-slate-900 font-bold text-xs">
                        {item.subscribers}
                      </td>

                      <td className="py-4.5 px-4 select-none">
                        <span className={cn(
                          "inline-flex justify-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border shadow-3xs",
                          item.category === "Tech" && "bg-blue-50 text-blue-600 border-blue-100",
                          item.category === "Lifestyle" && "bg-purple-50 text-purple-650 border-purple-100",
                          item.category === "Outdoor" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                          item.category === "Health" && "bg-pink-50/70 text-pink-600 border-pink-100"
                        )}>
                          {item.category}
                        </span>
                      </td>

                      <td className="py-4.5 px-4 text-slate-400 font-medium select-none">
                        <div className="text-[11px] font-bold text-slate-400 text-center w-max pr-6">
                          <span className="block text-slate-350 font-normal leading-none mb-1">—</span>
                          <span>Not Scored</span>
                        </div>
                      </td>

                      <td className="py-4.5 px-4 select-none">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border shadow-3xs",
                          item.riskLevel === "Low" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                          item.riskLevel === "Medium" && "bg-amber-50 text-amber-600 border-amber-100",
                          item.riskLevel === "High" && "bg-red-50 text-red-655 border-red-100"
                        )}>
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full shrink-0",
                            item.riskLevel === "Low" && "bg-emerald-500",
                            item.riskLevel === "Medium" && "bg-amber-500",
                            item.riskLevel === "High" && "bg-red-500"
                          )}></span>
                          {item.riskLevel}
                        </span>
                      </td>

                      <td className="py-4.5 px-4 text-slate-550 font-medium">
                        <div>{item.addedOn}</div>
                        <div className="text-[9.5px] text-slate-400 mt-0.5">{item.addedTime}</div>
                      </td>

                      <td className="py-4.5 px-4 select-none" onClick={(e) => e.stopPropagation()}>
                        <span className={cn(
                          "inline-flex justify-center px-3 py-1 rounded-lg text-[10px] font-extrabold shadow-3xs",
                          item.status === "Pending Review" && "bg-amber-50 text-amber-600 border border-amber-100",
                          item.status === "Needs More Info" && "bg-blue-50 text-blue-600 border border-blue-100",
                          item.status === "High Risk" && "bg-red-50 text-red-655 border border-red-100"
                        )}>
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => router.push("/dashboard/youtube-trust/detail")}
                            className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-3xs bg-white">
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

          {/* Footer pagination */}
          <div className="px-4 py-3 border-t border-slate-150 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white text-slate-400 font-bold select-none text-[11px]">
            <span>Showing 1 to 6 of 24 results</span>
            
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="h-7 w-7 rounded bg-[#4F46E5] text-white flex items-center justify-center font-bold">1</button>
              <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">2</button>
              <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">3</button>
              <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">4</button>
              <button className="h-7 w-7 rounded border border-slate-250 flex items-center justify-center hover:bg-slate-50 transition text-slate-455">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
