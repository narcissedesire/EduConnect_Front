import React from "react";

export default function Introduction() {
  return (
    <section className="bg-blue-50 py-20 px-5">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-blue-800">
            Apprendre, Enseigner et Grandir Ensemble
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Bienvenue sur <strong>[Nom de la plateforme]</strong>, votre
            destination de confiance pour un apprentissage moderne et efficace.
            Apprenez à votre rythme, collaborez avec vos enseignants et suivez
            vos progrès facilement grâce à des outils innovants.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <span className="text-blue-600 text-3xl mr-3">✔️</span>
              <p className="text-gray-700">
                <strong>Apprentissage Accessible et Flexible :</strong> Apprenez
                où que vous soyez, à tout moment.
              </p>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-3xl mr-3">✔️</span>
              <p className="text-gray-700">
                <strong>Évaluations Avancées :</strong> Créez des tests en ligne
                avec corrections automatiques.
              </p>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-3xl mr-3">✔️</span>
              <p className="text-gray-700">
                <strong>Messagerie Intégrée :</strong> Communiquez facilement
                avec vos enseignants et camarades.
              </p>
            </li>
          </ul>
          <button className="mt-8 px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">
            Inscrivez-vous Maintenant
          </button>
        </div>
        <div>
          <img
            src="/images/fond_hero.jpg"
            alt="Illustration d'apprentissage"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
