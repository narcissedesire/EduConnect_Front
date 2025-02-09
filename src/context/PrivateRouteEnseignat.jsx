// src/components/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

// Composant pour protéger les routes privées
const PrivateRouteEnseignat = () => {
  const { enseignatConnecter } = useAuth();

  return enseignatConnecter ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteEnseignat;
