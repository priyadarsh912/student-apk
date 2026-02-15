import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- Types ---
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    dob: string;
    studentId: string;
    avatar: string;
}

export interface NotificationSettings {
    academic: boolean;
    attendance: boolean;
    exams: boolean;
    fees: boolean;
    events: boolean;
    announcements: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
}

export type ThemeMode = "light" | "dark" | "system";
export type LanguageCode = "en" | "hi" | "ta" | "te" | "bn" | "mr" | "kn";

export interface AppSettings {
    profile: UserProfile;
    theme: ThemeMode;
    language: LanguageCode;
    notifications: NotificationSettings;
    twoFactorAuth: boolean;
    biometricLogin: boolean;
}

interface SettingsContextType {
    settings: AppSettings;
    updateProfile: (profile: Partial<UserProfile>) => void;
    setTheme: (theme: ThemeMode) => void;
    setLanguage: (lang: LanguageCode) => void;
    toggleNotification: (key: keyof NotificationSettings) => void;
    setTwoFactorAuth: (val: boolean) => void;
    setBiometricLogin: (val: boolean) => void;
    resetSettings: () => void;
}

// --- Defaults ---
const defaultProfile: UserProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+91 98765 43210",
    dob: "1999-05-15",
    studentId: "STU-2024-001",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKt4x-7_aYHXk2msiUkbkitCcfDqktDPhEvLT6rOigd2TwiYgYUgcq10s9o4CW1bfS6IdywUovuBdgFih5h9qTgYxzF_AWzlK-qvKTjpX9uT7f-LlHR0TwRJmIwPfuUrW78c9A0B-FM8ZGwUvtvM-YMx3QzFRKFCTekSDXzlZeLVFzM8wt7vVEyeHjHhD_Rj_Mwb0JaqTBMajFZxr_bqDSa5suHfIJoplKlx3IbEmVSLZE-ld_-eQP9xvP5KpsYEtNt0vXPBt8OKTY",
};

const defaultNotifications: NotificationSettings = {
    academic: true,
    attendance: true,
    exams: true,
    fees: false,
    events: true,
    announcements: true,
    email: true,
    push: true,
    sms: false,
};

const defaultSettings: AppSettings = {
    profile: defaultProfile,
    theme: "system",
    language: "en",
    notifications: defaultNotifications,
    twoFactorAuth: true,
    biometricLogin: false,
};

// --- Storage helpers ---
const STORAGE_KEY = "nexus_app_settings";

function loadSettings(): AppSettings {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return { ...defaultSettings, ...parsed, profile: { ...defaultProfile, ...parsed.profile }, notifications: { ...defaultNotifications, ...parsed.notifications } };
        }
    } catch { /* ignore parse errors */ }
    return defaultSettings;
}

function saveSettings(settings: AppSettings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// --- Theme application ---
function applyTheme(theme: ThemeMode) {
    const root = document.documentElement;
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

// --- Context ---
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<AppSettings>(loadSettings);

    // Persist to localStorage on every change
    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    // Apply theme on mount and on change
    useEffect(() => {
        applyTheme(settings.theme);

        // Listen for system theme changes when set to "system"
        if (settings.theme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = () => applyTheme("system");
            mq.addEventListener("change", handler);
            return () => mq.removeEventListener("change", handler);
        }
    }, [settings.theme]);

    const updateProfile = (partial: Partial<UserProfile>) => {
        setSettings((prev) => ({ ...prev, profile: { ...prev.profile, ...partial } }));
    };

    const setTheme = (theme: ThemeMode) => {
        setSettings((prev) => ({ ...prev, theme }));
    };

    const setLanguage = (lang: LanguageCode) => {
        setSettings((prev) => ({ ...prev, language: lang }));
    };

    const toggleNotification = (key: keyof NotificationSettings) => {
        setSettings((prev) => ({
            ...prev,
            notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
        }));
    };

    const setTwoFactorAuth = (val: boolean) => {
        setSettings((prev) => ({ ...prev, twoFactorAuth: val }));
    };

    const setBiometricLogin = (val: boolean) => {
        setSettings((prev) => ({ ...prev, biometricLogin: val }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <SettingsContext.Provider
            value={{ settings, updateProfile, setTheme, setLanguage, toggleNotification, setTwoFactorAuth, setBiometricLogin, resetSettings }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
    return ctx;
}
