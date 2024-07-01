import React from "react";
import { Video } from "../types";
import "./VideoCard.css";

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="video-card">
      <img src={video.image_url} alt={video.title} />
      <div className="video-card-details">
        <p>{video.title}</p>
        <p>{video.artist}</p>
        <p>{video.release_year}</p>
      </div>
    </div>
  );
};

export default VideoCard;
