import React, { useState } from "react";
import { Modal, Table, Tag } from "antd";
import { TAB_CONVERSATION, TAB_SHORT_TALK, TAB_VIDEO } from "../utils/constants";
import ShortTalkDetail from "./ShortTalkDetail";
import ConversationDetail from "./ConversationDetail";
import VideoDetail from "./VideoDetail";
const AppList = (props) => {
  const { items, type } = props;
  const [openItem, setOpenItem] = useState(null);
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (text) => <Tag color="magenta">{text}</Tag>,
    },
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
            filters: [
              { text: "1", value: 1 },
              { text: "2", value: 2 },
              { text: "3", value: 3 },
              { text: "4", value: 4 },
              { text: "5", value: 5 },
              { text: "6", value: 6 },
              { text: "7", value: 7 },
            ],
            onFilter: (value, record) => {
              return record.level === value;
            },
          },
        ]
      : []),
  ];

  const showDetail = () => {
    if (!openItem) return <></>;
    switch (type) {
      case TAB_SHORT_TALK:
        return (
          <ShortTalkDetail data={openItem} onClose={() => setOpenItem(null)} />
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
          <VideoDetail data={openItem} onClose={() => setOpenItem(null)} />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="p-2">
      <Table
        columns={columns}
        dataSource={items.map((item, index) => ({
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
