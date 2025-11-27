export interface Therapist {
  id: string;
  username: string;
  email: string;
  password: string;
  licenseNo: string;
  name: string;
  credentials: string;
  specializations: string[];
  languages: string[];
  experience: string;
  availableFrom: string;
  availableTo: string;
}

export interface SessionRequest {
  id: string;
  userId: string;
  userNickname: string;
  ageGroup?: string;
  languagePreference: string;
  context: string;
  requestedTime: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  therapistId?: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'therapist';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Session {
  id: string;
  userId: string;
  userNickname: string;
  therapistId: string;
  status: 'active' | 'waiting' | 'completed';
  startTime: string;
  endTime?: string;
  duration?: number;
  therapistNotes?: string;
  userFeedback?: string;
  context: string;
}

export interface DashboardStats {
  totalSessionsToday: number;
  pendingRequests: number;
  activeSessions: number;
  completedThisWeek: number;
  weeklySessionData: { day: string; sessions: number }[];
  sessionsByCategory: { category: string; count: number }[];
  satisfactionRate: number;
}

// Static therapist data
export const therapists: Therapist[] = [
  {
    id: 'T001',
    username: 'dr.tashi',
    email: 'tashi.dorji@calm.bt',
    password: 'therapist123',
    licenseNo: 'BT-MH-2015-001',
    name: 'Dr. Tashi Dorji',
    credentials: 'PhD in Clinical Psychology',
    specializations: ['Anxiety & Depression', 'Stress Management', 'Trauma'],
    languages: ['Dzongkha', 'English'],
    experience: '12 years',
    availableFrom: '09:00',
    availableTo: '17:00'
  },
  {
    id: 'T002',
    username: 'dr.pema',
    email: 'pema.choden@calm.bt',
    password: 'therapist123',
    licenseNo: 'BT-MH-2017-024',
    name: 'Dr. Pema Choden',
    credentials: 'MA in Counseling Psychology',
    specializations: ['Relationship Counseling', 'Family Therapy', 'Grief'],
    languages: ['Dzongkha', 'English', 'Hindi'],
    experience: '8 years',
    availableFrom: '10:00',
    availableTo: '18:00'
  },
  {
    id: 'T003',
    username: 'dr.karma',
    email: 'karma.wangchuk@calm.bt',
    password: 'therapist123',
    licenseNo: 'BT-MH-2016-012',
    name: 'Dr. Karma Wangchuk',
    credentials: 'MSc in Clinical Psychology',
    specializations: ['Stress Management', 'Work-Life Balance', 'Burnout'],
    languages: ['Dzongkha', 'English'],
    experience: '10 years',
    availableFrom: '08:00',
    availableTo: '16:00'
  }
];

// Static session requests
export const sessionRequests: SessionRequest[] = [
  {
    id: 'SR001',
    userId: 'U001',
    userNickname: 'Anonymous_Butterfly',
    ageGroup: '25-35',
    languagePreference: 'English',
    context: 'Feeling overwhelmed with work stress and anxiety',
    requestedTime: '2025-11-28T14:00:00',
    status: 'pending',
    createdAt: '2025-11-28T10:30:00',
    priority: 'high'
  },
  {
    id: 'SR002',
    userId: 'U002',
    userNickname: 'Silent_Warrior',
    ageGroup: '18-24',
    languagePreference: 'Dzongkha',
    context: 'Struggling with family relationships',
    requestedTime: '2025-11-28T15:30:00',
    status: 'pending',
    createdAt: '2025-11-28T09:15:00',
    priority: 'medium'
  },
  {
    id: 'SR003',
    userId: 'U003',
    userNickname: 'Peaceful_Mind',
    ageGroup: '36-50',
    languagePreference: 'English',
    context: 'Need support for managing depression',
    requestedTime: '2025-11-28T16:00:00',
    status: 'accepted',
    therapistId: 'T001',
    createdAt: '2025-11-28T08:45:00',
    priority: 'high'
  },
  {
    id: 'SR004',
    userId: 'U004',
    userNickname: 'Hopeful_Soul',
    ageGroup: '25-35',
    languagePreference: 'English',
    context: 'Dealing with grief and loss',
    requestedTime: '2025-11-27T14:00:00',
    status: 'completed',
    therapistId: 'T002',
    createdAt: '2025-11-27T10:00:00',
    priority: 'medium'
  }
];

// Static sessions
export const sessions: Session[] = [
  {
    id: 'S001',
    userId: 'U003',
    userNickname: 'Peaceful_Mind',
    therapistId: 'T001',
    status: 'active',
    startTime: '2025-11-28T14:00:00',
    context: 'Managing depression and building coping strategies',
    therapistNotes: 'Patient shows good engagement, recommended mindfulness exercises'
  },
  {
    id: 'S002',
    userId: 'U005',
    userNickname: 'Brave_Heart',
    therapistId: 'T001',
    status: 'waiting',
    startTime: '2025-11-28T15:00:00',
    context: 'Anxiety management and stress relief'
  },
  {
    id: 'S003',
    userId: 'U004',
    userNickname: 'Hopeful_Soul',
    therapistId: 'T002',
    status: 'completed',
    startTime: '2025-11-27T14:00:00',
    endTime: '2025-11-27T15:00:00',
    duration: 60,
    context: 'Grief counseling',
    therapistNotes: 'Good progress, follow-up recommended in 2 weeks',
    userFeedback: 'Very helpful session, felt heard and supported'
  }
];

// Static chat messages
export const chatMessages: ChatMessage[] = [
  {
    id: 'MSG001',
    sessionId: 'S001',
    sender: 'therapist',
    message: 'Hello! Welcome to our session. How are you feeling today?',
    timestamp: '2025-11-28T14:00:30',
    read: true
  },
  {
    id: 'MSG002',
    sessionId: 'S001',
    sender: 'user',
    message: 'Hi doctor, I have been feeling really down lately. It is hard to get out of bed.',
    timestamp: '2025-11-28T14:01:15',
    read: true
  },
  {
    id: 'MSG003',
    sessionId: 'S001',
    sender: 'therapist',
    message: 'Thank you for sharing that with me. That takes courage. Can you tell me more about when these feelings started?',
    timestamp: '2025-11-28T14:02:00',
    read: true
  }
];

// Dashboard statistics
export const getDashboardStats = (therapistId: string): DashboardStats => {
  return {
    totalSessionsToday: 5,
    pendingRequests: 2,
    activeSessions: 1,
    completedThisWeek: 12,
    weeklySessionData: [
      { day: 'Mon', sessions: 3 },
      { day: 'Tue', sessions: 5 },
      { day: 'Wed', sessions: 2 },
      { day: 'Thu', sessions: 4 },
      { day: 'Fri', sessions: 3 },
      { day: 'Sat', sessions: 1 },
      { day: 'Sun', sessions: 0 }
    ],
    sessionsByCategory: [
      { category: 'Anxiety', count: 8 },
      { category: 'Depression', count: 6 },
      { category: 'Stress', count: 5 },
      { category: 'Relationships', count: 4 },
      { category: 'Grief', count: 2 }
    ],
    satisfactionRate: 4.8
  };
};

// Quick reply templates
export const quickReplies = [
  "Thank you for sharing that with me.",
  "Can you tell me more about how that makes you feel?",
  "That's completely understandable. You're not alone in feeling this way.",
  "Let's explore some coping strategies together.",
  "How has this been affecting your daily life?",
  "That's a great insight. How does that awareness help you?"
];
