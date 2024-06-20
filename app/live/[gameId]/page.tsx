import {
  finalizeGame,
  findLeagueAndSeasonByGameId,
  getGameStatistics,
  getTeamNameByTeamId,
  incrementStat,
} from "@/app/database";
import React from "react";
import { revalidatePath } from "next/cache";
import PlayerIncrementor from "./PlayerIncrementor";

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

  const { playerStats, team1, team2, gg } = await getGameStatistics(
    leagueId,
    seasonId,
    gameId
  );
  const teamName1 = await getTeamNameByTeamId(leagueId, seasonId, team1);
  const teamName2 = await getTeamNameByTeamId(leagueId, seasonId, team2);

  return (
    <>
      <h4 className="text-center">
        {teamName1} vs {teamName2} {gg ? '[Final]' : ''}
      </h4>
      <PlayerIncrementor
        incrementStat={async (playerId, field, val) => {
          "use server";
          incrementStat(leagueId, seasonId, gameId, playerId, field, val);
          revalidatePath("/");
        }}
        finalizeGame={async () => {
          "use server";
          finalizeGame(leagueId, seasonId, gameId);
          revalidatePath("/");
        }}
        playerStats={playerStats}
        team1Id={team1}
        team2Id={team2}
        gameIsOver={gg}
      />
    </>
  );
}
