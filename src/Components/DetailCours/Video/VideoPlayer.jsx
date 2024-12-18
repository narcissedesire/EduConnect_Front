import React, { useState, useEffect, useRef } from "react";

export default function VideoPlayer({ video }) {
  const [videoSize, setVideoSize] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [isSubtitlesOn, setIsSubtitlesOn] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef(null);

  useEffect(() => {
    if (video.contenu instanceof File) {
      setVideoSize(video.contenu.size);
    }
  }, [video.contenu]);

  const handleLoadedMetadata = (event) => {
    const videoElement = event.target;
    setVideoDuration(videoElement.duration);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const formatFileSize = (size) => {
    if (!size) return "Inconnu";
    const sizeInKB = size / 1024;
    const sizeInMB = sizeInKB / 1024;
    if (sizeInMB > 1) {
      return `${sizeInMB.toFixed(2)} MB`;
    } else if (sizeInKB > 1) {
      return `${sizeInKB.toFixed(2)} KB`;
    } else {
      return `${size} bytes`;
    }
  };

  const formatVideoDuration = (duration) => {
    if (!duration) return "Inconnu";

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const handleQualityChange = (event) => {
    setSelectedQuality(event.target.value);
  };

  const handleSubtitlesToggle = () => {
    setIsSubtitlesOn((prev) => !prev);
  };

  const handlePlaybackRateChange = (event) => {
    setPlaybackRate(parseFloat(event.target.value));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-semibold text-blue-700">{video.nom}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <video
            ref={videoRef}
            className="w-full h-64 object-cover rounded-lg"
            controls
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={video.contenu} type="video/mp4" />
            {isSubtitlesOn && (
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
            <span>Taille de la vidéo : {formatFileSize(videoSize)}</span>
          </div>
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
            onClick={handleSubtitlesToggle}
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
              onChange={handlePlaybackRateChange}
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
    </div>
  );
}
