import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { LienNav } from "./Data";
import logo from "/images/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Référence pour la fenêtre modale

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Nouvelle fonction pour fermer le menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Fermer le menu si un clic est effectué en dehors de la fenêtre modale
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  // Scroll to top when the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Ajouter l'écouteur d'événements lors du montage
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyer l'écouteur d'événements lors du démontage
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50">
      <div className="container mx-auto px-5 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-14" />
          {/* <span className="ml-2 text-xl font-bold">Votre Plateforme</span> */}
        </div>

        {/* Bouton pour mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Liens de navigation */}
        <div className="md:flex md:items-center md:space-x-4 hidden transition duration-300 ease-in-out">
          {LienNav.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                location.pathname === item.href ? "bg-gray-700 text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="block px-3 py-2 rounded bg-primary hover:bg-primary/75 text-secondary"
          >
            Connexion
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef} // Référence pour le menu
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition duration-300 ease-in-out bg-gray-800 fixed w-full`}
      >
        {LienNav.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="block px-4 py-2 hover:bg-gray-700 text-center"
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/login"
          className="block px-4 py-2 bg-primary hover:bg-primary/75 text-secondary text-center"
          onClick={closeMenu}
        >
          Connexion
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
