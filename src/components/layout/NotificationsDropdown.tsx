
import {
    Bell,
    Check,
    Info,
    AlertTriangle,
    FileText,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: "info" | "warning" | "success" | "event";
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "DBMS Lab Rescheduled",
        description: "The DBMS Lab scheduled for today at 2 PM has been postponed to tomorrow.",
        time: "10 min ago",
        read: false,
        type: "warning",
    },
    {
        id: "2",
        title: "New Assignment Uploaded",
        description: "Prof. Sharma uploaded a new assignment for Digital Electronics.",
        time: "1 hour ago",
        read: false,
        type: "info",
    },
    {
        id: "3",
        title: "Library Book Due",
        description: "Your borrowed book 'Introduction to Algorithms' is due tomorrow.",
        time: "2 hours ago",
        read: false,
        type: "info",
    },
    {
        id: "4",
        title: "Hackathon Registration",
        description: "Registration for the annual college hackathon is now open!",
        time: "1 day ago",
        read: true,
        type: "event",
    },
    {
        id: "5",
        title: "Attendance Update",
        description: "Your attendance for 'Data Structures' has been updated.",
        time: "2 days ago",
        read: true,
        type: "success",
    },
];

export function NotificationsDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const getIcon = (type: Notification["type"]) => {
        switch (type) {
            case "warning": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
            case "success": return <Check className="h-4 w-4 text-emerald-500" />;
            case "event": return <Calendar className="h-4 w-4 text-indigo-500" />;
            default: return <Info className="h-4 w-4 text-blue-500" />;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center animate-in zoom-in">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h4 className="font-semibold leading-none text-foreground">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-auto py-1 px-2 text-muted-foreground hover:text-foreground"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[350px]">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                            No notifications
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={`flex items-start gap-3 p-4 cursor-pointer focus:bg-accent/50 ${!notification.read ? "bg-accent/10" : ""
                                        }`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className={`mt-1 p-2 rounded-full bg-background border border-border shrink-0`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="flex justify-between items-start w-full">
                                            <span className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {notification.title}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.description}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-2" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <div className="p-2">
                    <Button variant="ghost" className="w-full text-xs justify-center h-8" size="sm">
                        View all notifications
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
