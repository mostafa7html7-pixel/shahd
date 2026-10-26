import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trainee, ChatMessage } from '../types/gym';
import { INITIAL_TRAINEES, INITIAL_CHAT_MESSAGES, COACHES } from '../data/gymData';
import { db, auth, OperationType, handleFirestoreError, testConnection } from '../lib/firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  addDoc
} from 'firebase/firestore';

interface GymContextType {
  trainees: Trainee[];
  currentTrainee: Trainee | null;
  isCaptainMode: boolean;
  selectedChatTrainee: Trainee | null;
  activeTab: 'home' | 'classes' | 'coaches' | 'plans' | 'portal' | 'captain';
  messages: ChatMessage[];
  unreadCountForCaptain: number;
  firebaseOnline: boolean;
  
  // Actions
  setActiveTab: (tab: 'home' | 'classes' | 'coaches' | 'plans' | 'portal' | 'captain') => void;
  setIsCaptainMode: (val: boolean) => void;
  setSelectedChatTrainee: (trainee: Trainee | null) => void;
  registerTrainee: (data: {
    name: string;
    phone: string;
    email: string;
    secretCode: string;
    goal?: string;
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
    membershipPlan?: string;
    weight?: number;
    height?: number;
  }) => Promise<Trainee>;
  loginWithSecretCode: (secretCode: string, emailOrPhone?: string) => Promise<Trainee | null>;
  logoutTrainee: () => void;
  approveTrainee: (traineeId: string, coachId?: string, workoutPlan?: string) => Promise<void>;
  rejectTrainee: (traineeId: string) => Promise<void>;
  sendMessage: (traineeId: string, text: string, senderRole: 'trainee' | 'coach', senderName: string) => Promise<void>;
  updateTraineeNotes: (traineeId: string, notes: string, workoutPlan?: string) => Promise<void>;
}

const GymContext = createContext<GymContextType | null>(null);

