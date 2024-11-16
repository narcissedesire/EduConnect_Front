import React from "react";
import Settings from "./Parametre";
import ProfileInfo from "./ProfileInfo";
import Parametre from "./Parametre";
import ProgressionCours from "./ProgressionCours";
import ResultatEvaluation from "./ResultatEvaluation";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ml-[256px] gap-5 bg-gray-700 p-5">
      <ProfileInfo />
      <Parametre />
      <ProgressionCours />
      <ResultatEvaluation />
    </div>
  );
}
