import React, { useState } from "react";
import { Modal, Table, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PlayAudioWithLyrics from "./PlayAudioWithLyrics";
import PlayVideoWithLyrics from "./PlayVideoWithLyrics";
const PLAY_VIDEO = "play_video";
const PLAY_AUDIO = "play_audio";
const PLAY_SLOW_AUDIO = "play_slow_audio";
const VideoDetail = (props) => {
  const { data, onClose } = props;
  const [transcripts, setTranscripts] = useState(
    require(`./../data/transcripts/${data.id}.json`)
  );
  const [playTypeActive, setPlayTypeActive] = useState(PLAY_VIDEO);

  const playTypes = [
    {
      code: PLAY_VIDEO,
      name: "Video",
    },
    {
      code: PLAY_AUDIO,
      name: "Audio",
    },
    {
      code: PLAY_SLOW_AUDIO,
      name: "Slow Audio",
    },
  ];

  const showPlayTypeContent = () => {
    switch (playTypeActive) {
      case PLAY_VIDEO:
        return (
          <PlayVideoWithLyrics
            transcripts={transcripts.map((item) => ({
              text: item.text,
              startTime: item.startTime,
              endTime: item.endTime,
            }))}
            url={data.video}
          />
        );
      case PLAY_AUDIO:
        return (
          <PlayAudioWithLyrics
            transcripts={transcripts.map((item) => ({
              text: item.text,
              startTime: item.startTime,
              endTime: item.endTime,
            }))}
            audio={data.audio}
          />
        );
      case PLAY_SLOW_AUDIO:
        return (
          <PlayAudioWithLyrics
            transcripts={transcripts.map((item) => ({
              text: item.text,
              startTime: item.slowStartTime,
              endTime: item.slowEndTime,
            }))}
            audio={data.slowAudio}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <Modal
      open={true}
      onCancel={() => {
        onClose();
      }}
      className="fixed top-0 left-0 right-0 bottom-0"
      header={null}
      footer={null}
    >
      <div className="h-full w-full flex flex-col items-center p-[10px] bg-white">
        <div className="w-full font-bold mb-2 flex items-center py-2 h-[50px]">
          <ArrowLeftOutlined
            onClick={() => {
              onClose();
            }}
            className="text-xl cursor-pointer hover:text-gray-400"
          />
          <div className="px-2">
            <Tag color="magenta">{data?.index}</Tag>
          </div>
          <div className="flex-1 text-xl">{data?.title ?? ""}</div>
        </div>
        <div className="flex items-center justify-center pb-2 h-[40px]">
          <div className="flex items-center justify-center border-b-[1px] border-b-gray-500 px-2">
            {playTypes.map((type) => {
              return (
                <div
                  className={`py-1 px-2 cursor-pointer text-sm ${
                    playTypeActive === type.code ? "bg-gray-500 text-white" : ""
                  }`}
                  onClick={() => {
                    setPlayTypeActive(type.code);
                  }}
                >
                  {type.name}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="max-w-[600px] lg:max-w-full"
          style={{
            height: "calc(100% - 90px)",
          }}
        >
          {showPlayTypeContent()}
        </div>
      </div>
    </Modal>
  );
};

export default VideoDetail;
