import re

with open('src/components/dashboard/youtube-reviewer-trust/channel-queue.tsx', 'r') as f:
    content = f.read()

# We need to replace everything from "      {/* ── MAIN CONTENT: TABLE & RIGHT SIDEBAR ── */}" to the end of the file.
new_content = '''      {/* ── MAIN CONTENT: TABLE & RIGHT SIDEBAR ── */}
      {activeTab === "Channel Queue" ? (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 min-w-0">
            
            {/* Table Header Controls (Outside Table Card) */}
            <div className="flex items-center gap-3 w-full overflow-x-auto pb-1 scrollbar-hide">
              <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search channel, YouTube handle, product category..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
                />
              </div>
              
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm">
                Category <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm">
                Trust Score <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm">
                Status <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm">
                Sponsorship Transparency <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm">
                Review Consistency <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm">
                <Filter className="w-4 h-4" /> More Filters
              </button>
            </div>
            
            {/* Table Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              
              {/* Table */}
              <div className="overflow-x-auto min-h-[550px]">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap">Channel</th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap">Category</th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">Trust Score <ArrowRight className="w-3 h-3 rotate-90" /></div>
                      </th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap text-center">Subscriber<br/>Count <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap">Review<br/>Consistency</th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap">Sponsorship<br/>Transparency</th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap">Product<br/>Depth <HelpCircle className="w-3 h-3 inline ml-0.5 text-slate-400" /></th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap">Videos<br/>Found</th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap">Status</th>
                      <th className="px-5 py-4 text-[11px] uppercase font-semibold text-slate-500 whitespace-nowrap text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tableData.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                              {row.initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900">{row.name}</span>
                              <span className="text-[11px] text-slate-500">{row.handle}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm text-slate-600">{row.category}</td>
                        <td className="px-5 py-5 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded text-sm ${getScoreColor(row.score)}`}>
                            {row.score}
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm font-medium text-slate-700 text-center">{row.subs}</td>
                        <td className={`px-5 py-5 text-xs font-semibold ${row.consistencyColor}`}>{row.consistency}</td>
                        <td className={`px-5 py-5 text-xs font-semibold ${row.transparencyColor}`}>{row.transparency}</td>
                        <td className={`px-5 py-5 text-xs font-semibold ${row.depthColor}`}>{row.depth}</td>
                        <td className="px-5 py-5 text-sm font-medium text-slate-700 text-center">{row.videos}</td>
                        <td className="px-5 py-5">{getStatusBadge(row.status)}</td>
                        <td className="px-5 py-5">
                          <div className="flex items-center justify-center gap-1">
                            <button className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-100" title="View Channel">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors border border-emerald-100" title="Approve Trusted">
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 rounded bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors border border-rose-100" title="Block">
                              <ShieldBan className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 rounded bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors border border-purple-100" title="Request Manual Review">
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Pagination & Legend */}
              <div className="p-4 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-slate-500 bg-white mt-auto rounded-b-xl">
                <div className="flex items-center gap-1">
                  Showing 1 to 7 of 7 results
                </div>
                
                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-indigo-600 bg-indigo-50 text-indigo-700 font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 cursor-not-allowed">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  Rows per page 
                  <button className="flex items-center gap-1 border border-slate-200 rounded px-2 py-1 text-slate-700">
                    25 <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Legend Below Table (Outside the card) */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mt-2">
              <div className="flex flex-wrap items-center justify-start lg:justify-between gap-x-8 gap-y-6">
               <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-slate-900 leading-tight">View Channel</span>
                    <span className="text-[13px] text-slate-500 leading-tight mt-0.5">View channel profile</span>
                  </div>
               </div>
               <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-slate-900 leading-tight">Approve Trusted</span>
                    <span className="text-[13px] text-slate-500 leading-tight mt-0.5">Add to trusted list</span>
                  </div>
               </div>
               <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
                    <ShieldBan className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-slate-900 leading-tight">Block</span>
                    <span className="text-[13px] text-slate-500 leading-tight mt-0.5">Block from analysis</span>
                  </div>
               </div>
               <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-slate-900 leading-tight">Request Manual Review</span>
                    <span className="text-[13px] text-slate-500 leading-tight mt-0.5">Escalate for review</span>
                  </div>
               </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INSIGHTS PANEL */}
          <div className="flex flex-col gap-3 h-max">
            
            {/* Trust Score Factors */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">Trust Score Factors</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Review Authenticity</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">35%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Star className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Sponsorship Transparency</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">25%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Content Consistency</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">20%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Account Age & History</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">20%</span>
                </div>
              </div>
            </div>

            {/* Top Review Categories */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">Top Review Categories</h2>
                <Filter className="w-4 h-4 text-slate-400" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center w-full gap-3">
                  <div className="w-24 shrink-0">
                    <span className="text-sm font-medium text-slate-700">Electronics</span>
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: "42%" }}></div>
                  </div>
                  <div className="w-10 text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900">42%</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-3">
                  <div className="w-24 shrink-0">
                    <span className="text-sm font-medium text-slate-700">Beauty</span>
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: "21%" }}></div>
                  </div>
                  <div className="w-10 text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900">21%</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-3">
                  <div className="w-24 shrink-0">
                    <span className="text-sm font-medium text-slate-700">Kitchen</span>
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: "17%" }}></div>
                  </div>
                  <div className="w-10 text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900">17%</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-3">
                  <div className="w-24 shrink-0">
                    <span className="text-sm font-medium text-slate-700">Home</span>
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: "12%" }}></div>
                  </div>
                  <div className="w-10 text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900">12%</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-3">
                  <div className="w-24 shrink-0">
                    <span className="text-sm font-medium text-slate-700">Supplements</span>
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-green-500" style={{ width: "8%" }}></div>
                  </div>
                  <div className="w-10 text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900">8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reviewer Decisions */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">Recent Decisions</h2>
                <span className="text-xs font-semibold text-indigo-600 cursor-pointer">View All</span>
              </div>
              
              <div className="space-y-5 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[13px] font-bold text-slate-900 leading-tight">Marques Brownlee</span>
                    <span className="text-[11px] text-slate-500">@MKBHD</span>
                  </div>
                  <div className="flex flex-col items-start min-w-[110px]">
                    <span className="text-[11px] font-bold text-emerald-700 leading-tight">Approved as Trusted</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">2 hours ago</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600 shrink-0">
                    AL
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldBan className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[13px] font-bold text-slate-900 leading-tight">Tech Deals Daily</span>
                    <span className="text-[11px] text-slate-500">@techdeals</span>
                  </div>
                  <div className="flex flex-col items-start min-w-[110px]">
                    <span className="text-[11px] font-bold text-rose-700 leading-tight">Blocked - Fake Reviews</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">5 hours ago</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600 shrink-0">
                    JS
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center shrink-0 shadow-sm">
                    <AlertTriangle className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[13px] font-bold text-slate-900 leading-tight">Gadget Guru</span>
                    <span className="text-[11px] text-slate-500">@gadgetguru</span>
                  </div>
                  <div className="flex flex-col items-start min-w-[110px]">
                    <span className="text-[11px] font-bold text-purple-700 leading-tight">Escalated for Manual</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">1 day ago</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600 shrink-0">
                    AL
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">{activeTab}</h2>
          <p className="text-sm text-slate-500 text-center max-w-md">
            The {activeTab.toLowerCase()} view is currently empty or under development. Switch back to Channel Queue to see the main dashboard.
          </p>
          <button 
            onClick={() => setActiveTab("Channel Queue")}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Return to Channel Queue
          </button>
        </div>
      )}
    </div>
  );
}
'''

start_idx = content.find('      {/* ── MAIN CONTENT: TABLE & RIGHT SIDEBAR ── */}')
if start_idx != -1:
    final_content = content[:start_idx] + new_content
    with open('src/components/dashboard/youtube-reviewer-trust/channel-queue.tsx', 'w') as f:
        f.write(final_content)
    print("Fixed!")
else:
    print("Could not find start marker.")
