import React from "react";

export default function CoursPopulaire() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Cours Populaires
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
          {["Développement Web", "Data Science", "UI/UX Design"].map(
            (course, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={`./images/fond_hero.jpg`}
                  alt={course}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-white text-blue-500 px-6 py-2 rounded-full">
                    Voir le cours
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{course}</h3>
                  <p className="text-gray-500">Avec Jean Dupont</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
