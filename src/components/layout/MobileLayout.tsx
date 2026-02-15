import { BottomNavBar } from "./BottomNavBar";

interface MobileLayoutProps {
    children: React.ReactNode;
    hideBottomNav?: boolean;
}

export function MobileLayout({ children, hideBottomNav = false }: MobileLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f6f7f8] dark:bg-gray-950 max-w-md mx-auto relative">
            <div className="pb-24">
                {children}
            </div>
            {!hideBottomNav && <BottomNavBar />}
        </div>
    );
}
