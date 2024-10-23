import React from "react";
import { FonctionnaliteData } from "../Data";

export default function Fonctionnalite() {
  return (
    <section className="bg-gray-100 py-16 px-5">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-blue-900 mb-8">
          Des Outils Puissants pour Transformer l’Apprentissage
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Découvrez les fonctionnalités clés qui rendent notre plateforme unique
          et efficace pour les enseignants et les étudiants.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FonctionnaliteData.map((item) => (
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              key={item.id}
            >
              <h3 className="text-2xl font-semibold mb-4">{item.titre}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
