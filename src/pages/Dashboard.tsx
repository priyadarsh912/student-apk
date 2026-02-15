import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";
import { BottomNavBar } from "@/components/layout/BottomNavBar";

/* ───────── shared data ───────── */
const quickAccessRow1 = [
    { label: "Messages", icon: "chat", route: "/fees" },
    { label: "Attendance", icon: "monitoring", route: "/attendance" },
    { label: "Schedule", icon: "calendar_month", route: "/academic-schedule" },
    { label: "Leave", icon: "event_busy", route: "/apply-leave" },
];
const quickAccessRow2 = [
    { label: "Notice Board", icon: "campaign", route: "/notices" },
    { label: "Fees", icon: "receipt_long", route: "/fees" },
    { label: "Hostel & Mess", icon: "apartment", route: "/campus-dining" },
    { label: "Digital ID", icon: "badge", route: "/student-profile" },
];

/* ── Real attendance data from the app screenshots (exact values) ── */
const subjectsWithPct = [
    { name: "General Proficiency-1", code: "25GPT-121", credits: 1, leaves: 0, attended: 0, total: 0, pct: 0, needed: 0, canSkip: 0, isSafe: true, slug: "general-proficiency" },
    { name: "Data Structures and Algorithms", code: "25CSH-103", credits: 4, leaves: 0, attended: 23, total: 29, pct: 79, needed: 32, canSkip: 0, isSafe: false, slug: "dsa" },
    { name: "Emerging and Disruptive Technologies Workshop", code: "25ECP-103", credits: 2, leaves: 2, attended: 16, total: 20, pct: 80, needed: 21, canSkip: 0, isSafe: false, slug: "edt-workshop" },
    { name: "Communication Skills-II", code: "25PCP-111", credits: 1, leaves: 2, attended: 12, total: 15, pct: 80, needed: 16, canSkip: 0, isSafe: false, slug: "communication" },
    { name: "APTITUDE-I", code: "25TDT-152", credits: 1, leaves: 0, attended: 8, total: 10, pct: 80, needed: 11, canSkip: 0, isSafe: false, slug: "aptitude-i" },
    { name: "Mathematics-II", code: "25SMT-198", credits: 5, leaves: 4, attended: 19, total: 23, pct: 83, needed: 17, canSkip: 0, isSafe: false, slug: "math-ii" },
    { name: "Engineering Physics", code: "25SPH-141", credits: 4, leaves: 4, attended: 21, total: 25, pct: 84, needed: 16, canSkip: 0, isSafe: false, slug: "engineering-physics" },
    { name: "Digital Electronics", code: "25ECH-101", credits: 4, leaves: 0, attended: 22, total: 26, pct: 85, needed: 15, canSkip: 0, isSafe: false, slug: "digital-electronics" },
    { name: "Programming Practice", code: "25CSP-105", credits: 1, leaves: 1, attended: 15, total: 15, pct: 100, needed: 0, canSkip: 1, isSafe: true, slug: "programming-practice" },
];

const weekDays = ["TUE", "WED", "THU", "FRI", "SAT"];

