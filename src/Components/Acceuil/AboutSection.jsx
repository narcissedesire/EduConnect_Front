import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 mt-5 bg-gray-100">
      <div className="container mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-3">
        <div className="">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Découvrez une nouvelle façon d’apprendre
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            LearnPro est une plateforme innovante, conçue pour vous offrir une
            expérience d'apprentissage sur-mesure. Accédez à des cours, suivez
            vos progrès, et atteignez vos objectifs, le tout à votre rythme.
          </p>
          <a
            href="#register"
            className="btn bg-primary px-8 py-4 rounded-full text-white hover:bg-primary/75"
          >
            En savoir plus
          </a>
        </div>
        <div className="">
          <img
            src="./images/fond_hero.jpg"
            alt="Presentation Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
