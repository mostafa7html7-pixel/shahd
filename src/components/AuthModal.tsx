import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { loginWithGoogle } from '../lib/firebase';
import { X, Lock, Sparkles, User, Phone, Mail, KeyRound, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  prefilledPlan?: string;
  prefilledFitness?: { weight?: number; height?: number; goal?: string };
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  prefilledPlan,
  prefilledFitness,
  onClose,
  onSuccess
}) => {
  const { registerTrainee, loginWithSecretCode, setActiveTab, setIsCaptainMode } = useGym();
  const [mode, setMode] = useState<'login' | 'register' | 'captain'>(initialMode);

  // Registration Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [secretCode, setSecretCode] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [goal, setGoal] = useState(prefilledFitness?.goal || 'نحت الجسم وشد القوام');
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [plan, setPlan] = useState(prefilledPlan || 'باقة التحول الشامل (3 أشهر)');

  // Login Form State
  const [loginCode, setLoginCode] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');

  // Captain Passcode
  const [captainCode, setCaptainCode] = useState('');

  // Loading & Error States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState<{ name: string; code: string } | null>(null);

  if (!isOpen) return null;

  const handleGenerateRandomCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setSecretCode(code);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !phone.trim() || !email.trim() || !secretCode.trim()) {
      setErrorMessage('يرجى ملء جميع الحقول الإلزامية (الاسم، الهاتف، الإيميل، والكود السري).');
      return;
    }

    setIsSubmitting(true);
    try {
      const trainee = await registerTrainee({
        name,
        phone,
        email,
        secretCode,
        goal,
        fitnessLevel,
        membershipPlan: plan,
        weight: prefilledFitness?.weight,
        height: prefilledFitness?.height
      });

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });

      setSuccessInfo({ name: trainee.name, code: trainee.secretCode });
    } catch (err) {
      setErrorMessage('حدث خطأ أثناء حفظ التسجيل. يرجى المحاولة ثانية.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginCode.trim()) {
      setErrorMessage('يرجى إدخال الكود السري الخاص بكِ.');
      return;
    }

    setIsSubmitting(true);
    try {
      const trainee = await loginWithSecretCode(loginCode, loginIdentifier);
      if (trainee) {
        onSuccess();
        setActiveTab('portal');
        onClose();
      } else {
        setErrorMessage('عذراً، لم نعثر على حساب بهذا الكود السري. يرجى التحقق من الكود أو التسجيل كعضوة جديدة.');
      }
    } catch (err) {
      setErrorMessage('تعذر تسجيل الدخول، يرجى المحاولة ثانية.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const user = await loginWithGoogle();
      if (user) {
        // Find existing or register
        const genCode = Math.floor(1000 + Math.random() * 9000).toString();
        await registerTrainee({
          name: user.displayName || 'عضوة أورا',
          phone: user.phoneNumber || '01000000000',
          email: user.email || 'aura.member@gmail.com',
          secretCode: genCode,
          goal: 'نحت القوام والرشاقة',
          fitnessLevel: 'beginner',
          membershipPlan: 'باقة التحول الشامل (3 أشهر)'
        });
        onSuccess();
        setActiveTab('portal');
        onClose();
      }
    } catch (e: any) {
      if (e?.code !== 'auth/popup-closed-by-user') {
        setErrorMessage('تعذر إتمام الدخول بحساب Google. يمكنكِ استخدام الكود السري مباشرة.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptainLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (captainCode.trim() === 'CAPTAIN2026' || captainCode.trim() === 'admin' || captainCode.trim() === '1234') {
      setIsCaptainMode(true);
      setActiveTab('captain');
      onClose();
    } else {
      setErrorMessage('كود الكابتن غير صحيح. الكود التجريبي الافتراضي هو: CAPTAIN2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#EFE8E4] shadow-2xl max-w-lg w-full p-6 sm:p-8 text-right relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-[#8A7C78] hover:text-[#2D2422] p-1.5 rounded-lg hover:bg-[#FAF7F5] transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Confirmation Modal State */}
        {successInfo ? (
          <div className="space-y-6 py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF0ED] text-[#B87B6D] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#2D2422]">
                أهلاً بكِ في أورا جيم، يا {successInfo.name}! 🌸
              </h3>
              <p className="text-sm text-[#6E625F] max-w-sm mx-auto leading-relaxed">
                تم تسجيل طلبكِ بنجاح. احتفظي بهذا الكود السري لتسجيل الدخول والشات في أي وقت:
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F5] border-2 border-dashed border-[#D4A396] inline-block px-8">
              <div className="text-xs text-[#8A7C78] mb-1">كودكِ السري الخاص:</div>
              <div className="text-3xl font-extrabold text-[#B87B6D] tracking-widest font-sans tabular-nums">
                {successInfo.code}
              </div>
            </div>

            <p className="text-xs text-[#8A7C78] leading-relaxed">
              طلبكِ الآن في صفحة اعتماد الكابتن. يمكنكِ فتح بوابتكِ الآن لمتابعة حالة الاعتماد وبدء الشات فور الموافقة!
            </p>

            <button
              onClick={() => {
                onSuccess();
                setActiveTab('portal');
                onClose();
              }}
              className="w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] rounded-xl hover:opacity-95 shadow-md shadow-[#D4A396]/20 transition-all cursor-pointer"
            >
              افتحي بوابتكِ وشات الكابتن الآن ←
            </button>
          </div>
        ) : (
          <div>
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-[#EFE8E4] pb-4 mb-6">
              <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F5] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    mode === 'register' ? 'bg-white text-[#2D2422] shadow-sm font-bold' : 'text-[#6E625F]'
                  }`}
                >
                  عضوة جديدة
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    mode === 'login' ? 'bg-white text-[#2D2422] shadow-sm font-bold' : 'text-[#6E625F]'
                  }`}
                >
                  دخول بالكود السري
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('captain'); setErrorMessage(''); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                    mode === 'captain' ? 'bg-[#2D2422] text-white shadow-sm' : 'text-[#6E625F]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>الكابتن</span>
                </button>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#B87B6D] uppercase">أورا فيتنس</span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Registration Form */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#2D2422]">
                    تسجيل عضوة جديدة وإنشاء كودكِ السري
                  </h3>
                  <p className="text-xs text-[#6E625F] mt-1">
                    سجلي بياناتكِ وأنشئي كوداً سرياً تفتحين به شاتكِ الخاص مع الكابتن.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#2D2422] mb-1">الاسم بالكامل *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="مثال: ياسمين أحمد"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-[#EFE8E4] focus:border-[#D4A396] focus:ring-1 focus:ring-[#D4A396] text-xs outline-none"
                      />
                      <User className="w-4 h-4 text-[#8A7C78] absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D2422] mb-1">رقم الهاتف / الواتساب *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="010XXXXXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-[#EFE8E4] focus:border-[#D4A396] focus:ring-1 focus:ring-[#D4A396] text-xs outline-none"
                        />
                        <Phone className="w-4 h-4 text-[#8A7C78] absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D2422] mb-1">البريد الإلكتروني *</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-[#EFE8E4] focus:border-[#D4A396] focus:ring-1 focus:ring-[#D4A396] text-xs outline-none"
                        />
                        <Mail className="w-4 h-4 text-[#8A7C78] absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Secret Code Creation Section */}
                  <div className="p-3.5 bg-[#FAF0ED] rounded-xl border border-[#E8D4CE] space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleGenerateRandomCode}
                        className="text-[11px] font-semibold text-[#B87B6D] hover:underline"
                      >
                        توليد كود تلقائي
                      </button>
                      <label className="text-xs font-bold text-[#2D2422] flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#B87B6D]" />
                        <span>كودكِ السري الخاص للشات والدخول *</span>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="أدخلي 4-6 أرقام أو حروف سرية"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-[#D4A396] bg-white font-sans text-center font-bold tracking-widest text-base text-[#2D2422] outline-none"
                      />
                      <KeyRound className="w-4 h-4 text-[#B87B6D] absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                    <div className="text-[11px] text-[#6E625F] leading-tight">
                      هذا الكود هو كلمة مروركِ الخاصة للدخول والاطلاع على ردود الكابتن في الشات دون الحاجة لكلمات مرور معقدة.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D2422] mb-1">هدفكِ البدني</label>
                      <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#EFE8E4] text-xs bg-white text-[#2D2422] outline-none"
                      >
                        <option value="نحت الجسم وشد القوام">نحت الجسم وشد القوام</option>
                        <option value="حرق دهون وخسارة وزن">حرق دهون وخسارة وزن</option>
                        <option value="بيلاتس ريفورمر ومرونة">بيلاتس ريفورمر ومرونة</option>
                        <option value="تأهيل ولياقة بعد الولادة">تأهيل ولياقة بعد الولادة</option>
                        <option value="بناء كتلة عضلية وصحة عامة">بناء كتلة عضلية وصحة عامة</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D2422] mb-1">باقة الاشتراك</label>
                      <select
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#EFE8E4] text-xs bg-white text-[#2D2422] outline-none"
                      >
                        <option value="باقة التحول الشامل (3 أشهر)">باقة التحول الشامل (3 أشهر)</option>
                        <option value="باقة التألق (شهر واحد)">باقة التألق (شهر واحد)</option>
                        <option value="باقة الـ VIP الملكية (سنة كاملة)">باقة الـ VIP الملكية (سنة كاملة)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] rounded-xl hover:opacity-95 shadow-md shadow-[#D4A396]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'جاري التسجيل...' : 'إتمام التسجيل وإنشاء الحساب'}</span>
                </button>
              </form>
            )}

            {/* Secret Code Login Form */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#2D2422]">
                    تسجيل الدخول بالكود السري
                  </h3>
                  <p className="text-xs text-[#6E625F] mt-1">
                    أدخلي الكود السري الذي أنشأتِه عند التسجيل لفتح شاتكِ ومتابعة مدربتكِ.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#2D2422] mb-1">الكود السري *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="أدخلي كودكِ السري (مثال: 4821)"
                        value={loginCode}
                        onChange={(e) => setLoginCode(e.target.value)}
                        className="w-full pl-3 pr-9 py-3 rounded-xl border border-[#D4A396] text-center font-sans font-bold tracking-widest text-lg outline-none focus:ring-1 focus:ring-[#D4A396]"
                      />
                      <KeyRound className="w-4 h-4 text-[#B87B6D] absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2422] mb-1">
                      رقم الهاتف أو البريد الإلكتروني (اختياري للتحقق الإضافي)
                    </label>
                    <input
                      type="text"
                      placeholder="010XXXXXXXX أو name@gmail.com"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EFE8E4] text-xs outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] rounded-xl hover:opacity-95 shadow-md shadow-[#D4A396]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري التحقق...' : 'دخول إلى شاتي الخاص وبوابتي ←'}
                </button>

                {/* Quick Test Logins for Demonstration */}
                <div className="pt-3 border-t border-[#EFE8E4] space-y-2">
                  <div className="text-[11px] font-semibold text-[#8A7C78]">حسابات تجريبية سريعة للاختبار:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginCode('4821');
                        setLoginIdentifier('sara.abdelrahman@gmail.com');
                      }}
                      className="p-2 bg-[#FAF7F5] hover:bg-[#F3E3DF] rounded-lg border border-[#EFE8E4] text-[#2D2422] text-right"
                    >
                      <div className="font-bold">سارة (معتمدة ولديها شات)</div>
                      <div className="text-[10px] text-[#B87B6D]">كود: 4821</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginCode('7790');
                        setLoginIdentifier('mayar.elshazly@outlook.com');
                      }}
                      className="p-2 bg-[#FAF7F5] hover:bg-[#F3E3DF] rounded-lg border border-[#EFE8E4] text-[#2D2422] text-right"
                    >
                      <div className="font-bold">ميار (بالانتظار)</div>
                      <div className="text-[10px] text-[#B87B6D]">كود: 7790</div>
                    </button>
                  </div>
                </div>

                {/* Google Sign-in */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-2.5 text-xs font-semibold text-[#2D2422] bg-[#FAF7F5] hover:bg-[#F5ECE8] border border-[#EFE8E4] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>الدخول السريع بحساب Google</span>
                  </button>
                </div>
              </form>
            )}

            {/* Captain / Coach Access */}
            {mode === 'captain' && (
              <form onSubmit={handleCaptainLogin} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#2D2422] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#B87B6D]" />
                    <span>بوابة الكابتن والمدربة المعتمدة</span>
                  </h3>
                  <p className="text-xs text-[#6E625F] mt-1">
                    لوحة الإدارة والمدربات لمراجعة طلبات الانضمام الجديدة، اعتماد الكود، والتواصل الفردي في الشات مع المتدربات.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#2D2422] mb-1">كود دخول الكابتن *</label>
                    <input
                      type="password"
                      placeholder="أدخلي كود الكابتن (الافتراضي: CAPTAIN2026)"
                      value={captainCode}
                      onChange={(e) => setCaptainCode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EFE8E4] focus:border-[#2D2422] text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 text-xs font-bold text-white bg-[#2D2422] hover:bg-black rounded-xl transition-all cursor-pointer"
                  >
                    فتح لوحة الكابتن
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCaptainMode(true);
                      setActiveTab('captain');
                      onClose();
                    }}
                    className="px-4 py-3 text-xs font-bold text-[#B87B6D] bg-[#FAF0ED] hover:bg-[#F3E3DF] rounded-xl transition-colors cursor-pointer"
                    title="دخول تجريبي فوري"
                  >
                    دخول سريع
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
