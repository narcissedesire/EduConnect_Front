import React from "react";

export default function Hero() {
  return (
    <header className="header bg-cover bg-center text-white h-screen flex flex-col justify-center items-center relative mt-12">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="flex flex-col items-center justify-center gap-3 text-center px-5 z-20">
        <p className="text-lg text-lightGray italic">
          Bienvenue chez EduConnect
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Apprenez à votre rythme
        </h1>
        <p className="text-xl mb-8">
          Inscrivez-vous maintenant et transformez votre avenir.
        </p>
        <a
          href="#courses"
          className="btn bg-blue-600 px-8 py-4 text-lg rounded-full hover:bg-blue-700"
        >
          Commencer maintenant
        </a>
      </div>
    </header>
  );
}
