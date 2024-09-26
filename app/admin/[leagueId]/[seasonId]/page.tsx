"use server";
import LinkList from "@/app/components/LinkList";
import {
  addGame,
  addTeam,
  getGamesForSeason,
  getTeamsForSeason,
} from "@/app/database";
import { Team } from "@/app/types";
import { revalidatePath } from "next/cache";
import Link from "next/link";

interface IPage {
  params: { leagueId: string; seasonId: string };
}

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
  return teams.find((t) => t.id === teamId)?.name;
}

export default async function SeasonPage({ params }: IPage) {
  const leagueId = params.leagueId;
  const seasonId = params.seasonId;

  const teams = await getTeamsForSeason(leagueId, seasonId);
  const games = await getGamesForSeason(leagueId, seasonId);

  // Format games with team names and timestamps
  games.forEach((game) => {
    const teamA = getTeamNameFromCachedTeams(game.team1, teams);
    const teamB = getTeamNameFromCachedTeams(game.team2, teams);
    const timestamp = game.date.toDate().toLocaleString();
    game.name = `${teamA} vs ${teamB} - ${timestamp}${game.name ? ` [${game.name}]` : ""}`;
  });

  // Sort games by date
  games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());
 

  console.log('getTeams params::*******************************************');
  console.log(params);
  console.log('teams?:*******************************************');
  console.log(teams);
  console.log('games?:*******************************************');
  console.log(games);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 h-screen">
      {/* Top Left Quadrant */}
      <div className="border p-4 bg-white/75 rounded shadow-md mt-20">
        <h1 className="text-2xl font-bold mb-4">GAMES</h1>
        <div className="flex overflow-x-auto whitespace-nowrap">
          <LinkList data={games} slug="/live" />
        </div>
      </div>

      {/* Top Right Quadrant */}
      <div className="border p-4 bg-white/75 rounded shadow-md mt-20 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">ADD A GAME</h1>
        <form
          action={async (formData) => {
            "use server";
            const teams = formData.getAll("teams");
            if (teams.length !== 2) return; // Ensure exactly 2 teams are selected
            const gameName = formData.get("gameName") as string;
            const date = new Date(formData.get("datetime") as string);
            await addGame(leagueId, seasonId, teams[0] as string, teams[1] as string, gameName, date);
            revalidatePath("/");
          }}
          className="flex-1 flex-col min-w-full h-full"
        >
          <fieldset className="mb-4 flex-1">
            <legend className="font-semibold">Teams - must check 2</legend>
            {teams.map((team) => (
              <div key={team.id} className="flex items-center mb-2">
                <input type="checkbox" id={team.id} name="teams" value={team.id} className="mr-2" />
                <label htmlFor={team.id} className="text-sm">{team.name}</label>
              </div>
            ))}
          </fieldset>
          <div className="mb-4">
            <label htmlFor="gameName" className="block text-sm font-medium mb-1">Description:</label>
            <input type="text" name="gameName" id="gameName" autoComplete="off" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="datetime" className="block text-sm font-medium mb-1">Date and time:</label>
            <input
              type="datetime-local"
              name="datetime"
              id="datetime"
              required
              autoComplete="off"
              defaultValue="2024-06-01T17:30"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-auto ">Add Game</button>
        </form>
      </div>

      {/* Bottom Left Quadrant */}
      <div className="border p-4 bg-white/75 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">TEAMS</h1>
        <div className="flex overflow-x-auto whitespace-nowrap">
          <LinkList
            data={teams}
            slug={`/admin/${leagueId}/${seasonId}/teams`}
          />
        </div>
      </div>

      {/* Bottom Right Quadrant */}
      <div className="border p-4 bg-white/75 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">ADD A TEAM</h1>
        <form
          action={async (formData) => {
            "use server";
            const teamName = formData.get("teamName") as string;
            await addTeam(leagueId, seasonId, teamName);
            revalidatePath("/");
          }}
          className="min-w-full"
        >
          <div className="mb-4">
            <label htmlFor="teamName" className="block text-sm font-medium mb-1">Team Name:</label>
            <input type="text" name="teamName" id="teamName" autoComplete="off" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="btn btn-primary">Add Team</button>
        </form>
      </div>
    </div>
  );
}
