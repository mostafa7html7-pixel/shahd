import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { User, ShieldCheck, Dumbbell, MessageSquareText, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { currentTrainee, activeTab, setActiveTab, unreadCountForCaptain, logoutTrainee } = useGym();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'classes', label: 'الحصص والجدول' },
    { id: 'coaches', label: 'المدربات' },
    { id: 'plans', label: 'باقات الاشتراك' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/90 backdrop-blur-md border-b border-[#EFE8E4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('home')}
            className="group flex items-center gap-2.5 text-right cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A396] to-[#B87B6D] flex items-center justify-center text-white shadow-sm shadow-[#D4A396]/20 transition-transform group-hover:scale-105">
              <Dumbbell className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#2D2422] block font-cairo">
                أورا جيم للسيدات
              </span>
              <span className="text-[10px] tracking-widest text-[#B87B6D] font-semibold uppercase block -mt-1 font-sans">
                Aura Ladies Fitness Club
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#6E625F]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#2D2422] relative py-1 ${
                activeTab === item.id ? 'text-[#B87B6D] font-bold' : ''
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#B87B6D] rounded-full" />
              )}
            </button>
          ))}

          {/* Direct link to trainee portal if logged in */}
          {currentTrainee && (
            <button
              onClick={() => setActiveTab('portal')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#2D2422] relative py-1 flex items-center gap-1.5 ${
                activeTab === 'portal' ? 'text-[#B87B6D] font-bold' : 'text-[#6E625F]'
              }`}
            >
              <MessageSquareText className="w-4 h-4 text-[#B87B6D]" />
              <span>شات المشتركة وملفي</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Captain / Admin Quick Portal Switch */}
          <button
            onClick={() => setActiveTab('captain')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 border ${
              activeTab === 'captain'
                ? 'bg-[#2D2422] text-[#FAF7F5] border-[#2D2422] shadow-sm'
                : 'bg-white text-[#2D2422] border-[#EFE8E4] hover:bg-[#F5ECE8]'
            }`}
            title="بوابة الكابتن والمدربة لاعتماد المشتركات والشات"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4A396]" />
            <span>بوابة الكابتن</span>
            {unreadCountForCaptain > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#B87B6D] text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCountForCaptain}
              </span>
            )}
          </button>

          {/* Member Authentication Action */}
          {currentTrainee ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('portal')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] rounded-lg hover:opacity-95 transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[120px] truncate">{currentTrainee.name.split(' ')[0]}</span>
                {currentTrainee.status === 'approved' ? (
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">معتمدة</span>
                ) : (
                  <span className="text-[10px] bg-amber-500/30 px-1.5 py-0.5 rounded">بالانتظار</span>
                )}
              </button>
              <button
                onClick={logoutTrainee}
                className="text-xs text-[#8A7C78] hover:text-[#B87B6D] p-1.5"
                title="تسجيل خروج"
              >
                خروج
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-2 text-xs font-semibold text-[#2D2422] hover:text-[#B87B6D] transition-colors whitespace-nowrap shrink-0"
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] rounded-lg hover:shadow-md hover:shadow-[#D4A396]/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>انضمي الآن</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2D2422] hover:bg-[#F5ECE8] rounded-lg transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EFE8E4] px-4 py-4 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 text-sm font-medium text-[#2D2422] hover:text-[#B87B6D] border-b border-[#F7F2EF]"
            >
              {item.label}
            </button>
          ))}
          {currentTrainee && (
            <button
              onClick={() => {
                setActiveTab('portal');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 text-sm font-semibold text-[#B87B6D] flex items-center gap-2"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>بوابة المشتركة والشات الخاص</span>
            </button>
          )}
          <button
            onClick={() => {
              setActiveTab('captain');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-right py-2 text-sm font-semibold text-[#2D2422] flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4A396]" />
              <span>بوابة الكابتن والمدربة</span>
            </span>
            {unreadCountForCaptain > 0 && (
              <span className="px-2 py-0.5 bg-[#B87B6D] text-white text-xs rounded-full">
                {unreadCountForCaptain} جديد
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
