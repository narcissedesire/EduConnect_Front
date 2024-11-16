import React from "react";

const NotificationPopup = ({ tempNotifications, tempMessages }) => (
  <div className="w-full">
    {tempNotifications.map((notification) => (
      <div
        key={notification.id}
        className="bg-yellow-300 p-3 rounded-lg shadow-md transition-opacity duration-500"
      >
        <span className="font-bold">{notification.from}: </span>
        <span>{notification.text}</span>
      </div>
    ))}
    {tempMessages.map((message) => (
      <div
        key={message.id}
        className="bg-blue-300 p-3 rounded-lg shadow-md transition-opacity duration-500"
      >
        <span className="font-bold">{message.from}: </span>
        <span>{message.text}</span>
      </div>
    ))}
  </div>
);

export default NotificationPopup;
