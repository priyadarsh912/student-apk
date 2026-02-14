import { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
import {
  Mail,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Bell,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TimetableEntry {
  time: string;
  subject: string;
  room: string;
  status?: "completed" | "ongoing" | "upcoming";
  colorClass?: string;
}

const todayTimetable: TimetableEntry[] = [
  { time: "9:00 AM", subject: "Data Structures & Algorithms", room: "LH-101", status: "completed" },
  { time: "10:00 AM", subject: "Digital Electronics", room: "LH-203", status: "ongoing" },
  { time: "11:00 AM", subject: "Programming Practice", room: "Lab-05", status: "upcoming" },
  { time: "2:00 PM", subject: "Mathematics-II", room: "LH-101", status: "upcoming" },
];

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {

  return (
    <div className="space-y-6 animate-fade-in text-foreground">

      {/* Top Section: Welcome & Stats in a row/grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Welcome Card - Spans 8 cols */}
        <div className="md:col-span-8 relative overflow-hidden rounded-3xl bg-card p-6 border border-border shadow-sm">
          {/* Background gradient effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">Good morning,</p>
              <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome back, Student!</h1>
              <p className="text-muted-foreground text-sm max-w-lg">
                You have 3 classes today and 2 pending assignments. Your attendance is looking good!
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 group">
                <div className="mr-2 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs font-bold">ID</span>
                </div>
                <div className="flex flex-col items-start text-left mr-1">
                  <span className="text-[10px] uppercase font-semibold text-indigo-100 leading-none">Virtual ID</span>
                  <span className="text-sm font-bold leading-none">Download</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Attendance Stat - Spans 4 cols */}
        <div className="md:col-span-4 rounded-3xl bg-card p-6 border border-border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-500/20">+2.1%</Badge>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-1">82.4%</h2>
            <p className="text-muted-foreground">Attendance</p>
          </div>
        </div>
      </div>

      {/* Second Row: Schedule & other widgets */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Today's Schedule - Spans 8 cols */}
        <div className="md:col-span-8 rounded-3xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-500" />
                Today's Schedule
              </h3>
              <p className="text-muted-foreground text-sm mt-1">Saturday, February 7</p>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-0">
            {todayTimetable.map((item, index) => (
              <div key={index} className={`flex items-center p-6 border-b border-border last:border-0 hover:bg-accent/50 transition-colors ${item.status === 'ongoing' ? 'bg-indigo-500/5' : ''}`}>
                <div className="w-24 flex-shrink-0">
                  <p className="text-foreground font-semibold">{item.time}</p>
                  {item.status === 'ongoing' && <Badge className="mt-1 bg-indigo-500 hover:bg-indigo-600 text-white border-0">Now</Badge>}
                </div>

                {/* Vertical Line/Indicator */}
                <div className="mx-4 h-12 w-1 rounded-full bg-muted relative">
                  {item.status === 'ongoing' && <div className="absolute top-0 bottom-0 left-0 right-0 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>}
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-medium text-foreground">{item.subject}</h4>
                  <p className="text-muted-foreground">{item.room}</p>
                </div>

                <div className="hidden sm:block">
                  {item.status === 'completed' && <span className="text-emerald-600 dark:text-emerald-500 text-sm font-medium">Completed</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Widgets - Spans 4 cols */}
        <div className="md:col-span-4 space-y-6">

          {/* AI Mail Summarizer Widget */}
          <div
            className="rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/50 dark:to-purple-900/50 p-6 border border-indigo-200 dark:border-white/10 shadow-sm cursor-pointer hover:border-indigo-500/50 transition-all group"
            onClick={() => onNavigate("mail")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-background/50 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-indigo-500 dark:text-indigo-300" />
              </div>
              <span className="text-indigo-600 dark:text-indigo-200 font-medium">AI Insight</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">12 new emails summarized</h3>
            <div className="flex justify-between items-center mt-4">
              <p className="text-indigo-600 dark:text-indigo-300 text-sm">Tap to view summary</p>
              <ChevronRight className="h-5 w-5 text-indigo-500 dark:text-indigo-300 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Notifications / Assignments */}
          <div className="rounded-3xl bg-card p-6 border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-foreground">Assignments</h3>
              <Badge variant="destructive" className="rounded-full">2 Pending</Badge>
            </div>
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-muted/50 border border-border">
                <div className="flex justify-between mb-2">
                  <span className="text-foreground font-medium text-sm">DBMS Lab Record</span>
                  <span className="text-red-500 dark:text-red-400 text-xs font-bold">Today</span>
                </div>
                <Progress value={80} className="h-2 bg-muted" indicatorClassName="bg-indigo-500" />
              </div>
              <div className="p-3 rounded-2xl bg-muted/50 border border-border">
                <div className="flex justify-between mb-2">
                  <span className="text-foreground font-medium text-sm">Maths Assignment</span>
                  <span className="text-orange-500 dark:text-orange-400 text-xs font-bold">Tomorrow</span>
                </div>
                <Progress value={30} className="h-2 bg-muted" indicatorClassName="bg-orange-500" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

