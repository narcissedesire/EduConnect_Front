import React from "react";

export default function ReplyItem({
  reply,
  replyIndex,
  commentIndex,
  handleReply,
  handleEditReply,
  handleDeleteReply,
  editingReplyIndex,
  setEditingReplyIndex,
  editingText,
  setEditingText,
}) {
  return (
    <div className="ml-4 mt-2 border-l pl-4">
      <div className="flex items-center">
        <img
          src={reply.userImage}
          alt="Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-semibold">{reply.userName}</span>
        <span className="text-gray-500 text-sm ml-2">{reply.date}</span>
      </div>

      {editingReplyIndex === replyIndex ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          className="border rounded-lg py-2 px-4 flex-grow"
        />
      ) : (
        <p className="text-gray-700 mt-1">{reply.comment}</p>
      )}

      <div className="flex mt-2">
        {editingReplyIndex === replyIndex ? (
          <button
            className="mr-2 text-green-500"
            onClick={() =>
              handleEditReply(commentIndex, replyIndex, editingText)
            }
          >
            Enregistrer
          </button>
        ) : (
          <>
            <button
              className="mr-2 text-yellow-500"
              onClick={() => {
                setEditingText(reply.comment);
                setEditingReplyIndex(replyIndex);
              }}
            >
              Modifier
            </button>
            <button
              className="mr-2 text-red-500"
              onClick={() => handleDeleteReply(commentIndex, replyIndex)}
            >
              Supprimer
            </button>
            <button
              className="mr-2 text-blue-500"
              onClick={() => handleReply(commentIndex, reply.userName)}
            >
              Répondre
            </button>
          </>
        )}
      </div>
    </div>
  );
}
