import React from "react";
import { SecuriteData } from "../Data";

export default function Securite() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-5 lg:px-16">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-center text-gray-800 mb-10">
          Vos Données, Notre Priorité
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Notre engagement en matière de sécurité garantit la confidentialité et
          la protection de vos informations, tout en assurant une expérience
          fluide et fiable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SecuriteData.map((item) => (
            <div
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow"
              key={item.id}
            >
              <div className="text-5xl text-green-500 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.titre}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
