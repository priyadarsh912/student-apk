import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const tabs = ["Upcoming", "Recent Results", "Drafts"];

const upcomingExams = [
    {
        type: "MIDTERM", typeColor: "bg-primary/10 text-primary",
        title: "Data Structures Midterm", course: "CS201 - Computer Science",
        date: "OCT", day: "24",
        time: "10:00 AM - 12:00 PM", location: "Main Hall B",
    },
    {
        type: "QUIZ", typeColor: "bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400",
        title: "Advanced Calculus Quiz 3", course: "MATH302 - Mathematics",
        date: "OCT", day: "28",
        time: "02:30 PM - 03:30 PM", location: "Room 402",
    },
];

const recentResults = [
    { title: "Principles of Marketing", course: "BUS101 • Graduated", avg: "82%" },
    { title: "Inorganic Chemistry II", course: "CHEM205 • Final Exam", avg: "75%" },
];

export default function ExamManagement() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <MobileLayout>
            <PageHeader
                title="Exams"
                rightAction={
                    <button className="text-[#637388] dark:text-gray-400">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                }
            />

            <div className="px-4 py-4">
                {/* Search */}
                <div className="flex w-full items-stretch rounded-xl h-11 bg-white dark:bg-[#181b22] border border-gray-200 dark:border-[#252830] focus-within:border-primary/50 shadow-sm transition-all mb-4">
                    <div className="text-[#637388] dark:text-gray-400 flex items-center justify-center pl-3">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </div>
                    <input className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] dark:placeholder:text-gray-500 px-3 text-sm dark:text-white" placeholder="Search exams..." />
                </div>

                {/* Tabs */}
                <div className="flex gap-0 border-b border-gray-200 dark:border-[#252830] mb-6">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === i
                                ? "text-primary border-b-2 border-primary"
                                : "text-[#637388] dark:text-gray-400"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 0 && (
                    <>
                        <h3 className="font-bold mb-4 dark:text-white">Upcoming Exams (4)</h3>
                        <div className="flex flex-col gap-4">
                            {upcomingExams.map((exam, i) => (
                                <div key={i} className="rounded-xl p-4 bg-white dark:bg-[#181b22] border border-gray-100 dark:border-[#252830]">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${exam.typeColor}`}>
                                            {exam.type}
                                        </span>
                                        <div className="flex flex-col items-center bg-primary text-white rounded-lg px-3 py-1.5">
                                            <span className="text-[10px] font-bold uppercase">{exam.date}</span>
                                            <span className="text-lg font-bold leading-tight">{exam.day}</span>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1 dark:text-white">{exam.title}</h4>
                                    <p className="text-xs text-[#637388] dark:text-gray-400 mb-3">Course: {exam.course}</p>
                                    <div className="flex items-center gap-4 text-xs text-[#637388] dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {exam.time}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">location_on</span>
                                            {exam.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 1 && (
                    <>
                        <h3 className="font-bold mb-4 dark:text-white">Recent Results</h3>
                        <div className="flex flex-col gap-4">
                            {recentResults.map((r, i) => (
                                <div key={i} className="rounded-xl p-4 bg-white dark:bg-[#181b22] border border-gray-100 dark:border-[#252830]">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-bold text-sm dark:text-white">{r.title}</h4>
                                            <p className="text-xs text-[#637388] dark:text-gray-400">Course: {r.course}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-[#637388] dark:text-gray-500 uppercase font-bold">Class Avg</p>
                                            <p className="text-lg font-bold text-primary">{r.avg}</p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-2 py-2.5 rounded-lg bg-gray-50 dark:bg-[#14161c] border border-gray-200 dark:border-[#252830] text-sm font-medium text-primary flex items-center justify-center gap-1 hover:bg-gray-100 dark:hover:bg-[#1e2028] transition-colors">
                                        View Detailed Report
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 2 && (
                    <div className="flex flex-col items-center justify-center py-16 text-[#637388] dark:text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2">edit_note</span>
                        <p className="text-sm">No draft exams</p>
                    </div>
                )}
            </div>

            {/* FAB */}
            <button className="fixed bottom-24 right-4 size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-40">
                <span className="material-symbols-outlined text-2xl">add</span>
            </button>
        </MobileLayout>
    );
}
