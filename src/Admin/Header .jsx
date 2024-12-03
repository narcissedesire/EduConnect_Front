import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header({
  logo,
  user,
  role,
  toggleSidebar,
  isSidebarOpen,
}) {
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
          <p>{user}</p>
          <p className="text-xs text-gray-400">
            {role === "teacher" ? "Enseignant" : "Étudiant"}
          </p>
        </div>
        <button className=" flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none transition-all duration-200">
          <img
            src="/images/logo.png"
            className="h-[45px] w-[45px] rounded-full"
            alt=""
          />
        </button>
      </div>
    </header>
  );
}
