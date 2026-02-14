import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Mail,
  GraduationCap,
  BookOpen,
  Users,
  Users2,
  DollarSign,
  Library,
  CreditCard,
  Shirt,
  Heart,
  UtensilsCrossed,
  ArrowLeftRight,
  MapPin,
  Stethoscope,
  X,
  Sparkles,
  TrendingUp,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

// Define the structure for nav items, including grouping
type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  emergency?: boolean;
  subItems?: { id: string; label: string; icon: React.ElementType }[];
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    id: "academics_group",
    label: "Academics",
    icon: GraduationCap,
    subItems: [
      { id: "attendance", label: "Attendance Predictor", icon: GraduationCap },
      { id: "academic", label: "Academic Intelligence", icon: Sparkles },
      { id: "lms", label: "LMS", icon: BookOpen },
      { id: "library", label: "Library", icon: Library },
      { id: "students", label: "Student Directory", icon: Users },
    ]
  },
  {
    id: "mess_group",
    label: "Smart Mess",
    icon: UtensilsCrossed,
    subItems: [
      { id: "mess", label: "Mess Menu", icon: UtensilsCrossed },
      { id: "order-food", label: "Order Food", icon: UtensilsCrossed }, // New sub-item
    ]
  },
  { id: "fees", label: "Fee Tracker", icon: DollarSign },
  { id: "mail", label: "AI Mail Summarizer", icon: Mail, badge: "AI" },
  { id: "clubs", label: "Club Directory", icon: Users2 },
  { id: "digitalid", label: "Digital ID", icon: CreditCard },
  { id: "laundry", label: "Laundry Tracker", icon: Shirt },
  { id: "wellness", label: "Mental Health", icon: Heart },
  { id: "exchange", label: "Student Exchange", icon: ArrowLeftRight },
  { id: "explorer", label: "Explorer's Guide", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "emergency", label: "Medical Emergency", icon: Stethoscope, emergency: true },
];

export function Sidebar({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
  isCollapsed = false,
  toggleCollapse
}: SidebarProps) {
  const { user, logout } = useAuth();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["academics_group"]); // Default expanded

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  // Auto-expand group if active section is inside it
  useEffect(() => {
    navItems.forEach(item => {
      if (item.subItems) {
        if (item.subItems.some(sub => sub.id === activeSection)) {
          setExpandedGroups(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
        }
      }
    });
  }, [activeSection]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center p-4 border-b border-sidebar-border flex-shrink-0",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img src="/nexus_logo.svg" alt="NEXUS" className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">NEXUS</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider">STUDENT PORTAL</span>
              </div>
            </div>
          )}

          {/* Mobile Close Button */}
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent">
            <X className="h-5 w-5" />
          </Button>

          {/* Desktop Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="hidden lg:flex text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>
        </div>

        {/* Nav items */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            if (item.subItems) {
              const isExpanded = expandedGroups.includes(item.id);
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => !isCollapsed && toggleGroup(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group flex-shrink-0 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 text-indigo-500" />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium flex-1 truncate">{item.label}</span>
                        {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                      </>
                    )}
                  </button>

                  {/* Sub items */}
                  {isExpanded && !isCollapsed && (
                    <div className="pl-4 space-y-1 relative">
                      <div className="absolute left-6 top-0 bottom-0 w-px bg-sidebar-border" />
                      {item.subItems.map(subItem => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            onSectionChange(subItem.id);
                            onClose();
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group flex-shrink-0 ml-2",
                            activeSection === subItem.id
                              ? "text-sidebar-primary bg-sidebar-accent font-semibold" // Active state
                              : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                          )}
                        >
                          <subItem.icon className={cn("h-4 w-4", activeSection === subItem.id ? "text-sidebar-primary" : "text-muted-foreground")} />
                          <span className="font-medium text-sm flex-1 truncate">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group flex-shrink-0",
                  activeSection === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-indigo-500/25" // Active state matching design
                    : item.emergency
                      ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0",
                  activeSection === item.id ? "text-sidebar-primary-foreground" : item.emergency ? "text-muted-foreground group-hover:text-destructive" : "text-muted-foreground group-hover:text-sidebar-foreground"
                )} />

                {!isCollapsed && (
                  <>
                    <span className="font-medium flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="bg-sidebar-accent text-sidebar-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-sidebar-border flex-shrink-0">
          {isCollapsed ? (
            <div className="flex justify-center">
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-bold">
                  {user ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="bg-sidebar-accent/50 rounded-xl p-3 flex items-center gap-3 border border-sidebar-border">
              <Avatar className="h-10 w-10 border-2 border-sidebar-primary/20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-bold">
                  {user ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.name || "Student"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || "student@nexus.edu"}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

