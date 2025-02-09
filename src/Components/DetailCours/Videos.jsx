import React from "react";
import VideoPlayer from "./Video/VideoPlayer";
import CommentInput from "./Video/CommentInput";
import CommentList from "./Video/CommentList";

export default function Videos({ videos }) {
  return (
    <div className="mt-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Vidéos</h2>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index}>
            <h2>Module : {video.nom}</h2>
            <ul>
              <div key={index}>
                <VideoPlayer video={video} />
                <CommentInput comments={video} />
                <CommentList comments={video} />
              </div>
            </ul>
          </div>
        ))
      ) : (
        <p>Pas de video disponible</p>
      )}
    </div>
  );
}
