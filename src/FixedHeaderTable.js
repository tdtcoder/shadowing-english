import React, { useState } from "react";
import { Modal, Table } from "antd";

const FixedHeaderTable = (props) => {
    const { items } = props;
    const [openItem, setOpenItem] = useState(null);
    const columns = [
        {
            title: "index",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "title",
            dataIndex: "title",
            key: "title",
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={items}
                onRow={(record) => ({
                    onClick: () => {
                        setOpenItem(record);
                    },
                })}
            />
            <Modal
                open={!!openItem}
                onCancel={() => {
                    setOpenItem(null);
                }}
                header={null}
                footer={null}
            >
                <div>
                    <div className="text-lg">{openItem?.title ?? ""}</div>
                    <div className="text-sm">{openItem?.content ?? ""}</div>
                </div>
            </Modal>
        </div>
    );
};

export default FixedHeaderTable;
