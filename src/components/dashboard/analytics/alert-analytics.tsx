"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  SlidersHorizontal,
  Info,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  MousePointerClick,
  RefreshCw,
  Mail,
  Smartphone,
  MessageSquare,
  Monitor,
  ExternalLink,
  Zap,
  Clock,
} from "lucide-react";

// ─── Sparkline SVG (Animated) ─────────────────────────────────────────────
function Sparkline({ data, color, id }: { data: number[]; color: string; id: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 36;

  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPts = `0,${h} ${pts} ${w},${h}`;

  // Last point for the trailing dot
  const lastV = data[data.length - 1];
  const lastX = w;
  const lastY = h - ((lastV - min) / range) * h;

  // Approximate line length for dash animation
  const lineLen = 300;

  const animId = `spark-${id}`;

  const css = `
    @keyframes ${animId}-draw {
      from { stroke-dashoffset: ${lineLen}; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes ${animId}-area {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes ${animId}-dot {
      0%   { opacity: 0; r: 0; }
      60%  { opacity: 1; r: 3.5; }
      100% { opacity: 1; r: 2.5; }
    }
    @keyframes ${animId}-pulse {
      0%, 100% { opacity: 0.5; r: 4; }
      50%       { opacity: 0;   r: 8; }
    }
    .${animId}-line {
      stroke-dasharray: ${lineLen};
      stroke-dashoffset: ${lineLen};
      animation: ${animId}-draw 1s cubic-bezier(0.4,0,0.2,1) 0.1s forwards;
    }
    .${animId}-area {
      opacity: 0;
      animation: ${animId}-area 0.6s ease 0.8s forwards;
    }
    .${animId}-dot {
      animation: ${animId}-dot 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.95s forwards;
    }
    .${animId}-pulse {
      animation: ${animId}-pulse 1.6s ease-in-out 1.35s infinite;
    }
  `;

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <style>{css}</style>
      </defs>

      {/* Animated area fill */}
      <polygon
        points={areaPts}
        fill={`url(#sg-${id})`}
        className={`${animId}-area`}
      />

      {/* Animated draw-on line */}
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={`${animId}-line`}
      />

      {/* Trailing pulse ring */}
      <circle
        cx={lastX}
        cy={lastY}
        r="0"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0"
        className={`${animId}-pulse`}
      />

      {/* Trailing solid dot */}
      <circle
        cx={lastX}
        cy={lastY}
        r="0"
        fill={color}
        opacity="0"
        className={`${animId}-dot`}
      />
    </svg>
  );
}


// ─── Donut Chart SVG ─────────────────────────────────────────────────────
function DonutChart({
  segments,
  total,
  label,
  id,
}: {
  segments: { value: number; color: string }[];
  total: number;
  label: string;
  id: string;
}) {
  const r = 60;
  const cx = 80;
  const cy = 80;
  const stroke = 22;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  const arcs = segments.map((s) => {
    const pct = s.value / total;
    const dash = pct * circ;
    const gap = circ - dash;
    const arc = { dash, gap, offset, color: s.color };
    offset += dash;
    return arc;
  });

  // Build per-segment keyframes: each arc grows from 0 to its final dash length
  const styles = arcs
    .map((arc, i) => {
      const animId = `donut-${id}-seg-${i}`;
      return `
        @keyframes ${animId} {
          0%   { stroke-dasharray: 0 ${circ}; }
          100% { stroke-dasharray: ${arc.dash} ${arc.gap}; }
        }
        .${animId} {
          stroke-dasharray: 0 ${circ};
          animation: ${animId} 0.7s cubic-bezier(0.4,0,0.2,1) ${0.15 + i * 0.18}s forwards;
        }
      `;
    })
    .join("");

  const centerStyle = `
    @keyframes donut-${id}-center {
      from { opacity: 0; transform: scale(0.7); }
      to   { opacity: 1; transform: scale(1); }
    }
    .donut-${id}-center {
      opacity: 0;
      transform-origin: ${cx}px ${cy}px;
      animation: donut-${id}-center 0.45s cubic-bezier(0.34,1.56,0.64,1) ${0.15 + arcs.length * 0.18 + 0.2}s forwards;
    }
  `;

  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      <defs>
        <style>{styles + centerStyle}</style>
      </defs>

      {/* Background track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#F1F5F9"
        strokeWidth={stroke}
      />

      {/* Animated arc segments */}
      {arcs.map((arc, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={arc.color}
          strokeWidth={stroke}
          strokeDasharray={`0 ${circ}`}
          strokeDashoffset={-arc.offset + circ * 0.25}
          strokeLinecap="butt"
          className={`donut-${id}-seg-${i}`}
        />
      ))}

      {/* Center label — fades in with a spring after arcs finish */}
      <g className={`donut-${id}-center`}>
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill="#0F172A"
        >
          {total.toLocaleString()}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize="10"
          fill="#94A3B8"
          fontWeight="600"
        >
          {label}
        </text>
      </g>
    </svg>
  );
}

