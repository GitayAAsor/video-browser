import React from "react";
import { Video } from "../types";
import VideoCard from "./VideoCard";
import "./VideoList.css";

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  if (videos.length === 0) {
    return <p>No videos were found</p>;
  }

  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
