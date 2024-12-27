import { useEffect, useState } from "react";
import { getChats } from "../../../data/services/api";
import { Conversation, SideBar } from "../../components";

export default function Chat() {
  const [chats, setChats] = useState<string[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [hasMoreChats, setHasMoreChats] = useState<boolean>(true); 

  const fetchChats = async (page: number) => {
    setLoading(true);
    try {
      const response = await getChats();
      console.log('response:', response)
      const data = await response.json();
      setChats((prevChats) => [...prevChats, ...data.chats]);
      setHasMoreChats(data.hasMore); 
    } catch (error) {
      console.error("Erro ao buscar chats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats(1); 
  }, []);

  const handleLoadMoreChats = () => {
    if (loading || !hasMoreChats) return; 
    const nextPage = Math.ceil(chats.length / 10) + 1;
    fetchChats(nextPage);
  };

  const handleChatSelect = (chatId: string | null) => {
    console.log("Chat selecionado:", chatId);
  };

  return (
    <main className="flex justify-start items-center h-screen w-full bg-gray-100">
      <SideBar
        chats={chats}
        onSelectChat={handleChatSelect}
        onLoadMore={handleLoadMoreChats}
      />
      <Conversation />
    </main>
  );
}
