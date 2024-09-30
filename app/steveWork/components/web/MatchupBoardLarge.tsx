import localFont from "next/font/local";
import LEDTracker from "./stats/LEDTracker";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import UserIcon from "./Icons/UserIcon";
import MatchupRow from "./MatchupRow";

const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });



export default function MatchubBoardLarge(dates, games) {
    return (
        <>
            <div className="grid grid-flow-col bgbluegrad grid-cols-10">
                <div className="text-center  col-span-1 border-white border-2">Date</div>
                <div className="text-center  col-span-3 border-white border-2">Matchup</div>
                <div className="text-center  col-span-2 border-white border-2">Score</div>
                <div className="text-center  col-span-4 border-white border-2">Key Players</div>


            </div>
            {games.map((g, idx) => (
                <a href="/" className=""><MatchupRow date={dates.idx} victor={g.victor} loser={g.loser} victorScore={216} loserScore={88} /> </a>

            ))}
        </>
    )
}