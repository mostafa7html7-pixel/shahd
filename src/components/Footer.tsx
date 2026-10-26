import React from 'react';
import { Dumbbell, Phone, MapPin, Clock, Heart, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onOpenCaptain: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCaptain, onOpenRegister }) => {
  return (
    <footer className="bg-[#261E1D] text-[#FAF7F5] border-t border-[#3B302E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-right">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 justify-end">
              <span className="text-xl font-bold tracking-tight text-white font-cairo">
                أورا جيم للسيدات
              </span>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A396] to-[#B87B6D] flex items-center justify-center text-white">
                <Dumbbell className="w-4 h-4 rotate-45" />
              </div>
            </div>
            <p className="text-xs text-[#A89C98] leading-relaxed">
              المجتمع الرياضي الأنثوي الأكثر تميزاً وخصوصية. أجهزة ريفورمر بيلاتس، سبا فاخر، ومتابعة فردية مباشرة مع الكابتن عبر شاتكِ الخاص.
            </p>
            <div className="text-[11px] text-[#D4A396] flex items-center gap-1.5 justify-end">
              <Shield className="w-3.5 h-3.5" />
              <span>خصوصية وسرية بيانات كاملة 100%</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              أقسام الصالة
            </h4>
            <ul className="space-y-2 text-xs text-[#A89C98]">
              <li><a href="#classes" className="hover:text-[#D4A396] transition-colors">كلاسات ريفورمر بيلاتس</a></li>
              <li><a href="#classes" className="hover:text-[#D4A396] transition-colors">نحت الجسم وشد القوام</a></li>
              <li><a href="#classes" className="hover:text-[#D4A396] transition-colors">حفلات الزومبا وحرق الدهون</a></li>
              <li><a href="#coaches" className="hover:text-[#D4A396] transition-colors">طاقم المدربات المعتمدات</a></li>
              <li><a href="#calculator" className="hover:text-[#D4A396] transition-colors">حاسبة السعرات والـ BMI</a></li>
            </ul>
          </div>

          {/* Working Hours & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              مواعيد العمل النسائية
            </h4>
            <div className="space-y-2 text-xs text-[#A89C98]">
              <div className="flex items-start gap-2 justify-end">
                <span>السبت إلى الخميس: 08:00 ص - 10:00 م</span>
                <Clock className="w-3.5 h-3.5 text-[#D4A396] shrink-0 mt-0.5" />
              </div>
              <div className="flex items-start gap-2 justify-end">
                <span>الجمعة: 10:00 ص - 08:00 م</span>
                <Clock className="w-3.5 h-3.5 text-[#D4A396] shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] text-[#A89C98]/70 pt-1 leading-relaxed">
                * جميع الفترات مغلقة تماماً ومخصصة للسيدات فقط مع طاقم أمن وإدارة نسائية.
              </p>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              التواصل والموقع
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89C98]">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-sans">010 2345 6789</span>
                <Phone className="w-3.5 h-3.5 text-[#D4A396]" />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span>القاهرة الجديدة - التجمع الخامس (بجوار التسعين الجنوبي)</span>
                <MapPin className="w-3.5 h-3.5 text-[#D4A396]" />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenCaptain}
                className="text-[11px] text-[#D4A396] hover:text-white flex items-center gap-1.5 justify-end w-full cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>دخول بوابة الكابتن والمدربة</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#3B302E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7C78]">
          <div className="flex items-center gap-1">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()} نادي أورا النسائي للياقة</span>
            <span>·</span>
            <span>Aura Ladies Fitness</span>
          </div>

          <div className="flex items-center gap-1">
            <span>صُنع بحب لأجل صحة وسعادة كل امرأة</span>
            <Heart className="w-3 h-3 text-[#D4A396] fill-[#D4A396]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
