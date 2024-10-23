import React from "react";

export default function VideoPlayer({ video }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-blue-700">{video.title}</h3>
      <video className="w-full h-64 object-cover rounded-lg" controls>
        <source src={video.url} type="video/mp4" />
        Votre navigateur ne prend pas en charge la vidéo.
      </video>
    </div>
  );
}
