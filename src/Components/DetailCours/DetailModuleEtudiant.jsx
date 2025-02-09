import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PdfFiles from "./PdfFiles";
import Videos from "./Videos";

export default function DetailModuleEtudiant() {
  const [module, setModule] = useState(null);
  const { id } = useParams();

  const fetchModule = async () => {
    try {
      const response = await fetch(`/api/module/detailModule/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await response.json();
      setModule(data.module);
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [id]);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Pas de module...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4] min-height">
      <div className="border-b mb-4">
        <h1 className="text-3xl font-bold mb-3">{module.nom}</h1>
        <p className="text-gray-700 mb-3">{module.description}</p>
      </div>

      {/* Affichage des fichiers PDF et des vidéos */}
      <PdfFiles fichiers={module.fichiers} />
      <Videos videos={module.videos} />
    </div>
  );
}
