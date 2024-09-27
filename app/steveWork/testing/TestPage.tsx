

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
import BarChart from "../components/web/stats/BarChart";
import BarChartCycler from "../components/web/stats/BarChartCycler";
import localFont from "next/font/local";
import TextTicker from "../components/web/TextTicker";
import PlayerStatBlock from "../components/web/stats/PlayerStatBlock";
const statfont = localFont({ src: "../../../public/fonts/dsdigi.ttf" });

const leagueId = 'PzZH38lp1R6wYs5Luf67';
const seasonId = 'NQ7C9eCOxkV6NWwi73Gj';
const teamId = '1Z1jgCYq0hd9Pk9xXsls';

const filterGamesbyIds = (games, gameIds) => {
  if (!Array.isArray(gameIds)) {
    console.error("gameIds is not an array");
    return [];
  }
  return games.filter(game => gameIds.includes(game.id));
}

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
  return teams.find((t) => t.id === teamId)?.name;
}


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
  const teams = await getTeamsForSeason(leagueId, seasonId);
  const games = await getGamesForSeason(leagueId, seasonId);
  //isolateTeamName and team
  const teamName = await getTeamNameByTeamId(leagueId, seasonId, teamId);
  const myTeam = teams.find(t => teamId === t.id);

  console.log(`teamName: ${JSON.stringify(teamName, null, 2)}`);

  games.forEach((game) => {

    let teamA = getTeamNameFromCachedTeams(game.team1, teams);
    let teamB = getTeamNameFromCachedTeams(game.team2, teams);
    let opponent;
    if (game.team1 && game.team2) {
      if (teamName === teamA && teamName !== teamB) {
        opponent = teamB;
      } else if (teamName === teamB && teamName !== teamA) {
        opponent = teamA;
      } else {
        console.log(`******NO OPPONENT FOR GAME*`);
        console.log(`TeamName to match: ${teamName}`)
        console.log(`TeamA: ${teamA}`);
        console.log(`TeamB: ${teamB}`);

      }
      game.name = opponent ? `${opponent}` : `${teamA} vs ${teamB}`;
      console.log(`********GAME FOUND********`)
      console.log(`GAME FOUND: ${game.id}.`);
      console.log(`game.name value check: ${game.name}`);

    } else {
      console.log(`**SKIPPED*`);
      console.log(`${game.id} due to missing team data.`);
    }
  });
  //sort games into order
  games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());

  //{team1,team2,date(sec nano) id gameover?=1}
  console.log(`Full Formatted Game Array: ${JSON.stringify(games, null, 2)}`);
  //filtergames into finished and unfinished (id:string arrays)
  const unfinishedGameIds = await findUpcomingGamesByTeamId(teamId, games);
  const finishedGameIds = await findFinishedGameIdsByTeamId(teamId, games);
  //separate Game[]data into upcoming and completedgames
  const upcomingGameData = filterGamesbyIds(games, unfinishedGameIds);
  const completedGamesData = filterGamesbyIds(games, finishedGameIds);

  console.log(`finishedGameIds Strings: ${JSON.stringify(finishedGameIds, null, 2)}`);
  console.log(`completedGamesData: ${JSON.stringify(completedGamesData, null, 2)}`);
  console.log(`upcomingGameData: ${JSON.stringify(upcomingGameData, null, 2)}`);

  //set date and time of upcominggames to strings
  const upcomingGameDateData = upcomingGameData.map((game: Game) => {
    const date = game.date.toDate().toLocaleDateString();
    const time = game.date.toDate().toLocaleTimeString();
    return { date: date, time: time };
  });
  console.log(`upcomingGameDateData: ${JSON.stringify(upcomingGameDateData, null, 2)}`);

  const upcomingGameDates = upcomingGameDateData.map((d) => d.date);
  const upcomingGameTimes = upcomingGameDateData.map((d) => d.time);
  console.log(`upcomingGameDates: ${JSON.stringify(upcomingGameDates, null, 2)}`);
  console.log(`upcomingGameTimes: ${JSON.stringify(upcomingGameTimes, null, 2)}`);

  //set date and time of completedGames to strings
  const completedGameDateData = completedGamesData.map((game: Game) => {
    const date = game.date.toDate().toLocaleDateString();
    const time = game.date.toDate().toLocaleTimeString();
    return { date: date, time: time };
  });
  console.log(`completedGameDateData: ${JSON.stringify(completedGameDateData, null, 2)}`);

  const completedGameDates = completedGameDateData.map((d) => d.date);
  const completedGameTimes = completedGameDateData.map((d) => d.time);
  console.log(`completedGameDates: ${JSON.stringify(completedGameDates, null, 2)}`);
  console.log(`completedGameTimes: ${JSON.stringify(completedGameTimes, null, 2)}`);

  //get all player stats from all finished games
  const seasonGameStats = await Promise.all(     //wait until the whole loop has finished
    finishedGameIds.map((g) => {    //loop over the games
      return getTeamStatsforGame(leagueId, seasonId, g, teamId);
    }));

  console.log(`seasonGameStats: ${JSON.stringify(seasonGameStats, null, 2)}`);

  const seasonGameStatArray = seasonGameStats.map((g) => g.teamPlayerStats);
  const combinePlayerStats = (seasonGameStatArray) => {
    const playerStatTotals = {};
    seasonGameStatArray.flat().forEach(player => {
      const { id, teamId, name, ...stats } = player;
      // If the player already exists in the playerStatTotals, accumulate their stats
      if (playerStatTotals[id]) {
        Object.keys(stats).forEach(stat => {
          playerStatTotals[id][stat] += stats[stat];
        });
      } else {
        playerStatTotals[id] = {
          id, teamId, name, ...stats,
        };
      }
    });
    // Convert the playerStatsTotals object back into an array
    return Object.values(playerStatTotals);
  };
  //sum up all player stats of every game of the season to a seasonPlayerValue
  const seasonPlayerValues = combinePlayerStats(seasonGameStatArray);
  console.log(`seasonPlayerValues: ${JSON.stringify(seasonPlayerValues, null, 2)}`);

  //map variables for charting
  const teamScore = completedGamesData.map((g) => {
    return teamId === g.team1 ? g.team1score : g.team2score;
  })
  const opponentScore = completedGamesData.map((g) => {
    return teamId === g.team1 ? g.team2score : g.team1score;
  })
  const teamPlayerNames = seasonPlayerValues.map((p) => p.name);
  const upcomingOpponents = upcomingGameData.map((g) => g.name);
  const previousOpponents = completedGamesData.map((g) => g.name);
  // const playerURLs = seasonPlayerValues.map((u) => `/steveWork/${leagueId}/${seasonId}/${u.id}`);
  console.log(`teamPlayerNames: ${JSON.stringify(teamPlayerNames, null, 2)}`);
  console.log(`upcomingOpponents: ${JSON.stringify(upcomingOpponents, null, 2)}`);
  console.log(`previousOpponents: ${JSON.stringify(previousOpponents, null, 2)}`);

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
              <img src="/bballSVG.svg" alt="Basketball" className="h-[150px] align-center animate-bobbing" />
              <a className={`${statfont.className} text-6xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer`}>
                {teamName} Stats
              </a>

              <div className="flex flex-row justify-evenly items-center max-h-[210px] w-full my-4">
                <div className="flex flex-col items-center">
                  <div className="flex grow-[5]">
                    <LEDTracker variant={1} amount={myTeam.wins} />
                  </div>
                  <p className="text-center font-bold">Wins</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex grow-[5]">
                    <LEDTracker variant={1} amount={myTeam.losses} />
                  </div>
                  <p className="text-center font-bold">Losses</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex grow-[5]">
                    <LEDTracker variant={1} amount={completedGamesData.length} />
                  </div>
                  <p className="text-center font-bold">Games Played</p>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="flex flex-col mx-3">
                  <BarChart team={seasonPlayerValues} variant={1} stat={"points"} />
                  <BarChart team={seasonPlayerValues} variant={2} stat={"assists"} />
                  <BarChart team={seasonPlayerValues} variant={3} stat={"assists"} />
                </div>
                <div className="flex flex-col m-3">
                  <HighlightChart titleContent={"Upcoming Games"} col1Title={"Date"} col2Title={"Opponents"} col3Title={"Time"} col1data={upcomingGameDates} col2data={upcomingOpponents} col3data={upcomingGameTimes} variant={1} />
                  <HighlightChart titleContent={"Past Games"} col1Title={"Date"} col2Title={"Opponents"} col3Title={"Team"} col4Title={"Opp"} col1data={completedGameDates} col2data={previousOpponents} col3data={teamScore} col4data={opponentScore} variant={1} />
                </div>
                <div className="flex flex-col mx-3">
                  <BarChart team={seasonPlayerValues} variant={4} stat={"points"} />
                  <BarChart team={seasonPlayerValues} variant={1} stat={"assists"} />
                  <BarChart team={seasonPlayerValues} variant={2} stat={"assists"} />
                </div>
              </div>

              <div className="border-2 border-transparent bggrayd-nohov w-full whitespace-nowrap">
                <div className="flex flex-row flex-1 items-center">
                  <TextTicker content={"Player Stat Tracker"} />
                </div>
              </div>
              <div className="grid grid-rows-auto gap-4 w-full mt-5 pb-10 grid-flow-col">
                {teamPlayerNames.map((n, idx) => (
                  <div key={`statBlock${idx}`} className="flex flex-1 flex-col justify-start items-center">
                    <PlayerStatBlock allPlayers={seasonPlayerValues} selectedPlayer={teamPlayerNames[idx]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="row-span-5">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


