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

// messages.ts
export interface Message {
  id: number;
  chat_session_id: number;
  content: string;
  created_at: string;
  sender: "user" | "ai";
}