const timetableData: Record<string, { time: string; subject: string; room: string; type: string; instructor: string }[]> = {
    TUE: [
        { time: "09:30 - 10:20", subject: "Communication", room: "Block-C1-712-A", type: "PRACTICAL", instructor: "Minakshi Banger" },
        { time: "11:20 - 12:10", subject: "Data Structures & Algorithms (25CSH-103)", room: "Block-C1-706", type: "PRACTICAL", instructor: "Suryakanta" },
        { time: "12:10 - 01:00", subject: "Data Structures & Algorithms (25CSH-103)", room: "Block-C1-706", type: "PRACTICAL", instructor: "Suryakanta" },
        { time: "01:55 - 02:45", subject: "Digital Electronics (25ECH-101)", room: "Block-C1-415", type: "LECTURE", instructor: "Sachin" },
        { time: "02:45 - 03:35", subject: "Data Structures & Algorithms (25CSH-103)", room: "Block-C1-415", type: "LECTURE", instructor: "Soumen Maity" },
        { time: "03:35 - 04:25", subject: "Mathematics-II (25SMT-198)", room: "Block-C1-415", type: "LECTURE", instructor: "Mamta Devi" },
    ],
    WED: [
        { time: "09:30 - 10:20", subject: "Mathematics-II (25SMT-198)", room: "Block-C1-711", type: "LECTURE", instructor: "Mamta Devi" },
        { time: "10:20 - 11:10", subject: "Digital Electronics (25ECH-101)", room: "Block-C1-711", type: "LECTURE", instructor: "Sachin" },
        { time: "11:20 - 12:10", subject: "Aptitude-I (25TDT-152)", room: "Block-C1-711", type: "TUTORIAL", instructor: "Yogash" },
        { time: "12:10 - 01:00", subject: "Aptitude-I (25TDT-152)", room: "Block-C1-711", type: "TUTORIAL", instructor: "Yogash" },
        { time: "01:55 - 02:45", subject: "Data Structures & Algorithms (25CSH-103)", room: "Block-C1-715", type: "LECTURE", instructor: "Soumen Maity" },
        { time: "02:45 - 03:35", subject: "Programming Practice (25CSP-105)", room: "Block-C1-303", type: "PRACTICAL", instructor: "Jayashree Mohanty" },
        { time: "03:35 - 04:25", subject: "Programming Practice (25CSP-105)", room: "Block-C1-303", type: "PRACTICAL", instructor: "Jayashree Mohanty" },
    ],
    THU: [
        { time: "09:30 - 10:20", subject: "Data Structures & Algorithms (25CSH-103)", room: "Block-C1-611", type: "PRACTICAL", instructor: "Suryakanta" },
        { time: "10:20 - 11:10", subject: "Data Structures & Algorithms (25CSH-103)", room: "Block-C1-611", type: "PRACTICAL", instructor: "Suryakanta" },
        { time: "11:20 - 12:10", subject: "Emerging & Disruptive Tech Workshop (25ECP-103)", room: "Block-C1-705", type: "PRACTICAL", instructor: "Khushdeep Kaur" },
        { time: "12:10 - 01:00", subject: "Emerging & Disruptive Tech Workshop (25ECP-103)", room: "Block-C1-705", type: "PRACTICAL", instructor: "Khushdeep Kaur" },
        { time: "01:55 - 02:45", subject: "Engineering Physics (25SPH-141)", room: "Block-C1-412", type: "LECTURE", instructor: "Anu Kapoor" },
        { time: "02:45 - 03:35", subject: "Digital Electronics (25ECH-101)", room: "Block-C1-606-A", type: "PRACTICAL", instructor: "Sachin" },
        { time: "03:35 - 04:25", subject: "Digital Electronics (25ECH-101)", room: "Block-C1-606-A", type: "PRACTICAL", instructor: "Sachin" },
    ],
    FRI: [
        { time: "09:30 - 10:20", subject: "Emerging & Disruptive Tech Workshop (25ECP-103)", room: "Block-C1-705", type: "PRACTICAL", instructor: "Khushdeep Kaur" },
        { time: "10:20 - 11:10", subject: "Emerging & Disruptive Tech Workshop (25ECP-103)", room: "Block-C1-705", type: "PRACTICAL", instructor: "Khushdeep Kaur" },
        { time: "11:20 - 12:10", subject: "Engineering Physics (25SPH-141)", room: "Block-C1-516-A", type: "LECTURE", instructor: "Anu Kapoor" },
        { time: "01:05 - 01:55", subject: "Engineering Physics (25SPH-141)", room: "Block-C1-606", type: "PRACTICAL", instructor: "Anu Kapoor" },
        { time: "01:55 - 02:45", subject: "Engineering Physics (25SPH-141)", room: "Block-C1-606", type: "PRACTICAL", instructor: "Anu Kapoor" },
        { time: "03:35 - 04:25", subject: "Mathematics-II (25SMT-198)", room: "Block-C1-406", type: "TUTORIAL", instructor: "Mamta Devi" },
    ],
    SAT: [
        { time: "09:30 - 10:20", subject: "Programming Practice (25CSP-105)", room: "Block-C1-412", type: "TUTORIAL", instructor: "Jayashree Mohanty" },
        { time: "10:20 - 11:10", subject: "Mathematics-II (25SMT-198)", room: "Block-C1-412", type: "TUTORIAL", instructor: "Mamta Devi" },
        { time: "11:20 - 12:10", subject: "Engineering Physics (25SPH-141)", room: "Block-C1-412", type: "LECTURE", instructor: "Anu Kapoor" },
        { time: "01:05 - 01:55", subject: "Communication", room: "Block-C1-504", type: "PRACTICAL", instructor: "Minakshi Banger" },
        { time: "01:55 - 02:45", subject: "Communication", room: "Block-C1-504", type: "PRACTICAL", instructor: "Minakshi Banger" },
        { time: "02:45 - 03:35", subject: "Digital Electronics (25ECH-101)", room: "Block-C1-715", type: "LECTURE", instructor: "Sachin" },
        { time: "03:35 - 04:25", subject: "Mathematics-II (25SMT-198)", room: "Block-C1-715", type: "LECTURE", instructor: "Mamta Devi" },
    ],
};

