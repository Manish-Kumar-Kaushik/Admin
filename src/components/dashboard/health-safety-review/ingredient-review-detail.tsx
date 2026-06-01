"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Trash2,
  Pencil,
  ArrowRight,
  Droplet,
  Wind,
  ShieldCheck,
  Zap,
  Activity,
  AlertOctagon,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Animated Score Ring (reusing from previous component) ──
function ScoreRing({ score, label, colorCls }: { score: number, label: string, colorCls: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const r = 30;
  const size = 80;
  const cx = size / 2;
  const circ = 2 * Math.PI * r;
  const fill = mounted ? (score / 100) * circ : 0;

  const color =
    score >= 80 ? "#10b981" : // emerald
    score >= 60 ? "#f59e0b" : // amber
    "#f43f5e";                // rose

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" style={{ position: "absolute" }}>
          {/* background track */}
          <circle cx={cx} cy={cx} r={r} stroke="#e2e8f0" strokeWidth="5" fill="none" />
          {/* animated fill */}
          <circle
            cx={cx} cy={cx} r={r}
            stroke={color}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${fill} ${circ}`}
            style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <span className="relative text-xl md:text-2xl font-bold text-slate-900">
          {score}
        </span>
      </div>
      <span className={`mt-2 text-xs md:text-sm font-bold ${colorCls}`}>{label}</span>
    </div>
  );
}

export default function IngredientReviewDetail() {
  return (
    <div className="flex-1 bg-slate-50 font-sans overflow-x-hidden w-full">
      <div className="w-full px-2 sm:px-4 md:px-6 pt-4 pb-2 flex flex-col gap-4">
        
        {/* Main Grid: Left content and Right Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* LEFT COLUMN (Fluid) */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Top Header */}
            <div className="flex flex-col gap-4 pb-2">
              <Link href="/dashboard/safety" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 w-fit">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to queue
              </Link>
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">Ingredient Review</h1>
                <span className="text-xs md:text-sm font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Review ID: HSR-2024-01567</span>
                <span className="text-xs md:text-sm font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Pending Review</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-500">
                <span>Review created: May 20, 2024 at 10:15 AM</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
                <span>Assigned to: Admin User</span>
              </div>
            </div>

            {/* Product Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 flex flex-col md:flex-row gap-4 md:gap-6 md:items-center justify-between shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 min-w-0">
                <img 
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80" 
                  alt="Product" 
                  className="w-20 h-20 md:w-28 md:h-28 rounded-xl border border-slate-200 object-cover shrink-0"
                />
                <div className="pt-1 md:pt-2">
                  <h2 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wide mb-1">Product Summary</h2>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 leading-tight">The Ordinary Niacinamide 10% + Zinc 1% Serum</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">ASIN: B07H7P7T9B <span className="mx-2">&bull;</span> Category: Beauty / Skincare</p>
                  <p className="text-xs md:text-sm text-slate-500">Brand: The Ordinary</p>
                  <Link href="#" className="inline-flex items-center text-xs md:text-sm font-semibold text-indigo-600 hover:text-indigo-700 mt-2">
                    View on site <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center pt-4 md:pt-0 md:px-6 border-t md:border-t-0 md:border-l border-slate-200 shrink-0">
                <span className="text-xs md:text-sm font-semibold text-slate-500 mb-2 text-center md:text-right">AI Health/Safety Score</span>
                <ScoreRing score={72} label="Medium Risk" colorCls="text-amber-600" />
                <span className="text-xs md:text-sm text-slate-500 mt-1">Confidence: 78%</span>
              </div>
            </div>

            {/* Ingredient Section (List + Analysis) */}
            <div className="flex flex-col xl:flex-row gap-4 items-stretch">
              
              {/* Ingredient List */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 w-full xl:w-[280px] shrink-0 shadow-sm flex flex-col">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 shrink-0">Ingredient List <span className="text-slate-400 font-normal">(10)</span></h3>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Aqua (Water)", risk: "Low Risk", color: "emerald" },
                    { name: "Niacinamide", risk: "Low Risk", color: "emerald" },
                    { name: "Zinc PCA", risk: "Low Risk", color: "emerald" },
                    { name: "Propylene Glycol", risk: "Medium Risk", color: "amber" },
                    { name: "Glycerin", risk: "Low Risk", color: "emerald" },
                    { name: "Fragrance", risk: "Medium Risk", color: "amber", active: true },
                    { name: "Phenoxyethanol", risk: "Low Risk", color: "emerald" },
                    { name: "Carbomer", risk: "Low Risk", color: "emerald" },
                    { name: "Sodium Hydroxide", risk: "Low Risk", color: "emerald" },
                    { name: "Citric Acid", risk: "Low Risk", color: "emerald" },
                  ].map((ing, i) => (
                    <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${ing.active ? "bg-indigo-50/50 -mx-1 md:-mx-2 px-2 md:px-4" : ""}`}>
                      <span className={`text-xs md:text-sm ${ing.active ? "font-bold text-indigo-900" : "font-medium text-slate-700"}`}>{ing.name}</span>
                      <span className={`text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full ${
                        ing.color === "emerald" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {ing.risk}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-auto pt-4 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold justify-start px-2 text-xs md:text-sm h-auto">
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 mr-2 shrink-0" /> View full ingredient details
                </Button>
              </div>

              {/* Ingredient Risk Analysis */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 flex-1 shadow-sm flex flex-col">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 shrink-0">Ingredient Risk Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-1">
                  
                  {/* Fragrance */}
                  <div className="border border-amber-200 rounded-xl p-4 flex flex-col h-full bg-white relative">
                    <div className="absolute inset-0 bg-amber-50/30 rounded-xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full">
                      <span className="text-xs text-slate-500 font-semibold mb-1">Ingredient:</span>
                      <h4 className="text-base font-bold text-slate-900 mb-2">Fragrance</h4>
                      <span className="inline-flex w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-4">Medium Risk</span>
                      
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Risk:</span>
                        <p className="text-sm text-slate-600 leading-relaxed">Possible irritation for sensitive skin</p>
                      </div>
                      <div className="mb-6 flex-1">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Evidence:</span>
                        <p className="text-sm text-slate-600 leading-relaxed">Ingredient database + review complaints</p>
                      </div>

                      <div className="mt-auto flex flex-col gap-2">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Admin action:</span>
                        <Button variant="outline" className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50 justify-center h-9">
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Accept
                        </Button>
                        <Button variant="outline" className="w-full border-indigo-500 text-indigo-700 hover:bg-indigo-50 justify-center h-9">
                          <Pencil className="w-4 h-4 mr-2" /> Edit Wording
                        </Button>
                        <Button variant="outline" className="w-full border-rose-500 text-rose-700 hover:bg-rose-50 justify-center h-9">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove Claim
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Propylene Glycol */}
                  <div className="border border-slate-200 rounded-xl p-4 flex flex-col h-full bg-white">
                    <div className="relative z-10 flex flex-col h-full">
                      <span className="text-xs text-slate-500 font-semibold mb-1">Ingredient:</span>
                      <h4 className="text-base font-bold text-slate-900 mb-2">Propylene Glycol</h4>
                      <span className="inline-flex w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-4">Medium Risk</span>
                      
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Risk:</span>
                        <p className="text-sm text-slate-600 leading-relaxed">May cause irritation in some users</p>
                      </div>
                      <div className="mb-6 flex-1">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Evidence:</span>
                        <p className="text-sm text-slate-600 leading-relaxed">Scientific studies + user reports</p>
                      </div>

                      <div className="mt-auto flex flex-col gap-2">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Admin action:</span>
                        <Button variant="outline" className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50 justify-center h-9">
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Accept
                        </Button>
                        <Button variant="outline" className="w-full border-indigo-500 text-indigo-700 hover:bg-indigo-50 justify-center h-9">
                          <Pencil className="w-4 h-4 mr-2" /> Edit Wording
                        </Button>
                        <Button variant="outline" className="w-full border-rose-500 text-rose-700 hover:bg-rose-50 justify-center h-9">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove Claim
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Phenoxyethanol */}
                  <div className="border border-slate-200 rounded-xl p-4 flex flex-col h-full bg-white">
                    <div className="relative z-10 flex flex-col h-full">
                      <span className="text-xs text-slate-500 font-semibold mb-1">Ingredient:</span>
                      <h4 className="text-base font-bold text-slate-900 mb-2">Phenoxyethanol</h4>
                      <span className="inline-flex w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">Low Risk</span>
                      
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Risk:</span>
                        <p className="text-sm text-slate-600 leading-relaxed">Low risk preservative at approved levels</p>
                      </div>
                      <div className="mb-6 flex-1">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Evidence:</span>
                        <p className="text-sm text-slate-600 leading-relaxed">Safety assessment + regulatory data</p>
                      </div>

                      <div className="mt-auto flex flex-col gap-2">
                        <span className="text-xs font-semibold text-slate-900 block mb-1">Admin action:</span>
                        <Button variant="outline" className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50 justify-center h-9">
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Accept
                        </Button>
                        <Button variant="outline" className="w-full border-indigo-500 text-indigo-700 hover:bg-indigo-50 justify-center h-9">
                          <Pencil className="w-4 h-4 mr-2" /> Edit Wording
                        </Button>
                        <Button variant="outline" className="w-full border-rose-500 text-rose-700 hover:bg-rose-50 justify-center h-9">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove Claim
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>
                <Button variant="ghost" className="mt-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold px-2">
                  View full ingredient risks <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

            </div>

            {/* Bottom Row: Source Evidence + Disclaimer Preview */}
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Source Evidence */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 flex-1 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4">Source Evidence</h3>
                <div className="flex flex-col gap-3 md:gap-4">
                  {[
                    { label: "Ingredient Database (EWG, CIR, COSMOS)", count: "12 sources" },
                    { label: "Clinical Studies", count: "5 sources" },
                    { label: "User Review Complaints", count: "28 sources" },
                    { label: "Regulatory & Safety Assessments", count: "7 sources" },
                  ].map((src, i) => (
                    <div key={i} className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                      <div className="flex items-start sm:items-center gap-2 min-w-0">
                        <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 shrink-0 mt-0.5 sm:mt-0" />
                        <span className="text-xs md:text-sm font-medium text-slate-700 break-words">{src.label}</span>
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 md:px-2 py-0.5 rounded shrink-0">{src.count}</span>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="mt-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold px-2">
                  View all sources & documents <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Disclaimer Preview */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 flex-1 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4">Disclaimer Preview</h3>
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 md:p-4 mb-4">
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                    This information is for educational purposes only and not intended as medical advice. Always patch test new skincare products and discontinue use if irritation occurs. Consult a dermatologist if you have concerns.
                  </p>
                </div>
                <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-6">Display location: Product page (Health & Safety section)</p>
                <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold px-2 text-xs md:text-sm h-auto py-1">
                  Edit disclaimer text <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                </Button>
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR (Fixed 400px on lg+) */}
          <div className="w-full lg:w-[400px] flex flex-col gap-4 shrink-0">
            
            {/* Skin Type Suitability */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Skin Type Suitability</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { type: "Dry", icon: Droplet, iconColor: "text-blue-500", label: "Good", color: "emerald" },
                  { type: "Normal", icon: Activity, iconColor: "text-indigo-500", label: "Good", color: "emerald" },
                  { type: "Oily", icon: Droplet, iconColor: "text-emerald-500", label: "Excellent", color: "emerald" },
                  { type: "Sensitive", icon: Zap, iconColor: "text-amber-500", label: "Use with caution", color: "amber" },
                  { type: "Acne-Prone", icon: AlertOctagon, iconColor: "text-rose-500", label: "Good", color: "emerald" },
                ].map((skin, i) => {
                  const Icon = skin.icon;
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                          <Icon className={`w-3.5 h-3.5 ${skin.iconColor}`} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{skin.type}</span>
                      </div>
                      <span className={`text-xs font-bold ${skin.color === "emerald" ? "text-emerald-600" : "text-amber-600"}`}>
                        {skin.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Allergen Flags */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Allergen Flags</h3>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between p-3 gap-2 rounded-lg border border-amber-200 bg-amber-50/30">
                  <div className="flex items-center gap-2 min-w-0">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800 truncate">Fragrance (Parfum)</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 shrink-0">Potential Allergen</span>
                </div>
                <div className="flex items-center gap-2 p-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-600">None of the 26 EU Allergens Detected</span>
                </div>
              </div>
            </div>

            {/* AI Claim Preview */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 font-serif font-bold text-lg leading-none">"</div>
                <h3 className="text-lg font-bold text-slate-900">AI Claim Preview</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                "This product helps control excess oil and the appearance of pores with <span className="font-bold text-slate-900">10% Niacinamide</span> and <span className="font-bold text-slate-900">Zinc PCA</span>."
              </p>
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold px-2 h-auto py-1">
                View full claim analysis <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            {/* Admin Decision */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Admin Decision</h3>
              <p className="text-sm text-slate-500 mb-6">Select your decision for this claim and ingredient analysis.</p>

              <div className="flex flex-col gap-3 mb-6">
                <button className="flex flex-col items-start p-3 rounded-lg border border-emerald-500 hover:bg-emerald-50 text-left transition-colors group">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4" /> Approve Claim
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-emerald-700/70 transition-colors">Claim is accurate, safe, and supported by evidence.</span>
                </button>
                <button className="flex flex-col items-start p-3 rounded-lg border border-blue-500 hover:bg-blue-50 text-left transition-colors group">
                  <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" /> Approve with Disclaimer
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-blue-700/70 transition-colors">Claim is acceptable with additional disclaimer.</span>
                </button>
                <button className="flex flex-col items-start p-3 rounded-lg border border-rose-500 hover:bg-rose-50 text-left transition-colors group">
                  <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" /> Reject Claim
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-rose-700/70 transition-colors">Claim is not supported or may be misleading.</span>
                </button>
                <button className="flex flex-col items-start p-3 rounded-lg border border-violet-500 hover:bg-violet-50 text-left transition-colors group">
                  <div className="flex items-center gap-2 text-violet-700 font-bold mb-1">
                    <HelpCircle className="w-4 h-4" /> Escalate
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-violet-700/70 transition-colors">Requires expert review or legal team evaluation.</span>
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2">Internal Notes <span className="text-slate-400 font-normal">(optional)</span></label>
                <textarea 
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px] resize-none"
                  placeholder="Add notes about your decision..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1 font-semibold border-slate-200">
                  Save as Draft
                </Button>
                <Button className="flex-[1.5] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  Submit Decision <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center mt-2 md:-mt-4 pb-2">
          <p className="text-[10px] md:text-xs text-slate-400">All times in Eastern Time (ET)</p>
        </div>

      </div>
    </div>
  );
}
