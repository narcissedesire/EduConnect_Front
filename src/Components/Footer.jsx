import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto py-10 px-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-0">
          {/* Logo */}
          <div className="mb-6 md:mb-0 flex justify-center sm:justify-start">
            <img src="/images/logo.png" alt="Logo" className="h-52" />
          </div>

          {/* Liens rapides */}
          <div className="mb-6 md:mb-0 text-center sm:text-left flex-grow">
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-500">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Informations de contact */}
          <div className="mb-6 md:mb-0 text-center sm:text-left flex-grow">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p>Adresse: Antanifotsy V Sud, Madagascar</p>
            <p>
              Email:{" "}
              <a
                href="mailto:narcissedesire4@gmail.com"
                className="hover:text-yellow-500"
              >
                narcissedesire4@gmail.com
              </a>
            </p>
            <p>
              Téléphone:{" "}
              <a href="tel:+0344983494" className="hover:text-yellow-500">
                0344983494
              </a>
            </p>
          </div>

          {/* Réseaux sociaux */}
          <div className="text-center flex-grow sm:text-start">
            <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
            <div className="flex justify-center space-x-4 sm:justify-start">
              <a href="#" className="hover:text-yellow-500">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-yellow-500">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-yellow-500">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-yellow-500">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm">
            © 2024 Narcisse Désiré. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
