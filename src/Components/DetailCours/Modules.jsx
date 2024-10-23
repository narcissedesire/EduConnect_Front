import React from "react";

export default function Modules({ lesson }) {
  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Modules du cours
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lesson.modules && lesson.modules.length > 0 ? (
          lesson.modules.map((module, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                {module.title}
              </h3>
              <p className="text-gray-600">{module.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Aucun module disponible.</p>
        )}
      </div>
    </div>
  );
}
