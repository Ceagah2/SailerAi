import { useEffect, useState } from "react";
import { useUserStore } from "../../../data/context/user.context";
import { getChats, getMessages } from "../../../data/services/api";
import { Conversation, SideBar } from "../../components";
import UserSetup from "../../components/UserModal";
import { ChatProps, MessageProps } from "./interface";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const { name, photo } = useUserStore();

  const handleChatSelect = (chatId: string | null) => {
    setSelectedChat(chatId);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats();
        setChats(response);
      } catch (error) {
        console.log("Erro ao buscar chats:", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;

      try {
        const response = await getMessages(selectedChat);
        setMessages(response);
      } catch (error) {
        console.log("Erro ao buscar mensagens:", error);
      }
    };

    fetchMessages();
  }, [selectedChat]); 


  if (!name || !photo) {
    return <UserSetup />;
  }


  return (
    <main className="flex h-screen w-full bg-gray-100">
      <SideBar
        chats={chats}
        onSelectChat={handleChatSelect}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <Conversation
        selectedChat={selectedChat}
        messages={messages}
        isSidebarCollapsed={isSidebarCollapsed} 
        setSelectedChat={handleChatSelect} 
        chats={chats} 
        setChats={setChats}
      />
    </main>
  );
}
