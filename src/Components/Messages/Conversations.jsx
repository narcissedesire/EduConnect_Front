import React from "react";
import { useNavigate } from "react-router-dom";

export default function Conversations({ conversations }) {
  const navigate = useNavigate();
  if (!Array.isArray(conversations)) {
    return <p>Aucune conversation disponible.</p>; // Message alternatif
  }

  return (
    <div>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="flex items-center p-2.5 gap-3 hover:bg-gray-100 mt-3 cursor-pointer"
          onClick={() => navigate(`/admin/message/${conv.id}`)}
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={conv.withUser.id_photo || "/images/logo.png"}
            alt={`${conv.withUser.nom} ${conv.withUser.prenom}`}
          />
          <span className="font-medium">{`${conv.withUser.nom} ${conv.withUser.prenom}`}</span>
        </div>
      ))}
    </div>
  );
}
