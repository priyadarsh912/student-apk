import { useLocation, useNavigate } from "react-router-dom";

const routeNavItems = [
  { id: "home", label: "Home", icon: "home", path: "/" },
  { id: "timetable", label: "Timetable", icon: "calendar_month", path: "/academic-schedule" },
  { id: "attendance", label: "Attendance", icon: "monitoring", path: "/attendance" },
  { id: "result", label: "Result", icon: "school", path: "/exams" },
  { id: "settings", label: "Settings", icon: "settings", path: "/settings" },
];

const tabNavItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "timetable", label: "Timetable", icon: "calendar_month" },
  { id: "attendance", label: "Attendance", icon: "monitoring" },
  { id: "result", label: "Result", icon: "school" },
];

interface BottomNavBarProps {
  /** When provided, the nav renders as tab-controller for the Dashboard swipeable sections */
  activeTab?: number;
  onTabChange?: (idx: number) => void;
}

export function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isTabMode = activeTab !== undefined && onTabChange !== undefined;

  // In tab-mode render the 4 swipeable tabs
  if (isTabMode) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0d0f14]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#252830] pb-safe pt-3 px-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {tabNavItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onTabChange(i)}
              className={`flex flex-col items-center gap-1 transition-all min-w-0 flex-1 ${activeTab === i
                ? "text-blue-500 dark:text-blue-400"
                : "text-[#637388] dark:text-gray-500 hover:text-blue-400"
                }`}
            >
              <span className={`material-symbols-outlined text-[24px] transition-transform duration-200 ${activeTab === i ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.label}
              </span>
              {activeTab === i && <div className="size-1 rounded-full bg-blue-500" />}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Default route-based mode for sub-pages
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-primary/10 dark:border-gray-700 pb-safe pt-3 px-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {routeNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-colors min-w-0 flex-1 ${isActive(item.path)
              ? "text-primary"
              : "text-[#637388] hover:text-primary"
              }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
