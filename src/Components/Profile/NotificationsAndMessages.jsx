import React, { useState, useEffect } from "react";
import NotificationPopup from "./NotificationPopup";
import NotificationItem from "./Notification";
import MessageItem from "./Message";
import MessageInput from "./MessageInput";

const NotificationsAndMessages = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Nouveau contenu disponible sur le cours de Mathématiques.",
      date: "2024-10-29",
      important: true,
      read: false,
      from: "Système",
    },
    {
      id: 2,
      text: "Rappel : Échéance de remise de projet le 5 novembre.",
      date: "2024-10-28",
      important: false,
      read: false,
      from: "Système",
    },
    {
      id: 3,
      text: "Mise à jour de votre évaluation de cours.",
      date: "2024-10-27",
      important: true,
      read: true,
      from: "Enseignant",
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Enseignant",
      text: "Bonjour ! N’oubliez pas de soumettre votre devoir.",
      date: "2024-10-29",
      read: false,
      type: "personal",
    },
    {
      id: 2,
      from: "Administration",
      text: "Votre inscription a été confirmée.",
      date: "2024-10-28",
      read: true,
      type: "personal",
    },
    {
      id: 3,
      from: "Groupe Mathématiques",
      text: "Réunion de groupe prévue demain à 14h.",
      date: "2024-10-30",
      read: false,
      type: "group",
    },
  ]);

  const [tempNotifications, setTempNotifications] = useState([]);
  const [tempMessages, setTempMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleToggleRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        from: "Vous",
        text: newMessage,
        date: new Date().toLocaleDateString(),
        read: false,
      };
      setMessages([...messages, newMsg]);
      setTempMessages([{ ...newMsg, temporary: true }, ...tempMessages]);
      setNewMessage("");

      setTimeout(() => {
        setTempMessages((tempMessages) =>
          tempMessages.filter((msg) => !msg.temporary)
        );
      }, 3000);
    }
  };

  useEffect(() => {
    const exampleNotification = {
      id: notifications.length + 1,
      text: "Vous avez un nouveau message !",
      date: new Date().toLocaleDateString(),
      important: false,
      read: false,
      from: "Administration",
    };
    setTempNotifications([...tempNotifications, exampleNotification]);
    setTimeout(() => {
      setTempNotifications((tempNotifications) =>
        tempNotifications.filter((n) => n.id !== exampleNotification.id)
      );
    }, 3000);
  }, []);

  return (
    <div className="ml-72 bg-gray-200 p-6 rounded-lg shadow-md">
      <NotificationPopup
        tempNotifications={tempNotifications}
        tempMessages={tempMessages}
      />

      <h2 className="text-2xl font-bold mb-4 text-center">
        Notifications et Messages
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Notifications</h3>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onToggleRead={handleToggleRead}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Messages</h3>
        <ul className="space-y-2">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ul>
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default NotificationsAndMessages;
