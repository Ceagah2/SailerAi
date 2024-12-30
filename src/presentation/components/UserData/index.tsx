import { useState } from "react";
import { useUserStore } from "../../../data/context/user.context";

const UserStatusCard = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { name, photo, logout } = useUserStore();
  const [status, setStatus] = useState("online");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`p-2 bg-white shadow-md rounded-md absolute bottom-10 w-60 mx-2 ${
        isCollapsed ? "w-16" : "w-full"
      } flex items-center transition-all duration-300 ease-in-out`}
    >
      <img
        src={photo || "https://via.placeholder.com/150"}
        alt="User"
        className={`rounded-full ${
          isCollapsed ? "w-12 h-12" : "w-16 h-16"
        } mr-2`}
      />

      {!isCollapsed && (
        <div className="flex flex-col">
          <h1 className="text-sm font-bold">{name || "Usuário"}</h1>
          <span
            className={`text-xs ${
              status === "online" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status} {status === "online" ? "🟢" : "🔴"}
          </span>
        </div>
      )}

      {!isCollapsed && (
        <button
          onClick={toggleDropdown}
          className="ml-auto text-gray-500 hover:text-gray-700"
        >
          Alterar
        </button>
      )}

      {isDropdownOpen && !isCollapsed && (
        <div className="absolute mt-2 bg-gray-100 rounded shadow-md right-0">
          <button
            onClick={() => handleStatusChange("online")}
            className={`block w-full text-left px-4 py-2 text-sm ${
              status === "online" ? "bg-green-100" : "hover:bg-gray-200"
            }`}
          >
            Online 🟢
          </button>
          <button
            onClick={() => handleStatusChange("offline")}
            className={`block w-full text-left px-4 py-2 text-sm ${
              status === "offline" ? "bg-red-100" : "hover:bg-gray-200"
            }`}
          >
            Offline 🔴
          </button>
          <hr className="border-gray-300 my-1" />
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
          >
            Logout 🚪
          </button>
        </div>
      )}
    </div>
  );
};

export default UserStatusCard;
