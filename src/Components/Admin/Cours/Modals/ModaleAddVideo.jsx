import React, { useState } from "react";
import { Port } from "../../../../Port";

export default function ModaleAddVideo({
  setIsModalOpen,
  idModule,
  fetchModule,
}) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("nom", nom);
    formDataToSend.append("description", description);
    formDataToSend.append("file", file);
    formDataToSend.append("id_module", idModule);

    try {
      const response = await fetch(`${Port}/createVideo`, {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      // const data = await response.json();
      setNom("");
      setDescription("");
      setFile(null);
      setIsModalOpen(false);
      fetchModule();
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={handleModalClick}
      >
        <h3 className="text-2xl font-semibold mb-4">Ajouter une vidéo</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2">Nom du fichier</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
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
          <div className="mt-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg mr-2 hover:bg-gray-400 transition duration-300"
            >
              Fermer
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
