import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const tabs = ["Lost Items", "Found Items", "My Reports"];

const lostItems = [
    { title: "Blue Backpack", location: "Library, 2nd Floor", time: "2 hours ago", status: "ACTIVE", img: "🎒", reporter: "Rahul M." },
    { title: "iPhone 14 (Black)", location: "Cafeteria B", time: "5 hours ago", status: "ACTIVE", img: "📱", reporter: "Priya S." },
    { title: "Student ID Card", location: "Lecture Hall 3", time: "1 day ago", status: "FOUND", img: "💳", reporter: "Amit K." },
    { title: "Silver Watch", location: "Gym Area", time: "2 days ago", status: "ACTIVE", img: "⌚", reporter: "Sneha D." },
];

const foundItems = [
    { title: "Water Bottle (Green)", location: "Parking Lot A", time: "1 hour ago", status: "UNCLAIMED", img: "🍶", reporter: "Vikram P." },
    { title: "Earbuds Case", location: "Bus Stop 2", time: "3 hours ago", status: "UNCLAIMED", img: "🎧", reporter: "Neha R." },
];

export default function LostAndFound() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <MobileLayout>
            <PageHeader
                title="Lost & Found"
                rightAction={
                    <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        Report
                    </button>
                }
            />

            <div className="px-4 py-4">
                {/* Search */}
                <div className="flex w-full items-stretch rounded-xl h-11 bg-white border border-gray-200 focus-within:border-primary/50 shadow-sm transition-all mb-4">
                    <div className="text-[#637388] flex items-center justify-center pl-3">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </div>
                    <input className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] px-3 text-sm" placeholder="Search lost or found items..." />
                </div>

                {/* Tabs */}
                <div className="flex gap-0 border-b border-gray-200 mb-5">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === i ? "text-primary border-b-2 border-primary" : "text-[#637388]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 0 && (
                    <div className="flex flex-col gap-3">
                        {lostItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 cursor-pointer hover:border-primary/20 transition-colors">
                                <div className="size-14 rounded-xl bg-gray-50 flex items-center justify-center text-3xl">{item.img}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-sm font-bold">{item.title}</h4>
                                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${item.status === "ACTIVE" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#637388] flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {item.location}
                                    </p>
                                    <p className="text-xs text-[#637388] mt-0.5">{item.reporter} • {item.time}</p>
                                </div>
                                <span className="material-symbols-outlined text-[#637388]">chevron_right</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="flex flex-col gap-3">
                        {foundItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 cursor-pointer hover:border-primary/20 transition-colors">
                                <div className="size-14 rounded-xl bg-gray-50 flex items-center justify-center text-3xl">{item.img}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-sm font-bold">{item.title}</h4>
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-600">
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#637388] flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {item.location}
                                    </p>
                                    <p className="text-xs text-[#637388] mt-0.5">{item.reporter} • {item.time}</p>
                                </div>
                                <button className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg">Claim</button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="flex flex-col items-center justify-center py-16 text-[#637388]">
                        <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                        <p className="text-sm">No reports yet</p>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
