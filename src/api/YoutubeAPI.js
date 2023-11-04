import React from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoId }) => {
  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // Set to 1 for autoplay
    },
  };

  return (
    <div className="md:order-first">
      <div className="bg-black bg-opacity-25 rounded-lg p-4">
        <YouTube videoId={videoId} opts={opts} />
      </div>
    </div>
  );
};

export default YouTubeVideo;