const STORAGE_TRAINEES_KEY = 'aura_gym_trainees_local_v2';
const STORAGE_CURRENT_KEY = 'aura_gym_current_user_v2';
const STORAGE_MESSAGES_KEY = 'aura_gym_messages_local_v2';

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trainees, setTrainees] = useState<Trainee[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TRAINEES_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TRAINEES;
    } catch {
      return INITIAL_TRAINEES;
    }
  });

  const [currentTrainee, setCurrentTrainee] = useState<Trainee | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [localMessagesMap, setLocalMessagesMap] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MESSAGES_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isCaptainMode, setIsCaptainMode] = useState<boolean>(false);
  const [selectedChatTrainee, setSelectedChatTrainee] = useState<Trainee | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'classes' | 'coaches' | 'plans' | 'portal' | 'captain'>('home');
  const [firebaseOnline, setFirebaseOnline] = useState<boolean>(false);

  // Check connection on boot
  useEffect(() => {
    testConnection().then(ok => setFirebaseOnline(ok));
  }, []);

  // Save local trainees backup
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TRAINEES_KEY, JSON.stringify(trainees));
    } catch (e) {
      console.warn('Failed saving to localStorage', e);
    }
  }, [trainees]);

  // Save current trainee session
  useEffect(() => {
    try {
      if (currentTrainee) {
        localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify(currentTrainee));
      } else {
        localStorage.removeItem(STORAGE_CURRENT_KEY);
      }
    } catch (e) {
      console.warn('Failed saving session', e);
    }
  }, [currentTrainee]);

  // Sync trainees with Firestore
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'trainees'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Trainee[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Trainee);
          });
          // Merge with initial if needed
          setTrainees((prev) => {
            const map = new Map<string, Trainee>();
            prev.forEach(t => map.set(t.id, t));
            list.forEach(t => map.set(t.id, t));
            return Array.from(map.values());
          });
        }
      },
      (error) => {
        console.warn('Firestore onSnapshot trainees error (falling back to local state):', error.message);
      }
    );

    return () => unsub();
  }, []);

  // Active chat target: either current trainee or selected trainee by captain
  const activeChatId = isCaptainMode ? selectedChatTrainee?.id : currentTrainee?.id;

  // Listen to messages for the active chat ID
  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }

    // Set immediate local fallback
    const localMsgs = localMessagesMap[activeChatId] || [];
    setMessages(localMsgs);

    const msgsRef = collection(db, 'trainees', activeChatId, 'messages');
    const q = query(msgsRef, orderBy('timestamp', 'asc'));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: ChatMessage[] = [];
          snapshot.forEach((d) => {
            loaded.push({ id: d.id, ...d.data() } as ChatMessage);
          });
          setMessages(loaded);
        }
      },
      (error) => {
        console.warn('Messages snapshot listener note:', error.message);
      }
    );

    return () => unsub();
  }, [activeChatId, localMessagesMap, isCaptainMode]);

  // Register a new trainee
  const registerTrainee = async (data: {
    name: string;
    phone: string;
    email: string;
    secretCode: string;
    goal?: string;
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
    membershipPlan?: string;
    weight?: number;
    height?: number;
  }): Promise<Trainee> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `trainee-${Date.now().toString().slice(-4)}${randomSuffix}`;
    const defaultCoach = COACHES[0];

    const newTrainee: Trainee = {
      id: newId,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      secretCode: data.secretCode.trim(),
      status: 'pending',
      goal: data.goal || 'تحسين اللياقة ونحت القوام',
      fitnessLevel: data.fitnessLevel || 'beginner',
      assignedCoachId: defaultCoach.id,
      assignedCoachName: defaultCoach.name,
      membershipPlan: data.membershipPlan || 'باقة التحول الشامل (3 أشهر)',
      weight: data.weight,
      height: data.height,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: 'تم التسجيل عبر الموقع بانتظار اعتماد الكابتن.'
    };

    // Update local state immediately
    setTrainees(prev => [newTrainee, ...prev]);
    setCurrentTrainee(newTrainee);

    // Initial system greeting message
    const welcomeMsg: ChatMessage = {
      id: `sys-${Date.now()}`,
      traineeId: newId,
      senderRole: 'system',
      senderName: 'أورا جيم - الإدارة',
      text: `أهلاً بكِ يا ${newTrainee.name} في نادي أورا النسائي! تم تسجيل طلبكِ بنجاح تحت الكود السري (${newTrainee.secretCode}). الكابتن ستراجع ملفكِ الآن وتعتمد حسابكِ لبدء المحادثة ومتابعة برنامجكِ الرياضي.`,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setLocalMessagesMap(prev => ({
      ...prev,
      [newId]: [welcomeMsg]
    }));

    // Try persisting to Firestore
    try {
      await setDoc(doc(db, 'trainees', newId), newTrainee);
      await addDoc(collection(db, 'trainees', newId, 'messages'), welcomeMsg);
    } catch (err) {
      console.warn('Saved trainee locally. Firestore note:', err);
    }

    return newTrainee;
  };

  // Login with Secret Code & email or phone
  const loginWithSecretCode = async (secretCode: string, emailOrPhone?: string): Promise<Trainee | null> => {
    const cleanCode = secretCode.trim();
    const cleanId = emailOrPhone?.trim().toLowerCase();

    const matched = trainees.find(t => {
      const codeMatch = t.secretCode === cleanCode;
      if (!codeMatch) return false;
      if (!cleanId) return true; // Login via secret code only
      return (
        t.email.toLowerCase() === cleanId ||
        t.phone.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, '')
      );
    });

    if (matched) {
      setCurrentTrainee(matched);
      return matched;
    }
    return null;
  };

  const logoutTrainee = () => {
    setCurrentTrainee(null);
    localStorage.removeItem(STORAGE_CURRENT_KEY);
  };

  // Captain approves trainee
  const approveTrainee = async (traineeId: string, coachId?: string, workoutPlan?: string) => {
    const coach = COACHES.find(c => c.id === coachId) || COACHES[0];
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const defaultPlan = workoutPlan || 'برنامج 4 أيام أسبوعياً: يومين نحت الجزء السفلي + يوم ريفورمر بيلاتس + يوم لياقة وهوائي.';

    setTrainees(prev => prev.map(t => {
      if (t.id === traineeId) {
        return {
          ...t,
          status: 'approved',
          assignedCoachId: coach.id,
          assignedCoachName: coach.name,
          approvedAt: timestamp,
          workoutPlan: defaultPlan
        };
      }
      return t;
    }));

    if (currentTrainee?.id === traineeId) {
      setCurrentTrainee(prev => prev ? ({
        ...prev,
        status: 'approved',
        assignedCoachId: coach.id,
        assignedCoachName: coach.name,
        approvedAt: timestamp,
        workoutPlan: defaultPlan
      }) : null);
    }

    // Add celebration message from coach in chat
    const coachGreeting: ChatMessage = {
      id: `msg-${Date.now()}`,
      traineeId,
      senderRole: 'coach',
      senderName: coach.name,
      text: `ألف مبروك! تم اعتماد انضمامكِ رسمياً يا جميلة 🌸 أنا ${coach.name} وسأكون كابتن التدريب ومتابعتكِ الشخصية خطوة بخطوة. أجهّز لكِ برنامجكِ وسأكون معكِ هنا في الشات للإجابة عن أي استفسار أو متابعة الوجبات والتمارين!`,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setLocalMessagesMap(prev => ({
      ...prev,
      [traineeId]: [...(prev[traineeId] || []), coachGreeting]
    }));

    try {
      await updateDoc(doc(db, 'trainees', traineeId), {
        status: 'approved',
        assignedCoachId: coach.id,
        assignedCoachName: coach.name,
        approvedAt: timestamp,
        workoutPlan: defaultPlan
      });
      await addDoc(collection(db, 'trainees', traineeId, 'messages'), coachGreeting);
    } catch (err) {
      console.warn('Approved trainee locally. Firestore note:', err);
    }
  };

  // Captain rejects trainee
  const rejectTrainee = async (traineeId: string) => {
    setTrainees(prev => prev.map(t => t.id === traineeId ? { ...t, status: 'rejected' } : t));
    if (currentTrainee?.id === traineeId) {
      setCurrentTrainee(prev => prev ? { ...prev, status: 'rejected' } : null);
    }

    try {
      await updateDoc(doc(db, 'trainees', traineeId), { status: 'rejected' });
    } catch (err) {
      console.warn('Rejected trainee locally:', err);
    }
  };

  // Send a message
  const sendMessage = async (
    traineeId: string,
    text: string,
    senderRole: 'trainee' | 'coach',
    senderName: string
  ) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      traineeId,
      senderRole,
      senderName,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    // Update local state immediately for zero-latency UI
    setLocalMessagesMap(prev => {
      const list = prev[traineeId] || [];
      const updated = [...list, newMsg];
      try {
        localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify({ ...prev, [traineeId]: updated }));
      } catch (e) {
        console.warn('localStorage save message failed:', e);
      }
      return { ...prev, [traineeId]: updated };
    });

    setMessages(prev => [...prev, newMsg]);

    // Send to Firestore
    try {
      await addDoc(collection(db, 'trainees', traineeId, 'messages'), newMsg);
    } catch (err) {
      console.warn('Stored message locally. Firestore sync error:', err);
    }
  };

  const updateTraineeNotes = async (traineeId: string, notes: string, workoutPlan?: string) => {
    setTrainees(prev => prev.map(t => {
      if (t.id === traineeId) {
        return { ...t, notes, ...(workoutPlan ? { workoutPlan } : {}) };
      }
      return t;
    }));

    try {
      await updateDoc(doc(db, 'trainees', traineeId), {
        notes,
        ...(workoutPlan ? { workoutPlan } : {})
      });
    } catch (err) {
      console.warn('Updated notes locally:', err);
    }
  };

  const unreadCountForCaptain = trainees.filter(t => t.status === 'pending').length;

  return (
    <GymContext.Provider
      value={{
        trainees,
        currentTrainee,
        isCaptainMode,
        selectedChatTrainee,
        activeTab,
        messages,
        unreadCountForCaptain,
        firebaseOnline,
        setActiveTab,
        setIsCaptainMode,
        setSelectedChatTrainee,
        registerTrainee,
        loginWithSecretCode,
        logoutTrainee,
        approveTrainee,
        rejectTrainee,
        sendMessage,
        updateTraineeNotes
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
