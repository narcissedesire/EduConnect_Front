import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LinkSidebarProfil } from "../Data";
import { FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-200 flex flex-col justify-between py-6 shadow-md border-r border-gray-700 fixed left-0 top-0">
      {/* Logo et Profil de l'utilisateur */}
      <div className="flex flex-col items-center space-y-4">
        {/* Logo de l'application */}
        <div className="text-3xl font-bold text-[#1E90FF] transition duration-300 hover:scale-105">
          MyApp
        </div>

        {/* Photo et informations de l'utilisateur */}
        <div className="flex flex-col items-center mt-6">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-800 mb-3 shadow-md transition-transform duration-300 hover:scale-105"
          />
          <h3 className="text-xl font-semibold">Iqbal Ramadhan</h3>
          <p className="text-sm text-gray-400">@iqbalabc</p>
        </div>
      </div>

      {/* Menu de navigation */}
      <nav className="flex flex-col mt-8 space-y-2">
        {LinkSidebarProfil.map((link, index) => (
          <SidebarItem
            icon={link.icon}
            label={link.label}
            href={link.href}
            key={index}
          />
        ))}
      </nav>

      {/* Bouton de déconnexion */}
      <div className="flex items-center justify-center mt-6">
        <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-red-500">
          <FaSignOutAlt className="mr-2" /> Déconnexion
        </button>
      </div>
    </div>
  );
}

// Composant de chaque élément du menu pour une meilleure réutilisabilité
function SidebarItem({ icon, label, href }) {
  const location = useLocation();
  return (
    <Link
      to={href}
      className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition duration-200 ${
        location.pathname === href ? "bg-gray-700 text-white" : ""
      }`}
    >
      <div className={`text-xl `}>{icon}</div>
      <span className={`text-sm font-medium`}>{label}</span>
    </Link>
  );
}
