import React, { useRef, useState } from "react";
import { Player } from "video-react";
// import "video-react/dist/video-react.css"; // import css

const PlayVideoWithLyrics = (props) => {
  const { url, transcripts } = props;
  const playRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTimeUpdate = () => {
    const currentTime = playRef.current.currentTime * 1000;
    const currentTimeIndex = transcripts.findIndex(
      (item) => currentTime >= item.startTime && currentTime <= item.endTime
    );
    if (currentTimeIndex >= 0) setCurrentIndex(currentTimeIndex);
  };
  return (
    <div className="w-full h-full flex-1 flex flex-col lg:flex-row">
      <div className="h-[320px] lg:h-full">
        <video
          className="h-full"
          controls
          autoPlay
          ref={playRef}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={url} type="video/mp4" />
        </video>
      </div>
      <div className="flex-1 cursor-pointer overflow-y-auto max-w-[600px] min-w-[480px] p-[10px]">
        {transcripts.map((item, index) => {
          return (
            <div>
              <div
              className={`text-lg py-[10px] border-b-[1px] border-b-gray-400 ${
                index === currentIndex ? "font-bold" : ""
              }`}
            >
              {item.text}
            </div>
              </div>

          );
        })}
      </div>
    </div>
  );
};

export default PlayVideoWithLyrics;
