import React, {useRef, useState} from "react";
import {convertMillisecondsToTime} from "../utils/functions";
const PlayAudioWithLyrics = (props) => {
  const { url, transcripts } = props;
  const audioRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleListen = (e) => {
    const currentTime = e * 1000;
    const currentTimeIndex = transcripts.findIndex(
      (item) => currentTime >= item.startTime && currentTime <= item.endTime
    );
    if (currentTimeIndex >= 0) {
        const containerRef = document.getElementById("scriptContainer");
        const itemRef = document.getElementById(
            `scriptItem-${currentTimeIndex}`
        );
        if (containerRef && itemRef) {
            containerRef.scrollTop = itemRef.offsetTop - 200;
        }
        setCurrentIndex(currentTimeIndex);
    }
  };
    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime * 1000;
        const currentTimeIndex = transcripts.findIndex(
            (item) => currentTime >= item.startTime && currentTime <= item.endTime
        );
        if (currentTimeIndex >= 0) {
            const containerRef = document.getElementById("scriptContainer");
            const itemRef = document.getElementById(
                `scriptItem-${currentTimeIndex}`
            );
            if (containerRef && itemRef) {
                containerRef.scrollTop = (itemRef.offsetTop - containerRef.offsetTop) - 100;
            }
            setCurrentIndex(currentTimeIndex);
        }
    };
    const onPlayTime = (time) => {
        audioRef.current.currentTime = time/1000;
        if (audioRef.current.paused) {
            audioRef.current.play();
        }
    }
  return (
      <div className="w-full h-full flex flex-col m-auto max-w-[600px]">
        <div className="flex items-center justify-center h-[80px]">
            <audio
                controls
                autoPlay
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
            >
                <source src={url} />
            </audio>
        </div>
        <div id="scriptContainer" className="flex-1 overflow-y-auto max-w-full">
            {transcripts.map((item, index) => {
                const isActive = index === currentIndex
                return (
                    <div onClick={() => {
                        onPlayTime(item.startTime)
                    }} id={`scriptItem-${index}`} className={`cursor-pointer flex items-center border-b-[1px] border-b-gray-500 px-1 ${isActive ? 'bg-gray-500 text-white' : 'hover:bg-gray-500 hover:text-white'}`}>
                        <div className='min-w-[80px] flex items-center'>
                            <div  className={`text-md rounded-lg border px-2 ${isActive ? 'border-white-500': 'border-gray-500'}`}>
                                {convertMillisecondsToTime(item.startTime)}
                            </div>
                        </div>
                        <div
                            className={`flex-1 text-md py-[10px] px-[5px]  ${
                                isActive ? "font-bold" : ""
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

export default PlayAudioWithLyrics;
