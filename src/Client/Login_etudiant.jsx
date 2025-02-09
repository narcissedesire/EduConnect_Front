import React, { useContext, useState } from "react";
import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { checkTokenExpiration } from "../Components/TokenExpire";
import { AuthContext } from "../context/AuthContext";

export default function Login_etudiant() {
  const [email, setEmail] = useState("");
  const [mot_passe, setMot_passe] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setLoading, loading } = useContext(AuthContext);

  if (user) {
    navigate("/");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !mot_passe) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (user) {
      console.log("Vous etes dejat connecter");
      navigate("/");
    }
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, mot_passe }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Erreur inconnue lors de la connexion.");
        return;
      }

      const data = await response.json();

      if (data.status === "success") {
        sessionStorage.setItem("token", data.token);
        navigate("/");
        setLoading(false);
      } else {
        setError(data.message || "Erreur inconnue.");
      }
    } catch (e) {
      setError("Erreur réseau ou problème inattendu.");
      console.error("Erreur lors de la connexion :", e);
    }
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
          <span>{error}</span>
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
                  value={mot_passe}
                  onChange={(e) => setMot_passe(e.target.value)}
                  required
                />
              </span>
            </div>
            <button type="submit" className="w-full py-2 bg-primary text-white">
              SE CONNECTER
            </button>

            <div className="flex flex-col items-center gap-2 mt-4 text-sm">
              <Link
                to="/forgot-mot_passe"
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
