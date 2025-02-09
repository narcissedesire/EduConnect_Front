import React, { useState, useEffect } from "react";

export default function ModalMofifieModule({
  setIsModalOpen,
  module,
  fetchModule,
}) {
  const [newModule, setNewModule] = useState({
    nom: module.nom || "",
    description: module.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule({ ...newModule, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/module/update/${module.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModule),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la modification du module"
        );
      }

      const data = await response.json();
      if (data.status === "success") {
        fetchModule();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  useEffect(() => {
    setNewModule({
      nom: module.nom || "",
      description: module.description || "",
    });
  }, [module]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => setIsModalOpen(false)}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h3 className="text-2xl font-semibold">Modifier le module</h3>
        <div>
          <label className="block mt-2 mb-2">Nom du module</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            name="nom"
            value={newModule.nom}
            onChange={handleInputChange}
            required
          />
          <label className="block mt-2 mb-2">Description du module</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg"
            name="description"
            value={newModule.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
          >
            Fermer
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}
