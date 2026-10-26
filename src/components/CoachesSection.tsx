import React from 'react';
import { COACHES } from '../data/gymData';
import { Award, MessageSquare, Check, Sparkles } from 'lucide-react';

interface CoachesSectionProps {
  onSelectCoach?: (coachId: string) => void;
  onJoinClick: () => void;
}

export const CoachesSection: React.FC<CoachesSectionProps> = ({ onJoinClick }) => {
  return (
    <section className="py-16 bg-white border-t border-[#EFE8E4]" id="coaches">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-right max-w-3xl mb-12">
          <div className="text-xs font-semibold text-[#B87B6D] tracking-wider uppercase mb-1">
            كباتن التدريب والتحول
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2422]">
            طاقم تدريب نسائي معتمد، يتابعكِ لحظة بلحظة
          </h2>
          <p className="text-sm text-[#6E625F] mt-2">
            كل مدربة في أورا تحمل اعتمادات دولية في تدريب السيدات، التغذية الهرمونية، والبيلاتس. عندما تنضمين، تخصص لكِ كابتن تتابع تدريبكِ وتتواصل معكِ في الشات الخاص.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COACHES.map((coach) => (
            <div
              key={coach.id}
              className="group bg-[#FAF7F5] rounded-2xl overflow-hidden border border-[#EFE8E4] hover:border-[#D4A396] hover:shadow-lg hover:shadow-[#D4A396]/10 transition-all text-right flex flex-col justify-between"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EBE7]">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 right-3 left-3 text-white">
                    <h3 className="text-base font-bold drop-shadow-sm">{coach.name}</h3>
                    <p className="text-xs text-white/90 drop-shadow-sm">{coach.title}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#B87B6D] font-semibold">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>{coach.experience}</span>
                  </div>

                  <p className="text-xs text-[#6E625F] leading-relaxed">
                    "{coach.bio}"
                  </p>

                  <div className="pt-2 border-t border-[#EFE8E4] text-[11px] text-[#8A7C78]">
                    <span className="font-semibold text-[#2D2422]">التخصص:</span> {coach.specialty}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={onJoinClick}
                  className="w-full py-2 text-xs font-semibold text-[#2D2422] bg-white hover:bg-[#B87B6D] hover:text-white border border-[#EFE8E4] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>اطلبي التدريب مع {coach.name.split(' ')[1] || 'الكابتن'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Callout Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#FAF0ED] to-[#F7EAE5] border border-[#E8D4CE] flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B87B6D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>خصوصية وسرية بياناتكِ وأهدافكِ</span>
            </div>
            <h4 className="text-lg font-bold text-[#2D2422]">
              هل لديكِ إصابة سابقة أو هدف خاص كالحمل والولادة؟
            </h4>
            <p className="text-xs text-[#6E625F] max-w-xl">
              تساعدكِ الكابتن بتعديل كل تمرين بدقة، وتقسيم الوجبات، بدون إحراج، مع الحفاظ الكامل على خصوصية محادثتكِ وسجلاتكِ الصحية.
            </p>
          </div>
          <button
            onClick={onJoinClick}
            className="px-6 py-3 text-xs font-bold text-white bg-[#2D2422] hover:bg-black rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            استشيري الكابتن الآن
          </button>
        </div>

      </div>
    </section>
  );
};
