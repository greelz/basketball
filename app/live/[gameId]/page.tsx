import {
  finalizeGame,
  findLeagueAndSeasonByGameId,
  incrementStat,
  getLiveGameData,
} from "@/app/database";
import PlayerIncrementor from "./PlayerIncrementor";
import {revalidatePath} from "next/cache";

interface LiveGameParams {
  params: Promise<{gameId: string}>;
}

export default async function LiveGame(props: LiveGameParams) {
  const params = await props.params;
  const gameId = params.gameId;
  const findLeagueResult = await findLeagueAndSeasonByGameId(params.gameId);

  let leagueId: string, seasonId: string;
  if (findLeagueResult) {
    ({leagueId, seasonId} = findLeagueResult);
  } else {
    return <div>We couldn't find this game. Check your URL.</div>;
  }

  const {
    team1,
    team2,
    team1Name,
    team2Name,
    gameover,
    team1Players,
    team2Players,
  } = await getLiveGameData(leagueId, seasonId, gameId);

  return (
    <>
      <h4 className="text-center text-xl">
        {team1Name} vs {team2Name} {gameover ? "[Final]" : ""}
      </h4>
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
        gameIsOver={gameover}
        leagueId={leagueId}
        seasonId={seasonId}
        gameId={gameId}
        team1Players={team1Players}
        team2Players={team2Players}
        team1Name={team1Name || "no name found"}
        team2Name={team2Name || "no name found"}
      />
    </>
  );
}
