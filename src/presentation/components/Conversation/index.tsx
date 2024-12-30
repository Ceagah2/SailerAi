import { useState } from "react";
import { useUserStore } from "../../../data/context/user.context";
import { createChat } from "../../../data/services/api";
import { ChatProps, MessageProps } from "../../pages/Chat/interface";
import { ChatInput } from "../Input";

export const Conversation = ({
  selectedChat,
  setSelectedChat,
  chats,
  setChats,
  messages,
  isSidebarCollapsed,
}: {
  selectedChat: string | null;
  setSelectedChat: (chatId: string | null) => void;
  chats: ChatProps[];
  setChats: (chats: ChatProps[]) => void;
  messages: MessageProps[];
  isSidebarCollapsed: boolean;
}) => {
  const [activeMessages, setActiveMessages] =
    useState<MessageProps[]>(messages);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const { name } = useUserStore();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: MessageProps = {
      id: `${Date.now()}`,
      sender: "user", 
      user_id: name ?? "user",
      type: "text",
      content: inputValue,
      timestamp: new Date(),
    };

    setActiveMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
   
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
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
  };

  const stopRecording = (blob: Blob | null) => {
    setIsRecording(false);

    if (blob) {
      const newMessage: MessageProps = {
        id: `${Date.now()}`,
        user_id: name ?? "user",
        sender: "user",
        type: "audio",
        content: URL.createObjectURL(blob),
        timestamp: new Date(),
      };
      setActiveMessages((prevMessages) => [...prevMessages, newMessage]);
      setAudioBlob(null);
    }
  };

  const handleCreateChat = async () => {
    try {
      const newChat = await createChat([name || "usuário", "bot_user"]);
      setChats([...chats, newChat]);
      setSelectedChat(newChat.chat_id);
    } catch (error) {
      console.error("Erro ao criar chat:", error);
    }
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
          {selectedChat ? `${selectedChat}` : "Nenhum chat selecionado"}
        </h2>
        {isRecording && (
          <div className="animate-pulse text-sm text-red-500">
            Gravando áudio...
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col gap-4 p-4 w-full overflow-y-auto">
        {selectedChat ? (
          activeMessages.length > 0 ? (
            activeMessages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                } p-3 rounded-lg`}
                style={{ maxWidth: "70%" }}
              >
                {message.type === "audio" ? (
                  <audio controls src={message.content}></audio>
                ) : (
                  message.content
                )}
              </div>
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
              onClick={handleCreateChat}
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
