import React from "react";

export default function PdfFiles({ lesson }) {
  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Fichiers PDF
      </h2>
      {lesson.modules.length > 0 ? (
        lesson.modules.map((module, index) => (
          <div key={index}>
            <h2>Module : {module.nom}</h2>
            {module.fichiers.length > 0 ? (
              <ul>
                {module.fichiers.map((fichier, i) => (
                  <li key={i}>
                    <a
                      href={fichier.contenu}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger {fichier.nom.split("/").pop()}.pdf
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun fichier disponible pour ce module.</p>
            )}
          </div>
        ))
      ) : (
        <p>Aucun module disponible.</p>
      )}
    </div>
  );
}

{
  /* <a
  href={pdf}
  className="text-blue-600 hover:underline"
  target="_blank"
  rel="noopener noreferrer"
>
  Télécharger {pdf.split("/").pop()}
</a>; */
}
