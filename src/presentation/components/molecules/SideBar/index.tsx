import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserStore } from "../../../../data/context/user.context";
import { createChat } from "../../../../data/services/api";
import { Header, UserData } from "../../atoms";




export const SideBar = ({
  chats,
  onSelectChat,
  onToggleCollapse,
  setChats, 
}: {
  chats: { chat_id: string; participants: string[] }[];
  onSelectChat: (chatId: string | null, participants?: string[]) => void;
  onToggleCollapse: () => void;
  setChats: (chats: { chat_id: string; participants: string[] }[]) => void; 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { name } = useUserStore();

  const handleToggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse();
  };

  const handleChatSelect = (chatId: string | null, participants?: string[]) => {
    onSelectChat(chatId, participants);
    handleToggleMenu();
  };

  const handleCreateChat = async () => {
    // if (!participantsInput.trim()) return;

    // const participants = participantsInput
    //   .split(",")
    //   .map((participant) => participant.trim());

    try {
      const newChat = await createChat([name ?? "user"]);

      setChats([...chats, newChat]);
      onSelectChat(newChat.chat_id);
    } catch (error) {
      console.error("Erro ao criar chat:", error);
    }
  };

  const truncateName = (userNames: string[]) => {
    let truncatedName = userNames
      .map((name) => {
        return name.length > 8 ? name.substring(0, 8) + "..." : name;
      })
      .join(", "); 

    if (truncatedName.length > 15) {
      truncatedName = truncatedName.substring(0, 15) + "..."; 
    }

    return truncatedName;
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 transition-all duration-500 ease-in-out z-50 ${
        isCollapsed ? "w-16" : "w-full sm:w-64"
      }`}
    >
      <div className="flex items-center justify-end h-16 bg-gray-900 pr-4">
        <GiHamburgerMenu
          color="white"
          size={30}
          className="cursor-pointer"
          onClick={handleToggleMenu}
        />
      </div>

      {!isCollapsed && (
        <div className="flex flex-col items-start p-4">
          <Header />
          <ul className="mt-4 text-white w-full">
            {chats.map((chat) => (
              <li
                key={chat.chat_id}
                className="py-2 px-4 cursor-pointer hover:bg-gray-700 rounded-md"
                onClick={() =>
                  handleChatSelect(chat.chat_id, chat.participants)
                }
              >
                {truncateName(chat.participants)}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleCreateChat()}
            className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 mt-4"
          >
            Criar Novo Chat
          </button>
        </div>
      )}

      <UserData isCollapsed={isCollapsed} />
    </aside>
  );
};
