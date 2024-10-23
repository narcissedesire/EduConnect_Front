import React from "react";
import VideoPlayer from "./Video/VideoPlayer";
import CommentInput from "./Video/CommentInput";
import CommentList from "./Video/CommentList";

export default function Videos({
  lesson,
  comments,
  handleCommentSubmit,
  reactions,
  handleReaction,
  setNewComment,
  newComment,
  setReplyToIndex,
  replyToIndex,
  setReplyComment,
  replyComment,
  handleReplySubmit,
  handleReply,
  replyingToUser,
  handleEditComment,
  handleEditReply,
  handleDeleteComment,
  handleDeleteReply,
  editingCommentIndex,
  setEditingCommentIndex,
  editingReplyIndex,
  setEditingReplyIndex,
  editingText,
  setEditingText,
}) {
  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Vidéos</h2>
      {lesson.videos && lesson.videos.length > 0 ? (
        lesson.videos.map((video, index) => (
          <div key={index}>
            <VideoPlayer video={video} />
            <CommentInput
              newComment={newComment}
              setNewComment={setNewComment}
              handleCommentSubmit={handleCommentSubmit}
            />
            <CommentList
              comments={comments}
              reactions={reactions}
              replyToIndex={replyToIndex}
              setReplyComment={setReplyComment}
              replyComment={replyComment}
              handleReplySubmit={handleReplySubmit}
              handleReply={handleReply}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              setEditingCommentIndex={setEditingCommentIndex}
              editingCommentIndex={editingCommentIndex}
              editingText={editingText}
              setEditingText={setEditingText}
              handleEditReply={handleEditReply}
              handleDeleteReply={handleDeleteReply}
              editingReplyIndex={editingReplyIndex}
              setEditingReplyIndex={setEditingReplyIndex}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-600">Aucune vidéo disponible.</p>
      )}
    </div>
  );
}
