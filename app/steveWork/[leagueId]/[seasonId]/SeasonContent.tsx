
import GameForm from "../../components/forms/GameForm";
import TeamForm from "../../components/forms/TeamForm";
import {
    getGamesForSeason,
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


    const teamNames = teams.map((t) => t.name);
    const wlratios = teams.map((r) => `${r.wins} / ${r.losses}`);
    const matchups = games.map((g) => g.name);
    const matchupURLs = games.map((g) => `/live/${g.id}`);
    const teamURLs = teams.map((u) => `/steveWork/${params.leagueId}/${params.seasonId}/${u.id}`);
    const matchButtons = matchupURLs.map((url, idx) => {
        return <BigButton key={`matchButton ${idx}`} url={url} content={`View Match`} />
    });
    const teamButtons = teamURLs.map((url, idx) => {
        console.log(url);
        return <BigButton key={`teamButton ${idx}`} url={url} content={`View Team`} />
    });
    const gameTime = gameDates.map((t) => t.time);
    const gameDate = gameDates.map((d) => d.date);
    // console.log(`games in SEASON CONTENT ****************************************: ${JSON.stringify(games, null, 2)}`);
    console.log(`teams: ${JSON.stringify(teams, null, 2)}`);
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
                    <div className="absolute w-[20%] top-1 z-10 whitespace-nowrap text-black">
                        <ToggleCollapse variant={1} title={"Add a Matchup"} content={<GameForm params={params} />} />
                    </div>
                    <div className="absolute w-[20%] right-0 top-1 z-10 whitespace-nowrap text-black">
                        <ToggleCollapse variant={1} title={"Add a Team"} content={<TeamForm params={params} />} />
                    </div>
                </div>
                <a className={`${statfont.className} text-6xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap cursor-pointer`}
                >{'Choose A Match'}</a>

                <div className="max-w-[80%] min-h-[30%] max-h-[50%] overflow-y-auto border-white border-b mt-5"> {/* Adjust max-h-64 as needed */}
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
                <div className="max-w-[80%] min-h-[30%] max-h-[50%] rounded-md overflow-y-auto border-white border-b mt-5 mb-5"> {/* Adjust max-h-64 as needed */}
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

                {/* Right Column
                <div className="row-span-5">
                </div> */}
            </div>
        </div>
    );
}
