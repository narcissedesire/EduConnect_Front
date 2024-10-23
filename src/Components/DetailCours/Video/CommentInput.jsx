import React from "react";

export default function CommentInput({
  newComment,
  setNewComment,
  handleCommentSubmit,
}) {
  return (
    <div className="flex items-center mt-2 mb-4">
      <input
        type="text"
        className="border rounded-lg py-2 px-4 flex-grow"
        placeholder="Laissez un commentaire..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
        onClick={handleCommentSubmit}
      >
        Envoyer
      </button>
    </div>
  );
}
