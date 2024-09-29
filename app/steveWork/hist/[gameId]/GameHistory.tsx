

import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RightSidebar from "../../components/admin/RightSidebar";
import AdminFooter from "../../components/admin/AdminFooter";
import { getTeamStatsforGame, getGamesForSeason, getTeamPlayersFromGame, getThisTeamStatsFromGame, getPlayersFromTeam, getTeamNameByTeamId, findFinishedGameIdsByTeamId, findUpcomingGamesByTeamId, getTeamsForSeason } from "@/app/database";
import { Game, PlayerStats, Team } from "@/app/types";
import HighlightChart from "../../components/web/HighlightChart";
import LEDStatTracker from "../../components/web/stats/LEDStatTracker";
import BigButton from "../../components/web/BigButton";
import LEDTracker from "../../components/web/stats/LEDTracker";
import BarChart from "../../components/web/stats/unused/BarChart";
import BarChartCycler from "../components/web/stats/BarChartCycler";
import localFont from "next/font/local";
import TextTicker from "../../components/web/TextTicker";
import PlayerStatBlock from "../../components/web/stats/PlayerStatBlock";
import Tabber from "../../components/web/Tabber";
import Card from "../../components/web/Card";
import WebSectionList from "../../components/web/WebSectionList";
import WebSectionList2 from "../../components/web/WebSectionList2";
import Form from "../../components/web/Form";
import LEDDisplayColor from "../../components/web/stats/LEDDisplayColor";
import UserIcon from "../../components/web/Icons/UserIcon";
import ShotTracker from "../../components/ShotTracker";
const statfont = localFont({ src: "../../../public/fonts/dsdigi.ttf" });

const leagueId = 'PzZH38lp1R6wYs5Luf67';
const seasonId = 'NQ7C9eCOxkV6NWwi73Gj';
const teamId = '1Z1jgCYq0hd9Pk9xXsls';

interface LiveGameParams {
    params: { gameId: string };
}
export default async function GameHistory({ params }: LiveGameParams) {

    const leagueUrl = "placeholder";
    const leagueName = "placeholder";
    const amount = 3;



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
                            <img src="/bballSVG.svg" alt="Basketball" className="h-[150px] align-center animate-bobbing pt-4" />
                            <div className="flex flex-row w-full items-center mb-8">
                                <a className={`${statfont.className} flex h-full items-center justify-around text-4xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                                    Pack Animals
                                    <LEDDisplayColor color={"text-green-200"} amount={100} />
                                </a>
                                <a className={`${statfont.className} text-6xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                                    VS
                                </a>
                                <a className={`${statfont.className} flex h-full items-center justify-around text-4xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                                    IRONFISTS
                                    <LEDDisplayColor color={"text-red-200"} amount={94} />
                                </a>
                            </div>
                            {/* start stats */}
                            <div className="w-full">
                                <div className="grid bgbluegrad grid-cols-2 border-white border-t-2">
                                    <div className="text-left text-2xl py-2 pl-8">PACK ANIMALS</div>
                                </div>

                            </div>
                            <table className="min-w-full bggrayd-nohov border-separate border-spacing-0 text-center ">
                                <thead>
                                    <tr className="border-b ">
                                        <th className="text-center text-md border-gray-600 border-b border-t border-l"></th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">Min</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">FG</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">3PT</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">FT</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">OREB</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">DREB</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">REB</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">AST</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">STL</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">BLK</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">TO</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">PF</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">+/-</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">PTS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b bgtranshover1">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-green-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
                                    </tr>
                                    <tr className="border-b bgtranshover2">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-green-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
                                    </tr>
                                    <tr className="border-b bgtranshover1">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-red-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
                                    </tr>
                                    <tr className="border-b bgtranshover2">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-red-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
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
                                        <td className={`${statfont.className} text-2xl text-green-200`}>98</td>
                                        <td className={`${statfont.className} text-2xl`}>125</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="w-full mt-10">
                                <div className="grid bgbluegrad grid-cols-2 border-white border-t-2">
                                    <div className="text-left text-2xl py-2 pl-8">IRONFISTS</div>
                                </div>

                            </div>
                            <table className="min-w-full bggrayd-nohov border-separate border-spacing-0 text-center">
                                <thead>
                                    <tr className="border-b ">
                                        <th className="text-center text-md border-gray-600 border-b border-t border-l"></th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">Min</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">FG</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">3PT</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">FT</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">OREB</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">DREB</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">REB</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">AST</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">STL</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">BLK</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">TO</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">PF</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">+/-</th>
                                        <th className="text-center border-gray-600 border-b border-t border-l">PTS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b bgtranshover1">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-green-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
                                    </tr>
                                    <tr className="border-b bgtranshover2">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-green-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
                                    </tr>
                                    <tr className="border-b bgtranshover1">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-red-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
                                    </tr>
                                    <tr className="border-b bgtranshover2">
                                        <td className={`border-b text-md`}>Mike H</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>12</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>13</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>14</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>15</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>16</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>17</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>18</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>19</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>20</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>21</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>22</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>23</td>
                                        <td className={`${statfont.className} border-b text-2xl text-red-200`}>24</td>
                                        <td className={`${statfont.className} border-b text-2xl`}>25</td>
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
                                        <td className={`${statfont.className} text-2xl text-green-200`}>98</td>
                                        <td className={`${statfont.className} text-2xl`}>125</td>
                                    </tr>
                                </tfoot>
                            </table>
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



