import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    console.log("Connexion en cours avec :", { email, password });
    // Simuler l'appel API de connexion ici
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-md mx-4">
        {/* Image de fond */}
        <div className="absolute inset-0 bg-[url('/images/imgLogin.png')] bg-cover bg-center opacity-60"></div>
        <div className="relative bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Connectez-vous
            </h2>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <GoPerson className="text-gray-500 text-xl mr-3" />
              <input
                type="email"
                className="outline-none bg-transparent w-full text-lg"
                placeholder="Votre email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <RiLockPasswordLine className="text-gray-500 text-xl mr-3" />
              <input
                type="password"
                className="outline-none bg-transparent w-full text-lg"
                placeholder="Votre mot de passe..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              SE CONNECTER
            </button>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 transition duration-200 text-center"
            >
              Mot de passe oublié ?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
