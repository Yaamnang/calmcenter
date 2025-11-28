export interface User {
  id: string;
  nickname: string;
  email: string;
  password: string;
  ageGroup?: string;
  language: string;
  joinedAt: string;
}

export interface Therapist {
  id: string;
  name: string;
  email: string;
  password: string;
  credentials: string;
  specialization: string[];
  language: string[];
  availability: string;
}

export interface Session {
  id: string;
  userId: string;
  therapistId: string;
  userNickname: string;
  status: 'pending' | 'active' | 'completed';
  scheduledTime?: string;
  duration?: number;
  context?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  sessionId: string;
  senderType: 'user' | 'therapist';
  content: string;
  timestamp: string;
}

// Mock Data
export const therapists: Therapist[] = [
  {
    id: 'T001',
    name: 'Dr. Tashi Dorji',
    email: 'tashi@calm.bt',
    password: 'therapist123',
    credentials: 'Licensed Clinical Psychologist',
    specialization: ['Anxiety', 'Depression', 'Trauma'],
    language: ['English', 'Dzongkha'],
    availability: 'Mon-Fri, 9AM-5PM'
  },
    {
    id: 'T003',
    name: 'Dr. Nima Dorji',
    email: 'nima@gmail.com',
    password: 'nima123',
    credentials: 'Licensed Clinical Psychologist',
    specialization: ['Anxiety', 'Depression', 'Trauma'],
    language: ['English', 'Dzongkha'],
    availability: 'Mon-Fri, 9AM-5PM'
  },
  {
    id: 'T002',
    name: 'Dr. Pema Wangmo',
    email: 'pema@calm.bt',
    password: '123',
    credentials: 'Mental Health Counselor',
    specialization: ['Stress', 'Relationships', 'Youth Support'],
    language: ['English', 'Dzongkha'],
    availability: 'Mon-Sat, 10AM-6PM'
  }
];

export const users: User[] = [
  {
    id: 'U001',
    nickname: 'SilentMountain',
    email: 'sonam@gmail.com',
    password: '123',
    ageGroup: '18-25',
    language: 'English',
    joinedAt: '2024-01-15'
  },
  {
    id: 'U002',
    nickname: 'QuietRiver',
    email: 'quiet@calm.bt',
    password: '123',
    ageGroup: '26-35',
    language: 'Dzongkha',
    joinedAt: '2024-02-20'
  },
  {
    id: 'U003',
    nickname: 'meow',
    email: 'meow@calm.bt',
    password: '123',
    ageGroup: '18-25',
    language: 'English',
    joinedAt: '2024-03-01'
  }
];

export const sessions: Session[] = [
  {
    id: 'S001',
    userId: 'U001',
    therapistId: 'T001',
    userNickname: 'SilentMountain',
    status: 'pending',
    scheduledTime: '2024-03-15T14:00:00',
    context: 'Feeling anxious about college',
    createdAt: '2024-03-10T10:30:00'
  },
  {
    id: 'S002',
    userId: 'U002',
    therapistId: 'T002',
    userNickname: 'QuietRiver',
    status: 'active',
    context: 'Stress from work',
    createdAt: '2024-03-12T15:00:00'
  }
];

export const messages: Message[] = [
  {
    id: 'M001',
    sessionId: 'S002',
    senderType: 'user',
    content: 'Hello, I need some guidance',
    timestamp: '2024-03-12T15:05:00'
  },
  {
    id: 'M002',
    sessionId: 'S002',
    senderType: 'therapist',
    content: "Hello QuietRiver, I'm here to listen. Take your time.",
    timestamp: '2024-03-12T15:06:00'
  }
];