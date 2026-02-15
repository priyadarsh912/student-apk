import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const transactions = [
    { title: "Tuition Fee - Semester 1", date: "Oct 15, 2023", amount: "-₹1,25,000", icon: "school", iconColor: "bg-primary/10 text-primary" },
    { title: "Hostel Fee Payment", date: "Oct 10, 2023", amount: "-₹48,000", icon: "apartment", iconColor: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
    { title: "Scholarship Credit", date: "Oct 01, 2023", amount: "+₹50,000", icon: "paid", iconColor: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400", isCredit: true },
    { title: "Library Fine", date: "Sep 28, 2023", amount: "-₹500", icon: "menu_book", iconColor: "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400" },
];

const dueDates = [
    { title: "Exam Fee - Semester 2", amount: "₹15,500", due: "Nov 10, 2023", urgent: true },
    { title: "Sports Complex", amount: "₹3,500", due: "Nov 15, 2023", urgent: false },
];

export default function FeesAndMessages() {
    return (
        <MobileLayout>
            <PageHeader title="Fees & Payments" />

            <div className="px-4 py-6">
                {/* Balance Card */}
                <div className="bg-primary rounded-2xl p-5 text-white mb-6">
                    <p className="text-sm text-white/80 font-medium">Total Outstanding</p>
                    <p className="text-3xl font-bold mt-1">₹1,24,500</p>
                    <div className="flex items-center gap-4 mt-4">
                        <button className="flex-1 bg-white text-primary font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-lg">payment</span>
                            Pay Now
                        </button>
                        <button className="flex-1 bg-white/20 text-white font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Statement
                        </button>
                    </div>
                </div>

                {/* Upcoming Due */}
                <div className="mb-6">
                    <h3 className="font-bold mb-3 dark:text-white">Upcoming Due</h3>
                    <div className="flex flex-col gap-3">
                        {dueDates.map((d, i) => (
                            <div key={i} className={`flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border ${d.urgent ? "border-red-200 dark:border-red-800" : "border-gray-100 dark:border-gray-700"}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`size-10 rounded-lg flex items-center justify-center ${d.urgent ? "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}>
                                        <span className="material-symbols-outlined">event</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium dark:text-white">{d.title}</p>
                                        <p className="text-xs text-[#637388]">Due: {d.due}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-sm dark:text-white">{d.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transaction Activity */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold dark:text-white">Recent Activity</h3>
                        <button className="text-primary text-sm font-semibold">View All</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {transactions.map((t, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <div className={`size-10 rounded-lg flex items-center justify-center ${t.iconColor}`}>
                                    <span className="material-symbols-outlined text-lg">{t.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium dark:text-white">{t.title}</p>
                                    <p className="text-xs text-[#637388]">{t.date}</p>
                                </div>
                                <span className={`text-sm font-bold ${t.isCredit ? "text-green-600 dark:text-green-400" : "dark:text-white"}`}>{t.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
