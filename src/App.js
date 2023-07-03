import { useState } from "react";
import "./App.css";
import LogoIcon from "./assets/logo.png";
import { RiSpeakLine, RiVideoLine } from "react-icons/ri";
import { GiConversation } from "react-icons/gi";
import { TAB_CONVERSATION, TAB_SHORT_TALK, TAB_VIDEO } from "./constants";
import AppList from "./components/AppList";

const App = (props) => {
  const [shortTalk, setShortTalk] = useState(require("./data/shortTalk.json"));
  const [conversation, setConversation] = useState(
    require("./data/conversation.json")
  );
  const [video, setVideo] = useState(require("./data/video.json"));
  const [tabActive, setTabActive] = useState(TAB_VIDEO);
  const tabs = [
    {
      code: TAB_SHORT_TALK,
      name: "Short Talk",
      icon: RiSpeakLine,
    },
    {
      code: TAB_CONVERSATION,
      name: "Conversation",
      icon: GiConversation,
    },
    {
      code: TAB_VIDEO,
      name: "Video Talk",
      icon: RiVideoLine,
    },
  ];

  const showTabContent = () => {
    switch (tabActive) {
      case TAB_SHORT_TALK:
        return <AppList items={shortTalk} type={TAB_SHORT_TALK} />;
      case TAB_CONVERSATION:
        return <AppList items={conversation} type={TAB_CONVERSATION} />;
      case TAB_VIDEO:
        return <AppList items={video} type={TAB_VIDEO} />;
      default:
        return <></>;
    }
  };
  return (
    <div className="App">
      <div className="flex flex-col items-center p-1">
        <img className="w-[36px] h-[36px]" src={LogoIcon} />
        <div className="text-sm font-bold">Shadowing English App</div>
      </div>
      <div className="flex items-center border border-b-[1px] border-b-gray-200">
        {tabs.map((tab) => {
          return (
            <div
              className={`flex items-center  cursor-pointer px-5 py-2 ${
                tab.code === tabActive ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => {
                setTabActive(tab.code);
              }}
            >
              <tab.icon className="text-lg" />
              <div className="ml-2 text-sm">{tab.name}</div>
            </div>
          );
        })}
      </div>
      {showTabContent()}
    </div>
  );
};

export default App;
