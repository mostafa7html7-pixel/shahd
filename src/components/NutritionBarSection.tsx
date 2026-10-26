import React from 'react';
import { GYM_IMAGES } from '../data/gymData';
import { Coffee, Droplets, Sparkles, Apple, Heart } from 'lucide-react';

export const NutritionBarSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-[#EFE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#EFE8E4] aspect-[4/3] bg-[#F5ECE8]">
              <img
                src={GYM_IMAGES.nutrition}
                alt="بار المشروبات الصحية والبروتين في أورا جيم"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B87B6D] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>أورا سموذي وبار التغذية الصحية</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2422] leading-snug">
              غذاء نظيف متوازن يعزز طاقتكِ ويسرع نتائج تمرينكِ
            </h2>

            <p className="text-sm text-[#6E625F] leading-relaxed">
              داخل صالة أورا، نوفر بار عصائر طازجة وبروتين شيك مخصص للسيدات مصنوع من مكونات طبيعية 100% بدون سكريات مضافة أو نكهات صناعية.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#EFE8E4] space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2D2422]">
                  <Droplets className="w-4 h-4 text-[#B87B6D]" />
                  <span>مياه ديتوكس منقوعة</span>
                </div>
                <p className="text-xs text-[#6E625F]">منقوعة بالتوت، الليمون، والنعناع لتحسين ترطيب البشرة والهضم مجاناً طوال اليوم.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#EFE8E4] space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2D2422]">
                  <Coffee className="w-4 h-4 text-[#B87B6D]" />
                  <span>شيك بروتين بعد التمرين</span>
                </div>
                <p className="text-xs text-[#6E625F]">بروتين مصل اللبن النقي وخيارات نباتية بنكهات الفراولة والماتشا والشوكولاتة الداكنة.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#EFE8E4] space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2D2422]">
                  <Apple className="w-4 h-4 text-[#B87B6D]" />
                  <span>أطباق أساي وبول صحي</span>
                </div>
                <p className="text-xs text-[#6E625F]">أطباق طاقة خفيفة غنية بمضادات الأكسدة وبذور الشيا والمكسرات النيئة قبل التمرين.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#EFE8E4] space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2D2422]">
                  <Heart className="w-4 h-4 text-[#B87B6D]" />
                  <span>مراجعة وجباتكِ مع الكابتن</span>
                </div>
                <p className="text-xs text-[#6E625F]">صوّري وجبتكِ اليومية وأرسليها للكابتن في الشات الخاص لتعطيكِ رأيها وتعديلاتها فوراً.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
