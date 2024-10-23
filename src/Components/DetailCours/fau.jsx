import React, { useState } from "react";
import { FaHandshake, FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

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
  editingCommentIndex,
  setEditingCommentIndex,
  editingReplyIndex,
  setEditingReplyIndex,
  handleEditComment,
  handleEditReply,
  handleDeleteComment,
  handleDeleteReply,
}) {
  const [editingText, setEditingText] = useState("");

  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Vidéos</h2>
      {lesson.videos && lesson.videos.length > 0 ? (
        lesson.videos.map((video, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700">
              {video.title}
            </h3>
            <video className="w-full h-64 object-cover rounded-lg" controls>
              <source src={video.url} type="video/mp4" />
              Votre navigateur ne prend pas en charge la vidéo.
            </video>

            {/* Commentaires */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Commentaires</h4>
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
              <div className="space-y-4">
                {comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="border-b pb-2 mb-2">
                    <div className="flex items-center">
                      <img
                        src={comment.userImage}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-semibold">{comment.userName}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {comment.date}
                      </span>
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
                          onClick={() =>
                            handleEditComment(commentIndex, editingText)
                          }
                        >
                          Enregistrer
                        </button>
                      ) : (
                        <>
                          <button
                            className="mr-2 text-blue-500"
                            onClick={() => setReplyToIndex(commentIndex)}
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
                        </>
                      )}
                    </div>

                    {/* Réponses */}
                    {comment.replies &&
                      comment.replies.map((reply, replyIndex) => (
                        <div
                          key={replyIndex}
                          className="ml-4 mt-2 border-l pl-4"
                        >
                          <div className="flex items-center">
                            <img
                              src={reply.userImage}
                              alt="Avatar"
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="font-semibold">
                              {reply.userName}
                            </span>
                            <span className="text-gray-500 text-sm ml-2">
                              {reply.date}
                            </span>
                          </div>

                          {editingReplyIndex === replyIndex ? (
                            <input
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="border rounded-lg py-2 px-4 flex-grow"
                            />
                          ) : (
                            <p className="text-gray-700 mt-1">
                              {reply.comment}
                            </p>
                          )}

                          <div className="flex mt-2">
                            {editingReplyIndex === replyIndex ? (
                              <button
                                className="mr-2 text-green-500"
                                onClick={() =>
                                  handleEditReply(
                                    commentIndex,
                                    replyIndex,
                                    editingText
                                  )
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
                                  onClick={() =>
                                    handleDeleteReply(commentIndex, replyIndex)
                                  }
                                >
                                  Supprimer
                                </button>
                              </>
                            )}
                          </div>
                        </div>
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
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Aucune vidéo disponible.</p>
      )}
    </div>
  );
}
