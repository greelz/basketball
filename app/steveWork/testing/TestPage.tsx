

import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import RightSidebar from "../components/admin/RightSidebar";
import AdminFooter from "../components/admin/AdminFooter";
import { getTeamStatsforGame, getGamesForSeason, getTeamPlayersFromGame, getThisTeamStatsFromGame, getPlayersFromTeam, getTeamNameByTeamId, findFinishedGameIdsByTeamId, findUpcomingGamesByTeamId, getTeamsForSeason } from "@/app/database";
import { Game, PlayerStats, Team } from "@/app/types";
import HighlightChart from "../components/web/HighlightChart";
import LEDStatTracker from "../components/web/stats/LEDStatTracker";
import BigButton from "../components/web/BigButton";
import LEDTracker from "../components/web/stats/LEDTracker";
import BarChart from "../components/web/stats/unused/BarChart";
import BarChartCycler from "../components/web/stats/BarChartCycler";
import localFont from "next/font/local";
import TextTicker from "../components/web/TextTicker";
import PlayerStatBlock from "../components/web/stats/PlayerStatBlock";
import Tabber from "../components/web/Tabber";
import Card from "../components/web/Card";
import WebSectionList from "../components/web/WebSectionList";
import WebSectionList2 from "../components/web/WebSectionList2";
import Form from "../components/web/Form";
import LEDDisplayColor from "../components/web/stats/LEDDisplayColor";
import UserIcon from "../components/web/Icons/UserIcon";
import ShotTracker from "../components/ShotTracker";
const statfont = localFont({ src: "../../../public/fonts/dsdigi.ttf" });

const leagueId = 'PzZH38lp1R6wYs5Luf67';
const seasonId = 'NQ7C9eCOxkV6NWwi73Gj';
const teamId = '1Z1jgCYq0hd9Pk9xXsls';

// const filterGamesbyIds = (games, gameIds) => {
//   if (!Array.isArray(gameIds)) {
//     console.error("gameIds is not an array");
//     return [];
//   }
//   return games.filter(game => gameIds.includes(game.id));
// }

// function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
//   return teams.find((t) => t.id === teamId)?.name;
// }


//dummydata
// const foundGames =
//   ['EvWTPOCAPLVabXz203uT',
//     'MhmwelMVcoqTD5jP2Khv',
//     'XqiKpopCXjOoMCey38m9',
//     'fAcIMHHemlkdLUK3uiug',
//     'jiVX2lIuapvPBJOtRF0E',
//     'lyOBJNWPdDdLoQfX6yyf',
//     'qpeWXJToPHNXaEM512QV'
//   ];

