import AdminFooter from '../../../steveWork/components/admin/AdminFooter';
import React from "react";
import HomeContent from './HomeContent';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { League } from "../../../types";
import { getAllPlayerStats, getGamesForSeason, getSeasons, getSeasonSchedule, getTeamsForSeason } from '@/app/database';

interface LeaguesPageProps {
  leagues: League[];
}

export default async function HomeLayout() {
  //   const data = await getData();
  //   console.log('Data in HomeLayout:', data);

  //   const [teams, games] = await Promise.all([
  //     getTeamsForSeason("PzZH38lp1R6wYs5Luf67", "NQ7C9eCOxkV6NWwi73Gj"),
  //     getGamesForSeason("PzZH38lp1R6wYs5Luf67", "NQ7C9eCOxkV6NWwi73Gj")
  // ]);
  // games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());
  // games.forEach((game) => {
  //     const teamA = getTeamNameFromCachedTeams(game.team1, teams);
  //     const teamB = getTeamNameFromCachedTeams(game.team2, teams);

  //     const dateObj = game.date.toDate();
  //     const formattedDate = dateObj.toLocaleDateString('en-US', {
  //         month: '2-digit',
  //         day: '2-digit'
  //     });
  //     const formattedTime = dateObj.toLocaleTimeString();

  //     game.date = { date: formattedDate, time: formattedTime };
  //     game.name = `${formattedDate} ${teamA} vs ${teamB}${game.name ? ` [${game.name}]` : ""}`;
  //     game.team1name = teamA;
  //     game.team2name = teamB;

  //     if (game.gameover && game.team1score > game.team2score) {
  //         game.victor = game.team1name;
  //         game.loser = game.team2name;
  //         game.victorScore = game.team1score;
  //         game.loserScore = game.team2score;
  //     } else if (game.gameover && game.team1score < game.team2score) {
  //         game.victor = game.team2name;
  //         game.loser = game.team1name;
  //         game.victorScore = game.team2score;
  //         game.loserScore = game.team1score;
  //     }
  // });


  // const seasons = await getSeasons('PzZH38lp1R6wYs5Luf67');
  // console.log(seasons);
  // const today = new Date();
  // const unfinishedGames = games.filter(g => !g.gameover)
  // const finishedGames = games.filter(g => !g.gameover)
  // const upcomingGames = games.filter((g) => {
  //     const gameDate = new Date(g.date.date);
  //     return gameDate >= today;
  // });

  return (<>
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col">
        <HomeContent />
      </div>
      <AdminFooter />
    </div >
  </>
  );
}

// async function getData(): Promise<League[]> {
//   const leaguesSnapshot = await getDocs(collection(db, "leagues"));
//   const leagues: League[] = leaguesSnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as League[];
//   return leagues;
// }

// function getTeamNameFromCachedTeams(teamId: string, games: Team[]) {
//   return games.find((g) => t.team1 === teamId)?.name;
// }