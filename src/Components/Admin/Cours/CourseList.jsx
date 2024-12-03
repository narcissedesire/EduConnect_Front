import React, { useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";

const CourseList = ({ courses, fetchCours, categories }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Titre
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Description
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Categorie
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Module
            </th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {
            //   courses.length > 0 ? (
            courses.map((cour) => (
              <tr
                key={cour.id}
                className="border-t hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4">{cour.titre}</td>
                <td className="py-3 px-4">{cour.description}</td>
                <td className="py-3 px-4">{cour.categorie?.label}</td>
                <td className="py-3 px-4">{cour.modules?.length}</td>
                <td className="py-3 px-4 text-center">
                  <ActionButtons
                    categories={categories}
                    course={cour}
                    fetchCours={fetchCours}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
