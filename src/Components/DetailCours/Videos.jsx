import React from "react";
import VideoPlayer from "./Video/VideoPlayer";
import CommentInput from "./Video/CommentInput";
import CommentList from "./Video/CommentList";

export default function Videos({ lessons, fetchCoursId }) {
  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Vidéos</h2>
      {lessons.modules.length > 0 ? (
        lessons.modules.map((module, index) => (
          <div key={index}>
            <h2>Module : {module.nom}</h2>
            {module.videos.length > 0 ? (
              <ul>
                {module.videos.map((video, i) => (
                  <div key={index}>
                    <VideoPlayer video={video} />
                    <CommentInput
                      comments={video}
                      fetchCoursId={fetchCoursId}
                    />
                    <CommentList comments={video} fetchCoursId={fetchCoursId} />
                  </div>
                ))}
              </ul>
            ) : (
              <p>Aucun fichier disponible pour ce module.</p>
            )}
          </div>
        ))
      ) : (
        <p>Aucun module disponible.</p>
      )}
    </div>
  );
}
