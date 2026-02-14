
import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { ArrowRight, Calendar, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data
const SUBJECTS = [
  { id: 1, name: "Data Structures", code: "CS201", attended: 24, total: 30, color: "#8b5cf6" },
  { id: 2, name: "Database Systems", code: "CS202", attended: 18, total: 25, color: "#ec4899" },
  { id: 3, name: "Computer Networks", code: "CS203", attended: 28, total: 28, color: "#10b981" },
  { id: 4, name: "Op. Systems", code: "CS204", attended: 20, total: 32, color: "#ef4444" },
  { id: 5, name: "Mathematics IV", code: "MA201", attended: 22, total: 26, color: "#f59e0b" },
  { id: 6, name: "Soft Skills", code: "HS201", attended: 15, total: 18, color: "#06b6d4" },
];

const ATTENDANCE_LIMIT = 75;

const UpcomingClasses = [
  { day: "Mon", date: "10", subject: "CS201", status: "present" },
  { day: "Tue", date: "11", subject: "MA201", status: "present" },
  { day: "Wed", date: "12", subject: "CS203", status: "absent" },
  { day: "Thu", date: "13", subject: "CS202", status: "leave" },
  { day: "Fri", date: "14", subject: "CS204", status: "future" },
  { day: "Sat", date: "15", subject: "Labs", status: "future" },
  { day: "Sun", date: "16", subject: "-", status: "none" },
];

export function AttendanceDashboard() {
  const [futureClasses, setFutureClasses] = useState([0]);

  // Derived State
  const additionalClasses = futureClasses[0];
  
  const overallStats = useMemo(() => {
    let totalAttended = 0;
    let totalHeld = 0;
    
    SUBJECTS.forEach(sub => {
      totalAttended += sub.attended;
      totalHeld += sub.total;
    });

    // Simulate prediction: Assume checking "attend next X classes" logic
    // Meaning we add X to BOTH attended and total (optimistic prediction)
    const predictedAttended = totalAttended + additionalClasses;
    const predictedTotal = totalHeld + additionalClasses;
    
    const currentPercentage = (totalAttended / totalHeld) * 100;
    const predictedPercentage = (predictedAttended / predictedTotal) * 100;

    return {
      totalAttended,
      totalHeld,
      currentPercentage,
      predictedPercentage,
      predictedTotal
    };
  }, [additionalClasses]);

  const pieData = [
    { name: "Attended", value: overallStats.predictedPercentage },
    { name: "Absent", value: 100 - overallStats.predictedPercentage },
  ];

  const getStatusColor = (pct: number) => {
    if (pct >= 85) return "text-green-500";
    if (pct >= 75) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getProgressColor = (pct: number) => {
      if (pct >= 85) return "#10b981"; // green
      if (pct >= 75) return "#f59e0b"; // yellow
      return "#ef4444"; // red
  };

  const getSubjectStatus = (attended: number, total: number) => {
      const pct = (attended / total) * 100;
      const margin = attended - (0.75 * total);
      // Roughly: margin > 0 means safe margin
      // Let's allow skipping logic
      // Can skip: margin / 0.75 ?? 
      // Safe logic: If I miss next 1, will I be > 75%?
      // (attended) / (total + 1) >= 0.75
      
      const canSkip = Math.floor((attended - 0.75 * total) / 0.75);
      const needToAttend = Math.ceil((0.75 * total - attended) / 0.25); // Simplified for "need MORE to reach 75" if current is (attended)/(total) < 0.75? 
      // Actually simpler:
      // If pct >= 75: "Safe" or "Can skip X"
      // If pct < 75: "Need X"
      
      if (pct >= 75) {
          if (canSkip > 0) return { text: `Can leave ${canSkip} lecture${canSkip > 1 ? 's' : ''}`, color: "text-green-600 bg-green-500/10" };
          return { text: "On Track", color: "text-green-600 bg-green-500/10" };
      } else {
           // How many consecutive classes to attend to reach 75%?
           // (attended + x) / (total + x) = 0.75
           // attended + x = 0.75*total + 0.75*x
           // 0.25*x = 0.75*total - attended
           // x = 3*total - 4*attended
           const needed = Math.ceil((0.75 * total - attended) / (1 - 0.75));
           return { text: `Need to attend ${needed} lecture${needed > 1 ? 's' : ''}`, color: "text-red-600 bg-red-500/10" };
      }
  };

  return (
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
        
        {/* Header Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Attendance Prediction</h1>
          <p className="text-muted-foreground">Forecast your attendance and plan your leaves smartly.</p>
        </div>

        {/* TOP SUMMARY CARD */}
        <Card className="border-border/50 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-8">
                
                {/* Donut Chart Section */}
                <div className="relative w-48 h-48 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                stroke="none"
                            >
                                <Cell key="attended" fill={getProgressColor(overallStats.predictedPercentage)} />
                                <Cell key="absent" fill="#e2e8f0" className="dark:fill-slate-800" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className={cn("text-3xl font-bold", getStatusColor(overallStats.predictedPercentage))}>
                            {overallStats.predictedPercentage.toFixed(1)}%
                        </span>
                        <span className="text-xs text-muted-foreground uppercase font-medium mt-1">Avg Percentage</span>
                    </div>
                </div>

                {/* Stats & Insight */}
                <div className="flex-1 space-y-6 w-full">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-card border shadow-sm">
                            <p className="text-sm text-muted-foreground">Total Classes</p>
                            <p className="text-2xl font-bold">{overallStats.predictedTotal}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                            <p className="text-sm text-green-600 dark:text-green-400">Present</p>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{overallStats.totalAttended + additionalClasses}</p>
                            </div>
                        </div>
                         <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-600 dark:text-red-400">Absent</p>
                            <div className="flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-red-500" />
                                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{overallStats.totalHeld - overallStats.totalAttended}</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                             <p className="text-sm text-yellow-600 dark:text-yellow-400">Leaves</p>
                             <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-yellow-500" />
                                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">4</p>
                             </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                        <span className="text-2xl">🤖</span>
                        <div>
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100">AI Insight</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                {additionalClasses === 0 
                                    ? "Maintain your current streak! You are safe above 75% for now." 
                                    : `Great! Attending the next ${additionalClasses} classes will boost your average to ${overallStats.predictedPercentage.toFixed(1)}%.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-muted/30 p-2 text-center text-xs text-muted-foreground border-t">
                Data updated till Today
            </div>
        </Card>

        {/* PREDICTION SLIDER */}
        <Card className="border-border/50 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">Attendance Simulator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-between text-sm">
                    <span>Current State</span>
                    <span className="font-medium text-primary">Predict next {additionalClasses} classes</span>
                </div>
                <Slider
                    defaultValue={[0]}
                    max={20}
                    step={1}
                    value={futureClasses}
                    onValueChange={setFutureClasses}
                    className="py-4"
                />
                <p className="text-sm text-muted-foreground text-center">
                    Move the slider to simulate attending upcoming lectures and see the impact on your percentage.
                </p>
            </CardContent>
        </Card>

        {/* SUBJECT CARDS */}
        <div className="space-y-4">
             <h2 className="text-xl font-semibold">Your Subjects</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SUBJECTS.map((subject) => {
                     const pct = (subject.attended / subject.total) * 100;
                     const status = getSubjectStatus(subject.attended, subject.total);
                     
                     return (
                         <Card key={subject.id} className="hover:shadow-md transition-shadow duration-200 border-border/50">
                             <CardContent className="p-5 space-y-4">
                                 <div className="flex justify-between items-start">
                                     <div>
                                         <Badge variant="outline" className="mb-2">{subject.code}</Badge>
                                         <h3 className="font-semibold line-clamp-1">{subject.name}</h3>
                                         <p className="text-sm text-muted-foreground mt-1">{subject.attended}/{subject.total} lectures</p>
                                     </div>
                                     <div className="relative w-12 h-12">
                                          {/* Mini Pie Chart for Subject */}
                                          <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[{ value: pct }, { value: 100 - pct }]}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={18}
                                                    outerRadius={24}
                                                    startAngle={90}
                                                    endAngle={-270}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    <Cell fill={getProgressColor(pct)} />
                                                    <Cell fill="#e2e8f0" className="dark:fill-slate-800" />
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <span className={cn("absolute inset-0 flex items-center justify-center text-[10px] font-bold", getStatusColor(pct))}>
                                            {Math.round(pct)}%
                                        </span>
                                     </div>
                                 </div>
                                 
                                 <div className={cn("px-3 py-2 rounded-md text-xs font-medium w-fit", status.color)}>
                                     {status.text}
                                 </div>
                             </CardContent>
                         </Card>
                     );
                })}
             </div>
        </div>

        {/* CALENDAR STRIP */}
        <div className="space-y-4">
             <h2 className="text-xl font-semibold">Weekly Schedule</h2>
             <div className="bg-card border rounded-xl p-4 overflow-x-auto custom-scrollbar">
                 <div className="flex justify-between min-w-[600px] gap-2">
                     {UpcomingClasses.map((item, idx) => (
                         <div key={idx} className="flex flex-col items-center gap-3 flex-1 min-w-[70px]">
                             <span className="text-sm font-medium text-muted-foreground">{item.day}</span>
                             <div className={cn(
                                 "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all hover:scale-110 cursor-default",
                                 item.status === 'present' && "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/40 dark:text-green-300",
                                 item.status === 'absent' && "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/40 dark:text-red-300",
                                 item.status === 'leave' && "bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
                                 item.status === 'future' && "bg-blue-50 border-dashed border-blue-400 text-blue-700 dark:bg-slate-800 dark:text-slate-300",
                                 item.status === 'none' && "bg-muted border-transparent text-muted-foreground opacity-50"
                             )}>
                                 {item.date}
                             </div>
                             {item.subject !== "-" && (
                                 <Badge variant="secondary" className="text-[10px] h-5 px-1.5 min-w-[50px] justify-center">
                                     {item.subject}
                                 </Badge>
                             )}
                         </div>
                     ))}
                 </div>
             </div>
        </div>
      </div>
  );
}

export default function AttendancePrediction() {
  return (
    <DashboardLayout activeSection="attendance" onSectionChange={() => {}}>
      <AttendanceDashboard />
    </DashboardLayout>
  );
}
