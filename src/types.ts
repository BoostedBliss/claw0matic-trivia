export interface PlushieHost {
  id: string;
  name: string;
  title: string;
  tagline: string;
  category: string;
  categoryDescription: string;
  personality: string;
  themeColor: string;
  accentColor: string;
  badge: string;
  emoji: string;
  voiceName: 'Kore' | 'Zephyr' | 'Puck' | 'Fenrir' | 'Charon';
  specialtyIcons: string[];
  catchphrases: {
    intro: string;
    correct: string[];
    wrong: string[];
    idle: string[];
    victory: string;
  };
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  funHostCommentary: string;
  searchGroundingSource?: string;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  isUser: boolean;
  isHost: boolean;
  selectedOption: number | null;
  status: 'online' | 'idle' | 'dnd';
  tag: string;
  isSpeaking?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  roleColor?: string;
  badge?: string;
  isSystem?: boolean;
}

export type GameState =
  | 'claw_picker'
  | 'host_intro'
  | 'question'
  | 'round_review'
  | 'victory_podium';
