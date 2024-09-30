import React, { } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RightSidebar from "../../components/admin/RightSidebar";
import { getTeamPlayersFromGame, getTeamNameByTeamId, isGameOver, findLeagueAndSeasonByGameId } from "@/app/database";
import localFont from "next/font/local";
import Card from "../../components/web/Card";
import WebSectionList from "../../components/web/WebSectionList";
import WebSectionList2 from "../../components/web/WebSectionList2";
import Form from "../../components/web/Form";
import ShotTracker from "../../components/ShotTracker";
import HistoryChart from "./HistoryChart";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });



// const leagueId = 'PzZH38lp1R6wYs5Luf67';
// const seasonId = 'NQ7C9eCOxkV6NWwi73Gj';
// const teamId = '1Z1jgCYq0hd9Pk9xXsls';
// const leagueUrl = "placeholder";
// const leagueName = "placeholder";
// const amount = 3;

interface LiveGameParams {
    params: { gameId: string };
}

export default async function GameHistory({ params }: LiveGameParams) {
    const gameId = params.gameId;
    const findLeagueResult = await findLeagueAndSeasonByGameId(params.gameId);
    let leagueId: string, seasonId: string;

    if (findLeagueResult) {
        ({ leagueId, seasonId } = findLeagueResult);
    } else {
        return <div>We couldn't find this game. Check your URL.</div>;
    }

    const { team1, team2, team1players, team2players } =
        await getTeamPlayersFromGame(leagueId, seasonId, gameId);
    const gg = await isGameOver(leagueId, seasonId, gameId);
    const teamName1 = await getTeamNameByTeamId(leagueId, seasonId, team1);
    const teamName2 = await getTeamNameByTeamId(leagueId, seasonId, team2);


    const tabPanel = [
        { title: 'Top Teams', content: <Card><WebSectionList /></Card> },
        { title: 'League History', content: <Card><WebSectionList2 /></Card> },
        { title: 'Registration', content: <Form /> },
    ];













    return (
        <>
            <div className="flex flex-col min-h-screen max-h-full">
                <div className="flex-1 flex flex-col h-full">
                    <div className="flex h-full overflow-hidden homeRadial ">
                        {/* Left Column */}
                        <div className="row-span-5">
                            <AdminSidebar />
                        </div>

                        {/* Center Column */}
                        <div className="flex flex-col flex-1 justify-start items-center overflow-y-auto">
                            <HistoryChart
                                team1={team1}
                                team2={team2}
                                gg={gg}
                                leagueId={leagueId}
                                seasonId={seasonId}
                                gameId={gameId}
                                team1players={team1players}
                                team2players={team2players}
                                team1Name={teamName1}
                                team2Name={teamName2}

                            />

                            <div className="mt-6">
                                <ShotTracker selectedPlayer={"mike"} />
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="row-span-5">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}



