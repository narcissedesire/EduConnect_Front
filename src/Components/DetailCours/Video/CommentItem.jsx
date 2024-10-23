import React from "react";
import ReplyItem from "./ReplyItem";
import ReactionButtons from "./ReactionButtons";

export default function CommentItem({
  comment,
  commentIndex,
  reactions,
  replyToIndex,
  setReplyComment,
  replyComment,
  handleReplySubmit,
  handleReply,
  handleEditComment,
  handleDeleteComment,
  setEditingCommentIndex,
  editingCommentIndex,
  editingText,
  setEditingText,
  handleEditReply,
  handleDeleteReply,
  editingReplyIndex,
  setEditingReplyIndex,
}) {
  return (
    <div className="border-b pb-2 mb-2">
      <div className="flex items-center">
        <img
          src={comment.userImage}
          alt="Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-semibold">{comment.userName}</span>
        <span className="text-gray-500 text-sm ml-2">{comment.date}</span>
      </div>

      {editingCommentIndex === commentIndex ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          className="border rounded-lg py-2 px-4 flex-grow"
        />
      ) : (
        <p className="text-gray-700 mt-1">{comment.comment}</p>
      )}

      <div className="flex mt-2">
        {editingCommentIndex === commentIndex ? (
          <button
            className="mr-2 text-green-500"
            onClick={() => handleEditComment(commentIndex, editingText)}
          >
            Enregistrer
          </button>
        ) : (
          <>
            <button
              className="mr-2 text-blue-500"
              onClick={() => handleReply(commentIndex, comment.userName)}
            >
              Répondre
            </button>
            <button
              className="mr-2 text-yellow-500"
              onClick={() => {
                setEditingText(comment.comment);
                setEditingCommentIndex(commentIndex);
              }}
            >
              Modifier
            </button>
            <button
              className="mr-2 text-red-500"
              onClick={() => handleDeleteComment(commentIndex)}
            >
              Supprimer
            </button>
            <ReactionButtons reactions={reactions} />
          </>
        )}
      </div>

      {comment.replies &&
        comment.replies.map((reply, replyIndex) => (
          <ReplyItem
            key={replyIndex}
            reply={reply}
            replyIndex={replyIndex}
            commentIndex={commentIndex}
            handleEditReply={handleEditReply}
            handleDeleteReply={handleDeleteReply}
            editingReplyIndex={editingReplyIndex}
            setEditingReplyIndex={setEditingReplyIndex}
            editingText={editingText}
            setEditingText={setEditingText}
          />
        ))}

      {replyToIndex === commentIndex && (
        <div className="mt-2">
          <input
            type="text"
            className="border rounded-lg py-2 px-4 flex-grow"
            placeholder="Répondre au commentaire..."
            value={replyComment}
            onChange={(e) => setReplyComment(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
            onClick={() => handleReplySubmit(commentIndex)}
          >
            Envoyer
          </button>
        </div>
      )}
    </div>
  );
}
