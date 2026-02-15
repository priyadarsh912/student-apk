import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const days = [
    { day: "MON", date: 12 },
    { day: "TUE", date: 13 },
    { day: "WED", date: 14 },
    { day: "THU", date: 15 },
    { day: "FRI", date: 16 },
];

const events = [
    {
        time: "09:00",
        type: "LECTURE",
        title: "Computer Science",
        location: "Lab 4, West Wing",
        instructor: "Dr. Aris",
        duration: "90 min",
        typeColor: "bg-primary/10 text-primary",
    },
    {
        time: "11:00",
        type: "LECTURE",
        title: "Mathematics 101",
        location: "Room 12, Level 2",
        instructor: "",
        duration: "90 min",
        typeColor: "bg-primary/10 text-primary",
    },
    {
        time: "14:00",
        type: "FINAL EXAM",
        title: "World History",
        location: "Main Hall A",
        instructor: "",
        duration: "2 Hours",
        typeColor: "bg-red-500 text-white",
        urgent: true,
    },
];

export default function AcademicSchedule() {
    const [selectedDay, setSelectedDay] = useState(1);

    return (
        <MobileLayout>
            <PageHeader
                title="Academic Schedule"
                rightAction={
                    <button className="text-primary">
                        <span className="material-symbols-outlined">calendar_add_on</span>
                    </button>
                }
            />

            {/* Month Header */}
            <div className="px-4 pt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold dark:text-white">October 2023</h2>
                    <div className="flex gap-2">
                        <button className="size-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#637388] dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-lg">chevron_left</span>
                        </button>
                        <button className="size-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#637388] dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Day Selector */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    {days.map((d, i) => (
                        <button
                            key={d.day}
                            onClick={() => setSelectedDay(i)}
                            className={`flex flex-col items-center justify-center min-w-[56px] h-[72px] rounded-xl font-medium transition-all ${selectedDay === i
                                ? "bg-primary text-white shadow-lg"
                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                                }`}
                        >
                            <span className="text-xs font-bold uppercase">{d.day}</span>
                            <span className="text-lg font-bold mt-0.5">{d.date}</span>
                            {selectedDay === i && <div className="size-1.5 rounded-full bg-white mt-1" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Agenda */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-t-3xl mt-4 px-4 pt-6 pb-4 min-h-[400px]">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold dark:text-white">Today's Agenda</h3>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">3 Events</span>
                </div>

                <div className="flex flex-col gap-4">
                    {events.map((event, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-sm font-bold text-[#637388]">{event.time}</span>
                                {i < events.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mt-2" />}
                            </div>
                            <div className={`flex-1 rounded-xl p-4 ${event.urgent ? "bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800" : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${event.typeColor}`}>
                                        {event.type}
                                    </span>
                                    <span className="text-xs text-[#637388]">{event.duration}</span>
                                </div>
                                <h4 className="font-bold text-sm mb-2 dark:text-white">{event.title}</h4>
                                <div className="flex items-center gap-3 text-xs text-[#637388]">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {event.location}
                                    </div>
                                    {event.instructor && (
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">person</span>
                                            {event.instructor}
                                        </div>
                                    )}
                                </div>
                                {event.urgent && (
                                    <div className="flex justify-end mt-1">
                                        <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-lg">priority_high</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
