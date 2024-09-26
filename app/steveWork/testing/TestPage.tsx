
import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import RightSidebar from "../components/admin/RightSidebar";
import AdminFooter from "../components/admin/AdminFooter";
import { getTeamStatsforGame, getGamesForSeason, findGameIdsByTeamId, getTeamPlayersFromGame, getThisTeamStatsFromGame, getPlayersFromTeam } from "@/app/database";
import { PlayerStats } from "@/app/types";

const leagueId = 'PzZH38lp1R6wYs5Luf67';
const seasonId = 'NQ7C9eCOxkV6NWwi73Gj';
const teamId = '1Z1jgCYq0hd9Pk9xXsls';

//dummydata

const foundGames =
  ['EvWTPOCAPLVabXz203uT',
    'MhmwelMVcoqTD5jP2Khv',
    'XqiKpopCXjOoMCey38m9',
    'fAcIMHHemlkdLUK3uiug',
    'jiVX2lIuapvPBJOtRF0E',
    'lyOBJNWPdDdLoQfX6yyf',
    'qpeWXJToPHNXaEM512QV'
  ];

export default async function TestPage() {

  // Get games for the season
  const games = await getGamesForSeason(leagueId, seasonId);
  console.log(games);

  //Find this teams completed games this season
  const finishedGames = await findGameIdsByTeamId(teamId, games);
  console.log(finishedGames);

  //get Team Player Statistics from all GameId's
  const seasonGameStats = await Promise.all(     //wait until the whole loop has finished
    finishedGames.map((g) => {    //loop over the games
      return getTeamStatsforGame(leagueId, seasonId, g, teamId); //get the player stats from the game
    }));
  console.log(seasonGameStats);

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

  const seasonPlayerValues = combinePlayerStats(seasonGameStatArray);
  console.log(seasonPlayerValues);



  return (<>
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col">
        <div className="flex h-screen">
          {/* Left Column */}
          <div className="row-span-5">
            <AdminSidebar />
          </div>
          {/* Center Column */}
          <div className="flex-1 flex flex-col justify-start items-center border-white border-r-8 m">
            <img src="/bballSVG.svg" alt="Basketball" className="max-w-sm align-center animate-bobbing" />
            <a className={`text-6xl border-2 border-transparent text-center bggrayd-nohov w-full whitespace-nowrap hover:border-white cursor-pointer`}

            >Welcome to Slab League</a>
            <div className="grid grid-cols-2 grid-rows-1 w-full h-full mt-5">
              <div className="flex flex-1 justify-center align-center">
              </div>
              <div className="flex flex-1 justify-center align-center">
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="row-span-5">
            <RightSidebar />
          </div>
        </div>
      </div>
      <AdminFooter />
    </div >
  </>
  );
}