"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Info,
  Shield,
  Star,
  Award,
  Plus,
  RotateCcw,
  Pencil,
  Trash2,
  FileText,
  TrendingUp,
  Cpu,
  ArrowLeftRight,
  ShieldCheck,
  Scale,
  GripVertical,
  Save,
  Tag,
} from "lucide-react";

interface WeightItem {
  id: string;
  name: string;
  weight: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  maxScore: number;
  accentClass: string;
}

interface ThresholdRule {
  id: string;
  verdict: "Buy" | "Wait" | "Avoid" | "Better Alternative";
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  condition: string;
}

interface OverrideRule {
  id: string;
  name: string;
  condition: string;
  overrideBy: string;
}

interface VersionHistoryItem {
  version: string;
  status: "Active" | "Archived";
  createdAt: string;
  createdBy: string;
  description: string;
}

export default function ScoringSettings() {
  // Category State
  const [selectedCategory, setSelectedCategory] = useState<string>("Electronics");

  // Version State
  const [selectedVersion, setSelectedVersion] = useState<string>("v2.4 (Current)");

  // Weight Editor State
  const [weights, setWeights] = useState<WeightItem[]>([
    {
      id: "value",
      name: "Value Score",
      weight: 25,
      description: "Overall value for money based on features and performance",
      icon: Shield,
      iconBg: "bg-[#EEF2FF]",
      iconColor: "text-[#4F46E5]",
      maxScore: 25,
      accentClass: "accent-[#4F46E5]",
    },
    {
      id: "quality",
      name: "Quality Score",
      weight: 25,
      description: "Build quality, reliability, and brand reputation",
      icon: ShieldCheck,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#15803D]",
      maxScore: 25,
      accentClass: "accent-[#4F46E5]",
    },
    {
      id: "trust",
      name: "Review Trust",
      weight: 20,
      description: "Trustworthiness and consistency of reviews",
      icon: Star,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#B45309]",
      maxScore: 20,
      accentClass: "accent-[#4F46E5]",
    },
    {
      id: "price",
      name: "Price Score",
      weight: 20,
      description: "Current price vs history and market benchmarks",
      icon: Tag,
      iconBg: "bg-[#E0F2FE]",
      iconColor: "text-[#0369A1]",
      maxScore: 20,
      accentClass: "accent-[#4F46E5]",
    },
    {
      id: "expert",
      name: "Expert Evidence",
      weight: 10,
      description: "Weight of expert reviews and professional sources",
      icon: Award,
      iconBg: "bg-[#FEE2E2]",
      iconColor: "text-[#B91C1C]",
      maxScore: 10,
      accentClass: "accent-[#4F46E5]",
    },
  ]);

  // Confidence Threshold State
  const [confidenceThresholds, setConfidenceThresholds] = useState<Record<string, number>>({
    buy: 70,
    wait: 60,
    avoid: 60,
    alt: 65,
  });

  // Threshold Rules State
  const [thresholdRules] = useState<ThresholdRule[]>([
    {
      id: "1",
      verdict: "Buy",
      badgeText: "≥ 80",
      badgeBg: "bg-[#DCFCE7]",
      badgeTextColor: "text-[#15803D]",
      condition: "Score 80 or above",
    },
    {
      id: "2",
      verdict: "Wait",
      badgeText: "60 - 79",
      badgeBg: "bg-[#FEF3C7]",
      badgeTextColor: "text-[#B45309]",
      condition: "Score 60 to 79 AND poor price score",
    },
    {
      id: "3",
      verdict: "Avoid",
      badgeText: "< 50",
      badgeBg: "bg-[#FEE2E2]",
      badgeTextColor: "text-[#B91C1C]",
      condition: "Score below 50 OR safety risk detected",
    },
    {
      id: "4",
      verdict: "Better Alternative",
      badgeText: "+ 8",
      badgeBg: "bg-[#E0F2FE]",
      badgeTextColor: "text-[#0369A1]",
      condition: "Alternative product score is 8 or more points higher",
    },
  ]);

  // Override Rules State
  const [overrideRules, setOverrideRules] = useState<OverrideRule[]>([
    {
      id: "1",
      name: "Safety Risk Override",
      condition: "Safety Risk = High",
      overrideBy: "AI Reviewer, Super Admin",
    },
    {
      id: "2",
      name: "Brand Ban Override",
      condition: "Brand in Blocked List",
      overrideBy: "Super Admin",
    },
    {
      id: "3",
      name: "Expert Disagreement",
      condition: "Expert Evidence Score > 80 & AI Score < 60",
      overrideBy: "AI Reviewer",
    },
  ]);

  // Version History State
  const versionHistory: VersionHistoryItem[] = [
    {
      version: "v2.4 (Current)",
      status: "Active",
      createdAt: "May 20, 2024 10:15 AM",
      createdBy: "Admin User",
      description: "Adjusted weights for Price Score and Review Trust",
    },
    {
      version: "v2.3",
      status: "Archived",
      createdAt: "May 10, 2024 03:22 PM",
      createdBy: "Admin User",
      description: "Updated verdict thresholds for Wait and Avoid",
    },
    {
      version: "v2.2",
      status: "Archived",
      createdAt: "Apr 28, 2024 11:05 AM",
      createdBy: "System",
      description: "Initial scoring model for Electronics",
    },
  ];

  // Dynamic calculations for Preview Panel
  const [totalWeight, setTotalWeight] = useState<number>(100);
  const [sampleScore, setSampleScore] = useState<number>(82);
  const [sampleBreakdown, setSampleBreakdown] = useState<Record<string, number>>({
    value: 23,
    quality: 22,
    trust: 16,
    price: 17,
    expert: 8,
  });

  // Re-calculate total weight and preview scores dynamically on slider changes
  useEffect(() => {
    const sum = weights.reduce((acc, curr) => acc + curr.weight, 0);
    setTotalWeight(sum);

    // Dynamic mock calculation for the preview product based on weights
    const baseScores: Record<string, number> = {
      value: 0.92, // 23 / 25
      quality: 0.88, // 22 / 25
      trust: 0.80, // 16 / 20
      price: 0.85, // 17 / 20
      expert: 0.80, // 8 / 10
    };

    let calculatedScore = 0;
    const newBreakdown: Record<string, number> = {};

    weights.forEach((w) => {
      // Calculate breakdown score proportionate to new weight limit
      const proportion = baseScores[w.id] || 0.85;
      const score = Math.round(w.weight * proportion);
      newBreakdown[w.id] = score;

      // Add to final cumulative score
      calculatedScore += score;
    });

    setSampleBreakdown(newBreakdown);
    
    // Confine score to standard range based on total weight
    const rawScore = sum > 0 ? Math.round((calculatedScore / sum) * 100) : 0;
    setSampleScore(rawScore);
  }, [weights]);

  const handleWeightChange = (id: string, newVal: number) => {
    setWeights((prev) =>
      prev.map((w) => (w.id === id ? { ...w, weight: newVal } : w))
    );
  };

  const handleThresholdChange = (key: string, newVal: number) => {
    setConfidenceThresholds((prev) => ({ ...prev, [key]: newVal }));
  };

  // Determine Verdict badge in Preview Panel dynamically
  const getPreviewVerdict = () => {
    if (sampleScore >= 80) return { text: "Buy", bg: "bg-[#DCFCE7] text-[#15803D]" };
    if (sampleScore >= 60) return { text: "Wait", bg: "bg-[#FEF3C7] text-[#B45309]" };
    return { text: "Avoid", bg: "bg-[#FEE2E2] text-[#B91C1C]" };
  };

  const previewVerdict = getPreviewVerdict();

  const getProgressBarColor = (id: string) => {
    return "bg-[#4F46E5]";
  };

  const getSliderGradient = (id: string, val: number) => {
    const hexColor = "#4F46E5";
    return `linear-gradient(to right, ${hexColor} 0%, ${hexColor} ${val}%, #E2E8F0 ${val}%, #E2E8F0 100%)`;
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-6">
        
        {/* ─── Page Header ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full max-w-full border-b border-slate-100 pb-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Scoring Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Configure AI scoring model weights, thresholds, and rules.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Styled Version Dropdown */}
            <div className="relative inline-flex items-center">
              <span className="absolute left-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 pointer-events-none select-none">
                Version:
              </span>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="appearance-none rounded-lg border border-slate-200 bg-white pl-[62px] pr-8 py-2 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
              >
                <option>v2.4 (Current)</option>
                <option>v2.3</option>
                <option>v2.2</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
              <ArrowLeftRight className="h-3.5 w-3.5 text-slate-500" />
              Compare Versions
            </button>
            
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#4338ca] shadow-xs">
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </button>
          </div>
        </div>

        {/* ─── Main Grid Layout (9 Columns Left / 3 Columns Right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full overflow-hidden">
          
          {/* ─── Left Column (9/12 cols) ─── */}
          <div className="col-span-12 lg:col-span-9 space-y-6 w-full min-w-0 overflow-hidden">
            
            {/* 1. Select Category & Info Banner in a single container */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Left Side: Select Category */}
              <div className="flex flex-col justify-center space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">1. Select Category</div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Category</label>
                  <div className="relative mt-1">
                    <Cpu className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4F46E5]" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 py-2.5 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 transition-colors cursor-pointer"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Beauty">Beauty & Skincare</option>
                      <option value="Home">Home Appliances</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 leading-normal">Scoring model is category-specific.</div>
              </div>

              {/* Right Side: Info Alert Banner */}
              <div className="rounded-lg border border-[#D1E2FF] bg-[#EEF5FF] p-4 flex items-start gap-3 self-start">
                <div className="p-1 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-0.5">
                  <Info className="h-4 w-4 text-[#4F46E5]" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-900 uppercase tracking-wide">Changes will create a new version</div>
                  <div className="text-[11px] leading-relaxed text-blue-700">
                    All changes are tracked and can be rolled back.
                  </div>
                </div>
              </div>

            </div>

            {/* 2 & 3: Score Weight Editor & Verdict Threshold Editor */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* 2. Score Weight Editor Table */}
              <section className="col-span-12 md:col-span-7 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">2. Score Weight Editor</h3>
                    <p className="text-xs text-slate-400 mt-1">Adjust the weight of each component in the final AI score.</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-150 text-slate-500 bg-slate-100 border border-slate-200/50 select-none">
                    Total: {totalWeight}%
                  </span>
                </div>

                <div className="overflow-x-auto select-none">
                  <table className="w-full min-w-[450px] text-xs text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 font-semibold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                        <th className="py-2 pb-3 font-semibold w-[32%]">Component</th>
                        <th className="py-2 pb-3 font-semibold w-[38%] text-center">Weight (%)</th>
                        <th className="py-2 pb-3 font-semibold w-[30%]">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {weights.map((w) => {
                        const IconComponent = w.icon;
                        return (
                          <tr key={w.id} className="hover:bg-slate-50/10 transition-colors">
                            <td className="py-3.5 pr-2">
                              <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg shrink-0 ${w.iconBg} ${w.iconColor}`}>
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-bold text-slate-800 truncate">{w.name}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-2">
                              <div className="flex items-center gap-3">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={w.weight}
                                  onChange={(e) => handleWeightChange(w.id, parseInt(e.target.value) || 0)}
                                  className={`flex-1 h-1 rounded-lg appearance-none cursor-pointer ${w.accentClass}`}
                                  style={{ background: getSliderGradient(w.id, w.weight) }}
                                />
                                <div className="relative w-12 shrink-0">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={w.weight}
                                    onChange={(e) => handleWeightChange(w.id, parseInt(e.target.value) || 0)}
                                    className="w-full text-center rounded-lg border border-slate-200 py-1 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 pl-2 text-[11px] text-slate-500 leading-normal">
                              {w.description}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. Verdict Threshold Editor Accent Rows */}
              <section className="col-span-12 md:col-span-5 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">3. Verdict Threshold Editor</h3>
                  <p className="text-xs text-slate-400 mt-1">Define score ranges and conditions for each verdict.</p>
                </div>

                <div className="space-y-3 select-none">
                  {thresholdRules.map((rule) => {
                    let bgColorClass = "bg-slate-50 border-slate-200";
                    let borderColorClass = "border-slate-200";
                    let badgeBg = "bg-slate-100";
                    let badgeTextColor = "text-slate-700";

                    if (rule.verdict === "Buy") {
                      bgColorClass = "bg-[#F0FDF4]/65";
                      borderColorClass = "border-emerald-100 hover:border-emerald-250";
                      badgeBg = "bg-[#DCFCE7]";
                      badgeTextColor = "text-[#15803D]";
                    } else if (rule.verdict === "Wait") {
                      bgColorClass = "bg-[#FFFBEB]/65";
                      borderColorClass = "border-amber-100 hover:border-amber-250";
                      badgeBg = "bg-[#FEF3C7]";
                      badgeTextColor = "text-[#B45309]";
                    } else if (rule.verdict === "Avoid") {
                      bgColorClass = "bg-[#FEF2F2]/65";
                      borderColorClass = "border-rose-100 hover:border-rose-250";
                      badgeBg = "bg-[#FEE2E2]";
                      badgeTextColor = "text-[#B91C1C]";
                    } else if (rule.verdict === "Better Alternative") {
                      bgColorClass = "bg-[#F0F9FF]/65";
                      borderColorClass = "border-blue-100 hover:border-blue-250";
                      badgeBg = "bg-[#E0F2FE]";
                      badgeTextColor = "text-[#0369A1]";
                    }

                    return (
                      <div
                        key={rule.id}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-xl p-3.5 gap-2.5 sm:gap-4 transition-all ${bgColorClass} ${borderColorClass}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <GripVertical className="h-4 w-4 text-slate-400 shrink-0 cursor-grab" />
                          <span className="text-xs font-bold text-slate-900 shrink-0">{rule.verdict}</span>
                          <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold shrink-0 ${badgeBg} ${badgeTextColor}`}>
                            {rule.badgeText}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-650 text-left sm:text-right leading-snug w-full sm:w-auto">
                          {rule.verdict === "Wait" ? (
                            <div className="flex flex-col items-start sm:items-end">
                              <span className="font-semibold text-slate-700">Score 60 to 79 AND poor price score</span>
                              <span className="text-[9.5px] font-mono text-slate-400 mt-0.5">Price Score &lt; 50</span>
                            </div>
                          ) : rule.verdict === "Avoid" ? (
                            <div className="flex flex-col items-start sm:items-end">
                              <span className="font-semibold text-slate-700">Score below 50 OR safety risk detected</span>
                              <span className="text-[9.5px] font-mono text-slate-400 mt-0.5">Safety Risk = High</span>
                            </div>
                          ) : (
                            <span className="font-semibold text-slate-655">{rule.condition}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-200 hover:border-indigo-400 hover:bg-[#EEF2FF]/30 text-xs font-semibold text-[#4F46E5] rounded-xl transition-all">
                  <Plus className="h-3.5 w-3.5" />
                  Add Custom Rule
                </button>
              </section>

            </div>

            {/* 4 & 5: Confidence Threshold Editor & Manual Override Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 4. Confidence Threshold Editor */}
              <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">4. Confidence Threshold Editor</h3>
                  <p className="text-xs text-slate-400 mt-1">Set minimum confidence required for each verdict to be shown.</p>
                </div>

                <div className="space-y-4 select-none">
                  {[
                    { key: "buy", label: "Minimum confidence for Buy" },
                    { key: "wait", label: "Minimum confidence for Wait" },
                    { key: "avoid", label: "Minimum confidence for Avoid" },
                    { key: "alt", label: "Minimum confidence for Better Alternative" },
                  ].map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                        <span className="text-slate-800">{field.label}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={confidenceThresholds[field.key]}
                          onChange={(e) => handleThresholdChange(field.key, parseInt(e.target.value) || 0)}
                          className="flex-1 h-1 rounded-lg appearance-none cursor-pointer accent-[#4F46E5]"
                          style={{
                            background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${confidenceThresholds[field.key]}%, #E2E8F0 ${confidenceThresholds[field.key]}%, #E2E8F0 100%)`
                          }}
                        />
                        <span className="w-10 text-right text-xs font-bold text-slate-700 select-none">
                          {confidenceThresholds[field.key]} %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Manual Override Rules */}
              <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">5. Manual Override Rules</h3>
                    <p className="text-xs text-slate-400 mt-1">Define conditions that allow manual overrides.</p>
                  </div>

                  <div className="overflow-x-auto select-none">
                    <table className="w-full min-w-[380px] text-xs text-left border-collapse">
                      <thead>
                        <tr className="text-slate-400 font-semibold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                          <th className="py-2.5 w-[35%]">Rule</th>
                          <th className="py-2.5 w-[35%]">Condition</th>
                          <th className="py-2.5 w-[20%]">Override By</th>
                          <th className="py-2.5 text-center w-[10%]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-slate-700">
                        {overrideRules.map((rule) => (
                          <tr key={rule.id} className="hover:bg-slate-50/10 transition-colors">
                            <td className="py-3 font-bold text-slate-800">{rule.name}</td>
                            <td className="py-3 pr-2">
                              <span className="font-mono text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/50">
                                {rule.condition}
                              </span>
                            </td>
                            <td className="py-3 text-slate-600 font-semibold">{rule.overrideBy}</td>
                            <td className="py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-650 transition-colors">
                                  <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-200 hover:border-indigo-400 hover:bg-[#EEF2FF]/30 text-xs font-semibold text-[#4F46E5] rounded-xl transition-all">
                  <Plus className="h-3.5 w-3.5" />
                  Add Rule
                </button>
              </section>

            </div>

          </div>

          {/* ─── Right Column (3/12 cols) ─── */}
          <aside className="col-span-12 lg:col-span-3 space-y-6 w-full min-w-0 overflow-hidden">
            
            {/* A. Preview Panel */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-5">
              
              {/* Panel Header */}
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Preview Panel</h3>
                <p className="text-xs text-slate-400 mt-1">See how scoring works with current settings.</p>
              </div>

              {/* Example Product Box */}
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs flex gap-3 items-start select-none">
                <img
                  src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&q=80"
                  alt="Earbuds example"
                  className="h-12 w-12 rounded-lg object-cover border border-slate-250 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Example Product</span>
                  <div className="text-xs font-bold text-slate-800 truncate leading-tight mt-0.5">
                    Wireless Noise Cancelling Earbuds Pro
                  </div>
                  <span className="inline-flex rounded px-1.5 py-0.5 text-[9px] font-bold bg-[#EFF6FF] text-[#1D4ED8] mt-1.5 border border-blue-100">
                    Category: {selectedCategory}
                  </span>
                </div>
              </div>

              {/* AI Score Box */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between select-none">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">AI Score</div>
                  <div className="flex items-baseline mt-1.5">
                    <span className="text-3xl font-extrabold text-emerald-600 leading-none">{sampleScore}</span>
                    <span className="text-xs font-bold text-slate-400 ml-1">/ 100</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-right">Verdict</div>
                  <span className={`inline-flex rounded-full px-3.5 py-1 text-xs font-bold mt-1.5 ${previewVerdict.bg}`}>
                    {previewVerdict.text}
                  </span>
                </div>
              </div>
            </div>

            {/* A.1.5 Score Breakdown Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide select-none border-b border-slate-100 pb-2">Score Breakdown</div>
              
              <div className="space-y-3.5">
                {weights.map((w) => {
                  const score = sampleBreakdown[w.id] || 0;
                  const pct = w.weight > 0 ? (score / w.weight) * 100 : 0;

                  return (
                    <div key={w.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-700 font-semibold select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-700">{w.name}</span>
                        </div>
                        <span className="text-slate-800">{score} / {w.weight}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* A.2 Confidence Score & Notice Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3 select-none">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Confidence Score</span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded bg-[#DCFCE7] text-[#15803D] px-1.5 py-0.5 text-[9px] font-bold">
                    High
                  </span>
                  <span className="font-extrabold text-slate-800">87%</span>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50/50 p-2.5 border border-blue-100/50 flex items-start gap-2 text-[10px] text-blue-700 leading-normal">
                <Info className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>This preview uses sample data. Live scores may vary.</span>
              </div>
            </div>

            {/* B. About Scoring Model Block */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider select-none">About Scoring Model</h4>
              
              <div className="space-y-3.5 select-none">
                {[
                  {
                    icon: Scale,
                    text: "Scores are calculated using a weighted model.",
                    color: "text-indigo-500",
                    bg: "bg-indigo-50",
                  },
                  {
                    icon: TrendingUp,
                    text: "Weights must total 100%.",
                    color: "text-emerald-500",
                    bg: "bg-emerald-50",
                  },
                  {
                    icon: FileText,
                    text: "Changes create a new version automatically.",
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                  },
                  {
                    icon: RotateCcw,
                    text: "Roll back anytime from version history.",
                    color: "text-amber-500",
                    bg: "bg-amber-50",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg shrink-0 ${item.bg} ${item.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs text-slate-600 leading-normal pt-0.5">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>

        {/* 6. Version History */}
        <section className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">6. Version History</h3>
            <p className="text-xs text-slate-400 mt-1">Track changes to scoring settings over time.</p>
          </div>

          {/* Version Table */}
          <div className="overflow-x-auto select-none">
            <table className="w-full min-w-[700px] text-xs text-left border-collapse">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 w-[15%]">Version</th>
                  <th className="py-2.5 text-center w-[12%] pr-8">Status</th>
                  <th className="py-2.5 w-[20%] pl-8">Created At</th>
                  <th className="py-2.5 w-[18%]">Created By</th>
                  <th className="py-2.5 w-[25%]">Description</th>
                  <th className="py-2.5 text-center w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {versionHistory.map((item) => (
                  <tr key={item.version} className="hover:bg-slate-50/10 transition-colors">
                    <td className="py-3 font-bold text-slate-800">{item.version}</td>
                    <td className="py-3 text-center pr-8">
                      <span className={`inline-flex items-center rounded px-2.5 py-0.5 text-[10px] font-bold ${
                        item.status === "Active" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-slate-100 text-slate-500"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 pl-8">{item.createdAt}</td>
                    <td className="py-3 text-slate-700 font-semibold">{item.createdBy}</td>
                    <td className="py-3 text-slate-600 leading-normal pr-4">{item.description}</td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="px-2.5 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-[11px]">
                          View
                        </button>
                        {item.status === "Active" ? (
                          <button className="px-2.5 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-[11px]">
                            Duplicate
                          </button>
                        ) : (
                          <button className="px-2.5 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-[11px]">
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Version History Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 select-none">
            <span>Showing 1 to 3 of 3 versions</span>
            <button className="font-semibold text-[#4F46E5] hover:text-[#4338ca] transition-colors hover:underline">
              View all versions
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

