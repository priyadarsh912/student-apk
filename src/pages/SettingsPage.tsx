import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigate } from "react-router-dom";
import { useSettings, type NotificationSettings, type ThemeMode, type LanguageCode } from "@/contexts/SettingsContext";

// --- Sub-panel components ---

function ProfilePanel() {
    const { settings, updateProfile } = useSettings();
    const [name, setName] = useState(settings.profile.name);
    const [email, setEmail] = useState(settings.profile.email);
    const [phone, setPhone] = useState(settings.profile.phone);
    const [dob, setDob] = useState(settings.profile.dob);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateProfile({ name, email, phone, dob });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <MobileLayout>
            <PageHeader title="Profile" />
            <div className="px-4 py-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <div className="size-20 rounded-full overflow-hidden border-3 border-primary/20">
                            <img alt="Profile" className="h-full w-full object-cover" src={settings.profile.avatar} />
                        </div>
                        <button className="absolute bottom-0 right-0 size-7 bg-primary text-white rounded-full flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-sm">photo_camera</span>
                        </button>
                    </div>
                    <p className="text-sm text-[#637388] mt-2">{settings.profile.studentId}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-1.5 block">Full Name</label>
                        <input value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-1.5 block">Email</label>
                        <input value={email} onChange={(e) => { setEmail(e.target.value); setSaved(false); }} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-1.5 block">Phone</label>
                        <input value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false); }} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-1.5 block">Date of Birth</label>
                        <input type="date" value={dob} onChange={(e) => { setDob(e.target.value); setSaved(false); }} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-1.5 block">Student ID</label>
                        <input value={settings.profile.studentId} disabled className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#637388] dark:bg-gray-800 dark:border-gray-700" />
                    </div>
                </div>

                <button onClick={handleSave} className={`w-full mt-6 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${saved ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}>
                    <span className="material-symbols-outlined text-lg">{saved ? "check_circle" : "save"}</span>
                    {saved ? "Saved Successfully!" : "Save Changes"}
                </button>
            </div>
        </MobileLayout>
    );
}

function SecurityPanel() {
    const { settings, setTwoFactorAuth, setBiometricLogin } = useSettings();
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [pwSaved, setPwSaved] = useState(false);
    const [pwError, setPwError] = useState("");

    const handlePasswordUpdate = () => {
        setPwError("");
        if (!currentPw) { setPwError("Enter current password"); return; }
        if (newPw.length < 6) { setPwError("New password must be at least 6 characters"); return; }
        if (newPw !== confirmPw) { setPwError("Passwords do not match"); return; }
        setPwSaved(true);
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
        setTimeout(() => setPwSaved(false), 3000);
    };

    return (
        <MobileLayout>
            <PageHeader title="Security" />
            <div className="px-4 py-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Change Password</h3>
                <div className="flex flex-col gap-3 mb-6">
                    <input type="password" placeholder="Current Password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-[#637388] focus:outline-none focus:border-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    <input type="password" placeholder="New Password (min 6 chars)" value={newPw} onChange={(e) => setNewPw(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-[#637388] focus:outline-none focus:border-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    <input type="password" placeholder="Confirm New Password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-[#637388] focus:outline-none focus:border-primary/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    {pwError && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span>{pwError}</p>}
                    <button onClick={handlePasswordUpdate} className={`w-full font-bold py-3 rounded-xl transition-all ${pwSaved ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}>
                        {pwSaved ? "✓ Password Updated" : "Update Password"}
                    </button>
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Security Options</h3>
                <div className="rounded-xl border border-gray-100 overflow-hidden dark:border-gray-700">
                    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-lg">verified_user</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium dark:text-white">Two-Factor Auth</p>
                                <p className="text-xs text-[#637388]">Extra layer of security</p>
                            </div>
                        </div>
                        <button onClick={() => setTwoFactorAuth(!settings.twoFactorAuth)} className={`w-11 h-6 rounded-full transition-colors relative ${settings.twoFactorAuth ? "bg-primary" : "bg-gray-300"}`}>
                            <div className={`size-5 bg-white rounded-full shadow-sm transition-all absolute top-0.5 ${settings.twoFactorAuth ? "left-5.5" : "left-0.5"}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-lg">fingerprint</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium dark:text-white">Biometric Login</p>
                                <p className="text-xs text-[#637388]">Use fingerprint or face</p>
                            </div>
                        </div>
                        <button onClick={() => setBiometricLogin(!settings.biometricLogin)} className={`w-11 h-6 rounded-full transition-colors relative ${settings.biometricLogin ? "bg-primary" : "bg-gray-300"}`}>
                            <div className={`size-5 bg-white rounded-full shadow-sm transition-all absolute top-0.5 ${settings.biometricLogin ? "left-5.5" : "left-0.5"}`} />
                        </button>
                    </div>
                </div>

                <div className="mt-6 rounded-xl bg-gray-50 border border-gray-100 p-4 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[#637388] text-lg">history</span>
                        <h3 className="text-sm font-bold dark:text-white">Recent Login Activity</h3>
                    </div>
                    {[
                        { device: "Chrome — Windows", time: "Today, 2:30 PM", current: true },
                        { device: "Safari — iPhone", time: "Yesterday, 9:15 AM", current: false },
                        { device: "Firefox — MacBook", time: "Feb 12, 4:00 PM", current: false },
                    ].map((l, i) => (
                        <div key={i} className="flex items-center justify-between py-2.5 border-t border-gray-100 dark:border-gray-700 first:border-t-0">
                            <div>
                                <p className="text-sm dark:text-gray-200">{l.device}</p>
                                <p className="text-xs text-[#637388]">{l.time}</p>
                            </div>
                            {l.current && <span className="text-[10px] font-bold uppercase bg-green-50 text-green-600 px-2 py-0.5 rounded">Current</span>}
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}

function NotificationsPanel() {
    const { settings, toggleNotification } = useSettings();

    const ToggleRow = ({ label, desc, field }: { label: string; desc: string; field: keyof NotificationSettings }) => (
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-50 last:border-b-0 dark:bg-gray-800 dark:border-gray-700">
            <div>
                <p className="text-sm font-medium dark:text-white">{label}</p>
                <p className="text-xs text-[#637388]">{desc}</p>
            </div>
            <button onClick={() => toggleNotification(field)} className={`w-11 h-6 rounded-full transition-colors relative ${settings.notifications[field] ? "bg-primary" : "bg-gray-300"}`}>
                <div className={`size-5 bg-white rounded-full shadow-sm transition-all absolute top-0.5 ${settings.notifications[field] ? "left-5.5" : "left-0.5"}`} />
            </button>
        </div>
    );

    return (
        <MobileLayout>
            <PageHeader title="Notifications" />
            <div className="px-4 py-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Categories</h3>
                <div className="rounded-xl border border-gray-100 overflow-hidden mb-6 dark:border-gray-700">
                    <ToggleRow label="Academic Updates" desc="Class schedules & changes" field="academic" />
                    <ToggleRow label="Attendance Alerts" desc="Low attendance warnings" field="attendance" />
                    <ToggleRow label="Exam Reminders" desc="Upcoming exams & results" field="exams" />
                    <ToggleRow label="Fee Reminders" desc="Payment dues & receipts" field="fees" />
                    <ToggleRow label="Campus Events" desc="Fests, workshops & talks" field="events" />
                    <ToggleRow label="Announcements" desc="Official notices" field="announcements" />
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Channels</h3>
                <div className="rounded-xl border border-gray-100 overflow-hidden dark:border-gray-700">
                    <ToggleRow label="Email" desc={settings.profile.email} field="email" />
                    <ToggleRow label="Push Notifications" desc="Mobile & browser alerts" field="push" />
                    <ToggleRow label="SMS" desc={settings.profile.phone} field="sms" />
                </div>
            </div>
        </MobileLayout>
    );
}

function LanguagePanel() {
    const { settings, setLanguage } = useSettings();
    const languages: { code: LanguageCode; name: string; native: string }[] = [
        { code: "en", name: "English (US)", native: "English" },
        { code: "hi", name: "Hindi", native: "हिन्दी" },
        { code: "ta", name: "Tamil", native: "தமிழ்" },
        { code: "te", name: "Telugu", native: "తెలుగు" },
        { code: "bn", name: "Bengali", native: "বাংলা" },
        { code: "mr", name: "Marathi", native: "मराठी" },
        { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
    ];

    return (
        <MobileLayout>
            <PageHeader title="Language" />
            <div className="px-4 py-6">
                <div className="rounded-xl border border-gray-100 overflow-hidden dark:border-gray-700">
                    {languages.map((lang, i) => (
                        <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`flex items-center justify-between w-full p-4 text-left transition-colors ${i < languages.length - 1 ? "border-b border-gray-50 dark:border-gray-700" : ""} ${settings.language === lang.code ? "bg-primary/5" : "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"}`}
                        >
                            <div>
                                <p className="text-sm font-medium dark:text-white">{lang.name}</p>
                                <p className="text-xs text-[#637388]">{lang.native}</p>
                            </div>
                            {settings.language === lang.code && (
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                            )}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-[#637388] mt-3 px-1">Selected language will be saved automatically.</p>
            </div>
        </MobileLayout>
    );
}

function ThemePanel() {
    const { settings, setTheme } = useSettings();
    const themes: { id: ThemeMode; label: string; icon: string; desc: string; preview: string }[] = [
        { id: "light", label: "Light", icon: "light_mode", desc: "Always use light theme", preview: "bg-white border-gray-200" },
        { id: "dark", label: "Dark", icon: "dark_mode", desc: "Always use dark theme", preview: "bg-gray-900 border-gray-700" },
        { id: "system", label: "System Default", icon: "settings_brightness", desc: "Follow device settings", preview: "bg-gradient-to-r from-white to-gray-900 border-gray-300" },
    ];

    return (
        <MobileLayout>
            <PageHeader title="Theme" />
            <div className="px-4 py-6">
                <div className="flex flex-col gap-3">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${settings.theme === t.id ? "border-primary bg-primary/5" : "border-gray-100 bg-white hover:border-gray-200 dark:bg-gray-800 dark:border-gray-700"}`}
                        >
                            <div className={`size-12 rounded-xl ${t.preview} border`} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg text-primary">{t.icon}</span>
                                    <p className="text-sm font-bold dark:text-white">{t.label}</p>
                                </div>
                                <p className="text-xs text-[#637388] mt-0.5">{t.desc}</p>
                            </div>
                            {settings.theme === t.id && (
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                            )}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-[#637388] mt-3 px-1">Theme changes are applied instantly and saved.</p>
            </div>
        </MobileLayout>
    );
}

