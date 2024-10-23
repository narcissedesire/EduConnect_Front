import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { enseignants } from "../Data";

export default function PresentationEnseignant() {
  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-500 mb-12">
          Nos Enseignants Experts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
          {enseignants.map((enseignant, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={enseignant.image}
                alt={enseignant.nom}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {enseignant.nom}
                </h3>
                <p className="text-blue-500 text-sm uppercase">
                  {enseignant.specialite}
                </p>
                <p className="text-gray-600">{enseignant.bio}</p>
                <div className="flex space-x-4 mt-4">
                  {enseignant.socials.linkedin && (
                    <a
                      href={enseignant.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="text-blue-700 hover:text-blue-500 text-xl" />
                    </a>
                  )}
                  {enseignant.socials.twitter && (
                    <a
                      href={enseignant.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="text-blue-400 hover:text-blue-300 text-xl" />
                    </a>
                  )}
                  {enseignant.socials.facebook && (
                    <a
                      href={enseignant.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="text-blue-600 hover:text-blue-400 text-xl" />
                    </a>
                  )}
                  {enseignant.socials.instagram && (
                    <a
                      href={enseignant.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="text-pink-500 hover:text-pink-400 text-xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
