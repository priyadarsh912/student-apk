import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const classes = [
    { date: "October 24, 2023", time: "10:00 AM - 11:30 AM", status: "PRESENT", icon: "check_circle", statusColor: "text-green-600 bg-green-50", iconColor: "text-green-600 bg-green-100" },
    { date: "October 22, 2023", time: "10:00 AM - 11:30 AM", status: "ABSENT", icon: "cancel", statusColor: "text-red-500 bg-red-50", iconColor: "text-red-500 bg-red-100" },
    { date: "October 20, 2023", time: "Medical Appointment", status: "LEAVE", icon: "event_busy", statusColor: "text-orange-500 bg-orange-50", iconColor: "text-orange-500 bg-orange-100" },
    { date: "October 18, 2023", time: "10:00 AM - 11:30 AM", status: "PRESENT", icon: "check_circle", statusColor: "text-green-600 bg-green-50", iconColor: "text-green-600 bg-green-100" },
];

export default function SubjectAttendanceDetail() {
    return (
        <MobileLayout>
            <PageHeader
                title="Attendance Detail"
                rightAction={
                    <button className="text-[#637388]">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                }
            />

            <div className="px-4 py-6">
                {/* Subject Header */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-primary/5 mb-6">
                    <div className="relative size-16">
                        <svg viewBox="0 0 60 60" className="size-full -rotate-90">
                            <circle cx="30" cy="30" r="24" fill="none" stroke="#e5e7eb" strokeWidth="5" />
                            <circle cx="30" cy="30" r="24" fill="none" stroke="#1c74e9" strokeWidth="5"
                                strokeDasharray={`${85 * 1.508} ${100 * 1.508}`} strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">85%</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold">Data Structures & Algo</h3>
                        <p className="text-xs text-[#637388] flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-sm">person</span>
                            Dr. Sarah Jenkins
                        </p>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded mt-1 inline-block uppercase tracking-wider">Active Course</span>
                    </div>
                </div>

                {/* Target Info */}
                <div className="rounded-xl p-4 bg-blue-50 border border-blue-100 mb-6">
                    <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">info</span>
                        <div>
                            <p className="text-sm font-bold text-primary">Target: 90% Attendance</p>
                            <p className="text-sm text-gray-700 mt-0.5">Attend <span className="font-bold">3 more classes</span> consecutively to reach your 90% goal.</p>
                        </div>
                    </div>
                </div>

                {/* Monthly Trend */}
                <div className="rounded-xl p-4 bg-white border border-gray-100 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h4 className="font-bold text-sm">Monthly Trend</h4>
                            <p className="text-xs text-[#637388]">Last 4 Months Performance</p>
                        </div>
                        <span className="text-xs font-bold text-green-600">↗ +2%</span>
                    </div>
                    {/* Simple chart representation */}
                    <div className="h-32 flex items-end gap-4 mt-4 px-2">
                        {[
                            { month: "AUG", height: 40 },
                            { month: "SEP", height: 55 },
                            { month: "OCT", height: 75 },
                            { month: "NOV", height: 85 },
                        ].map((m) => (
                            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full bg-primary/20 rounded-t-md relative overflow-hidden" style={{ height: `${m.height}%` }}>
                                    <div className="absolute inset-0 bg-primary/60 rounded-t-md" />
                                </div>
                                <span className="text-[10px] text-[#637388] font-medium">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Classes */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">Recent Classes</h3>
                        <span className="text-xs text-[#637388]">(Last 15 days)</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        {classes.map((c, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
                                <div className={`size-10 rounded-full flex items-center justify-center ${c.iconColor}`}>
                                    <span className="material-symbols-outlined text-lg">{c.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{c.date}</p>
                                    <p className="text-xs text-[#637388]">{c.time}</p>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${c.statusColor}`}>{c.status}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-primary hover:bg-gray-100 transition-colors">
                        View Full History
                    </button>
                </div>
            </div>
        </MobileLayout>
    );
}
