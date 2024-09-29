import localFont from "next/font/local";
import LEDTracker from "./stats/LEDTracker";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import UserIcon from "./Icons/UserIcon";

const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface Props {
    place: number,
    name: string,
    wins: number,
    loss: number,
}



export default function LeaderboardRow({ place, name, wins, loss }: Props) {
    let color = `${statfont.className} text-center text-4xl  p-2 bggrayd-nohov border-black border-4 aspect-square `;
    if (place === 1) color = `${statfont.className} text-center text-4xl  p-2 bg-gradient-to-b from-yellow-600 to-yellow-900 border-black border-4 aspect-square `;
    if (place === 2) color = `${statfont.className} text-center text-4xl  p-2 bg-gradient-to-b from-gray-300 to-gray-900 border-black border-4 aspect-square `;
    if (place === 3) color = `${statfont.className} text-center text-4xl  p-2 bg-gradient-to-b from-orange-900 to-brown-900 border-black border-4 aspect-square `;

    return (
        <div className="grid grid-flow-col border-black border-2 bggrayd-nohov grid-cols-10">
            <div className=" flex flex-col items-start col-span-1 lg:col-span-2">
                <div className={color}>
                    {place}
                </div>
            </div>
            <div className={` flex items-center  text-2xl ml-2 col-span-6 lg:col-span-4`}>
                {name}
            </div>
            <div className={` flex items-center  text-3xl justify-around col-span-2 text-green-200 lg:col-span-3`}>
                <LEDDisplayColor color={'text-green-300'} amount={wins} />
                <LEDDisplayColor color={'text-red-300'} amount={loss} />
            </div>
            <div className="flex col-span-1 border-white border-2 items-center justify-center lg:col-span-1">
                <UserIcon size={10} mr={0} />
            </div>

        </div>
    )
}