import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LogoIcon from "./../assets/logo.png";
import { PAGE_SIZE } from "../utils/constants";

const PrintConversation = (props) => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ?? 0;
    const [data, setData] = useState(
        page === 0
            ? require("./../data/conversation.json")
            : require("./../data/conversation.json").slice(
                  (page - 1) * PAGE_SIZE,
                  page * PAGE_SIZE
              )
    );

    return (
        <div className="p-4 bg-white text-gray-900">
            <Link to={"/"} className="flex flex-col items-center p-1">
                <img className="w-[36px] h-[36px]" src={LogoIcon} />
                <div className="text-sm font-bold">Shadowing English App</div>
                <div className="text-xs italic">@trandinhthangdev</div>
            </Link>
            <div className="text-[32px] p-2 text-center">
                Conversation - Part {page} ({(page - 1) * PAGE_SIZE} -{" "}
                {page * PAGE_SIZE})
            </div>
            <table className="w-full">
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <>
                                <tr>
                                    <td
                                        className="p-2 text-center text-[14px] font-bold"
                                        colSpan={2}
                                    >
                                        {item.title}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 border text-[12px]">
                                        {item.content
                                            .slice(
                                                0,
                                                Math.ceil(
                                                    item.content.length / 2
                                                )
                                            )
                                            .map((itemEx) => {
                                                return <div>{itemEx}</div>;
                                            })}
                                    </td>
                                    <td className="p-2 border text-[12px]">
                                        {item.content
                                            .slice(
                                                Math.ceil(
                                                    item.content.length / 2
                                                )
                                            )
                                            .map((itemEx) => {
                                                return <div>{itemEx}</div>;
                                            })}
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PrintConversation;
