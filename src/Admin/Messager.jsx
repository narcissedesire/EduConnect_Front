import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "../Components/Messages/Message";
import { io } from "socket.io-client";

export default function Messager({ conversations }) {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arivalMessage, setArivalMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    // Ajouter l'utilisateur connecté
    socket.current.emit("addUser", user.id);

    // Recevoir un message en temps réel
    socket.current.on("getMessage", (data) => {
      if (data.id_conversation === id) {
        setArrivalMessage({
          id_sender: data.id_sender,
          text: data.text,
          createdAt: data.createdAt,
        });
      }
    });

    return () => {
      socket.current.disconnect(); // Nettoyage à la déconnexion
    };
  }, [id, user.id]);

  useEffect(() => {
    if (arivalMessage) {
      setMessages((prev) => [...prev, arivalMessage]);
      scrollToBottom(); // Défilement automatique vers le bas
    }
  }, [arivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", id);
    socket.current.on("getUser", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const conversation = conversations.find((conv) => conv.id === id);
    if (conversation) {
      setMessages(conversation.messages || []);
    }
    scrollToBottom(); // Défilement initial
  }, [id, conversations]);

  useEffect(() => {
    scrollToBottom(); // Défilement à chaque nouveau message
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id_sender: user.id,
      text: newMessage,
      id_conversation: id,
      createdAt: new Date().toISOString(),
    };

    // Envoyer le message via Socket.io
    socket.current.emit("sendMessage", newMsg);

    try {
      const response = await fetch("/api/message/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });

      if (response.ok) {
        setMessages((prev) => [...prev, newMsg]); // Mise à jour locale des messages
        setNewMessage(""); // Réinitialiser le champ de saisie
      } else {
        console.error("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="h-full p-2.5 flex flex-col justify-between">
      <div className="h-full overflow-y-auto">
        {messages.map((msg, index) => (
          <Message
            key={index}
            own={msg.id_sender === user.id}
            text={msg.text}
            createdAt={msg.createdAt}
          />
        ))}
        {/* Élément invisible pour forcer le défilement */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-2 flex items-center">
        <textarea
          className="flex-grow h-12 border p-2 outline-none"
          placeholder="Votre message..."
          value={newMessage}
          required
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white">
          Envoyer
        </button>
      </form>
    </div>
  );
}
