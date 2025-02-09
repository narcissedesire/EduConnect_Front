import React from "react";

export default function ModalSuppression({
  id_cours,
  setShowDelete,
  fetchCours,
}) {
  const deleteCours = async () => {
    try {
      const response = await fetch(`/api/cours/delete/${id_cours}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du cours");
      }
      console.log("Cours supprimé avec succès");
      setShowDelete(false);
      fetchCours();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShowDelete(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer ce cours ?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => setShowDelete(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={deleteCours}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
