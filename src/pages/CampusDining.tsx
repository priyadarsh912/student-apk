import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type MealItem = { item: string; type: "VEG" | "NON-VEG" | "BEV" | "INTL" | "SOUTH" | "SPECIAL" };
type MealSlot = { meal: string; time: string; icon: string; items: MealItem[] };

const weeklyMenu: Record<string, MealSlot[]> = {
    SUN: [
        {
            meal: "Breakfast", time: "08:30 AM - 09:30 AM", icon: "wb_sunny",
            items: [
                { item: "Chole Bhature", type: "VEG" },
                { item: "Tea • Pickle • Onion Masala Green Chilli", type: "VEG" },
                { item: "🌍 Regular Menu • Bread/Fat Spread Jam • Sweet Porridge • Banana • Milk • Tea/Coffee", type: "INTL" },
            ],
        },
        {
            meal: "Lunch", time: "12:00 PM - 01:45 PM", icon: "light_mode",
            items: [
                { item: "Veg Biryani • Mix Raita • Jeera Aloo", type: "VEG" },
                { item: "Chapati • Pickle • Green Salad", type: "VEG" },
                { item: "🌍 Saute Veg • Pita Bread • Green Peas Hummus • Steamed Rice • Plain Curd • Banana", type: "INTL" },
            ],
        },
        {
            meal: "Snacks", time: "04:30 PM - 05:15 PM", icon: "cookie",
            items: [
                { item: "Samosa (Boys) • Namkeen (Girls) • Tea", type: "VEG" },
            ],
        },
        {
            meal: "Dinner", time: "07:30 PM - 09:00 PM", icon: "dark_mode",
            items: [
                { item: "Egg Bhurji • Paneer Makhani • Lobiya Tadak", type: "NON-VEG" },
                { item: "Rice • Green Salad • Chapati • Pickle", type: "VEG" },
                { item: "🇮🇳 Paneer Chattinad • Andra Curry", type: "SOUTH" },
            ],
        },
    ],
    MON: [
        {
            meal: "Breakfast", time: "07:30 AM - 09:00 AM", icon: "wb_sunny",
            items: [
                { item: "Coleslaw Sandwich • Cornflakes • Tea • Milk", type: "VEG" },
                { item: "🌍 Regular Menu • Bread/Fat Spread Jam • Masala Omelette or Boiled Egg • Cut Fruit • Milk • Tea/Coffee", type: "INTL" },
            ],
        },
        {
            meal: "Lunch", time: "12:00 PM - 01:45 PM", icon: "light_mode",
            items: [
                { item: "Panchmel • Aloo Gobhi • Rice • Boondi Raita", type: "VEG" },
                { item: "Green Salad • Chapati • Pickle", type: "VEG" },
                { item: "🌍 Spaghetti Aglio Olio • Veg Stew • Tomato Salsa • Steamed Rice • Plain Curd • Banana", type: "INTL" },
            ],
        },
        {
            meal: "Snacks", time: "04:30 PM - 05:15 PM", icon: "cookie",
            items: [
                { item: "Namkeen (Boys) • Samosa (Girls) • Tea", type: "VEG" },
            ],
        },
        {
            meal: "Dinner", time: "07:30 PM - 09:00 PM", icon: "dark_mode",
            items: [
                { item: "Baigan Bharta • Dal Makhani • Jeera Rice", type: "VEG" },
                { item: "Chapati • Green Salad • Pickle • Suji Ka Halwa", type: "VEG" },
                { item: "🇮🇳 Tomato Pappu • Ennai Katrikai Kolambu • Lemon Rice", type: "SOUTH" },
            ],
        },
    ],
    TUE: [
        {
            meal: "Breakfast", time: "07:30 AM - 09:00 AM", icon: "wb_sunny",
            items: [
                { item: "Subzi Poori • Tea • Pickle", type: "VEG" },
                { item: "Aloo Chana Chaat (Girls Only)", type: "VEG" },
                { item: "🌍 Regular Menu • Bread/Fat Spread Jam • Pancake with Chocolate Sauce • Banana • Milk • Tea/Coffee", type: "INTL" },
            ],
        },
        {
            meal: "Lunch", time: "12:00 PM - 01:45 PM", icon: "light_mode",
            items: [
                { item: "Rajma Raseela • Sev Tamatar • Peas Pulao", type: "VEG" },
                { item: "Cucumber Radish Salad • Chapati • Mint Cucumber Raita • Pickle", type: "VEG" },
                { item: "🌍 Pink Sauce Pasta • French Fry • Tomato Ketchup • Steamed Rice • Plain Curd • Banana", type: "INTL" },
            ],
        },
        {
            meal: "Snacks", time: "04:30 PM - 05:15 PM", icon: "cookie",
            items: [
                { item: "B-Pakora (Boys) • Chips (Girls) • Tea", type: "VEG" },
            ],
        },
        {
            meal: "Iftar", time: "06:15 PM - 07:00 PM", icon: "mosque",
            items: [
                { item: "🌙 Ramadan Iftar • Rooh Afza • Apple • Aloo Bonda", type: "SPECIAL" },
            ],
        },
        {
            meal: "Dinner", time: "07:30 PM - 09:00 PM", icon: "dark_mode",
            items: [
                { item: "Menu as per regular schedule", type: "VEG" },
            ],
        },
    ],
    WED: [
        {
            meal: "Breakfast", time: "07:30 AM - 09:00 AM", icon: "wb_sunny",
            items: [
                { item: "Pav Bhaji • Pickle • Milk • Tea", type: "VEG" },
                { item: "🌍 Regular Menu • Bread/Fat Spread Jam • Oats • Banana • Milk • Tea/Coffee", type: "INTL" },
            ],
        },
        {
            meal: "Lunch", time: "12:00 PM - 01:45 PM", icon: "light_mode",
            items: [
                { item: "White Chana Masala • Aloo Gajar Methi • Rice", type: "VEG" },
                { item: "Green Salad • Chapati • Ghiya Raita • Pickle", type: "VEG" },
                { item: "🌍 Veg Augratin • Potato Wedges • Basil Salsa • Steamed Rice • Plain Curd • Banana", type: "INTL" },
            ],
        },
        {
            meal: "Snacks", time: "04:30 PM - 05:15 PM", icon: "cookie",
            items: [
                { item: "Chips (Boys) • B-Pakora (Girls) • Tea", type: "VEG" },
            ],
        },
        {
            meal: "Iftar", time: "06:15 PM - 07:00 PM", icon: "mosque",
            items: [
                { item: "🌙 Ramadan Iftar • Frooti • Muskmelon • Mix Pakora", type: "SPECIAL" },
            ],
        },
        {
            meal: "Dinner", time: "07:30 PM - 09:00 PM", icon: "dark_mode",
            items: [
                { item: "Matar Paneer • Murgh Kolapuri • G-Moong Jeera Tadka", type: "NON-VEG" },
                { item: "Rice • Chapati • Pickle • Onion Salad", type: "VEG" },
            ],
        },
    ],
    THU: [
        {
            meal: "Breakfast", time: "07:30 AM - 09:00 AM", icon: "wb_sunny",
            items: [
                { item: "Methi Parantha • Curd • Fat Spread • Tea • Pickle", type: "VEG" },
                { item: "🌍 Regular Menu • Bread/Fat Spread Jam • Sweet Porridge • Cut Fruit • Milk • Tea/Coffee", type: "INTL" },
            ],
        },
        {
            meal: "Lunch", time: "12:00 PM - 01:45 PM", icon: "light_mode",
            items: [
                { item: "Nutri Matar • Aloo Kadhi • Rice • Fryums", type: "VEG" },
                { item: "Chapati • Pickle", type: "VEG" },
                { item: "🌍 French Fries • Beans Fogat • Steamed Rice • Tomato Ketchup • Plain Curd • Banana", type: "INTL" },
            ],
        },
        {
            meal: "Snacks", time: "04:30 PM - 05:15 PM", icon: "cookie",
            items: [
                { item: "Matthi (Boys) • Biscuit • Coffee (Girls) • Tea", type: "VEG" },
            ],
        },
        {
            meal: "Iftar", time: "06:15 PM - 07:00 PM", icon: "mosque",
            items: [
                { item: "🌙 Ramadan Iftar • Milk • Papaya • Bread Pakora", type: "SPECIAL" },
            ],
        },
        {
            meal: "Dinner", time: "07:30 PM - 09:00 PM", icon: "dark_mode",
            items: [
                { item: "Palak Corn • Maha Chana • Rice • Chapati", type: "VEG" },
                { item: "Salad • Pickle • Semiya Sagoo Payasam", type: "VEG" },
            ],
        },
    ],
    FRI: [
        {
            meal: "Breakfast", time: "07:30 AM - 09:00 AM", icon: "wb_sunny",
            items: [
                { item: "Namkeen Semiyan • Kinnu • Boiled Egg • Tea", type: "NON-VEG" },
                { item: "Bread • Fat Spread • Jam", type: "VEG" },
                { item: "🌍 Regular Menu • Bread/Fat Spread Jam • Egg Dish As Per Regular Mess Menu • Banana • Milk • Tea/Coffee", type: "INTL" },
            ],
        },
        {
            meal: "Lunch", time: "12:00 PM - 01:45 PM", icon: "light_mode",
            items: [
                { item: "Black Chana Tari Wala • Mushroom Kadhai • Rice", type: "VEG" },
                { item: "Salad • Chapati • Mix Raita • Pickle", type: "VEG" },
                { item: "🌍 Veg Hakka Noodle • Veg Patty • Cocktail Sauce • Steamed Rice • Plain Curd • Banana", type: "INTL" },
            ],
        },
        {
            meal: "Snacks", time: "04:30 PM - 05:15 PM", icon: "cookie",
            items: [
                { item: "Biscuit • Coffee (Boys) • Rusk • Tea (Girls)", type: "VEG" },
            ],
        },
        {
            meal: "Iftar", time: "06:15 PM - 07:00 PM", icon: "mosque",
            items: [
                { item: "🌙 Ramadan Iftar • Lahori Jeera • Watermelon • Samosa", type: "SPECIAL" },
            ],
        },
        {
            meal: "Dinner", time: "07:30 PM - 09:00 PM", icon: "dark_mode",
            items: [
                { item: "Menu as per regular schedule", type: "VEG" },
            ],
        },
    ],
    SAT: [
        {
            meal: "Breakfast", time: "08:30 AM - 09:30 AM", icon: "wb_sunny",
            items: [
                { item: "Stuffed Parantha • Fat Spread • Curd • Tea • Pickle", type: "VEG" },
                { item: "🌍 Regular Menu • Bread/Fat Spread Jam • Cornflakes • Cut Fruit • Milk • Tea/Coffee", type: "INTL" },
            ],
        },
        {
            meal: "Lunch", time: "12:00 PM - 01:45 PM", icon: "light_mode",
            items: [
                { item: "Chana Dal Fry • Mushroom Kadhai • Rice • Salad", type: "VEG" },
                { item: "Chapati • Cucumber Raita • Pickle", type: "VEG" },
                { item: "🌍 Mexican Kidney Beans • Cajun Potato Wedges • Sazda • Steamed Rice • Plain Curd • Banana", type: "INTL" },
            ],
        },
        {
            meal: "Snacks", time: "04:30 PM - 05:15 PM", icon: "cookie",
            items: [
                { item: "Rusk (Boys) • Matthi (Girls) • Tea", type: "VEG" },
            ],
        },
        {
            meal: "Iftar", time: "06:15 PM - 07:00 PM", icon: "mosque",
            items: [
                { item: "🌙 Ramadan Iftar • Frooti • Apple • Aloo Bonda", type: "SPECIAL" },
            ],
        },
        {
            meal: "Dinner", time: "07:30 PM - 09:00 PM", icon: "dark_mode",
            items: [
                { item: "Menu as per regular schedule", type: "VEG" },
            ],
        },
    ],
};

