import React, { useState } from 'react';
import { Calculator, ArrowLeft, Activity, Droplets, Target, Sparkles } from 'lucide-react';

interface FitnessCalculatorProps {
  onJoinWithData: (data: { weight: number; height: number; goal: string }) => void;
}

export const FitnessCalculator: React.FC<FitnessCalculatorProps> = ({ onJoinWithData }) => {
  const [weight, setWeight] = useState<number>(65);
  const [height, setHeight] = useState<number>(165);
  const [activity, setActivity] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [goal, setGoal] = useState<'lose' | 'tone' | 'maintain'>('tone');

  // Math Calculations
  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(1);

  let bmiStatus = 'وزن صحي مثالي';
  let bmiColor = 'text-emerald-700 bg-emerald-50';
  if (bmi < 18.5) {
    bmiStatus = 'نحافة، يُنصح ببناء كتلة عضلية';
    bmiColor = 'text-amber-700 bg-amber-50';
  } else if (bmi >= 25 && bmi < 30) {
    bmiStatus = 'وزن زائد خفيف، مناسب لبدء النحت';
    bmiColor = 'text-amber-700 bg-amber-50';
  } else if (bmi >= 30) {
    bmiStatus = 'سمنة، برنامج التحول الشامل سيفيدك جداً';
    bmiColor = 'text-rose-700 bg-rose-50';
  }

  // Calories estimation (Mifflin-St Jeor for females approx)
  const bmr = 10 * weight + 6.25 * height - 5 * 28 - 161;
  const activityMultiplier = activity === 'low' ? 1.2 : activity === 'moderate' ? 1.45 : 1.7;
  const tdee = Math.round(bmr * activityMultiplier);

  let targetCalories = tdee;
  if (goal === 'lose') targetCalories = Math.round(tdee - 450);
  if (goal === 'tone') targetCalories = Math.round(tdee - 200);

  // Recommended protein (1.6g to 2g per kg for active females)
  const proteinGrams = Math.round(weight * 1.6);
  // Recommended water (approx 35ml per kg)
  const waterLiters = +(weight * 0.038).toFixed(1);

  return (
    <section className="py-16 bg-[#FAF7F5] border-t border-[#EFE8E4]" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B87B6D] tracking-wider uppercase mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>حاسبة أورا لصحة ورشاقة المرأة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2422]">
            احسبي مؤشرات جسمكِ واحتياجكِ اليومي مجاناً
          </h2>
          <p className="text-sm text-[#6E625F] mt-2">
            معادلات دقيقة مخصصة لفيزيولوجيا المرأة لحساب السعرات، البروتين، وكمية الماء المناسبة لهدفكِ.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EFE8E4] p-6 sm:p-10 shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-right">
          
          {/* Inputs Column */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[#2D2422] mb-1.5">
                <span>{weight} كجم</span>
                <label>الوزن الحالي (كجم):</label>
              </div>
              <input
                type="range"
                min="40"
                max="140"
                value={weight}
                onChange={(e) => setWeight(+e.target.value)}
                className="w-full accent-[#B87B6D] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[#2D2422] mb-1.5">
                <span>{height} سم</span>
                <label>الطول (سم):</label>
              </div>
              <input
                type="range"
                min="135"
                max="195"
                value={height}
                onChange={(e) => setHeight(+e.target.value)}
                className="w-full accent-[#B87B6D] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D2422] mb-1.5">مستوى النشاط اليومي:</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setActivity('low')}
                  className={`py-2 px-1 text-center rounded-lg border transition-all ${
                    activity === 'low'
                      ? 'bg-[#FAF0ED] text-[#B87B6D] border-[#B87B6D] font-bold'
                      : 'border-[#EFE8E4] text-[#6E625F] hover:bg-[#FAF7F5]'
                  }`}
                >
                  قليل الحركة
                </button>
                <button
                  type="button"
                  onClick={() => setActivity('moderate')}
                  className={`py-2 px-1 text-center rounded-lg border transition-all ${
                    activity === 'moderate'
                      ? 'bg-[#FAF0ED] text-[#B87B6D] border-[#B87B6D] font-bold'
                      : 'border-[#EFE8E4] text-[#6E625F] hover:bg-[#FAF7F5]'
                  }`}
                >
                  متوسط (2-3 أيام)
                </button>
                <button
                  type="button"
                  onClick={() => setActivity('high')}
                  className={`py-2 px-1 text-center rounded-lg border transition-all ${
                    activity === 'high'
                      ? 'bg-[#FAF0ED] text-[#B87B6D] border-[#B87B6D] font-bold'
                      : 'border-[#EFE8E4] text-[#6E625F] hover:bg-[#FAF7F5]'
                  }`}
                >
                  نشيطة جداً
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D2422] mb-1.5">هدفكِ الرئيسي:</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setGoal('lose')}
                  className={`py-2 px-1 text-center rounded-lg border transition-all ${
                    goal === 'lose'
                      ? 'bg-[#FAF0ED] text-[#B87B6D] border-[#B87B6D] font-bold'
                      : 'border-[#EFE8E4] text-[#6E625F] hover:bg-[#FAF7F5]'
                  }`}
                >
                  حرق دهون
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('tone')}
                  className={`py-2 px-1 text-center rounded-lg border transition-all ${
                    goal === 'tone'
                      ? 'bg-[#FAF0ED] text-[#B87B6D] border-[#B87B6D] font-bold'
                      : 'border-[#EFE8E4] text-[#6E625F] hover:bg-[#FAF7F5]'
                  }`}
                >
                  نحت وشد قوام
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('maintain')}
                  className={`py-2 px-1 text-center rounded-lg border transition-all ${
                    goal === 'maintain'
                      ? 'bg-[#FAF0ED] text-[#B87B6D] border-[#B87B6D] font-bold'
                      : 'border-[#EFE8E4] text-[#6E625F] hover:bg-[#FAF7F5]'
                  }`}
                >
                  صحة ومرونة
                </button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="md:col-span-6 bg-[#FAF7F5] rounded-xl p-6 border border-[#EFE8E4] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8E4]">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${bmiColor}`}>
                {bmiStatus}
              </span>
              <div>
                <span className="text-xs text-[#8A7C78]">مؤشر كتلة الجسم (BMI): </span>
                <span className="text-lg font-extrabold text-[#2D2422] font-sans tabular-nums">{bmi}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white rounded-lg border border-[#EFE8E4]">
                <Activity className="w-4 h-4 text-[#B87B6D] mx-auto mb-1" />
                <div className="text-[11px] text-[#8A7C78]">السعرات المقترحة</div>
                <div className="text-base font-extrabold text-[#2D2422] font-sans tabular-nums">{targetCalories}</div>
                <div className="text-[10px] text-[#8A7C78]">سعرة / يوم</div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EFE8E4]">
                <Target className="w-4 h-4 text-[#B87B6D] mx-auto mb-1" />
                <div className="text-[11px] text-[#8A7C78]">البروتين الصافي</div>
                <div className="text-base font-extrabold text-[#2D2422] font-sans tabular-nums">{proteinGrams}</div>
                <div className="text-[10px] text-[#8A7C78]">جرام / يوم</div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EFE8E4]">
                <Droplets className="w-4 h-4 text-[#B87B6D] mx-auto mb-1" />
                <div className="text-[11px] text-[#8A7C78]">الماء اليومي</div>
                <div className="text-base font-extrabold text-[#2D2422] font-sans tabular-nums">{waterLiters}</div>
                <div className="text-[10px] text-[#8A7C78]">لتر / يوم</div>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#6E625F] leading-relaxed">
              💡 <strong>نصيحة الكابتن:</strong> هذه الأرقام هي تقدير أولي رائع للبداية. الكابتن ستقوم بمراجعة قياساتكِ وتفاصيل يومكِ وتصميم برنامج دقيق يناسب طبيعة هرموناتكِ وأوقات فراغكِ.
            </div>

            <button
              onClick={() => onJoinWithData({
                weight,
                height,
                goal: goal === 'lose' ? 'حرق دهون وخسارة وزن' : goal === 'tone' ? 'نحت الجسم وشد القوام' : 'زيادة المرونة والصحة العامة'
              })}
              className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] rounded-xl hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>احفظي هذه البيانات وسجلي كودكِ السري الآن</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
