"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Filter,
  Download,
  RefreshCw,
  ShieldAlert,
  AlertTriangle,
  Activity,
  Leaf,
  Info,
  Shield,
  Search,
  ChevronDown,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
} from "lucide-react";

// ── TYPES ──
type RiskLevel = "High Risk" | "Medium Risk" | "Low Risk" | "Medical Claim" | "Allergen Claim" | "Supplement Disclaimer Needed";
type StatusType = "Pending Review" | "Approved" | "Rejected";

interface TableRow {
  id: string;
  product: string;
  asin: string;
  thumb: string;
  category: string;
  healthScore: number;
  healthLabel: string;
  claimType: string;
  riskLevel: RiskLevel;
  confidence: number;
  sourceCount: number;
  status: StatusType;
}

// ── TABS ──
const tabs = [
  { label: "Pending Review", count: 48 },
  { label: "Beauty", count: 26 },
  { label: "Food", count: 9 },
  { label: "Supplements", count: 8 },
  { label: "Sensitive Claims", count: 12 },
  { label: "Approved", count: 132 },
  { label: "Rejected", count: 37 },
];

// ── KPI DATA ──
const kpiData = [
  { label: "Pending Review", value: 48, trend: "+12 from yesterday", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "High Risk", value: 8, trend: "+3 from yesterday", icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Medium Risk", value: 17, trend: "+4 from yesterday", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Medical Claims", value: 6, trend: "+2 from yesterday", icon: Activity, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Allergen Claims", value: 5, trend: "+1 from yesterday", icon: Leaf, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Disclaimer Needed", value: 11, trend: "+2 from yesterday", icon: Info, color: "text-blue-500", bg: "bg-blue-50" },
];

