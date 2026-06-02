import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Users,
  UserMinus,
  Pencil,
  Play,
} from "lucide-react";

interface UserRow {
  name: string;
  title: string;
  email: string;
  role: string;
  roleColor: string;
  mfaStatus: "Enabled" | "Disabled";
  status: "Active" | "Inactive" | "Disabled";
  statusColor: string;
  lastLogin: string;
  lastLoginAgo: string;
  createdAt: string;
  createdAgo: string;
  avatar: string;
  actionType: "edit" | "enable";
}

const kpis = [
  {
    title: "Total Admins",
    value: "24",
    subtitle: "All administrator accounts",
    icon: Users,
    iconColor: "bg-[#EEF2FF] text-[#4F46E5]",
  },
  {
    title: "Active Admins",
    value: "21",
    subtitle: "87.5% of total admins",
    icon: ShieldCheck,
    iconColor: "bg-[#DCFCE7] text-[#15803D]",
  },
  {
    title: "Inactive / Disabled",
    value: "3",
    subtitle: "12.5% of total admins",
    icon: UserMinus,
    iconColor: "bg-[#FFEDD5] text-[#BE123C]",
  },
  {
    title: "MFA Enabled",
    value: "20",
    subtitle: "83.3% of active admins",
    icon: Lock,
    iconColor: "bg-[#DBEAFE] text-[#1D4ED8]",
  },
];

