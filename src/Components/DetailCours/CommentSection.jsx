import React from "react";
import {
  FaStar,
  FaThumbsUp,
  FaHeart,
  FaHandshake,
  FaThumbsDown,
} from "react-icons/fa";

export default function CommentSection({ reactions, handleReaction }) {
  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8 bg-gray-200 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Avis</h2>
      <div className="space-y-4">
        {reactions.length > 0 ? (
          reactions.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex items-start space-x-4 hover:bg-gray-50 transition"
            >
              <img
                className="w-12 h-12 rounded-full border-2 border-blue-500"
                src={review.userImage}
                alt={review.userName}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.userName}
                </h3>
                <div className="flex text-yellow-500 mb-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-500">{review.comment}</p>
                <p className="text-gray-400 text-xs">{review.date}</p>

                {/* Section pour les réactions */}
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <button
                      className="flex items-center text-blue-600 hover:underline"
                      onClick={() => handleReaction(index, "like")}
                    >
                      <FaThumbsUp className="mr-1" />
                    </button>
                    <span className="text-gray-600">{review.likes}</span>
                  </div>

                  <div className="flex items-center">
                    <button
                      className="flex items-center text-red-500 hover:underline"
                      onClick={() => handleReaction(index, "heart")}
                    >
                      <FaHeart className="mr-1" />
                    </button>
                    <span className="text-gray-600">{review.hearts}</span>
                  </div>

                  <div className="flex items-center">
                    <button
                      className="flex items-center text-green-600 hover:underline"
                      onClick={() => handleReaction(index, "support")}
                    >
                      <FaHandshake className="mr-1" />
                    </button>
                    <span className="text-gray-600">{review.supports}</span>
                  </div>

                  <div className="flex items-center">
                    <button
                      className="flex items-center text-gray-600 hover:underline"
                      onClick={() => handleReaction(index, "dislike")}
                    >
                      <FaThumbsDown className="mr-1" />
                    </button>
                    <span className="text-gray-600">{review.dislikes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Aucun avis disponible.</p>
        )}
      </div>
    </div>
  );
}
