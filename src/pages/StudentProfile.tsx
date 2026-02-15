import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useSettings } from "@/contexts/SettingsContext";

export default function StudentProfile() {
    const { settings } = useSettings();
    const { profile } = settings;

    return (
        <MobileLayout>
            <PageHeader
                title="Student Profile"
                rightAction={
                    <button className="text-[#637388]">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                }
            />

            <div className="px-4 py-6 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative mb-4">
                    <div className="size-28 rounded-2xl overflow-hidden shadow-md">
                        <img
                            alt={profile.name}
                            className="h-full w-full object-cover"
                            src={profile.avatar}
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-7 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm">check</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold dark:text-white">{profile.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">Undergraduate</span>
                    <span className="text-sm text-[#637388] font-medium">#{profile.studentId}</span>
                </div>
            </div>

            {/* Personal Information */}
            <div className="px-4">
                <h3 className="text-lg font-bold mb-3 dark:text-white">Personal Information</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/5 dark:border-gray-700">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-primary uppercase tracking-wider">Major</p>
                            <p className="text-sm font-medium dark:text-white">Computer Science</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/5 dark:border-gray-700">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">mail</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-primary uppercase tracking-wider">Email</p>
                            <p className="text-sm font-medium dark:text-white">{profile.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/5 dark:border-gray-700">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">call</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-primary uppercase tracking-wider">Phone</p>
                            <p className="text-sm font-medium dark:text-white">{profile.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/5 dark:border-gray-700">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">cake</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-primary uppercase tracking-wider">Date of Birth</p>
                            <p className="text-sm font-medium dark:text-white">
                                {new Date(profile.dob).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/5 dark:border-gray-700">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">badge</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-primary uppercase tracking-wider">Student ID</p>
                            <p className="text-sm font-medium dark:text-white">{profile.studentId}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Summary */}
            <div className="px-4 mt-6">
                <h3 className="text-lg font-bold mb-3 dark:text-white">Attendance Summary</h3>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-5 border border-primary/10 dark:border-primary/20 flex items-center justify-between">
                    <div>
                        <p className="text-3xl font-bold text-primary">95%</p>
                        <p className="text-sm font-medium mt-1 dark:text-gray-300">Overall Attendance</p>
                        <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase mt-1">Excellent Standing</p>
                    </div>
                    <div className="size-16 rounded-full border-4 border-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-2xl">event_available</span>
                    </div>
                </div>
            </div>

            {/* Grades Overview */}
            <div className="px-4 mt-6 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold dark:text-white">Grades Overview</h3>
                    <button className="text-primary text-sm font-semibold">View Transcript</button>
                </div>
                <div className="flex flex-col gap-3">
                    {[
                        { subject: "Data Structures", code: "CS-201", semester: "Fall 2023", grade: "A", pct: 94, color: "bg-green-500" },
                        { subject: "Database Systems", code: "CS-304", semester: "Fall 2023", grade: "B+", pct: 88, color: "bg-primary" },
                        { subject: "UI/UX Design", code: "DS-110", semester: "Fall 2023", grade: "A+", pct: 98, color: "bg-green-500" },
                    ].map((item) => (
                        <div key={item.code} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary/5 dark:border-gray-700">
                            <div className="flex-1">
                                <p className="text-sm font-bold dark:text-white">{item.subject}</p>
                                <p className="text-xs text-[#637388]">{item.code} • {item.semester}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold dark:text-white">{item.pct}%</span>
                                    <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">{item.grade}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
