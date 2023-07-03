import React, {useRef, useState} from "react";
import {Player} from "video-react";
import {convertMillisecondsToTime} from "../utils/functions";
// import "video-react/dist/video-react.css"; // import css

const PlayVideoWithLyrics = (props) => {
    const {url, transcripts} = props;
    const playRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleTimeUpdate = () => {
        const currentTime = playRef.current.currentTime * 1000;
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
        playRef.current.currentTime = time/1000;
        if (playRef.current.paused) {
            playRef.current.play();
        }
    }
    const currentScript = transcripts[currentIndex]
    return (
        <div className="w-full h-full flex flex-col lg:flex-row">
            <div className="h-[240px] sm:h-[320px] lg:h-full relative flex flex-col items-center p-[10px]">
                <video
                    className="h-full"
                    controls
                    autoPlay
                    ref={playRef}
                    onTimeUpdate={handleTimeUpdate}
                >
                    <source src={url} type="video/mp4"/>
                </video>
                <div className="absolute bottom-[40px] text-center text-md lg:text-2xl bg-gray-500 text-white py-[5px] px-[10px]">
                    {currentScript.text}
                </div>
            </div>
            <div id="scriptContainer" className="flex-1 overflow-y-auto max-w-full lg:min-w-[480px] mt-[10px]">
                {transcripts.map((item, index) => {
                    const isActive = index === currentIndex
                    return (
                        <div onClick={() => {
                            onPlayTime(item.startTime)
                        }} id={`scriptItem-${index}`} className={`cursor-pointer flex items-center border-b-[1px] border-b-gray-500 px-1 ${isActive ? 'bg-gray-500 text-white' : 'hover:bg-gray-500 hover:text-white'}`}>
                            <div className='min-w-[80px] flex items-center'>
                                <div className={`text-md rounded-lg border px-2 ${isActive ? 'border-white-500': 'border-gray-500'}`}>
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

export default PlayVideoWithLyrics;
