import React from "react";
import { FaClock, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import fond_hero from "/images/fond_hero.jpg";

export default function CourseInfo({
  lesson,
  progress,
  completedModules,
  totalModules,
}) {
  return (
    <div className="container mx-auto flex flex-col md:flex-row px-4 sm:px-6 lg:px-8">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <img
          className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
          src={fond_hero}
          alt="Image de couverture du cours"
        />
      </div>

      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {lesson.title}
        </h1>

        <div className="mb-4 text-gray-700">
          <p className="font-semibold">Enseignant : {lesson.instructor}</p>
          <p className="font-semibold">
            Étudiants inscrits : {lesson.studentsEnrolled}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <span className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">
            <FaBookOpen className="mr-1" /> {lesson.level}
          </span>
          <span className="flex items-center bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">
            <FaClock className="mr-1" /> {lesson.duration}
          </span>
          <span
            className={`flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              lesson.free ? "bg-blue-600 text-white" : "bg-red-600 text-white"
            } shadow`}
          >
            {lesson.free ? "Gratuit" : "Payant"}
          </span>
          {lesson.certification && (
            <span className="flex items-center bg-yellow-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow">
              <FaCheckCircle className="mr-1" /> Certifié
            </span>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Progrès du cours</h2>
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                {progress.toFixed(0)}%
              </div>
              <div className="text-xs font-semibold text-teal-600">
                {completedModules} / {totalModules} Modules
              </div>
            </div>
            <div className="flex items-center h-2 bg-gray-200 rounded">
              <div
                className="bg-teal-600 h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700 mb-6">{lesson.description}</p>

        <div className="mt-6">
          <button className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            {lesson.free ? "Accéder au cours" : "S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  );
}
