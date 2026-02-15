import { useState, useMemo } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigate } from "react-router-dom";

const weekDays = [
    { day: "MON", date: 13 },
    { day: "TUE", date: 14 },
    { day: "WED", date: 15, active: true },
    { day: "THU", date: 16 },
    { day: "FRI", date: 17 },
    { day: "SAT", date: 18, weekend: true },
    { day: "SUN", date: 19 },
];

const upcomingClasses = [
    { subject: "Data Structures & Algo", code: "CS-302", time: "10:00 AM", day: "Thu, Oct 19", room: "LH-101", instructor: "Dr. Miller" },
    { subject: "General Proficiency", code: "HU-101", time: "11:30 AM", day: "Thu, Oct 19", room: "LH-203", instructor: "Prof. Sarah" },
    { subject: "Digital Electronics", code: "EC-201", time: "2:00 PM", day: "Thu, Oct 19", room: "Lab-05", instructor: "Dr. Gupta" },
    { subject: "Data Structures & Algo", code: "CS-302", time: "9:00 AM", day: "Fri, Oct 20", room: "LH-101", instructor: "Dr. Miller" },
    { subject: "Mathematics II", code: "MA-201", time: "11:00 AM", day: "Fri, Oct 20", room: "LH-305", instructor: "Prof. Kumar" },
    { subject: "General Proficiency", code: "HU-101", time: "2:00 PM", day: "Fri, Oct 20", room: "LH-203", instructor: "Prof. Sarah" },
    { subject: "Digital Electronics", code: "EC-201", time: "10:00 AM", day: "Mon, Oct 23", room: "Lab-05", instructor: "Dr. Gupta" },
    { subject: "Data Structures & Algo", code: "CS-302", time: "11:30 AM", day: "Mon, Oct 23", room: "LH-101", instructor: "Dr. Miller" },
    { subject: "Mathematics II", code: "MA-201", time: "9:00 AM", day: "Tue, Oct 24", room: "LH-305", instructor: "Prof. Kumar" },
    { subject: "General Proficiency", code: "HU-101", time: "11:00 AM", day: "Tue, Oct 24", room: "LH-203", instructor: "Prof. Sarah" },
    { subject: "Digital Electronics", code: "EC-201", time: "2:00 PM", day: "Tue, Oct 24", room: "Lab-05", instructor: "Dr. Gupta" },
    { subject: "Data Structures & Algo", code: "CS-302", time: "10:00 AM", day: "Wed, Oct 25", room: "LH-101", instructor: "Dr. Miller" },
    { subject: "Mathematics II", code: "MA-201", time: "11:30 AM", day: "Wed, Oct 25", room: "LH-305", instructor: "Prof. Kumar" },
    { subject: "General Proficiency", code: "HU-101", time: "2:00 PM", day: "Wed, Oct 25", room: "LH-203", instructor: "Prof. Sarah" },
    { subject: "Digital Electronics", code: "EC-201", time: "9:00 AM", day: "Thu, Oct 26", room: "Lab-05", instructor: "Dr. Gupta" },
];

// Base attendance data
const BASE_TOTAL = 162;
const BASE_PRESENT = 135;
const BASE_ABSENT = 27;
const BASE_LEAVE = 13;
const BASE_PERCENTAGE = (BASE_PRESENT / BASE_TOTAL) * 100; // 83.33%

