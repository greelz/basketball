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
                <div className="relative overflow-hidden ">
                    <table className="table-fixed w-full text-left ">
                        <thead className="bggrayd-nohov">
                            <tr>
                                {col1Title ? <th className="py-2 border text-center  p-4" >{col1Title}</th> : <></>}
                                {col2Title ? <th className="py-2 border text-center  p-4" >{col2Title}</th> : <></>}
                                {col3Title ? <th className="py-2 border text-center  p-4" >{col3Title}</th> : <></>}
                                {col4Title ? <th className="py-2 border text-center  p-4" >{col4Title}</th> : <></>}
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-900 max-h-[300px] overflow-auto">
                            {rows.map((m, idx) => (
                                <tr key={`row${idx}`}
                                    className={!variant ? (`py-0 ${idx % 2 === 0 ? 'bgwhitehoverblue' : 'bggrayhoverblue'}`) : (`py-0 ${idx % 2 === 0 ? 'bgwhitehoverorange' : 'bggrayhoverorange'}`)} >
                                    {m.col1 ? <td key={`${m.col1}${idx}`} className="py-0 border-t border-b h-12 p-4" >{m.col1}</td> : <></>}
                                    {m.col2 ? <td key={`${m.col2}${idx}`} className="py-0 border-t border-b text-center h-12 p-4" >{m.col2}</td> : <></>}
                                    {m.col3 ? <td key={`${m.col3}${idx}`} className="py-0 border-t border-b  h-12 p-4" >
                                        {typeof m.col3 === 'number' ? (
                                            <LEDTracker amount={m.col4} variant={3} />
                                        ) : (m.col3)}
                                    </td> : <></>}
                                    {m.col4 ? <td key={`${m.col4}${idx}`} className="py-0 border-t border-b  h-12 p-4" >
                                        {typeof m.col4 === 'number' ? (
                                            <LEDTracker amount={m.col4} variant={3} />
                                        ) : (m.col4)}
                                    </td> : <></>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

