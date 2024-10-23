import React from "react";
import { fonctionnalites } from "../Data";

export default function SectionFonctionnalites() {
  return (
    <section className="py-16 bg-gray-50 ">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-8">
          Nos Fonctionnalités Clés
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
          {fonctionnalites.map((fonctionnalité, index) => (
            <article
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
              aria-labelledby={`fonctionnalite-titre-${index}`}
            >
              <div className="flex justify-center mb-4">
                {fonctionnalité.icone}
              </div>
              <h3
                id={`fonctionnalite-titre-${index}`}
                className="text-xl font-semibold text-center mb-2 text-blue-600"
              >
                {fonctionnalité.titre}
              </h3>
              <p className="text-gray-700 text-center">
                {fonctionnalité.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
