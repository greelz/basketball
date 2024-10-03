"use client"
import AdminFooter from "../../components/admin/AdminFooter";
import localFont from "next/font/local";
import AdminPanelSidebar from "./AdminPanelSidebar";
import Tabber from "../../components/web/Tabber";
import DropdownSelector from "./DropdownSelector";
import AdminPanelForm from "./AdminPanelForm";
import UploadExport from "./UploadExport";

import { Game, Season, Team } from "@/app/types";
import { useEffect, useState } from "react";
import { getGamesForSeason, getTeamsForSeason } from "@/app/database";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

//BEGIN DUMMY DATA
const leagueId = "PzZH38lp1R6wYs5Luf67"
// const seasonId = "NQ7C9eCOxkV6NWwi73Gj"
// const seasons = [
//     { name: "Spring Playoffs", id: "LxMULlyBcOCZNt4WPa3L" },
//     { name: "Commissioner Cup", id: "NQ7C9eCOxkV6NWwi73Gj" },
//     { name: "Orange Bowl", id: "hSIVrUtOGh69EeTZRwat" },
// ]
// const leagueOptions = seasons.map((s) => ({
//     label: s.name,
//     value: s.id,
// }));
// const playerOptions = [
//     { label: "Mike H", value: "playerId" },
//     { label: "Greelz", value: "playerId" },
//     { label: "Josh K", value: "playerId" },
//     { label: "Another Kid", value: "playerId" },
//     { label: "Some other Guy", value: "playerId" },
// ];
// const teamOptions = [
//     {
//         name: 'Pack Mentality',
//         wins: 5,
//         losses: 2,
//         id: '1Z1jgCYq0hd9Pk9xXsls'
//     },
//     {
//         wins: 3,
//         losses: 3,
//         name: 'Black Diamonds',
//         id: '44zjcMeNYKheYL9tngAc'
//     },
//     {
//         wins: 3,
//         name: 'Crimson Wildhearts',
//         losses: 6,
//         id: 'BJdkaZFWFQkbwFBSGVcE'
//     },
//     { losses: 4, name: 'Tundra SC', wins: 2, id: 'HQB9tCtLUR2DOkwuWxAP' },
//     {
//         losses: 3,
//         name: 'Judgment United',
//         wins: 3,
//         id: 'SALNrwY3Vkxy5nXaL4fb'
//     },
//     {
//         wins: 5,
//         losses: 1,
//         name: 'Sweetwater',
//         id: 'fU7dAhU8hbnOqU0zhpi8'
//     },
//     { name: 'Firebolts', wins: 2, losses: 2, id: 'iYJhEsm6HcAj2ATCrAwI' },
//     { wins: 4, name: 'AC-130s', losses: 2, id: 'kOAXiC375zsCgvonnNZn' },
//     { losses: 5, name: 'Ironfists', wins: 1, id: 'zV1KASEOgL2OCoCELbTV' }
// ];
//END DUMMY DATA

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
    return teams.find((t) => t.id === teamId)?.name;
}

interface Props {
    leagueId: string;
    seasons: Season[];
}

