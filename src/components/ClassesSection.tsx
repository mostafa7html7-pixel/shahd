import React, { useState } from 'react';
import { FITNESS_CLASSES, GYM_IMAGES } from '../data/gymData';
import { FitnessClass } from '../types/gym';
import { Clock, Calendar, Flame, Users, CheckCircle2, Sparkles } from 'lucide-react';

interface ClassesSectionProps {
  onSelectClass?: (fitnessClass: FitnessClass) => void;
  onJoinClick: () => void;
}

export const ClassesSection: React.FC<ClassesSectionProps> = ({ onJoinClick }) => {
  const [filter, setFilter] = useState<'all' | 'pilates' | 'strength' | 'dance' | 'wellness'>('all');

  const filtered = filter === 'all' 
    ? FITNESS_CLASSES 
    : FITNESS_CLASSES.filter(c => c.category === filter);

  return (
    <section className="py-16 bg-[#FAF7F5] border-t border-[#EFE8E4]" id="classes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-right">
          <div>
            <div className="text-xs font-semibold text-[#B87B6D] tracking-wider uppercase mb-1">
              جدول التدريب والكلاسات المعتمدة
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2422]">
              كلاسات حيوية مصممة لاحتياجات جسم المرأة
            </h2>
            <p className="text-sm text-[#6E625F] mt-2 max-w-xl">
              من أحدث أجهزة الريفورمر بيلاتس لنحت المركز وإطالة القوام، إلى كلاسات حرق الدهون والرقص اللاتيني، تحت إشراف مدربات محترفات.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#EFE8E4] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-[#2D2422] text-white shadow-sm'
                  : 'text-[#6E625F] hover:text-[#2D2422]'
              }`}
            >
              جميع الحصص
            </button>
            <button
              onClick={() => setFilter('pilates')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'pilates'
                  ? 'bg-[#2D2422] text-white shadow-sm'
                  : 'text-[#6E625F] hover:text-[#2D2422]'
              }`}
            >
              ريفورمر بيلاتس
            </button>
            <button
              onClick={() => setFilter('strength')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'strength'
                  ? 'bg-[#2D2422] text-white shadow-sm'
                  : 'text-[#6E625F] hover:text-[#2D2422]'
              }`}
            >
              نحت وقوة
            </button>
            <button
              onClick={() => setFilter('dance')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'dance'
                  ? 'bg-[#2D2422] text-white shadow-sm'
                  : 'text-[#6E625F] hover:text-[#2D2422]'
              }`}
            >
              زومبا وكارديو
            </button>
            <button
              onClick={() => setFilter('wellness')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'wellness'
                  ? 'bg-[#2D2422] text-white shadow-sm'
                  : 'text-[#6E625F] hover:text-[#2D2422]'
              }`}
            >
              يوجا واستشفاء
            </button>
          </div>
        </div>

        {/* Featured Pilates Studio Showcase Banner */}
        <div className="mb-10 rounded-2xl overflow-hidden bg-white border border-[#EFE8E4] grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto">
            <img
              src={GYM_IMAGES.pilates}
              alt="استوديو ريفورمر بيلاتس النسائي"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center text-right space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B87B6D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>استوديو الريفورمر الخاص</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D2422]">
              تجربة بيلاتس عالمية بأحدث أجهزة الـ Reformer
            </h3>
            <p className="text-sm text-[#6E625F] leading-relaxed">
              جلسات محدودة بحد أقصى 6 مشتركات فقط لضمان التركيز الدقيق مع كل متدربة، وتصحيح التكنيك، وتقوية عضلات الجذع والظهر، للحصول على قوام متناسق ورشيق بدون ضغط على المفاصل.
            </p>
            <div className="space-y-2 pt-1 text-xs text-[#6E625F]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B87B6D] shrink-0" />
                <span>أجهزة Balanced Body الأمريكية المعتمدة في أكبر أندية العالم</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B87B6D] shrink-0" />
                <span>إشراف كامل من مدربات بيلاتس حاصلات على شهادات دولية</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={onJoinClick}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#B87B6D] hover:bg-[#A36A5D] rounded-xl transition-colors cursor-pointer"
              >
                احجزي مكانكِ في استوديو الريفورمر
              </button>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-5 border border-[#EFE8E4] hover:border-[#D4A396] hover:shadow-md transition-all text-right flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF0ED] text-[#B87B6D]">
                    شدة {item.intensity}
                  </span>
                  <span className="text-[11px] text-[#8A7C78]">
                    متبقي {item.spotsLeft} أماكن
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[#2D2422]">{item.title}</h4>
                  <div className="text-[11px] text-[#8A7C78] font-sans">{item.titleEn}</div>
                </div>

                <p className="text-xs text-[#6E625F] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F5ECE8] space-y-2 text-xs text-[#6E625F]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B87B6D]" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#B87B6D]" />
                  <span>{item.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#B87B6D]" />
                  <span>المدربة: <strong className="text-[#2D2422] font-semibold">{item.coach}</strong></span>
                </div>

                <button
                  onClick={onJoinClick}
                  className="w-full mt-3 py-2 text-xs font-semibold text-[#2D2422] bg-[#FAF7F5] hover:bg-[#F3E3DF] hover:text-[#B87B6D] rounded-lg transition-colors cursor-pointer"
                >
                  انضمي للحصة
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
