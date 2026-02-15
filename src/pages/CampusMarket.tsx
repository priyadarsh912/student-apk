import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const categories = ["All", "Electronics", "Books", "Furniture", "Clothing", "Other"];

const products = [
    { name: "MacBook Pro 2021", price: "₹45,000", condition: "Like New", seller: "Rahul M.", img: "💻", category: "Electronics" },
    { name: "Data Structures Book", price: "₹250", condition: "Good", seller: "Priya S.", img: "📚", category: "Books" },
    { name: "Desk Lamp (LED)", price: "₹350", condition: "New", seller: "Amit K.", img: "💡", category: "Electronics" },
    { name: "Study Table", price: "₹2,000", condition: "Good", seller: "Neha R.", img: "🪑", category: "Furniture" },
    { name: "Scientific Calculator", price: "₹800", condition: "Like New", seller: "Vikram P.", img: "🧮", category: "Electronics" },
    { name: "Winter Jacket (L)", price: "₹600", condition: "Good", seller: "Sneha D.", img: "🧥", category: "Clothing" },
];

export default function CampusMarket() {
    const [selectedCat, setSelectedCat] = useState(0);

    return (
        <MobileLayout>
            <PageHeader
                title="Campus Market"
                rightAction={
                    <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Sell
                    </button>
                }
            />

            <div className="px-4 py-4">
                {/* Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-primary to-blue-500 p-5 text-white mb-5">
                    <h3 className="text-lg font-bold">Buy & Sell on Campus</h3>
                    <p className="text-sm text-white/80 mt-1">Find great deals from fellow students</p>
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs bg-white/20 px-3 py-1.5 rounded-lg font-medium">🛍 156 Items Listed</span>
                        <span className="text-xs bg-white/20 px-3 py-1.5 rounded-lg font-medium">⚡ 24 Recent Deals</span>
                    </div>
                </div>

                {/* Search */}
                <div className="flex w-full items-stretch rounded-xl h-11 bg-white border border-gray-200 focus-within:border-primary/50 shadow-sm transition-all mb-4">
                    <div className="text-[#637388] flex items-center justify-center pl-3">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </div>
                    <input className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] px-3 text-sm" placeholder="Search items..." />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCat(i)}
                            className={`whitespace-nowrap text-sm font-medium px-4 py-2 rounded-lg transition-colors ${selectedCat === i
                                    ? "bg-primary text-white"
                                    : "bg-white text-gray-600 border border-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {products.map((p, i) => (
                        <div key={i} className="rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-primary/20 transition-colors cursor-pointer">
                            <div className="h-28 bg-gray-50 flex items-center justify-center text-4xl">{p.img}</div>
                            <div className="p-3">
                                <h4 className="text-sm font-bold leading-tight line-clamp-1">{p.name}</h4>
                                <p className="text-xs text-[#637388] mt-0.5">{p.condition} • {p.seller}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-bold text-primary">{p.price}</span>
                                    <button className="text-primary">
                                        <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
