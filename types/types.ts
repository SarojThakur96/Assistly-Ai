// chatbots.ts
export interface Chatbot {
  id: number;
  clerk_user_id: string;
  name: string;
  created_at: string; // ISO timestamp format
}

// chatbot_characteristics.ts
export interface ChatbotCharacteristic {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: string;
}

// Combined type
export type ChatbotSummary = {
  id: number;
  name: string;
  chatbot_characteristics: {
    id: number;
    content: string;
  }[];
};

// guests.ts
export interface Guest {
  id: number;
  name: string | null;
  email: string | null;
  created_at: string;
}

// chat_sessions.ts
export interface ChatSession {
  id: number;
  chatbot_id: number;
  guest_id: number | null;
  created_at: string;
}

export interface ChatbotWithSessionCount {
  id: number;
  name: string;
  session_count: string;
  created_at: string;
  guests: Guest[];
}

export interface ChatbotWithMessages extends Guest {
  chatbot_name: string;
  messages: Message[];
}

// messages.ts
export interface Message {
  id: number;
  chat_session_id: number;
  content: string;
  created_at: string;
  sender: "user" | "ai";
}
