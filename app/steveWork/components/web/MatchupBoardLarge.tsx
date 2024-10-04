import localFont from "next/font/local";
import LEDTracker from "./stats/LEDTracker";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import UserIcon from "./Icons/UserIcon";
import MatchupRow from "./MatchupRow";
import { Game } from "@/app/types";

const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface Props {
    games: Game[],
    dates?: any
}

export default function MatchubBoardLarge({ dates, games }: Props) {
    games.forEach((game) => {
        game.team1name ? game.victor = game.team1name : game.victor = "No victor Data";
        game.team2name ? game.loser = game.team2name : game.loser = "No loser Data";
        game.victorScore ? game.victorScore : 88;
        game.loserScore ? game.loserScore : 8;
    });

    return (
        <>
            <div className="grid grid-flow-col bgbluegrad grid-cols-10">
                <div className="text-center  col-span-1 border-white border-2">Date</div>
                <div className="text-center  col-span-3 border-white border-2">Matchup</div>
                <div className="text-center  col-span-2 border-white border-2">Score</div>
                <div className="text-center  col-span-4 border-white border-2">Key Players</div>


            </div>
            <div className="max-h-[250px] overflow-y-auto">
                {games.map((g, idx) => (
                    <a key={`gamematchup${idx}`} href="/" className=""><MatchupRow date={g.date.date} victor={g.victor || g.team1name || g.team1Name} loser={g.loser || g.team2name || g.team2Name} victorScore={g.victorScore || g.team1score || 0} loserScore={g.loserScore || g.team2score || 0} /> </a>

                ))}
            </div>
        </>
    )
}