import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { EmergencySOS } from "@/components/emergency/EmergencySOS";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-6 custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Floating Emergency Button */}
      <EmergencySOS />
    </div>
  );
}
