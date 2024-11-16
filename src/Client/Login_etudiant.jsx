import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom"; // Assurez-vous que react-router-dom est installé pour le routage

export default function Login_etudiant() {
  // Définir les états pour l'email, le mot de passe et le message d'erreur
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
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className='bg-[url("/images/fondLogin1.png")] bg-no-repeat bg-cover min-w-[300px] mx-auto w-4/6 h-[500px] shadow-xl flex items-center md:items-end md:justify-start justify-center p-5'>
        <form
          className="flex flex-col items-center gap-5 p3 md:p-5"
          onSubmit={handleSubmit}
        >
          <span>
            <img src="/images/chapeau.png" className="w-[100px]" alt="" />
          </span>
          <span className="text-[28px] font-semibold text-center">
            Réjoindre votre classe
          </span>
          <div className="flex flex-col items-center gap-3">
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <div className="flex items-center gap-5 border px-5 py-3 text-[18px] rounded">
              <span className="text-[20px] ">
                <GoPerson />
              </span>
              <span>
                <input
                  type="email"
                  className="outline-none bg-transparent w-full"
                  placeholder="Votre email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </span>
            </div>
            <div className="flex items-center gap-5 border px-5 py-3 text-[18px] rounded">
              <span className="text-[20px] ">
                <RiLockPasswordLine />
              </span>
              <span>
                <input
                  type="password"
                  className="outline-none bg-transparent w-full"
                  placeholder="Votre mot de passe..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </span>
            </div>
            <button type="submit" className="w-full py-2 bg-primary text-white">
              SE CONNECTER
            </button>

            {/* Ajout des liens d'inscription et de mot de passe oublié */}
            <div className="flex flex-col items-center gap-2 mt-4 text-sm">
              <Link
                to="/forgot-password"
                className="text-indigo-500 hover:text-indigo-700 transition duration-200"
              >
                Mot de passe oublié ?
              </Link>
              <Link
                to="/contact"
                className="text-gray-500 hover:text-indigo-600 font-medium transition duration-200"
              >
                Pour s'inscrire contactez l'administration
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
