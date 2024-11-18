import React, { useEffect } from "react";
import Hero from "../Components/Acceuil/Hero";
import AboutSection from "../Components/Acceuil/AboutSection";
import SectionFonctionnalites from "../Components/Acceuil/FonctionCle";
import SectionTemoignages from "../Components/Acceuil/Temoignage";
import PresentationEnseignant from "../Components/Acceuil/PresentationEnseignant";
import CoursPopulaire from "../Components/Acceuil/CoursPopulaire";
import { checkTokenExpiration } from "../Components/TokenExpire";

export default function Home() {
  useEffect(() => {
    checkTokenExpiration();
  });
  return (
    <div className="mt-8">
      <Hero />
      <AboutSection />
      <SectionFonctionnalites />
      <SectionTemoignages />
      <PresentationEnseignant />
      <CoursPopulaire />
    </div>
  );
}
