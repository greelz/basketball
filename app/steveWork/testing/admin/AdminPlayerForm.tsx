"use client"
import React, { useState } from "react";
import DropdownSelector from "./DropdownSelector";
import localFont from "next/font/local";
import { getTeamsForSeason } from "@/app/database";
import { Game, Player, PlayerStats, Team } from "@/app/types";
import AdminTeamEditor from "./AdminTeamEditor";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

//DUMMY DATA BEGIN
const playerStats = [
    {
        name: "Jonas L",
        id: "CRkCwB34bxCKFSUowV40",
        teamId: "74k0M13yM3kY6Gd92vO8",
        assists: 1,
        two_point_miss: 6,
        turnovers: 4,
        three_point_made: 3,
        "O rebounds": 1,
        steals: 1,
        two_point_made: 3,
        three_point_miss: 3,
        "D rebounds": 4,
        points: 15,
    },
    {
        name: "Caleb C",
        id: "WBDcCNHozLy8P3fPdIxZ",
        teamId: "74k0M13yM3kY6Gd92vO8",
    },
    {
        name: "Dillon C",
        id: "dKhU7oWusmsKUyCbH1FQ",
        teamId: "74k0M13yM3kY6Gd92vO8",
        three_point_made: 4,
        steals: 5,
        two_point_miss: 11,
        two_point_made: 10,
        "D rebounds": 6,
        "O rebounds": 10,
        three_point_miss: 9,
        blocks: 2,
        turnovers: 2,
        assists: 3,
        points: 32,
    },
];
playerStats.push({
    name: "Add New Player",
    id: "AddNewPlayer",
});
const playerOptions =
    playerStats.map((p) => ({
        ddlabel: p.name,
        ddvalue: p.id
    }))
    ;

// const gameOptions = [
//     { label: "vs AC130s 09/10", value: "gameId" },
//     { label: "vs IronGiants 09/10", value: "gameId" },
//     { label: "vs Slabbers 05/13", value: "gameId" },

// ];
// const teamOptions = [
//     { label: "Banana Boat Boys", value: "team1id" },
//     { label: "Whoever the Fuck", value: "team2id" },

// ];
//DUMMY DATA END

interface Props {
    selectedTeam: { id: string, name: string };
    gamesList: Game[];
    teamsList: Team[];
    selectedTeamofGame: string;
    selectedSeason: string;
    leagueId: string;
    selectedPlayer: PlayerStats;
    setSelectedPlayer: (id: string) => void;

}

