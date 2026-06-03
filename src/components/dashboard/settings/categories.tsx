"use client";

import React, { useState } from "react";
import {
  Folder,
  CheckCircle2,
  Database,
  AlertTriangle,
  Upload,
  Download,
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  X,
  Laptop,
  Home,
  Sparkles,
  Heart,
  Compass,
  Car,
  Gamepad2,
  BookOpen,
  Briefcase,
  Layers,
  Pencil,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// ─── Types & Mock Data ───────────────────────────────────────────────────────

interface CategoryItem {
  id: string;
  name: string;
  subCount: number;
  parent: string;
  products: number;
  mappedPct: number;
  status: "Active" | "Inactive";
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  description: string;
  slug: string;
}

const initialCategories: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Electronics",
    subCount: 4,
    parent: "—",
    products: 128432,
    mappedPct: 98.5,
    status: "Active",
    icon: Laptop,
    iconColor: "text-indigo-650",
    iconBg: "bg-indigo-50 border-indigo-100",
    description: "Electronic devices and gadgets including computers, phones, audio, video, and accessories.",
    slug: "electronics",
  },
  {
    id: "cat-2",
    name: "Home & Kitchen",
    subCount: 6,
    parent: "—",
    products: 94231,
    mappedPct: 97.1,
    status: "Active",
    icon: Home,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-100",
    description: "Furniture, kitchen appliances, cookware, and home decor items.",
    slug: "home-kitchen",
  },
  {
    id: "cat-3",
    name: "Beauty & Personal Care",
    subCount: 4,
    parent: "—",
    products: 42815,
    mappedPct: 96.2,
    status: "Active",
    icon: Sparkles,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50 border-pink-100",
    description: "Cosmetics, skincare, hair care, and grooming essentials.",
    slug: "beauty-personal-care",
  },
  {
    id: "cat-4",
    name: "Health & Wellness",
    subCount: 5,
    parent: "—",
    products: 38746,
    mappedPct: 93.6,
    status: "Active",
    icon: Heart,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
    description: "Supplements, fitness equipment, personal health trackers, and vitamins.",
    slug: "health-wellness",
  },
  {
    id: "cat-5",
    name: "Sports & Outdoors",
    subCount: 6,
    parent: "—",
    products: 31892,
    mappedPct: 92.4,
    status: "Active",
    icon: Compass,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-100",
    description: "Athletic clothing, camping gear, outdoor equipment, and fitness accessories.",
    slug: "sports-outdoors",
  },
  {
    id: "cat-6",
    name: "Automotive",
    subCount: 4,
    parent: "—",
    products: 21445,
    mappedPct: 90.7,
    status: "Active",
    icon: Car,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50 border-sky-100",
    description: "Car parts, maintenance accessories, electronics, and vehicle tools.",
    slug: "automotive",
  },
  {
    id: "cat-7",
    name: "Toys & Games",
    subCount: 5,
    parent: "—",
    products: 18233,
    mappedPct: 91.2,
    status: "Active",
    icon: Gamepad2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-100",
    description: "Board games, kids toys, video game consoles, and action figures.",
    slug: "toys-games",
  },
  {
    id: "cat-8",
    name: "Books & Media",
    subCount: 3,
    parent: "—",
    products: 15672,
    mappedPct: 89.3,
    status: "Inactive",
    icon: BookOpen,
    iconColor: "text-blue-600",
    iconBg: "bg-slate-50 border-slate-200",
    description: "Printed books, e-books, audiobooks, physical music, and movies.",
    slug: "books-media",
  },
  {
    id: "cat-9",
    name: "Pet Supplies",
    subCount: 4,
    parent: "—",
    products: 14005,
    mappedPct: 93.8,
    status: "Active",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-100",
    description: "Pet food, toys, grooming products, cages, and health supplies.",
    slug: "pet-supplies",
  },
  {
    id: "cat-10",
    name: "Office Products",
    subCount: 3,
    parent: "—",
    products: 10845,
    mappedPct: 88.9,
    status: "Inactive",
    icon: Briefcase,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-50 border-slate-200",
    description: "Stationery, office chairs, desks, printers, and paper supplies.",
    slug: "office-products",
  },
];

