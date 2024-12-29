export interface ChatProps {
  chat_id: string;
  participants: string[]
}


export interface MessageProps {
  id: string;
  user_id: string;
  type: string;
  content: string;
  timestamp: Date;
}