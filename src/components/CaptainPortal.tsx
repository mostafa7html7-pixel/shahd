import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { COACHES } from '../data/gymData';
import { Trainee } from '../types/gym';
import {
  ShieldCheck,
  Check,
  X,
  MessageSquare,
  Send,
  User,
  Phone,
  Mail,
  KeyRound,
  Dumbbell,
  Clock,
  Sparkles,
  Search,
  ChevronRight,
  Filter
} from 'lucide-react';

export const CaptainPortal: React.FC = () => {
  const {
    trainees,
    approveTrainee,
    rejectTrainee,
    selectedChatTrainee,
    setSelectedChatTrainee,
    messages,
    sendMessage,
    updateTraineeNotes
  } = useGym();

  const [portalTab, setPortalTab] = useState<'pending' | 'approved'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [captainReply, setCaptainReply] = useState('');
  const [selectedCoachForApproval, setSelectedCoachForApproval] = useState<string>(COACHES[0].id);
  const [customWorkoutPlan, setCustomWorkoutPlan] = useState<string>('');
  const [modalApprovingTrainee, setModalApprovingTrainee] = useState<Trainee | null>(null);

  // Quick stats
  const pendingTrainees = trainees.filter(t => t.status === 'pending');
  const approvedTrainees = trainees.filter(t => t.status === 'approved');

  // Filtered by search query
  const filteredPending = pendingTrainees.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.phone.includes(searchQuery) ||
    t.secretCode.includes(searchQuery)
  );

  const filteredApproved = approvedTrainees.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.phone.includes(searchQuery) ||
    t.secretCode.includes(searchQuery)
  );

  // Send reply from coach
  const handleCaptainSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captainReply.trim() || !selectedChatTrainee) return;

    const text = captainReply;
    setCaptainReply('');
    await sendMessage(
      selectedChatTrainee.id,
      text,
      'coach',
      selectedChatTrainee.assignedCoachName || 'كابتن نورهان زهران'
    );
  };

  const handleOpenApprovalModal = (trainee: Trainee) => {
    setModalApprovingTrainee(trainee);
    setSelectedCoachForApproval(trainee.assignedCoachId || COACHES[0].id);
    setCustomWorkoutPlan(
      `جدول تدريب مخصص لـ ${trainee.name}: 4 أيام أسبوعياً لمتابعة هدف (${trainee.goal || 'اللياقة'}) + حصص بيلاتس ريفورمر.`
    );
  };

  const handleConfirmApproval = async () => {
    if (!modalApprovingTrainee) return;
    await approveTrainee(modalApprovingTrainee.id, selectedCoachForApproval, customWorkoutPlan);
    setModalApprovingTrainee(null);
  };

  return (
    <section className="py-8 sm:py-12 bg-[#FAF7F5] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-right pb-6 border-b border-[#EFE8E4]">
          <div>
            <div className="flex items-center gap-2 justify-end text-xs font-bold text-[#B87B6D] tracking-wider uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة تحكم الكابتن وإدارة التدريب النسائي</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2422]">
              اعتماد طلبات المشتركات والشات الخاص
            </h1>
            <p className="text-xs text-[#6E625F] mt-1">
              هنا تراجع الكابتن كل فتاة سجلت بالكود السري، وتوافق على انضمامها لفتح الشات الخاص والمباشر بينهما.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="p-3 bg-white rounded-xl border border-[#EFE8E4] text-center min-w-[90px]">
              <div className="text-xs text-[#8A7C78]">بالانتظار</div>
              <div className="text-xl font-bold text-amber-600 font-sans tabular-nums">{pendingTrainees.length}</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#EFE8E4] text-center min-w-[90px]">
              <div className="text-xs text-[#8A7C78]">معتمدات</div>
              <div className="text-xl font-bold text-emerald-600 font-sans tabular-nums">{approvedTrainees.length}</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#EFE8E4] text-center min-w-[90px]">
              <div className="text-xs text-[#8A7C78]">الإجمالي</div>
              <div className="text-xl font-bold text-[#2D2422] font-sans tabular-nums">{trainees.length}</div>
            </div>
          </div>
        </div>

        {/* Search & Tabs Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#EFE8E4]">
            <button
              onClick={() => setPortalTab('pending')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                portalTab === 'pending'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-[#6E625F] hover:text-[#2D2422]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>طلبات الانضمام الجديدة</span>
              {pendingTrainees.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-amber-700 text-[10px] font-bold flex items-center justify-center">
                  {pendingTrainees.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setPortalTab('approved');
                if (approvedTrainees.length > 0 && !selectedChatTrainee) {
                  setSelectedChatTrainee(approvedTrainees[0]);
                }
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                portalTab === 'approved'
                  ? 'bg-[#2D2422] text-white shadow-sm'
                  : 'text-[#6E625F] hover:text-[#2D2422]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>المتدربات وشات المتابعة المباشر</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="بحث بالاسم أو الهاتف أو الكود..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-[#EFE8E4] bg-white outline-none focus:border-[#D4A396]"
            />
            <Search className="w-4 h-4 text-[#8A7C78] absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* TAB 1: PENDING APPROVALS LIST */}
        {portalTab === 'pending' && (
          <div className="space-y-4">
            {filteredPending.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#EFE8E4] p-12 text-center text-[#8A7C78] space-y-3">
                <Check className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-[#2D2422]">لا توجد طلبات معلقة حالياً</h3>
                <p className="text-xs">تمت مراجعة واعتماد جميع طلبات العضوات المسجلات.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPending.map((trainee) => (
                  <div
                    key={trainee.id}
                    className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-sm text-right flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 left-0 h-1 bg-amber-500" />

                    <div className="space-y-4">
                      {/* Name & Secret Code */}
                      <div className="flex items-start justify-between">
                        <div className="p-1.5 px-2.5 rounded-lg bg-[#FAF0ED] text-[#B87B6D] text-xs font-bold font-sans flex items-center gap-1">
                          <KeyRound className="w-3 h-3" />
                          <span>كود: {trainee.secretCode}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#2D2422]">{trainee.name}</h3>
                          <div className="text-[11px] text-[#8A7C78]">{trainee.createdAt}</div>
                        </div>
                      </div>

                      {/* Contact details */}
                      <div className="p-3 bg-[#FAF7F5] rounded-xl space-y-1.5 text-xs text-[#6E625F]">
                        <div className="flex items-center justify-between">
                          <span className="font-sans font-semibold text-[#2D2422]">{trainee.phone}</span>
                          <span className="flex items-center gap-1 text-[#8A7C78]">
                            <Phone className="w-3 h-3" />
                            <span>الهاتف:</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-[#2D2422] truncate max-w-[150px]">{trainee.email}</span>
                          <span className="flex items-center gap-1 text-[#8A7C78]">
                            <Mail className="w-3 h-3" />
                            <span>الإيميل:</span>
                          </span>
                        </div>
                      </div>

                      {/* Fitness Goal & Plan */}
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-[#2D2422]">الهدف المطلوب:</div>
                        <p className="text-[#6E625F] bg-[#FCFAF9] p-2.5 rounded-lg border border-[#F3ECE9]">
                          {trainee.goal || 'نحت الجسم واللياقة'}
                        </p>
                        <div className="text-[11px] text-[#B87B6D] pt-1">
                          الباقة: {trainee.membershipPlan || 'باقة التحول الشامل'}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: One click approve, or custom modal */}
                    <div className="mt-5 pt-4 border-t border-[#F5ECE8] flex items-center gap-2">
                      <button
                        onClick={() => handleOpenApprovalModal(trainee)}
                        className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>موافقة واعتماد المشتركة</span>
                      </button>

                      <button
                        onClick={() => rejectTrainee(trainee.id)}
                        className="p-2.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors"
                        title="رفض الطلب"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: APPROVED TRAINEES & DIRECT 1-ON-1 CHAT */}
        {portalTab === 'approved' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Trainee Roster (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#EFE8E4] p-4 shadow-sm text-right space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#F5ECE8] px-1">
                <span className="text-xs text-[#8A7C78]">({filteredApproved.length} مشتركات)</span>
                <span className="text-xs font-bold text-[#2D2422]">قائمة العضوات المعتمدات</span>
              </div>

              <div className="max-h-[550px] overflow-y-auto space-y-2">
                {filteredApproved.map((trainee) => {
                  const isSelected = selectedChatTrainee?.id === trainee.id;
                  return (
                    <button
                      key={trainee.id}
                      onClick={() => setSelectedChatTrainee(trainee)}
                      className={`w-full p-3 rounded-xl text-right transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FAF0ED] border-[#D4A396] shadow-sm'
                          : 'bg-[#FAF7F5] border-[#EFE8E4] hover:bg-[#F5ECE8]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs text-[#B87B6D]">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>فتح الشات</span>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-[#2D2422]">{trainee.name}</div>
                        <div className="text-[10px] text-[#8A7C78] flex items-center gap-1 justify-end font-sans">
                          <span>كود: {trainee.secretCode}</span>
                          <span>·</span>
                          <span>{trainee.phone}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Console (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EFE8E4] shadow-sm flex flex-col h-[650px] overflow-hidden">
              {selectedChatTrainee ? (
                <>
                  {/* Chat Top Header */}
                  <div className="p-4 bg-[#FAF7F5] border-b border-[#EFE8E4] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A396] to-[#B87B6D] text-white flex items-center justify-center font-bold text-sm">
                        {selectedChatTrainee.name[0]}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#2D2422]">{selectedChatTrainee.name}</div>
                        <div className="text-[11px] text-[#8A7C78] flex items-center gap-2">
                          <span>كود: {selectedChatTrainee.secretCode}</span>
                          <span>·</span>
                          <span>{selectedChatTrainee.membershipPlan || 'باقة التحول'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newPlan = prompt('تعديل جدول التمارين للمشتركة:', selectedChatTrainee.workoutPlan || '');
                          if (newPlan !== null) {
                            updateTraineeNotes(selectedChatTrainee.id, selectedChatTrainee.notes || '', newPlan);
                          }
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#2D2422] bg-white border border-[#EFE8E4] rounded-lg hover:bg-[#FAF7F5] flex items-center gap-1"
                      >
                        <Dumbbell className="w-3 h-3 text-[#B87B6D]" />
                        <span>تعديل الجدول</span>
                      </button>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FCFAF9]">
                    {messages.length === 0 ? (
                      <div className="text-center py-16 text-[#8A7C78] space-y-2">
                        <MessageSquare className="w-8 h-8 mx-auto text-[#D4A396]" />
                        <p className="text-xs">ابدئي المحادثة مع {selectedChatTrainee.name} بالترحيب وتحديد موعد أول كلاس!</p>
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isCoach = msg.senderRole === 'coach';
                        const isSystem = msg.senderRole === 'system';

                        if (isSystem) {
                          return (
                            <div key={msg.id} className="text-center my-3">
                              <span className="inline-block px-3 py-1 rounded-full bg-[#FAF0ED] text-[#B87B6D] text-[11px]">
                                {msg.text}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isCoach ? 'items-start' : 'items-end'}`}
                          >
                            <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#8A7C78]">
                              <span>{msg.senderName}</span>
                              <span>·</span>
                              <span>{msg.timestamp}</span>
                            </div>

                            <div
                              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                                isCoach
                                  ? 'bg-[#2D2422] text-white rounded-br-none'
                                  : 'bg-white border border-[#EFE8E4] text-[#2D2422] rounded-bl-none'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Quick Coach Advice Pre-fills */}
                  <div className="px-4 py-2 bg-white border-t border-[#F5ECE8] flex items-center gap-2 overflow-x-auto text-[11px]">
                    <span className="text-[#8A7C78] shrink-0">ردود سريعة:</span>
                    <button
                      onClick={() => setCaptainReply('ممتاز جداً يا بطلة! الالتزام هو سر النتيجة. شدي حيلك في كلاس بكرة 💪')}
                      className="px-2.5 py-1 rounded-full bg-[#FAF7F5] hover:bg-[#F3E3DF] text-[#2D2422] whitespace-nowrap shrink-0 transition-colors"
                    >
                      تشجيع ممتاز
                    </button>
                    <button
                      onClick={() => setCaptainReply('تمام، استريحي اليوم وركزي على شرب 3 لتر ماء ووجبة بروتين خفيفة.')}
                      className="px-2.5 py-1 rounded-full bg-[#FAF7F5] hover:bg-[#F3E3DF] text-[#2D2422] whitespace-nowrap shrink-0 transition-colors"
                    >
                      توجيه راحة واستشفاء
                    </button>
                    <button
                      onClick={() => setCaptainReply('وجبة متكاملة ورائعة! فقط قللي ملعقة الزيت وزودي حصة الخضار الورقية 🥗')}
                      className="px-2.5 py-1 rounded-full bg-[#FAF7F5] hover:bg-[#F3E3DF] text-[#2D2422] whitespace-nowrap shrink-0 transition-colors"
                    >
                      تعليق على الوجبة
                    </button>
                  </div>

                  {/* Coach Chat Input */}
                  <form onSubmit={handleCaptainSendMessage} className="p-3 bg-white border-t border-[#EFE8E4] flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`أرسلي رداً إلى ${selectedChatTrainee.name}...`}
                      value={captainReply}
                      onChange={(e) => setCaptainReply(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#EFE8E4] focus:border-[#2D2422] text-xs sm:text-sm outline-none text-right"
                    />
                    <button
                      type="submit"
                      disabled={!captainReply.trim()}
                      className="px-4 py-2.5 bg-[#2D2422] hover:bg-black text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 shrink-0"
                    >
                      <span>إرسال كرد كابتن</span>
                      <Send className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[#8A7C78]">
                  <MessageSquare className="w-12 h-12 text-[#D4A396] mb-3" />
                  <h3 className="text-base font-bold text-[#2D2422]">اختر مشتركة من القائمة</h3>
                  <p className="text-xs max-w-sm mt-1">
                    اضغطي على أي مشتركة معتمدة لفتح شاتها الخاص والرد على استفساراتها وإرسال التوجيهات.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* APPROVAL CONFIRMATION MODAL */}
        {modalApprovingTrainee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-[#EFE8E4] p-6 max-w-md w-full text-right space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#EFE8E4] pb-3">
                <button
                  onClick={() => setModalApprovingTrainee(null)}
                  className="text-[#8A7C78] hover:text-[#2D2422] p-1"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-base font-bold text-[#2D2422]">
                  اعتماد طلب المشتركة: {modalApprovingTrainee.name}
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-[#FAF7F5] rounded-xl space-y-1">
                  <div className="font-bold text-[#2D2422]">بيانات الطلب:</div>
                  <div className="text-[#6E625F]">الكود السري: <strong className="font-sans text-[#B87B6D]">{modalApprovingTrainee.secretCode}</strong></div>
                  <div className="text-[#6E625F]">الهدف: {modalApprovingTrainee.goal}</div>
                  <div className="text-[#6E625F]">الهاتف: {modalApprovingTrainee.phone}</div>
                </div>

                <div>
                  <label className="block font-bold text-[#2D2422] mb-1">تعيين الكابتن المسؤولة عن المتابعة:</label>
                  <select
                    value={selectedCoachForApproval}
                    onChange={(e) => setSelectedCoachForApproval(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#EFE8E4] bg-white text-[#2D2422] outline-none"
                  >
                    {COACHES.map(coach => (
                      <option key={coach.id} value={coach.id}>{coach.name} ({coach.specialty})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#2D2422] mb-1">البرنامج التدريبي المبدئي:</label>
                  <textarea
                    rows={3}
                    value={customWorkoutPlan}
                    onChange={(e) => setCustomWorkoutPlan(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#EFE8E4] text-[#2D2422] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleConfirmApproval}
                  className="flex-1 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
                >
                  تأكيد الاعتماد وفتح الشات فوراً
                </button>
                <button
                  onClick={() => setModalApprovingTrainee(null)}
                  className="px-4 py-3 text-xs font-semibold text-[#8A7C78] hover:bg-[#FAF7F5] rounded-xl transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
