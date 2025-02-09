import { useState } from "react";
import { Link } from "react-router-dom";

export default function Submissions() {
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortOrder, setSortOrder] = useState("desc");

  const submissions = [
    {
      id: 1,
      studentName: "Alice Dupont",
      assignmentTitle: "Devoir de mathématiques",
      dateSubmitted: "2024-11-20",
      deadline: "2024-11-25",
      status: "Non corrigé",
      grade: null,
    },
    {
      id: 2,
      studentName: "Bob Martin",
      assignmentTitle: "Rédaction française",
      dateSubmitted: "2024-11-19",
      deadline: "2024-11-23",
      status: "Corrigé",
      grade: 14,
    },
    {
      id: 3,
      studentName: "Claire Durant",
      assignmentTitle: "Devoir d'histoire",
      dateSubmitted: "2024-11-18",
      deadline: "2024-11-22",
      status: "Non corrigé",
      grade: null,
    },
  ];

  // Filtrage des devoirs selon le statut
  const filteredSubmissions = submissions
    .filter((submission) => {
      if (statusFilter === "Tous") return true;
      return submission.status === statusFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dateSubmitted) - new Date(b.dateSubmitted);
      } else {
        return new Date(b.dateSubmitted) - new Date(a.dateSubmitted);
      }
    });

  // Changer le statut d'un devoir
  const handleChangeStatus = (id, newStatus) => {
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === id ? { ...submission, status: newStatus } : submission
    );
    alert(`Devoir mis à jour : ${newStatus}`);
    console.log("Devoir mis à jour:", updatedSubmissions);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Devoirs soumis</h2>

      {/* Filtrage et tri */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <label className="text-gray-700 mr-2">Filtrer par statut:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Tous">Tous</option>
            <option value="Corrigé">Corrigé</option>
            <option value="Non corrigé">Non corrigé</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="text-gray-700 mr-2">Trier par date:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="desc">Date décroissante</option>
            <option value="asc">Date croissante</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-2 text-left">Étudiant</th>
              <th className="px-4 py-2 text-left">Titre</th>
              <th className="px-4 py-2 text-center">Date soumise</th>
              <th className="px-4 py-2 text-center">Date limite</th>
              <th className="px-4 py-2 text-center">Statut</th>
              <th className="px-4 py-2 text-center">Note</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-2">{submission.studentName}</td>
                  <td className="px-4 py-2">{submission.assignmentTitle}</td>
                  <td className="px-4 py-2 text-center">
                    {submission.dateSubmitted}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {submission.deadline}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {submission.status}
                    {submission.status === "Non corrigé" && (
                      <button
                        onClick={() =>
                          handleChangeStatus(submission.id, "Corrigé")
                        }
                        className="ml-2 text-sm text-blue-500 hover:underline"
                      >
                        Marquer comme corrigé
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {submission.grade ? submission.grade : "Non attribuée"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/admin/submissions/${submission.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Voir/Corriger
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                  Aucun devoir trouvé pour ce statut.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
