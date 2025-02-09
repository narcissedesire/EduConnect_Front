import React, { useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ logo, toggleSidebar, isSidebarOpen }) {
  const { user } = useContext(AuthContext);
  return (
    <header
      className={`bg-gray-800 text-white shadow-md h-16 w-full p-4 flex items-center justify-between fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out ${
        isSidebarOpen
          ? "sm:w-[calc(100%-16rem)] sm:ml-64 w-full"
          : "sm:w-[calc(100%-4.5rem)] sm:ml-20 w-full"
      }`}
    >
      <div className="flex items-center gap-3 ml-2 ">
        <button
          onClick={toggleSidebar}
          className=" p-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none transition-all duration-200"
        >
          <FaBars />
        </button>
        <div
          className={`absolute right-2 w-32 h-14 bg-gray-800 flex items-center justify-end ${
            !isSidebarOpen && "hidden"
          } sm:hidden`}
        >
          <button
            onClick={toggleSidebar}
            className={`p-2 text-white  rounded-md hover:bg-gray-700 focus:outline-none transition-all duration-200 float-left`}
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo et titre */}
        <div className="sm:flex hidden items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          <h1 className="text-2xl font-semibold text-white">EduConnect</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-300">
          <p>{user && user.nom}</p>
          <p className="text-xs text-gray-400">
            {user && user.role === "enseignant" ? "Enseignant" : "Étudiant"}
          </p>
        </div>
        <button className=" flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none transition-all duration-200">
          <img
            src={
              user
                ? user.photo
                : ""
                ? Port + "/photoUsers/" + user.photo.nom
                : "/images/logo.png"
            }
            alt="User Avatar"
            className="h-12 w-12 rounded-full border-2 border-blue-500"
          />
        </button>
      </div>
    </header>
  );
}
