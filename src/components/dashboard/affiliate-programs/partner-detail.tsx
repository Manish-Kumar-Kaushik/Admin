"use client";

import React from 'react';
import { 
  CheckCircle2, PauseCircle, ExternalLink, MoreVertical, Send, 
  CalendarPlus, ArrowUp, ArrowDown, Shield, FileText, Activity,
  ChevronDown, ExternalLink as LinkIcon, DollarSign, Target, Check, Circle, ClipboardList
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { date: 'Apr 22', revenue: 500, commission: 80 },
  { date: 'Apr 23', revenue: 620, commission: 150 },
  { date: 'Apr 24', revenue: 640, commission: 160 },
  { date: 'Apr 25', revenue: 660, commission: 160 },
  { date: 'Apr 26', revenue: 640, commission: 150 },
  { date: 'Apr 27', revenue: 820, commission: 250 },
  { date: 'Apr 28', revenue: 750, commission: 200 },
  { date: 'Apr 29', revenue: 800, commission: 250 },
  { date: 'Apr 30', revenue: 1000, commission: 340 },
  { date: 'May 01', revenue: 880, commission: 250 },
  { date: 'May 02', revenue: 980, commission: 280 },
  { date: 'May 03', revenue: 780, commission: 180 },
  { date: 'May 04', revenue: 750, commission: 160 },
  { date: 'May 05', revenue: 920, commission: 280 },
  { date: 'May 06', revenue: 900, commission: 300 },
  { date: 'May 07', revenue: 1000, commission: 280 },
  { date: 'May 08', revenue: 880, commission: 320 },
  { date: 'May 09', revenue: 880, commission: 250 },
  { date: 'May 10', revenue: 1000, commission: 320 },
  { date: 'May 11', revenue: 880, commission: 260 },
  { date: 'May 12', revenue: 1100, commission: 380 },
  { date: 'May 13', revenue: 1060, commission: 350 },
  { date: 'May 14', revenue: 1200, commission: 450 },
  { date: 'May 15', revenue: 1250, commission: 440 },
  { date: 'May 16', revenue: 1350, commission: 350 },
  { date: 'May 17', revenue: 1150, commission: 360 },
  { date: 'May 18', revenue: 1350, commission: 450 },
  { date: 'May 19', revenue: 1280, commission: 440 },
  { date: 'May 20', revenue: 1100, commission: 320 },
];

const checklistItems = [
  { id: 1, label: 'Apply to program', status: 'Completed', date: 'Jan 10, 2024' },
  { id: 2, label: 'Account approved', status: 'Completed', date: 'Jan 15, 2024' },
  { id: 3, label: 'Add tracking ID to links', status: 'Completed', date: 'Jan 20, 2024' },
  { id: 4, label: 'Test tracking', status: 'Completed', date: 'Jan 21, 2024' },
  { id: 5, label: 'Verify commissions', status: 'In Progress', date: '—' },
  { id: 6, label: 'Enable API access', status: 'Pending', date: '—' },
  { id: 7, label: 'Setup product data feed', status: 'Pending', date: '—' },
];

