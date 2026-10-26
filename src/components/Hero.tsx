import React from 'react';
import { GYM_IMAGES } from '../data/gymData';
import { Sparkles, MessageCircle, Heart, Lock, Calendar, ChevronLeft } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
  onExploreClasses: () => void;
  onOpenSecretLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onExploreClasses, onOpenSecretLogin }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column balanced split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Arabic Content & Actions) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B87B6D] tracking-wide">
              <span>نادي اللياقة النسائي الفاخر</span>
              <span aria-hidden="true">·</span>
              <span>خصوصية تامة 100%</span>
              <span aria-hidden="true">·</span>
              <span>شات خاص مع الكابتن</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D2422] leading-[1.25] tracking-tight [text-wrap:balance]">
              مساحتكِ الحصرية للياقة والجمال، مع متابعة شخصية مباشرة من الكابتن
            </h1>

            {/* Body prose */}
            <p className="text-base sm:text-lg text-[#6E625F] leading-relaxed max-w-2xl">
              صممنا أورا ليكون ملاذكِ الرياضي الآمن والمريح. انضمي وسجلي بكودكِ السري لتفتحي قناة تواصل خاصة ومباشرة بينكِ وبين كابتن التدريب، لتصلكِ خطة تمرينكِ ونظامكِ الغذائي وتتابعي تطوركِ أولاً بأول.
            </p>

            {/* Trainee Secret Code Feature Highlight Card */}
            <div className="p-4 rounded-xl bg-white border border-[#EFE8E4] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF0ED] text-[#B87B6D] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2D2422]">نظام الكود السري والشات الخاص</h4>
                  <p className="text-xs text-[#8A7C78]">سجلي بكود سري من اختياركِ، وفور اعتماد الكابتن يبدأ شات المتابعة بينكما فوراً.</p>
                </div>
              </div>
              <button
                onClick={onOpenSecretLogin}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#B87B6D] bg-[#FAF0ED] hover:bg-[#F3E3DF] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                دخول بالكود السري ←
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onJoinClick}
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] hover:opacity-95 rounded-xl shadow-md shadow-[#D4A396]/25 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>سجلي الآن وأنشئي كودكِ السري</span>
              </button>

              <button
                onClick={onExploreClasses}
                className="px-6 py-3.5 text-sm font-bold text-[#2D2422] bg-white hover:bg-[#FAF7F5] border border-[#EFE8E4] rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#B87B6D]" />
                <span>جدول الحصص والريفورمر</span>
              </button>
            </div>

            {/* Unboxed Micro Trust Notes */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#8A7C78]">
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#B87B6D]" />
                <span>طاقم تدريب وإدارة نسائي بالكامل</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#B87B6D]" />
                <span>محادثة مشفرة وخاصة مع المدربة</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>أجهزة ريفورمر بيلاتس أصلية</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#D4A396]/10 border border-[#EFE8E4] aspect-[4/3] lg:aspect-[5/4] bg-[#F5ECE8]">
              <img
                src={GYM_IMAGES.hero}
                alt="داخل صالة أورا للياقة النسائية والبيلاتس"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle luxury overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating chic overlay pill */}
              <div className="absolute bottom-4 right-4 left-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-right flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#2D2422]">صالة أورا النسائية - القاهرة الجديدة</div>
                  <div className="text-[11px] text-[#6E625F]">استوديو بيلاتس ريفورمر، سبا، ومتابعة لياقة خاصة</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF0ED] text-[#B87B6D] flex items-center justify-center shrink-0">
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip below the hero */}
        <div className="mt-14 pt-8 border-t border-[#EFE8E4] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white border border-[#EFE8E4]/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2D2422] font-sans tabular-nums">100%</div>
            <div className="text-xs text-[#6E625F] mt-1 font-medium">خصوصية تامة بدون كاميرات خارجية</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#EFE8E4]/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2D2422] font-sans tabular-nums">+15</div>
            <div className="text-xs text-[#6E625F] mt-1 font-medium">كلاس أسبوعياً (ريفورمر، زومبا، يوجا)</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#EFE8E4]/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2D2422] font-sans tabular-nums">1-on-1</div>
            <div className="text-xs text-[#6E625F] mt-1 font-medium">شات متابعة فردي مع كابتن التدريب</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#EFE8E4]/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2D2422] font-sans tabular-nums">4.9/5</div>
            <div className="text-xs text-[#6E625F] mt-1 font-medium">تقييم المشتركات لنتائج التحول البدني</div>
          </div>
        </div>

      </div>
    </section>
  );
};
