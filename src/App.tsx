import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import { useAppStore } from './store/appStore';
import { LoginCard } from './components/auth/LoginCard';
import { RoleOnboarding } from './components/auth/RoleOnboarding';
import { TopNav } from './components/layout/TopNav';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { StudentDashboard } from './components/student/StudentDashboard';
import { QuestDashboard } from './components/student/QuestDashboard';
import { AllocationPool } from './components/student/AllocationPool';
import { StudentProfileView } from './components/student/StudentProfileView';
import { IndustryDashboard } from './components/industry/IndustryDashboard';
import { InstitutionDashboard } from './components/institution/InstitutionDashboard';
import { ExplainabilityModal } from './components/shared/ExplainabilityModal';
import { ApplicationPassModal } from './components/shared/ApplicationPassModal';
import { InternshipMatch, UserRole } from './types';
import { Users, GraduationCap, Microscope, Building2, Landmark, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const { currentView, setView, setUser: setStoreUser } = useAppStore();

  const [explainModalOpen, setExplainModalOpen] = useState(false);
  const [passModalOpen, setPassModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<InternshipMatch | null>(null);

  const handleOpenPass = (match: InternshipMatch) => {
    setSelectedMatch(match);
    setPassModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-ayush-forest/30 border-t-ayush-forest rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-ayush-forest uppercase tracking-wider">
            Initializing InternSetu v2.0...
          </p>
        </div>
      </div>
    );
  }

  // Auth Views (unauthenticated or onboarding)
  if (!user || currentView === 'login') {
    return <LoginCard />;
  }

  if (currentView === 'onboarding' || !user.is_onboarded) {
    return <RoleOnboarding />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-parchment">


      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNav />

          <main className="flex-1 p-5 md:p-7 max-w-7xl w-full mx-auto">
            {currentView === 'student-dashboard' && (
              <StudentDashboard
                onOpenPassModal={handleOpenPass}
                onOpenExplainabilityModal={() => setExplainModalOpen(true)}
              />
            )}
            {currentView === 'student-quests' && <QuestDashboard />}
            {currentView === 'student-allocation' && (
              <AllocationPool
                onOpenPassModal={handleOpenPass}
                onOpenExplainabilityModal={() => setExplainModalOpen(true)}
              />
            )}
            {currentView === 'student-profile' && <StudentProfileView />}
            {currentView === 'company-dashboard' && <IndustryDashboard />}
            {currentView === 'institution-dashboard' && <InstitutionDashboard />}
          </main>

          <Footer />
        </div>
      </div>

      {/* Global Modals */}
      <ExplainabilityModal
        isOpen={explainModalOpen}
        onClose={() => setExplainModalOpen(false)}
      />

      <ApplicationPassModal
        isOpen={passModalOpen}
        match={selectedMatch}
        onClose={() => setPassModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
