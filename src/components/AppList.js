import React, { useState } from "react";
import { Modal, Table, Tag, Input, Button, Space } from "antd";
import {
    TAB_CONVERSATION,
    TAB_SHORT_TALK,
    TAB_VIDEO,
} from "../utils/constants";
import ShortTalkDetail from "./ShortTalkDetail";
import ConversationDetail from "./ConversationDetail";
import VideoDetail from "./VideoDetail";
import { BsSearch } from "react-icons/bs";
const AppList = (props) => {
    const { items, type } = props;
    const [openItem, setOpenItem] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [levels, setLevels] = useState([1]);
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const columns = [
        // {
        //     title: "Index",
        //     dataIndex: "index",
        //     key: "index",
        //     render: (text) => <Tag color="magenta">{text}</Tag>,
        // },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        ...(type === TAB_VIDEO
            ? [
                  {
                      title: "Level",
                      dataIndex: "level",
                      key: "level",
                      render: (text) => <Tag color="magenta">{text}</Tag>,
                  },
              ]
            : []),
    ];

    const showDetail = () => {
        if (!openItem) return <></>;
        switch (type) {
            case TAB_SHORT_TALK:
                return (
                    <ShortTalkDetail
                        data={openItem}
                        onClose={() => setOpenItem(null)}
                    />
                );
            case TAB_CONVERSATION:
                return (
                    <ConversationDetail
                        data={openItem}
                        onClose={() => setOpenItem(null)}
                    />
                );
            case TAB_VIDEO:
                return (
                    <VideoDetail
                        data={openItem}
                        onClose={() => setOpenItem(null)}
                    />
                );
            default:
                return <></>;
        }
    };
    const searchFilter = (record) => {
        const { title, level } = record;
        if (searchText.toLowerCase().trim().length === 0) {
            if (type === TAB_VIDEO)
                return !levels.length || levels.includes(level);
            return true;
        }
        const index1 = title
            .toLowerCase()
            .search(" " + searchText.toLowerCase().trim());
        const index2 = title
            .toLowerCase()
            .search(searchText.toLowerCase().trim());
        if (type === TAB_VIDEO)
            return (
                (index1 !== -1 || index2 === 0) &&
                (!levels.length || levels.includes(level))
            );
        return index1 !== -1 || index2 === 0;
    };
    const allLevels = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="p-2">
            <div>
                <Input
                    placeholder="Search"
                    value={searchText}
                    onChange={handleSearch}
                    prefix={<BsSearch />}
                    allowClear
                />
            </div>
            {type === TAB_VIDEO && (
                <div className="flex items-center justify-center py-2">
                    {allLevels.map((item, index) => {
                        return (
                            <div
                                className={`w-[36px] min-w-[36px] h-[36px] mx-1 cursor-pointer rounded-full border flex items-center justify-center ${
                                    levels.includes(item) &&
                                    "bg-gray-500 text-[white]"
                                }`}
                                onClick={() => {
                                    setLevels((prev) =>
                                        !prev.includes(item)
                                            ? [...prev, item]
                                            : prev.filter(
                                                  (itemL) => itemL !== item
                                              )
                                    );
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            )}
            <Table
                columns={columns}
                dataSource={items.filter(searchFilter).map((item, index) => ({
                    ...item,
                    index: index + 1,
                }))}
                onRow={(record) => ({
                    onClick: () => {
                        setOpenItem(record);
                    },
                })}
            />
            {showDetail()}
        </div>
    );
};

export default AppList;
