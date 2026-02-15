import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigate } from "react-router-dom";

const notices = [
    {
        category: "ACADEMIC",
        time: "2 hours ago",
        title: "Winter Break Schedule Announced",
        desc: "Campus will remain closed from Dec 20 to Jan 5 for winter break. Hostels will be open for students who cannot travel.",
        icon: "event",
        iconBg: "bg-blue-500",
        catColor: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    },
    {
        category: "URGENT",
        time: "5 hours ago",
        title: "Final Exam Schedule Released",
        desc: "Detailed semester final exam timetable has been published. Check your registered courses for exam dates and venues.",
        icon: "assignment_late",
        iconBg: "bg-red-500",
        catColor: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    },
    {
        category: "EVENT",
        time: "1 day ago",
        title: "Annual Cultural Fest - Tarang 2024",
        desc: "Register for competitions, performances, and workshops. Early bird registrations close this Friday.",
        icon: "celebration",
        iconBg: "bg-purple-500",
        catColor: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    },
    {
        category: "NOTICE",
        time: "2 days ago",
        title: "Library Timings Extended",
        desc: "During exam season, the central library will remain open till 11 PM on weekdays and 9 PM on weekends.",
        icon: "menu_book",
        iconBg: "bg-green-500",
        catColor: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    },
];

const leaves = [
    { type: "Sick Leave", dates: "Oct 12 - Oct 14, 2023", status: "APPROVED", icon: "medical_services", statusColor: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" },
    { type: "Duty Leave", dates: "Oct 20, 2023", status: "PENDING", icon: "work", statusColor: "text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30" },
    { type: "General Leave", dates: "Sep 05 - Sep 10, 2023", status: "APPROVED", icon: "event_busy", statusColor: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" },
];

export default function NoticeAndLeave() {
    const navigate = useNavigate();
    const [expandedNotice, setExpandedNotice] = useState<number | null>(null);

    return (
        <MobileLayout>
            <PageHeader title="Notice Board" />

            <div className="px-4 py-5">
                {/* Notice Board */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold dark:text-white">Notice Board</h3>
                    <button className="text-primary text-sm font-semibold">View All</button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 mb-6 snap-x">
                    {notices.map((n, i) => (
                        <div
                            key={i}
                            onClick={() => setExpandedNotice(expandedNotice === i ? null : i)}
                            className="min-w-[280px] rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shrink-0 snap-center cursor-pointer hover:border-primary/30 transition-all active:scale-[0.98]"
                        >
                            {/* Icon-based header instead of broken image */}
                            <div className={`h-32 ${n.iconBg} flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="absolute -top-8 -right-8 size-24 rounded-full bg-white/10" />
                                <div className="absolute -bottom-6 -left-6 size-20 rounded-full bg-white/5" />
                                <span className="material-symbols-outlined text-white text-5xl relative z-10">{n.icon}</span>
                            </div>
                            <div className="p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${n.catColor}`}>{n.category}</span>
                                    <span className="text-[10px] text-[#637388]">{n.time}</span>
                                </div>
                                <h4 className="font-bold text-sm leading-tight dark:text-white">{n.title}</h4>
                                <p className={`text-xs text-[#637388] mt-1 ${expandedNotice === i ? "" : "line-clamp-2"}`}>{n.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Leave Management */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold dark:text-white">Leave Management</h3>
                    <button className="text-primary text-sm font-semibold">History</button>
                </div>
                <div className="flex flex-col gap-3 mb-6">
                    {leaves.map((l, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">{l.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium dark:text-white">{l.type}</p>
                                <p className="text-xs text-[#637388]">{l.dates}</p>
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${l.statusColor}`}>{l.status}</span>
                        </div>
                    ))}
                </div>

                {/* Apply Now CTA */}
                <div className="rounded-2xl bg-primary p-5 text-white relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
                    <h3 className="text-lg font-bold mb-1 relative z-10">Need a break?</h3>
                    <p className="text-sm text-white/80 mb-3 relative z-10">Submit your leave application in seconds.</p>
                    <button
                        onClick={() => navigate("/apply-leave")}
                        className="bg-white text-primary font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors relative z-10"
                    >
                        Apply Now
                    </button>
                </div>
            </div>

            {/* FAB */}
            <button
                onClick={() => navigate("/apply-leave")}
                className="fixed bottom-24 right-4 size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-40"
            >
                <span className="material-symbols-outlined text-2xl">add</span>
            </button>
        </MobileLayout>
    );
}
