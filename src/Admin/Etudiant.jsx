<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // Nombre d'étudiants par page
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
=======
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/etudiant/${user.id}`, {
        method: "GET",
      });
<<<<<<< HEAD
      console.log(response);
=======
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des étudiants.");
      }

      const data = await response.json();
<<<<<<< HEAD
      console.log(data);
=======
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73
      const formattedData = data.data.map((etudiant) => ({
        id: etudiant.id,
        name: `${etudiant.utilisateur.nom} ${etudiant.utilisateur.prenom}`,
        email: etudiant.utilisateur.email,
        enrolledDate: new Date(etudiant.createdAt).toLocaleDateString(),
        completedCourses: etudiant.inscriptions.length,
        progress: Math.floor(Math.random() * 100),
        grades: "N/A",
      }));

      setStudents(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  // Filtrage des étudiants par le terme de recherche
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tri des étudiants par une propriété donnée
  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "progress") {
      return b.progress - a.progress;
    } else if (sortBy === "grades") {
      return a.grades.localeCompare(b.grades);
    } else if (sortBy === "enrolledDate") {
      return new Date(a.enrolledDate) - new Date(b.enrolledDate);
    }
    return 0;
  });

  // Pagination : Étudiants affichés pour la page actuelle
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  // Exportation des données en CSV
  const exportToCSV = () => {
    const csvData = [
      [
        "ID",
        "Nom",
        "Email",
        "Progression",
        "Notes",
        "Cours terminés",
        "Date d'inscription",
      ],
      ...students.map((student) => [
        student.id,
        student.name,
        student.email,
        `${student.progress}%`,
        student.grades,
        student.completedCourses,
        student.enrolledDate,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (isLoading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Étudiants inscrits
      </h1>

      {/* Statistiques globales */}
      <div className="mb-6 bg-white shadow p-4 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-gray-700">
            <strong>Total des étudiants :</strong> {students.length}
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Exporter en CSV
        </button>
      </div>

      {/* Barre de recherche et options */}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full md:w-1/3 border rounded"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="name">Nom</option>
          <option value="progress">Progression</option>
          <option value="grades">Notes</option>
          <option value="enrolledDate">Date d'inscription</option>
        </select>
      </div>

      {/* Liste des étudiants */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Progression</th>
              <th className="px-4 py-2 text-center">Notes</th>
              <th className="px-4 py-2 text-center">Cours terminés</th>
              <th className="px-4 py-2 text-center">Inscrit depuis</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2 text-center">{student.progress}%</td>
                  <td className="px-4 py-2 text-center">{student.grades}</td>
                  <td className="px-4 py-2 text-center">
                    {student.completedCourses}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(student.enrolledDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/admin/profil/${student.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Voir profil
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                  Aucun étudiant trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
