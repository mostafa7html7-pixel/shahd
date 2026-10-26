import React, { useState } from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClassesSection } from './components/ClassesSection';
import { CoachesSection } from './components/CoachesSection';
import { NutritionBarSection } from './components/NutritionBarSection';
import { FitnessCalculator } from './components/FitnessCalculator';
import { PricingSection } from './components/PricingSection';
import { TraineePortal } from './components/TraineePortal';
import { CaptainPortal } from './components/CaptainPortal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { MembershipPlan } from './types/gym';

function MainAppContent() {
  const { activeTab, setActiveTab, currentTrainee } = useGym();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [selectedPlanForAuth, setSelectedPlanForAuth] = useState<string | undefined>(undefined);
  const [fitnessDataForAuth, setFitnessDataForAuth] = useState<{ weight?: number; height?: number; goal?: string } | undefined>(undefined);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlanForAuth(plan.name);
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const handleJoinWithFitnessData = (data: { weight: number; height: number; goal: string }) => {
    setFitnessDataForAuth(data);
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#2D2422]">
      {/* Top Bar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onJoinClick={() => handleOpenAuth('register')}
              onExploreClasses={() => {
                const el = document.getElementById('classes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSecretLogin={() => handleOpenAuth('login')}
            />
            <ClassesSection onJoinClick={() => handleOpenAuth('register')} />
            <CoachesSection onJoinClick={() => handleOpenAuth('register')} />
            <NutritionBarSection />
            <FitnessCalculator onJoinWithData={handleJoinWithFitnessData} />
            <PricingSection onSelectPlan={handleSelectPlan} />
          </>
        )}

        {activeTab === 'classes' && (
          <div className="pt-6">
            <ClassesSection onJoinClick={() => handleOpenAuth('register')} />
          </div>
        )}

        {activeTab === 'coaches' && (
          <div className="pt-6">
            <CoachesSection onJoinClick={() => handleOpenAuth('register')} />
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="pt-6">
            <PricingSection onSelectPlan={handleSelectPlan} />
          </div>
        )}

        {activeTab === 'portal' && (
          <TraineePortal onOpenAuth={() => handleOpenAuth('login')} />
        )}

        {activeTab === 'captain' && (
          <CaptainPortal />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenCaptain={() => setActiveTab('captain')}
        onOpenRegister={() => handleOpenAuth('register')}
      />

      {/* Registration & Secret Code Login Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        prefilledPlan={selectedPlanForAuth}
        prefilledFitness={fitnessDataForAuth}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setSelectedPlanForAuth(undefined);
          setFitnessDataForAuth(undefined);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <GymProvider>
      <MainAppContent />
    </GymProvider>
  );
}