export default async function TestPage() {
  //aggregate season data and format date/time
  // const teams = await getTeamsForSeason(leagueId, seasonId);
  // const games = await getGamesForSeason(leagueId, seasonId);
  // //isolateTeamName and team
  // const teamName = await getTeamNameByTeamId(leagueId, seasonId, teamId);
  // const myTeam = teams.find(t => teamId === t.id);

  // console.log(`teamName: ${JSON.stringify(teamName, null, 2)}`);

  // games.forEach((game) => {

  //   let teamA = getTeamNameFromCachedTeams(game.team1, teams);
  //   let teamB = getTeamNameFromCachedTeams(game.team2, teams);
  //   let opponent;
  //   if (game.team1 && game.team2) {
  //     if (teamName === teamA && teamName !== teamB) {
  //       opponent = teamB;
  //     } else if (teamName === teamB && teamName !== teamA) {
  //       opponent = teamA;
  //     } else {
  //       console.log(`******NO OPPONENT FOR GAME*`);
  //       console.log(`TeamName to match: ${teamName}`)
  //       console.log(`TeamA: ${teamA}`);
  //       console.log(`TeamB: ${teamB}`);

  //     }
  //     game.name = opponent ? `${opponent}` : `${teamA} vs ${teamB}`;
  //     console.log(`********GAME FOUND********`)
  //     console.log(`GAME FOUND: ${game.id}.`);
  //     console.log(`game.name value check: ${game.name}`);

  //   } else {
  //     console.log(`**SKIPPED*`);
  //     console.log(`${game.id} due to missing team data.`);
  //   }
  // });
  // //sort games into order
  // games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());

  // //{team1,team2,date(sec nano) id gameover?=1}
  // console.log(`Full Formatted Game Array: ${JSON.stringify(games, null, 2)}`);
  // //filtergames into finished and unfinished (id:string arrays)
  // const unfinishedGameIds = await findUpcomingGamesByTeamId(teamId, games);
  // const finishedGameIds = await findFinishedGameIdsByTeamId(teamId, games);
  // //separate Game[]data into upcoming and completedgames
  // const upcomingGameData = filterGamesbyIds(games, unfinishedGameIds);
  // const completedGamesData = filterGamesbyIds(games, finishedGameIds);

  // console.log(`finishedGameIds Strings: ${JSON.stringify(finishedGameIds, null, 2)}`);
  // console.log(`completedGamesData: ${JSON.stringify(completedGamesData, null, 2)}`);
  // console.log(`upcomingGameData: ${JSON.stringify(upcomingGameData, null, 2)}`);

  // //set date and time of upcominggames to strings
  // const upcomingGameDateData = upcomingGameData.map((game: Game) => {
  //   const date = game.date.toDate().toLocaleDateString();
  //   const time = game.date.toDate().toLocaleTimeString();
  //   return { date: date, time: time };
  // });
  // console.log(`upcomingGameDateData: ${JSON.stringify(upcomingGameDateData, null, 2)}`);

  // const upcomingGameDates = upcomingGameDateData.map((d) => d.date);
  // const upcomingGameTimes = upcomingGameDateData.map((d) => d.time);
  // console.log(`upcomingGameDates: ${JSON.stringify(upcomingGameDates, null, 2)}`);
  // console.log(`upcomingGameTimes: ${JSON.stringify(upcomingGameTimes, null, 2)}`);

  // //set date and time of completedGames to strings
  // const completedGameDateData = completedGamesData.map((game: Game) => {
  //   const date = game.date.toDate().toLocaleDateString();
  //   const time = game.date.toDate().toLocaleTimeString();
  //   return { date: date, time: time };
  // });
  // console.log(`completedGameDateData: ${JSON.stringify(completedGameDateData, null, 2)}`);

  // const completedGameDates = completedGameDateData.map((d) => d.date);
  // const completedGameTimes = completedGameDateData.map((d) => d.time);
  // console.log(`completedGameDates: ${JSON.stringify(completedGameDates, null, 2)}`);
  // console.log(`completedGameTimes: ${JSON.stringify(completedGameTimes, null, 2)}`);

  // //get all player stats from all finished games
  // const seasonGameStats = await Promise.all(     //wait until the whole loop has finished
  //   finishedGameIds.map((g) => {    //loop over the games
  //     return getTeamStatsforGame(leagueId, seasonId, g, teamId);
  //   }));

  // console.log(`seasonGameStats: ${JSON.stringify(seasonGameStats, null, 2)}`);

  // const seasonGameStatArray = seasonGameStats.map((g) => g.teamPlayerStats);
  // const combinePlayerStats = (seasonGameStatArray) => {
  //   const playerStatTotals = {};
  //   seasonGameStatArray.flat().forEach(player => {
  //     const { id, teamId, name, ...stats } = player;
  //     // If the player already exists in the playerStatTotals, accumulate their stats
  //     if (playerStatTotals[id]) {
  //       Object.keys(stats).forEach(stat => {
  //         playerStatTotals[id][stat] += stats[stat];
  //       });
  //     } else {
  //       playerStatTotals[id] = {
  //         id, teamId, name, ...stats,
  //       };
  //     }
  //   });
  //   // Convert the playerStatsTotals object back into an array
  //   return Object.values(playerStatTotals);
  // };
  // //sum up all player stats of every game of the season to a seasonPlayerValue
  // const seasonPlayerValues = combinePlayerStats(seasonGameStatArray);
  // console.log(`seasonPlayerValues: ${JSON.stringify(seasonPlayerValues, null, 2)}`);

  // //map variables for charting
  // const teamScore = completedGamesData.map((g) => {
  //   return teamId === g.team1 ? g.team1score : g.team2score;
  // });
  // console.log(`teamScore: ${JSON.stringify(teamScore, null, 2)}`);
  // const opponentScore = completedGamesData.map((g) => {
  //   return teamId === g.team1 ? g.team2score : g.team1score;
  // });
  // console.log(`opponentScore: ${JSON.stringify(opponentScore, null, 2)}`);

  // const teamPlayerNames = seasonPlayerValues.map((p) => p.name);
  // const upcomingOpponents = upcomingGameData.map((g) => g.name);
  // const previousOpponents = completedGamesData.map((g) => g.name);
  // // const playerURLs = seasonPlayerValues.map((u) => `/steveWork/${leagueId}/${seasonId}/${u.id}`);
  // console.log(`teamPlayerNames: ${JSON.stringify(teamPlayerNames, null, 2)}`);
  // console.log(`upcomingOpponents: ${JSON.stringify(upcomingOpponents, null, 2)}`);
  // console.log(`previousOpponents: ${JSON.stringify(previousOpponents, null, 2)}`);


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



