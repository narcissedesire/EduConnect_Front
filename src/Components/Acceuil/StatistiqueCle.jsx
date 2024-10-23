import React from "react";

export default function StatistiqueCle() {
  return (
    <section class="bg-blue-500 text-white py-10">
      <div class="flex justify-center space-x-12">
        <div class="text-center">
          <h3 class="text-4xl font-bold">10,000+</h3>
          <p>Étudiants inscrits</p>
        </div>
        <div class="text-center">
          <h3 class="text-4xl font-bold">500+</h3>
          <p>Cours disponibles</p>
        </div>
        {/* <!-- Répéter pour d’autres statistiques --> */}
      </div>
    </section>
  );
}
