import React from "react";
import {
  Shield,
  Plus,
  Upload,
  Search,
  ChevronDown,
  CheckCircle,
  MoreHorizontal,
  X,
} from "lucide-react";

const roles = [
  { name: "Super Admin", count: 8, active: true },
  { name: "Operations Admin", count: 6 },
  { name: "AI Reviewer", count: 7 },
  { name: "Affiliate Manager", count: 4 },
  { name: "Support Admin", count: 5 },
  { name: "Read Only", count: 9 },
];

const suggested = [
  { name: "Super Admin", desc: "Full access to all modules and settings." },
  { name: "Operations Admin", desc: "Manage day-to-day operations and content." },
  { name: "AI Reviewer", desc: "Review AI verdicts and provide approvals." },
];

const modules = [
  "Dashboard",
  "Products",
  "Retailers",
  "AI Review Queue",
  "Score Audit",
  "Affiliate Programs",
  "Analytics",
  "Users",
  "Receipts",
  "Compliance Logs",
  "Settings",
  "System",
];

export default function RolesPermission() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-6">
      <div className="w-full">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Role list + suggested */}
          <aside className="col-span-3 space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-700">Role List</h3>
              <div className="mt-4">
                <div className="relative">
                  <input className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400" placeholder="Search roles..." />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>

                <ul className="mt-4 space-y-2">
                  {roles.map((r) => (
                    <li key={r.name} className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 ${r.active ? "bg-[#F3E8FF]" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sm font-semibold ${r.active ? "text-[#4F46E5]" : "text-slate-600"}`}>
                          {r.name.split(" ")[0][0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{r.name}</div>
                          <div className="text-xs text-slate-500">{r.count} admins</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-500 hover:text-slate-700 rounded-md"> <MoreHorizontal className="h-4 w-4" /> </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">Suggested Roles</h3>
                <button className="text-sm text-indigo-600 font-medium">+ Add Role</button>
              </div>
              <div className="mt-3 space-y-3">
                {suggested.map((s) => (
                  <div key={s.name} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                    <div className="mt-1 text-xs italic text-slate-500">{s.desc}</div>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          {/* Center Column - Matrix and Admin Assignments */}
          <section className="col-span-6 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-slate-700" />
                  <h4 className="text-sm font-semibold text-slate-900">Permission Matrix</h4>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  Role:
                  <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                    <option>Super Admin</option>
                    <option>Operations Admin</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 overflow-auto">
                <table className="w-full table-fixed text-sm text-left border-collapse">
                  <thead>
                    <tr className="text-slate-500 text-xs uppercase tracking-wider">
                      <th className="w-1/3 py-3">Module</th>
                      <th className="py-3">View</th>
                      <th className="py-3">Create</th>
                      <th className="py-3">Edit</th>
                      <th className="py-3">Approve</th>
                      <th className="py-3">Reject</th>
                      <th className="py-3">Delete</th>
                      <th className="py-3">Export</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {modules.map((m) => (
                      <tr key={m} className="border-t border-slate-100">
                        <td className="py-3 pr-4">{m}</td>
                        <td className="py-3"><CheckCircle className="h-4 w-4 text-[#16A34A]" /></td>
                        <td className="py-3"><CheckCircle className="h-4 w-4 text-[#16A34A]" /></td>
                        <td className="py-3"><CheckCircle className="h-4 w-4 text-[#16A34A]" /></td>
                        <td className="py-3">—</td>
                        <td className="py-3">—</td>
                        <td className="py-3">—</td>
                        <td className="py-3">—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-[#16A34A]" /> Allowed
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm text-slate-600">— Not Allowed</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-900">Admin Assignments</h4>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input className="rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400" placeholder="Search admin..." />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                    <option>All Roles</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left py-3">Admin</th>
                      <th className="py-3">Email</th>
                      <th className="py-3">Role</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Assigned At</th>
                      <th className="py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {["John Smith","Sarah Johnson","Michael Brown","Emily Davis","David Wilson"].map((n) => (
                      <tr key={n} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="py-3 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm">J</div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{n}</div>
                            <div className="text-xs text-slate-500">{n.split(" ")[0].toLowerCase()}@happy.com</div>
                          </div>
                        </td>
                        <td className="py-3">{n.split(" ")[0].toLowerCase()}@happy.com</td>
                        <td className="py-3"><span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-[#EDE9FE] text-[#6D28D9]">Super Admin</span></td>
                        <td className="py-3"><span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">Active</span></td>
                        <td className="py-3">Jan 5, 2024</td>
                        <td className="py-3 text-right"><button className="p-2 text-slate-500 hover:text-slate-700"><MoreHorizontal className="h-4 w-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-500">Showing 1 to 5 of 24 admins</div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-500">10 per page</div>
                  <nav className="inline-flex items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <button className="px-3 py-2 text-slate-500 hover:text-slate-900">1</button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-[#4F46E5]">1</button>
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                    <button className="px-3 py-2 text-slate-500 hover:text-slate-900">...</button>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column - Role Details */}
          <aside className="col-span-3">
            <div className="rounded-xl border-l border-slate-100 bg-white p-4 shadow-sm h-full">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-semibold text-slate-900">Role Details</h3>
                <button className="text-slate-500 hover:text-slate-700"><X className="h-4 w-4" /></button>
              </div>

              <div className="mt-4 rounded-lg border border-slate-100 p-4 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200"><Shield className="h-5 w-5 text-slate-700" /></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Super Admin</div>
                    <div className="mt-1 text-xs text-slate-500">Full access to all modules, settings, and system administration.</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-4 border-b border-slate-100 pb-4">
                <button className="text-sm font-medium text-slate-900 border-b-2 border-[#4F46E5] pb-2">Overview</button>
                <button className="text-sm font-medium text-slate-500 pb-2">Permissions</button>
                <button className="text-sm font-medium text-slate-500 pb-2">Admins</button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs text-slate-500">Role Name</label>
                  <input readOnly value="Super Admin" className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900" />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Description</label>
                  <textarea readOnly value="Full access to all modules, settings, and system administration." className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Status</label>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#14532D]">Active</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-slate-500 space-y-1">
                  <div>Created At <span className="text-slate-700">Jan 2, 2024 11:22 AM</span></div>
                  <div>Created By <span className="text-slate-700">System</span></div>
                  <div>Updated At <span className="text-slate-700">May 10, 2024 02:15 PM</span></div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button className="w-full flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"> <Shield className="h-4 w-4" /> Edit Role</button>
                <button className="w-full flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"> <Plus className="h-4 w-4" /> Duplicate Role</button>
                <button className="w-full flex items-center gap-3 rounded-md border border-red-200 bg-white px-3 py-2 text-sm text-red-600"> Delete Role</button>
              </div>

              <div className="mt-6 rounded-lg border border-slate-100 p-4">
                <div className="flex items-center justify-between text-sm text-slate-700">
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#16A34A]" /> 48 Allowed</div>
                  <div className="text-slate-500">0 Denied</div>
                </div>
                <div className="mt-3 text-sm font-semibold text-slate-900">Total Permissions: 48</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
