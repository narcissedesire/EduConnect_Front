import React, { useEffect } from "react";
import MissionVision from "../Components/Apropos/MissionVision";
import Fonctionnalite from "../Components/Apropos/Fonctionnalite";
import Avantage from "../Components/Apropos/Avantage";
import Securite from "../Components/Apropos/Securite";
import Introduction from "../Components/Apropos/Introduction";
import { checkTokenExpiration } from "../Components/TokenExpire";

export default function About() {
  useEffect(() => {
    checkTokenExpiration();
  });
  return (
    <div className="mt-16">
      <Introduction />
      <MissionVision />
      <Fonctionnalite />
      <Avantage />
      <Securite />
    </div>
  );
}
