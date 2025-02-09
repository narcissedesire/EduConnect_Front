import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PdfFiles from "../../DetailCours/PdfFiles";
import Videos from "../../../Admin/Videos";
import ModalMofifieModule from "./Modals/ModalMofifieModule";
import ModalAddFile from "./Modals/modalAddFile";
import ModaleAddVideo from "./Modals/modaleAddVideo";

export default function DetailModule() {
  const [module, setModule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState("");
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

  const handleRefresh = () => {
    fetchModule();
    setIsModalOpen("");
  };

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Pas de module
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4] min-height">
      <div className="border-b mb-4">
        <h1 className="text-3xl font-bold mb-3">{module.nom}</h1>
        <p className="text-gray-700 mb-3">{module.description}</p>

        {/* Boutons pour ajouter vidéo, fichier et modifier module */}
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen("addVideo")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ajouter une vidéo
          </button>
          <button
            onClick={() => setIsModalOpen("addFile")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Ajouter un fichier
          </button>
          <button
            onClick={() => setIsModalOpen("modifier")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Modifier le module
          </button>
        </div>
      </div>

      {/* Affichage des fichiers PDF et des vidéos */}
      <PdfFiles fichiers={module.fichiers} />
      <Videos videos={module.videos} />

      {isModalOpen === "modifier" && (
        <ModalMofifieModule
          module={module}
          setIsModalOpen={setIsModalOpen}
          fetchModule={fetchModule}
        />
      )}
      {isModalOpen === "addFile" && (
        <ModalAddFile
          idModule={id}
          setIsModalOpen={setIsModalOpen}
          fetchModule={fetchModule}
        />
      )}
      {isModalOpen === "addVideo" && (
        <ModaleAddVideo
          idModule={id}
          setIsModalOpen={setIsModalOpen}
          fetchModule={fetchModule}
        />
      )}
    </div>
  );
}
