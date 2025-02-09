import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      {/* Logo */}
      <img
        src="/images/logo.png" // Remplacez par le chemin de votre logo
        alt="Logo"
        className="w-20 h-20 mb-4"
      />

      {/* Titre principal */}
      <h1 className="text-9xl font-extrabold text-blue-500">404</h1>

      {/* Sous-titre */}
      <h2 className="text-2xl md:text-4xl text-gray-300 mt-4 font-semibold">
        Oups! Page introuvable.
      </h2>

      {/* Message descriptif */}
      <p className="text-lg text-gray-400 mt-2">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      {/* Bouton pour retourner à l'accueil */}
      <Link
        to="/"
        className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-300"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
