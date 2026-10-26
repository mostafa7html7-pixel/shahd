import React from 'react';
import { MEMBERSHIP_PLANS } from '../data/gymData';
import { MembershipPlan } from '../types/gym';
import { Check, Sparkles, MessageCircle, Shield } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-16 bg-[#FAF7F5] border-t border-[#EFE8E4]" id="plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#B87B6D] tracking-wider uppercase mb-1">
            اشتراكات وباقات أورا
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2422]">
            استثمري في صحتكِ وجمالكِ بأعلى مستويات الرفاهية
          </h2>
          <p className="text-sm text-[#6E625F] mt-2">
            جميع الباقات تشمل نظام الكود السري والشات المباشر مع الكابتن لمتابعة التمارين والتغذية.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                plan.isPopular
                  ? 'bg-white border-2 border-[#D4A396] shadow-xl shadow-[#D4A396]/15 lg:-translate-y-2'
                  : 'bg-white border border-[#EFE8E4] shadow-sm hover:shadow-md'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 bg-gradient-to-r from-[#D4A396] to-[#B87B6D] text-white text-[11px] font-bold rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>الباقة الأكثر طلباً والأنسب للتحول</span>
                </div>
              )}

              <div className="space-y-6 text-right">
                <div>
                  <h3 className="text-lg font-bold text-[#2D2422]">{plan.name}</h3>
                  <div className="text-xs text-[#8A7C78] font-sans mt-0.5">{plan.nameEn}</div>
                </div>

                <div className="flex items-baseline justify-end gap-1.5 pb-4 border-b border-[#F5ECE8]">
                  <span className="text-xs text-[#6E625F] font-medium">ج.م / {plan.period}</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#2D2422] font-sans tabular-nums">
                    {plan.price}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#2D2422]">ما تشمله الباقة:</div>
                  <ul className="space-y-2.5 text-xs text-[#6E625F]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#FAF0ED] text-[#B87B6D] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6 border-t border-[#F5ECE8]">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-[#D4A396] to-[#B87B6D] text-white shadow-md shadow-[#D4A396]/25 hover:opacity-95'
                      : 'bg-[#2D2422] text-white hover:bg-[#3D3331]'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>اختاري هذه الباقة وسجلي كودكِ</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 text-center text-xs text-[#8A7C78] flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-[#B87B6D]" />
          <span>ضمان تجربة أول أسبوع كاملة مع استرداد سلس في حال عدم ملائمة الصالة</span>
        </div>

      </div>
    </section>
  );
};
