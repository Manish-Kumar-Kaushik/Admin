"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Save,
  Laptop,
  Globe,
  Settings,
  Gauge,
  Database,
  Bell,
  Info,
  Shield,
  History,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("General");

  // System Preferences state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  // Data & Caching state
  const [autoClean, setAutoClean] = useState(true);

  // System Alerts state
  const [dailyReport, setDailyReport] = useState(true);

  const tabs = [
    "General",
    "Features",
    "AI & Scoring",
    "Integrations",
    "Notifications",
    "Security",
    "Compliance",
    "Maintenance",
  ];

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden font-sans text-slate-800">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-6">
        


        {/* ─── Page Title & Action Buttons ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full select-none">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              System Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage global platform configurations and preferences.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="inline-flex justify-center items-center gap-1.5 h-9 px-4 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors whitespace-nowrap">
              <RefreshCw className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              Reset to Defaults
            </button>
            <button className="inline-flex justify-center items-center gap-1.5 h-9 px-4 text-sm font-semibold text-white bg-[#4F46E5] rounded-lg hover:bg-[#4F46E5]/90 shadow-sm transition-colors whitespace-nowrap">
              <Save className="h-3.5 w-3.5 shrink-0" />
              Save Changes
            </button>
          </div>
        </div>

        {/* ─── Navigation Tabs ─── */}
        <div className="border-b border-slate-200 w-full overflow-x-auto scrollbar-none select-none">
          <nav className="flex space-x-6 min-w-max pb-[2px]" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* ─── Main Content Grid ─── */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-10 w-full max-w-full items-start">
          
          {/* Left Side Settings Form - 70% width */}
          <div className="lg:col-span-7 flex flex-col gap-5 min-w-0">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              
              {/* Platform Information Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                      <Laptop className="h-4 w-4 text-[#6366F1]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Platform Information</h3>
                  </div>
                  <button className="inline-flex items-center gap-1 h-7 px-2.5 rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm select-none">
                    Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Platform Name</label>
                    <input
                      type="text"
                      defaultValue="BuyWise AI"
                      className="w-full h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Tagline</label>
                    <input
                      type="text"
                      defaultValue="AI Product Decision Assistant"
                      className="w-full h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Base URL</label>
                    <input
                      type="text"
                      defaultValue="https://www.buywise.ai"
                      className="w-full h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Support Email</label>
                    <input
                      type="text"
                      defaultValue="support@buywise.ai"
                      className="w-full h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Localization & Regional Settings Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                      <Globe className="h-4 w-4 text-[#3B82F6]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Localization & Regional Settings</h3>
                  </div>
                  <button className="inline-flex items-center gap-1 h-7 px-2.5 rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm select-none">
                    Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Default Language</label>
                    <div className="relative">
                      <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>Hindi</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Date Format</label>
                    <div className="relative">
                      <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Time Zone</label>
                    <div className="relative">
                      <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                        <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                        <option>(UTC+05:30) India Standard Time</option>
                        <option>(UTC+00:00) Coordinated Universal Time</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Currency</label>
                    <div className="relative">
                      <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                        <option>USD - US Dollar ($)</option>
                        <option>INR - Indian Rupee (₹)</option>
                        <option>EUR - Euro (€)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* System Preferences Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                    <Settings className="h-4 w-4 text-[#6366F1]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">System Preferences</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "Enable Maintenance Mode", desc: "Temporarily restrict access to the platform", state: maintenanceMode, setter: setMaintenanceMode },
                    { label: "Allow User Registration", desc: "New users can sign up on the platform", state: userRegistration, setter: setUserRegistration },
                    { label: "Email Verification Required", desc: "Users must verify email before logging in", state: emailVerification, setter: setEmailVerification },
                    { label: "Two-Factor Authentication", desc: "Require 2FA for all admin users", state: twoFactor, setter: setTwoFactor },
                  ].map((p) => (
                    <div key={p.label} className="flex items-center justify-between gap-4 text-sm select-none">
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-900 block">{p.label}</span>
                        <span className="text-xs text-slate-500 block mt-0.5">{p.desc}</span>
                      </div>
                      <button
                        onClick={() => p.setter(!p.state)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors relative focus:outline-none shrink-0 ${
                          p.state ? "bg-[#4F46E5]" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                            p.state ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance & Limits Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                    <Gauge className="h-4 w-4 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Performance & Limits</h3>
                </div>
                
                <div className="space-y-4 text-sm font-medium text-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-center gap-1 text-slate-700 font-semibold">
                      <span>API Rate Limit (per minute)</span>
                      <Info className="h-3 w-3 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      defaultValue={120}
                      className="w-full sm:w-24 h-9 rounded-lg border border-slate-200 px-3 text-left sm:text-right font-medium text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-center gap-1 text-slate-700 font-semibold">
                      <span>Max Search Requests (per day)</span>
                      <Info className="h-3 w-3 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      defaultValue={500}
                      className="w-full sm:w-24 h-9 rounded-lg border border-slate-200 px-3 text-left sm:text-right font-medium text-slate-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-center gap-1 text-slate-700 font-semibold">
                      <span>Max Receipt Upload Size</span>
                      <Info className="h-3 w-3 text-slate-400" />
                    </div>
                    <div className="relative w-full sm:w-28">
                      <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-left sm:text-right font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                        <option>10 MB</option>
                        <option>20 MB</option>
                        <option>50 MB</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-center gap-1 text-slate-700 font-semibold">
                      <span>Data Retention (Analytics)</span>
                      <Info className="h-3 w-3 text-slate-400" />
                    </div>
                    <div className="relative w-full sm:w-28">
                      <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-left sm:text-right font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                        <option>13 Months</option>
                        <option>6 Months</option>
                        <option>24 Months</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data & Caching Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                    <Database className="h-4 w-4 text-[#6366F1]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Data & Caching</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">Cache TTL (Products)</label>
                      <div className="relative">
                        <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                          <option>6 Hours</option>
                          <option>12 Hours</option>
                          <option>24 Hours</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">Cache TTL (Prices)</label>
                      <div className="relative">
                        <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                          <option>15 Minutes</option>
                          <option>30 Minutes</option>
                          <option>1 Hour</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm select-none">
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 block">Auto Clean Old Data</span>
                      <span className="text-xs text-slate-500 block mt-0.5">Automatically clean up old logs and temp data</span>
                    </div>
                    <button
                      onClick={() => setAutoClean(!autoClean)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors relative focus:outline-none shrink-0 ${
                        autoClean ? "bg-[#4F46E5]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          autoClean ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* System Alerts & Monitoring Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                    <Bell className="h-4 w-4 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">System Alerts & Monitoring</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">Error Alert Threshold</label>
                      <div className="relative">
                        <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                          <option>10 errors / 5 min</option>
                          <option>20 errors / 5 min</option>
                          <option>5 errors / 5 min</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">Performance Alert Threshold</label>
                      <div className="relative">
                        <select className="w-full h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition cursor-pointer">
                          <option>&gt; 2 sec response time</option>
                          <option>&gt; 1 sec response time</option>
                          <option>&gt; 5 sec response time</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm select-none">
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 block">Send Daily System Report</span>
                      <span className="text-xs text-slate-500 block mt-0.5">Email daily system health report to admins</span>
                    </div>
                    <button
                      onClick={() => setDailyReport(!dailyReport)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors relative focus:outline-none shrink-0 ${
                        dailyReport ? "bg-[#4F46E5]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          dailyReport ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>


            </div>

          </div>

          {/* Right Side Sidebar Panels - 30% width */}
          <div className="lg:col-span-3 flex flex-col gap-5 min-w-0">
            <div className="flex flex-col gap-5 w-full">
              {/* System Overview Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-950 tracking-tight">System Overview</h3>
                
                <div className="divide-y divide-slate-100 text-sm font-medium">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500">Environment</span>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100 font-semibold shadow-none rounded px-2 py-0.5 text-xs">
                      Production
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500">Version</span>
                    </div>
                    <span className="text-slate-900 font-semibold">v2.4.1</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500">Last Updated</span>
                    </div>
                    <span className="text-slate-900 font-semibold">May 26, 2025 10:24 AM</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500">Updated By</span>
                    </div>
                    <span className="text-slate-900 font-semibold">Admin User</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500">Configuration Status</span>
                    </div>
                    <span className="text-emerald-600 font-semibold">Up to date</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-955 tracking-tight">Quick Actions</h3>
                
                <div className="space-y-2.5">
                  {[
                    { label: "Clear Cache" },
                    { label: "Rebuild Search Index" },
                    { label: "Export Settings" },
                    { label: "Import Settings" },
                    { label: "View System Logs" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs text-left text-sm font-semibold text-slate-700"
                    >
                      <span>{action.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Warning/Info Alert Banner */}
        <div className="rounded-xl border border-indigo-200 bg-[#EEF2F6]/50 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm leading-relaxed text-indigo-905 select-none w-full">
          <div className="flex gap-2.5 items-start">
            <div className="h-6 w-6 rounded bg-indigo-50 border border-indigo-150 flex items-center justify-center shrink-0 shadow-xs">
              <Shield className="h-3.5 w-3.5 text-[#6366F1]" />
            </div>
            <div>
              <span className="font-semibold block text-slate-900">Changes you make here will impact the entire platform.</span>
              <span className="text-xs text-slate-500 block mt-0.5">Please review carefully before saving any changes.</span>
            </div>
          </div>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm shrink-0 whitespace-nowrap">
            <History className="h-3 w-3 text-slate-400" />
            View Change History
          </button>
        </div>

      </div>
    </div>
  );
}
