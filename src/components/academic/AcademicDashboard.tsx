import { BookOpen, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Subject {
  name: string;
  code: string;
  semester: number;
  attendance: number;
  classesAttended: number;
  totalClasses: number;
}

interface SemesterGPA {
  semester: number;
  gpa: number;
}

const subjects: Subject[] = [
  { name: "Data Structures & Algorithms", code: "25CSH-103", semester: 2, attendance: 79.31, classesAttended: 23, totalClasses: 29 },
  { name: "Programming Practice", code: "25CSP-105", semester: 2, attendance: 100, classesAttended: 15, totalClasses: 15 },
  { name: "Digital Electronics", code: "25ECH-101", semester: 2, attendance: 83.33, classesAttended: 20, totalClasses: 24 },
  { name: "Emerging Technologies Workshop", code: "25ECP-103", semester: 2, attendance: 77.78, classesAttended: 7, totalClasses: 9 },
  { name: "General Proficiency-1", code: "25GPT-121", semester: 2, attendance: 0, classesAttended: 0, totalClasses: 2 },
  { name: "Communication Skills-II", code: "25PCP-111", semester: 2, attendance: 90.91, classesAttended: 10, totalClasses: 11 },
  { name: "Mathematics-II", code: "25SMT-198", semester: 2, attendance: 77.78, classesAttended: 14, totalClasses: 18 },
];

const semesterGPAs: SemesterGPA[] = [
  { semester: 1, gpa: 8.45 },
  { semester: 2, gpa: 0 }, // Current semester
];

const currentCGPA = 8.45;
const predictedCGPA = 8.62;

export function AcademicDashboard() {
  const getAttendanceStatus = (attendance: number) => {
    if (attendance >= 85) return { status: "safe", color: "text-success", bg: "bg-success" };
    if (attendance >= 75) return { status: "warning", color: "text-warning", bg: "bg-warning" };
    return { status: "risk", color: "text-destructive", bg: "bg-destructive" };
  };

  const getAIInsight = (subject: Subject) => {
    if (subject.attendance < 75) {
      const needed = Math.ceil((0.75 * (subject.totalClasses + 5) - subject.classesAttended));
      return `Attend next ${Math.max(needed, 3)} classes to recover attendance above 75%`;
    }
    if (subject.attendance < 85) {
      return `${Math.ceil(85 - subject.attendance)}% more needed for comfortable margin`;
    }
    return "Attendance on track! Keep it up";
  };

  const overallAttendance = subjects.reduce((sum, s) => sum + s.attendance, 0) / subjects.length;
  const riskSubjects = subjects.filter(s => s.attendance < 75);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Academic Intelligence</h1>
          <p className="text-muted-foreground">Track attendance, CGPA, and performance insights</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <p className={`text-2xl font-bold ${getAttendanceStatus(overallAttendance).color}`}>
                  {overallAttendance.toFixed(1)}%
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                overallAttendance >= 75 ? "bg-success/10" : "bg-destructive/10"
              }`}>
                {overallAttendance >= 75 ? (
                  <CheckCircle className="h-6 w-6 text-success" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current CGPA</p>
                <p className="text-2xl font-bold text-primary">{currentCGPA.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predicted CGPA</p>
                <p className="text-2xl font-bold text-accent">{predictedCGPA.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Based on current performance</p>
          </CardContent>
        </Card>

        <Card className={`card-elevated ${riskSubjects.length > 0 ? "border-destructive/50" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At-Risk Subjects</p>
                <p className={`text-2xl font-bold ${riskSubjects.length > 0 ? "text-destructive" : "text-success"}`}>
                  {riskSubjects.length}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                riskSubjects.length > 0 ? "bg-destructive/10" : "bg-success/10"
              }`}>
                <AlertTriangle className={`h-6 w-6 ${riskSubjects.length > 0 ? "text-destructive" : "text-success"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Course & Attendance
          </CardTitle>
          <CardDescription>
            Bachelor of Engineering (Computer Science and Engineering) - CS201
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Subject</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground">Sem</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground">Attended</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground">%</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden xl:table-cell">AI Insight</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => {
                  const status = getAttendanceStatus(subject.attendance);
                  return (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-sm">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.code}</p>
                        </div>
                      </td>
                      <td className="text-center py-3 px-2">{subject.semester}</td>
                      <td className="text-center py-3 px-2 text-sm">
                        {subject.classesAttended}/{subject.totalClasses}
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className={`font-semibold ${status.color}`}>
                          {subject.attendance.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-2 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${status.bg}`} />
                          <Progress 
                            value={subject.attendance} 
                            className="h-2 w-20"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-2 hidden xl:table-cell">
                        <p className="text-xs text-muted-foreground max-w-48">
                          {getAIInsight(subject)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* CGPA Progress */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            CGPA Progress
          </CardTitle>
          <CardDescription>Semester-wise performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 h-40">
            {semesterGPAs.map((sem) => (
              <div key={sem.semester} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-t-lg transition-all ${
                    sem.gpa > 0 ? "btn-gradient" : "bg-muted"
                  }`}
                  style={{ height: `${(sem.gpa / 10) * 100}%` }}
                />
                <div className="mt-2 text-center">
                  <p className="font-semibold">{sem.gpa > 0 ? sem.gpa.toFixed(2) : "—"}</p>
                  <p className="text-xs text-muted-foreground">Sem {sem.semester}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg hero-gradient border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="ai-badge">AI Prediction</span>
            </div>
            <p className="text-sm">
              If current performance continues, your expected CGPA will be{" "}
              <span className="font-bold text-accent">{predictedCGPA.toFixed(2)}</span>.
              Focus on {riskSubjects.length > 0 ? `improving ${riskSubjects[0]?.name}` : "maintaining consistency"} for best results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
