import { useEffect, useState } from "react";
import { useUserStore } from "../../../data/context/user.context";
import { createChat, getMessages, sendMessage } from "../../../data/services/api";
import { useWebSocket } from "../../hooks/useWS";
import { ChatProps, MessageProps } from "../../pages/Chat/interface";
import { ChatInput } from "../Input";
import Message from "../Message";

export const Conversation = ({
  selectedChat,
  setSelectedChat,
  chats,
  setChats,
  messages,
  isSidebarCollapsed,
  participants,
}: {
  selectedChat: string | null;
  setSelectedChat: (chatId: string | null) => void;
  chats: ChatProps[];
  setChats: (chats: ChatProps[]) => void;
  messages: MessageProps[];
  isSidebarCollapsed: boolean;
  participants: string[];
}) => {
  const [activeMessages, setActiveMessages] =
    useState<MessageProps[]>(messages);
  const [inputValue, setInputValue] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [presence, setPresence] = useState<"online" | "typing" | "recording" | "offline">(
    "online"
  );
  const { sendWsMessage, onMessage } = useWebSocket(selectedChat ?? "");
  const { name } = useUserStore();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (presence === "typing") {
      timeout = setTimeout(() => setPresence("online"), 2000);
    } else if (presence === "recording") {
      timeout = setTimeout(() => setPresence("online"), 5000);
    }

    return () => clearTimeout(timeout);
  }, [presence]);

  useEffect(() => {
    if (!selectedChat) return;

    onMessage((data: string) => {
      try {
        const parsedData = JSON.parse(data);

        if (parsedData.event === "presence_updated") {
          setPresence(parsedData.status); 
        }
      } catch (error) {
        console.error("Erro ao processar evento de presença:", error);
      }
    });
  }, [selectedChat, onMessage]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await getMessages(selectedChat ?? "");
        setActiveMessages(response);

      } catch (error) {
        console.log("Erro ao buscar mensagens:", error);
      }
    };

    fetchChatMessages();

  },[selectedChat])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: MessageProps = {
      id: `${Date.now()}`,
      user_id: name ?? "user",
      type: "text",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setActiveMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    sendWsMessage(newMessage.content);
    sendMessage(selectedChat ?? "", newMessage);

    setPresence("typing");
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();

    }
  };

 const startRecording = async () => {
   setPresence("recording");

   try {
     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
     const mediaRecorder = new MediaRecorder(stream);

     const chunks: Blob[] = [];
     mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

     mediaRecorder.onstop = () => {
       const blob = new Blob(chunks, { type: "audio/wav" });
       setAudioBlob(blob);
       stopRecording(blob);
     };

     mediaRecorder.start();

     setTimeout(() => {
       if (mediaRecorder.state === "recording") {
         mediaRecorder.stop();
       }
     }, 300000);
   } catch (error) {
     console.error("Erro ao iniciar gravação de áudio:", error);
     setPresence("online");
   }
 };

 const stopRecording = (blob: Blob | null) => {
   setPresence("online");

   if (blob) {
     const newMessage: MessageProps = {
       id: `${Date.now()}`,
       user_id: name ?? "user",
       type: "audio",
       content: URL.createObjectURL(blob),
       timestamp: new Date().toISOString(),
     };

     setActiveMessages((prevMessages) => [...prevMessages, newMessage]);
     sendWsMessage(URL.createObjectURL(blob));
     setAudioBlob(null);
   }
 };


  const handleConfirmParticipants = () => {
    const newParticipants = [name ?? "user"];
    createChat(newParticipants)
      .then((newChat) => {
        setChats([...chats, newChat]);
        setSelectedChat(newChat.chat_id);
      })
      .catch((error) => {
        console.error("Erro ao criar chat:", error);
      });
  };

  const truncateName = (participantsArray: string[]) => {
    if (participantsArray.length > 3) {
      return `${participantsArray.slice(0, 3).join(", ")} e mais ${
        participantsArray.length - 3
      } `;
    }
    return participantsArray.join(", ");
  };

  return (
    <section
      className={`flex flex-col h-screen bg-gray-300 transition-all duration-500 ${
        isSidebarCollapsed ? "ml-16" : "ml-64"
      }`}
      style={{ width: `calc(100% - ${isSidebarCollapsed ? "4rem" : "16rem"})` }}
    >
      <header className="flex items-center justify-between bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">
          {selectedChat
            ? `${truncateName(participants)}`
            : "Nenhum chat selecionado"}
        </h2>
        <div className="text-sm">
          {presence === "typing" && "Digitando..."}
          {presence === "recording" && "Gravando áudio..."}
          {presence === "online" && "Online"}
          {presence === "offline" && "Offline"}
        </div>
      </header>

      <div className="flex-1 flex flex-col gap-4 p-4 w-full overflow-y-auto">
        {selectedChat ? (
          activeMessages.length > 0 ? (
            activeMessages.map((message) => (
              <Message
                key={message.id}
                message={message}
                currentUserId={name ?? "user"}
                
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">Nenhuma mensagem neste chat.</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-600 mb-4">
              Nenhum chat selecionado. Crie um agora mesmo!
            </p>
            <button
              onClick={() => handleConfirmParticipants()}
              className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600"
            >
              Criar Chat
            </button>
          </div>
        )}
      </div>

      {selectedChat ? (
        <div className="flex items-center gap-2 p-4">
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSendMessage={handleSendMessage}
            onKeyDown={handleInputKeyDown}
          />
          <button
            onMouseDown={startRecording}
            onMouseUp={() => stopRecording(audioBlob)}
            className="bg-gray-500 text-white rounded-full p-3"
          >
            🎤
          </button>
        </div>
      ) : null}
    </section>
  );
};
