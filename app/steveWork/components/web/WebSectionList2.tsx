import localFont from "next/font/local";
import LEDTracker from "./stats/LEDTracker";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import UserIcon from "./Icons/UserIcon";
import MatchupRow from "./MatchupRow";

const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });



export default function WebSectionList2() {
    return (
        <>
            <div className="grid grid-flow-col bgbluegrad grid-cols-10">
                <div className="text-center  col-span-1 border-white border-2">Date</div>
                <div className="text-center  col-span-3 border-white border-2">Matchup</div>
                <div className="text-center  col-span-2 border-white border-2">Score</div>
                <div className="text-center  col-span-4 border-white border-2">Key Players</div>


            </div>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><MatchupRow date={"09/06"} victor={"Frozen Tundra"} loser={"Ironfists"} victorScore={216} loserScore={88} /> </a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><MatchupRow date={"09/08"} victor={"Firebolts"} loser={"Pack Mentality"} victorScore={84} loserScore={62} /></a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><MatchupRow date={"09/10"} victor={"AC130s"} loser={"Frozen Tundra"} victorScore={317} loserScore={211} /></a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><MatchupRow date={"09/12"} victor={"Banana Boat Boys"} loser={"Firebolts"} victorScore={112} loserScore={43} /></a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><MatchupRow date={"09/12"} victor={"Pack Mentality"} loser={"Ironfists"} victorScore={89} loserScore={12} /></a>



        </>

    )
}