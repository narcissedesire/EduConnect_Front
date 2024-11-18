import React, { useState } from "react";
import ReplyItem from "./ReplyItem";
import { formatCreatedAt } from "../../FonctionUtile";

export default function CommentList({ comments, fetchCoursId }) {
  const [editingComment, setEditingComment] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [isRepond, setIsRepond] = useState(false);
  const [textReponse, setTextReponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const id_utilisateur = "00c18c33-20b6-4657-8c50-a4c482fd2109";

  const handleRepondToggle = (commentId) => {
    setIsRepond((prev) => (prev === commentId ? null : commentId));
  };

  const handleModifier = (commentId) => {
    setIsEditing((prev) => (prev === commentId ? null : commentId));
  };

  async function handleEditComment(id) {
    try {
      const response = await fetch(`/api/commentaire/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({ text: editingComment }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la modification du commentaire");
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
      const response = await fetch(`/api/commentaire/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du commentaire");
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

  const handleRepondre = async (id) => {
    if (!textReponse) {
      setError("Le commentaire ne peut pas être vide.");
      setSuccessMessage(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/reponseComment/create", {
        method: "POST",
        body: JSON.stringify({
          id_comment: id,
          text: textReponse,
          id_utilisateur,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du commentaire");
      }

      const data = await response.json();
      fetchCoursId();
      setText("");
      setError(null);
      setSuccessMessage(
        "Votre commentaire a été envoyé avec succès !",
        data.message
      );
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      {comments?.commentaires?.map((comment) => (
        <div key={comment.id} className="border-b pb-2 mb-2">
          <div className="flex items-center">
            <img
              src={
                comment.utilisateur.photo
                  ?.filter((image) => image?.isActif === true)
                  ?.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )[0]?.url || "/images/user1.png"
              }
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />

            <span className="font-semibold">
              {comment.utilisateur.nom} {comment.utilisateur.prenom}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              {formatCreatedAt(comment.createdAt)}
            </span>
          </div>

          {isEditing === comment.id ? (
            <input
              type="text"
              value={editingComment}
              placeholder={`modifier à ${comment.text}...`}
              onChange={(e) => setEditingComment(e.target.value)}
              className="border rounded-lg py-2 px-4 flex-grow"
              disabled={loading}
            />
          ) : (
            <p className="text-gray-700 mt-1">{comment.text}</p>
          )}

          <div className="flex mt-2">
            {isEditing === comment.id ? (
              <button
                type="button"
                className="mr-2 text-green-500"
                onClick={() => {
                  handleEditComment(comment.id);
                  setIsEditing(false);
                }}
                disabled={loading}
              >
                Enregistrer
              </button>
            ) : (
              <>
                <button
                  className="mr-2 text-blue-500"
                  onClick={() => handleRepondToggle(comment.id)}
                >
                  Répondre
                </button>
                <button
                  className="mr-2 text-yellow-500"
                  onClick={() => handleModifier(comment.id)}
                  disabled={loading}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="mr-2 text-red-500"
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={loading}
                >
                  {loading ? "Sup..." : "Supprimer"}
                </button>
              </>
            )}
          </div>

          {/* Réponses */}
          {comment.reponses &&
            comment.reponses.map((reponse) => (
              <ReplyItem
                key={reponse.id}
                reponse={reponse}
                setIsRepond={setIsRepond}
                fetchCoursId={fetchCoursId}
              />
            ))}

          {/* Affichage de l'input pour ajouter une réponse */}
          {isRepond === comment.id && (
            <div className="mt-2">
              <input
                type="text"
                className="border rounded-lg py-2 px-4 flex-grow"
                placeholder={`Répondre à ${comment.utilisateur.nom}...`}
                value={textReponse}
                onChange={(e) => setTextReponse(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  handleRepondre(comment.id);
                  setIsRepond(false);
                }}
              >
                {loading ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
