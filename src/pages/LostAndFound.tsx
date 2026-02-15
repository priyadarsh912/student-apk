import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useLostAndFound } from "@/hooks/useLostAndFound";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Using Radix Tabs if available, or just custom logic as before.

const tabs = ["Lost Items", "Found Items", "My Reports"];

export default function LostAndFound() {
    const { items, addItem, markAsFound, deleteItem } = useLostAndFound();
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [newItem, setNewItem] = useState({
        title: "",
        location: "",
        type: "LOST" as "LOST" | "FOUND",
        img: "📦"
    });

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        addItem({
            ...newItem,
            time: "Just now"
        });
        setIsDialogOpen(false);
        setNewItem({ title: "", location: "", type: "LOST", img: "📦" });
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 0) return item.type === "LOST" && matchesSearch;
        if (activeTab === 1) return item.type === "FOUND" && matchesSearch;
        if (activeTab === 2) return item.reporter === "You" && matchesSearch; // Simple "My Reports" filter
        return false;
    });

    return (
        <MobileLayout>
            <PageHeader
                title="Lost & Found"
                rightAction={
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                Report
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-[90%] rounded-xl">
                            <DialogHeader>
                                <DialogTitle>Report an Item</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddItem} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">What is it?</label>
                                    <Input
                                        required
                                        placeholder="e.g. Blue Backpack"
                                        value={newItem.title}
                                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input
                                        required
                                        placeholder="e.g. Library 2nd Floor"
                                        value={newItem.location}
                                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type</label>
                                    <Select
                                        value={newItem.type}
                                        onValueChange={(val: "LOST" | "FOUND") => setNewItem({ ...newItem, type: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOST">I Lost something</SelectItem>
                                            <SelectItem value="FOUND">I Found something</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-2">
                                    Submit Report
                                </button>
                            </form>
                        </DialogContent>
                    </Dialog>
                }
            />

            <div className="px-4 py-4">
                {/* Search */}
                <div className="flex w-full items-stretch rounded-xl h-11 bg-white dark:bg-[#181b22] border border-gray-200 dark:border-[#252830] focus-within:border-primary/50 shadow-sm transition-all mb-4">
                    <div className="text-[#637388] dark:text-gray-400 flex items-center justify-center pl-3">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </div>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] dark:placeholder:text-gray-500 dark:text-white px-3 text-sm"
                        placeholder="Search lost or found items..."
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-0 border-b border-gray-200 dark:border-[#252830] mb-5">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === i ? "text-primary border-b-2 border-primary" : "text-[#637388] dark:text-gray-400"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-3 pb-safe">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#181b22] border border-gray-100 dark:border-[#252830] cursor-pointer hover:border-primary/20 transition-colors group">
                                <div className="size-14 rounded-xl bg-gray-50 dark:bg-[#252830] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{item.img}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-sm font-bold dark:text-white">{item.title}</h4>
                                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${{
                                                "ACTIVE": "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400",
                                                "FOUND": "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
                                                "UNCLAIMED": "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
                                                "CLAIMED": "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                                            }[item.status]
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#637388] dark:text-gray-400 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        {item.location}
                                    </p>
                                    <p className="text-xs text-[#637388] dark:text-gray-500 mt-0.5">{item.reporter} • {item.time}</p>
                                </div>
                                {item.type === "FOUND" && item.status === "UNCLAIMED" && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); alert("Please visit the security office to claim this item."); }}
                                        className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary/90"
                                    >
                                        Claim
                                    </button>
                                )}
                                {item.type === "LOST" && (
                                    <span className="material-symbols-outlined text-[#637388] dark:text-gray-500">chevron_right</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-[#637388] dark:text-gray-500">
                            <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                            <p className="text-sm">No items found</p>
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
}