/* Daily mess menu */
const dailyMessMenu: Record<number, { meal: string; time: string; icon: string; items: string[] }[]> = {
    0: [
        { meal: "Breakfast", time: "08:30 - 09:30", icon: "wb_sunny", items: ["Chole Bhature", "Tea • Pickle • Onion Masala"] },
        { meal: "Lunch", time: "12:00 - 01:45", icon: "light_mode", items: ["Veg Biryani • Mix Raita", "Jeera Aloo • Chapati • Salad"] },
        { meal: "Snacks", time: "04:30 - 05:15", icon: "cookie", items: ["Samosa / Namkeen • Tea"] },
        { meal: "Dinner", time: "07:30 - 09:00", icon: "dark_mode", items: ["Egg Bhurji • Paneer Makhani", "Rice • Chapati • Salad"] },
    ],
    1: [
        { meal: "Breakfast", time: "07:30 - 09:00", icon: "wb_sunny", items: ["Coleslaw Sandwich • Cornflakes", "Tea • Milk"] },
        { meal: "Lunch", time: "12:00 - 01:45", icon: "light_mode", items: ["Panchmel • Aloo Gobhi", "Rice • Chapati • Boondi Raita"] },
        { meal: "Snacks", time: "04:30 - 05:15", icon: "cookie", items: ["Maggi / Pasta • Tea"] },
        { meal: "Dinner", time: "07:30 - 09:00", icon: "dark_mode", items: ["Sabzi • Dal • Rice", "Chapati • Salad"] },
    ],
    2: [
        { meal: "Breakfast", time: "07:30 - 09:00", icon: "wb_sunny", items: ["Idli • Sambhar • Coconut Chutney", "Tea • Milk"] },
        { meal: "Lunch", time: "12:00 - 01:45", icon: "light_mode", items: ["Rajma Masala • Aloo Capsicum", "Rice • Chapati • Pickle"] },
        { meal: "Snacks", time: "04:30 - 05:15", icon: "cookie", items: ["Bread Pakora • Tea"] },
        { meal: "Dinner", time: "07:30 - 09:00", icon: "dark_mode", items: ["Chicken Curry / Paneer Butter", "Rice • Chapati • Salad"] },
    ],
    3: [
        { meal: "Breakfast", time: "07:30 - 09:00", icon: "wb_sunny", items: ["Pav Bhaji • Pickle", "Tea • Milk"] },
        { meal: "Lunch", time: "12:00 - 01:45", icon: "light_mode", items: ["White Chana • Aloo Gajar Methi", "Rice • Chapati • Raita"] },
        { meal: "Snacks", time: "04:30 - 05:15", icon: "cookie", items: ["Chips / B-Pakora • Tea"] },
        { meal: "Dinner", time: "07:30 - 09:00", icon: "dark_mode", items: ["Matar Paneer • Murgh Kolapuri", "Rice • Chapati • Salad"] },
    ],
    4: [
        { meal: "Breakfast", time: "07:30 - 09:00", icon: "wb_sunny", items: ["Methi Parantha • Curd", "Tea • Pickle"] },
        { meal: "Lunch", time: "12:00 - 01:45", icon: "light_mode", items: ["Nutri Matar • Aloo Kadhi", "Rice • Chapati • Fryums"] },
        { meal: "Snacks", time: "04:30 - 05:15", icon: "cookie", items: ["Aloo Bonda • Tea"] },
        { meal: "Dinner", time: "07:30 - 09:00", icon: "dark_mode", items: ["Mix Veg • Egg Curry / Paneer", "Rice • Chapati • Salad"] },
    ],
    5: [
        { meal: "Breakfast", time: "07:30 - 09:00", icon: "wb_sunny", items: ["Poori • Aloo Sabzi", "Tea • Milk"] },
        { meal: "Lunch", time: "12:00 - 01:45", icon: "light_mode", items: ["Kadhi Pakoda • Veg Pulao", "Rice • Chapati • Raita"] },
        { meal: "Snacks", time: "04:30 - 05:15", icon: "cookie", items: ["Veg Cutlet / Momos • Tea"] },
        { meal: "Dinner", time: "07:30 - 09:00", icon: "dark_mode", items: ["Dal Makhani • Biryani", "Chapati • Salad • Kheer"] },
    ],
    6: [
        { meal: "Breakfast", time: "07:30 - 09:00", icon: "wb_sunny", items: ["Aloo Parantha • Curd • Pickle", "Tea • Milk"] },
        { meal: "Lunch", time: "12:00 - 01:45", icon: "light_mode", items: ["Chole • Jeera Rice • Boondi Raita", "Chapati • Salad • Pickle"] },
        { meal: "Snacks", time: "04:30 - 05:15", icon: "cookie", items: ["Samosa • Tea"] },
        { meal: "Dinner", time: "07:30 - 09:00", icon: "dark_mode", items: ["Chicken / Paneer Tikka Masala", "Rice • Naan • Salad • Gulab Jamun"] },
    ],
};

function getCurrentMeal(dayMenus: { meal: string; time: string; icon: string; items: string[] }[]) {
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const ranges = [
        { meal: "Breakfast", start: 7 * 60 + 30, end: 9 * 60 + 30 },
        { meal: "Lunch", start: 12 * 60, end: 13 * 60 + 45 },
        { meal: "Snacks", start: 16 * 60 + 30, end: 17 * 60 + 15 },
        { meal: "Dinner", start: 19 * 60 + 30, end: 21 * 60 },
    ];
    for (const r of ranges) {
        if (nowMins >= r.start && nowMins <= r.end) {
            const found = dayMenus.find((m) => m.meal === r.meal);
            if (found) return { ...found, status: "now" as const };
        }
    }
    for (const r of ranges) {
        if (nowMins < r.start) {
            const found = dayMenus.find((m) => m.meal === r.meal);
            if (found) return { ...found, status: "upcoming" as const };
        }
    }
    return { ...dayMenus[dayMenus.length - 1], status: "upcoming" as const };
}