export default function PartnerDetail() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-4 w-full overflow-x-hidden">
      <div className="w-full max-w-full mx-auto px-3 sm:px-4 md:px-5 lg:px-6 pt-4 pb-2 flex flex-col gap-5 sm:gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 shrink-0 shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-full h-full object-contain" />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[20px] sm:text-[22px] font-bold text-slate-900 leading-none">Amazon Associates</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[11px] font-bold">Tier 1</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">Live</span>
              </div>
              <div className="text-[13px] text-slate-500 font-medium">In-House Affiliate Program</div>
              <div className="text-[13px] text-blue-600 font-medium flex items-center gap-1 cursor-pointer hover:underline break-all">
                https://affiliate-program.amazon.com <LinkIcon className="w-3.5 h-3.5 shrink-0" />
              </div>
              <div className="flex items-center gap-2 text-[12.5px] text-slate-500 font-medium mt-0.5 flex-wrap">
                <span className="whitespace-nowrap">Partner since: —</span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="whitespace-nowrap">Partner ID / Tag: <span className="text-slate-700 font-bold">AMZ-001</span></span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="flex items-center gap-1 whitespace-nowrap">Priority: <span className="text-red-500 font-bold flex items-center">High <ArrowUp className="w-3.5 h-3.5" /></span></span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" className="h-9 px-3 text-[13px] font-semibold text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
              <Send className="w-4 h-4 mr-1.5" /> Mark Applied
            </Button>
            <Button variant="outline" className="h-9 px-3 text-[13px] font-semibold text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Mark Approved
            </Button>
            <Button variant="outline" className="h-9 px-3 text-[13px] font-semibold text-violet-600 border-violet-200 bg-violet-50 hover:bg-violet-100">
              <CalendarPlus className="w-4 h-4 mr-1.5" /> Add Follow-up
            </Button>
            <Button variant="outline" className="h-9 px-3 text-[13px] font-semibold text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100">
              <PauseCircle className="w-4 h-4 mr-1.5" /> Pause Partner
            </Button>
            <Button variant="outline" className="h-9 px-3 text-[13px] font-semibold text-slate-700 border-slate-200 hover:bg-slate-50">
              <LinkIcon className="w-4 h-4 mr-1.5" /> View Links
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 text-slate-500 shrink-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Row 1: 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          {/* Program Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col text-[13px]">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-[14px]">
              <Shield className="w-4 h-4 text-slate-400" /> Program Status
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-emerald-600 text-right">Live</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Application Status</span>
                <span className="font-semibold text-emerald-600 text-right">Approved</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Approval Date</span>
                <span className="font-semibold text-slate-900 text-right">Jan 15, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Tracking Active Since</span>
                <span className="font-semibold text-slate-900 text-right">Jan 20, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Contract Expires</span>
                <span className="font-semibold text-slate-900 text-right">—</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500">Auto-Expire</span>
                <span className="font-semibold text-slate-900 text-right">90 days of inactivity</span>
              </div>
            </div>
          </div>

          {/* Commission Notes */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col text-[13px]">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-[14px]">
              <DollarSign className="w-4 h-4 text-emerald-500" /> Commission Notes
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Base Commission</span>
                <span className="font-semibold text-slate-900 text-right">1% - 10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Cookie Duration</span>
                <span className="font-semibold text-slate-900 text-right">24 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payout Threshold</span>
                <span className="font-semibold text-slate-900 text-right">$10.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Schedule</span>
                <span className="font-semibold text-slate-900 text-right">Monthly</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Special Terms</span>
                <span className="font-semibold text-slate-900 text-right">—</span>
              </div>
            </div>
            <div className="mt-auto pt-4 text-[12px] font-semibold text-violet-600 cursor-pointer">
              View full terms & conditions
            </div>
          </div>

          {/* API / Feed Access */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col text-[13px]">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-[14px]">
              <Activity className="w-4 h-4 text-blue-500" /> API / Feed Access
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">PA API</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Product Advertising API</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Deep Links</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Reports API</span>
                <span className="font-semibold text-orange-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Limited</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Product Data Feed</span>
                <span className="font-semibold text-slate-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Not Enabled</span>
              </div>
            </div>
            <div className="mt-auto pt-4 text-[12px] font-semibold text-violet-600 cursor-pointer">
              Manage API Access
            </div>
          </div>

          {/* Categories Supported */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col text-[13px] overflow-hidden">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-[14px]">
              <Target className="w-4 h-4 text-violet-500" /> Categories Supported
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Electronics</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Computers</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Home & Kitchen</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Beauty & Personal Care</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Tools & Home Improvement</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Toys & Games</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Sports & Outdoors</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Automotive</span>
              <span className="px-2.5 py-1 rounded-full text-blue-600 font-semibold text-[11px] cursor-pointer bg-blue-50">+ 12 more</span>
            </div>
            <div className="mt-auto pt-4 text-[12px] font-semibold text-violet-600 cursor-pointer">
              View all categories
            </div>
          </div>

        </div>

        {/* Row 2: 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
          
          {/* Integration Checklist */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col lg:col-span-3 w-full overflow-hidden">
            <div className="flex items-center gap-3 font-bold text-slate-900 mb-4 text-[14px] sm:text-[15.5px]">
              <div className="bg-slate-50 border border-slate-100 text-slate-600 p-1.5 rounded-lg shrink-0">
                <ClipboardList className="w-4 h-4" />
              </div>
              Integration Checklist
            </div>
            <div className="flex flex-col gap-3.5 w-full">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-[11px] sm:text-[12px] xl:text-[12.5px] gap-2 border-b border-slate-50 xl:border-0 pb-2 xl:pb-0 last:border-0 last:pb-0">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 text-slate-800 font-medium min-w-0">
                    <div className="shrink-0">
                      {item.status === 'Completed' ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      )}
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>
                    <div className="flex items-center justify-end gap-3 sm:gap-3 shrink-0">
                      {item.status === 'Completed' && (
                        <span className="font-semibold text-emerald-600 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap mr-3 sm:mr-0">
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="">Completed</span>
                        </span>
                      )}
                      {item.status === 'In Progress' && (
                        <span className="font-semibold text-orange-500 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap mr-3 sm:mr-0">
                          <Circle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="">In Progress</span>
                        </span>
                      )}
                      {item.status === 'Pending' && (
                        <span className="font-medium text-slate-500 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap mr-3 sm:mr-0">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300"></div> <span className="">Pending</span>
                        </span>
                      )}
                      <span className={`w-[55px] sm:w-[75px] text-right whitespace-nowrap ${item.date !== '—' ? 'text-slate-800' : 'text-slate-500 font-medium'}`}>
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-auto pt-5 text-[12.5px] sm:text-[13px] font-bold text-violet-600 flex items-center gap-1.5 cursor-pointer">
              View integration guide <LinkIcon className="w-3.5 h-3.5" />
            </div>
          </div>
          {/* Contact / Follow-up Log */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col lg:col-span-5 w-full overflow-hidden">
            <div className="flex items-center justify-between mb-5 gap-2">
              <div className="flex items-center gap-2 text-[14.5px] text-slate-900 font-bold truncate">
                <FileText className="w-4 h-4 text-slate-400 shrink-0" /> <span className="truncate">Contact / Follow-up Log</span>
              </div>
              <Button variant="outline" size="sm" className="h-7 px-3 text-[12px] font-bold text-violet-600 border-violet-200 bg-violet-50 hover:bg-violet-100 rounded-md shrink-0">
                Add Follow-up
              </Button>
            </div>
            <div className="w-full overflow-x-auto pb-2">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-100 text-[12px]">
                    <th className="font-semibold pb-3 pr-2 whitespace-nowrap">Date</th>
                    <th className="font-semibold pb-3 pr-2 whitespace-nowrap">Type</th>
                    <th className="font-semibold pb-3 pr-2 w-[35%]">Notes</th>
                    <th className="font-semibold pb-3 pr-2 whitespace-nowrap">Owner</th>
                    <th className="font-semibold pb-3 whitespace-nowrap">Next Step</th>
                  </tr>
                </thead>
                <tbody className="align-top text-[12px]">
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 pr-2 text-slate-900 font-semibold whitespace-nowrap">May 18, 2024</td>
                    <td className="py-2.5 pr-2 text-slate-900">Check-in</td>
                    <td className="py-2.5 pr-2 text-slate-600 leading-relaxed min-w-[150px]">Confirmed API access is stable.</td>
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-1.5">
                        <img src="https://i.pravatar.cc/150?u=jane" className="w-5 h-5 rounded-full" alt="Jane" />
                        <span className="text-slate-900 font-medium whitespace-nowrap">Jane Smith</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-slate-900">—</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 pr-2 text-slate-900 font-semibold whitespace-nowrap">May 02, 2024</td>
                    <td className="py-2.5 pr-2 text-slate-900">Email</td>
                    <td className="py-2.5 pr-2 text-slate-600 leading-relaxed min-w-[150px]">Requested updated commission<br/>structure for Electronics.</td>
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-1.5">
                        <img src="https://i.pravatar.cc/150?u=mike" className="w-5 h-5 rounded-full" alt="Mike" />
                        <span className="text-slate-900 font-medium whitespace-nowrap">Michael Lee</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-slate-900 font-medium whitespace-nowrap">May 20, 2024</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 pr-2 text-slate-900 font-semibold whitespace-nowrap">Apr 15, 2024</td>
                    <td className="py-2.5 pr-2 text-slate-900">Call</td>
                    <td className="py-2.5 pr-2 text-slate-600 leading-relaxed min-w-[150px]">Discussed new product categories<br/>and promotions.</td>
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-1.5">
                        <img src="https://i.pravatar.cc/150?u=jane" className="w-5 h-5 rounded-full" alt="Jane" />
                        <span className="text-slate-900 font-medium whitespace-nowrap">Jane Smith</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-slate-900">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-2 text-slate-900 font-semibold whitespace-nowrap">Mar 28, 2024</td>
                    <td className="py-2.5 pr-2 text-slate-900">Email</td>
                    <td className="py-2.5 pr-2 text-slate-600 leading-relaxed min-w-[150px]">Initial outreach and application<br/>submission.</td>
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-1.5">
                        <img src="https://i.pravatar.cc/150?u=mike" className="w-5 h-5 rounded-full" alt="Mike" />
                        <span className="text-slate-900 font-medium whitespace-nowrap">Michael Lee</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-slate-900 font-medium whitespace-nowrap">Apr 01, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-auto pt-4 text-[12.5px] font-bold text-violet-600 cursor-pointer">
              View all follow-ups
            </div>
          </div>

          {/* Affiliate Links */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col lg:col-span-4 w-full overflow-hidden">
            <div className="flex items-center justify-between mb-5 gap-2">
              <div className="flex items-center gap-1.5 text-[14.5px] text-slate-900 font-bold flex-wrap">
                Affiliate Links <span className="text-slate-400 font-medium text-[12.5px] whitespace-nowrap">(Tracking ID: happy-20)</span>
              </div>
              <div className="text-[12.5px] font-bold text-violet-600 cursor-pointer whitespace-nowrap">
                View all links
              </div>
            </div>
            <div className="w-full overflow-x-auto pb-2">
              <table className="w-full text-left min-w-[400px]">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-100 text-[12px]">
                    <th className="font-semibold pb-3 pr-2 whitespace-nowrap">Type</th>
                    <th className="font-semibold pb-3 pr-2 whitespace-nowrap">Example Link</th>
                    <th className="font-semibold pb-3 pr-2 whitespace-nowrap text-center">Status</th>
                    <th className="font-semibold pb-3 text-right whitespace-nowrap">Clicks (30D)</th>
                  </tr>
                </thead>
                <tbody className="align-top text-[12px]">
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 pr-2 text-slate-900 font-medium whitespace-nowrap">Product Link</td>
                    <td className="py-2.5 pr-2 text-violet-600 font-medium whitespace-nowrap">https://amzn.to/3XxExample</td>
                    <td className="py-2.5 pr-2 text-center"><span className="text-emerald-600 font-bold text-[11px]">Active</span></td>
                    <td className="py-2.5 text-slate-900 font-bold text-right">12,842</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 pr-2 text-slate-900 font-medium whitespace-nowrap">Search Link</td>
                    <td className="py-2.5 pr-2 text-violet-600 font-medium whitespace-nowrap">https://amzn.to/3XxSearch</td>
                    <td className="py-2.5 pr-2 text-center"><span className="text-emerald-600 font-bold text-[11px]">Active</span></td>
                    <td className="py-2.5 text-slate-900 font-bold text-right">8,421</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 pr-2 text-slate-900 font-medium whitespace-nowrap">Store Link</td>
                    <td className="py-2.5 pr-2 text-violet-600 font-medium whitespace-nowrap">https://amzn.to/3XxStore</td>
                    <td className="py-2.5 pr-2 text-center"><span className="text-emerald-600 font-bold text-[11px]">Active</span></td>
                    <td className="py-2.5 text-slate-900 font-bold text-right">2,104</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 pr-2 text-slate-900 font-medium whitespace-nowrap">Homepage Link</td>
                    <td className="py-2.5 pr-2 text-violet-600 font-medium whitespace-nowrap">https://amzn.to/3XxHome</td>
                    <td className="py-2.5 pr-2 text-center"><span className="text-emerald-600 font-bold text-[11px]">Active</span></td>
                    <td className="py-2.5 text-slate-900 font-bold text-right">1,098</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-2 text-slate-900 font-medium whitespace-nowrap">Custom Link</td>
                    <td className="py-2.5 pr-2 text-violet-600 font-medium whitespace-nowrap">https://amzn.to/3XxCustom</td>
                    <td className="py-2.5 pr-2 text-center"><span className="text-emerald-600 font-bold text-[11px]">Active</span></td>
                    <td className="py-2.5 text-slate-900 font-bold text-right">532</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-auto pt-4 text-[12.5px] font-bold text-violet-600 cursor-pointer">
              Manage all links
            </div>
          </div>

        </div>

        {/* Row 3: Performance Summary & Chart */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col xl:flex-row overflow-hidden w-full">
          
          {/* Performance Summary (Left) */}
          <div className="flex flex-col p-5 xl:border-r border-slate-100 w-full xl:w-[58%] shrink-0">
            <div className="flex items-center gap-2 text-[14.5px] text-slate-900 font-bold mb-8">
              Performance Summary <span className="text-slate-400 font-medium text-[12.5px]">(Last 30 Days)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2 overflow-x-auto pb-2">
              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[12.5px] font-bold text-slate-500 whitespace-nowrap">Clicks</span>
                <span className="text-[22px] font-bold text-slate-900 mt-1 whitespace-nowrap">25,997</span>
                <span className="text-[12px] font-bold text-emerald-600 flex items-center whitespace-nowrap">
                  <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> 18.6%
                </span>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">vs previous 30 days</span>
              </div>
              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[12.5px] font-bold text-slate-500 whitespace-nowrap">Orders</span>
                <span className="text-[22px] font-bold text-slate-900 mt-1 whitespace-nowrap">1,286</span>
                <span className="text-[12px] font-bold text-emerald-600 flex items-center whitespace-nowrap">
                  <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> 15.3%
                </span>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">vs previous 30 days</span>
              </div>
              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[12.5px] font-bold text-slate-500 whitespace-nowrap">Conversion Rate</span>
                <span className="text-[22px] font-bold text-slate-900 mt-1 whitespace-nowrap">4.95%</span>
                <span className="text-[12px] font-bold text-red-500 flex items-center whitespace-nowrap">
                  <ArrowDown className="w-3.5 h-3.5 mr-0.5" /> 2.1%
                </span>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">vs previous 30 days</span>
              </div>
              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[12.5px] font-bold text-slate-500 whitespace-nowrap">Revenue</span>
                <span className="text-[22px] font-bold text-slate-900 mt-1 whitespace-nowrap">$28,451.22</span>
                <span className="text-[12px] font-bold text-emerald-600 flex items-center whitespace-nowrap">
                  <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> 22.4%
                </span>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">vs previous 30 days</span>
              </div>
              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[12.5px] font-bold text-slate-500 whitespace-nowrap">Commission</span>
                <span className="text-[22px] font-bold text-slate-900 mt-1 whitespace-nowrap">$2,107.34</span>
                <span className="text-[12px] font-bold text-emerald-600 flex items-center whitespace-nowrap">
                  <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> 20.1%
                </span>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">vs previous 30 days</span>
              </div>
            </div>
          </div>

          {/* Earnings Overview (Right) */}
          <div className="flex flex-col p-5 w-full xl:w-[42%]">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
              <div className="flex flex-col gap-3">
                <span className="text-[15px] text-slate-900 font-bold">Earnings Overview</span>
                <div className="flex items-center gap-6 text-[13px] font-semibold text-slate-600 flex-wrap">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-[2px] bg-violet-600 relative flex items-center justify-center">
                      <div className="absolute w-1.5 h-1.5 rounded-sm bg-violet-600 rotate-45"></div>
                    </div> 
                    Revenue
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-[2px] bg-emerald-500 relative flex items-center justify-center">
                      <div className="absolute w-1.5 h-1.5 rounded-sm bg-emerald-500 rotate-45"></div>
                    </div> 
                    Commission
                  </span>
                </div>
              </div>
              <Button variant="outline" className="h-8 px-3 text-[13px] font-semibold text-slate-700 shrink-0">
                Last 30 Days <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="h-[150px] w-full min-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -5, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCom" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    ticks={['Apr 22', 'Apr 29', 'May 06', 'May 13', 'May 20']}
                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    domain={[0, 1500]}
                    ticks={[0, 500, 1000, 1500]}
                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                    tickFormatter={(val) => val === 0 ? '$0' : val === 500 ? '$500' : `$${val / 1000}K`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '13px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" isAnimationActive={true} animationDuration={1500} animationEasing="ease-out" />
                  <Area type="monotone" dataKey="commission" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCom)" isAnimationActive={true} animationDuration={1500} animationEasing="ease-out" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
