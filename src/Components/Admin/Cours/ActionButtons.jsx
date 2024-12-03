import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import ModalSuppression from "./Modals/ModalSuppression";
import EditForm from "./Modals/EditForm";

const ActionButtons = ({ course, fetchCours, categories }) => {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => {
          setShowForm(true);
        }}
        className="px-2 py-1.5 bg-yellow-500 text-white rounded-lg flex items-center justify-center"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => {
          setShowDelete(true);
        }}
        className="px-2 py-1.5 bg-red-500 text-white rounded-lg flex items-center justify-center"
      >
        <FaTrash />
      </button>
      <a
        href={`/admin/cours/${course.id}`}
        className="px-2 py-1.5 bg-green-500 text-white rounded-lg flex items-center justify-center"
      >
        <FaEye />
      </a>

      {showForm && (
        <EditForm
          setShowForm={setShowForm}
          fetchCours={fetchCours}
          categories={categories}
          course={course}
        />
      )}
      {showDelete && (
        <ModalSuppression
          id_cours={course.id}
          setShowDelete={setShowDelete}
          fetchCours={fetchCours}
          categories={categories}
        />
      )}
    </div>
  );
};

export default ActionButtons;