const foodItems = [
    { name: "Chicken Burger", price: "₹149", rating: "4.5", time: "15 min", img: "🍔" },
    { name: "Margherita Pizza", price: "₹199", rating: "4.8", time: "20 min", img: "🍕" },
    { name: "Veg Momos", price: "₹79", rating: "4.2", time: "10 min", img: "🥟" },
];

function getTypeStyle(type: MealItem["type"]) {
    switch (type) {
        case "VEG": return "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400";
        case "NON-VEG": return "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400";
        case "BEV": return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400";
        case "INTL": return "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
        case "SOUTH": return "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
        case "SPECIAL": return "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
    }
}

function getTypeLabel(type: MealItem["type"]) {
    switch (type) {
        case "VEG": return "VEG";
        case "NON-VEG": return "NON-VEG";
        case "BEV": return "BEV";
        case "INTL": return "INTL";
        case "SOUTH": return "SOUTH";
        case "SPECIAL": return "SPECIAL";
    }
}

export default function CampusDining() {
    // Auto-select today's day
    const today = new Date().getDay(); // 0=Sun, 1=Mon...6=Sat
    const [selectedDay, setSelectedDay] = useState(today);
    const [activeTab, setActiveTab] = useState<"menu" | "order">("menu");

    const currentDayKey = daysOfWeek[selectedDay];
    const meals = weeklyMenu[currentDayKey] || [];

    return (
        <MobileLayout>
            <PageHeader title="Hostel & Mess" />

            <div className="px-4 py-4">
                {/* Tabs */}
                <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700 mb-5">
                    <button
                        onClick={() => setActiveTab("menu")}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === "menu" ? "text-primary border-b-2 border-primary" : "text-[#637388]"}`}
                    >
                        Mess Menu
                    </button>
                    <button
                        onClick={() => setActiveTab("order")}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === "order" ? "text-primary border-b-2 border-primary" : "text-[#637388]"}`}
                    >
                        Order Food
                    </button>
                </div>

                {activeTab === "menu" && (
                    <>
                        {/* Day Selector */}
                        <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
                            {daysOfWeek.map((day, i) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(i)}
                                    className={`min-w-[44px] py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all ${selectedDay === i
                                        ? "bg-primary text-white shadow-md"
                                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary/30"
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Today indicator */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-lg">today</span>
                            <span className="text-sm font-medium dark:text-white">
                                {selectedDay === today ? "Today's Menu" : `${currentDayKey} Menu`}
                            </span>
                            {selectedDay === today && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">Today</span>}
                        </div>

                        {/* Meals */}
                        {meals.map((slot) => (
                            <div key={slot.meal} className="mb-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">{slot.icon}</span>
                                        <h4 className="font-bold text-sm dark:text-white">{slot.meal}</h4>
                                    </div>
                                    <span className="text-[11px] text-[#637388] font-medium">{slot.time}</span>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                                    {slot.items.map((item, i) => (
                                        <div key={i} className={`flex items-start justify-between gap-3 px-4 py-3 bg-white dark:bg-gray-800 ${i < slot.items.length - 1 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}>
                                            <span className="text-sm dark:text-white flex-1 leading-relaxed">{item.item}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap mt-0.5 ${getTypeStyle(item.type)}`}>
                                                {getTypeLabel(item.type)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === "order" && (
                    <>
                        {/* Search */}
                        <div className="flex w-full items-stretch rounded-xl h-11 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:border-primary/50 shadow-sm transition-all mb-5">
                            <div className="text-[#637388] flex items-center justify-center pl-3">
                                <span className="material-symbols-outlined text-lg">search</span>
                            </div>
                            <input className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] px-3 text-sm dark:text-white" placeholder="Search food items..." />
                        </div>

                        <h3 className="font-bold mb-3 dark:text-white">Popular Items</h3>
                        <div className="flex flex-col gap-3">
                            {foodItems.map((item) => (
                                <div key={item.name} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                    <div className="size-14 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-3xl">{item.img}</div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold dark:text-white">{item.name}</h4>
                                        <div className="flex items-center gap-3 text-xs text-[#637388] mt-1">
                                            <span className="flex items-center gap-0.5">⭐ {item.rating}</span>
                                            <span className="flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="font-bold text-sm dark:text-white">{item.price}</span>
                                        <button className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">Add</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </MobileLayout>
    );
}
