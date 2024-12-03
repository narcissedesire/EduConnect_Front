import React from "react";

export default function ModalInscription({
  id_cours,
  setIsInscrire,
  id_user,
  nom_cours,
}) {
  const inscrire = async () => {
    try {
      const response = await fetch(`/api/etudiant/inscrireCours`, {
        method: "post",
        body: JSON.stringify({ id_cours, id_user }),
      });
      if (response.status === 200) {
        console.log("Vous etes dejat connecter");
        setIsInscrire(false);
        return;
      }
      console.log("Inscription avec succès");
      setIsInscrire(false);
    } catch (error) {
      console.error("Erreur lors de l'inscription au cours :", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setIsInscrire(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          Inscription au cours {nom_cours}{" "}
        </h2>
        <p>Confirmer votre inscription</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => setIsInscrire(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={inscrire}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}
