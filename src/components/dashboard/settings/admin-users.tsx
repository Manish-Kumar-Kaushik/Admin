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
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-6 py-5 space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Admin Users
            </h1>
            <p className="mt-1 sm:mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage administrator accounts, roles, and access.
            </p>
          </div>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4F46E5] px-4 py-2.5 sm:py-2 text-sm font-semibold text-white shadow-sm shadow-[#4F46E5]/10 transition hover:bg-[#4338ca]">
            <Plus className="h-4 w-4" />
            Invite Admin
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm flex items-start gap-4">
                <div className={`mt-0.5 shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${card.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-500">{card.title}</div>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</h2>
                  <p className="mt-0.5 text-xs text-slate-500">{card.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <section className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0 w-full">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  aria-label="Search by name or email"
                  placeholder="Search by name or email..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  suppressHydrationWarning={true}
                  data-form-type="other"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full lg:w-auto">
              <select className="w-full sm:w-40 md:w-44 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                <option>All Roles</option>
                <option>Super Admin</option>
                <option>Content Manager</option>
              </select>
              <select className="w-full sm:w-40 md:w-44 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="w-full sm:w-40 md:w-44 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                <option>All</option>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                <RefreshCcw className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        <section className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">
                    Admin
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">
                    <div className="inline-flex items-center gap-2">
                      Role
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">MFA Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">
                    <div className="inline-flex items-center gap-2">
                      Status
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">
                    <div className="inline-flex items-center gap-2">
                      Last Login
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">
                    <div className="inline-flex items-center gap-2">
                      Created At
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 align-top whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{user.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top text-sm text-slate-600">{user.email}</td>
                    <td className="px-6 py-5 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.mfaStatus === "Enabled" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FFE7D9] text-[#C2410C]"
                      }`}>
                        {user.mfaStatus}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.statusColor}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="text-sm text-slate-900">{user.lastLogin}</div>
                      <div className="mt-1 text-xs text-slate-500">({user.lastLoginAgo})</div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="text-sm text-slate-900">{user.createdAt}</div>
                      <div className="mt-1 text-xs text-slate-500">({user.createdAgo})</div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      {user.actionType === "edit" ? (
                        <div className="inline-flex items-center h-9 overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm">
                          <button className="flex items-center gap-1.5 pl-3 pr-2.5 h-full transition-colors hover:bg-slate-50">
                            <Pencil className="h-4 w-4 text-slate-500" />
                            <span className="whitespace-nowrap text-xs font-semibold text-slate-800">Edit Role</span>
                          </button>
                          <div className="w-px h-4 bg-slate-200" />
                          <button className="px-2.5 h-full flex items-center justify-center transition-colors hover:bg-slate-50">
                            <ChevronDown className="w-3 h-3 text-slate-500" />
                          </button>
                        </div>
                      ) : (
                        <button className="inline-flex items-center gap-2 rounded-2xl bg-[#DCFCE7] px-4 py-2 text-sm font-semibold text-[#14532D] transition hover:bg-[#BBF7D0]">
                          <Play className="h-4 w-4" />
                          Enable
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200/80 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Showing 1 to 10 of 24 admins</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-3 text-sm text-slate-500">
                <span className="hidden sm:inline">10 per page</span>
                <select className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </label>
              <nav className="inline-flex items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <button className="px-3 py-2 text-slate-500 hover:text-slate-900">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-[#4F46E5]">1</button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">3</button>
                <button className="px-3 py-2 text-slate-500 hover:text-slate-900">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
