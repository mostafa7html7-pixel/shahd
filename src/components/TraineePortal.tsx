import React, { useState, useEffect, useRef } from 'react';
import { useGym } from '../context/GymContext';
import {
  MessageSquare,
  Send,
  Lock,
  Clock,
  Sparkles,
  CheckCircle,
  Dumbbell,
  Apple,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface TraineePortalProps {
  onOpenAuth: () => void;
}

export const TraineePortal: React.FC<TraineePortalProps> = ({ onOpenAuth }) => {
  const { currentTrainee, messages, sendMessage, setActiveTab, setIsCaptainMode } = useGym();
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentTrainee) return;

    const text = inputText;
    setInputText('');
    setIsSending(true);

    try {
      await sendMessage(
        currentTrainee.id,
        text,
        'trainee',
        currentTrainee.name
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    if (!currentTrainee) return;
    sendMessage(currentTrainee.id, question, 'trainee', currentTrainee.name);
  };

  // If user is not logged in
  if (!currentTrainee) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#FAF0ED] text-[#B87B6D] mx-auto flex items-center justify-center mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#2D2422] mb-3">
          بوابة العضوات والشات الخاص مع الكابتن
        </h2>
        <p className="text-sm text-[#6E625F] mb-8 leading-relaxed">
          يرجى تسجيل الدخول بكودكِ السري، أو التسجيل كعضوة جديدة لفتح شاتكِ الخاص بالمتابعة مع مدربتكِ.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-8 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#D4A396] to-[#B87B6D] rounded-xl hover:opacity-95 shadow-md shadow-[#D4A396]/20 transition-all cursor-pointer"
        >
          تسجيل الدخول أو الانضمام بالكود السري
        </button>
      </div>
    );
  }

  // Trainee is PENDING captain approval
  const isPending = currentTrainee.status === 'pending';

  return (
    <section className="py-8 sm:py-12 bg-[#FAF7F5] min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-right">
          <div>
            <div className="text-xs text-[#8A7C78] flex items-center gap-1.5 justify-end">
              <span>بوابة المشتركة</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-[#2D2422]">{currentTrainee.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#2D2422] mt-1">
              شات المتابعة الخاص ومساحتكِ التدريبية
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="p-2.5 rounded-xl bg-white border border-[#EFE8E4] flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-[#8A7C78]">كودكِ السري:</div>
                <div className="text-sm font-bold text-[#B87B6D] font-sans tracking-wider">{currentTrainee.secretCode}</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#FAF0ED] text-[#B87B6D] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Captain Switch Helper for Testing */}
            <button
              onClick={() => {
                setIsCaptainMode(true);
                setActiveTab('captain');
              }}
              className="px-3 py-2 text-xs font-semibold text-[#2D2422] bg-white border border-[#EFE8E4] rounded-xl hover:bg-[#F5ECE8] transition-colors flex items-center gap-1.5"
              title="انتقال لبوابة الكابتن لمعاينة القبول"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B87B6D]" />
              <span>لوحة الكابتن</span>
            </button>
          </div>
        </div>

        {/* PENDING NOTIFICATION BANNER */}
        {isPending && (
          <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-right flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>طلبكِ قيد المراجعة والاعتماد من الكابتن المدربة</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed max-w-2xl">
                تم تسجيل بياناتكِ وكودكِ السري ({currentTrainee.secretCode}) بنجاح! الكابتن تراجع بياناتكِ وأهدافكِ للموافقة على الطلب وتعيين برنامجكِ، وفور الموافقة ستتمكنين من تبادل الرسائل في الشات مباشرة.
              </p>
            </div>
            <button
              onClick={() => {
                setIsCaptainMode(true);
                setActiveTab('captain');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              افتحي لوحة الكابتن لقبول الطلب للتجربة ←
            </button>
          </div>
        )}

        {/* Main Grid: Chat Area (7 cols) + Trainee Fitness Profile (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Chat Panel */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EFE8E4] shadow-sm flex flex-col h-[650px] overflow-hidden">
            
            {/* Chat Top Header */}
            <div className="p-4 bg-[#FAF7F5] border-b border-[#EFE8E4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF0ED] text-[#B87B6D] border border-[#E8D4CE] flex items-center justify-center font-bold text-sm">
                  {currentTrainee.assignedCoachName ? currentTrainee.assignedCoachName.split(' ')[1]?.[0] || 'ك' : 'ك'}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#2D2422]">
                    {currentTrainee.assignedCoachName || 'كابتن التدريب والمتابعة'}
                  </div>
                  <div className="text-[11px] text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>متاحة للمتابعة والرد</span>
                  </div>
                </div>
              </div>

              <div className="text-left text-xs text-[#8A7C78]">
                <span>شات مشفر ومباشر 1-on-1</span>
              </div>
            </div>

            {/* Quick prompt chips for trainee */}
            {!isPending && (
              <div className="px-4 py-2 bg-white border-b border-[#F5ECE8] flex items-center gap-2 overflow-x-auto text-[11px]">
                <span className="text-[#8A7C78] shrink-0">أسئلة سريعة:</span>
                <button
                  onClick={() => handleQuickQuestion('كابتن، ما هي أفضل وجبة خفيفة قبل كلاس الريفورمر بساعة؟')}
                  className="px-2.5 py-1 rounded-full bg-[#FAF0ED] hover:bg-[#F3E3DF] text-[#B87B6D] whitespace-nowrap shrink-0 transition-colors"
                >
                  وجبة قبل التمرين؟
                </button>
                <button
                  onClick={() => handleQuickQuestion('كابتن، حاسة بشد خفيف في أسفل الظهر، أستمر ولا أريح يوم؟')}
                  className="px-2.5 py-1 rounded-full bg-[#FAF0ED] hover:bg-[#F3E3DF] text-[#B87B6D] whitespace-nowrap shrink-0 transition-colors"
                >
                  شد عضلي في الظهر
                </button>
                <button
                  onClick={() => handleQuickQuestion('صورت لكِ وجبة الغداء: صدر دجاج مشوي + أرز بسمتي وسلطة خضراء 🥗')}
                  className="px-2.5 py-1 rounded-full bg-[#FAF0ED] hover:bg-[#F3E3DF] text-[#B87B6D] whitespace-nowrap shrink-0 transition-colors"
                >
                  صورة وجبة الغداء
                </button>
              </div>
            )}

            {/* Message Thread Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FCFAF9]">
              {messages.length === 0 ? (
                <div className="text-center py-16 text-[#8A7C78] space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-[#D4A396]" />
                  <p className="text-xs">لا توجد رسائل سابقة بعد. يمكنكِ بدء المحادثة مع الكابتن الآن!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderRole === 'trainee';
                  const isSystem = msg.senderRole === 'system';

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="text-center my-4">
                        <span className="inline-block px-3 py-1.5 rounded-full bg-[#FAF0ED] text-[#B87B6D] text-[11px] border border-[#E8D4CE]">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#8A7C78]">
                        <span>{msg.senderName}</span>
                        <span>·</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-gradient-to-r from-[#D4A396] to-[#B87B6D] text-white rounded-br-none'
                            : 'bg-white border border-[#EFE8E4] text-[#2D2422] rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#EFE8E4] flex items-center gap-2">
              <input
                type="text"
                placeholder={isPending ? 'في انتظار اعتماد الكابتن لتفعيل الشات...' : 'اكتبي استفساركِ أو تفاصيل وجبتكِ وتمرينكِ للكابتن...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isPending || isSending}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#EFE8E4] focus:border-[#D4A396] focus:ring-1 focus:ring-[#D4A396] text-xs sm:text-sm outline-none disabled:bg-[#FAF7F5] disabled:cursor-not-allowed text-right"
              />
              <button
                type="submit"
                disabled={isPending || !inputText.trim() || isSending}
                className="px-4 py-2.5 bg-gradient-to-r from-[#D4A396] to-[#B87B6D] hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <span>إرسال</span>
                <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </form>
          </div>

          {/* Trainee Profile & Workout Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Membership & Status Card */}
            <div className="bg-white rounded-2xl border border-[#EFE8E4] p-5 shadow-sm text-right space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5ECE8]">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  currentTrainee.status === 'approved' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {currentTrainee.status === 'approved' ? 'عضوية معتمدة ومفعلة' : 'في انتظار الموافقة'}
                </span>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#B87B6D]" />
                  <span className="text-xs font-bold text-[#2D2422]">ملف المتدربة</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#6E625F]">
                <div className="flex justify-between">
                  <span className="font-semibold text-[#2D2422]">{currentTrainee.name}</span>
                  <span className="text-[#8A7C78]">الاسم:</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans font-semibold text-[#2D2422]">{currentTrainee.phone}</span>
                  <span className="text-[#8A7C78]">الهاتف:</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#2D2422]">{currentTrainee.membershipPlan || 'باقة التحول'}</span>
                  <span className="text-[#8A7C78]">الباقة:</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#B87B6D]">{currentTrainee.assignedCoachName || 'كابتن نورهان زهران'}</span>
                  <span className="text-[#8A7C78]">الكابتن:</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#2D2422]">{currentTrainee.goal}</span>
                  <span className="text-[#8A7C78]">الهدف:</span>
                </div>
              </div>
            </div>

            {/* Assigned Workout Plan by Coach */}
            <div className="bg-white rounded-2xl border border-[#EFE8E4] p-5 shadow-sm text-right space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D2422] pb-2 border-b border-[#F5ECE8]">
                <Dumbbell className="w-4 h-4 text-[#B87B6D]" />
                <span>برنامج التدريب المخصص من الكابتن</span>
              </div>
              <p className="text-xs text-[#6E625F] leading-relaxed">
                {currentTrainee.workoutPlan || 'سيتم إدراج جدول التمارين المخصص لكِ فور انتهاء الكابتن من تحليل قياساتكِ وأهدافكِ.'}
              </p>
            </div>

            {/* Nutrition Guidelines from Coach */}
            <div className="bg-white rounded-2xl border border-[#EFE8E4] p-5 shadow-sm text-right space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D2422] pb-2 border-b border-[#F5ECE8]">
                <Apple className="w-4 h-4 text-[#B87B6D]" />
                <span>إرشادات التغذية الهرمونية</span>
              </div>
              <p className="text-xs text-[#6E625F] leading-relaxed">
                {currentTrainee.nutritionTip || 'تناولي وجبة غنية بالبروتين والدهون الصحية بعد التمرين، وتواصلي مع الكابتن بصور وجباتكِ لتصحيح الكميات.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
