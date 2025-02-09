import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [etudiantConnecter, setEtudiantConnecter] = useState(false);
  const [enseignantConnecter, setEnseignantConnecter] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user);

        if (decodedToken.user.role === "etudiant") {
          setEtudiantConnecter(true);
        } else if (decodedToken.user.role === "enseignant") {
          setEnseignantConnecter(true);
        }
      } catch (error) {
        console.error("Erreur de décodage du token :", error);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    window.location.href = "/login-etudiant";
  };

  const contextValue = {
    user,
    loading,
    logout,
    etudiantConnecter,
    enseignantConnecter,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
}