function DataStoragePanel() {
    const [cleared, setCleared] = useState(false);
    const { resetSettings } = useSettings();

    return (
        <MobileLayout>
            <PageHeader title="Data & Storage" />
            <div className="px-4 py-6">
                <div className="rounded-xl bg-primary p-5 text-white mb-6">
                    <p className="text-sm text-white/80 font-medium">Storage Used</p>
                    <p className="text-3xl font-bold mt-1">128 MB</p>
                    <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: "25%" }} />
                    </div>
                    <p className="text-xs text-white/70 mt-1.5">128 MB of 512 MB used</p>
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Breakdown</h3>
                <div className="rounded-xl border border-gray-100 overflow-hidden mb-6 dark:border-gray-700">
                    {[
                        { label: "Cached Files", size: "45 MB", icon: "cached", color: "text-orange-500 bg-orange-100" },
                        { label: "Downloaded Notes", size: "52 MB", icon: "download", color: "text-primary bg-primary/10" },
                        { label: "Offline Content", size: "28 MB", icon: "cloud_off", color: "text-green-600 bg-green-100" },
                        { label: "App Data", size: "3 MB", icon: "data_usage", color: "text-purple-500 bg-purple-100" },
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 p-4 bg-white dark:bg-gray-800 ${i < 3 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}>
                            <div className={`size-9 rounded-lg flex items-center justify-center ${item.color}`}>
                                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium dark:text-white">{item.label}</p>
                            </div>
                            <span className="text-sm text-[#637388] font-medium">{item.size}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setCleared(true)}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${cleared ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"}`}
                    >
                        <span className="material-symbols-outlined text-lg">{cleared ? "check_circle" : "delete"}</span>
                        {cleared ? "Cache Cleared!" : "Clear Cache (45 MB)"}
                    </button>
                    <button
                        onClick={() => { resetSettings(); }}
                        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">restart_alt</span>
                        Reset All Settings
                    </button>
                </div>
            </div>
        </MobileLayout>
    );
}