export default function AttendancePredictor() {
    const navigate = useNavigate();
    const [sliderValue, setSliderValue] = useState(5);

    // Dynamic calculations based on slider
    const prediction = useMemo(() => {
        const newTotal = BASE_TOTAL + sliderValue;
        const attendAllPresent = BASE_PRESENT + sliderValue;
        const attendAllPct = (attendAllPresent / newTotal * 100);
        const missAllPct = (BASE_PRESENT / newTotal * 100);

        return {
            newTotal,
            attendAllPresent,
            attendAllPct: attendAllPct.toFixed(2),
            missAllPct: missAllPct.toFixed(2),
            // For the donut chart — show "if you attend all" scenario
            attendAllAbsent: BASE_ABSENT,
            missAllAbsent: BASE_ABSENT + sliderValue,
        };
    }, [sliderValue]);

    // Donut chart is dynamic — shows predicted attendance if user attends all upcoming classes
    const donutPct = Number(prediction.attendAllPct);
    const donutDash = donutPct * 3.14;
    const bonusPct = donutPct - BASE_PERCENTAGE;
    const bonusDash = bonusPct > 0 ? bonusPct * 3.14 : 0;
    const isAbove75 = donutPct >= 75;
    const aboveDiff = (donutPct - 75).toFixed(2);

    return (
        <MobileLayout>
            <PageHeader title="Attendance Predictor" />

            <div className="px-4 py-6">
                {/* Donut Chart — dynamically updates */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative size-44">
                        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="10" className="text-gray-200 dark:text-gray-700" />
                            <circle
                                cx="60" cy="60" r="50" fill="none"
                                stroke="#1c74e9" strokeWidth="10"
                                strokeDasharray={`${(BASE_PERCENTAGE * 3.14)} ${100 * 3.14}`}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />
                            {bonusDash > 0 && (
                                <circle
                                    cx="60" cy="60" r="50" fill="none"
                                    stroke="#22c55e" strokeWidth="10"
                                    strokeDasharray={`${bonusDash} ${100 * 3.14}`}
                                    strokeDashoffset={`${-(BASE_PERCENTAGE * 3.14)}`}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                />
                            )}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-primary transition-all duration-300">{prediction.attendAllPct}%</span>
                            <span className="text-xs text-[#637388] font-medium uppercase tracking-wider">Predicted</span>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold mt-4 dark:text-white">Overall Attendance Status</h3>
                    <p className={`text-sm font-medium ${isAbove75 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                        {isAbove75 ? `Safe Zone (+${aboveDiff}% above 75%)` : `Danger Zone (${aboveDiff}% below 75%)`}
                    </p>
                    <p className="text-xs text-[#637388] mt-1">
                        Showing prediction if you attend next {sliderValue} class{sliderValue > 1 ? "es" : ""}
                    </p>
                </div>

                {/* Stats — dynamically update */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                        { label: "TOTAL", value: prediction.newTotal.toString(), color: "text-gray-800 dark:text-white" },
                        { label: "PRESENT", value: prediction.attendAllPresent.toString(), color: "text-primary" },
                        { label: "ABSENT", value: BASE_ABSENT.toString(), color: "text-red-500" },
                        { label: "LEAVE", value: BASE_LEAVE.toString(), color: "text-primary" },
                    ].map((s) => (
                        <div key={s.label} className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-300">
                            <p className="text-xs font-medium text-[#637388] uppercase tracking-wider">{s.label}</p>
                            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Sliding Attendance Predictor */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold dark:text-white">Predict Next Classes</h3>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{sliderValue} Classes</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="15"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-[#637388] mt-1 mb-4">
                        <span>1 CLASS</span>
                        <span>15 CLASSES</span>
                    </div>

                    {/* Prediction Result Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="rounded-xl p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-lg">trending_up</span>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400">If you attend all</p>
                            </div>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{prediction.attendAllPct}%</p>
                            <p className="text-[10px] text-green-600 dark:text-green-400 mt-0.5 font-medium">+{(Number(prediction.attendAllPct) - BASE_PERCENTAGE).toFixed(2)}% increase</p>
                        </div>
                        <div className="rounded-xl p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-lg">trending_down</span>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">If you miss all</p>
                            </div>
                            <p className="text-2xl font-bold text-red-500 dark:text-red-400">{prediction.missAllPct}%</p>
                            <p className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 font-medium">{(Number(prediction.missAllPct) - BASE_PERCENTAGE).toFixed(2)}% decrease</p>
                        </div>
                    </div>

                    {/* Upcoming Classes List */}
                    <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <p className="text-xs font-bold text-[#637388] uppercase tracking-wider">Upcoming {sliderValue} Classes</p>
                            <span className="material-symbols-outlined text-[#637388] text-lg">calendar_month</span>
                        </div>
                        <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
                            {upcomingClasses.slice(0, sliderValue).map((cls, i) => (
                                <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < sliderValue - 1 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}>
                                    <div className="flex flex-col items-center justify-center min-w-[36px]">
                                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                                        <div className={`size-2 rounded-full mt-0.5 ${i < sliderValue ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate dark:text-white">{cls.subject}</p>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                                            <span className="text-[11px] text-[#637388] flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-xs">schedule</span>
                                                {cls.time}
                                            </span>
                                            <span className="text-[11px] text-[#637388] flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-xs">location_on</span>
                                                {cls.room}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#637388] mt-0.5">{cls.day} • {cls.instructor}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded whitespace-nowrap">{cls.code}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Your Subjects */}
                <h3 className="text-lg font-bold mb-3 dark:text-white">Your Subjects</h3>
                <div className="flex flex-col gap-3 mb-8">
                    <div
                        onClick={() => navigate("/attendance/data-structures")}
                        className="rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-primary/20 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-sm font-bold dark:text-white">Data Structures & Algo</p>
                                <p className="text-xs text-[#637388]">CS-302 • Dr. Miller</p>
                            </div>
                            <span className="text-lg font-bold text-primary">85%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined text-sm">info</span>
                            Attend 3 more classes to reach 90%
                        </div>
                    </div>
                    <div className="rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-sm font-bold dark:text-white">General Proficiency</p>
                                <p className="text-xs text-[#637388]">HU-101 • Prof. Sarah</p>
                            </div>
                            <span className="text-lg font-bold text-orange-500 dark:text-orange-400">72%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-orange-400 rounded-full" style={{ width: "72%" }} />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                            <span className="material-symbols-outlined text-sm">warning</span>
                            Attend 2 classes to cross 75% limit
                        </div>
                    </div>
                </div>

                {/* Plan Your Attendance */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold dark:text-white">Plan Your Attendance</h3>
                        <span className="text-sm text-[#637388]">May 2024</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {weekDays.map((d) => (
                            <button
                                key={d.day}
                                className={`flex flex-col items-center justify-center min-w-[44px] h-[56px] rounded-lg font-medium text-xs ${d.active
                                    ? "bg-primary text-white"
                                    : d.weekend
                                        ? "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border border-red-100 dark:border-red-800"
                                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                                    }`}
                            >
                                <span className="text-[10px] font-bold">{d.day}</span>
                                <span className="text-sm font-bold mt-0.5">{d.date}</span>
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-[#637388] mt-2">Tap a date to toggle: Present (Blue), Absent (Red), Leave (Yellow)</p>
                </div>
            </div>
        </MobileLayout>
    );
}
