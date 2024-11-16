import React from "react";

const NotificationItem = ({ notification, onToggleRead }) => (
  <div
    className={`flex justify-between items-center p-4 rounded-lg border ${
      notification.read ? "bg-white" : "bg-gray-50"
    } transition-shadow duration-300 hover:shadow-lg`}
  >
    <div className="flex items-center">
      <span
        className={`text-xl mr-2 ${
          notification.important ? "text-red-500" : "text-yellow-500"
        }`}
      >
        {notification.important ? "⚠️" : "⏰"}
      </span>
      <span
        className={`font-medium ${
          notification.important ? "font-bold text-red-600" : "text-gray-800"
        }`}
      >
        <span className="font-bold">{notification.from}: </span>
        {notification.text}
      </span>
      <span className="text-sm text-gray-500 ml-2">{notification.date}</span>
    </div>
    <button
      className={`text-sm ${
        notification.read ? "text-gray-500" : "text-blue-500"
      } hover:underline`}
      onClick={() => onToggleRead(notification.id)}
    >
      {notification.read ? "Marquer comme non lu" : "Marquer comme lu"}
    </button>
  </div>
);

export default NotificationItem;
