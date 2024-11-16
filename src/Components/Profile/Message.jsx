import React from "react";

const MessageItem = ({ message }) => (
  <li
    className={`flex ${
      message.from === "Vous" ? "justify-end" : "justify-start"
    } mb-2`}
  >
    <div
      className={`p-4 rounded-lg max-w-xs ${
        message.from === "Vous"
          ? "bg-blue-500 text-white"
          : "bg-gray-300 text-black"
      }`}
    >
      <span className="font-bold">{message.from}</span>
      <p>{message.text}</p>
      <span className="text-sm text-gray-500">{message.date}</span>
    </div>
  </li>
);

export default MessageItem;