const resultData = [
    { subject: "Data Structures & Algorithms", code: "25CSH-103", internal: 38, external: 52, total: 90, grade: "A", credits: 4 },
    { subject: "Mathematics-II", code: "25SMT-198", internal: 36, external: 48, total: 84, grade: "A", credits: 5 },
    { subject: "Digital Electronics", code: "25ECH-101", internal: 32, external: 44, total: 76, grade: "B+", credits: 4 },
    { subject: "Engineering Physics", code: "25SPH-141", internal: 28, external: 38, total: 66, grade: "B", credits: 4 },
    { subject: "Communication Skills-II", code: "25PCP-111", internal: 40, external: 45, total: 85, grade: "A", credits: 1 },
    { subject: "Programming Practice", code: "25CSP-105", internal: 35, external: 42, total: 77, grade: "B+", credits: 1 },
    { subject: "Aptitude-I", code: "25TDT-152", internal: 30, external: 40, total: 70, grade: "B", credits: 1 },
    { subject: "EDT Workshop", code: "25ECP-103", internal: 38, external: 40, total: 78, grade: "B+", credits: 2 },
];

const TAB_NAMES = ["Home", "Timetable", "Attendance", "Result"] as const;

/** Green dot columns — 5 dots proportional to pct */
function AttendanceDots({ pct }: { pct: number }) {
    const filled = Math.round((pct / 100) * 5);
    return (
        <div className="flex flex-col gap-[3px] items-center">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className={`size-[6px] rounded-full transition-colors ${i < filled ? "bg-emerald-500" : "bg-gray-600"
                        }`}
                />
            ))}
        </div>
    );
}