function HelpCenterPanel() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const faqs = [
        { q: "How do I check my attendance?", a: "Go to the Attendance section from the dashboard. You can view subject-wise attendance, predictions, and plan future classes." },
        { q: "How can I apply for leave?", a: "Navigate to Notices & Leave from the dashboard, then tap 'Apply for Leave'. Fill in the type, dates, reason, and submit." },
        { q: "Where can I see my exam schedule?", a: "Tap the 'Exams' section from the dashboard to view upcoming exams, past results, and download hall tickets." },
        { q: "How do I pay my fees?", a: "Go to Fees & Payments. You'll see outstanding dues and can pay using the 'Pay Now' button with various payment methods." },
        { q: "How to report a lost item?", a: "Go to Lost & Found from the dashboard and tap 'Report'. Fill in the item details, location, and upload a photo if available." },
        { q: "How do I change my profile?", a: "Go to Settings → Profile. You can update your name, email, phone number, and date of birth. Changes are saved to your device." },
        { q: "How does the theme setting work?", a: "Go to Settings → Theme. Choose Light, Dark or System Default. The change is applied instantly and persists across sessions." },
    ];

    return (
        <MobileLayout>
            <PageHeader title="Help Center" />
            <div className="px-4 py-6">
                <div className="flex w-full items-stretch rounded-xl h-11 bg-white border border-gray-200 focus-within:border-primary/50 shadow-sm transition-all mb-5 dark:bg-gray-800 dark:border-gray-700">
                    <div className="text-[#637388] flex items-center justify-center pl-3">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </div>
                    <input className="flex w-full border-none bg-transparent focus:outline-none h-full placeholder:text-[#637388] px-3 text-sm dark:text-white" placeholder="Search help articles..." />
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Frequently Asked Questions</h3>
                <div className="flex flex-col gap-2">
                    {faqs.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-gray-100 overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
                            <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="flex items-center justify-between w-full p-4 text-left">
                                <p className="text-sm font-medium pr-3 dark:text-white">{faq.q}</p>
                                <span className={`material-symbols-outlined text-[#637388] text-lg transition-transform ${expandedFaq === i ? "rotate-180" : ""}`}>expand_more</span>
                            </button>
                            {expandedFaq === i && (
                                <div className="px-4 pb-4 -mt-1">
                                    <p className="text-sm text-[#637388] leading-relaxed">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 rounded-xl bg-primary/5 border border-primary/10 p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                    <div className="flex-1">
                        <p className="text-sm font-bold dark:text-white">Need more help?</p>
                        <p className="text-xs text-[#637388]">Contact support team</p>
                    </div>
                    <button className="text-primary text-sm font-bold bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">Chat</button>
                </div>
            </div>
        </MobileLayout>
    );
}

function ReportBugPanel() {
    const [bugType, setBugType] = useState("ui");
    const [desc, setDesc] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const types = [
        { id: "ui", label: "UI Issue", icon: "web" },
        { id: "crash", label: "Crash / Freeze", icon: "report_problem" },
        { id: "data", label: "Data Error", icon: "database" },
        { id: "other", label: "Other", icon: "more_horiz" },
    ];

    return (
        <MobileLayout>
            <PageHeader title="Report a Bug" />
            <div className="px-4 py-6">
                {submitted ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 dark:text-white">Bug Report Submitted!</h3>
                        <p className="text-sm text-[#637388] mb-6">Thank you for helping us improve. We'll look into it shortly.</p>
                        <button onClick={() => { setSubmitted(false); setDesc(""); }} className="text-primary font-bold text-sm">Submit Another</button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Bug Type</h3>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            {types.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setBugType(t.id)}
                                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${bugType === t.id ? "bg-primary/10 border-primary text-primary" : "bg-white border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"}`}
                                >
                                    <span className="material-symbols-outlined text-lg">{t.icon}</span>
                                    <span className="text-sm font-medium">{t.label}</span>
                                </button>
                            ))}
                        </div>

                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Describe the Issue</h3>
                        <textarea
                            rows={5}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Tell us what happened, what you expected, and steps to reproduce..."
                            className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm placeholder:text-[#637388] focus:outline-none focus:border-primary/50 resize-none mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />

                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3">Attach Screenshot (Optional)</h3>
                        <button className="w-full flex flex-col items-center justify-center py-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-primary/30 transition-colors mb-6 dark:bg-gray-800 dark:border-gray-700">
                            <span className="material-symbols-outlined text-2xl text-[#637388] mb-1">add_photo_alternate</span>
                            <p className="text-xs text-[#637388]">Tap to attach screenshot</p>
                        </button>

                        <button
                            onClick={() => desc.trim() && setSubmitted(true)}
                            className={`w-full font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 ${desc.trim() ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                        >
                            <span className="material-symbols-outlined text-lg">send</span>
                            Submit Report
                        </button>
                    </>
                )}
            </div>
        </MobileLayout>
    );
}

function AboutPanel() {
    return (
        <MobileLayout>
            <PageHeader title="About" />
            <div className="px-4 py-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="size-20 rounded-2xl bg-primary flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-white text-4xl">school</span>
                    </div>
                    <h2 className="text-xl font-bold dark:text-white">Nexus</h2>
                    <p className="text-sm text-[#637388]">Student Management Platform</p>
                    <span className="mt-2 text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">Version 2.1.0</span>
                </div>

                <div className="rounded-xl border border-gray-100 overflow-hidden mb-6 dark:border-gray-700">
                    {[
                        { label: "Build Number", value: "2024.02.14.001" },
                        { label: "Platform", value: "Web (PWA Ready)" },
                        { label: "Framework", value: "React + Vite" },
                        { label: "Last Updated", value: "Feb 14, 2026" },
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 ${i < 3 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}>
                            <p className="text-sm text-[#637388]">{item.label}</p>
                            <p className="text-sm font-medium dark:text-white">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-gray-100 overflow-hidden mb-6 dark:border-gray-700">
                    {[
                        { label: "Terms of Service", icon: "description" },
                        { label: "Privacy Policy", icon: "privacy_tip" },
                        { label: "Open Source Licenses", icon: "code" },
                    ].map((item, i) => (
                        <button key={i} className={`flex items-center gap-3 w-full p-4 bg-white text-left hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-750 ${i < 2 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}>
                            <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                            <p className="text-sm font-medium flex-1 dark:text-white">{item.label}</p>
                            <span className="material-symbols-outlined text-[#637388] text-lg">chevron_right</span>
                        </button>
                    ))}
                </div>

                <p className="text-center text-xs text-[#637388]">Made with ❤️ by Nexus Team</p>
                <p className="text-center text-xs text-[#637388] mt-1">© 2026 University. All rights reserved.</p>
            </div>
        </MobileLayout>
    );
}

// --- Main Settings Page ---

type Panel = null | "profile" | "security" | "notifications" | "language" | "theme" | "storage" | "help" | "bug" | "about";

export default function SettingsPage() {
    const navigate = useNavigate();
    const { settings } = useSettings();
    const [activePanel, setActivePanel] = useState<Panel>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const langNames: Record<string, string> = { en: "English (US)", hi: "Hindi", ta: "Tamil", te: "Telugu", bn: "Bengali", mr: "Marathi", kn: "Kannada" };
    const themeNames: Record<string, string> = { light: "Light", dark: "Dark", system: "System default" };

    if (activePanel === "profile") return <ProfilePanel />;
    if (activePanel === "security") return <SecurityPanel />;
    if (activePanel === "notifications") return <NotificationsPanel />;
    if (activePanel === "language") return <LanguagePanel />;
    if (activePanel === "theme") return <ThemePanel />;
    if (activePanel === "storage") return <DataStoragePanel />;
    if (activePanel === "help") return <HelpCenterPanel />;
    if (activePanel === "bug") return <ReportBugPanel />;
    if (activePanel === "about") return <AboutPanel />;

    const settingsGroups = [
        {
            title: "Account",
            items: [
                { label: "Profile", icon: "person", desc: settings.profile.name, panel: "profile" as Panel },
                { label: "Security", icon: "lock", desc: settings.twoFactorAuth ? "2FA Enabled" : "2FA Disabled", panel: "security" as Panel },
                { label: "Notifications", icon: "notifications", desc: `${Object.values(settings.notifications).filter(Boolean).length} active`, panel: "notifications" as Panel },
            ],
        },
        {
            title: "Preferences",
            items: [
                { label: "Language", icon: "translate", desc: langNames[settings.language] || "English (US)", panel: "language" as Panel },
                { label: "Theme", icon: "dark_mode", desc: themeNames[settings.theme] || "System default", panel: "theme" as Panel },
                { label: "Data & Storage", icon: "storage", desc: "128 MB used", panel: "storage" as Panel },
            ],
        },
        {
            title: "Support",
            items: [
                { label: "Help Center", icon: "help", desc: "FAQs and guides", panel: "help" as Panel },
                { label: "Report a Bug", icon: "bug_report", desc: "Send us feedback", panel: "bug" as Panel },
                { label: "About", icon: "info", desc: "App version 2.1.0", panel: "about" as Panel },
            ],
        },
    ];

    return (
        <MobileLayout>
            <PageHeader title="Settings" showBack={false} />

            <div className="px-4 py-6">
                {/* User Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 mb-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="size-14 rounded-full overflow-hidden border-2 border-primary/20">
                        <img alt="Profile" className="h-full w-full object-cover" src={settings.profile.avatar} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold dark:text-white">{settings.profile.name}</h3>
                        <p className="text-xs text-[#637388]">{settings.profile.email}</p>
                    </div>
                    <button onClick={() => setActivePanel("profile")} className="text-primary">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                {/* Settings Groups */}
                {settingsGroups.map((group) => (
                    <div key={group.title} className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#637388] mb-3 px-1">{group.title}</h3>
                        <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                            {group.items.map((item, i) => (
                                <button
                                    key={item.label}
                                    onClick={() => setActivePanel(item.panel)}
                                    className={`flex items-center gap-4 w-full p-4 bg-white text-left hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-750 ${i < group.items.length - 1 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}
                                >
                                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium dark:text-white">{item.label}</p>
                                        <p className="text-xs text-[#637388]">{item.desc}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-[#637388] text-lg">chevron_right</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Logout */}
                <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full py-3.5 rounded-xl border border-red-200 text-red-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Log Out
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-6" onClick={() => setShowLogoutConfirm(false)}>
                    <div className="bg-white dark:bg-gray-800 w-full max-w-[380px] rounded-2xl p-6 animate-slide-up shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center mb-6">
                            <div className="size-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-red-500 text-3xl">logout</span>
                            </div>
                            <h3 className="text-xl font-bold dark:text-white">Log Out?</h3>
                            <p className="text-sm text-[#637388] text-center mt-2 leading-relaxed">Are you sure you want to log out of your account?</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 py-3.5 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MobileLayout>
    );
}
