import React from "react";
import { Link } from "react-router-dom";
import { calculateProgression, formatCreatedAt } from "../FonctionUtile";
import { Port } from "../../Port";

export default function LessonCard({ lessons }) {
  const totalDuration = lessons.modules?.reduce((total, module) => {
    const dure = Number(module.dure);
    return total + (isNaN(dure) ? 0 : dure);
  }, 0);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300">
      {/* Lien vers la page de détails */}
      <Link to={`/cours/${lessons.id}`}>
        <img
          className="w-full h-48 object-cover"
          src={
            lessons.photo
              ? Port + "/ImagesCours/" + lessons.photo.nom
              : "images/fond_hero.jpg"
          }
          alt={lessons.photo ? lessons.photo.nom : "Image par defaut"}
        />
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {lessons.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {lessons.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-blue-500">
              Niveau : {lessons.niveau ? lessons.niveau.label : "Flou"}
            </span>
            <span className="text-sm text-gray-500">
              Durée : {totalDuration}
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white font-semibold">
              il y à {formatCreatedAt(lessons.createdAt)}
            </span>
            <span className="text-xs text-gray-500">
              Progression : {calculateProgression(lessons.modules)}%
            </span>
          </div>

          <div className="flex gap-2 items-center justify-between">
            <div>
              {lessons.isCertifier ? (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-semibold mr-1">
                  Certifié
                </span>
              ) : (
                ""
              )}

              <span className="text-xs px-3 py-1 rounded-full bg-blue-200 text-blue-600 font-semibold">
                {lessons.isGratuit ? "Gratuit" : "Payant"}
              </span>
            </div>
            {/* <div className="text-primary">{lessons.popularity} points</div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
