"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Eye,
  Info,
  Edit2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  CheckCircle,
  FileText,
  User,
  Plus,
  HelpCircle,
  AlertCircle,
  XCircle,
  Clock,
  ArrowRight,
  Save,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Types
interface LineItem {
  id: number;
  rawText: string;
  parsedName: string;
  qty: string;
  price: string;
  matchedProduct: string;
  category: string;
  confidence: number;
}

export default function ReceiptDetail() {
  const [isChartMounted, setIsChartMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsChartMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [internalNote, setInternalNote] = useState("");
  const [notesList, setNotesList] = useState<string[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState("70%");
  
  // Extracted Receipt Data state
  const [isEditingData, setIsEditingData] = useState(false);
  const [extractedData, setExtractedData] = useState({
    retailer: "Walmart",
    store: "5322",
    storeAddress: "1100 N Congress Ave, Austin, TX 78701",
    cashierRegister: "014",
    paymentMethod: "Debit (****1234)",
    purchaseDate: "May 20, 2024 09:47 AM",
    transactionId: "12345",
    total: "$52.65",
    tax: "$4.01",
    totalItems: "7",
  });

  const lineItems: LineItem[] = [
    {
      id: 1,
      rawText: "BANANAS",
      parsedName: "Bananas, Yellow",
      qty: "1.00 lb",
      price: "$1.62",
      matchedProduct: "Bananas",
      category: "Fresh Produce",
      confidence: 95,
    },
    {
      id: 2,
      rawText: "ORGANIC MILK 2%",
      parsedName: "Organic Milk 2%",
      qty: "1",
      price: "$3.48",
      matchedProduct: "365 Organic Milk 2%",
      category: "Whole Foods",
      confidence: 92,
    },
    {
      id: 3,
      rawText: "CHICKEN BREAST",
      parsedName: "Boneless Skinless Chicken Breast",
      qty: "1.48 lb",
      price: "$8.74",
      matchedProduct: "Tyson Boneless Skinless Chicken Breast",
      category: "Tyson",
      confidence: 89,
    },
    {
      id: 4,
      rawText: "TIDE LAUNDRY DETERGENT",
      parsedName: "Tide Liquid Laundry Detergent",
      qty: "1",
      price: "$11.97",
      matchedProduct: "Tide Original Liquid",
      category: "Tide",
      confidence: 96,
    },
    {
      id: 5,
      rawText: "BOUNTY PAPER TOWELS",
      parsedName: "Bounty Paper Towels",
      qty: "1",
      price: "$12.47",
      matchedProduct: "Bounty Select-A-Size",
      category: "Bounty",
      confidence: 94,
    },
    {
      id: 6,
      rawText: "DORITOS NACHO CHEESE",
      parsedName: "Doritos Nacho Cheese Chips",
      qty: "1",
      price: "$4.28",
      matchedProduct: "Doritos Nacho Cheese",
      category: "Doritos",
      confidence: 65,
    },
    {
      id: 7,
      rawText: "GATORADE COOL BLUE",
      parsedName: "Gatorade Cool Blue",
      qty: "2",
      price: "$6.48",
      matchedProduct: "Gatorade Thirst Quencher Cool Blue",
      category: "Gatorade",
      confidence: 75,
    },
  ];

  const handleSaveNote = () => {
    if (internalNote.trim()) {
      setNotesList([internalNote, ...notesList]);
      setInternalNote("");
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return "text-emerald-700 bg-emerald-50";
    if (score >= 60) return "text-amber-700 bg-amber-50";
    return "text-rose-700 bg-rose-50";
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full font-sans pb-2">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-5">
        
        {/* Breadcrumbs & Navigation Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 select-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Admin</span>
            <span>&gt;</span>
            <Link href="/dashboard/receipts" className="hover:text-slate-600 transition">Receipts</Link>
            <span>&gt;</span>
            <span className="text-slate-700 font-bold">RCP-2024-05126</span>
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              href="/dashboard/receipts"
              className="inline-flex items-center gap-1.5 h-8 px-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Receipts
            </Link>
            <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
              <button className="h-8 w-8 flex items-center justify-center hover:bg-slate-50 border-r border-slate-150 transition text-slate-400 hover:text-slate-600">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center hover:bg-slate-50 transition text-slate-400 hover:text-slate-600">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Title Block */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Receipt Detail
              </h1>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-emerald-700 border border-emerald-250 uppercase select-none">
                Completed
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500">
              <span>Receipt ID: <strong className="text-slate-700 font-bold">RCP-2024-05126</strong></span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span>Uploaded by: <span className="text-slate-700 font-bold">jason.t@example.com</span> <span className="text-slate-450">(User ID: U-1048921)</span></span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span>Uploaded at: <span className="text-slate-700 font-bold">May 20, 2024 at 10:15 AM</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 select-none">
            <button className="flex justify-center items-center gap-1.5 h-8 px-3.5 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Download PDF
            </button>
            <button className="flex justify-center items-center gap-1.5 h-8 px-3.5 text-[12px] font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors whitespace-nowrap">
              <Eye className="h-3.5 w-3.5" /> View in User Account
            </button>
          </div>
        </div>

        {/* main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start min-w-0 w-full">
          
          {/* Column 1: Receipt Preview & Info (ColSpan 3) */}
          <div className="lg:col-span-3 space-y-4 min-w-0">
            
            {/* Receipt Preview Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 select-none">
                <span className="text-xs font-bold text-slate-800 inline-flex items-center gap-1">
                  Receipt Preview
                  <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                </span>
                
                {/* Zoom / Rotate Controls */}
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                  <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="h-6 w-6 rounded hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition" title="Zoom Out">
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="h-6 w-6 rounded hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition" title="Zoom In">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setRotation((rotation + 90) % 360)} className="h-6 w-6 rounded hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition" title="Rotate">
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => { setZoom(100); setRotation(0); }} className="h-6 w-6 rounded hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition" title="Reset Zoom">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Receipt Image Container */}
              <div className="w-full bg-slate-100 rounded-lg p-3 min-h-[350px] flex items-start justify-center overflow-auto border border-slate-150">
                <div 
                  className="bg-white border border-slate-200 shadow-sm p-4 w-full max-w-[280px] text-[10px] font-mono text-slate-800 leading-snug space-y-3 transition-all duration-300"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: "top center",
                  }}
                >
                  {/* Mock Walmart Receipt Header */}
                  <div className="text-center space-y-1">
                    <div className="font-extrabold text-base tracking-tighter text-slate-900 uppercase">Walmart *</div>
                    <div className="text-[8px] font-bold text-slate-500">Save money. Live better.</div>
                    <div className="text-[8px] font-semibold text-slate-500 mt-1 leading-none">
                      Walmart Supercenter<br/>
                      1100 N Congress Ave<br/>
                      Austin, TX 78701<br/>
                      (512) 555-0198
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300 my-2" />

                  <div className="flex justify-between font-bold text-[8px]">
                    <span>05/20/24</span>
                    <span>09:47 AM</span>
                  </div>
                  <div className="flex justify-between text-[8px] font-semibold text-slate-500">
                    <span>Store 5322</span>
                    <span>Register 014</span>
                    <span>Txn 12345</span>
                  </div>

                  <div className="border-t border-dashed border-slate-300 my-2" />

                  {/* Receipt Items list */}
                  <div className="space-y-1 text-[8px] font-semibold">
                    <div className="flex justify-between">
                      <span>BANANAS</span>
                      <span>1.62  N</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ORGANIC MILK 2%</span>
                      <span>3.48  N</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CHICKEN BREAST</span>
                      <span>8.74  N</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TIDE LAUNDRY DETERGENT</span>
                      <span>11.97 N</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BOUNTY PAPER TOWELS</span>
                      <span>12.47 N</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DORITOS NACHO CHEESE</span>
                      <span>4.28  N</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GATORADE COOL BLUE</span>
                      <span>6.48  N</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300 my-2" />

                  {/* Calculations */}
                  <div className="space-y-0.5 text-[8px] font-bold">
                    <div className="flex justify-between">
                      <span>SUBTOTAL</span>
                      <span>48.64</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>TAX 8.250%</span>
                      <span>4.01</span>
                    </div>
                    <div className="flex justify-between text-slate-900 text-[10px] font-extrabold pt-0.5 border-t border-dashed border-slate-300">
                      <span>TOTAL</span>
                      <span>52.65</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300 my-2" />

                  {/* Barcode representation */}
                  <div className="text-center pt-2 space-y-1 select-none">
                    <div className="w-full h-8 bg-slate-950 flex items-center justify-center">
                      {/* Generates striped block resembling barcode */}
                      <div className="w-full h-full bg-[linear-gradient(90deg,#000_1px,transparent_1px,#000_3px,transparent_4px,#000_2px,transparent_6px,#000_4px)]"></div>
                    </div>
                    <span className="text-[7px] tracking-widest text-slate-400 font-semibold"># ITEMS SOLD 7</span>
                  </div>
                </div>
              </div>

              {/* Quality & Metadata */}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-450 pt-2 border-t border-slate-100 select-none">
                <span>File: receipt_05126.jpg <span className="font-semibold text-slate-400">(1.2 MB)</span></span>
                <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
                  Image Quality:
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 inline-block"></span>
                  Good
                </span>
              </div>
            </div>

            {/* OCR & Processing Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">OCR & Processing Info</h3>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center justify-between">
                  <span className="text-slate-450">OCR Provider</span>
                  <span className="text-slate-700">AWS Textract</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-450">OCR Confidence (Overall)</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">93%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-450">Processing Status</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-450">Processed At</span>
                  <span className="text-slate-700">May 20, 2024 at 10:16 AM</span>
                </div>
              </div>
            </div>

            {/* Audit Log Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 pb-2 border-b border-slate-100 w-full select-none">
                Audit Log (Recent)
              </h3>

              {/* Timeline list */}
              <div className="relative space-y-3.5 pl-4 select-none flex-1">
                <div className="absolute left-1 top-2 bottom-2 w-px bg-slate-150" />
                
                {/* Event 1 */}
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-[15px] top-1 h-1.5 w-1.5 rounded-full bg-blue-500 border border-white"></span>
                  <div className="text-[11px] font-semibold leading-tight">
                    <span className="font-bold text-slate-800 block">Receipt processed successfully</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">May 20, 2024 10:16 AM by System</span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-[15px] top-1 h-1.5 w-1.5 rounded-full bg-blue-500 border border-white"></span>
                  <div className="text-[11px] font-semibold leading-tight">
                    <span className="font-bold text-slate-800 block">Product matching completed</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">May 20, 2024 10:16 AM by System</span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-[15px] top-1 h-1.5 w-1.5 rounded-full bg-blue-500 border border-white"></span>
                  <div className="text-[11px] font-semibold leading-tight">
                    <span className="font-bold text-slate-800 block">Receipt uploaded</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">May 20, 2024 10:15 AM by User</span>
                  </div>
                </div>
              </div>

              {/* View full log */}
              <div className="pt-2 border-t border-slate-100">
                <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] inline-flex items-center gap-1 transition select-none">
                  <span>View full audit log</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Column 2: Data Details & Line Items (ColSpan 6) */}
          <div className="lg:col-span-6 space-y-5 min-w-0">
            
            {/* Extracted Receipt Data Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-800 inline-flex items-center gap-1">
                  Extracted Receipt Data
                  <Info className="h-4 w-4 text-slate-400 cursor-help" />
                </span>
                
                {/* Edit Toggle Button */}
                <button
                  onClick={() => setIsEditingData(!isEditingData)}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition",
                    isEditingData
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
                  )}
                >
                  {isEditingData ? (
                    <>
                      <Save className="h-3.5 w-3.5" /> Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-3.5 w-3.5 text-slate-400" /> Edit Data
                    </>
                  )}
                </button>
              </div>

              {/* Data Form / Fields */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start text-xs font-semibold">
                
                {/* Left Fields */}
                <div className="flex-1 w-full grid grid-cols-[130px_1fr] gap-y-3.5 items-start">
                  
                  {/* Retailer */}
                  <span className="text-slate-700 font-bold">Retailer</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.retailer}
                      onChange={(e) => setExtractedData({ ...extractedData, retailer: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.retailer}</span>
                  )}

                  {/* Store */}
                  <span className="text-slate-700 font-bold">Store</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.store}
                      onChange={(e) => setExtractedData({ ...extractedData, store: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.store}</span>
                  )}

                  {/* Store Address */}
                  <span className="text-slate-700 font-bold pt-0.5">Store Address</span>
                  {isEditingData ? (
                    <textarea
                      value={extractedData.storeAddress}
                      onChange={(e) => setExtractedData({ ...extractedData, storeAddress: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5] w-full"
                      rows={2}
                    />
                  ) : (
                    <div className="text-slate-850 font-bold leading-tight">
                      <div>1100 N Congress Ave</div>
                      <div className="mt-0.5">Austin, TX 78701</div>
                    </div>
                  )}

                  {/* Cashier / Register */}
                  <span className="text-slate-700 font-bold">Cashier / Register</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.cashierRegister}
                      onChange={(e) => setExtractedData({ ...extractedData, cashierRegister: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.cashierRegister}</span>
                  )}

                  {/* Payment Method */}
                  <span className="text-slate-700 font-bold">Payment Method</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.paymentMethod}
                      onChange={(e) => setExtractedData({ ...extractedData, paymentMethod: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.paymentMethod}</span>
                  )}
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-px bg-slate-200 self-stretch my-0.5 shrink-0" />

                {/* Right Fields */}
                <div className="flex-1 w-full grid grid-cols-[120px_1fr] gap-y-3.5 items-start">
                  
                  {/* Purchase Date */}
                  <span className="text-slate-700 font-bold">Purchase Date</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.purchaseDate}
                      onChange={(e) => setExtractedData({ ...extractedData, purchaseDate: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.purchaseDate}</span>
                  )}

                  {/* Transaction ID */}
                  <span className="text-slate-700 font-bold">Transaction ID</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.transactionId}
                      onChange={(e) => setExtractedData({ ...extractedData, transactionId: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.transactionId}</span>
                  )}

                  {/* Total */}
                  <span className="text-slate-700 font-bold">Total</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.total}
                      onChange={(e) => setExtractedData({ ...extractedData, total: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.total}</span>
                  )}

                  {/* Tax */}
                  <span className="text-slate-700 font-bold">Tax</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.tax}
                      onChange={(e) => setExtractedData({ ...extractedData, tax: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.tax}</span>
                  )}

                  {/* Total Items */}
                  <span className="text-slate-700 font-bold">Total Items</span>
                  {isEditingData ? (
                    <input
                      type="text"
                      value={extractedData.totalItems}
                      onChange={(e) => setExtractedData({ ...extractedData, totalItems: e.target.value })}
                      className="border border-slate-250 rounded px-2 py-0.5 text-slate-800 font-bold bg-slate-50 outline-none focus:border-[#4F46E5]"
                    />
                  ) : (
                    <span className="text-slate-850 font-bold">{extractedData.totalItems}</span>
                  )}
                </div>

              </div>
            </div>

            {/* Line Items Table Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-slate-100 select-none">
                <span className="text-sm font-bold text-slate-800 inline-flex items-center gap-1">
                  Line Items ({lineItems.length})
                  <Info className="h-4 w-4 text-slate-400 cursor-help" />
                </span>
                
                {/* Confidence Threshold selector */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[11px] font-bold text-slate-400">Confidence Threshold</span>
                  <div className="relative">
                    <select 
                      value={confidenceThreshold}
                      onChange={(e) => setConfidenceThreshold(e.target.value)}
                      className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1 text-xs font-bold text-slate-700 outline-none cursor-pointer shadow-2xs hover:bg-slate-50 transition"
                    >
                      <option>70%</option>
                      <option>80%</option>
                      <option>90%</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-150 text-slate-450 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3 w-[5%] font-bold">#</th>
                      <th className="py-3 w-[22%] font-bold">Raw Item Text</th>
                      <th className="py-3 w-[25%] font-bold">Parsed Product Name</th>
                      <th className="py-3 w-[10%] font-bold">Qty</th>
                      <th className="py-3 w-[10%] font-bold">Price</th>
                      <th className="py-3 w-[22%] font-bold">Matched Product</th>
                      <th className="py-3 w-[15%] font-bold">Match Confidence</th>
                      <th className="py-3 pr-3 w-[6%] text-center font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-750">
                    {lineItems.map((item, index) => (
                      <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="py-3.5 px-3 text-slate-400 font-bold">{index + 1}.</td>
                        <td className="py-3.5 font-bold text-slate-700 text-xs">{item.rawText}</td>
                        <td className="py-3.5 text-slate-800 font-bold">{item.parsedName}</td>
                        <td className="py-3.5 text-slate-650">{item.qty}</td>
                        <td className="py-3.5 text-slate-900 font-bold">{item.price}</td>
                        <td className="py-3.5">
                          <div className="leading-tight">
                            <span className="text-slate-850 font-bold block">{item.matchedProduct}</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{item.category}</span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className={cn("text-[10px] font-extrabold px-2 py-0.5 rounded-md leading-none inline-block text-center min-w-[38px]", getConfidenceColor(item.confidence))}>
                            {item.confidence}%
                          </span>
                        </td>
                        <td className="py-3.5 pr-3 text-center">
                          <button className="h-7 w-7 rounded-lg border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center text-slate-400 hover:text-slate-600 bg-white">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Progress Legend footer */}
              <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-[10px] font-bold select-none text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
                  High (≥ 90%)
                </span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <span className="h-2 w-2 rounded-full bg-amber-500 inline-block"></span>
                  Medium (70% - 89%)
                </span>
                <span className="flex items-center gap-1.5 text-rose-500">
                  <span className="h-2 w-2 rounded-full bg-rose-500 inline-block"></span>
                  Low (&lt; 70%)
                </span>
              </div>
            </div>

            {/* Admin Notes Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 inline-flex items-center gap-1">
                Admin Notes
                <Info className="h-4 w-4 text-slate-400 cursor-help" />
              </h3>
              
              <div className="space-y-3">
                <textarea
                  rows={1}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value.slice(0, 1000))}
                  placeholder="Add internal notes about this receipt..."
                  className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#4F46E5] transition placeholder:text-slate-350 h-9 resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">{internalNote.length}/1000</span>
                  <button 
                    onClick={handleSaveNote}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-bold transition shadow-sm"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Render Saved Notes */}
              {notesList.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 block">Saved Notes ({notesList.length})</span>
                  <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                    {notesList.map((note, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 text-xs font-medium text-slate-700 relative">
                        <p className="break-words pr-4">{note}</p>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 block">Just now • Admin User</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Column 3: Stats Summary, Suggestions, Correction, Actions (ColSpan 3) */}
          <div className="lg:col-span-3 space-y-4 min-w-0">
            
            {/* Product Matches Summary Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 inline-flex items-center gap-1 pb-2 border-b border-slate-100 w-full select-none">
                Product Matches Summary
                <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
              </h3>

              {/* Circle Donut Representation */}
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="relative h-24 w-24 shrink-0 flex items-center justify-center select-none">
                  {/* SVG custom circle segments */}
                  <svg className="absolute inset-0 h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="9" />
                    {/* Matched: 71.4% = stroke-dasharray="179.3 251.3" */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="9" 
                      className="transition-all duration-1000 ease-out"
                      strokeDasharray={isChartMounted ? "179.3 251.3" : "0 251.3"} />
                    {/* Low Confidence: 14.3% = stroke-dasharray="35.9 251.3" offset from end of green */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="9" 
                      className="transition-all duration-1000 ease-out"
                      strokeDasharray={isChartMounted ? "35.9 251.3" : "0 251.3"} 
                      strokeDashoffset={isChartMounted ? "-179.3" : "-179.3"} />
                    {/* Unmatched: 14.3% = stroke-dasharray="35.9 251.3" offset from end of orange */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="9" 
                      className="transition-all duration-1000 ease-out"
                      strokeDasharray={isChartMounted ? "35.9 251.3" : "0 251.3"} 
                      strokeDashoffset={isChartMounted ? "-215.2" : "-215.2"} />
                  </svg>
                  <div className="text-center z-10 leading-tight">
                    <span className="text-lg font-black text-slate-900 block">7</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Items</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-1.5 text-[10px] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 inline-block"></span>
                    <span className="text-slate-500">Matched</span>
                    <span className="text-slate-800 ml-auto font-extrabold">5 (71%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 inline-block"></span>
                    <span className="text-slate-500">Low Confidence</span>
                    <span className="text-slate-800 ml-auto font-extrabold">1 (14%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 inline-block"></span>
                    <span className="text-slate-500">Unmatched</span>
                    <span className="text-slate-800 ml-auto font-extrabold">1 (14%)</span>
                  </div>
                </div>
              </div>

              {/* View Matching Details Button */}
              <button className="w-full py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition shadow-2xs select-none">
                View Matching Details
              </button>
            </div>

            {/* Savings Suggestions Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 inline-flex items-center gap-1 pb-2 border-b border-slate-100 w-full select-none">
                Savings Suggestions
                <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
              </h3>

              {/* Suggestions List */}
              <div className="space-y-4 font-semibold text-xs text-slate-700">
                
                {/* Product 1 */}
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-orange-600 text-lg">
                    🥫
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-slate-900 truncate block">Tide Original Liquid</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">You paid <strong className="text-slate-700 font-bold">$11.97</strong></span>
                    <span className="text-[11px] text-slate-500 block">Typical price: <strong className="text-slate-750 font-bold">$9.97</strong></span>
                    <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">Potential savings: $2.00 (17%)</span>
                  </div>
                  <button className="shrink-0 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded px-2.5 py-1 text-[10px] font-bold text-slate-650 transition select-none">
                    View Product
                  </button>
                </div>

                {/* Product 2 */}
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 text-lg">
                    🧻
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-slate-900 truncate block">Bounty Select-A-Size Paper Towels</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">You paid <strong className="text-slate-700 font-bold">$12.47</strong></span>
                    <span className="text-[11px] text-slate-500 block">Typical price: <strong className="text-slate-750 font-bold">$10.48</strong></span>
                    <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">Potential savings: $1.99 (16%)</span>
                  </div>
                  <button className="shrink-0 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded px-2.5 py-1 text-[10px] font-bold text-slate-650 transition select-none">
                    View Product
                  </button>
                </div>

              </div>

              {/* View all savings */}
              <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] inline-flex items-center gap-1 transition pt-1 select-none">
                <span>View all 3 savings suggestions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Receipt Action Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 pb-2 border-b border-slate-100 w-full select-none">
                Receipt Actions
              </h3>
              
              <div className="space-y-2 select-none">
                <button className="w-full text-center py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-xs font-bold text-white transition flex items-center justify-center gap-1.5 shadow-sm">
                  <CheckCircle className="h-4 w-4" /> Approve Receipt
                </button>
                <button className="w-full text-center py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition flex items-center justify-center gap-1.5 shadow-2xs">
                  <HelpCircle className="h-4 w-4 text-slate-450" /> Request More Information
                </button>
                <button className="w-full text-center py-2.5 bg-white hover:bg-rose-50/50 border border-rose-250 hover:border-rose-400 rounded-lg text-xs font-bold text-rose-600 transition flex items-center justify-center gap-1.5 shadow-2xs">
                  <XCircle className="h-4 w-4 text-rose-500" /> Mark Receipt as Failed
                </button>
              </div>
            </div>

            {/* Admin Correction Panel Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
              <div className="pb-2 border-b border-slate-100 select-none">
                <h3 className="text-xs font-bold text-slate-800 inline-flex items-center gap-1">
                  Admin Correction Panel
                  <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                </h3>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Make corrections to OCR data or product matches.</span>
              </div>

              {/* Action Rows */}
              <div className="space-y-2 select-none">
                <button className="w-full text-center py-2.5 rounded-lg border border-[#4F46E5]/20 bg-[#4F46E5]/5 hover:bg-[#4F46E5]/10 text-xs font-bold text-[#4F46E5] transition">
                  Correct OCR for All Items
                </button>
                <button className="w-full text-center py-2.5 rounded-lg border border-orange-200/40 bg-orange-50/50 hover:bg-orange-50 text-xs font-bold text-orange-700 transition">
                  Review Unmatched Items (1)
                </button>
                <button className="w-full text-center py-2.5 rounded-lg border border-blue-200/40 bg-blue-50/50 hover:bg-blue-50 text-xs font-bold text-blue-700 transition">
                  Add Missing Items
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
