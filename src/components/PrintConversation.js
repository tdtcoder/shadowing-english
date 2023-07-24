import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
const pageSize = 100;
const PrintConversation = (props) => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const [data, setData] = useState(require("./../data/conversation.json").slice((page-1)*pageSize, page*pageSize));

    return (
        <div className="p-4">
            <div className="text-[32px] p-2 text-center">
                Conversation - Part {page} ({(page-1)*pageSize} - {page*pageSize})
            </div>
            <table className="w-full">
                <tbody>

                {
                    data.map((item, index) => {
                        return (
                            <>
                                <tr>
                                    <td className="p-2 text-center text-[14px] font-bold" colSpan={2}>
                                        {item.title}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 border text-[12px]">
                                        {item.content.slice(0, Math.ceil(item.content.length/2)).map(itemEx => {
                                            return (
                                                <div>
                                                    {itemEx}
                                                </div>
                                            )
                                        })}
                                    </td>
                                    <td className="p-2 border text-[12px]">
                                        {item.content.slice(Math.ceil(item.content.length/2)).map(itemEx => {
                                            return (
                                                <div>
                                                    {itemEx}
                                                </div>
                                            )
                                        })}
                                    </td>
                                </tr>
                            </>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default PrintConversation;
