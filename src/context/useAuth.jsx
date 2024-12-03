// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Crée un hook personnalisé pour utiliser l'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};
