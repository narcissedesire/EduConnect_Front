import React, { useContext, useState } from "react";
import { studentMenu, teacherMenu } from "../Data";
import { SidebarItem } from "./SidebarItem";
import { AuthContext } from "../../context/AuthContext";
import { Port } from "../../Port";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SidebarEnseignant({ isSidebarOpen }) {
  const { user, logout } = useContext(AuthContext);

  const menuItems = user.role === "enseignant" ? teacherMenu : studentMenu;

  return (
    <div
      className={`bg-gray-800 text-white h-screen flex flex-col shadow-lg transition-all duration-300 fixed top-0 left-0 z-50 ${
        isSidebarOpen ? "w-64" : "w-20"
      } ${isSidebarOpen ? "block" : "hidden"} sm:flex overflow-hidden`}
    >
      <div className="flex items-center h-16 p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-4">
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
          <div className="text-white">
            <p className="font-semibold">{user ? user.nom : "Pas connecter"}</p>
            <p className="text-sm text-gray-400">
              {user
                ? user.role === "enseignant"
                  ? "Enseignant"
                  : "Étudiant"
                : "Pas connecter"}
            </p>
          </div>
        </div>
      </div>

      <nav
        className={`flex-1 overflow-y-auto py-4 no-scrollbar ${
          isSidebarOpen ? "px-6" : "gap-0"
        }`}
      >
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            link={item.link}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
        <SidebarItem
          icon=<FaSignOutAlt />
          label="Déconnexion"
          logout={logout}
        />
      </nav>
    </div>
  );
}
