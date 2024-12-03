import React, { useEffect, useState } from "react";
import { FaClock, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import fond_hero from "/images/fond_hero.jpg";
import ModalInscription from "./ModalInscription";
import { jwtDecode } from "jwt-decode";

export default function CourseInfo({
  lesson,
  progress,
  completedModules,
  totalModules,
  isInscrit,
}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  const inscriptions = lesson?.inscriptions;

  const nombreEtudiants = inscriptions
    ? inscriptions.filter((inscription) => inscription?.etudiant).length
    : 0;

  const totalDuration = lesson?.modules?.reduce((total, module) => {
    const dure = Number(module.dure);
    return total + (isNaN(dure) ? 0 : dure);
  }, 0);

  const [isInscrire, setIsInscrire] = useState(false);

  const [idEtudiant, setIdEtudiant] = useState("");
  return (
    <div className="container mx-auto flex flex-col md:flex-row px-4 sm:px-6 lg:px-8">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <img
          className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
          src={fond_hero}
          alt="Image de couverture du cours"
        />
      </div>

      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {lesson?.titre || "Titre indisponible"}
        </h1>

        <div className="mb-4 text-gray-700">
          <p className="font-semibold">
            Enseignant : {lesson.enseignant.utilisateur.nom}
          </p>
          <p className="font-semibold">
            Étudiants inscrits : {nombreEtudiants}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <span className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">
            <FaBookOpen className="mr-1" /> {lesson.niveau?.label}
          </span>
          <span className="flex items-center bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">
            <FaClock className="mr-1" /> {totalDuration}
          </span>
          <span
            className={`flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              lesson.isGratuit
                ? "bg-blue-600 text-white"
                : "bg-red-600 text-white"
            } shadow`}
          >
            {lesson.isGratuit ? "Gratuit" : "Payant"}
          </span>
          {lesson.isCertifier && (
            <span className="flex items-center bg-yellow-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">
              <FaCheckCircle className="mr-1" /> Certifié
            </span>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Progrès du cours</h2>
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                {progress}%
              </div>
              <div className="text-xs font-semibold text-teal-600">
                {completedModules} / {totalModules} Modules
              </div>
            </div>
            <div className="flex items-center h-2 bg-gray-200 rounded">
              <div
                className="bg-teal-600 h-2 rounded"
                style={{ width: `${progress.toFixed(2)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700 mb-6">{lesson.description}</p>
        {user?.role === "etudiant" && (
          <div className="mt-6">
            {isInscrit ? (
              <span>Vous etes dejat inscrit a ce cours</span>
            ) : (
              <>
                <button
                  className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                  onClick={() => setIsInscrire(true)}
                >
                  S'inscrire
                </button>
                <span className="block mt-2">
                  Inscrivez vous pour acceder a tous les cours
                </span>
              </>
            )}
          </div>
        )}
      </div>
      {isInscrire && (
        <ModalInscription
          setIsInscrire={setIsInscrire}
          id_cours={lesson.id}
          id_user={user.id}
          nom_cours={lesson?.titre}
        />
      )}
    </div>
  );
}
