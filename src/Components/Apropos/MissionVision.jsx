import React from "react";

export default function MissionVision() {
  return (
    <section className="bg-gradient-to-b from-blue-800 to-blue-400 text-white py-16 px-5">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-6">
          Unir la Technologie et l’Éducation pour un Futur Meilleur
        </h2>
        <p className="text-lg mb-12">
          Nous croyons en un monde où l'éducation est accessible à tous, où la
          technologie amplifie le potentiel de chacun.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Section Mission */}
          <div className="bg-white text-blue-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">🌍 Notre Mission</h3>
            <ul className="space-y-4 text-lg">
              <li>
                📚 Offrir une éducation accessible à tous, sans barrières
                géographiques.
              </li>
              <li>
                🤝 Créer une communauté collaborative d’étudiants et
                d'enseignants.
              </li>
              <li>
                ⚙️ Intégrer des outils modernes pour un apprentissage flexible
                et personnalisé.
              </li>
            </ul>
          </div>

          {/* Section Vision */}
          <div className="bg-white text-blue-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">🚀 Notre Vision</h3>
            <ul className="space-y-4 text-lg">
              <li>
                🌟 Devenir un leader reconnu de l'apprentissage numérique.
              </li>
              <li>
                🌐 Offrir une plateforme inclusive adaptée à chaque rythme
                d’apprentissage.
              </li>
              <li>
                🔄 Évoluer avec les technologies émergentes pour rester
                innovants.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
