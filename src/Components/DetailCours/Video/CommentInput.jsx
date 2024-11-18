import React, { useState } from "react";

export default function CommentInput({ comments, fetchCoursId }) {
  const [text, setText] = useState("");
  const id_utilisateur = "00c18c33-20b6-4657-8c50-a4c482fd2109";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const id_video = comments.id;

  const createComment = async (e) => {
    e.preventDefault();

    if (!text) {
      setError("Le commentaire ne peut pas être vide.");
      setSuccessMessage(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/commentaire/create", {
        method: "POST",
        body: JSON.stringify({ id_video, text, id_utilisateur }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du commentaire");
      }

      const data = await response.json();

      setText("");
      setError(null);
      setSuccessMessage("Votre commentaire a été envoyé avec succès !", data);
      fetchCoursId();
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center mt-2 mb-4">
      <form onSubmit={createComment}>
        <input
          type="text"
          className="border rounded-lg py-2 px-4 flex-grow"
          placeholder="Laissez un commentaire..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
          disabled={loading}
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
}
