// ContactInfo.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="bg-white p-2 sm:p-10 shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Contactez-nous
      </h3>
      <ul className="space-y-4">
        <li className="flex items-center text-gray-700">
          <FaEnvelope className="text-blue-600 mr-3" />
          johndoe@example.com
        </li>
        <li className="flex items-center text-gray-700">
          <FaPhone className="text-blue-600 mr-3" />
          +123 456 789
        </li>
        <li className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="text-blue-600 mr-3" />
          Antananarivo, Madagascar
        </li>
      </ul>
    </div>
  );
}
