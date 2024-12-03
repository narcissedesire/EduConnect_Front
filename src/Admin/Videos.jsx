import React from "react";
import VideoPlayer from "./VideoPlayer"; // Assurez-vous que ce composant est correctement importé

export default function Videos({ videos }) {
  return (
    <div className="mt-10 container mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Vidéos</h2>
      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {videos.map((video, index) => (
            <div key={video.id || index} className="mb-4">
              <VideoPlayer video={video} />{" "}
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune vidéo disponible.</p>
      )}
    </div>
  );
}
