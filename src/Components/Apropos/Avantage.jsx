import React from "react";
import { AvantageData } from "../Data";

export default function Avantage() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-6xl px-5">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-center text-gray-800 mb-12">
          Pourquoi Choisir Notre Plateforme ?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="/images/fond_hero.jpg"
              //   src="/images/benefits-illustration.svg"
              alt="Illustration des avantages"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 rounded-lg"></div>
          </div>

          <div className="space-y-8">
            {AvantageData.map((item) => (
              <div className="flex items-start gap-4" key={item.id}>
                <span className="text-4xl text-blue-500">{item.icon}</span>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {item.titre}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
