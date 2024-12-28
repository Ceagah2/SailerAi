import { useState } from "react";
import { ChatInput } from "../Input";

interface Message {
  id: string;
  type: string;
  content: string;
  sender: 'me' | 'other'
}

export const Conversation = ({
  selectedChat,
  messages,
  isSidebarCollapsed,
}: {
  selectedChat: string | null;
  messages: Message[];
  isSidebarCollapsed: boolean;
}) => {
    const [activeMessages, setActiveMessages] = useState<Message[]>(messages);
    const [inputValue, setInputValue] = useState("");
    
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: `${Date.now()}`,
      type: "text",
      content: inputValue,
      sender: 'me'
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
      </header>

      <div className="flex-1 flex flex-col gap-4 p-4 w-full overflow-y-auto">
        {activeMessages.length > 0 ? (
          activeMessages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.sender === "me"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-white text-black self-start"
              }`}
              style={{
                maxWidth: "70%",
                alignSelf: message.sender === "me" ? "flex-end" : "flex-start",
              }}
            >
              {message.content}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">
              Nenhuma mensagem neste chat. Crie um chat agora mesmo ou escolha
              um chat para conversar.
            </p>
          </div>
        )}
      </div>
      {selectedChat ? (
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSendMessage={handleSendMessage}
          onKeyDown={handleInputKeyDown}
        />
      ) : null}
    </section>
  );
};
