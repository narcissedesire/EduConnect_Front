import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const SidebarItem = ({ icon, label, link, isSidebarOpen, logout }) => {
  return (
    <a
      href={link}
      onClick={logout}
      className={`flex items-center space-x-4  rounded-lg transition-all duration-200 ${
        isSidebarOpen ? "hover:bg-blue-600 p-3" : "px-3 py-1"
      } hover:scale-105 cursor-pointer group`}
    >
      <div
        className={`text-xl text-gray-300 group-hover:text-white ${
          !isSidebarOpen
            ? "flex items-center justify-center hover:bg-blue-600 p-3 rounded-full"
            : ""
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-lg font-semibold text-gray-200 group-hover:text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        {label}
      </span>
    </a>
  );
};
