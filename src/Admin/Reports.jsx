import { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChartBar } from "react-icons/fa";
import jsPDF from "jspdf";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Fonction pour convertir les données en CSV
const convertToCSV = (data) => {
  const headers = ["Mois", "Taux de complétion (%)", "Notes moyennes"];
  const rows = data.labels.map((label, index) => [
    label,
    data.datasets[0].data[index],
    data.datasets[1].data[index],
  ]);

  let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
  rows.forEach((row) => {
    csvContent += row.join(",") + "\n";
  });
  return encodeURI(csvContent);
};

export default function Reports() {
  const [reportData, setReportData] = useState({
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Taux de complétion (%)",
        data: [50, 60, 70, 80, 85, 90],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Notes moyennes",
        data: [70, 75, 80, 85, 90, 95],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  });

  // Référence pour le graphique
  const chartRef = useRef(null);

  // Données statiques pour simuler des valeurs réelles
  useEffect(() => {
    // Vous pouvez intégrer une logique pour récupérer les données via une API si nécessaire
  }, []);

  // Options de graphique
  const chartOptions = {
    responsive: true,
    aspectRatio: 2,
    scales: {
      x: {
        title: {
          display: true,
          text: "Mois",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valeur (%)",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  const drawTableBorders = (doc, tableStartY, data) => {
    // Ajouter une bordure autour du tableau
    doc.rect(20, tableStartY - 5, 170, 10 + data.length * 10); // Bordure autour du tableau

    // Dessiner les bordures des cellules
    data.forEach((row, rowIndex) => {
      const yOffset = tableStartY + 10 + rowIndex * 10;
      doc.rect(20, yOffset - 5, 40, 10); // Bordure de la colonne "Mois"
      doc.rect(60, yOffset - 5, 60, 10); // Bordure de la colonne "Taux de complétion"
      doc.rect(120, yOffset - 5, 60, 10); // Bordure de la colonne "Notes moyennes"
    });
  };

  // Fonction de génération du PDF avec bordures du tableau
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Rapport des Performances des Étudiants", 20, 20);
    doc.setFontSize(12);
    doc.text("Graphique des performances des étudiants : ", 20, 30);

    // Vérifier si la ref existe et récupérer le canvas du graphique
    if (chartRef.current) {
      const chartCanvas = chartRef.current.canvas; // Accès direct au canvas
      doc.addImage(chartCanvas, "JPEG", 20, 40, 170, 90);
    }

    // Ajouter des détails sous forme de texte
    doc.text("Détails des résultats:", 20, 140);
    doc.text("1. Note moyenne par étudiant.", 20, 150);
    doc.text("2. Taux de complétion des cours.", 20, 160);
    doc.text("3. Participation des étudiants.", 20, 170);
    doc.text("4. Taux de réussite des étudiants.", 20, 180);

    // Ajouter le tableau des données
    const tableStartY = 200; // Position de départ pour le tableau
    doc.text("Tableau des données :", 20, tableStartY - 10);

    // Table headers
    const headers = ["Mois", "Taux de complétion (%)", "Notes moyennes"];
    const data = reportData.labels.map((label, index) => [
      label,
      reportData.datasets[0].data[index],
      reportData.datasets[1].data[index],
    ]);

    // Dessiner les en-têtes
    doc.text(headers[0], 20, tableStartY);
    doc.text(headers[1], 60, tableStartY);
    doc.text(headers[2], 120, tableStartY);

    // Dessiner les données du tableau
    data.forEach((row, rowIndex) => {
      const yOffset = tableStartY + 10 + rowIndex * 10;
      doc.text(row[0], 20, yOffset);
      doc.text(row[1] + "%", 60, yOffset);
      doc.text(row[2] + "%", 120, yOffset);
    });

    // Ajouter les bordures du tableau
    drawTableBorders(doc, tableStartY, data);

    doc.save("rapport_performance_etudiants.pdf");
  };

  // Fonction pour télécharger le CSV
  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(reportData);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "rapport_performance_etudiants.csv");
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Rapports - Statistiques détaillées
      </h2>

      <div className="flex items-center space-x-4 mb-6">
        <FaChartBar className="text-3xl text-gray-600" />
        <h3 className="text-xl font-semibold">
          Statistiques des performances des étudiants
        </h3>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">
          Graphique des performances des étudiants
        </h4>
        <div className="relative" style={{ height: "400px" }}>
          {/* Graphique avec taille fixe et la référence */}
          <Line ref={chartRef} data={reportData} options={chartOptions} />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-gray-700">
          Détails des résultats :
        </h4>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <strong>Note moyenne par étudiant :</strong> Moyenne des notes
            obtenues sur toutes les évaluations.
          </li>
          <li>
            <strong>Taux de complétion des cours :</strong> Mesure du
            pourcentage des étudiants ayant terminé le cours.
          </li>
          <li>
            <strong>Participation des étudiants :</strong> Pourcentage des
            étudiants ayant participé activement aux discussions et aux examens.
          </li>
          <li>
            <strong>Taux de réussite :</strong> Pourcentage des étudiants ayant
            obtenu la note de passage minimale.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">
          Tableau récapitulatif :
        </h4>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Mois</th>
              <th className="px-4 py-2 text-left">Taux de complétion (%)</th>
              <th className="px-4 py-2 text-left">Notes moyennes</th>
            </tr>
          </thead>
          <tbody>
            {reportData.labels.map((label, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-t">{label}</td>
                <td className="px-4 py-2 border-t">
                  {reportData.datasets[0].data[index]}%
                </td>
                <td className="px-4 py-2 border-t">
                  {reportData.datasets[1].data[index]}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Télécharger en CSV
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Télécharger le rapport
          </button>
        </div>
      </div>
    </div>
  );
}
