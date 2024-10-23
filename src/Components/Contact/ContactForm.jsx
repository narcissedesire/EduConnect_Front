// ContactForm.jsx
import React, { useState } from "react";

export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-2 sm:p-10 shadow-md rounded-lg">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
        Contactez-nous
      </h2>
      <p className="text-gray-600 mb-3">
        <b> Nous sommes à votre écoute !</b> Pour toute question ou suggestion,
        remplissez le formulaire ci-dessous. Vous pouvez également nous
        contacter directement par téléphone ou par email pour une réponse
        rapide.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5 mt">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              placeholder="John"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="johndoe@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Écrivez votre message ici..."
            rows="5"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200"
          >
            Envoyer le message
          </button>
        </div>
      </form>
    </div>
  );
}