export default function AdminPlayerForm({ selectedTeam, gamesList, teamsList, selectedSeason, leagueId, selectedTeamofGame, setSelectedPlayer, selectedPlayer }: Props) {



    if (!gamesList || gamesList.length === 0) {
        return <div>Data will populate after selecting a Season and Team...</div>; // loader
    }
    const [content, setContent] = useState(0);

    const handleSelectedPlayer = (id: string) => {
        const activePlayer = playerStats.find((s) => s.id === id)
        setSelectedPlayer(activePlayer);
    }

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    };
    return (
        <div className="flex flex-1 justify-center items-center rounded-xl bggrayd-nohov">
            <form className="bg-transparent rounded-lg shadow-lg w-full" onSubmit={handleSubmit}>
                <div className="w-full">
                    <div className="text-3xl text-center mb-3">{selectedTeam.name}</div>
                    <div className="text-2xl text-white mb-6 text-center font-bold"><DropdownSelector title="Select A Player" options={playerOptions} onSelect={handleSelectedPlayer} /></div>

                    {selectedPlayer && selectedPlayer.name !== "Add New Player" ? (
                        <div className="mb-8 grid grid-flow-row grid-cols-1 gap-2">
                            <div>
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">Assign New Team</label>
                                    <div className="relative">
                                        <select
                                            className="block appearance-none w-full bg-transparent border border-white text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                                            value={(selectedTeam ? selectedTeam.name : "")}
                                            onChange={handleChange}>
                                            {teamsList.map((t, idx) => (
                                                <option key={`option${idx}${t}`} className="bg-gray-900 text-white" value={t.id}>{t.name}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.5 7l4.5 4.5L14.5 7h-9z" /></svg>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    ) : (<div></div>
                    )}
                </div>
                {selectedPlayer && selectedPlayer.name !== "Add New Player" ? (
                    <>
                        <hr className="border-t border-gray-600 my-6" />
                        <div className="text-3xl text-center mb-3">{selectedPlayer.name} Lifetime Stats</div>

                        {/* <AdminTeamEditor
                        selectedGame={selectedGame}
                        seasonId={selectedSeason}
                        leagueId={leagueId}
                        gameId={selectedGame.id}
                        gg={selectedGame.gameover! >= 1 ? true : false}
                        team1Name={selectedGame.team1name!}
                        team2Name={selectedGame.team2name!}
                        team1={selectedGame.team1}
                        team2={selectedGame.team2}
                        gameStatOptions={gameStatOptions}
                        handleTeamofGameSelect={handleTeamofGameSelect}
                        selectedTeamofGame={selectedTeamofGame}
                        team1players={[]}
                        team2players={[]} /> */}

                        <table className="w-full bggrayd-nohov border-separate border-spacing-0 text-center mt-4 ">
                            <thead>
                                <tr className="border-b ">
                                    <th className="text-center text-md border-gray-600 border-b border-t border-r"></th>
                                    <th className="text-center border-gray-600 border-b border-t">2PT</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">2PT+</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">3PT</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">3PT+</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">FG%</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">OREB</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">DREB</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">TREB</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">AST</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">STL</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">BLK</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">TO</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">eFG%</th>
                                    <th className="text-center border-gray-600 border-b border-t border-l">PTS</th>
                                </tr>
                            </thead>

                            <tfoot className="min-w-full border-black border-2 bggrayd-nohov w-full">
                                <tr >
                                    <td className="text-center text-md text-center text-xl py-4 font-normal">Total</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.two_point_miss ?? 0) + (selectedPlayer.two_point_made ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.two_point_made ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.three_point_miss ?? 0) + (selectedPlayer.three_point_made ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.three_point_made ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>N/A</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer["O rebounds"] ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer["D rebounds"] ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer["D rebounds"] ?? 0) + (selectedPlayer["O rebounds"] ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.assists ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.steals ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.blocks ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{(selectedPlayer.turnovers ?? 0)}</td>
                                    <td className={`${statfont.className} text-2xl text-green-200`} >N/A</td>
                                    <td className={`${statfont.className} text-2xl`} contentEditable={true} onChange={handleChange}>{((selectedPlayer.three_point_made ?? 0) * 3) + ((selectedPlayer.two_point_made ?? 0) * 2)}</td>
                                </tr>
                            </tfoot>
                        </table>



                        <button
                            type="submit"
                            className="mt-5 py-2 mb-36 w-full bg-white text-gray-900 font-bold py-2 px-4 rounded-md bgorangegradhov  transition-all duration-300"
                        >
                            Submit
                        </button>
                    </>) : (<div></div>)}
                {selectedPlayer && selectedPlayer.name === "Add New Player" ? (
                    <div className="mb-8 grid grid-flow-row md:grid-cols-1 lg:grid-cols-2 gap-2">
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">Player Name:</label>
                            <div className="relative">
                                <input className="block appearance-none w-full bg-transparent border border-white text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300" type="input" id="playerName" name="playerName" autoComplete="off" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label className="block text-white text-sm font-bold mb-2">Adding To:</label>
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-transparent border border-white text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                                        value={(selectedTeam ? selectedTeam.name : "")}>
                                        <option className="bg-gray-900 text-white" value={selectedTeam.id}>{selectedTeam.name}</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.5 7l4.5 4.5L14.5 7h-9z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-5 col-span-2 py-2 mb-36 w-full bg-white text-gray-900 font-bold py-2 px-4 rounded-md bgorangegradhov  transition-all duration-300"
                        >
                            Submit
                        </button>
                    </div>

                ) : (<></>)
                }
            </form >
        </div >
    );
};
