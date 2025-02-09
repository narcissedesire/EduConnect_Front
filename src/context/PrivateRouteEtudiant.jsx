// src/components/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

// Composant pour protéger les routes privées
const PrivateRouteEtudiant = () => {
  const { etudiantConnecter } = useAuth();

  return etudiantConnecter ? <Outlet /> : <Navigate to="/login-etudiant" />;
};

export default PrivateRouteEtudiant;
