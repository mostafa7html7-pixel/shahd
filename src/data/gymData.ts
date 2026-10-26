import { Coach, FitnessClass, MembershipPlan, Trainee } from '../types/gym';

export const GYM_IMAGES = {
  hero: '/src/assets/images/hero_ladies_gym_1793017768781.jpg',
  coach: '/src/assets/images/female_fitness_coach_1793017769344.jpg',
  pilates: '/src/assets/images/pilates_reformer_studio_1793017769677.jpg',
  nutrition: '/src/assets/images/healthy_nutrition_bar_1793017769929.jpg',
};

export const COACHES: Coach[] = [
  {
    id: 'coach-1',
    name: 'كابتن نورهان زهران',
    title: 'كابتن أول ومديرة التدريب البدني',
    specialty: 'تدريب القوة ونحت الجسم وتعديل القوام',
    experience: 'خبرة 9 سنوات معتمدة من ISSA و ACE',
    avatar: GYM_IMAGES.coach,
    bio: 'شغفي هو مساعدة كل سيدة على استعادة ثقتها وقوتها البدنية في بيئة آمنة وداعمة تماماً.',
    activeTraineesCount: 38
  },
  {
    id: 'coach-2',
    name: 'كابتن ياسمين الشريف',
    title: 'أخصائية ريفورمر بيلاتس ومرونة',
    specialty: 'Pilates Reformer & Postural Alignment',
    experience: 'معتمدة دولياً من Balanced Body',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'التركيز على عضلات المركز والعمود الفقري لبناء قوام ممشوق ومظهر أنثوي قوي وخالٍ من آلام الظهر.',
    activeTraineesCount: 29
  },
  {
    id: 'coach-3',
    name: 'كابتن دينا عز الدين',
    title: 'أخصائية التغذية العلاجية والرياضية',
    specialty: 'برامج التخسيس والتغذية الهرمونية للسيدات',
    experience: 'ماجستير التغذية الإكلينيكية وشهادة CISSN',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80',
    bio: 'لا نؤمن بالحرمان القاسي، بل بأسلوب حياة مستدام يحافظ على طاقتك ونضارة بشرتك وشعرك أثناء خسارة الدهون.',
    activeTraineesCount: 45
  },
  {
    id: 'coach-4',
    name: 'كابتن مريم فؤاد',
    title: 'مدربة زومبا وحصص حرق الدهون',
    specialty: 'Zumba Fitness & Cardio Dance',
    experience: 'مدربة زومبا مرخصة ZIN منذ 6 سنوات',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'الحصة الرياضية معنا جرعة سعادة وتفريغ طاقة سلبية وحرق 600 سعرة في أجواء أنثوية مليئة بالحيوية.',
    activeTraineesCount: 34
  }
];

export const FITNESS_CLASSES: FitnessClass[] = [
  {
    id: 'class-1',
    title: 'ريفورمر بيلاتس سيجنتشر',
    titleEn: 'Signature Reformer Pilates',
    coach: 'كابتن ياسمين الشريف',
    time: '10:00 صباحاً - 11:00 صباحاً',
    day: 'السبت، الإثنين، الأربعاء',
    duration: '60 دقيقة',
    intensity: 'متوسط',
    category: 'pilates',
    spotsLeft: 3,
    description: 'تمارين على جهاز الريفورمر لتحسين مرونة العمود الفقري وشد البطن وتقوية العضلات العميقة.'
  },
  {
    id: 'class-2',
    title: 'نحت القوام وتحديد العضلات',
    titleEn: 'Full Body Sculpt & Tone',
    coach: 'كابتن نورهان زهران',
    time: '12:00 ظهراً - 01:00 ظهراً',
    day: 'يومياً عدا الجمعة',
    duration: '60 دقيقة',
    intensity: 'مكثف',
    category: 'strength',
    spotsLeft: 5,
    description: 'تمارين رفع أثقال خفيفة ومقاومة موجهة لمناطق الخصر والأرداف والذراعين بطريقة أنثوية جذابة.'
  },
  {
    id: 'class-3',
    title: 'حفل الزومبا وحرق السعرات',
    titleEn: 'Zumba Latin Fiesta',
    coach: 'كابتن مريم فؤاد',
    time: '05:30 مساءً - 06:30 مساءً',
    day: 'الأحد، الثلاثاء، الخميس',
    duration: '60 دقيقة',
    intensity: 'متوسط',
    category: 'dance',
    spotsLeft: 8,
    description: 'رقص وإيقاعات لاتينية وحماسية ممتعة ترفع هرمونات السعادة وتذيب الدهون دون ملل.'
  },
  {
    id: 'class-4',
    title: 'يوجا التنفس والاسترخاء العميق',
    titleEn: 'Mindful Yoga & Stretch',
    coach: 'كابتن ياسمين الشريف',
    time: '07:00 مساءً - 08:00 مساءً',
    day: 'السبت، الثلاثاء',
    duration: '60 دقيقة',
    intensity: 'خفيف',
    category: 'wellness',
    spotsLeft: 6,
    description: 'تهدئة الجهاز العصبي، إطالة الأوتار المشدودة، وتمارين تنفس تساعد على التخلص من توتر اليوم.'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'باقة التألق (شهر واحد)',
    nameEn: 'Glow Essential',
    price: '950',
    period: 'شهرياً',
    features: [
      'دخول غير محدود لجميع مناطق الجيم والأجهزة',
      'استخدام غرف الساونا والبخار والخزائن الخاصة',
      'قياس InBody وتحليل مكونات الجسم شهرياً',
      'حضور 4 كلاسات جماعية شهرياً',
      'شات ومتابعة أسبوعية مع كابتن التدريب'
    ]
  },
  {
    id: 'plan-pro',
    name: 'باقة التحول الشامل (3 أشهر)',
    nameEn: 'Total Transformation',
    price: '2,400',
    period: 'لمدة 3 أشهر (الأكثر طلباً)',
    isPopular: true,
    features: [
      'دخول مفتوح كامل للجيم والسبا والمشروبات الصحية',
      'شات خاص ومباشر يومي مع الكابتن للرد الفوري',
      'خطة تدريبية وتغذوية مخصصة لهدفك تتجدد كل أسبوعين',
      'كلاسات بيلاتس ريفورمر وزومبا غير محدودة',
      '3 جلسات تدريب شخصي 1-on-1 مع كابتن نورهان',
      'متابعة وزن وقياسات أسبوعية مستمرة'
    ]
  },
  {
    id: 'plan-vip',
    name: 'باقة الـ VIP الملكية (سنة كاملة)',
    nameEn: 'Royal VIP Signature',
    price: '7,800',
    period: 'سنوياً',
    features: [
      'عضوية VIP مميزة مع خزانة شخصية مخصصة',
      'كابتن شخصية مرافقة وشات ذو أولوية فائقة 24/7',
      '12 جلسة تدريب شخصي مجانية + خطة مكملات',
      'دعوات مجانية لصديقاتك مرتين شهرياً',
      'بار العصائر والبروتين شيك مجاناً بعد كل تمرين',
      'إمكانية تجميد الاشتراك حتى 60 يوماً'
    ]
  }
];

