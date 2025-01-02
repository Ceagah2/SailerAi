export type MessageProps = {
  id: string;
  user_id: string;
  type: string;
  content: string;
  timestamp: string;
};

export type PresenceProps = {
  user_id: string;
  status: "online" | "offline" | "typing";
  last_seen?: string;
};
