import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const leaveTypes = [
    { id: "sick", label: "Sick Leave", icon: "medical_services" },
    { id: "duty", label: "Duty Leave", icon: "work" },
    { id: "family", label: "Family Emergency", icon: "family_restroom" },
    { id: "general", label: "General Leave", icon: "event_busy" },
];

export default function ApplyForLeave() {
    const [selectedType, setSelectedType] = useState("sick");

    return (
        <MobileLayout>
            <PageHeader title="Apply for Leave" />

            <div className="px-4 py-6">
                {/* Leave Type */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#637388] mb-3">Leave Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {leaveTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedType === type.id
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{type.icon}</span>
                                <span className="text-sm font-medium">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date Range */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#637388] mb-3">Duration</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-[#637388] font-medium">Start Date</label>
                            <button className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left text-sm dark:text-white">
                                <span>Oct 25, 2023</span>
                                <span className="material-symbols-outlined text-lg text-[#637388]">calendar_today</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-[#637388] font-medium">End Date</label>
                            <button className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left text-sm dark:text-white">
                                <span>Oct 27, 2023</span>
                                <span className="material-symbols-outlined text-lg text-[#637388]">calendar_today</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 bg-primary/5 dark:bg-primary/10 rounded-lg p-3 border border-primary/10 dark:border-primary/20">
                        <span className="material-symbols-outlined text-primary text-lg">info</span>
                        <span className="text-xs text-primary font-medium">Duration: 3 Days (2 Working Days)</span>
                    </div>
                </div>

                {/* Reason */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#637388] mb-3">Reason</h3>
                    <textarea
                        rows={4}
                        placeholder="Describe the reason for your leave request..."
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm dark:text-white placeholder:text-[#637388] focus:outline-none focus:border-primary/50 resize-none"
                    />
                </div>

                {/* Attachment */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#637388] mb-3">Attachment (Optional)</h3>
                    <button className="w-full flex flex-col items-center justify-center py-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-primary/30 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-[#637388] mb-2">cloud_upload</span>
                        <p className="text-sm font-medium text-[#637388]">Upload supporting document</p>
                        <p className="text-xs text-[#637388] mt-1">PDF, JPG, PNG • Max 5MB</p>
                    </button>
                </div>

                {/* Submit */}
                <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">send</span>
                    Submit Application
                </button>
            </div>
        </MobileLayout>
    );
}
