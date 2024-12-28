import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Header } from "../Header";

export const SideBar = ({
  chats,
  onSelectChat,
  onToggleCollapse,
}: {
  chats: { id: string; name: string }[];
  onSelectChat: (chatId: string | null) => void;
  onToggleCollapse: () => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse(); 
  };

  const handleChatSelect = (chatId: string | null) => {
    onSelectChat(chatId);
    handleToggleMenu();
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
                key={chat.id}
                className="py-2 px-4 cursor-pointer hover:bg-gray-700 rounded-md"
                onClick={() => handleChatSelect(chat.name)}
              >
                {chat.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};
