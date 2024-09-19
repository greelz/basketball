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
    <div className="steveBox">
      <h1>Players</h1>
      <LinkList data={players} slug={`/admin/${leagueId}/${seasonId}/teams/${teamId}`} />
      <div className="container">
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
          className="min-w-full"
        >
          <div className="flex-1 flex-col">
            <label className="text-black" htmlFor="playerName">Name: </label>
            <input className="min-w-full" type="text" id="playerName" name="playerName" autoComplete="off" />
            <button className="mt-2" type="submit">Add Player</button>
          </div>

        </form>
      </div>
    </div>
  );
}
