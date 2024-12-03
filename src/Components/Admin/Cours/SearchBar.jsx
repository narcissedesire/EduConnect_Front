// SearchBar.jsx
import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import CourseForm from "./Modals/CourseForm";

const SearchBar = ({ searchTerm, onSearch, fetchCours, categories }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="mb-4 flex items-center space-x-4">
      <div className="flex items-center bg-white border rounded-lg shadow-sm px-3 w-full">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un cours..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="ml-2 p-2 w-full focus:outline-none"
        />
      </div>
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center"
      >
        <FaPlus className="mr-2" /> Créer un cours
      </button>

      {showForm && (
        <CourseForm
          setShowForm={setShowForm}
          fetchCours={fetchCours}
          categories={categories}
        />
      )}
    </div>
  );
};

export default SearchBar;
