"use client"
import React, { useState } from "react";
import DropdownSelector from "./DropdownSelector";
import localFont from "next/font/local";
import { getTeamsForSeason } from "@/app/database";
import { Game, Team } from "@/app/types";
import AdminTeamEditor from "./AdminTeamEditor";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

//DUMMY DATA BEGIN
// const playerOptions = [
//     { label: "Mike H", value: "playerId" },
//     { label: "Greelz", value: "playerId" },
//     { label: "Josh K", value: "playerId" },
//     { label: "Another Kid", value: "playerId" },
//     { label: "Some other Guy", value: "playerId" },
// ];
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
    handleGameSelect: (gameId: string) => void;
    gamesList: Game[];
    teamsList: Team[];
    selectedGame: Game;
    handleTeamofGameSelect: (teamId: string) => void;
    selectedTeamofGame: string;
    gameStatOptions: [];
    selectedSeason: string;
    leagueId: string;
    opponent: any;

}

export default function AdminPanelForm({ handleGameSelect, selectedTeam, gamesList, teamsList, selectedGame, handleTeamofGameSelect, gameStatOptions, selectedSeason, leagueId, selectedTeamofGame, opponent }: Props) {


    if (!gamesList || gamesList.length === 0) {
        return <div>Data will populate after selecting a Season and Team...</div>; // loader
    }
    const [content, setContent] = useState(0);
    const gameOptions = gamesList.map((g) => ({
        ddlabel: g.name,
        ddvalue: g.id
    }));

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
                    <div className="text-2xl text-white mb-6 text-center font-bold"><DropdownSelector title="Select Game" options={gameOptions} onSelect={handleGameSelect} /></div>

                    {!selectedGame ? (<div></div>) : (
                        <div className="mb-8 grid grid-flow-row grid-cols-2 gap-2">
                            <div>
                                <div>
                                    <label className="block text-white text-sm font-bold mb-2">Select Opponents</label>
                                    <div className="relative">
                                        <select
                                            className="block appearance-none w-full bg-transparent border border-white text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                                            value={opponent.name}
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
                            <div>
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="number">
                                    Opponent Score
                                </label>
                                <input
                                    className="w-full px-4 py-2 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                                    id="selectedGame.opponentScore"
                                    type="number"
                                    placeholder="Opponent Score"
                                    value={selectedGame.opponentScore}
                                    onChange={handleChange} />

                            </div>
                            <div>
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="date">
                                    Date
                                </label>
                                <input
                                    className="w-full px-4 py-2 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                                    id="date"
                                    type="date"
                                    placeholder="09/11/2001"
                                    value={selectedGame.date.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="number">
                                    {selectedGame.team1name === selectedGame.opponent ? selectedGame.team2name : selectedGame.team1name} Team Score
                                </label>
                                <input
                                    className="w-full px-4 py-2 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                                    id="game.team1score"
                                    type="number"
                                    placeholder="Your Score"
                                    value={selectedGame.selectedTeamScore}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>)}
                </div>
                {!selectedGame ? (<div></div>) : (<>
                    <hr className="border-t border-gray-600 my-6" />
                    <DropdownSelector title="Select Team" options={gameStatOptions} onSelect={handleTeamofGameSelect} />
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
                        <tbody>
                            <tr className="border-b bgtranshover1">
                                <td className={`border-b text-md`}>Mike H</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >11</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >13</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >14</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >15</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >16</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >17</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >18</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >19</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >20</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >21</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >22</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >23</td>
                                <td className={`${statfont.className} border-b text-2xl text-green-200`} >24</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >25</td>
                            </tr>
                            <tr className="border-b bgtranshover2">
                                <td className={`border-b text-md`}>Greelz</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >12</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >13</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >14</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >15</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >16</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >17</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >18</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >19</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >20</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >21</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >22</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >23</td>
                                <td className={`${statfont.className} border-b text-2xl text-green-200`} >24</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >25</td>
                            </tr>
                            <tr className="border-b bgtranshover1">
                                <td className={`border-b text-md`}>Josh K</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >12</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >13</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >14</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >15</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >16</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >17</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >18</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >19</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >20</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >21</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >22</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >23</td>
                                <td className={`${statfont.className} border-b text-2xl text-red-200`} >24</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >25</td>
                            </tr>
                            <tr className="border-b bgtranshover2">
                                <td className={`border-b text-md`}>Another Kid</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >12</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >13</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >14</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >15</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >16</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >17</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >18</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >19</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >20</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >21</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >22</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >23</td>
                                <td className={`${statfont.className} border-b text-2xl text-red-200`} >24</td>
                                <td className={`${statfont.className} border-b text-2xl`}  >25</td>
                            </tr>
                        </tbody>
                        <tfoot className="min-w-full border-black border-2 bggrayd-nohov w-full">
                            <tr >
                                <td className="text-center text-md text-center text-xl py-4 font-normal">Team</td>
                                <td className={`${statfont.className} text-2xl`}>65</td>
                                <td className={`${statfont.className} text-2xl`}>71</td>
                                <td className={`${statfont.className} text-2xl`}>75</td>
                                <td className={`${statfont.className} text-2xl`}>80</td>
                                <td className={`${statfont.className} text-2xl`}>85</td>
                                <td className={`${statfont.className} text-2xl`}>90</td>
                                <td className={`${statfont.className} text-2xl`}>95</td>
                                <td className={`${statfont.className} text-2xl`}>100</td>
                                <td className={`${statfont.className} text-2xl`}>105</td>
                                <td className={`${statfont.className} text-2xl`}>110</td>
                                <td className={`${statfont.className} text-2xl`}>115</td>
                                <td className={`${statfont.className} text-2xl`}>120</td>
                                <td className={`${statfont.className} text-2xl text-green-200`} >98</td>
                                <td className={`${statfont.className} text-2xl`}>125</td>
                            </tr>
                        </tfoot>
                    </table>



                    <button
                        type="submit"
                        className="mb-36 w-full bg-white text-gray-900 font-bold py-2 px-4 rounded-md bgorangegradhov  transition-all duration-300"
                    >
                        Submit
                    </button>
                </>)}
            </form>
        </div>
    );
};
