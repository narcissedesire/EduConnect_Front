import React, { useState } from "react";
import { formatCreatedAt } from "../../FonctionUtile";

export default function ReplyItem({ reponse, setIsRepond, fetchCoursId }) {
  const [editingComment, setEditingComment] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleModifier = (commentId) => {
    setIsEditing((prev) => (prev === commentId ? null : commentId));
  };

  async function handleEditComment(id) {
    console.log(id);
    try {
      const response = await fetch(`/api/reponseComment/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({ text: editingComment }),
      });
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la modification de la reponse du commentaire"
        );
      }

      const data = await response.json();
      fetchCoursId();
      setText("");
      setError(null);
      setSuccessMessage("Modification du commentaire reussi", data);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteComment(id) {
    try {
      console.log(id);
      const response = await fetch(`/api/reponseComment/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la suppression de la reponse du commentaire"
        );
      }
      const data = await response.json();
      fetchCoursId();
      setError(null);
      setSuccessMessage(data.message);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="ml-4 mt-2 border-l pl-4">
      <div className="flex items-center">
        <img
          src={
            reponse.utilisateur.photo
              ?.filter((image) => image?.isActif === true)
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
              ?.url || "/images/user1.png"
          }
          alt="Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-semibold">
          {reponse.utilisateur.nom} {reponse.utilisateur.prenom}
        </span>
        <span className="text-gray-500 text-sm ml-2">
          {formatCreatedAt(reponse.createdAt)}
        </span>
      </div>

      {isEditing === reponse.id ? (
        <input
          type="text"
          value={editingComment}
          onChange={(e) => setEditingComment(e.target.value)}
          className="border rounded-lg py-2 px-4 flex-grow"
          disabled={loading}
        />
      ) : (
        <p className="text-gray-700 mt-1">{reponse.text}</p>
      )}

      <div className="flex mt-2">
        {isEditing === reponse.id ? (
          <button
            type="button"
            className="mr-2 text-green-500"
            onClick={() => {
              handleEditComment(reponse.id);
              setIsEditing(false);
            }}
            // disabled={loading}
          >
            Enregistrer
          </button>
        ) : (
          <>
            <button
              className="mr-2 text-blue-500"
              onClick={() => setIsRepond(true)}
            >
              Répondre
            </button>
            <button
              className="mr-2 text-yellow-500"
              onClick={() => {
                handleModifier(reponse.id);
                // setIsEditing(false);
              }}
              // disabled={loading}
            >
              Modifier
            </button>
            <button
              type="button"
              className="mr-2 text-red-500"
              onClick={() => handleDeleteComment(reponse.id)}
              // disabled={loading}
            >
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
