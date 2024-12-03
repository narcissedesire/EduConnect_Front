import React, { useState, useEffect } from "react";

export default function EditForm({
  setShowForm,
  fetchCours,
  categories,
  course,
}) {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    categorieId: "",
  });

  // Charger les données du cours sélectionné
  useEffect(() => {
    if (course) {
      setFormData({
        titre: course.titre || "",
        description: course.description || "",
        categorieId: course.categorie?.id || "",
      });
    }
  }, [course]);

  // Gérer les changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Soumettre les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cours/update/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // Ajout des en-têtes
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      setShowForm(false);
      console.log("Modification réussie");
      fetchCours(); // Actualiser les cours après modification
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => setShowForm(false)} // Fermer la modale en cliquant en dehors
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Empêcher la fermeture en cliquant dans le formulaire
      >
        <h2 className="text-2xl font-bold mb-4">Modifier un cours</h2>

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
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}
