import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
const pageSize = 100;
const PrintShortTalk = (props) => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const [data, setData] = useState(require("./../data/shortTalk.json").slice((page-1)*pageSize, page*pageSize));

    return (
        <div className="p-4">
            <div className="text-[32px] p-2 text-center">
                Short Talk - Part {page} ({(page-1)*pageSize} - {page*pageSize})
            </div>
            <table className="w-full">
                <tbody>

                    {
                        data.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td className="p-2 text-center text-[14px] font-bold">
                                            {item.title}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border text-[12px]">
                                            {item.content}
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

export default PrintShortTalk;
