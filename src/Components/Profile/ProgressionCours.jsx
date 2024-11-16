import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

export default function ProgressionCours() {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Mathématiques",
      progress: 75,
      completedModules: 3,
      totalModules: 4,
      modules: ["Algèbre", "Géométrie", "Statistiques", "Calcul"],
    },
    {
      id: 2,
      title: "Physique",
      progress: 50,
      completedModules: 2,
      totalModules: 4,
      modules: ["Mécanique", "Optique", "Thermodynamique", "Électricité"],
    },
    {
      id: 3,
      title: "Informatique",
      progress: 90,
      completedModules: 9,
      totalModules: 10,
      modules: ["Programmation", "Bases de données", "Réseaux", "Sécurité"],
    },
  ];

  const toggleCourseDetails = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="bg-gray-800 text-gray-200 p-8 rounded-lg w-full shadow-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-blue-400">
        Progression des Cours
      </h2>

      {courses.map((course) => (
        <div
          key={course.id}
          className="mb-6 bg-gray-900 p-4 rounded-lg shadow-md"
        >
          {/* Titre du cours, progression et détails */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-lg text-blue-400">
                {course.title}
              </h3>
              <p className="text-gray-400 text-sm">
                Modules complétés : {course.completedModules} /{" "}
                {course.totalModules}
              </p>
            </div>
            <span className="text-sm text-gray-300 font-semibold">
              {course.progress}%
            </span>
          </div>

          {/* Barre de progression */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-width duration-500 ease-in-out"
              style={{ width: `${course.progress}%` }}
            />
          </div>

          {/* Bouton pour afficher les détails */}
          <button
            onClick={() => toggleCourseDetails(course.id)}
            className="flex items-center text-blue-500 text-sm hover:underline focus:outline-none transition-colors duration-200"
          >
            {expandedCourse === course.id ? (
              <>
                Masquer les détails <FaChevronUp className="ml-1" />
              </>
            ) : (
              <>
                Voir les détails <FaChevronDown className="ml-1" />
              </>
            )}
          </button>

          {/* Liste des modules */}
          {expandedCourse === course.id && (
            <ul className="mt-3 space-y-2 text-gray-400 text-sm">
              {course.modules.map((module, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FaCheckCircle
                    className={`text-xs ${
                      index < course.completedModules
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
