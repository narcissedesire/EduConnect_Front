import React from "react";
import { useParams, Link } from "react-router-dom";

export default function StudentProfileAdmin() {
  const { id } = useParams();

  // Exemple de données simulées (remplacez-les par une requête API)
  const studentData = {
    1: {
      name: "Alice Dupont",
      email: "alice@example.com",
      progress: 85,
      grades: "A",
      details: "Alice est une étudiante très appliquée.",
      courses: [
        { id: 1, name: "Mathématiques", progress: 90, status: "Terminé" },
        { id: 2, name: "Physique", progress: 75, status: "En cours" },
        { id: 3, name: "Programmation", progress: 85, status: "Terminé" },
      ],
      activityTimeline: [
        {
          date: "2023-11-01",
          activity: "A terminé le cours de Mathématiques.",
        },
        { date: "2023-10-20", activity: "A soumis un exercice en Physique." },
        { date: "2023-10-15", activity: "A commencé le cours de Physique." },
      ],
    },
    2: {
      name: "Bob Martin",
      email: "bob@example.com",
      progress: 72,
      grades: "B",
      details: "Bob a montré une amélioration constante.",
      courses: [
        { id: 1, name: "Histoire", progress: 60, status: "En cours" },
        { id: 2, name: "Chimie", progress: 75, status: "En cours" },
      ],
      activityTimeline: [
        { date: "2023-11-02", activity: "A commencé le cours de Histoire." },
        { date: "2023-10-10", activity: "A soumis un test en Chimie." },
      ],
    },
  };

  const student = studentData[id];

  if (!student) {
    return <div className="p-6 text-red-500">Étudiant introuvable.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Titre et résumé */}
      <h1 className="text-2xl font-bold text-blue-700 mb-4">{student.name}</h1>
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <p>
          <strong>Email :</strong> {student.email}
        </p>
        <p>
          <strong>Progression globale :</strong> {student.progress}%
        </p>
        <p>
          <strong>Notes générales :</strong> {student.grades}
        </p>
        <p>
          <strong>Détails :</strong> {student.details}
        </p>
      </div>

      {/* Cours suivis */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-3">Cours suivis</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="px-4 py-2 text-left">Cours</th>
              <th className="px-4 py-2 text-center">Progression</th>
              <th className="px-4 py-2 text-center">Statut</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {student.courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{course.name}</td>
                <td className="px-4 py-2 text-center">{course.progress}%</td>
                <td className="px-4 py-2 text-center">{course.status}</td>
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/admin/courses/${course.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Voir détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chronologie des activités */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-3">
          Chronologie des activités
        </h2>
        <ul className="list-disc pl-6">
          {student.activityTimeline.map((activity, index) => (
            <li key={index} className="mb-2">
              <strong>{new Date(activity.date).toLocaleDateString()} :</strong>{" "}
              {activity.activity}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions administratives */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-bold text-blue-600 mb-3">
          Actions administratives
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Modifier le profil
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Suspendre le compte
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Envoyer un message
          </button>
        </div>
      </div>
    </div>
  );
}
