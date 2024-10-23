import React from "react";
import { FaHandshake, FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function ReactionButtons({ reactions }) {
  return (
    <span className="text-gray-500 text-sm">
      <FaThumbsUp className="inline" /> {reactions.likes}{" "}
      <FaHeart className="inline" /> {reactions.hearts}{" "}
      <FaHandshake className="inline" /> {reactions.supports}{" "}
      <FaThumbsDown className="inline" /> {reactions.dislikes}
    </span>
  );
}
