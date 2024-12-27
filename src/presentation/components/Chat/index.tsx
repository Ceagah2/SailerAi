import { ChatInput } from "../Input";

interface Message {
  type: string;
  content: string;
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
  return (
    <section
      className={`flex flex-col h-screen bg-gray-300 transition-all duration-500 ${
        isSidebarCollapsed ? "ml-16" : "ml-64"
      }`}
      style={{ width: `calc(100% - ${isSidebarCollapsed ? "4rem" : "16rem"})` }}
    >
      <header className="flex items-center justify-between bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">
          {selectedChat ? `Chat: ${selectedChat}` : "Nenhum chat selecionado"}
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.type === "text"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
              style={{
                alignSelf: message.type === "text" ? "flex-start" : "flex-end",
                maxWidth: "70%",
              }}
            >
              {message.content}
            </div>
          ))
        ) : (
          <p className="text-gray-600">Nenhuma mensagem neste chat.</p>
        )}
      </div>

      <ChatInput onSendMessage={() => {}} />
    </section>
  );
};
