import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Evaluations() {
  // Simuler une liste de tests
  const [tests, setTests] = useState([
    {
      id: 1,
      title: "Test de mathématiques",
      dateCreated: "2024-11-15",
      status: "Actif",
      numberOfQuestions: 10,
      duration: "1 heure",
      participants: 50,
      averageScore: 75,
    },
    {
      id: 2,
      title: "Rédaction française",
      dateCreated: "2024-11-10",
      status: "Inactif",
      numberOfQuestions: 5,
      duration: "45 minutes",
      participants: 30,
      averageScore: 80,
    },
    {
      id: 3,
      title: "Histoire géo",
      dateCreated: "2024-11-18",
      status: "Actif",
      numberOfQuestions: 15,
      duration: "2 heures",
      participants: 120,
      averageScore: 65,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous");

  // Filtrer les tests
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.dateCreated.includes(searchTerm);
    const matchesStatus =
      filterStatus === "Tous" || test.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Évaluations</h1>

      {/* Barre de recherche et filtres */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Rechercher un test..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full sm:w-1/2 border rounded-md"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="Tous">Tous les statuts</option>
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
        </select>
      </div>

      {/* Navigation */}
      <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link
          to="/admin/create"
          className="flex-1 text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Créer un test
        </Link>
        <Link
          to="/admin/submissions"
          className="flex-1 text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Devoirs soumis
        </Link>
      </div>

      {/* Liste des tests */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Tests existants
        </h2>
        {filteredTests.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Date de création</th>
                <th className="px-4 py-2">Nombre de questions</th>
                <th className="px-4 py-2">Durée</th>
                <th className="px-4 py-2">Participants</th>
                <th className="px-4 py-2">Note moyenne</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <tr key={test.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{test.title}</td>
                  <td className="px-4 py-2">{test.dateCreated}</td>
                  <td className="px-4 py-2">{test.numberOfQuestions}</td>
                  <td className="px-4 py-2">{test.duration}</td>
                  <td className="px-4 py-2">{test.participants}</td>
                  <td className="px-4 py-2">{test.averageScore}%</td>
                  <td className="px-4 py-2">{test.status}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/tests/${test.id}`}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => {
                        // Logique pour supprimer un test (à implémenter)
                        alert(`Test "${test.title}" supprimé.`);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun test trouvé.</p>
        )}
      </div>

      {/* Statistiques des évaluations */}
      <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Statistiques des évaluations
        </h3>
        <ul className="space-y-2">
          <li>
            <strong>Tests actifs :</strong>{" "}
            {filteredTests.filter((test) => test.status === "Actif").length}
          </li>
          <li>
            <strong>Tests inactifs :</strong>{" "}
            {filteredTests.filter((test) => test.status === "Inactif").length}
          </li>
          <li>
            <strong>Nombre total de questions :</strong>{" "}
            {filteredTests.reduce(
              (sum, test) => sum + test.numberOfQuestions,
              0
            )}
          </li>
          <li>
            <strong>Nombre total de participants :</strong>{" "}
            {filteredTests.reduce((sum, test) => sum + test.participants, 0)}
          </li>
        </ul>
      </div>
    </div>
  );
}
