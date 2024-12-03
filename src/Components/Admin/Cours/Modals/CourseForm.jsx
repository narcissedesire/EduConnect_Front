import React, { useEffect, useState } from "react";

export default function CourseForm({ setShowForm, categories, fetchCours }) {
  const userConnect = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    categorieId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userConnect || !userConnect.id) {
      console.error("Utilisateur non connecté. Veuillez vous connecter.");
      return;
    }

    try {
      const response = await fetch(`/api/cours/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id_utilisateur: userConnect.id }),
      });
      if (!response.ok) {
        console.error(response.message);
        return;
      }
      fetchCours();
      console.log("Création réussie");
      setShowForm(false);
    } catch (error) {
      console.log("Erreur lors de la création :", error);
    }
  };

  console.log("Catégories chargées :", categories);

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => setShowForm(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Créer un cours</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Catégorie</label>
          <select
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.length > 0 ? (
              categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.label}
                </option>
              ))
            ) : (
              <option disabled>Pas de catégorie disponible</option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  );
}
