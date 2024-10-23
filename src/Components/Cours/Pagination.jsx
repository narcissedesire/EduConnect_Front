import React from "react";

export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}) {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-full border ${
            currentPage === index + 1
              ? "bg-primary text-white border-primary"
              : "text-gray-600 border-gray-300"
          } hover:bg-primary hover:text-white transition`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
