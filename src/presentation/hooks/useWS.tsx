import { useEffect, useRef, useState } from "react";

type PresenceTypes = "online" | "offline"

type PresenceData = {
  user_id: string;
  status: PresenceTypes;
};


export const useWebSocket = (chatId: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [presence, setPresence] = useState<PresenceData[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!chatId) return;

    const socket = new WebSocket(`ws://localhost:8000/ws/${chatId}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket Event:", data);

      switch (data.event) {
        case "message_received":
          setMessages((prev) => [...prev, data.data]);
          break;
        case "presence_updated":
          setPresence((prev) => {
            const updated = prev.filter((p) => p.user_id !== data.data.user_id);
            return [
              ...updated,
              { user_id: data.data.user_id, status: data.data.status },
            ];
          });
          break;
        case "chat_read":
          console.log("Chat read event:", data.data);
          break;
        default:
          console.warn("Unknown WebSocket event:", data.event);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [chatId]);

  const sendMessage = (message: { user_id: string; content: string }) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open");
    }
  };

  return {
    messages,
    presence,
    sendMessage,
  };
};
