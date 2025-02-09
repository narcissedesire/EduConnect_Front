import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Port } from "../../../../Port";

export default function CourseForm({ setShowForm, categories, fetchCours }) {
  const { user } = useContext(AuthContext);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("categorieId", categorieId);
    formData.append("file", photo);
    formData.append("id_utilisateur", user.id);

    if (!user || !user.id) {
      console.error("Utilisateur non connecté. Veuillez vous connecter.");
      return;
    }

    try {
      const response = await fetch(`${Port}/createPhoto`, {
        method: "POST",
        body: formData,
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
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Catégorie</label>
          <select
            name="categorieId"
            value={categorieId}
            onChange={(e) => setCategorieId(e.target.value)}
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
        <div className="mt-4">
          <label className="block mb-2">Choisir un fichier</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