export default function AdminPanel({
    leagueId,
    seasons }: Props
) {
    if (!seasons || seasons.length === 0) {
        return <div>Loading...</div>; // loader
    }
    //BEGIN FUNCTIONS
    const [selectedTeam, setSelectedTeam] = useState({ id: "", name: "" });
    const [teamsList, setTeamsList] = useState([]);
    const [gamesList, setGamesList] = useState([]);
    const [fullGamesList, setFullGamesList] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("");
    const [selectedGame, setSelectedGame] = useState();
    const [selectedTeamofGame, setSelectedTeamofGame] = useState("");

    const handleSeasonSelect = async (seasonId: string) => {
        const teams = await getTeamsForSeason(leagueId, seasonId)
        const games = await getGamesForSeason(leagueId, seasonId)
        games.forEach((game) => {
            const teamA = getTeamNameFromCachedTeams(game.team1, teams);
            const teamB = getTeamNameFromCachedTeams(game.team2, teams);
            // const timestamp = game.date.toDate().toLocaleString();
            game.name = `${teamA} vs ${teamB}${game.name ? ` [${game.name}]` : ""}`;

        });

        setTeamsList(teams);
        console.log(`teams: ${JSON.stringify(teams, null, 2)}`);
        setFullGamesList(games);
        console.log(`games: ${JSON.stringify(games, null, 2)}`);
        setSelectedTeam({ id: "", name: "" }); // Reset selected team when a new season is chosen
        return games;
    }

    const handleTeamSelect = (teamId: string, teamName: string) => {
        setSelectedTeam({ id: teamId, name: teamName });
        // Fetch games based on the selected team
        const filteredGames = fullGamesList.filter((g) => teamId === g.team1 || teamId === g.team2);
        setGamesList(filteredGames);
    }
    const handleGameSelect = (gameId: string) => {
        setSelectedGame(gameId);
    }

    const handleTeamofGameSelect = (teamId: string) => {
        setSelectedTeamofGame(teamId);
    }


    const seasonOptions = seasons.map((s) => ({
        label: s.name,
        value: s.id,
    }));
    const teamOptions = teamsList.map((t) => { t.id, t.name });

    useEffect(() => {
        // console.log(`Updated setFullGamesList: ${JSON.stringify(fullGamesList, null, 2)}`);
        console.log(`Updated gamesList: ${JSON.stringify(gamesList, null, 2)}`);
        console.log(`Updated selectedTeam: ${JSON.stringify(selectedTeam, null, 2)}`);
        console.log(`Updated seasonOptions: ${JSON.stringify(seasonOptions, null, 2)}`);
        console.log(`Updated selectedGame: ${JSON.stringify(selectedGame, null, 2)}`);
        console.log(`Updated selectedTeamofGame: ${JSON.stringify(selectedTeamofGame, null, 2)}`);
    }, [gamesList, selectedTeam, seasonOptions, selectedGame, selectedTeamofGame]);


    //END FUNCTIONS

    const tabPanel = [
        {
            title: 'Games',
            content:
                (
                    <AdminPanelForm handleGameSelect={handleGameSelect} selectedTeam={selectedTeam} gamesList={gamesList} teamsList={teamsList} selectedGame={selectedGame} handleTeamofGameSelect={handleTeamofGameSelect} selectedTeamofGame={selectedTeamofGame} />
                )
        },
        {
            title: 'Bulk Upload / Export',
            content:
                (
                    <UploadExport />
                )
        },

    ];
    return (
        <>
            <>
                <div className="flex flex-col min-h-screen max-h-full">
                    <div className="flex-1 flex flex-col h-full">
                        <div className="flex h-full overflow-y-auto homeRadial ">
                            {/* Left Column */}
                            <div className="row-span-5">
                                <AdminPanelSidebar />
                            </div>
                            {/* Center Column */}
                            <div className="flex-1 p-6 bg-transparent bg-transparent">
                                <h1 className="text-center w-full">Admin Panel</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Leagues</h3>
                                        <p className="mt-2 text-3xl">1</p>
                                    </div>
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Seasons</h3>
                                        <p className="mt-2 text-3xl">{seasonOptions.length}</p>
                                    </div>
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Teams</h3>
                                        <p className="mt-2 text-3xl">{teamOptions.length}</p>
                                    </div>
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Players</h3>
                                        <p className="mt-2 text-3xl">45</p>
                                    </div>
                                </div>
                                <div className="mt-10 p-4 bggrayd-nohov rounded">
                                    <div className="mx-4 pt-4">
                                        <DropdownSelector label="Select League" options={seasonOptions} onSelect={handleSeasonSelect} />
                                        <div className="my-4">
                                            Teams:
                                        </div>
                                        {teamsList.length > 0 && (
                                            <div className="grid grid-flow-row sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                                {teamsList.map((t, idx) => (
                                                    <div key={`teamButton${t.name}.${t.id}`} onClick={() => handleTeamSelect(t.id, t.name)} className="w-full">
                                                        <div className={`${selectedTeam.id === t.id ? 'bggraygradSelected' : 'bggraygrad'} w-full h-full p-4 rounded-md cursor-pointer border border-black flex align-center justify-center items-center text-md`}>{t.name}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="w-full my-8">
                                            <Tabber tabPanel={tabPanel} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* Right Column */}
                            <div className="row-span-5">

                            </div>
                        </div>
                    </div>
                </div >
            </>
            <AdminFooter />
        </>
    )
}