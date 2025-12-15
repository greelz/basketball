import LinkList from "@/app/components/LinkList";
import {addPlayer, getPlayersFromTeam} from "@/app/database";
import {revalidatePath} from "next/cache";
import Form from "@/app/components/BasketballForm";

interface IPage {
  params: Promise<{
    leagueId: string;
    seasonId: string;
    teamId: string;
  }>;
}
export default async function SeasonPage(props: IPage) {
  const params = await props.params;
  const {leagueId, seasonId, teamId} = params;
  const players = await getPlayersFromTeam(
    leagueId,
    seasonId,
    teamId
  );
  return (
    <div className="p-2 flex flex-col gap-3">
      <h1 className="text-3xl text-center">Players</h1>
      <LinkList data={players} slug={`/admin/${leagueId}/${seasonId}/teams/${teamId}`} />
      <div className="max-w-100">
        <Form
          title="Add a player"
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
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-1">
              <label htmlFor="playerName">Name: </label>
              <input className="input-default" type="text" name="playerName" id="playerName" autoComplete="off" />
            </div>
            <button className="btn-blue w-50" type="submit">Add Player</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
