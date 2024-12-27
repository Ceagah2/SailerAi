import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Header } from "../Header";
import { NewChat } from "../NewChat";

export const SideBar = ({
  chats,
  onSelectChat,
  onLoadMore,
}: {
  chats: string[];
  onSelectChat: (chatId: string | null) => void;
  onLoadMore: () => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleChatSelect = (chatId: string | null) => {
    onSelectChat(chatId);
    if (window.innerWidth < 768) setIsCollapsed(true);
  };

 const handleScroll = (e: React.UIEvent<HTMLElement>) => {
   const targetElement = e.target as HTMLElement;
   const bottom =
     targetElement.scrollHeight ===
     targetElement.scrollTop + targetElement.clientHeight;
   if (bottom) {
      setIsLoading(true)
      onLoadMore();
      setIsLoading(false)
   }
 };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 transition-all duration-500 ease-in-out z-50 ${
        isCollapsed ? "w-16 translate-x-0" : "w-full sm:w-64 translate-x-0"
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
        <div className="flex flex-col items-start p-4 transition-all duration-300 ease-in-out">
          <Header />
          <NewChat onClick={() => handleChatSelect(null)} />

          <ul
            className="mt-4 text-white w-full overflow-y-auto max-h-96"
            onScroll={handleScroll}
          >
            {chats.map((chatId, index) => (
              <li
                key={index}
                className="py-2 px-4 cursor-pointer hover:bg-gray-700 rounded-md"
                onClick={() => handleChatSelect(chatId)}
              >
                {`Chat ${chatId}`}
              </li>
            ))}
          </ul>
          {isLoading && (
            <div className="text-center text-white">Carregando...</div>
          )}
        </div>
      )}
    </aside>
  );
};
