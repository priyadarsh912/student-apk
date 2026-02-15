import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useMarketplace } from "@/hooks/useMarketplace";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["All", "Electronics", "Books", "Furniture", "Clothing", "Other"];

export default function CampusMarket() {
    const { items, addItem } = useMarketplace();
    const [selectedCat, setSelectedCat] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        condition: "Good",
        category: "Other",
        img: "📦" // Default emoji
    });

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        addItem({
            ...newItem,
            price: newItem.price.startsWith('₹') ? newItem.price : `₹${newItem.price}`
        });
        setIsDialogOpen(false);
        setNewItem({ name: "", price: "", condition: "Good", category: "Other", img: "📦" });
    };

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCat === "All" || item.category === selectedCat;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.seller.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <MobileLayout>
            <PageHeader
                title="Campus Market"
                rightAction={
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined text-lg">add</span>
                                Sell
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-[90%] rounded-xl">
                            <DialogHeader>
                                <DialogTitle>Sell an Item</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddItem} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Item Name</label>
                                    <Input
                                        required
                                        placeholder="e.g. Scientific Calculator"
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Price (₹)</label>
                                        <Input
                                            required
                                            placeholder="e.g. 500"
                                            value={newItem.price}
                                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Category</label>
                                        <Select
                                            value={newItem.category}
                                            onValueChange={(val) => setNewItem({ ...newItem, category: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.filter(c => c !== "All").map(c => (
                                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Condition</label>
                                    <Select
                                        value={newItem.condition}
                                        onValueChange={(val) => setNewItem({ ...newItem, condition: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Condition" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">New</SelectItem>
                                            <SelectItem value="Like New">Like New</SelectItem>
                                            <SelectItem value="Good">Good</SelectItem>
                                            <SelectItem value="Fair">Fair</SelectItem>
                                            <SelectItem value="Used">Used</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-2">
                                    List Item
                                </button>
                            </form>
                        </DialogContent>
                    </Dialog>
                }
            />

            <div className="px-4 py-4">
                {/* Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-primary to-blue-500 p-5 text-white mb-5">
                    <h3 className="text-lg font-bold">Buy & Sell on Campus</h3>
                    <p className="text-sm text-white/80 mt-1">Find great deals from fellow students</p>
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs bg-white/20 px-3 py-1.5 rounded-lg font-medium">🛍 {items.length} Items Listed</span>
                        <span className="text-xs bg-white/20 px-3 py-1.5 rounded-lg font-medium">⚡ New Deals Daily</span>
                    </div>
                </div>

                {/* Search */}
                <div className="flex w-full items-stretch rounded-xl h-11 bg-white dark:bg-[#181b22] border border-gray-200 dark:border-[#252830] focus-within:border-primary/50 shadow-sm transition-all mb-4">
                    <div className="text-[#637388] dark:text-gray-400 flex items-center justify-center pl-3">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </div>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] dark:placeholder:text-gray-500 dark:text-white px-3 text-sm"
                        placeholder="Search items..."
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCat(cat)}
                            className={`whitespace-nowrap text-sm font-medium px-4 py-2 rounded-lg transition-colors ${selectedCat === cat
                                ? "bg-primary text-white"
                                : "bg-white dark:bg-[#181b22] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#252830]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 pb-safe">
                        {filteredItems.map((p) => (
                            <div key={p.id} className="rounded-xl overflow-hidden bg-white dark:bg-[#181b22] border border-gray-100 dark:border-[#252830] hover:border-primary/20 transition-colors cursor-pointer group">
                                <div className="h-28 bg-gray-50 dark:bg-[#252830] flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">{p.img}</div>
                                <div className="p-3">
                                    <h4 className="text-sm font-bold leading-tight line-clamp-1 dark:text-white">{p.name}</h4>
                                    <p className="text-xs text-[#637388] dark:text-gray-400 mt-0.5">{p.condition} • {p.seller}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm font-bold text-primary">{p.price}</span>
                                        <button className="text-primary hover:bg-primary/10 p-1.5 rounded-full transition-colors">
                                            <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <span className="material-symbols-outlined text-4xl mb-2">production_quantity_limits</span>
                        <p className="text-sm">No items found</p>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
