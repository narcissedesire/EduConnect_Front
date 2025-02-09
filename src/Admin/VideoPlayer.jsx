import React, { useState, useEffect, useRef } from "react";
import { Port } from "../Port";

export default function VideoPlayer({ video }) {
  const [videoDuration, setVideoDuration] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [isSubtitlesOn, setIsSubtitlesOn] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef(null);

  const handleLoadedMetadata = () => {
    setVideoDuration(videoRef.current.duration);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const formatVideoDuration = (duration) => {
    if (!duration) return "Inconnu";
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${
      minutes > 0 ? `${minutes}m ` : ""
    }${seconds}s`;
  };

  const handleQualityChange = (event) => {
    setSelectedQuality(event.target.value);
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md space-y-3 border">
      <h3 className="text-xl font-semibold text-blue-700">{video.nom}</h3>
      <div className="flex gap-3">
        <div>
          <video
            ref={videoRef}
            className="w-full h-64 object-cover rounded-lg"
            controls
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source
              src={`${Port}/public/videos/${video.liens}`}
              type="video/mp4"
            />
            {isSubtitlesOn && video.subtitles && (
              <track
                kind="subtitles"
                src={video.subtitles}
                srcLang="en"
                label="English"
              />
            )}
            Votre navigateur ne prend pas en charge la vidéo.
          </video>
        </div>

        <div className="flex flex-col gap-2 text-gray-600">
          <div>
            <span>
              Durée de la vidéo : {formatVideoDuration(videoDuration)}
            </span>
          </div>

          <div>
            <label className="text-gray-600 mr-2">Qualité vidéo:</label>
            <select
              value={selectedQuality}
              onChange={handleQualityChange}
              className="p-2 border rounded"
            >
              <option value="1080p">1080p</option>
              <option value="720p">720p</option>
              <option value="480p">480p</option>
            </select>
          </div>

          <button
            onClick={() => setIsSubtitlesOn((prev) => !prev)}
            className={`px-4 py-2 rounded-lg ${
              isSubtitlesOn ? "bg-green-500" : "bg-gray-500"
            } text-white`}
          >
            {isSubtitlesOn
              ? "Désactiver les sous-titres"
              : "Activer les sous-titres"}
          </button>

          <div>
            <label className="text-gray-600 mr-2">Vitesse de lecture:</label>
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="p-2 border rounded"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>
      </div>
      <span>{video.description}</span>
    </div>
  );
}