// ── TABLE DATA ──
const tableData: TableRow[] = [
  { id: "1", product: "The Ordinary Niacinamide 10% + Zinc 1% Serum", asin: "B07H7PT9B", thumb: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=64&h=64&fit=crop", category: "Beauty / Skincare", healthScore: 72, healthLabel: "Medium", claimType: "Ingredient Concern", riskLevel: "Medium Risk", confidence: 76, sourceCount: 14, status: "Pending Review" },
  { id: "2", product: "CeraVe Moisturizing Cream", asin: "B07D6X6X18", thumb: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=64&h=64&fit=crop", category: "Beauty / Skincare", healthScore: 88, healthLabel: "Low", claimType: "General Safety", riskLevel: "Low Risk", confidence: 92, sourceCount: 23, status: "Pending Review" },
  { id: "3", product: "La Roche-Posay Anthelios SPF 60 Sunscreen", asin: "B00108S5BC", thumb: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=64&h=64&fit=crop", category: "Beauty / Skincare", healthScore: 65, healthLabel: "Medium", claimType: "Medical Claim", riskLevel: "Medical Claim", confidence: 65, sourceCount: 18, status: "Pending Review" },
  { id: "4", product: "Nature Made Vitamin D3 2000 IU (100 Softgels)", asin: "B000FQQH3G", thumb: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=64&h=64&fit=crop", category: "Supplements", healthScore: 60, healthLabel: "Medium", claimType: "Supplement Disclaimer Needed", riskLevel: "Supplement Disclaimer Needed", confidence: 70, sourceCount: 12, status: "Pending Review" },
  { id: "5", product: "Orgain Organic Plant Based Protein Powder", asin: "B01N1UX2E7", thumb: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=64&h=64&fit=crop", category: "Food / Beverage", healthScore: 75, healthLabel: "Medium", claimType: "Allergen Claim", riskLevel: "Allergen Claim", confidence: 80, sourceCount: 16, status: "Pending Review" },
  { id: "6", product: "Garnier Nutrisse Hair Color (5.0 Medium Brown)", asin: "B0009X68V8", thumb: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=64&h=64&fit=crop", category: "Beauty / Hair Care", healthScore: 45, healthLabel: "Low", claimType: "Ingredient Concern", riskLevel: "High Risk", confidence: 55, sourceCount: 9, status: "Pending Review" },
  { id: "7", product: "RXBAR Chocolate Sea Salt Protein Bar", asin: "B01LZX003U", thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=64&h=64&fit=crop", category: "Food / Snack", healthScore: 82, healthLabel: "Low", claimType: "General Safety", riskLevel: "Low Risk", confidence: 90, sourceCount: 11, status: "Pending Review" },
  { id: "8", product: "Turmeric Curcumin with BioPerine 1500mg", asin: "B07Q7XKNB5", thumb: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=64&h=64&fit=crop", category: "Supplements", healthScore: 40, healthLabel: "Low", claimType: "Medical Claim", riskLevel: "Medical Claim", confidence: 50, sourceCount: 7, status: "Pending Review" },
];

// ── HELPERS ──
const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-600 border-emerald-500";
  if (score >= 60) return "text-amber-500 border-amber-400";
  return "text-rose-600 border-rose-400";
};

const getHealthLabelColor = (label: string) => {
  if (label === "Low") return "text-emerald-600";
  if (label === "Medium") return "text-amber-500";
  return "text-rose-600";
};

const getClaimBadge = (claim: string) => {
  const base = "inline-flex px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap";
  if (claim === "Ingredient Concern") return `${base} bg-orange-50 text-orange-700`;
  if (claim === "General Safety") return `${base} bg-slate-100 text-slate-600`;
  if (claim === "Medical Claim") return `${base} bg-violet-50 text-violet-700`;
  if (claim === "Supplement Disclaimer Needed") return `${base} bg-blue-50 text-blue-700`;
  if (claim === "Allergen Claim") return `${base} bg-amber-50 text-amber-700`;
  return `${base} bg-slate-100 text-slate-600`;
};

const getRiskBadge = (risk: RiskLevel) => {
  const base = "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap";
  if (risk === "High Risk") return { cls: `${base} bg-rose-50 text-rose-700`, icon: "🔺" };
  if (risk === "Medium Risk") return { cls: `${base} bg-amber-50 text-amber-700`, icon: "⚠️" };
  if (risk === "Low Risk") return { cls: `${base} bg-emerald-50 text-emerald-700`, icon: "✅" };
  if (risk === "Medical Claim") return { cls: `${base} bg-violet-50 text-violet-700`, icon: "🔵" };
  if (risk === "Allergen Claim") return { cls: `${base} bg-amber-50 text-amber-700`, icon: "⚠️" };
  if (risk === "Supplement Disclaimer Needed") return { cls: `${base} bg-blue-50 text-blue-700`, icon: "🔵" };
  return { cls: `${base} bg-slate-100 text-slate-600`, icon: "" };
};

const getConfidenceRing = (score: number) => {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#f43f5e";
};

// ── Animated Score Ring ──
function ScoreRing({ score }: { score: number }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const r = 18;
  const size = 48;
  const cx = size / 2;
  const circ = 2 * Math.PI * r;
  const fill = mounted ? (score / 100) * circ : 0;

  const color =
    score >= 80 ? "#10b981" : // emerald
    score >= 60 ? "#f59e0b" : // amber
    "#f43f5e";                // rose

  const textColor =
    score >= 80 ? "#059669" :
    score >= 60 ? "#d97706" :
    "#e11d48";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ position: "absolute" }}>
        {/* background track */}
        <circle cx={cx} cy={cx} r={r} stroke="#e2e8f0" strokeWidth="3.5" fill="none" />
        {/* animated fill */}
        <circle
          cx={cx} cy={cx} r={r}
          stroke={color}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`}
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <span className="relative text-[11px] font-extrabold" style={{ color: textColor }}>
        {score}
      </span>
    </div>
  );
}

// Circular progress SVG (for Confidence column)
function CircleProgress({ value }: { value: number }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const r = 16;
  const circ = 2 * Math.PI * r;
  const fill = mounted ? (value / 100) * circ : 0;
  const color = getConfidenceRing(value);
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg width="40" height="40" className="-rotate-90" style={{ position: "absolute" }}>
        <circle cx="20" cy="20" r={r} stroke="#e2e8f0" strokeWidth="3" fill="none" />
        <circle cx="20" cy="20" r={r} stroke={color} strokeWidth="3" fill="none"
          strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`}
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <span className="relative text-[10px] font-bold text-slate-900">{value}%</span>
    </div>
  );
}

export default function SafetyQueue() {
  const [activeTab, setActiveTab] = useState("Pending Review");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900">
      <div className="w-full px-4 md:px-6 py-5 flex flex-col gap-5">

        {/* ── PAGE HEADER ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {/* Breadcrumb – hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-slate-900">Health &amp; Safety Review</span>
            </div>
            <h1 className="text-xl font-bold text-slate-950">Health &amp; Safety Review Queue</h1>
            <p className="text-xs text-slate-500 mt-0.5">Review sensitive product claims, ingredients, and health/safety signals before publishing.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="border-b border-slate-200 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-0 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.label
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.label ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── KPI METRICS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpiData.map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-2 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium truncate">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-full ${kpi.bg} flex items-center justify-center shrink-0`}>
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-950">{kpi.value}</div>
              <div className="text-[10px] text-emerald-600 font-medium">↑ {kpi.trend}</div>
            </div>
          ))}
        </div>

        {/* ── MAIN TABLE CARD ── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">

          {/* Filter Bar */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex flex-wrap items-end gap-3">
              {/* Search */}
              <div className="flex-[2] min-w-[180px]">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products, claims, ingredients..."
                    className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>

              {[
                { label: "Category", text: "All Categories" },
                { label: "Risk Level", text: "All Risks" },
                { label: "Claim Type", text: "All Claims" },
                { label: "Status", text: "All Status" },
                { label: "Source Count", text: "Any" },
              ].map((f) => (
                <div key={f.label} className="flex-1 min-w-[110px]">
                  <button className="w-full flex items-center justify-between px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <span className="truncate">{f.text}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                  </button>
                </div>
              ))}

              <div className="flex-none">
                <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors">
                  <Filter className="w-3.5 h-3.5" /> Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: "1000px" }}>
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-3 w-8">
                    <Square className="w-4 h-4 text-slate-400" />
                  </th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Product</th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Category</th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">
                    Health/Safety Score
                  </th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Claim Type</th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Risk Level</th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Confidence</th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Source Count</th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-[10px] uppercase font-semibold text-slate-500 whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row) => {
                  const risk = getRiskBadge(row.riskLevel);
                  return (
                    <tr key={row.id} className={`hover:bg-slate-50/60 transition-colors ${selectedRows.has(row.id) ? "bg-indigo-50/30" : ""}`}>
                      {/* Checkbox */}
                      <td className="px-4 py-3">
                        <button onClick={() => toggleRow(row.id)}>
                          {selectedRows.has(row.id)
                            ? <CheckSquare className="w-4 h-4 text-indigo-600" />
                            : <Square className="w-4 h-4 text-slate-300" />
                          }
                        </button>
                      </td>

                      {/* Product */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3" style={{ minWidth: "200px", maxWidth: "260px" }}>
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                            <img src={row.thumb} alt={row.product} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">{row.product}</span>
                            <span className="text-[10px] text-slate-400 font-mono mt-0.5">ASIN: {row.asin}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-600 whitespace-nowrap">{row.category}</span>
                      </td>

                      {/* Health Score */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ScoreRing score={row.healthScore} />
                          <span className={`text-xs font-semibold ${getHealthLabelColor(row.healthLabel)}`}>
                            {row.healthLabel}
                          </span>
                        </div>
                      </td>

                      {/* Claim Type */}
                      <td className="px-4 py-3">
                        <span className={getClaimBadge(row.claimType)}>{row.claimType}</span>
                      </td>

                      {/* Risk Level */}
                      <td className="px-4 py-3">
                        <span className={risk.cls}>
                          <span>{risk.icon}</span> {row.riskLevel}
                        </span>
                      </td>

                      {/* Confidence – circular ring */}
                      <td className="px-4 py-3">
                        <CircleProgress value={row.confidence} />
                      </td>

                      {/* Source Count */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center">
                            <Shield className="w-2.5 h-2.5 text-slate-400" />
                          </div>
                          <span className="text-xs font-medium text-slate-700">{row.sourceCount}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 whitespace-nowrap">
                          {row.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            href={`/dashboard/safety/${row.id}`}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700 transition-colors whitespace-nowrap"
                          >
                            Review
                          </Link>
                          <button className="p-1 text-slate-400 hover:text-slate-700 transition-colors rounded">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── PAGINATION FOOTER ── */}
          <div className="px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>Showing 1 to {tableData.length} of 48 results</span>
            <div className="flex items-center gap-3">
              <button className="border border-slate-200 rounded px-2 py-1 text-slate-700 flex items-center gap-1">
                10 per page <ChevronDown className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-0.5">
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${n === 1 ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {n}
                  </button>
                ))}
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM INFO BAR ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-blue-500" />
            <span>This queue includes sensitive claims and ingredients that may require compliance, disclaimers, or human review before publication.</span>
          </div>
          <button className="flex items-center gap-1 text-indigo-600 font-semibold whitespace-nowrap hover:underline shrink-0">
            Learn more about our health &amp; safety policy
            <Eye className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
