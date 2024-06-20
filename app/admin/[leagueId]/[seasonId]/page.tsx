"use server";
import LinkList from "@/app/components/LinkList";
import {
  addGame,
  addTeam,
  getGamesForSeason,
  getTeamNameByTeamId,
  getTeamsForSeason,
} from "@/app/database";
import { Timestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";

interface IPage {
  params: { leagueId: string; seasonId: string };
}
export default async function SeasonPage({ params }: IPage) {
  const leagueId = params.leagueId;
  const seasonId = params.seasonId;
  const teams = await getTeamsForSeason(params.leagueId, params.seasonId);
  const games = await getGamesForSeason(params.leagueId, params.seasonId);
  // Format games to contain the timestamp
  for (let i = 0; i < games.length; ++i) {
    const teamA = await getTeamNameByTeamId(leagueId, seasonId, games[i].team1);
    const teamB = await getTeamNameByTeamId(leagueId, seasonId, games[i].team2);
    const timestamp = (games[i].date as Timestamp).toDate().toLocaleString();
    games[i].name = `${teamA} v ${teamB} - ${timestamp}${
      games[i].name ? ` [${games[i].name}]` : ""
    }`;
  }
  games.forEach(
    async (g) =>
      (g.name += `${await getTeamNameByTeamId(
        params.leagueId,
        params.seasonId,
        g.team1
      )} vs. ${await getTeamNameByTeamId(
        params.leagueId,
        params.seasonId,
        g.team2
      )} - ${(g.date as Timestamp).toDate().toLocaleString()} ${g.name}`)
  );

  games.sort((a, b) => {
    const aDate = (a.date as Timestamp).toDate();
    const bDate = (b.date as Timestamp).toDate();
    if (aDate > bDate) return 1;
    if (bDate > aDate) return -1;
    return 0;
  });

  return (
    <>
      <div>
        <h1>Games</h1>
        <LinkList data={games} slug="/live" />
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
              <input type="text" name="gameName" autoComplete="off" />
            </div>
            <div className="my-2">
              <label htmlFor="datetime">Date and time: </label>
              <input
                type="datetime-local"
                required
                name="datetime"
                autoComplete="off"
                defaultValue="2024-06-01T17:30"
              />
            </div>
          </div>
          <button type="submit">Add Game</button>
        </form>
      </div>
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
    </>
  );
}
