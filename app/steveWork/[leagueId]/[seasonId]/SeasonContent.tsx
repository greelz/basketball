
import GameForm from "../../components/forms/GameForm";
import TeamForm from "../../components/forms/TeamForm";
import {
    getGamesForSeason,
    getSeasons,
    getTeamsForSeason,
} from "@/app/database";
import localFont from "next/font/local";
import AdminSidebar from "../../components/admin/AdminSidebar";
import HighlightChart from "../../components/web/HighlightChart";
import BigButton from "../../components/web/BigButton";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });
import { Season, Team } from "@/app/types";
import { useState } from "react";
import ToggleCollapse from "../../components/web/ToggleCollapse";
import TextTicker from "../../components/web/TextTicker";
import RightSidebar from "@/app/steveWork/components/admin/RightSidebar";
import LEDTracker from "../../components/web/stats/LEDTracker";
import Card from "../../components/web/Card";
import WebSectionList from "../../components/web/WebSectionList";
import WebSectionList2 from "../../components/web/WebSectionList2";
import TournamentBracket from "../../components/web/stats/TournamentBracket";
import Form from "../../components/web/Form";
import Tabber from "../../components/web/Tabber";
import LeaderboardLIVE from "../../components/web/LeaderboardLIVE";
import MatchubBoardLarge from "../../components/web/MatchupBoardLarge";
import MatchupRowMini from "../../components/web/MatchupRowMini";

interface IPage {
    params: { leagueId: string; seasonId: string };
}
interface Props {
    games: any; //stores name:gameName, team1id, team2id, date, and gameover if game is over
    gameSlug: string;
    teams: Team[];
    teamSlug: string;
    seasons: Season[];
}

const sortTeamsByWins = (teams: Team[]) => {
    return teams.sort((a, b) => b.wins - a.wins);
};

export default async function SeasonContent({ params, games, gameSlug, teams, teamSlug, seasons }: IPage & Props) {

    const seasonName = seasons.filter(s => s.id === params.seasonId).map((s) => s.name);
    // Massive Database Query Aggregator
    const leaderboard = sortTeamsByWins(teams);


    const gameDateDates = games.map((d) => d.date.date);


    const tabPanel = [
        { title: 'Teams', content: <Card><LeaderboardLIVE teamSlug={teamSlug} leaderboard={leaderboard} /></Card> },
        {
            title: 'Matchups', content:
                <Card>
                    <div className=" mx-4">
                        <div className="grid grid-flow-col bgbluegrad grid-cols-2 ">
                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Date</div>
                            <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">Matchup</div>
                        </div>
                        <div className=" max-h-[450px] overflow-y-auto">
                            {games.map((g, idx) => (
                                <a key={`matchup.next.${idx}`} href={g.date.date < new Date() ? `/steveWork/hist/${g.id}` : `/steveWork/live/${g.id}`} className={g.date.date < new Date() ? "text-red-400" : ""}>  <MatchupRowMini date={gameDateDates[idx]} opponent={g.name} /></a>
                            ))}
                        </div>
                    </div>
                </Card>
        },
        // { title: 'Standings', content: <Card><TournamentBracket /></Card> },
        { title: 'Login/Register', content: <Form /> },
    ];

    let isAdmin = false;
    return (
        <div className="flex h-screen">
            {/* Left Column */}
            <div className="row-span-5">
                <AdminSidebar />
            </div>
            {/* Center Column */}

            <div className=" flex flex-col justify-start items-center border-white border-r-8 ">
                <img src="/bballSVG.svg" alt="Basketball" className="max-w-sm align-center animate-bobbing" />
                {isAdmin ? (<>
                    <div className="relative w-full">
                        <div className="absolute w-[20%] top-2 z-10 whitespace-nowrap text-black">
                            <ToggleCollapse variant={1} title={"Add a Matchup"} content={<GameForm params={params} />} />
                        </div>
                        <div className="absolute w-[20%] right-0 top-2 z-10 whitespace-nowrap text-black ">
                            <ToggleCollapse variant={1} title={"Add a Team"} content={<TeamForm params={params} />} />
                        </div>
                    </div>
                </>) : <></>}
                <div className="border-2 border-transparent bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer">
                    <div className="flex flex-row flex-1 items-center">
                        <TextTicker content={`Welcome to the ${seasonName}`} />
                    </div>
                </div>
                <Tabber tabPanel={tabPanel} />
            </div>
            <div className="row-span-5">
                <RightSidebar />
            </div>
        </div>
    );
}