export default function Categories() {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [selectedId, setSelectedId] = useState<string>("cat-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const selectedCategory = categories.find((c) => c.id === selectedId) || categories[0];

  // Form Fields Edit State
  const [editName, setEditName] = useState(selectedCategory.name);
  const [editSlug, setEditSlug] = useState(selectedCategory.slug);
  const [editDesc, setEditDesc] = useState(selectedCategory.description);
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">(selectedCategory.status);

  // Sync edit fields when selected category changes
  React.useEffect(() => {
    if (selectedCategory) {
      setEditName(selectedCategory.name);
      setEditSlug(selectedCategory.slug);
      setEditDesc(selectedCategory.description);
      setEditStatus(selectedCategory.status);
    }
  }, [selectedId]);

  const handleSave = () => {
    setCategories(
      categories.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              name: editName,
              slug: editSlug,
              description: editDesc,
              status: editStatus,
            }
          : c
      )
    );
    alert("Category details updated successfully!");
  };

  const filteredCategories = categories.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden font-sans text-slate-800">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-6">



        {/* ─── Page Title & Action Buttons ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full select-none">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Categories
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage product categories used across the platform.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button className="inline-flex justify-center items-center gap-1.5 h-9 px-4 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors whitespace-nowrap">
              <Upload className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              Import Categories
            </button>
            <button className="inline-flex justify-center items-center gap-1.5 h-9 px-4 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors whitespace-nowrap">
              <Download className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              Export
            </button>
            <button className="inline-flex justify-center items-center gap-1.5 h-9 px-4 text-sm font-semibold text-white bg-[#4F46E5] rounded-lg hover:bg-[#4F46E5]/90 shadow-sm transition-colors whitespace-nowrap">
              <Plus className="h-3.5 w-3.5 shrink-0" />
              Add Category
            </button>
          </div>
        </div>

        {/* ─── Main Grid Layout ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-10 w-full max-w-full items-start">
          
          {/* Left Table Panel - 70% width */}
          <div className="lg:col-span-7 flex flex-col gap-4 min-w-0">
            
            {/* ─── Metrics Stats Cards ─── */}
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full select-none">
              {[
                { title: "Total Categories", val: "128", desc: "Active categories", icon: Layers, color: "text-[#6366F1] bg-indigo-50 border-indigo-100" },
                { title: "Active Categories", val: "112", desc: "87.5% of all categories", icon: CheckCircle2, color: "text-[#10B981] bg-emerald-50 border-emerald-100" },
                { title: "Products Mapped", val: "542,318", desc: "Across all categories", icon: Database, color: "text-[#3B82F6] bg-blue-50 border-blue-100" },
                { title: "Unmapped Products", val: "12,845", desc: "Need category mapping", icon: AlertTriangle, color: "text-[#F59E0B] bg-amber-50 border-amber-100" },
              ].map((m) => (
                <div key={m.title} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center border shrink-0 ${m.color}`}>
                    <m.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-500 block leading-none truncate">{m.title}</span>
                    <span className="text-base font-bold text-slate-950 block leading-tight mt-1">{m.val}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5 leading-none truncate">{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Search & Filters Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
              
              {/* Search categories bar */}
              <div className="relative flex-1 min-w-0 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>

              {/* Filter selects */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 select-none">
                {/* Status filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-9 min-w-[95px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer"
                  >
                    <option value="All">Status: All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                {/* Parent Category Filter */}
                <div className="relative">
                  <select className="h-9 min-w-[125px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                    <option>Parent Category: All</option>
                    <option>Top Level</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                {/* Products mapped filter */}
                <div className="relative">
                  <select className="h-9 min-w-[100px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                    <option>Products: All</option>
                    <option>&gt; 50k</option>
                    <option>&gt; 10k</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                {/* More Filters button */}
                <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                  Filters
                </button>

                {/* Clear all */}
                <button
                  onClick={() => { setSearchQuery(""); setStatusFilter("All"); }}
                  className="h-9 px-2 text-sm font-semibold text-[#4F46E5] hover:text-[#4F46E5]/85 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Table Card */}
            <Card className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col space-y-4">

              {/* Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 select-none">
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 w-10 text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 h-3.5 w-3.5 cursor-pointer" />
                      </th>
                      <th className="py-3 px-4 font-semibold text-slate-500 text-xs">Category</th>
                      <th className="py-3 px-4 font-semibold text-slate-500 text-xs">Parent Category</th>
                      <th className="py-3 px-4 font-semibold text-slate-500 text-xs">Products</th>
                      <th className="py-3 px-4 font-semibold text-slate-500 text-xs">Mapped %</th>
                      <th className="py-3 px-4 font-semibold text-slate-500 text-xs">Status</th>
                      <th className="py-3 px-4 font-semibold text-slate-500 text-xs text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCategories.map((c) => {
                      const IconComponent = c.icon;
                      const isSelected = c.id === selectedId;
                      return (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedId(c.id)}
                          className={`cursor-pointer transition-colors group ${
                            isSelected
                              ? "bg-indigo-50/40 hover:bg-indigo-50/60"
                              : "hover:bg-slate-50/50"
                          }`}
                        >
                          <td className="py-3.5 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => setSelectedId(c.id)}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 h-3.5 w-3.5 cursor-pointer"
                            />
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-lg flex items-center justify-center border shrink-0 ${c.iconBg} ${c.iconColor}`}>
                                <IconComponent className="h-4.5 w-4.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-900 truncate">{c.name}</p>
                                <p className="mt-0.5 text-xs text-slate-500 truncate">{c.subCount} subcategories</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-medium text-slate-550">{c.parent}</td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-slate-900">{c.products.toLocaleString()}</td>
                          <td className="py-3.5 px-4 min-w-[120px]">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-500 w-10 shrink-0">{c.mappedPct}%</span>
                              <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${c.mappedPct}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide border select-none ${
                              c.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 select-none" onClick={(e) => e.stopPropagation()}>
                              <button className="h-7 w-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-2xs">
                                <Pencil className="h-3.5 w-3.5 text-slate-400" />
                              </button>
                              <button className="h-7 w-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-2xs">
                                <MoreVertical className="h-3.5 w-3.5 text-slate-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-4 py-2.5 border-t border-slate-200 bg-white flex items-center justify-between shrink-0 select-none text-sm text-slate-500">
                <span className="font-medium">Showing 1 to 10 of 128 categories</span>
                <div className="flex items-center gap-1.5">
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 hover:bg-slate-50 shadow-xs border border-slate-200" disabled>
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 font-bold shadow-xs">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 font-semibold hover:bg-slate-50 shadow-xs border border-slate-200 text-slate-650">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 font-semibold hover:bg-slate-50 shadow-xs border border-slate-200 text-slate-650">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 font-semibold hover:bg-slate-50 shadow-xs border border-slate-200 text-slate-650">
                    4
                  </Button>
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 font-semibold hover:bg-slate-50 shadow-xs border border-slate-200 text-slate-650">
                    5
                  </Button>
                  <span className="text-slate-400 px-0.5">...</span>
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 font-semibold hover:bg-slate-50 shadow-xs border border-slate-200 text-slate-650">
                    13
                  </Button>
                  <Button variant="outline" size="sm" className="w-7 h-7 p-0 hover:bg-slate-50 shadow-xs border border-slate-200">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                  
                  <div className="relative ml-2">
                    <select className="h-7 pl-2 pr-6 appearance-none bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none cursor-pointer">
                      <option>10 / page</option>
                      <option>20 / page</option>
                      <option>50 / page</option>
                    </select>
                    <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

            </Card>
          </div>

          {/* Right Category Details Panel - 30% width */}
          <div className="lg:col-span-3 flex flex-col gap-4 min-w-0">
            <Card className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-950">Category Details</h3>
                <button className="h-6 w-6 rounded-lg hover:bg-slate-50 flex items-center justify-center transition-colors">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4 text-sm font-medium text-slate-700">
                
                {/* Category Name */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 block">Category Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 block">Slug <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="w-full h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                  <span className="text-xs text-slate-500 block">Used in URLs and API</span>
                </div>

                {/* Parent Category */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 block">Parent Category</label>
                  <div className="relative">
                    <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm text-slate-900 outline-none cursor-pointer hover:bg-slate-50 transition">
                      <option>None (Top Level)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <span className="text-xs text-slate-500 block">Top level categories have no parent</span>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 block">Description</label>
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none font-medium leading-relaxed"
                  />
                  <div className="text-right text-xs text-slate-400 font-semibold">
                    {editDesc.length}/200
                  </div>
                </div>

                {/* Icon selection display */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 block">Icon</label>
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-lg border flex items-center justify-center shrink-0 ${selectedCategory.iconBg} ${selectedCategory.iconColor}`}>
                      {React.createElement(selectedCategory.icon, { className: "h-5 w-5" })}
                    </div>
                    <button className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
                      Change Icon
                    </button>
                  </div>
                </div>

                {/* Status Toggle */}
                <div className="space-y-1.5 select-none">
                  <label className="text-slate-700 block">Status</label>
                  <div className="flex items-center gap-3 text-sm">
                    <button
                      onClick={() => setEditStatus(editStatus === "Active" ? "Inactive" : "Active")}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors relative focus:outline-none shrink-0 ${
                        editStatus === "Active" ? "bg-[#4F46E5]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          editStatus === "Active" ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <div>
                      <span className="font-semibold text-slate-900 block">Active</span>
                      <span className="text-xs text-slate-500 block mt-0.5">This category is visible and can be used.</span>
                    </div>
                  </div>
                </div>

                {/* Products mappings stats */}
                <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 select-none text-center">
                  <div className="rounded-lg border border-slate-100 bg-slate-50/20 p-2">
                    <span className="text-[10px] font-bold text-slate-500 block leading-none">Products</span>
                    <span className="text-base font-bold text-slate-950 block mt-1">{selectedCategory.products.toLocaleString()}</span>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50/20 p-2">
                    <span className="text-[10px] font-bold text-slate-500 block leading-none">Mapped</span>
                    <span className="text-base font-bold text-emerald-600 block mt-1">
                      {Math.round(selectedCategory.products * (selectedCategory.mappedPct / 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50/20 p-2">
                    <span className="text-[10px] font-bold text-slate-500 block leading-none">Unmapped</span>
                    <span className="text-base font-bold text-rose-500 block mt-1">
                      {Math.round(selectedCategory.products * (1 - selectedCategory.mappedPct / 100)).toLocaleString()}
                    </span>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 select-none">
                <button className="flex-1 h-9 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 h-9 rounded-lg bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4F46E5]/90 transition shadow-sm"
                >
                  Save Changes
                </button>
              </div>

            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
