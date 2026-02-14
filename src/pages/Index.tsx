import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { MailSummarizer } from "@/components/mail/MailSummarizer";
import { AttendanceDashboard } from "@/pages/AttendancePrediction";
import { AcademicDashboard } from "@/components/academic/AcademicDashboard";
import { MessMenu } from "@/components/mess/MessMenu";
import { StudentExchange } from "@/components/exchange/StudentExchange";
import { ExplorerGuide } from "@/components/explorer/ExplorerGuide";
import { EmergencyPage } from "@/components/emergency/EmergencyPage";
import { LMSPage } from "@/components/lms/LMSPage";
import { StudentDirectory } from "@/components/features/StudentDirectory";
import { ClubDirectory } from "@/components/features/ClubDirectory";
import { FeeTracker } from "@/components/features/FeeTracker";
import { Library } from "@/components/features/Library";
import { DigitalID } from "@/components/features/DigitalID";
import { LaundryTracker } from "@/components/features/LaundryTracker";
import { MentalHealth } from "@/components/features/MentalHealth";
import { Settings } from "@/components/features/Settings";
import { LoginPage } from "@/pages/LoginPage";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { isAuthenticated } = useAuth();

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview onNavigate={setActiveSection} />;
      case "attendance":
        return <AttendanceDashboard />;
      case "mail":
        return <MailSummarizer />;
      case "academic":
        return <AcademicDashboard />;
      case "lms":
        return <LMSPage />;
      case "students":
        return <StudentDirectory />;
      case "clubs":
        return <ClubDirectory />;
      case "fees":
        return <FeeTracker />;
      case "library":
        return <Library />;
      case "digitalid":
        return <DigitalID />;
      case "laundry":
        return <LaundryTracker />;
      case "wellness":
        return <MentalHealth />;
      case "mess":
        return <MessMenu />;
      case "order-food":
        return <MessMenu defaultTab="order" />;
      case "exchange":
        return <StudentExchange />;
      case "explorer":
        return <ExplorerGuide />;
      case "settings":
        return <Settings />;
      case "emergency":
        return <EmergencyPage />;
      default:
        return <DashboardOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default Index;
