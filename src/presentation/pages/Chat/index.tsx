import { useState } from "react";
import { Conversation, SideBar } from "../../components";

const mockChats = [
  {
    id: "chat1",
    name: "General Chat",
    messages: [{ id: "message1", type: "text", content: "Hello everyone!" }],
    sender: "other",
  },
  {
    id: "chat2",
    name: "Work Updates",
    messages: [
      {
        id: "message2",
        type: "text",
        content: "Project deadline is next Monday.",
      },
    ],
    sender: "other",
  },
];

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handleChatSelect = (chatId: string | null) => {
    setSelectedChat(chatId);
  };

  const selectedMessages =
    mockChats.find((chat) => chat.name === selectedChat)?.messages || [];


  return (
    <main className="flex h-screen w-full bg-gray-100">
      <SideBar
        chats={mockChats}
        onSelectChat={handleChatSelect}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <Conversation
        selectedChat={selectedChat}
        messages={selectedMessages}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </main>
  );
}
