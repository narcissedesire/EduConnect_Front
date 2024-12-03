import React from "react";
import { Port } from "../../Port";

export default function PdfFiles({ fichiers }) {
  return (
    <div className="mt-7">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Fichiers PDF
      </h2>
      {fichiers?.length > 0 ? (
        <ul className="list-disc ml-5">
          {fichiers.map((fichier) => (
            <li key={fichier.id} className="mb-2">
              <a
                href={`${Port}/${fichier.liens}`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {fichier.nom} {/* Affiche le nom du fichier */}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun fichier disponible pour ce module.</p>
      )}
    </div>
  );
}
