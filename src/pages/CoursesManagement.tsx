import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const departments = ["All Departments", "Computer Science", "Graphic Design", "Business", "Marketing"];

const courses = [
    { name: "Intro to Computer Science", code: "CS-101", instructor: "Prof. Alan Turing", enrolled: 42, icon: "computer", color: "bg-primary/10 text-primary" },
    { name: "Advanced Graphic Design", code: "GD-302", instructor: "Sarah Jenkins", enrolled: 28, icon: "palette", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
    { name: "Business Administration", code: "BA-205", instructor: "Dr. Michael Scott", enrolled: 156, icon: "ondemand_video", color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
    { name: "Data Structures & Algos", code: "CS-201", instructor: "Ada Lovelace", enrolled: 64, icon: "slideshow", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
    { name: "Marketing Foundations", code: "BA-101", instructor: "Don Draper", enrolled: 89, icon: "psychology", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" },
];

export default function CoursesManagement() {
    const [selectedDept, setSelectedDept] = useState(0);

    return (
        <MobileLayout>
            <PageHeader
                title="Courses"
                rightAction={
                    <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add Course
                    </button>
                }
            />

            <div className="px-4 py-4">
                {/* Search */}
                <div className="flex w-full items-stretch rounded-xl h-11 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:border-primary/50 shadow-sm transition-all mb-4">
                    <div className="text-[#637388] flex items-center justify-center pl-3">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </div>
                    <input className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] px-3 text-sm dark:text-white" placeholder="Search courses by name, ID or instructor" />
                </div>

                {/* Department Filter */}
                <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 mb-4">
                    {departments.map((d, i) => (
                        <button
                            key={d}
                            onClick={() => setSelectedDept(i)}
                            className={`whitespace-nowrap text-sm font-medium px-4 py-2 rounded-lg transition-colors ${selectedDept === i
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30"
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>

                {/* Course Cards */}
                <div className="flex flex-col gap-3">
                    {courses.map((course) => (
                        <div key={course.code} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-colors cursor-pointer">
                            <div className={`size-12 rounded-xl flex items-center justify-center ${course.color}`}>
                                <span className="material-symbols-outlined text-xl">{course.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm dark:text-white">{course.name}</h4>
                                <p className="text-xs text-[#637388] flex items-center gap-1 mt-0.5">
                                    <span className="material-symbols-outlined text-sm">person</span>
                                    {course.instructor}
                                </p>
                                <p className="text-xs text-primary font-medium flex items-center gap-1 mt-0.5">
                                    <span className="material-symbols-outlined text-sm">group</span>
                                    {course.enrolled} Students Enrolled
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs font-bold text-[#637388] bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{course.code}</span>
                                <span className="material-symbols-outlined text-[#637388] text-lg">chevron_right</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
