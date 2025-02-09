import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { lessonsData } from "../Components/Data";
import CourseInfo from "../Components/DetailCours/CourseInfo";
import Modules from "../Components/DetailCours/Modules";
// import PdfFiles from "../Components/DetailCours/PdfFiles";
// import Videos from "../Components/DetailCours/Videos";
import CommentSection from "../Components/DetailCours/CommentSection";
import { AuthContext } from "../context/AuthContext";
// import { checkTokenExpiration } from "../Components/TokenExpire";

export default function CourseDetail() {
  // const { test } = useContext(AuthContext);
  // console.log("test fotsiny : ", test);

  const [detailCours, setDetailCours] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isInscrit, setIsInscrit] = useState("");
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const fetchCoursId = async () => {
    try {
      const response = await fetch(`/api/cours/detail/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await response.json();

      setDetailCours(data);

      if (user && user.role === "etudiant" && data.cours.inscriptions) {
        const inscrit = data.cours.inscriptions.some(
          (inscription) => inscription.etudiant.id_utilisateur === user.id
        );
        setIsInscrit(inscrit);
      }
    } catch (error) {
      console.error("Erreur :", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchCoursId();
    }
  }, [user]);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!id) {
    return (
      <div className="text-center text-red-500 mt-20">
        Le cours demandé est introuvable.
      </div>
    );
  }

  const totalModules = detailCours?.cours?.modules?.length || 0;
  const completedModules =
    detailCours?.cours?.modules?.filter((module) => module?.isTermine === true)
      ?.length || 0;
  const progress =
    totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  // Initialisation des réactions avec des valeurs par défaut
  // const [reactions, setReactions] = useState(
  //   detailCours.reviews.map((review) => ({
  //     ...review,
  //     likes: 0,
  //     hearts: 0,
  //     supports: 0,
  //     dislikes: 0,
  //   }))
  // );

  // // Gérer les réactions
  // const handleReaction = (index, type) => {
  //   const newReactions = [...reactions];
  //   if (type === "like") newReactions[index].likes += 1;
  //   else if (type === "heart") newReactions[index].hearts += 1;
  //   else if (type === "support") newReactions[index].supports += 1;
  //   else if (type === "dislike") newReactions[index].dislikes += 1;
  //   setReactions(newReactions);
  // };

  return (
    <div className="bg-gray-100 py-10 mt-20">
      <CourseInfo
        lesson={detailCours.cours}
        progress={progress}
        completedModules={completedModules}
        totalModules={totalModules}
        isInscrit={isInscrit}
      />
      {isInscrit && (
        <>
          <Modules lesson={detailCours.cours} />
          <CommentSection lesson={detailCours.cours} />
        </>
      )}
    </div>
  );
}