export const INITIAL_TRAINEES: Trainee[] = [
  {
    id: 'trainee-101',
    name: 'سارة عبد الرحمن',
    phone: '01012345678',
    email: 'sara.abdelrahman@gmail.com',
    secretCode: '4821',
    status: 'approved',
    goal: 'نحت القوام والتخلص من دهون البطن وبناء لياقة بعد الولادة',
    fitnessLevel: 'intermediate',
    assignedCoachId: 'coach-1',
    assignedCoachName: 'كابتن نورهان زهران',
    membershipPlan: 'باقة التحول الشامل (3 أشهر)',
    weight: 64,
    height: 165,
    targetWeight: 58,
    workoutPlan: 'جدول تدريب 4 أيام أسبوعياً: يومين قوة سفلية + يوم ريفورمر بيلاتس + يوم كارديو خفيف.',
    nutritionTip: 'زيادة البروتين الصافي إلى 95 جم يومياً وشرب 3 لتر ماء مع تقليل السكر المضاف.',
    createdAt: '2026-10-20 10:15',
    approvedAt: '2026-10-20 11:30'
  },
  {
    id: 'trainee-102',
    name: 'ميار الشاذلي',
    phone: '01198765432',
    email: 'mayar.elshazly@outlook.com',
    secretCode: '7790',
    status: 'pending',
    goal: 'زيادة مرونة الظهر والتخلص من الشد العضلي مع كلاسات البيلاتس',
    fitnessLevel: 'beginner',
    assignedCoachId: 'coach-2',
    assignedCoachName: 'كابتن ياسمين الشريف',
    membershipPlan: 'باقة التألق (شهر واحد)',
    weight: 59,
    height: 168,
    targetWeight: 57,
    notes: 'طلبت البدء في أقرب موعد مع كلاسات الريفورمر الصباحية.',
    createdAt: '2026-10-26 09:40'
  },
  {
    id: 'trainee-103',
    name: 'روان محمود',
    phone: '01234567890',
    email: 'rawan.m@gmail.com',
    secretCode: '2025',
    status: 'pending',
    goal: 'خسارة 8 كجم قبل مناسبة زفافها وبناء طاقة إيجابية ونشاط',
    fitnessLevel: 'beginner',
    assignedCoachId: 'coach-1',
    assignedCoachName: 'كابتن نورهان زهران',
    membershipPlan: 'باقة التحول الشامل (3 أشهر)',
    weight: 71,
    height: 162,
    targetWeight: 63,
    notes: 'ترغب في جدول تمارين منزلية وصالة مع نظام غذائي متوازن.',
    createdAt: '2026-10-26 11:05'
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, Array<{
  id: string;
  senderRole: 'trainee' | 'coach' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
}>> = {
  'trainee-101': [
    {
      id: 'm1',
      senderRole: 'system',
      senderName: 'النظام',
      text: 'مرحباً بكِ يا سارة في أورا جيم! تم اعتماد حسابكِ وتعيين الكابتن نورهان زهران لمتابعتكِ.',
      timestamp: '2026-10-20 11:31'
    },
    {
      id: 'm2',
      senderRole: 'coach',
      senderName: 'كابتن نورهان زهران',
      text: 'أهلاً يا سارة يا قمر! نورتي عائلة أورا 🌸، أنا جهزت لكِ خطة البداية، هل عملتي فحص الـ InBody ولا نجهزه أول ما تشرفينا بكره؟',
      timestamp: '2026-10-20 11:35'
    },
    {
      id: 'm3',
      senderRole: 'trainee',
      senderName: 'سارة عبد الرحمن',
      text: 'أهلاً يا كابتن نورهان، تسلمي يا ذوق! لسه ما عملتش الفحص، هاجي بكرة على الساعة 12 إن شاء الله نعمله مع بعض.',
      timestamp: '2026-10-20 12:10'
    },
    {
      id: 'm4',
      senderRole: 'coach',
      senderName: 'كابتن نورهان زهران',
      text: 'ممتاز جداً! خليكِ صايمة عن الأكل ساعتين قبل الفحص عشان النتائج تكون دقيقة 100%. ومستنياكِ بكل حب ❤️',
      timestamp: '2026-10-20 12:15'
    }
  ]
};
