import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import AcademicSchedule from "./pages/AcademicSchedule";
import AttendancePredictor from "./pages/AttendancePredictor";
import SubjectAttendanceDetail from "./pages/SubjectAttendanceDetail";
import CoursesManagement from "./pages/CoursesManagement";
import ExamManagement from "./pages/ExamManagement";
import NoticeAndLeave from "./pages/NoticeAndLeave";
import ApplyForLeave from "./pages/ApplyForLeave";
import FeesAndMessages from "./pages/FeesAndMessages";
import Collaboration from "./pages/Collaboration";
import CampusDining from "./pages/CampusDining";
import CampusMarket from "./pages/CampusMarket";
import LaundryTrackerPage from "./pages/LaundryTrackerPage";
import LostAndFound from "./pages/LostAndFound";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student-profile" element={<StudentProfile />} />
            <Route path="/academic-schedule" element={<AcademicSchedule />} />
            <Route path="/attendance" element={<AttendancePredictor />} />
            <Route path="/attendance/:subject" element={<SubjectAttendanceDetail />} />
            <Route path="/courses" element={<CoursesManagement />} />
            <Route path="/exams" element={<ExamManagement />} />
            <Route path="/notices" element={<NoticeAndLeave />} />
            <Route path="/apply-leave" element={<ApplyForLeave />} />
            <Route path="/fees" element={<FeesAndMessages />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/campus-dining" element={<CampusDining />} />
            <Route path="/campus-market" element={<CampusMarket />} />
            <Route path="/laundry" element={<LaundryTrackerPage />} />
            <Route path="/lost-found" element={<LostAndFound />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
