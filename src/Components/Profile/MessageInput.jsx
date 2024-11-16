import React from "react";

const MessageInput = ({ newMessage, setNewMessage, onSend }) => (
  <div className="mt-4">
    <textarea
      className="w-full border rounded-lg p-2 mb-2"
      placeholder="Écrivez votre message ici..."
      rows="3"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
    />
    <button
      className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
      onClick={onSend}
    >
      Envoyer
    </button>
  </div>
);

export default MessageInput;
