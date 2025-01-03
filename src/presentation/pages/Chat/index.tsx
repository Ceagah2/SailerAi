import { useEffect, useState } from "react";
import { useUserStore } from "../../../data/context/user.context";
import { getChats, getMessages } from "../../../data/services/api";
import UserSetup from "../../components/atoms/UserModal";
import { Conversation, SideBar } from "../../components/molecules";
import { ChatProps, MessageProps } from "./interface";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [chatParticipants, setChatParticipants] = useState<string[]>([]);
  const { name, photo } = useUserStore();

  const handleChatSelect = (chatId: string | null, participants?: string[]) => {
    setSelectedChat(chatId);
    setChatParticipants(participants ?? []);
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
        setChats={setChats}
      />
      <Conversation
        selectedChat={selectedChat}
        messages={messages}
        isSidebarCollapsed={isSidebarCollapsed} 
        setSelectedChat={handleChatSelect} 
        chats={chats} 
        setChats={setChats}
        participants={chatParticipants}
      />
    </main>
  );
}
