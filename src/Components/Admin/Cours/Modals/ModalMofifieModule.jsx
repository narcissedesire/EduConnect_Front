import React from "react";

export default function ModalMofifieModule({
  setIsModalOpen,
  module,
  fetchModule,
}) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={setIsModalOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={handleModalClick}
      >
        <h3 className="text-2xl font-semibold">Modifier le module</h3>
        <div>
          <label className="block mt-2 mb-2">Nom du module</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            defaultValue={module.nom}
          />
          <label className="block mt-2 mb-2">Description du module</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg"
            defaultValue={module.description}
          ></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
          >
            Fermer
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
}
