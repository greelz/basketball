import UserIcon from "./Icons/UserIcon";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import localFont from "next/font/local";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface Props {
    date: string,
    opponent: string,
    teamScore?: number,
    opponentScore?: number
    override?: any;
}



export default function MatchupRowMini({ date, opponent, teamScore, opponentScore, override }: Props) {
    let color = "text-white";
    if (override && teamScore && opponentScore) {
        color = teamScore > opponentScore ? "text-green-300" : "text-red-300";
    }
    // Adjust grid layout based on whether scores are available
    const colSize = teamScore !== undefined && opponentScore !== undefined ? "grid-cols-4" : "grid-cols-2";

    return (
        <div className={`relative group overflow-hidden border-black border-2 grid grid-flow-col bggrayd-nohov ${colSize}`}>
            {/* Date Column */}
            <div className="flex flex-col items-center justify-center col-span-1 border-black border-r-4">
                <div className={`${statfont.className} text-center text-4xl p-2`}>
                    {date}
                </div>
            </div>

            {/* Opponent Column */}
            <div className="flex flex-col text-center items-center justify-center col-span-1 lg:whitespace-nowrap 2xl:flex-row ">
                <div className={`text-md pl-2 w-full ${color}`}>{opponent}</div>
            </div>

            {/* Score Columns, only show if scores exist */}
            {teamScore !== undefined && opponentScore !== undefined && (
                <div className="flex items-center text-3xl justify-around col-span-2 min-w-[200px]">
                    <LEDDisplayColor color={color} amount={teamScore} />
                    <LEDDisplayColor color={color} amount={opponentScore} />
                </div>
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <span className="text-white text-xl font-bold">View Match</span>
            </div>
        </div>
    );
}
