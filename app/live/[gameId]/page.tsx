import {
  findLeagueAndSeasonByGameId,
  getGameStatistics,
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

  const { playerStats, team1, team2 } = await getGameStatistics(leagueId, seasonId, gameId);

  return (
    <>
      <PlayerIncrementor
        incrementStat={async (playerId, field, val) => {
          "use server";
          incrementStat(leagueId, seasonId, gameId, playerId, field, val);
          revalidatePath("/live");
        }}
        playerStats={playerStats}
        team1Id={team1}
        team2Id={team2}
      />
    </>
  );
}
