import { useEffect, useRef } from "react";

export const useWebSocket = (chatId: string) => {
  const wsRef = useRef<WebSocket | null>(null);

  

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${chatId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket conectado.");
    };

    ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    ws.onclose = () => {
      console.warn("WebSocket desconectado.");
    };

    ws.onmessage = (event) => {
      console.log("Mensagem recebida do servidor:", event.data);
    };

    return () => {
      ws.close();
    };
  }, [chatId]);

  const sendWsMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);

    } else {
      console.warn("WebSocket ainda não está conectado. Tentando reconectar...");
    }
  };
  const onMessage = (callback: (data: string) => void) => {
    if (wsRef.current) {
      wsRef.current.onmessage = (event) => {
        callback(event.data);
      };
    } else {
      console.warn("WebSocket não está conectado.");
    }
  };

  return { sendWsMessage, onMessage };
};
