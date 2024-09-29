import UserIcon from "./Icons/UserIcon";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import localFont from "next/font/local";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface Props {
    date: string,
    victor: string,
    loser: string,
    victorScore: number,
    loserScore: number
}

export default function MatchupRow({ date, victor, loser, victorScore, loserScore }: Props) {

    return (
        <div className="grid grid-flow-col border-black border-2 bggrayd-nohov grid-cols-10">
            <div className=" flex flex-col items-center justify-center col-span-1 border-black border-r-4">
                <div className={`${statfont.className} text-center text-4xl p-2`}>
                    {date}
                </div>
            </div>
            <div className="flex flex-col text-center items-center justify-center col-span-3  whitespace-nowrap 2xl:flex-row">
                <div className={`text-md pl-2 w-full text-green-300`}>
                    {victor}
                </div>
                <div className={`hidden text-md pl-2 2xl:contents`}>
                    VS
                </div>
                <div className={`text-md pl-2 w-full text-red-300`}>
                    {loser}
                </div>
            </div>
            <div className={` flex items-center  text-3xl justify-around col-span-2 text-green-200`}>
                <LEDDisplayColor color={'text-green-300'} amount={victorScore} />
                <LEDDisplayColor color={'text-red-300'} amount={loserScore} />
            </div>
            <div className="flex col-span-2 items-center ">

                <UserIcon size={10} mr={0} />

                <div className="flex flex-row 2xl:flex-col">
                    <div className={`text-md pl-2 w-full `}>
                        Mike H
                    </div>
                    <div className="flex flex-row 2xl:flex-none">
                        <div className="hidden 2xl:contents">
                            <div className={`  text-md pl-2  font-bold `}>
                                18
                            </div>
                            <div className={`text-md pl-2  `}>
                                Pts
                            </div>

                            <div className={`text-md pl-2  font-bold`}>
                                4
                            </div>
                            <div className={`text-md pl-2  `}>
                                Rebounds
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex col-span-2 items-center ">
                <UserIcon size={10} mr={0} />
                <div className="flex flex-col">
                    <div className={`text-md pl-2 w-full `}>
                        Josh K
                    </div>
                    <div className="flex flex-row">
                        <div className="hidden 2xl:contents">
                            <div className={`  text-md pl-2  font-bold `}>
                                18
                            </div>
                            <div className={`text-md pl-2  `}>
                                Pts
                            </div>

                            <div className={`text-md pl-2  font-bold`}>
                                4
                            </div>
                            <div className={`text-md pl-2  `}>
                                Rebounds
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}