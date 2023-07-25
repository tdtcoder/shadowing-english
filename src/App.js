import { useState } from "react";
import "./App.css";
import LogoIcon from "./assets/logo.png";
import MyQR from "./assets/my_qr.jpg";
import { RiSpeakLine, RiVideoLine } from "react-icons/ri";
import { GiConversation } from "react-icons/gi";
import {
    PAGE_SIZE,
    TAB_CONVERSATION,
    TAB_SHORT_TALK,
    TAB_VIDEO,
} from "./utils/constants";
import AppList from "./components/AppList";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsPrinterFill } from "react-icons/bs";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { Modal } from "antd";
import { Link } from "react-router-dom";
const pageSize = 100;
const App = (props) => {
    const [shortTalk, setShortTalk] = useState(
        require("./data/shortTalk.json")
    );
    const [conversation, setConversation] = useState(
        require("./data/conversation.json")
    );
    const [isFullPrint, setIsFullPrint] = useState(false);
    const [video, setVideo] = useState(require("./data/video.json"));
    const [tabActive, setTabActive] = useState(TAB_VIDEO);
    const [openMyQr, setOpenMyQR] = useState(false);
    const tabs = [
        {
            code: TAB_SHORT_TALK,
            name: "Talk",
            icon: RiSpeakLine,
        },
        {
            code: TAB_CONVERSATION,
            name: "Conversation",
            icon: GiConversation,
        },
        {
            code: TAB_VIDEO,
            name: "Video",
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

    const items =
        tabActive === TAB_SHORT_TALK
            ? shortTalk
            : tabActive === TAB_CONVERSATION
            ? conversation
            : [];

    const nbPages = Math.ceil(items.length / PAGE_SIZE);
    const arrPages = new Array(nbPages).fill(1);
    const printLink =
        tabActive === TAB_SHORT_TALK
            ? "/print-short-talk"
            : tabActive === TAB_CONVERSATION
            ? "/print-conversation"
            : "";
    return (
        <div className="App bg-white text-gray-900 min-h-[100vh]">
            <div
                onClick={() => setOpenMyQR(true)}
                className="cursor-pointer fixed top-1 right-1 flex flex-col items-center justify-center"
            >
                <div className="bg-[#E7B10A] p-1 rounded-lg">
                    <BiCoffeeTogo className="text-sm" />
                </div>
                <div className="text-[9px]">buy me a coffee</div>
            </div>
            <div className="flex flex-col items-center p-1">
                <img className="w-[36px] h-[36px]" src={LogoIcon} />
                <div className="text-sm font-bold">Shadowing English App</div>
                <div className="text-xs italic">@trandinhthangdev</div>
            </div>
            <div className="flex items-center border border-b-[1px] border-b-gray-200">
                {tabs.map((tab) => {
                    return (
                        <div
                            className={`flex items-center  cursor-pointer px-5 py-2 ${
                                tab.code === tabActive
                                    ? "font-bold bg-gray-200"
                                    : ""
                            }`}
                            onClick={() => {
                                setTabActive(null);
                                setTimeout(() => {
                                    setTabActive(tab.code);
                                }, 100);
                            }}
                        >
                            <tab.icon className="text-lg" />
                            <div className="ml-2 text-sm">{tab.name}</div>
                        </div>
                    );
                })}
            </div>
            {[TAB_SHORT_TALK, TAB_CONVERSATION].includes(tabActive) ? (
                <div className="flex items-center flex-wrap">
                    <Link
                        to={`${printLink}`}
                        className="flex items-center bg-blue-500 text-white p-1 rounded-lg text-xs m-1"
                    >
                        <div className="mr-1">All</div>
                        <BsPrinterFill />
                    </Link>
                    {(isFullPrint ? arrPages : arrPages.slice(0, 3)).map(
                        (item, index) => {
                            return (
                                <Link
                                    to={`${printLink}?page=${index + 1}`}
                                    className="flex items-center bg-blue-500 text-white p-1 rounded-lg text-xs m-1"
                                >
                                    <div className="mr-1">
                                        {index * PAGE_SIZE} -{" "}
                                        {(index + 1) * PAGE_SIZE}
                                    </div>
                                    <BsPrinterFill />
                                </Link>
                            );
                        }
                    )}
                    <div
                        className=" ml-2 cursor-pointer p-2 hover:bg-blue-200 rounded-lg"
                        onClick={() => setIsFullPrint((prev) => !prev)}
                    >
                        {isFullPrint ? (
                            <AiOutlineDoubleLeft />
                        ) : (
                            <AiOutlineDoubleRight />
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
            {showTabContent()}
            {tabActive && (
                <div
                    onClick={() => setOpenMyQR(true)}
                    className="cursor-pointer flex flex-col items-center justify-center"
                >
                    <div className="bg-[#E7B10A] p-1 rounded-lg">
                        <BiCoffeeTogo className="text-lg" />
                    </div>
                    <div className="text-md">buy me a coffee</div>
                </div>
            )}
            <Modal
                open={openMyQr}
                onCancel={() => {
                    setOpenMyQR(false);
                }}
                className="myQRModal"
                header={null}
                footer={null}
            >
                <div
                    className="m-auto bg-white flex flex-col items-center justify-center h-[600px]"
                    style={{
                        maxHeight: "calc(100vh - 120px)",
                    }}
                >
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-[#E7B10A] p-1 rounded-lg">
                            <BiCoffeeTogo className="text-lg" />
                        </div>
                        <div className="text-md">buy me a coffee</div>
                    </div>
                    <div
                        className="flex-1 p-[10px]"
                        style={{
                            height: "calc(100% - 50px)",
                        }}
                    >
                        <img src={MyQR} className="h-full" />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default App;
