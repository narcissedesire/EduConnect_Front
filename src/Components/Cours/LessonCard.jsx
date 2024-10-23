import React from "react";
import { Link } from "react-router-dom";

export default function LessonCard({ lesson }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300">
      {/* Ajout du lien vers la page de détails */}
      <Link to={`/cours/${lesson.id}`}>
        <img
          className="w-full h-48 object-cover"
          src="images/fond_hero.jpg"
          alt="Image de couverture du cours"
        />
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {lesson.title}
          </h3>

          {/* Limite l'affichage de la description à 3 lignes */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {lesson.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-blue-500">
              Niveau : {lesson.level}
            </span>
            <span className="text-sm text-gray-500">
              Durée : {lesson.duration}
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white font-semibold">
              {lesson.date}
            </span>
            <span className="text-xs text-gray-500">
              Progression : {lesson.progress}%
            </span>
          </div>

          <div className="flex gap-2 items-center justify-between">
            <div>
              <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-semibold mr-1">
                {lesson.certification && "Certifié"}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-200 text-blue-600 font-semibold">
                {lesson.free ? "Gratuit" : "Payant"}
              </span>
            </div>
            <div className="text-primary">{lesson.popularity} points</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
