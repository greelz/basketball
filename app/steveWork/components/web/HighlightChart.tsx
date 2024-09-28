"use client"

import LEDTracker from "./stats/LEDTracker";
import BigButton from "../../components/web/BigButton";

interface Props {
    titleContent: any;
    col1Title?: any;
    col1data?: any;
    col2Title?: any;
    col2data?: any;
    col3Title?: any;
    col3data?: any;
    col4Title?: any;
    col4data?: any;
    variant?: number;
}



export default function HeaderContainer({ variant, titleContent, col1Title, col1data, col2Title, col2data, col3Title, col3data, col4data, col4Title }: Props) {

    function genDummyData() {
        const rows = [];
        const numOfRows = Math.max(
            col1data?.length || 0,
            col2data?.length || 0,
            col3data?.length || 0,
            col4data?.length || 0
        );
        for (let i = 0; i < numOfRows; i++) {
            const col1 = col1data?.[i] || null;
            const col2 = col2data?.[i] || null;
            const col3 = col3data?.[(i + 1) % col3data.length] || null;
            const col4 = col4data?.[i] || null;
            rows.push({ col1, col2, col3, col4 });
        }

        return rows;
    }

    const rows = genDummyData();
    const titleColor = variant ? `bgorangegrad max-h-16 w-full flex justify-center items-center border-white border rounded-t-md` : `bgbluegrad max-h-16 w-full flex justify-center items-center border-white border rounded-t-md`
    return (
        <>
            {titleContent ? (
                <div className={titleColor}>
                    <p className="m-0 p-2">{titleContent}</p>
                </div>) : (<></>)}
            <div className="bg-gray-200 w-auto rounded-b-md">
                <div className="w-full">
                    <table className="table-fixed w-full text-left">
                        <thead className="bggrayd-nohov">
                            <tr>
                                {col1Title && col1data ? <th className="py-2 border text-center p-4">{col1Title}</th> : null}
                                {col2Title && col2data ? <th className="py-2 border text-center p-4">{col2Title}</th> : null}
                                {col3Title && col3data ? <th className="py-2 border text-center p-4">{col3Title}</th> : null}
                                {col4Title && col4data ? <th className="py-2 border text-center p-4">{col4Title}</th> : null}
                            </tr>
                        </thead>
                    </table>

                    {/* Scrollable tbody wrapper */}
                    <div className="max-h-[200px] overflow-y-auto rounded-b-md mb-10 pb-10">
                        <table className="table-fixed w-full text-left rounded-b-md">
                            <tbody className="bg-white text-gray-900 rounded-b-md ">
                                {rows.map((m, idx) => (
                                    <tr
                                        key={`row${idx}`}
                                        className={`${idx % 2 === 0
                                            ? variant
                                                ? 'bgwhitehoverorange'
                                                : 'bgwhitehoverblue'
                                            : variant
                                                ? 'bggrayhoverorange'
                                                : 'bggrayhoverblue'
                                            }`}
                                    >
                                        {col1Title && col1data ? <td className="py-0 border-t border-b h-12 p-4 whitespace-nowrap">{m.col1}</td> : null}
                                        {col2Title && col2data ? <td className="py-0 border-t border-b text-center h-12 p-4 whitespace-nowrap">{m.col2}</td> : null}
                                        {col3Title && col3data ? (
                                            <td className="py-0 border-t border-b h-12 p-4 text-center ">
                                                {typeof m.col3 === 'number' && m.col4 ? (
                                                    <div className={m.col3 > m.col4 ? "text-green-200" : m.col3 < m.col4 ? "text-red-200" : "text-white"}>
                                                        <LEDTracker key={`m.col3${idx}${m}`} amount={m.col3} variant={3} />
                                                    </div>
                                                ) : (
                                                    m.col3
                                                )}
                                            </td>
                                        ) : (
                                            null)}
                                        {col4Title && col4data ? (
                                            <td className="py-0 border-t border-b h-12 p-4 text-center whitespace-nowrap">
                                                {typeof m.col4 === 'number' && m.col3 ? (
                                                    <div className={m.col3 > m.col4 ? "text-green-200" : m.col3 < m.col4 ? "text-red-200" : "text-white"}>
                                                        <LEDTracker key={`m.col4${idx}${m}`} amount={m.col4} variant={3} />
                                                    </div>
                                                ) : (
                                                    m.col4
                                                )}
                                            </td>
                                        ) : (
                                            null)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