// ─── Mini Line Chart (Alert Trend) ───────────────────────────────────────
function TrendChart() {
  const days = ["May 13", "May 15", "May 17", "May 19", "May 21", "May 23", "May 25", "May 26"];
  const created = [2800, 3100, 2600, 3400, 3200, 3600, 3900, 4000];
  const triggered = [1200, 1500, 1100, 1800, 1600, 2100, 2400, 2600];

  const w = 460;
  const h = 180;
  const padL = 40;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;
  const maxV = 4500;
  const minV = 0;

  const toX = (i: number) => padL + (i / (days.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - minV) / (maxV - minV)) * chartH;

  const createdPts = created.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
  const triggeredPts = triggered.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

  const createdArea = `${padL},${padT + chartH} ${createdPts} ${toX(days.length - 1)},${padT + chartH}`;
  const triggeredArea = `${padL},${padT + chartH} ${triggeredPts} ${toX(days.length - 1)},${padT + chartH}`;

  const yLabels = [4000, 3000, 2000, 1000, 0];

  // Approximate polyline lengths for stroke-dasharray animation
  const createdLen = 650;
  const triggeredLen = 700;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="grad-created" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grad-triggered" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>

        {/* Keyframe animations via SVG style */}
        <style>{`
          @keyframes drawLine {
            from { stroke-dashoffset: var(--line-len); }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes fadeArea {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes popDot {
            0%   { r: 0; opacity: 0; }
            70%  { r: 4.5; opacity: 1; }
            100% { r: 3; opacity: 1; }
          }
          .line-created {
            stroke-dasharray: ${createdLen};
            stroke-dashoffset: ${createdLen};
            animation: drawLine 1.2s cubic-bezier(0.4,0,0.2,1) 0.1s forwards;
            --line-len: ${createdLen};
          }
          .line-triggered {
            stroke-dasharray: ${triggeredLen};
            stroke-dashoffset: ${triggeredLen};
            animation: drawLine 1.2s cubic-bezier(0.4,0,0.2,1) 0.35s forwards;
            --line-len: ${triggeredLen};
          }
          .area-created  { opacity: 0; animation: fadeArea 0.7s ease 0.9s forwards; }
          .area-triggered { opacity: 0; animation: fadeArea 0.7s ease 1.1s forwards; }
          .dot-created  { r: 0; animation: popDot 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          .dot-triggered { r: 0; animation: popDot 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        `}</style>
      </defs>

      {/* Y Grid Lines */}
      {yLabels.map((val) => (
        <g key={val}>
          <line x1={padL} y1={toY(val)} x2={w - padR} y2={toY(val)} stroke="#F1F5F9" strokeWidth="1" />
          <text x={padL - 6} y={toY(val) + 4} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="600">
            {val >= 1000 ? `${val / 1000}K` : val}
          </text>
        </g>
      ))}

      {/* Area fills — fade in after lines draw */}
      <polygon points={createdArea}   fill="url(#grad-created)"   className="area-created" />
      <polygon points={triggeredArea} fill="url(#grad-triggered)" className="area-triggered" />

      {/* Animated Lines */}
      <polyline
        points={createdPts}
        fill="none"
        stroke="#6366F1"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="line-created"
      />
      <polyline
        points={triggeredPts}
        fill="none"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="line-triggered"
      />

      {/* Staggered pop-in dots for Created line */}
      {created.map((v, i) => (
        <circle
          key={`c-${i}`}
          cx={toX(i)}
          cy={toY(v)}
          fill="#fff"
          stroke="#6366F1"
          strokeWidth="2"
          className="dot-created"
          style={{ animationDelay: `${1.0 + i * 0.07}s` }}
        />
      ))}

      {/* Staggered pop-in dots for Triggered line */}
      {triggered.map((v, i) => (
        <circle
          key={`t-${i}`}
          cx={toX(i)}
          cy={toY(v)}
          fill="#fff"
          stroke="#10B981"
          strokeWidth="2"
          className="dot-triggered"
          style={{ animationDelay: `${1.2 + i * 0.07}s` }}
        />
      ))}

      {/* X Labels */}
      {days.map((d, i) => (
        <text key={i} x={toX(i)} y={h - 4} textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">
          {d}
        </text>
      ))}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
export default function AlertAnalytics() {
  const [dateRange] = useState("May 13 – May 26, 2025");

  // KPI Cards
  const kpiCards = [
    {
      title: "Total Alerts Created",
      value: "24,860",
      change: "+14.6%",
      period: "vs May 1 – May 12",
      up: true,
      icon: Bell,
      color: "#6366F1",
      sparkData: [180, 220, 195, 260, 240, 280, 310, 290, 330, 350, 380, 400, 420, 440],
    },
    {
      title: "Active Alerts",
      value: "12,389",
      change: "+8.3%",
      period: "vs May 1 – May 12",
      up: true,
      icon: RefreshCw,
      color: "#10B981",
      sparkData: [100, 120, 110, 140, 130, 150, 160, 155, 170, 180, 190, 195, 200, 210],
    },
    {
      title: "Alerts Triggered",
      value: "3,742",
      change: "+22.7%",
      period: "vs May 1 – May 12",
      up: true,
      icon: Zap,
      color: "#F59E0B",
      sparkData: [60, 80, 70, 100, 90, 110, 130, 120, 150, 160, 180, 190, 210, 220],
    },
    {
      title: "Click Through Rate",
      value: "18.7%",
      change: "+3.4pp",
      period: "vs May 1 – May 12",
      up: true,
      icon: MousePointerClick,
      color: "#8B5CF6",
      sparkData: [12, 14, 13, 15, 14, 16, 17, 16, 18, 17, 18, 19, 18, 19],
    },
    {
      title: "Conversion Rate",
      value: "6.3%",
      change: "+1.1pp",
      period: "vs May 1 – May 12",
      up: true,
      icon: ShoppingCart,
      color: "#3B82F6",
      sparkData: [4, 5, 4.5, 5.5, 5, 6, 6.5, 6, 6.5, 6.3, 6.8, 7, 6.5, 6.3],
    },
    {
      title: "Revenue Generated",
      value: "$48,932.14",
      change: "+27.3%",
      period: "vs May 1 – May 12",
      up: true,
      icon: DollarSign,
      color: "#059669",
      sparkData: [28, 32, 30, 38, 35, 42, 44, 40, 46, 48, 50, 52, 50, 55],
    },
  ];

  // Donut - by type
  const typeSegments = [
    { label: "Price Drop", count: 2549, pct: "68.1%", color: "#6366F1" },
    { label: "Back in Stock", count: 842, pct: "22.5%", color: "#10B981" },
    { label: "Price Increase", count: 213, pct: "5.7%", color: "#F59E0B" },
    { label: "Other", count: 138, pct: "3.7%", color: "#C0C0C0" },
  ];

  // Donut - by channel
  const channelSegments = [
    { label: "Email", count: 2203, pct: "58.8%", color: "#6366F1" },
    { label: "Push Notification", count: 1102, pct: "29.4%", color: "#10B981" },
    { label: "In-App", count: 347, pct: "9.3%", color: "#F59E0B" },
    { label: "SMS", count: 90, pct: "2.4%", color: "#C0C0C0" },
  ];

  // Top Performing Alerts
  const topAlerts = [
    {
      name: "Sony WH-1000XMS",
      sub: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=80&q=80",
      type: "Price Drop",
      triggered: 842,
      ctr: "24.3%",
      conv: "8.7%",
      rev: "$12,450.32",
    },
    {
      name: "Apple AirPods Pro 2",
      sub: "Wireless Earbuds",
      image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=80&q=80",
      type: "Price Drop",
      triggered: 512,
      ctr: "21.6%",
      conv: "7.9%",
      rev: "$8,213.44",
    },
    {
      name: "iPhone 15 (128GB)",
      sub: "Smartphone",
      image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=80&q=80",
      type: "Back in Stock",
      triggered: 478,
      ctr: "19.8%",
      conv: "6.2%",
      rev: "$6,782.11",
    },
    {
      name: "Samsung Galaxy S24",
      sub: "Smartphone",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80&q=80",
      type: "Price Drop",
      triggered: 395,
      ctr: "18.1%",
      conv: "5.6%",
      rev: "$5,442.78",
    },
    {
      name: "Nintendo Switch OLED",
      sub: "Gaming Console",
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=80&q=80",
      type: "Back in Stock",
      triggered: 286,
      ctr: "17.3%",
      conv: "6.8%",
      rev: "$4,125.49",
    },
  ];

  // Recent Alert Activity
  const recentActivity = [
    {
      id: "AL-892471",
      product: "Sony WH-1000XMS",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=80&q=80",
      type: "Price Drop",
      user: "John D.",
      triggeredOn: "May 26, 2025 10:24 AM",
      channelIcon: Mail,
      status: "Triggered",
    },
    {
      id: "AL-892470",
      product: "AirPods Pro 2",
      image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=80&q=80",
      type: "Back in Stock",
      user: "Sarah M.",
      triggeredOn: "May 26, 2025 09:58 AM",
      channelIcon: Bell,
      status: "Triggered",
    },
    {
      id: "AL-892469",
      product: "iPhone 15 (128GB)",
      image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=80&q=80",
      type: "Price Drop",
      user: "Michael T.",
      triggeredOn: "May 26, 2025 09:41 AM",
      channelIcon: Bell,
      status: "Pending",
    },
    {
      id: "AL-892468",
      product: "Galaxy S24",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80&q=80",
      type: "Price Drop",
      user: "Emily R.",
      triggeredOn: "May 26, 2025 09:15 AM",
      channelIcon: Mail,
      status: "Triggered",
    },
    {
      id: "AL-892467",
      product: "Nintendo Switch OLED",
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=80&q=80",
      type: "Back in Stock",
      user: "David L.",
      triggeredOn: "May 26, 2025 08:57 AM",
      channelIcon: Bell,
      status: "Triggered",
    },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Price Drop": return "text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE]";
      case "Back in Stock": return "text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0]";
      case "Price Increase": return "text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A]";
      default: return "text-slate-700 bg-slate-100 border-slate-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Triggered": return "text-emerald-700 bg-emerald-50 border border-emerald-200";
      case "Pending": return "text-amber-700 bg-amber-50 border border-amber-200";
      default: return "text-slate-700 bg-slate-100";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-8 py-6 space-y-6">

        {/* ─── Page Header ─── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between w-full">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl leading-tight flex items-center gap-2">
              Alert Analytics
              <span title="Track performance, engagement, and outcomes of all price and restock alerts" className="cursor-help">
                <Info className="h-4.5 w-4.5 text-slate-400" />
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Track performance, engagement, and outcomes of all price and restock alerts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 select-none">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-250 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-250 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              Filters
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 text-sm font-semibold transition shadow-sm">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* ─── KPI Cards Row ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col gap-2 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg" style={{ background: card.color + "18", border: `1px solid ${card.color}28` }}>
                    <Icon className="h-4 w-4" style={{ color: card.color }} />
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{card.title}</span>
                </div>
                <div className="text-xl font-bold text-slate-900 leading-none">{card.value}</div>
                <div className="flex items-center gap-1 text-[10px] font-bold select-none leading-none">
                  {card.up ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-600 shrink-0" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 shrink-0" />
                  )}
                  <span className={card.up ? "text-emerald-600" : "text-red-500"}>{card.change}</span>
                  <span className="text-slate-400 font-medium">{card.period}</span>
                </div>
                <div className="mt-1 -mx-1">
                  <Sparkline data={card.sparkData} color={card.color} id={`kpi-${i}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Charts Row ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Alert Trend Chart */}
          <div className="col-span-12 lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Alert Trend</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <span className="w-6 h-0.5 rounded-full bg-[#6366F1] inline-block" />
                    Alerts Created
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <span className="w-6 h-0.5 rounded-full bg-[#10B981] inline-block" />
                    Alerts Triggered
                  </span>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 outline-none cursor-pointer shadow-2xs">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="h-[180px] w-full">
              <TrendChart />
            </div>
          </div>

          {/* Alerts Triggered by Type */}
          <div className="col-span-12 lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Alerts Triggered by Type</h2>
            <div className="flex items-center justify-center gap-6 h-[180px]">
              <div className="shrink-0">
                <DonutChart
                  id="type"
                  segments={typeSegments.map((s) => ({ value: s.count, color: s.color }))}
                  total={3742}
                  label="Total"
                />
              </div>
              <div className="flex-1 space-y-3 min-w-0">
                {typeSegments.map((s, i) => (
                  <div key={i} className="flex flex-col leading-tight">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="font-bold text-slate-800 text-xs truncate">{s.label}</span>
                    </div>
                    <div className="pl-4 text-[11px] font-medium text-slate-500 mt-0.5">
                      {s.count.toLocaleString()} <span className="text-slate-400">({s.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts Triggered by Channel */}
          <div className="col-span-12 lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Alerts Triggered by Channel</h2>
            <div className="flex items-center justify-center gap-6 h-[180px]">
              <div className="shrink-0">
                <DonutChart
                  id="channel"
                  segments={channelSegments.map((s) => ({ value: s.count, color: s.color }))}
                  total={3742}
                  label="Total"
                />
              </div>
              <div className="flex-1 space-y-3 min-w-0">
                {channelSegments.map((s, i) => (
                  <div key={i} className="flex flex-col leading-tight">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="font-bold text-slate-800 text-xs truncate">{s.label}</span>
                    </div>
                    <div className="pl-4 text-[11px] font-medium text-slate-500 mt-0.5">
                      {s.count.toLocaleString()} <span className="text-slate-400">({s.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ─── Tables Row ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Top Performing Alerts */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Top Performing Alerts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-xs text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-5 w-[30%]">Alert Name</th>
                    <th className="py-3 w-[15%]">Type</th>
                    <th className="py-3 w-[10%]">Triggered</th>
                    <th className="py-3 w-[10%]">CTR</th>
                    <th className="py-3 w-[15%]">Conversion Rate</th>
                    <th className="py-3 pr-5 w-[20%]">Rev/User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topAlerts.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2.5">
                          <img src={row.image} alt={row.name} className="h-8 w-8 rounded-lg object-cover border border-slate-150 shrink-0" />
                          <div>
                            <div className="font-bold text-slate-900 text-xs leading-tight">{row.name}</div>
                            <div className="text-[10px] text-slate-400 font-medium mt-0.5">{row.sub}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getTypeBadge(row.type)}`}>{row.type}</span>
                      </td>
                      <td className="py-3.5 font-bold text-slate-800">{row.triggered}</td>
                      <td className="py-3.5 font-semibold text-slate-700">{row.ctr}</td>
                      <td className="py-3.5 font-semibold text-slate-700">{row.conv}</td>
                      <td className="py-3.5 pr-5 font-bold text-slate-900">{row.rev}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3.5 border-t border-slate-100">
              <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1 transition">
                View all alerts performance <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Recent Alert Activity */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Recent Alert Activity</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-xs text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-slate-100 text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-5 w-[14%]">Alert ID</th>
                    <th className="py-3 w-[20%]">Product</th>
                    <th className="py-3 w-[14%]">Type</th>
                    <th className="py-3 w-[10%]">User</th>
                    <th className="py-3 w-[20%]">Triggered On</th>
                    <th className="py-3 w-[8%]">Channel</th>
                    <th className="py-3 pr-5 w-[14%]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentActivity.map((row, i) => {
                    const ChanIcon = row.channelIcon;
                    return (
                      <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3.5 px-5 font-mono text-[10px] font-bold text-slate-700">{row.id}</td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <img src={row.image} alt={row.product} className="h-7 w-7 rounded-md object-cover border border-slate-150 shrink-0" />
                            <span className="font-semibold text-slate-800 truncate text-xs">{row.product}</span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${getTypeBadge(row.type)}`}>{row.type}</span>
                        </td>
                        <td className="py-3.5 font-semibold text-slate-700 text-xs">{row.user}</td>
                        <td className="py-3.5 text-[10px] text-slate-500 font-medium">{row.triggeredOn}</td>
                        <td className="py-3.5">
                          <ChanIcon className="h-4 w-4 text-slate-400" />
                        </td>
                        <td className="py-3.5 pr-5">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${getStatusBadge(row.status)}`}>{row.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3.5 border-t border-slate-100">
              <button className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1 transition">
                View all activity <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* ─── Insights Row ─── */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: TrendingUp,
                color: "text-emerald-600 bg-emerald-50 border-emerald-100",
                title: "Price drop alerts have the highest conversion rate (8.2%)",
                sub: "Consider optimizing price increase alerts.",
              },
              {
                icon: Mail,
                color: "text-amber-600 bg-amber-50 border-amber-100",
                title: "Email alerts generate 58.8% of total triggers",
                sub: "Push notifications have higher CTR (22.1%).",
              },
              {
                icon: Clock,
                color: "text-blue-600 bg-blue-50 border-blue-100",
                title: "Best performing time: 8AM – 12PM",
                sub: "You get 42% more triggers during this window.",
              },
            ].map((ins, i) => {
              const Icon = ins.icon;
              return (
                <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                  <span className={`p-2 rounded-xl shrink-0 border ${ins.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-snug">{ins.title}</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">{ins.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
