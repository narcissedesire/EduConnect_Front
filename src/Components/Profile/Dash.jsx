import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler, // Importez le plugin Filler ici
} from "chart.js";

// Enregistrez les éléments nécessaires, y compris le plugin Filler
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler // Enregistrez le plugin Filler ici
);

const StudentProfile = () => {
  // Données pour le graphique de progression
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Progression",
        data: [2, 10, 5, 20, 15, 70, 60, 45, 30, 50, 25, 55],
        backgroundColor: "rgba(30, 144, 255, 0.1)", // Remplissage léger
        borderColor: "#1E90FF", // Couleur de la ligne
        borderWidth: 2,
        pointBackgroundColor: "#1E90FF",
        pointBorderColor: "#1E90FF",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, // Courbe lisse
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        padding: 8,
        cornerRadius: 4,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
      legend: {
        display: false, // Pas de légende pour un look épuré
      },
      annotation: {
        annotations: {
          point1: {
            type: "point",
            xValue: "Jun",
            yValue: 70,
            backgroundColor: "rgba(0, 255, 0, 0.5)", // Couleur du point culminant
            radius: 6,
          },
          label1: {
            type: "label",
            xValue: "Jun",
            yValue: 70,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderColor: "#1E90FF",
            borderWidth: 1,
            content: ["Point culminant"],
            font: {
              size: 12,
              weight: "bold",
            },
            color: "#333",
            position: "top",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "transparent",
        },
      },
    },
  };

  // Données pour le graphique des heures restantes
  const pieData = {
    labels: ["Math", "Science", "Histoire"],
    datasets: [
      {
        label: "Heures restantes",
        data: [40, 40, 20],
        backgroundColor: ["#1E90FF", "#FF6347", "#FFD700"],
        hoverBackgroundColor: ["#1C86EE", "#FF4500", "#FFEC8B"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 ml-64">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-300 w-24 h-24 rounded-full mb-4 flex items-center justify-center">
                <span role="img" aria-label="profile" className="text-4xl">
                  📚
                </span>
              </div>
              <h2 className="text-xl font-semibold">Narcisse Desire</h2>
              <p className="text-green-500">En ligne</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="bg-gray-100 p-2 rounded-lg text-center">
                narcisse@gmail.com
              </p>
              <p className="bg-gray-100 p-2 rounded-lg text-center">
                narcisse@gmail.com
              </p>
              <p className="bg-gray-100 p-2 rounded-lg text-center">
                narcisse@gmail.com
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="">
            <div className=" lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center gap-3">
                <img src="/images/ordi.png" className="w-16" />
                <p className="text-2xl font-bold text-blue-500 ">21</p>
                <p className="text-gray-700 font-bold text-2xl text-center">
                  Total cours Inscrit
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center gap-3">
                <img src="/images/ordi.png" className="w-16" />
                <p className="text-2xl font-bold text-blue-500 ">21</p>
                <p className="text-gray-700 font-bold text-2xl text-center">
                  Total cours Inscrit
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center gap-3">
                <img src="/images/ordi.png" className="w-16" />
                <p className="text-2xl font-bold text-blue-500 ">21</p>
                <p className="text-gray-700 font-bold text-2xl text-center">
                  Total cours Inscrit
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center gap-3">
                <img src="/images/ordi.png" className="w-16" />
                <p className="text-2xl font-bold text-blue-500 ">21</p>
                <p className="text-gray-700 font-bold text-2xl text-center">
                  Total cours Inscrit
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Points Section */}
          <div className="flex justify-center items-center bg-white rounded-lg shadow-md">
            <div className=" lg:col-span-2  p-6 px-8  text-center flex items-center gap-8 justify-center">
              <div role="img" aria-label="trophy" className="text-9xl mr-2">
                <img src="/images/trophe.png" className="w-36" />
              </div>

              <div className="flex flex-col justify-center items-center mb-2 gap-3">
                <p className="text-5xl font-bold text-yellow-500">
                  80.6 Points
                </p>
                <p className="text-3xl font-semibold">Total de points obtenu</p>
              </div>
            </div>
          </div>

          {/* Hours Remaining (Pie Chart) */}
          <div>
            <div className=" bg-white p-6 rounded-lg shadow-md">
              <p className="font-semibold mb-4 text-center">
                Heures restantes par cours
              </p>
              <div className="flex justify-center items-center gap-5">
                <div>
                  <Pie data={pieData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Graph Section */}
        <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <p className="font-semibold mb-4">Statistique de progression</p>
          <Line data={lineData} options={lineOptions} />
        </div>

        {/* Liste des cours */}
        <div className="col-span-1 lg:col-span-4 bg-white p-6 rounded-lg shadow-md">
          <p className="font-semibold text-gray-700">Liste des cours</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
