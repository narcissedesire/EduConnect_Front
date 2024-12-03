import React, { useState } from "react";

export default function ModalAjoutModule({
  setIsModalOpen,
  id_cours,
  onAddModule,
}) {
  const [newModule, setNewModule] = useState({
    nom: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule({ ...newModule, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/module/create`, {
        method: "POST",
        body: JSON.stringify({ ...newModule, id_cours }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de l'ajout du module"
        );
      }

      const data = await response.json();
      setNewModule({ nom: "", description: "" });

      onAddModule();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Ajouter un module
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Nom du module</label>
            <input
              type="text"
              name="nom"
              value={newModule.nom}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={newModule.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition duration-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
