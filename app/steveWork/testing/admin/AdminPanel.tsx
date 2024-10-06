"use client"
import AdminFooter from "../../components/admin/AdminFooter";
import localFont from "next/font/local";
import AdminPanelSidebar from "./AdminPanelSidebar";
import Tabber from "../../components/web/Tabber";
import DropdownSelector from "./DropdownSelector";
import AdminPanelForm from "./AdminPanelForm";
import UploadExport from "./UploadExport";

import { Game, Player, PlayerStats, Season, Team } from "@/app/types";
import { useEffect, useState } from "react";
import { getGamesForSeason, getTeamsForSeason } from "@/app/database";
import Card from "../../components/web/Card";
import AdminPlayerForm from "./AdminPlayerForm";
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
    const [teamsList, setTeamsList] = useState<Team[]>([]);
    const [gamesList, setGamesList] = useState<Game[]>([]);
    const [fullGamesList, setFullGamesList] = useState<Game[]>([]);
    const [selectedSeason, setSelectedSeason] = useState("");
    const [selectedGame, setSelectedGame] = useState<Game>();
    const [selectedTeamofGame, setSelectedTeamofGame] = useState();
    const [gameStatOptions, setGameStatOptions] = useState<{ ddlabel: string; ddvalue: string }[]
    >([])
    const [opponent, setOpponent] = useState();
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats>();

    //On Season Selection, Get Teams / Games, Assign Team/Game names / Format Dates
    const handleSeasonSelect = async (seasonId: string) => {
        const [teams, games] = await Promise.all([
            getTeamsForSeason(leagueId, seasonId),
            getGamesForSeason(leagueId, seasonId)
        ]);
        games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());
        games.forEach((game) => {
            const teamA = getTeamNameFromCachedTeams(game.team1, teams);
            const teamB = getTeamNameFromCachedTeams(game.team2, teams);

            const dateObj = game.date.toDate();
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit'
            });
            const formattedTime = dateObj.toLocaleTimeString();

            game.date = { date: formattedDate, time: formattedTime };
            game.name = `${teamA} vs ${teamB}`;
            game.team1name = teamA;
            game.team2name = teamB;
        });

        setSelectedSeason(seasonId);
        setTeamsList(teams);
        setFullGamesList(games);
        setSelectedTeam({ id: "", name: "" }); // Reset selected team when a new season is chosen
        return games;
    }
    // On Team Button Select / Filter seasonGames to selectedTeamGamees
    const handleTeamSelect = (teamId: string, teamName: string) => {
        setSelectedTeam({ id: teamId, name: teamName });
        // Fetch games based on the selected team
        const filteredGames = fullGamesList.filter((g) => teamId === g.team1 || teamId === g.team2);
        setGamesList(filteredGames);
    }
    //On Game Select, Determine win/loss and opponent / populate teamDropdown for player Stats
    const handleGameSelect = (gameId: string) => {
        const activeGame: Game = gamesList.find(g => g.id === gameId)!
        if (!activeGame) {
            console.error("Game not found");
            return;
        }
        if (activeGame.team1score && activeGame.team1score > activeGame.team2score) {
            activeGame.victor = activeGame.team1name;
            activeGame.loser = activeGame.team2name;
            activeGame.victorScore = activeGame.team1score;
            activeGame.loserScore = activeGame.team2score;
        } else if (activeGame.team1score && activeGame.team1score < activeGame.team2score) {
            activeGame.victor = activeGame.team2name;
            activeGame.loser = activeGame.team1name;
            activeGame.victorScore = activeGame.team2score;
            activeGame.loserScore = activeGame.team1score;
        }
        if (activeGame.team1 !== selectedTeam.id) {
            activeGame.opponent = activeGame.team1name;
            activeGame.opponentScore = activeGame.team1score;
            activeGame.selectedTeamScore = activeGame.team2score;
        } else if (activeGame.team1 === selectedTeam.id) {
            activeGame.opponent = activeGame.team2name;
            activeGame.opponentScore = activeGame.team2score;
            activeGame.selectedTeamScore = activeGame.team1score;
        }
        setSelectedGame(activeGame);
        setGameStatOptions([
            {
                ddlabel: teamsList.find(t => t.id === activeGame.team1)?.name || activeGame.team1,
                ddvalue: activeGame.team1
            },
            {
                ddlabel: teamsList.find(t => t.id === activeGame.team2)?.name || activeGame.team2,
                ddvalue: activeGame.team2
            }
        ]);
        setOpponent(teamsList.find(t => t.id === activeGame.team1 && t.id !== selectedTeam.id || t.id === activeGame.team2 && t.id !== selectedTeam.id));
    }
    //setSelected TeamofGame as Team Stats to Edit
    const handleTeamofGameSelect = (teamId: string) => {
        setSelectedTeamofGame(teamId);
    }


    const seasonOptions = seasons.map((s) => ({
        ddlabel: s.name,
        ddvalue: s.id,
    }));
    const teamOptions = teamsList.map((t) => { t.id, t.name });

    //autoUpdate for debugging purposes
    useEffect(() => {

        console.log(`Updated selectedGame: ${JSON.stringify(selectedGame, null, 2)}`);

    }, [gamesList, selectedTeam, seasonOptions, selectedGame, selectedTeamofGame, gameStatOptions, selectedSeason]);


    //END FUNCTIONS

    const tabPanel = [
        {
            title: 'Games',
            content:
                (
                    <AdminPanelForm handleGameSelect={handleGameSelect} selectedTeam={selectedTeam} gamesList={gamesList} teamsList={teamsList} selectedGame={selectedGame} handleTeamofGameSelect={handleTeamofGameSelect} selectedTeamofGame={selectedTeamofGame} gameStatOptions={gameStatOptions} selectedSeason={selectedSeason} leagueId={leagueId} opponent={opponent} />
                )
        },
        {
            title: `Player Roster`,
            content:
                (
                    <AdminPlayerForm handleGameSelect={handleGameSelect} selectedTeam={selectedTeam} gamesList={gamesList} teamsList={teamsList} selectedGame={selectedGame} handleTeamofGameSelect={handleTeamofGameSelect} selectedTeamofGame={selectedTeamofGame} gameStatOptions={gameStatOptions} selectedSeason={selectedSeason} leagueId={leagueId} opponent={opponent} selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
                )
        },
        {
            title: 'Bulk Upload / Export',
            content:
                (
                    <Card><UploadExport /></Card>
                )
        },

    ];
    return (
        <>
            <>
                <div className="flex flex-col min-h-screen max-h-full overflow-y-auto homeRadial">
                    <div className="flex-1 flex flex-col h-full">
                        <div className="flex flex-1  ">
                            {/* Left Column */}
                            <div className="row-span-5 hidden 2xl:contents">
                                <AdminPanelSidebar />
                            </div>
                            {/* Center Column */}
                            <div className="flex-1 p-6 bg-transparent bg-transparent">
                                <h1 className="text-center w-full">Admin Panel</h1>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                                        <DropdownSelector title="Select League" options={seasonOptions} onSelect={handleSeasonSelect} />

                                        {!teamsList || teamsList.length === 0 && (
                                            <div className="my-4">
                                                ....
                                            </div>
                                        )}
                                        {teamsList.length > 0 && (
                                            <>
                                                <div className="my-4">
                                                    Teams:
                                                </div>
                                                <div className="grid grid-flow-row grid-cols-2 truncate xl:grid-cols-4 gap-4">
                                                    {teamsList.map((t, idx) => (
                                                        <div key={`teamButton${t.name}.${t.id}`} onClick={() => handleTeamSelect(t.id, t.name)} className="w-full">
                                                            <div className={`${selectedTeam.id === t.id ? 'bggraygradSelected' : 'bggraygrad'} w-full h-full p-4 rounded-md cursor-pointer border border-black flex align-center justify-center items-center text-md`}>{t.name}</div>
                                                        </div>
                                                    ))}
                                                </div></>
                                        )}
                                        {selectedTeam && selectedTeam.id != "" && selectedTeam.name != "" && (
                                            <div className="w-full my-8">
                                                <Tabber tabPanel={tabPanel} />
                                            </div>)}
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