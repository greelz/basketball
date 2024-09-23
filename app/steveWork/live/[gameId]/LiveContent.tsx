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
import ShotTracker from "../../components/ShotTracker";

interface LiveGameParams {
  params: { gameId: string };
}

export default async function LiveGame({ params }: LiveGameParams) {
  const gameId = params.gameId;
  const findLeagueResult = await findLeagueAndSeasonByGameId(params.gameId);
  let leagueId: string, seasonId: string;



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

  return (
    <main className="flex-1 p-6 bg-gray-100  ">
      <div className="">
        <h4 className="text-center text-black">
          {teamName1} vs {teamName2} {gg ? "[Final]" : ""}
        </h4>
      </div>
      <div className="min-w-full text-black my-6  ">
        <PlayerIncrementor
          incrementStat={async (playerId, field, val) => {
            "use server";
            incrementStat(leagueId, seasonId, gameId, playerId, field, val);
          }}
          finalizeGame={async () => {
            "use server";
            finalizeGame(leagueId, seasonId, gameId);
            revalidatePath('/');
          }}
          team1Id={team1}
          team2Id={team2}
          gameIsOver={gg}
          leagueId={leagueId}
          seasonId={seasonId}
          gameId={gameId}
          team1Players={team1players}
          team2Players={team2players}
          team1Name={teamName1}
          team2Name={teamName2}
        />
      </div>

    </main>
  );
}
