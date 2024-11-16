import React, { useState } from "react";
import {
  FaBell,
  FaShieldAlt,
  FaUniversalAccess,
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Parametre() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [platformNotifications, setPlatformNotifications] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSaveChanges = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const handleResetSettings = () => {
    setEmailNotifications(true);
    setPlatformNotifications(true);
    setTheme("dark");
    setFontSize("medium");
    setShowResetModal(false);
    setShowError(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              Préférences de Notification
            </h3>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="mr-3"
              />
              Notifications par e-mail
            </label>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={platformNotifications}
                onChange={() =>
                  setPlatformNotifications(!platformNotifications)
                }
                className="mr-3"
              />
              Notifications sur la plateforme
            </label>
          </div>
        );

      case "security":
        return (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              Sécurité et Confidentialité
            </h3>
            <label className="block mb-4">
              <span className="text-gray-300">Changer le mot de passe</span>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                className="w-full bg-gray-700 text-gray-200 p-2 rounded mt-2 focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <button
              onClick={() => setShowError(true)}
              className="bg-red-500 text-gray-100 px-3 py-1 rounded hover:bg-red-600 focus:outline-none transition duration-300 mt-4"
            >
              Réinitialiser le mot de passe
            </button>
          </div>
        );

      case "accessibility":
        return (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              Thème et Accessibilité
            </h3>
            <label className="block mb-4">
              <span className="text-gray-300">Thème</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 p-2 rounded mt-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">Sombre</option>
                <option value="light">Clair</option>
              </select>
            </label>
            <label className="block mb-4">
              <span className="text-gray-300">Taille de police</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 p-2 rounded mt-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Petite</option>
                <option value="medium">Moyenne</option>
                <option value="large">Grande</option>
              </select>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 text-gray-200 p-8 rounded-lg shadow-lg w-full mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-blue-400">
        Paramètres et Préférences
      </h2>

      {/* Onglets de navigation avec icônes */}
      <div className="flex gap-4 flex-wrap mb-8">
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === "notifications"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300"
          } transition duration-300`}
        >
          <FaBell />
          <span>Notifications</span>
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === "security"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300"
          } transition duration-300`}
        >
          <FaShieldAlt />
          <span>Sécurité</span>
        </button>
        <button
          onClick={() => setActiveTab("accessibility")}
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === "accessibility"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300"
          } transition duration-300`}
        >
          <FaUniversalAccess />
          <span>Accessibilité</span>
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-inner transition-all duration-300">
        {renderTabContent()}
      </div>

      {/* Boutons de sauvegarde et de réinitialisation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setShowResetModal(true)}
          className="bg-red-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition duration-300"
        >
          <FaTrashAlt className="inline mr-2" /> Réinitialiser
        </button>
        <button
          onClick={handleSaveChanges}
          className="bg-green-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none transition duration-300"
        >
          Sauvegarder les modifications
        </button>
      </div>

      {/* Notification de confirmation */}
      {showConfirmation && (
        <div className="mt-4 flex items-center justify-center bg-green-600 text-gray-100 p-3 rounded-lg">
          <FaCheckCircle className="mr-2" />
          <span>Paramètres enregistrés avec succès !</span>
        </div>
      )}

      {/* Notification d'erreur */}
      {showError && (
        <div className="mt-4 flex items-center justify-center bg-red-600 text-gray-100 p-3 rounded-lg">
          <FaTimesCircle className="mr-2" />
          <span>Erreur lors de la réinitialisation du mot de passe.</span>
        </div>
      )}

      {/* Modal de confirmation pour réinitialiser */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">
              Confirmer la réinitialisation
            </h3>
            <p className="text-gray-400 mb-6">
              Êtes-vous sûr de vouloir réinitialiser tous les paramètres ? Cette
              action est irréversible.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="bg-gray-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none transition duration-300"
              >
                Annuler
              </button>
              <button
                onClick={handleResetSettings}
                className="bg-red-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition duration-300"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
