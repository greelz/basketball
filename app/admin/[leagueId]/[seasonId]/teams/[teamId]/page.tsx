import LinkList from "@/app/components/LinkList";
import { addPlayer, getPlayersFromTeam } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
  params: {
    leagueId: string;
    seasonId: string;
    teamId: string;
  };
}
export default async function SeasonPage({ params }: IPage) {
  const { leagueId, seasonId, teamId } = params;
  const players = await getPlayersFromTeam(
    leagueId,
    seasonId,
    teamId
  );
  return (
    <>
      <h1>Players</h1>
      <LinkList data={players} slug={`/admin/${leagueId}/${seasonId}/teams/${teamId}`} />
      <form
        action={async (formData) => {
          "use server";
          const playerName = formData.get("playerName") as string;
          await addPlayer(
            params.leagueId,
            params.seasonId,
            params.teamId,
            playerName
          );
          revalidatePath("/");
        }}
        className="text-black"
      >
        <div>
          <label htmlFor="playerName">Name: </label>
          <input type="text" name="playerName" autoComplete="off" />
        </div>
        <button type="submit">Add Player</button>
      </form>
    </>
  );
}