const users: UserRow[] = [
  {
    name: "John Smith",
    title: "Super Administrator",
    email: "john.smith@happy.com",
    role: "Super Admin",
    roleColor: "bg-[#EDE9FE] text-[#6D28D9]",
    mfaStatus: "Enabled",
    status: "Active",
    statusColor: "bg-[#DCFCE7] text-[#15803D]",
    lastLogin: "May 20, 2024 10:28 AM",
    lastLoginAgo: "2 hours ago",
    createdAt: "Jan 5, 2024 09:15 AM",
    createdAgo: "5 months ago",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=160&q=80",
    actionType: "edit",
  },
  {
    name: "Sarah Johnson",
    title: "Content Manager",
    email: "sarah.johnson@happy.com",
    role: "Content Manager",
    roleColor: "bg-[#E0F2FE] text-[#0C4A6E]",
    mfaStatus: "Enabled",
    status: "Active",
    statusColor: "bg-[#DCFCE7] text-[#15803D]",
    lastLogin: "May 20, 2024 09:41 AM",
    lastLoginAgo: "3 hours ago",
    createdAt: "Jan 12, 2024 11:22 AM",
    createdAgo: "4 months ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    actionType: "edit",
  },
  {
    name: "Michael Brown",
    title: "Reviewer",
    email: "michael.brown@happy.com",
    role: "Reviewer",
    roleColor: "bg-[#DCFCE7] text-[#166534]",
    mfaStatus: "Enabled",
    status: "Active",
    statusColor: "bg-[#DCFCE7] text-[#15803D]",
    lastLogin: "May 19, 2024 05:33 PM",
    lastLoginAgo: "1 day ago",
    createdAt: "Feb 3, 2024 02:10 PM",
    createdAgo: "3 months ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    actionType: "edit",
  },
  {
    name: "Emily Davis",
    title: "Affiliate Manager",
    email: "emily.davis@happy.com",
    role: "Affiliate Manager",
    roleColor: "bg-[#FEF3C7] text-[#92400E]",
    mfaStatus: "Disabled",
    status: "Active",
    statusColor: "bg-[#DCFCE7] text-[#15803D]",
    lastLogin: "May 18, 2024 04:21 PM",
    lastLoginAgo: "2 days ago",
    createdAt: "Feb 18, 2024 10:05 AM",
    createdAgo: "3 months ago",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
    actionType: "edit",
  },
  {
    name: "David Wilson",
    title: "Support Manager",
    email: "david.wilson@happy.com",
    role: "Support Manager",
    roleColor: "bg-[#D1FAE5] text-[#0F766E]",
    mfaStatus: "Enabled",
    status: "Active",
    statusColor: "bg-[#DCFCE7] text-[#15803D]",
    lastLogin: "May 17, 2024 11:07 AM",
    lastLoginAgo: "3 days ago",
    createdAt: "Mar 1, 2024 08:30 AM",
    createdAgo: "2 months ago",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80",
    actionType: "edit",
  },
  {
    name: "Lisa Martinez",
    title: "Reviewer",
    email: "lisa.martinez@happy.com",
    role: "Reviewer",
    roleColor: "bg-[#DCFCE7] text-[#166534]",
    mfaStatus: "Enabled",
    status: "Inactive",
    statusColor: "bg-[#FEE2E2] text-[#B91C1C]",
    lastLogin: "—",
    lastLoginAgo: "Never logged in",
    createdAt: "Mar 10, 2024 01:45 PM",
    createdAgo: "2 months ago",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=160&q=80",
    actionType: "enable",
  },
  {
    name: "Robert Taylor",
    title: "Content Editor",
    email: "robert.taylor@happy.com",
    role: "Content Editor",
    roleColor: "bg-[#E0F2FE] text-[#0C4A6E]",
    mfaStatus: "Disabled",
    status: "Disabled",
    statusColor: "bg-[#FFEDD5] text-[#C2410C]",
    lastLogin: "May 10, 2024 03:22 PM",
    lastLoginAgo: "10 days ago",
    createdAt: "Jan 28, 2024 04:20 PM",
    createdAgo: "4 months ago",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
    actionType: "enable",
  },
  {
    name: "Jennifer Lee",
    title: "Data Analyst",
    email: "jennifer.lee@happy.com",
    role: "Data Analyst",
    roleColor: "bg-[#E9D5FF] text-[#7C3AED]",
    mfaStatus: "Enabled",
    status: "Active",
    statusColor: "bg-[#DCFCE7] text-[#15803D]",
    lastLogin: "May 20, 2024 08:55 AM",
    lastLoginAgo: "4 hours ago",
    createdAt: "Apr 5, 2024 09:50 AM",
    createdAgo: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    actionType: "edit",
  },
  {
    name: "Kevin Clark",
    title: "System Administrator",
    email: "kevin.clark@happy.com",
    role: "System Admin",
    roleColor: "bg-[#D1FAE5] text-[#0F766E]",
    mfaStatus: "Enabled",
    status: "Active",
    statusColor: "bg-[#DCFCE7] text-[#15803D]",
    lastLogin: "May 20, 2024 07:18 AM",
    lastLoginAgo: "5 hours ago",
    createdAt: "Jan 15, 2024 07:40 AM",
    createdAgo: "5 months ago",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    actionType: "edit",
  },
  {
    name: "Amanda White",
    title: "Marketing Manager",
    email: "amanda.white@happy.com",
    role: "Marketing Manager",
    roleColor: "bg-[#FCE7F3] text-[#9D174D]",
    mfaStatus: "Disabled",
    status: "Inactive",
    statusColor: "bg-[#FEE2E2] text-[#B91C1C]",
    lastLogin: "Apr 30, 2024 02:33 PM",
    lastLoginAgo: "20 days ago",
    createdAt: "Mar 20, 2024 11:25 AM",
    createdAgo: "2 months ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    actionType: "enable",
  },
];

