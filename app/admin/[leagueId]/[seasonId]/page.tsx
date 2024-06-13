"use server";
import LinkList from "@/app/components/LinkList";
import {
  addGame,
  addTeam,
  getGamesForSeason,
  getTeamsForSeason,
} from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
  params: { leagueId: string; seasonId: string };
}
export default async function SeasonPage({ params }: IPage) {
  const teams = await getTeamsForSeason(params.leagueId, params.seasonId);
  const games = await getGamesForSeason(params.leagueId, params.seasonId);
  // const data = await getData(params.leagueId);
  return (
    <>
      <div>
        <h1>Teams</h1>
        <LinkList
          data={teams}
          slug={`/admin/${params.leagueId}/${params.seasonId}/teams`}
        />
        <form
          action={async (formData) => {
            "use server";
            const teamName = formData.get("teamName") as string;
            await addTeam(params.leagueId, params.seasonId, teamName);
            revalidatePath("/");
          }}
        >
          <h4>Add a team</h4>
          <div className="my-3">
            <label htmlFor="teamName">Team Name: </label>
            <input type="text" name="teamName" autoComplete="off" />
          </div>
          <button type="submit">Add Team</button>
        </form>
      </div>
      <div>
        <h1>Games</h1>
        <LinkList
          data={games}
          slug='/live'
        />
        <form
          action={async (formData) => {
            "use server";
            const teams = formData.getAll("teams");
            if (teams?.length !== 2) return; // don't need to add error handling, just don't add
            const gameName = formData.get("gameName") as string;
            const date = new Date(formData.get("datetime") as string);
            await addGame(
              params.leagueId,
              params.seasonId,
              teams[0] as string,
              teams[1] as string,
              gameName,
              date
            );
            revalidatePath("/");
          }}
        >
          <div>
            <h4>Add a game</h4>
            <fieldset className="my-2">
              <legend>Teams - must check 2</legend>
              {teams.map((t) => (
                <div key={t.id}>
                  <input type="checkbox" id={t.id} name="teams" value={t.id} />
                  <label htmlFor={t.id}>{t.name}</label>
                </div>
              ))}
            </fieldset>
            <div className="my-2">
              <label htmlFor="gameName">Description: </label>
              <input type="text" required name="gameName" autoComplete="off" />
            </div>
            <div className="my-2">
              <label htmlFor="datetime">Date and time: </label>
              <input
                type="datetime-local"
                required
                name="datetime"
                autoComplete="off"
                value="2024-06-01T17:30"
              />
            </div>
          </div>
          <button type="submit">Add Game</button>
        </form>
      </div>
    </>
  );
}
