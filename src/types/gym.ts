export interface Trainee {
  id: string;
  name: string;
  phone: string;
  email: string;
  secretCode: string; // The secret code made by the trainee
  status: 'pending' | 'approved' | 'rejected';
  goal?: string;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  assignedCoachId?: string;
  assignedCoachName?: string;
  membershipPlan?: string;
  weight?: number;
  height?: number;
  targetWeight?: number;
  notes?: string;
  workoutPlan?: string;
  nutritionTip?: string;
  createdAt: string;
  approvedAt?: string;
}

export interface ChatMessage {
  id: string;
  traineeId: string;
  senderRole: 'trainee' | 'coach' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  avatar: string;
  bio: string;
  activeTraineesCount: number;
}

export interface FitnessClass {
  id: string;
  title: string;
  titleEn: string;
  coach: string;
  time: string;
  day: string;
  duration: string;
  intensity: 'خفيف' | 'متوسط' | 'مكثف';
  category: 'pilates' | 'cardio' | 'strength' | 'wellness' | 'dance';
  spotsLeft: number;
  description: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  nameEn: string;
  price: string;
  period: string;
  isPopular?: boolean;
  features: string[];
}
