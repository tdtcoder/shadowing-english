import React, { useState } from "react";

import ReactAudioPlayer from "react-audio-player";
const PlayAudioWithLyrics = (props) => {
  const { audio, transcripts } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleListen = (e) => {
    const currentTime = e * 1000;
    const currentTimeIndex = transcripts.findIndex(
      (item) => currentTime >= item.startTime && currentTime <= item.endTime
    );
    if (currentTimeIndex >= 0) setCurrentIndex(currentTimeIndex);
  };
  return (
    <>
      <div className="flex-1 text-md p-1 overflow-y-auto">
        {transcripts.map((item, index) => {
          return (
            <div
              className={`text-xs ${index === currentIndex ? "font-bold" : ""}`}
            >
              {item.text}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-2">
        <ReactAudioPlayer
          src={audio}
          autoPlay
          controls
          onListen={handleListen}
          listenInterval={1000}
        />
      </div>
    </>
  );
};

export default PlayAudioWithLyrics;
