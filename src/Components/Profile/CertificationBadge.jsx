import React, { useState } from "react";
import { badges, certifications } from "../Data";

export default function CertificationBadge() {
  const [downloadMessage, setDownloadMessage] = useState("");

  const handleDownload = () => {
    setDownloadMessage("Téléchargement en cours...");
    setTimeout(() => {
      setDownloadMessage("Téléchargement terminé !");
      setTimeout(() => setDownloadMessage(""), 2000); // Clear message after 2 seconds
    }, 1000); // Simulate download time
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md ml-72">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Certifications et Badges
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Badges</h3>
        <div className="flex space-x-4 mt-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex items-center ${badge.color} text-white rounded-lg p-4 transition transform hover:scale-105 shadow-lg`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="ml-2 font-bold">{badge.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Certifications</h3>
        <ul className="mt-2">
          {certifications.map((cert) => (
            <li
              key={cert.id}
              className="flex justify-between items-center bg-white border border-gray-300 rounded-lg p-4 mb-2 shadow hover:bg-gray-50 transition"
            >
              <span>{cert.title}</span>
              <a
                href={cert.fileUrl}
                onClick={handleDownload}
                className="text-blue-500 hover:underline transition"
              >
                Télécharger
              </a>
            </li>
          ))}
        </ul>
        {downloadMessage && (
          <p className="mt-2 text-center text-green-600 font-semibold">
            {downloadMessage}
          </p>
        )}
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold">Progression Générale</h3>
        <p className="text-2xl font-bold">
          {badges.length + certifications.length} Réalisations
        </p>
      </div>
    </div>
  );
}
