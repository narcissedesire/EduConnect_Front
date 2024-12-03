import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseInfo from "../Components/DetailCours/CourseInfo";
import Modules from "../Components/Admin/Cours/Modules";

export default function CourseDetailAdmin() {
  const [detailCours, setDetailCours] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursId();
  }, [id]);

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

  const formatVideo = false;

  return (
    <div className="bg-gray-100 py-5">
      <CourseInfo
        lesson={detailCours.cours}
        progress={progress}
        completedModules={completedModules}
        totalModules={totalModules}
        formatVideo={formatVideo}
      />
      <Modules lesson={detailCours.cours} />
    </div>
  );
}
