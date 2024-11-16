import React, { useState } from "react";
import {
  FaUserEdit,
  FaEnvelope,
  FaBirthdayCake,
  FaFlag,
  FaCamera,
} from "react-icons/fa";

export default function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Nom de l'Étudiant",
    email: "etudiant@example.com",
    birthday: "01/01/2000",
    country: "France",
    photo: "https://via.placeholder.com/100",
  });
  const [newPhoto, setNewPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setNewPhoto(photoURL); // Preview photo
    }
  };

  const saveChanges = () => {
    if (newPhoto) {
      setProfile((prevProfile) => ({ ...prevProfile, photo: newPhoto }));
    }
    setIsEditing(false);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setNewPhoto(null); // Reset preview if editing is canceled
    }
  };

  return (
    <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-lg w-full mx-auto transition duration-300 hover:shadow-2xl">
      {/* Header avec photo de profil et nom */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={newPhoto || profile.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-2xl font-semibold text-gray-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
          )}
          <p className="text-gray-400">Rôle : Étudiant</p>
        </div>
      </div>

      {/* Informations principales */}
      <div className="mt-6 space-y-4">
        {/* Adresse E-mail */}
        <div className="flex items-center justify-between space-x-3">
          <span className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500" />
            <span className="font-medium text-gray-300 -mt-1">
              Adresse E-mail :
            </span>
          </span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/5"
            />
          ) : (
            <span className="text-gray-400">{profile.email}</span>
          )}
        </div>

        {/* Date de naissance */}
        <div className="flex items-center justify-between space-x-3">
          <span className="flex items-center gap-3">
            <FaBirthdayCake className="text-blue-500" />
            <span className="font-medium text-gray-300">
              Date de naissance :
            </span>
          </span>
          {isEditing ? (
            <input
              type="date"
              name="birthday"
              value={profile.birthday}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/5"
            />
          ) : (
            <span className="text-gray-400">{profile.birthday}</span>
          )}
        </div>

        {/* Pays */}
        <div className="flex items-center justify-between space-x-3">
          <span className="flex items-center gap-3">
            <FaFlag className="text-blue-500" />
            <span className="font-medium text-gray-300">Pays :</span>
          </span>
          {isEditing ? (
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/5"
            />
          ) : (
            <span className="text-gray-400">{profile.country}</span>
          )}
        </div>
      </div>

      {/* Boutons d'édition et de sauvegarde */}
      <div className="mt-6 text-right">
        {isEditing ? (
          <button
            onClick={saveChanges}
            className="bg-green-500 text-gray-100 px-4 py-2 rounded hover:bg-green-600 focus:outline-none transition duration-200 mr-2"
          >
            Sauvegarder
          </button>
        ) : null}
        <button
          onClick={toggleEditing}
          className="bg-blue-500 text-gray-100 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none transition duration-200"
        >
          {isEditing ? "Annuler" : <FaUserEdit className="inline-block mr-2" />}
          {isEditing ? "" : "Modifier"}
        </button>
      </div>
    </div>
  );
}
