import React from "react";

export default function PdfFiles({ lesson }) {
  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Fichiers PDF
      </h2>
      {lesson.pdfFiles && lesson.pdfFiles.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {lesson.pdfFiles.map((pdf, index) => (
            <li key={index}>
              <a
                href={pdf}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Télécharger {pdf.split("/").pop()}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Aucun fichier PDF disponible.</p>
      )}
    </div>
  );
}
