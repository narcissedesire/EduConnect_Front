// Contact.jsx
import React from "react";
import ContactForm from "../Components/Contact/ContactForm";
import ContactInfo from "../Components/Contact/ContactInfo";
import Map from "../Components/Contact/Map";

export default function Contact() {
  const handleFormSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-3 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Formulaire de contact */}
        <ContactForm onSubmit={handleFormSubmit} />

        {/* Informations de contact et carte */}
        <div className="space-y-8">
          <ContactInfo />
          <div className="bg-white p-5 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Location
            </h3>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}
