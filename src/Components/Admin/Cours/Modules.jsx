import React, { useState, useEffect } from "react";
import ModalAjoutModule from "./Modals/ModalAjoutModule";
import { Link } from "react-router-dom";

export default function Modules({ lesson }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modules, setModules] = useState([]);

  const refreshModules = async () => {
    try {
      const response = await fetch(`/api/module/cours/${lesson.id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des modules");
      }
      const data = await response.json();
      setModules(data.modules);
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  useEffect(() => {
    refreshModules();
  }, []);

  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Modules du cours
      </h2>
      {/* Bouton pour ouvrir le modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Ajouter un module
      </button>

      {/* Affichage des modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.length > 0 ? (
          modules.map((module, index) => (
            <Link
              to={`/admin/cours/module/${module.id}`}
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                {module.nom}
              </h3>
              <p className="text-gray-600">{module.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">Aucun module disponible.</p>
        )}
      </div>

      {isModalOpen && (
        <ModalAjoutModule
          setIsModalOpen={setIsModalOpen}
          id_cours={lesson.id}
          onAddModule={refreshModules}
        />
      )}
    </div>
  );
}