export default function AdminUsers() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 min-w-0">
      <div className="flex-1 w-full p-3 sm:p-4 lg:p-6 flex flex-col gap-4 sm:gap-6 min-w-0">
        
        {/* Header Area */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Admin Users
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage administrator accounts, roles, and access.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4338ca]">
            <Plus className="h-4 w-4" />
            Invite Admin
          </button>
        </div>

        {/* KPI Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 w-full min-w-0">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 w-full">
            {kpis.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className={`flex items-start gap-3 sm:gap-4 ${idx !== kpis.length - 1 ? 'xl:border-r xl:border-slate-100 xl:pr-6' : ''}`}>
                  <div className={`mt-0.5 shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full ${card.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-slate-500">{card.title}</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <h2 className="text-2xl font-bold text-slate-950">{card.value}</h2>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Data Table Area */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-hidden min-w-0 w-full">
          
          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col gap-1.5 lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Role</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-md border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                  <option>All Roles</option>
                  <option>Super Admin</option>
                  <option>Content Manager</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-md border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">MFA Status</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select className="w-full appearance-none rounded-md border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    <option>All</option>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition whitespace-nowrap shadow-sm">
                  <RefreshCcw className="h-4 w-4" />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full min-w-0">
            <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
              <thead>
                <tr className="border-y border-slate-200 bg-white">
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">Admin</th>
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">Email</th>
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">
                    <div className="inline-flex items-center gap-1">Role <ChevronDown className="h-3 w-3" /></div>
                  </th>
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">MFA Status</th>
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">
                    <div className="inline-flex items-center gap-1">Status <ChevronDown className="h-3 w-3" /></div>
                  </th>
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">
                    <div className="inline-flex items-center gap-1">Last Login <ChevronDown className="h-3 w-3" /></div>
                  </th>
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">
                    <div className="inline-flex items-center gap-1">Created At <ChevronDown className="h-3 w-3" /></div>
                  </th>
                  <th className="py-4 font-semibold uppercase text-xs text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate">{user.name}</div>
                          <div className="text-xs text-slate-500 truncate">{user.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-slate-600 font-medium">{user.email}</td>
                    <td className="py-4 pr-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      {user.mfaStatus === "Enabled" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          <ShieldCheck className="h-3.5 w-3.5" /> Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                          <ShieldCheck className="h-3.5 w-3.5" /> Disabled
                        </span>
                      )}
                    </td>
                    <td className="py-4 pr-4">
                      {user.status === "Active" ? (
                        <span className="inline-flex items-center text-emerald-600 font-semibold text-xs bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          Active
                        </span>
                      ) : user.status === "Inactive" ? (
                         <span className="inline-flex items-center text-rose-600 font-semibold text-xs bg-rose-50 px-2.5 py-0.5 rounded-full">
                           Inactive
                         </span>
                      ) : (
                         <span className="inline-flex items-center text-rose-600 font-semibold text-xs bg-rose-50 px-2.5 py-0.5 rounded-full">
                           Disabled
                         </span>
                      )}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="text-sm text-slate-900 font-medium">{user.lastLogin}</div>
                      <div className="text-xs text-slate-500">({user.lastLoginAgo})</div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="text-sm text-slate-900 font-medium">{user.createdAt}</div>
                      <div className="text-xs text-slate-500">({user.createdAgo})</div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {user.actionType === "edit" ? (
                          <button className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                            <Pencil className="h-3.5 w-3.5" />
                            Edit Role
                          </button>
                        ) : (
                          <button className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm hover:bg-slate-50 transition-colors">
                            <Play className="h-3.5 w-3.5" />
                            Enable
                          </button>
                        )}
                        <button className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 hover:bg-slate-50 shadow-sm transition-colors">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Showing 1 to 10 of 24 admins</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-3 text-sm text-slate-500">
                <span className="hidden sm:inline">10 per page</span>
                <div className="relative">
                  <select className="appearance-none rounded-md border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </label>
              <nav className="inline-flex items-center rounded-md bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <button className="px-3 py-1.5 text-slate-500 hover:text-slate-900 border-r border-slate-200 transition-colors bg-white hover:bg-slate-50">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="px-3.5 py-1.5 text-sm font-semibold text-white bg-[#4F46E5]">1</button>
                <button className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">2</button>
                <button className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors border-r border-slate-200">3</button>
                <button className="px-3 py-1.5 text-slate-500 hover:text-slate-900 transition-colors bg-white hover:bg-slate-50">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
