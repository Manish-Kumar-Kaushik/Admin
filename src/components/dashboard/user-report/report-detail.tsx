import React from "react";
import Link from "next/link";
import {
  ArrowUp,
  ChevronDown,
  MessageSquare,
  ShieldAlert,
  Link as LinkIcon,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Minus,
  MoreVertical,
  Paperclip,
  Sparkles,
  ClipboardCheck,
  Check
} from "lucide-react";

export default function ReportDetail({ reportId = "RPT-2024-05126" }: { reportId?: string }) {
  return (
    <div className="w-full bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Container */}
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6 pb-0 flex flex-col gap-4 sm:gap-6 min-w-0">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Report {reportId}</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
              High Priority <ArrowUp className="w-3 h-3" />
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Open
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <span>Created: May 20, 2024 at 8:45 AM</span>
            <span className="text-slate-300">|</span>
            <span>Last Updated: May 20, 2024 at 9:15 AM</span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left/Center Content (70%) */}
          <div className="w-full lg:w-[calc(100%-424px)] flex flex-col gap-6">
            
            {/* Row 1: Summary & Message */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Report Summary Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-sm font-bold text-slate-950 mb-4">Report Summary</h2>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Report ID</div>
                    <div className="text-sm font-semibold text-slate-900">{reportId}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Type</div>
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700">
                      Unsafe health claim
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Category</div>
                    <div className="text-sm font-semibold text-slate-900">Safety Concern</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Source</div>
                    <div className="text-sm font-semibold text-slate-900">Website</div>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-100 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Reported By</div>
                      <div className="text-xs font-semibold text-slate-900 truncate">sarah.w@example.com</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">(User ID: U-76422)</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">User Plan</div>
                      <div className="text-sm font-semibold text-slate-900">Free</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Session ID</div>
                      <div className="text-sm font-semibold text-slate-900">SID-8847291</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Message Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <h2 className="text-sm font-bold text-slate-950 mb-4">User Message</h2>
                <div className="relative pl-6 pb-4">
                  <span className="absolute left-0 top-0 text-3xl leading-none text-slate-300 font-serif">"</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium pt-1">
                    The product summary says this serum can <span className="text-rose-600 font-semibold bg-rose-50 px-1 rounded">"cure acne and prevent it forever."</span> That is a medical claim and not true. Please remove or correct this.
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500 font-medium mb-2">Attachments (1)</div>
                  <button className="flex items-center gap-2 border border-slate-200 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors w-fit">
                    <div className="w-8 h-6 bg-slate-100 rounded border border-slate-200 flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80" alt="thumbnail" className="w-full h-full object-cover opacity-50" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">screenshot.png</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Product / Page Context Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 mb-4">Product / Page Context</h2>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-24 h-24 rounded-lg border border-slate-200 bg-white shrink-0 overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-slate-950">The Ordinary Niacinamide 10% + Zinc 1% Serum</h3>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>ASIN: B07H7P7T9B</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>Brand: The Ordinary</span>
                    </div>
                    <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 mt-2">
                      View on site <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 sm:min-w-[200px]">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Page Type</div>
                    <div className="text-xs font-semibold text-slate-900">Product Page</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">URL</div>
                    <div className="text-xs font-semibold text-indigo-600 truncate max-w-[200px]">https://happy.com/product/98765</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Detected At</div>
                    <div className="text-xs font-semibold text-slate-900">May 20, 2024 at 8:30 AM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: AI Verdict & Source Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Related AI Verdict */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-950">Related AI Verdict</h2>
                  <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                    View full verdict
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-2">AI Recommendation</div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 mb-2 border border-emerald-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Buy
                    </span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Good choice based on reviews and price history.
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-2">AI Summary (excerpt)</div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      This product helps control excess oil and the appearance of pores with 10% Niacinamide and Zinc PCA. It can <span className="text-rose-600 bg-rose-50 px-1 rounded font-semibold border-b border-rose-200">cure acne and prevent it forever</span> with consistent use.
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Score</div>
                      <div className="relative w-16 h-16 flex items-center justify-center mx-auto">
                        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                          <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-emerald-500 transition-all duration-1000 ease-out" strokeWidth="3" strokeLinecap="round" strokeDasharray="72, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute flex items-baseline">
                          <span className="text-xl font-bold text-slate-900">72</span>
                          <span className="text-[10px] text-slate-500">/100</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Quality</div>
                      <div className="text-sm font-bold text-slate-900">75</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Value</div>
                      <div className="text-sm font-bold text-slate-900">68</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Safety</div>
                      <div className="text-sm font-bold text-orange-500">62</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Source Evidence */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-950">Related Source Evidence</h2>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    View all sources
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {/* Source 1 */}
                  <div className="flex items-start justify-between gap-4 group">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">1</div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Clinical Study</div>
                        <div className="text-xs text-slate-500 mt-0.5">Topical Niacinamide in Acne Treatment</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 shrink-0">
                      Supports <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Source 2 */}
                  <div className="flex items-start justify-between gap-4 group">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">2</div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Ingredient Database (EWG)</div>
                        <div className="text-xs text-slate-500 mt-0.5">Niacinamide (Safety Profile)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 shrink-0">
                      Supports <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Source 3 */}
                  <div className="flex items-start justify-between gap-4 group">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">3</div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Healthline Article</div>
                        <div className="text-xs text-slate-500 mt-0.5">Does Niacinamide Help With Acne?</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 shrink-0">
                      Partial <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Source 4 */}
                  <div className="flex items-start justify-between gap-4 group">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[10px] font-bold text-rose-600 shrink-0 mt-0.5">4</div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">User Review Complaints</div>
                        <div className="text-xs text-slate-500 mt-0.5">Found 23 complaints about irritation</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 shrink-0">
                      Contradicts <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Row 4: Notes & Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Internal Notes */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-950">Internal Notes</h2>
                  <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Add note
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?w=100&q=80" alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs font-bold text-slate-900">Dr. Melissa Chen</span>
                      <span className="text-[10px] text-slate-400">May 20, 2024 at 9:12 AM</span>
                      <span className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-600 ml-auto border border-indigo-100">
                        Internal
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      Confirmed: "cure acne and prevent it forever" is an unsupported medical claim. Recommend removing this statement and replacing with a safe, evidence-based benefit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-sm font-bold text-slate-950 mb-4">Additional Details</h2>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Report Location</div>
                    <div className="text-sm font-semibold text-slate-900">AI Summary Section</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">First Detected</div>
                    <div className="text-sm font-semibold text-slate-900">May 20, 2024 at 8:30 AM</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Times Reported</div>
                    <div className="text-sm font-semibold text-slate-900">1</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">User Country</div>
                    <div className="text-sm font-semibold text-slate-900">United States</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-slate-500 mb-1">Browser / OS</div>
                    <div className="text-sm font-semibold text-slate-900">Chrome 124 / Windows 11</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Content (30%) - Action Panel */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0 lg:sticky lg:top-20">
            
            {/* Action Panel Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 mb-5">Action Panel</h2>
              
              <div className="flex flex-col gap-5">
                
                {/* Assign to Admin */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assign to Admin</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?w=100&q=80" alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-sm font-semibold text-slate-900">Dr. Melissa Chen</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                {/* Change Priority */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Change Priority</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span className="text-sm font-semibold text-slate-900">High</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                {/* Change Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Change Status</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-blue-200 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span className="text-sm font-semibold text-blue-900">Open</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-blue-500" />
                  </button>
                </div>

                {/* Link to Product Correction */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Link to Product Correction</label>
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-medium text-slate-700 truncate">The Ordinary Niacinamide 10% + Zinc 1% Serum</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg text-sm font-bold transition-colors border border-violet-100">
                    <Sparkles className="w-4 h-4" /> Send to AI Review
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-sm font-bold transition-colors border border-amber-100">
                    <ClipboardCheck className="w-4 h-4" /> Send to Score Audit
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-bold transition-colors border border-slate-200">
                    <MessageSquare className="w-4 h-4" /> Add Internal Note
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-sm font-bold transition-colors shadow-sm mt-1">
                    <CheckCircle2 className="w-4 h-4" /> Close Report
                  </button>
                </div>

              </div>
            </div>

            {/* Status Timeline Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-950 mb-6">Status Timeline</h2>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                <div className="flex flex-col gap-6 relative">
                  
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center shrink-0 z-10 shadow-sm relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="flex flex-col -mt-1 pb-2">
                      <span className="text-sm font-bold text-slate-900">Open</span>
                      <span className="text-xs text-slate-600 mt-0.5">Report created by user</span>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">May 20, 2024 at 8:45 AM</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-orange-400 flex items-center justify-center shrink-0 z-10 shadow-sm relative">
                    </div>
                    <div className="flex flex-col -mt-1 pb-2">
                      <span className="text-sm font-bold text-slate-900">Under Review</span>
                      <span className="text-xs text-slate-600 mt-0.5">Assigned to Dr. Melissa Chen</span>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">May 20, 2024 at 9:00 AM</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-violet-500 flex items-center justify-center shrink-0 z-10 shadow-sm relative">
                      <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                    </div>
                    <div className="flex flex-col -mt-1 pb-2">
                      <span className="text-sm font-bold text-slate-900">Investigating</span>
                      <span className="text-xs text-slate-600 mt-0.5">AI summary and sources reviewed</span>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">May 20, 2024 at 9:12 AM</span>
                    </div>
                  </div>

                  {/* Step 4 (Pending) */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 z-10 relative">
                    </div>
                    <div className="flex flex-col -mt-1 opacity-50 pb-2">
                      <span className="text-sm font-bold text-slate-900">Pending Action</span>
                      <span className="text-xs text-slate-600 mt-0.5">Waiting for next action</span>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">—</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
