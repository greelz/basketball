
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
import { Team } from "@/app/types";
import { useState } from "react";
import ToggleCollapse from "../../components/web/ToggleCollapse";
import TextTicker from "../../components/web/TextTicker";
import RightSidebar from "@/app/steveWork/components/admin/RightSidebar";

interface IPage {
    params: { leagueId: string; seasonId: string };
}
interface Props {
    games: any; //stores name:gameName, team1id, team2id, date, and gameover if game is over
    gameSlug: string;
    gameDates: any;
    teams: any;
    teamSlug: string;
}

export default async function SeasonContent({ params, games, gameSlug, gameDates, teams, teamSlug }: IPage & Props) {
    // Massive Database Query Aggregator




    const teamNames = teams.map((t) => t.name);
    const wlratios = teams.map((r) => `${r.wins ?? '0'} / ${r.losses ?? '0'}`);
    const matchups = games.map((g) => g.name);
    const matchupURLs = games.map((g) => `/steveWork/live/${g.id}`);
    const teamURLs = teams.map((u) => `/steveWork/${params.leagueId}/${params.seasonId}/teams/${u.id}`);
    const matchButtons = matchupURLs.map((url, idx) => {
        return <BigButton key={`matchButton ${idx}`} url={url} content={`View Match`} />
    });
    const teamButtons = teamURLs.map((url, idx) => {
        // console.log(url);
        return <BigButton key={`teamButton ${idx}`} url={url} content={`View Team`} />
    });
    const gameTime = gameDates.map((t) => t.time);
    const gameDate = gameDates.map((d) => d.date);
    // console.log(`games in SEASON CONTENT ****************************************: ${JSON.stringify(games, null, 2)}`);
    // console.log(`teams: ${JSON.stringify(teams, null, 2)}`);
    // console.log(`params SeasonContent: ${params}`);
    // console.log(`matchupURLs: ${matchupURLs}`);

    return (
        <div className="flex h-screen">
            {/* Left Column */}
            <div className="row-span-5">
                <AdminSidebar />
            </div>
            {/* Center Column */}
            <div className="flex-1 flex flex-col justify-start items-center border-white border-r-8 ">
                <img src="/bballSVG.svg" alt="Basketball" className="max-w-sm align-center animate-bobbing" />
                <div className="relative w-full">
                    <div className="absolute w-[20%] top-2 z-10 whitespace-nowrap text-black">
                        <ToggleCollapse variant={1} title={"Add a Matchup"} content={<GameForm params={params} />} />
                    </div>
                    <div className="absolute w-[20%] right-0 top-2 z-10 whitespace-nowrap text-black ">
                        <ToggleCollapse variant={1} title={"Add a Team"} content={<TeamForm params={params} />} />
                    </div>
                </div>
                <div className="border-2 border-transparent bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer">
                    <div className="flex flex-row flex-1 items-center">
                        <TextTicker content={"Lots of Games.. lots of choices.."} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4  mx-40">
                    {/* Upcoming Games */}
                    <div className="flex flex-col justify-start items-center w-full max-h-[250px] overflow-hidden">
                        <HighlightChart
                            titleContent={'Upcoming Games'}
                            col1Title={'Date'}
                            col1data={gameDate}
                            col2Title={"Time"}
                            col2data={gameTime}
                            col3Title={"Matchups"}
                            col3data={matchups}
                            col4Title={"View Match"}
                            col4data={matchButtons}
                            variant={1}
                        />
                    </div>
                    {/* Past Games */}
                    <div className="flex flex-col justify-start items-center w-full max-h-[250px] overflow-hidden mb-4">
                        <HighlightChart
                            titleContent={'Teams of the Season'}
                            col1Title={"Team"}
                            col1data={teamNames}
                            col2Title={"W/L"}
                            col2data={wlratios}
                            col4Title={"View More"}
                            col4data={teamButtons}
                        />
                    </div>
                </div>
            </div>
            <div className="row-span-5">
                <RightSidebar />
            </div>
        </div>
    );
}