/* ───────── main component ───────── */
export default function Dashboard() {
    const navigate = useNavigate();
    const { settings, setTheme } = useSettings();
    const isDark = settings.theme === "dark" || (settings.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const toggleTheme = () => setTheme(isDark ? "light" : "dark");

    const [activeTab, setActiveTab] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);
    const isSwiping = useRef(false);

    const handleTouchStart = useCallback((e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; touchDeltaX.current = 0; isSwiping.current = true; }, []);
    const handleTouchMove = useCallback((e: React.TouchEvent) => { if (!isSwiping.current) return; touchDeltaX.current = e.touches[0].clientX - touchStartX.current; }, []);
    const handleTouchEnd = useCallback(() => {
        if (!isSwiping.current) return; isSwiping.current = false;
        if (touchDeltaX.current < -60 && activeTab < 3) setActiveTab((p) => p + 1);
        else if (touchDeltaX.current > 60 && activeTab > 0) setActiveTab((p) => p - 1);
    }, [activeTab]);

    const [showMoreApps, setShowMoreApps] = useState(false);
    const [upNextCard, setUpNextCard] = useState(0);

    const jsDay = new Date().getDay();
    const todayIdx = jsDay >= 2 && jsDay <= 6 ? jsDay - 2 : 0;
    const [selectedTTDay, setSelectedTTDay] = useState(todayIdx);

    const [attendFilter, setAttendFilter] = useState<"all" | "low" | "safe">("all");
    const filteredSubjects = useMemo(() => {
        if (attendFilter === "low") return subjectsWithPct.filter((s) => !s.isSafe);
        if (attendFilter === "safe") return subjectsWithPct.filter((s) => s.isSafe);
        return subjectsWithPct;
    }, [attendFilter]);

    const overallPct = useMemo(() => {
        const a = subjectsWithPct.reduce((t, s) => t + s.attended, 0);
        const b = subjectsWithPct.reduce((t, s) => t + s.total, 0);
        return b === 0 ? 0 : Math.round((a / b) * 100);
    }, []);

    const [showGrades, setShowGrades] = useState(true);
    const sgpa = useMemo(() => {
        const gp: Record<string, number> = { "A+": 10, A: 9, "A-": 8.5, "B+": 8, B: 7, "B-": 6.5, C: 6 };
        const tc = resultData.reduce((a, r) => a + r.credits, 0);
        const ws = resultData.reduce((a, r) => a + (gp[r.grade] || 7) * r.credits, 0);
        return (ws / tc).toFixed(2);
    }, []);

    const todayMenu = dailyMessMenu[jsDay] || dailyMessMenu[0];
    const currentMeal = useMemo(() => getCurrentMeal(todayMenu), [todayMenu]);

    const nextClass = useMemo(() => {
        const dayKey = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][jsDay];
        const c = timetableData[dayKey] || [];
        if (!c.length) return null;
        const now = new Date();
        const nowMins = now.getHours() * 60 + now.getMinutes();
        for (const cls of c) {
            const [startStr] = cls.time.split(" - ");
            const [hh, mm] = startStr.split(":").map(Number);
            const startMins = hh < 8 ? (hh + 12) * 60 + mm : hh * 60 + mm;
            if (startMins > nowMins) return cls;
        }
        return c[c.length - 1];
    }, [jsDay]);

    /* ── Theme-aware base colors matching the screenshot ── */
    const bg = isDark ? "bg-[#0d0f14]" : "bg-[#f6f7f8]";
    const cardBg = isDark ? "bg-[#181b22]" : "bg-white";
    const cardBorder = isDark ? "border-[#252830]" : "border-gray-100";
    const subText = isDark ? "text-gray-400" : "text-[#637388]";

    return (
        <div className={`min-h-screen ${bg} max-w-md mx-auto relative`}>
            <div className="pb-24">
                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-5 pb-3">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/student-profile")} role="button">
                        <div className="size-12 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-sm shadow-blue-500/10">
                            <img alt={settings.profile.name} className="h-full w-full object-cover" src={settings.profile.avatar} />
                        </div>
                        <div>
                            <h1 className="text-base font-bold dark:text-white">{settings.profile.name}</h1>
                            <p className={`text-xs ${subText}`}>ID: {settings.profile.studentId}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={toggleTheme} className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-all hover:bg-blue-500/20 active:scale-95">
                            <span className="material-symbols-outlined text-[22px]">{isDark ? "light_mode" : "dark_mode"}</span>
                        </button>
                        <button onClick={() => navigate("/settings")} className={`flex size-10 items-center justify-center rounded-xl ${isDark ? "bg-[#1e2028] text-gray-400" : "bg-gray-100 text-[#637388]"} transition-all hover:opacity-80 active:scale-95`}>
                            <span className="material-symbols-outlined text-[22px]">settings</span>
                        </button>
                    </div>
                </div>

                {/* Tab indicator dots */}
                <div className="flex justify-center gap-1.5 mb-3">
                    {TAB_NAMES.map((_, i) => (
                        <button key={i} onClick={() => setActiveTab(i)} className={`h-1.5 rounded-full transition-all duration-300 ${activeTab === i ? "w-6 bg-blue-500" : `w-1.5 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}`} />
                    ))}
                </div>

                {/* Swipeable container */}
                <div ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${activeTab * 100}%)` }}>

                        {/* ─── TAB 0 : HOME ─── */}
                        <div className="w-full flex-shrink-0 px-4">
                            {/* Quick Access */}
                            <div className="mb-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-blue-400 text-[20px]">grid_view</span>
                                    <h2 className="text-sm font-bold dark:text-white">Quick Access</h2>
                                </div>
                                <div className="grid grid-cols-4 gap-2.5">
                                    {quickAccessRow1.map((item) => (
                                        <button key={item.label} onClick={() => navigate(item.route)} className="flex flex-col items-center gap-1.5 group">
                                            <div className={`size-12 rounded-xl ${isDark ? "bg-blue-500/10" : "bg-primary/10"} flex items-center justify-center ${isDark ? "text-blue-400" : "text-primary"} transition-all group-hover:scale-105 group-active:scale-95 shadow-sm`}>
                                                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                                            </div>
                                            <span className={`text-[10px] font-medium ${subText} text-center leading-tight`}>{item.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className={`grid grid-cols-4 gap-2.5 overflow-hidden transition-all duration-300 ${showMoreApps ? "max-h-24 opacity-100 mt-2.5" : "max-h-0 opacity-0 mt-0"}`}>
                                    {quickAccessRow2.map((item) => (
                                        <button key={item.label} onClick={() => navigate(item.route)} className="flex flex-col items-center gap-1.5 group">
                                            <div className={`size-12 rounded-xl ${isDark ? "bg-blue-500/10" : "bg-primary/10"} flex items-center justify-center ${isDark ? "text-blue-400" : "text-primary"} transition-all group-hover:scale-105 group-active:scale-95 shadow-sm`}>
                                                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                                            </div>
                                            <span className={`text-[10px] font-medium ${subText} text-center leading-tight`}>{item.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <button onClick={() => setShowMoreApps(!showMoreApps)} className={`w-full flex items-center justify-center gap-1 mt-2 py-1 text-xs font-medium ${subText} hover:text-blue-400 transition-colors`}>
                                    <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${showMoreApps ? "rotate-180" : ""}`}>expand_more</span>
                                    {showMoreApps ? "Show Less" : "More"}
                                </button>
                            </div>

                            {/* Up Next / Mess Menu */}
                            <div className="mb-5">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => setUpNextCard(0)} className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${upNextCard === 0 ? "bg-blue-500 text-white shadow-md shadow-blue-500/30" : `${isDark ? "bg-[#1e2028] text-gray-400" : "bg-gray-200 text-gray-500"}`}`}>
                                            <span className="material-symbols-outlined text-[12px]">schedule</span> Class
                                        </button>
                                        <button onClick={() => setUpNextCard(1)} className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${upNextCard === 1 ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" : `${isDark ? "bg-[#1e2028] text-gray-400" : "bg-gray-200 text-gray-500"}`}`}>
                                            <span className="material-symbols-outlined text-[12px]">restaurant</span> Mess
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-hidden rounded-2xl">
                                    <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${upNextCard * 100}%)` }}>
                                        {/* Card 1: Up Next Class */}
                                        <div className="w-full flex-shrink-0">
                                            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 p-4 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
                                                <div className="absolute -top-4 -right-4 size-16 rounded-full bg-white/10" />
                                                <div className="absolute bottom-0 right-2 size-10 rounded-full bg-white/5" />
                                                <div className="relative z-10">
                                                    <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">Up Next</span>
                                                    {nextClass ? (
                                                        <div className="mt-2">
                                                            <h3 className="text-base font-bold mb-2 leading-snug">{nextClass.subject.split("(")[0].trim()}</h3>
                                                            <div className="flex items-center gap-4 text-xs text-white/85">
                                                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>{nextClass.time}</div>
                                                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{nextClass.room}</div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 mt-2"><span className="material-symbols-outlined text-2xl">weekend</span><p className="text-sm font-medium">No more classes today!</p></div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card 2: Mess Menu */}
                                        <div className="w-full flex-shrink-0">
                                            <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-700 p-4 text-white relative overflow-hidden shadow-lg shadow-orange-500/20">
                                                <div className="absolute -top-4 -right-4 size-16 rounded-full bg-white/10" />
                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">{currentMeal.status === "now" ? "🔴 Now Serving" : "🕐 Up Next"}</span>
                                                        <span className="flex items-center gap-1 text-xs text-white/80"><span className="material-symbols-outlined text-sm">{currentMeal.icon}</span>{currentMeal.time}</span>
                                                    </div>
                                                    <h3 className="text-base font-bold mb-1.5">{currentMeal.meal}</h3>
                                                    {currentMeal.items.map((item, i) => (<p key={i} className="text-xs text-white/85 leading-relaxed">{item}</p>))}
                                                    <button onClick={() => navigate("/campus-dining")} className="mt-2 text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-full hover:bg-white/30 transition-all">Full Menu →</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subjects — matching the screenshot theme */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-bold dark:text-white">Your Subjects</h2>
                                    <button onClick={() => setActiveTab(2)} className="text-xs font-semibold text-blue-400">View All →</button>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    {subjectsWithPct.map((s) => {
                                        const circ = 2 * Math.PI * 18;
                                        const dash = (s.pct / 100) * circ;
                                        return (
                                            <div key={s.slug} className={`flex items-center gap-3 p-3.5 rounded-xl ${cardBg} border-l-[3px] border ${cardBorder} transition-all ${s.isSafe ? "border-l-emerald-500" : "border-l-red-500"}`}>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-bold dark:text-white truncate">{s.name}</p>
                                                    <p className={`text-[10px] ${subText} mt-0.5`}>{s.code} • Credits: {s.credits} • Leaves: {s.leaves}</p>
                                                    {s.total === 0 ? (
                                                        <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                                                            No classes yet
                                                        </span>
                                                    ) : s.isSafe ? (
                                                        <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-green-100 text-green-600"}`}>
                                                            ✅ Can skip {s.canSkip} more
                                                        </span>
                                                    ) : (
                                                        <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-red-100 text-red-600"}`}>
                                                            ❌ Need {s.needed} more
                                                        </span>
                                                    )}
                                                </div>
                                                {/* Circular progress + dots */}
                                                <div className="flex items-center gap-2">
                                                    <div className="relative size-12 flex-shrink-0">
                                                        <svg viewBox="0 0 44 44" className="size-full -rotate-90">
                                                            <circle cx="22" cy="22" r="18" fill="none" stroke={isDark ? "#2a2d35" : "#e5e7eb"} strokeWidth="3.5" />
                                                            <circle cx="22" cy="22" r="18" fill="none" stroke={s.isSafe ? "#22c55e" : "#ef4444"} strokeWidth="3.5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" className="drop-shadow-sm" />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                            <span className={`text-[11px] font-bold ${s.isSafe ? "text-emerald-400" : "text-red-400"}`}>{s.pct}</span>
                                                        </div>
                                                    </div>
                                                    <AttendanceDots pct={s.pct} />
                                                </div>
                                                <span className={`material-symbols-outlined ${subText} text-base`}>chevron_right</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ─── TAB 1 : TIMETABLE ─── */}
                        <div className="w-full flex-shrink-0 px-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-blue-400 text-[22px]">calendar_month</span>
                                <h2 className="text-base font-bold dark:text-white">Timetable</h2>
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                                {weekDays.map((day, i) => (
                                    <button key={day} onClick={() => setSelectedTTDay(i)} className={`min-w-[52px] py-2.5 px-3 rounded-xl text-xs font-bold uppercase transition-all ${selectedTTDay === i ? "bg-blue-500 text-white shadow-md shadow-blue-500/30" : `${cardBg} border ${cardBorder} ${isDark ? "text-gray-300" : "text-gray-600"} hover:border-blue-500/30`}`}>
                                        {day}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-blue-400 text-lg">today</span>
                                <span className="text-sm font-medium dark:text-white">{selectedTTDay === todayIdx ? "Today's Classes" : `${weekDays[selectedTTDay]} Schedule`}</span>
                                {selectedTTDay === todayIdx && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">Today</span>}
                            </div>

                            <div className="flex flex-col gap-3">
                                {(timetableData[weekDays[selectedTTDay]] || []).map((cls, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className="size-3 rounded-full bg-blue-500 border-2 border-blue-500/30" />
                                            {i < (timetableData[weekDays[selectedTTDay]]?.length ?? 0) - 1 && <div className={`w-0.5 flex-1 ${isDark ? "bg-[#252830]" : "bg-gray-200"} mt-1`} />}
                                        </div>
                                        <div className={`flex-1 rounded-xl p-4 ${cardBg} border ${cardBorder} mb-1`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${cls.type === "PRACTICAL" ? (isDark ? "bg-purple-500/15 text-purple-400" : "bg-purple-100 text-purple-600") : cls.type === "TUTORIAL" ? (isDark ? "bg-green-500/15 text-green-400" : "bg-green-100 text-green-600") : (isDark ? "bg-blue-500/10 text-blue-400" : "bg-primary/10 text-primary")}`}>
                                                    {cls.type}
                                                </span>
                                                <span className={`text-xs ${subText} font-medium`}>{cls.time}</span>
                                            </div>
                                            <h4 className="font-bold text-sm dark:text-white mb-2">{cls.subject}</h4>
                                            <div className={`flex items-center gap-3 text-xs ${subText}`}>
                                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{cls.room}</div>
                                                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">person</span>{cls.instructor}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(timetableData[weekDays[selectedTTDay]] || []).length === 0 && (
                                    <div className={`flex flex-col items-center justify-center py-16 ${subText}`}>
                                        <span className="material-symbols-outlined text-4xl mb-2">weekend</span>
                                        <p className="text-sm font-medium">No classes scheduled</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ─── TAB 2 : ATTENDANCE (matching screenshot theme) ─── */}
                        <div className="w-full flex-shrink-0 px-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-emerald-400 text-[22px]">monitoring</span>
                                <h2 className="text-base font-bold dark:text-white">Attendance</h2>
                            </div>

                            {/* Overall card */}
                            <div className={`rounded-2xl p-5 text-white relative overflow-hidden shadow-lg mb-5 bg-gradient-to-br ${overallPct >= 75 ? "from-emerald-600 to-green-800" : "from-red-600 to-red-800"} shadow-emerald-500/10`}>
                                <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
                                <div className="flex items-center gap-5">
                                    <div className="relative size-20">
                                        <svg viewBox="0 0 44 44" className="size-full -rotate-90">
                                            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                                            <circle cx="22" cy="22" r="18" fill="none" stroke="white" strokeWidth="4" strokeDasharray={`${(overallPct / 100) * 2 * Math.PI * 18} ${2 * Math.PI * 18}`} strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold">{overallPct}%</span></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80 font-medium">Overall Attendance</p>
                                        <p className="text-2xl font-bold">{subjectsWithPct.reduce((a, s) => a + s.attended, 0)} / {subjectsWithPct.reduce((a, s) => a + s.total, 0)}</p>
                                        <p className="text-xs text-white/70 mt-1">{overallPct >= 75 ? "✅ Above required 75%" : "⚠️ Below required 75%"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Filter chips */}
                            <div className="flex gap-2 mb-4">
                                {([["all", "All"], ["low", "Below 75%"], ["safe", "Safe"]] as const).map(([key, label]) => (
                                    <button key={key} onClick={() => setAttendFilter(key)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${attendFilter === key ? "bg-blue-500 text-white shadow-md shadow-blue-500/30" : `${cardBg} border ${cardBorder} ${isDark ? "text-gray-300" : "text-gray-600"}`}`}>
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Subject cards — full screenshot style */}
                            <div className="flex flex-col gap-2.5">
                                {filteredSubjects.map((s) => {
                                    const circ = 2 * Math.PI * 18;
                                    const dash = (s.pct / 100) * circ;
                                    return (
                                        <div key={s.slug} className={`flex items-center gap-3 p-4 rounded-xl ${cardBg} border-l-[3px] border ${cardBorder} transition-all ${s.isSafe ? "border-l-emerald-500" : "border-l-red-500"}`}>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold dark:text-white">{s.name}</p>
                                                <p className={`text-[11px] ${subText} mt-0.5`}>{s.code} • Credits: {s.credits} • Leaves: {s.leaves}</p>
                                                {s.total === 0 ? (
                                                    <span className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"}`}>No classes yet</span>
                                                ) : s.isSafe ? (
                                                    <span className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-green-100 text-green-600"}`}>✅ Can skip {s.canSkip} more</span>
                                                ) : (
                                                    <span className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-red-100 text-red-600"}`}>❌ Need {s.needed} more</span>
                                                )}
                                            </div>

                                            {/* Circular progress */}
                                            <div className="flex items-center gap-2">
                                                <div className="relative size-14 flex-shrink-0">
                                                    <svg viewBox="0 0 44 44" className="size-full -rotate-90">
                                                        <circle cx="22" cy="22" r="18" fill="none" stroke={isDark ? "#2a2d35" : "#e5e7eb"} strokeWidth="3.5" />
                                                        <circle cx="22" cy="22" r="18" fill="none" stroke={s.isSafe ? "#22c55e" : "#ef4444"} strokeWidth="3.5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" className="drop-shadow-sm" style={{ filter: `drop-shadow(0 0 4px ${s.isSafe ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"})` }} />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                        <span className={`text-xs font-bold ${s.isSafe ? "text-emerald-400" : "text-red-400"}`}>{s.pct}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <AttendanceDots pct={s.pct} />
                                                    <span className={`text-[9px] ${subText} mt-1 font-medium`}>{s.attended}/{s.total}</span>
                                                </div>
                                            </div>
                                            <span className={`material-symbols-outlined ${subText} text-lg`}>chevron_right</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <button onClick={() => navigate("/attendance")} className={`w-full mt-4 p-4 rounded-xl ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-primary/10 text-primary"} font-bold text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-all active:scale-[0.98]`}>
                                <span className="material-symbols-outlined text-lg">calculate</span>
                                Open Attendance Predictor
                            </button>
                        </div>

                        {/* ─── TAB 3 : RESULT ─── */}
                        <div className="w-full flex-shrink-0 px-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-400 text-[22px]">school</span>
                                    <h2 className="text-base font-bold dark:text-white">Results</h2>
                                </div>
                                <button onClick={() => setShowGrades(!showGrades)} className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                                    {showGrades ? "Show Marks" : "Show Grades"}
                                </button>
                            </div>

                            {/* SGPA card */}
                            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 p-5 text-white relative overflow-hidden shadow-lg shadow-emerald-500/10 mb-5">
                                <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
                                <div className="flex items-center gap-5">
                                    <div className="relative size-20">
                                        <svg viewBox="0 0 44 44" className="size-full -rotate-90">
                                            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                                            <circle cx="22" cy="22" r="18" fill="none" stroke="white" strokeWidth="4" strokeDasharray={`${(parseFloat(sgpa) / 10) * 2 * Math.PI * 18} ${2 * Math.PI * 18}`} strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold">{sgpa}</span></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80 font-medium">Current SGPA</p>
                                        <p className="text-2xl font-bold">Semester 2</p>
                                        <p className="text-xs text-white/70 mt-1">{resultData.reduce((a, r) => a + r.credits, 0)} Credits</p>
                                    </div>
                                </div>
                            </div>

                            {/* Results table */}
                            <div className={`rounded-xl overflow-hidden border ${cardBorder} mb-4`}>
                                <div className={`flex items-center px-4 py-2.5 ${isDark ? "bg-[#14161c]" : "bg-gray-50"} text-xs font-bold ${subText} uppercase`}>
                                    <span className="flex-1">Subject</span>
                                    <span className="w-16 text-center">{showGrades ? "Grade" : "Total"}</span>
                                    <span className="w-16 text-center">Credits</span>
                                </div>
                                {resultData.map((r, i) => (
                                    <div key={i} className={`flex items-center px-4 py-3.5 ${cardBg} ${i < resultData.length - 1 ? `border-b ${cardBorder}` : ""}`}>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold dark:text-white truncate">{r.subject}</p>
                                            <p className={`text-[10px] ${subText} mt-0.5`}>{r.code}</p>
                                        </div>
                                        <div className="w-16 text-center">
                                            {showGrades ? (
                                                <span className={`text-sm font-bold ${r.grade.startsWith("A") ? "text-emerald-400" : r.grade.startsWith("B") ? "text-blue-400" : "text-orange-400"}`}>{r.grade}</span>
                                            ) : (
                                                <span className="text-sm font-bold dark:text-white">{r.total}/100</span>
                                            )}
                                        </div>
                                        <div className="w-16 text-center"><span className="text-sm font-medium dark:text-white">{r.credits}</span></div>
                                    </div>
                                ))}
                            </div>

                            {!showGrades && (
                                <div className={`rounded-xl p-4 ${cardBg} border ${cardBorder}`}>
                                    <h4 className="text-sm font-bold dark:text-white mb-3">Marks Breakdown</h4>
                                    {resultData.map((r, i) => (
                                        <div key={i} className={`flex items-center justify-between py-2 border-b ${cardBorder} last:border-0`}>
                                            <span className="text-xs font-medium dark:text-white">{r.subject}</span>
                                            <div className="flex gap-3 text-xs">
                                                <span className={subText}>Int: <span className="font-bold dark:text-white">{r.internal}/50</span></span>
                                                <span className={subText}>Ext: <span className="font-bold dark:text-white">{r.external}/50</span></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button onClick={() => navigate("/exams")} className={`w-full mt-4 p-4 rounded-xl ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-primary/10 text-primary"} font-bold text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-all active:scale-[0.98]`}>
                                <span className="material-symbols-outlined text-lg">assignment</span>
                                View Exam Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}
