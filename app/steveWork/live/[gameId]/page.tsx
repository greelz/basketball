
import LiveLayout from './LiveLayout';
import {
  finalizeGame,
  findLeagueAndSeasonByGameId,
  getTeamNameByTeamId,
  getTeamPlayersFromGame,
  incrementStat,
  isGameOver,
} from "@/app/database";
import React from "react";
import PlayerIncrementor from "./PlayerIncrementor";
import { revalidatePath } from "next/cache";

interface LiveGameParams {
  params: { gameId: string };
}

export default async function LiveGame({ params }: LiveGameParams) {
  const gameId = params.gameId;
  const findLeagueResult = await findLeagueAndSeasonByGameId(params.gameId);
  let leagueId: string, seasonId: string;

  // const dataStore = (team1Id, team2Id, gameIsOver, leagueId, seasonId, gameId, team1Players, team2Players, team1Name, team2Name, incrementStat, finalizeGame) => {
  //   const data = {
  //     team1Id,
  //     team2Id,
  //     gameIsOver,
  //     leagueId,
  //     seasonId,
  //     gameId,
  //     team1Players,
  //     team2Players,
  //     team1Name,
  //     team2Name,
  //     incrementStat,
  //     finalizeGame
  //   };
  //   return data;
  // };

  // const extractData = (data) => {
  //   const {
  //     team1Id,
  //     team2Id,
  //     gameIsOver,
  //     leagueId,
  //     seasonId,
  //     gameId,
  //     team1Players,
  //     team2Players,
  //     team1Name,
  //     team2Name,
  //     incrementStat,
  //     finalizeGame
  //   } = data;

  //   return {
  //     team1Id,
  //     team2Id,
  //     gameIsOver,
  //     leagueId,
  //     seasonId,
  //     gameId,
  //     team1Players,
  //     team2Players,
  //     team1Name,
  //     team2Name,
  //     incrementStat,
  //     finalizeGame
  //   };
  // };

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



  // const passData = dataStore(team1,
  //   team2,
  //   gg,
  //   leagueId,
  //   seasonId,
  //   gameId,
  //   team1players,
  //   team2players,
  //   teamName1,
  //   teamName2,
  //   incrementStat,
  //   finalizeGame);

  return (
    <div className='steveBox '>
      <LiveLayout params={params} />
    </div>
  );
}