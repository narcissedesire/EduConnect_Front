import React, { useState, useEffect } from "react";
import {
  FaUserAlt,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Fonction pour simuler des données
const fetchData = async () => {
  return {
    recentActivities: [
      {
        type: "Inscription",
        details: "Nouvel étudiant inscrit",
        date: "2024-10-01",
      },
      {
        type: "Publication",
        details: "Nouveau cours ajouté",
        date: "2024-10-02",
      },
      {
        type: "Devoir soumis",
        details: "Devoir en attente de correction",
        date: "2024-10-03",
      },
    ],
    stats: {
      totalUsers: 150,
      totalTeachers: 20,
      activeCourses: 12,
      averageCompletionRate: 78,
      overallSuccessRate: 85,
    },
    alerts: [
      { message: "Cours en attente de validation" },
      { message: "2 devoirs non corrigés" },
      { message: "1 demande d’assistance en attente" },
    ],
  };
};

export default function Admin() {
  const [data, setData] = useState({
    recentActivities: [],
    stats: {},
    alerts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      const fetchedData = await fetchData();
      setData(fetchedData);
      setLoading(false);
    };
    loadDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <p className="text-xl font-semibold">Chargement...</p>
      </div>
    );

  // Données pour le graphique des taux de réussite et d'achèvement
  const chartData = {
    labels: ["Achèvement Moyen", "Réussite Globale"],
    datasets: [
      {
        label: "Taux (%)",
        data: [data.stats.averageCompletionRate, data.stats.overallSuccessRate],
        backgroundColor: ["#4caf50", "#1e90ff"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Tableau de Bord Administrateur
      </h1>

      {/* Statistiques en Temps Réel */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105">
          <FaUserAlt className="text-blue-600 text-4xl" />
          <div>
            <p className="text-gray-500">Utilisateurs</p>
            <p className="text-2xl font-bold">{data.stats.totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105">
          <FaChalkboardTeacher className="text-yellow-600 text-4xl" />
          <div>
            <p className="text-gray-500">Enseignants</p>
            <p className="text-2xl font-bold">{data.stats.totalTeachers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105">
          <FaCheckCircle className="text-green-600 text-4xl" />
          <div>
            <p className="text-gray-500">Cours Actifs</p>
            <p className="text-2xl font-bold">{data.stats.activeCourses}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="w-16">
            <CircularProgressbar
              value={data.stats.averageCompletionRate}
              text={`${data.stats.averageCompletionRate}%`}
              styles={buildStyles({
                textSize: "18px",
                pathColor: "#4caf50",
                textColor: "#333",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Achèvement Moyen</p>
          </div>
        </div>
      </section>

      {/* Graphique des Statistiques */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
          Statistiques des Taux de Réussite et d'Achèvement
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </section>

      {/* Activités Récentes avec Filtre */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Activités Récentes
        </h2>
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Rechercher une activité..."
            className="p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {data.recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <FaFileAlt className="text-blue-600 text-2xl" />
              <div>
                <p className="font-bold">{activity.type}</p>
                <p className="text-gray-500">{activity.details}</p>
                <p className="text-sm text-gray-400">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alertes et Rappels */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Alertes et Rappels
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
          {data.alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-red-600"
            >
              <FaExclamationTriangle className="text-xl" />
              <p className="font-semibold">{alert.message}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rapports Hebdomadaires/Mensuels */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Rapports de Performance
        </h2>
        <div className="flex space-x-4">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow-lg font-semibold transition duration-300 transform hover:scale-105">
            Voir les Rapports Hebdomadaires
          </button>
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow-lg font-semibold transition duration-300 transform hover:scale-105">
            Voir les Rapports Mensuels
          </button>
        </div>
      </section>
    </div>
  );
}
