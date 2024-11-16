import React, { useState } from "react";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaRegCommentDots,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function ResultatEvaluation() {
  const [sortBy, setSortBy] = useState("date"); // 'date' or 'grade'
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [filterByGrade, setFilterByGrade] = useState(null); // 'top' or 'low'

  const courses = [
    {
      id: 1,
      title: "Mathématiques",
      evaluations: [
        {
          id: 1,
          title: "Test d'Algèbre",
          date: "2024-10-15",
          grade: 85,
          comment: "Très bon travail !",
        },
        {
          id: 2,
          title: "Test de Géométrie",
          date: "2024-10-20",
          grade: 92,
          comment: "Excellent, continuez comme ça !",
        },
      ],
    },
    {
      id: 2,
      title: "Physique",
      evaluations: [
        {
          id: 1,
          title: "Test de Mécanique",
          date: "2024-09-28",
          grade: 78,
          comment: "Bon début, des progrès à faire.",
        },
        {
          id: 2,
          title: "Test d'Optique",
          date: "2024-10-18",
          grade: 88,
          comment: "Très bon, bonne compréhension des concepts.",
        },
      ],
    },
  ];

  const toggleCourseDetails = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const sortedCourses = courses.map((course) => {
    const sortedEvaluations = [...course.evaluations].sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return b.grade - a.grade;
    });

    const filteredEvaluations = filterByGrade
      ? sortedEvaluations.filter((evaluation) =>
          filterByGrade === "top"
            ? evaluation.grade >= 85
            : evaluation.grade < 70
        )
      : sortedEvaluations;

    return { ...course, evaluations: filteredEvaluations };
  });

  return (
    <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-blue-400">
        Résultats et Évaluations
      </h2>

      {/* Options de tri et de filtrage */}
      <div className="flex items-center justify-between mb-4 space-x-2">
        <div>
          <button
            onClick={() => setSortBy("date")}
            className={`text-sm px-3 py-1 rounded ${
              sortBy === "date"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Trier par Date{" "}
            {sortBy === "date" ? (
              <FaSortAmountDown className="inline ml-1" />
            ) : (
              ""
            )}
          </button>
          <button
            onClick={() => setSortBy("grade")}
            className={`text-sm px-3 py-1 rounded ${
              sortBy === "grade"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Trier par Note{" "}
            {sortBy === "grade" ? (
              <FaSortAmountUp className="inline ml-1" />
            ) : (
              ""
            )}
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              setFilterByGrade(filterByGrade === "top" ? null : "top")
            }
            className={`text-sm px-3 py-1 rounded ${
              filterByGrade === "top"
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Meilleures notes
          </button>
          <button
            onClick={() =>
              setFilterByGrade(filterByGrade === "low" ? null : "low")
            }
            className={`text-sm px-3 py-1 rounded ${
              filterByGrade === "low"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Notes faibles
          </button>
        </div>
      </div>

      {sortedCourses.map((course) => (
        <div
          key={course.id}
          className="mb-6 bg-gray-900 p-4 rounded-lg shadow-md"
        >
          {/* Titre du cours */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg text-blue-400">
              {course.title}
            </h3>
            <button
              onClick={() => toggleCourseDetails(course.id)}
              className="text-blue-500 text-sm hover:underline focus:outline-none flex items-center"
            >
              {expandedCourse === course.id ? (
                <>
                  Masquer les évaluations <FaChevronUp className="ml-1" />
                </>
              ) : (
                <>
                  Voir les évaluations <FaChevronDown className="ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Liste des évaluations */}
          {expandedCourse === course.id && (
            <ul className="mt-3 space-y-3 transition-all duration-300 ease-in-out">
              {course.evaluations.map((evaluation) => (
                <li
                  key={evaluation.id}
                  className="bg-gray-800 p-3 rounded-md transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-300">
                        {evaluation.title}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(evaluation.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p
                      className={`text-xl font-semibold ${
                        evaluation.grade >= 85
                          ? "text-green-400"
                          : evaluation.grade < 70
                          ? "text-red-400"
                          : "text-blue-400"
                      }`}
                    >
                      {evaluation.grade}/100
                    </p>
                  </div>
                  {/* Commentaire de l'enseignant */}
                  {evaluation.comment && (
                    <div className="mt-2 flex items-start space-x-2">
                      <FaRegCommentDots className="text-blue-500" />
                      <p className="text-gray-400 text-sm">
                        {evaluation.comment}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
