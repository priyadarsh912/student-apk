import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const machines = [
    { id: "W-01", type: "Washer", status: "Available", time: "", statusColor: "text-green-600 bg-green-50" },
    { id: "W-02", type: "Washer", status: "In Use", time: "23 min left", statusColor: "text-orange-500 bg-orange-50" },
    { id: "W-03", type: "Washer", status: "In Use", time: "45 min left", statusColor: "text-orange-500 bg-orange-50" },
    { id: "D-01", type: "Dryer", status: "Available", time: "", statusColor: "text-green-600 bg-green-50" },
    { id: "D-02", type: "Dryer", status: "Out of Order", time: "", statusColor: "text-red-500 bg-red-50" },
];

const recentActivity = [
    { machine: "Washer W-02", action: "Cycle completed", time: "10 min ago", icon: "check_circle", iconColor: "text-green-600 bg-green-100" },
    { machine: "Dryer D-01", action: "Cycle started", time: "25 min ago", icon: "play_circle", iconColor: "text-primary bg-primary/10" },
    { machine: "Washer W-03", action: "Reminder: Collect clothes", time: "1 hour ago", icon: "notifications", iconColor: "text-orange-500 bg-orange-100" },
];

export default function LaundryTrackerPage() {
    return (
        <MobileLayout>
            <PageHeader title="Laundry Tracker" />

            <div className="px-4 py-6">
                {/* Current Session */}
                <div className="rounded-2xl bg-primary p-5 text-white mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">Your Current Session</h3>
                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">Active</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-16 rounded-xl bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">local_laundry_service</span>
                        </div>
                        <div>
                            <p className="font-bold">Washer W-02</p>
                            <p className="text-sm text-white/80 mt-0.5">Wash Cycle • Normal</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden w-32">
                                    <div className="h-full bg-white rounded-full" style={{ width: "62%" }} />
                                </div>
                                <span className="text-xs font-bold">23 min</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Machine Availability */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">Machine Availability</h3>
                        <span className="text-xs text-[#637388]">Block A - Floor 2</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        {machines.map((m) => (
                            <div key={m.id} className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100">
                                <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg text-[#637388]">
                                        {m.type === "Washer" ? "local_laundry_service" : "dry_cleaning"}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{m.type} {m.id}</p>
                                    {m.time && <p className="text-xs text-[#637388]">{m.time}</p>}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${m.statusColor}`}>{m.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h3 className="font-bold mb-3">Recent Activity</h3>
                    <div className="flex flex-col gap-3">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
                                <div className={`size-10 rounded-full flex items-center justify-center ${a.iconColor}`}>
                                    <span className="material-symbols-outlined text-lg">{a.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{a.machine}</p>
                                    <p className="text-xs text-[#637388]">{a.action}</p>
                                </div>
                                <span className="text-[10px] text-[#637388] font-medium">{a.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
