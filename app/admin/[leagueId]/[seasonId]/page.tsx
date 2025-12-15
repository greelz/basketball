import LinkList from '@/app/components/LinkList';
import {addGame, addTeam, getGamesForSeason, getTeamsForSeason} from '@/app/database';
import {Team} from '@/app/types';
import {revalidatePath} from 'next/cache';
import Form from "@/app/components/BasketballForm";

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
  return teams.find((t) => t.id === teamId)?.name;
}

function formatDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

export default async function SeasonPage({params}: PageProps<'/admin/[leagueId]/[seasonId]'>) {
  const {leagueId, seasonId} = await params;
  const teams = await getTeamsForSeason(leagueId, seasonId);
  const games = await getGamesForSeason(leagueId, seasonId);

  const today = new Date();
  // Format games to contain the timestamp
  for (let i = 0; i < games.length; ++i) {
    const teamA = getTeamNameFromCachedTeams(games[i].team1, teams);
    const teamB = getTeamNameFromCachedTeams(games[i].team2, teams);
    const timestamp = games[i].date.toDate().toLocaleString();
    games[i].name = `${teamA} v ${teamB} - ${timestamp}${games[i].name ? ` [${games[i].name}]` : ''
      }`;
  }

  games.sort((a, b) => {
    const aDate = a.date.toDate();
    const bDate = b.date.toDate();
    if (aDate > bDate) return 1;
    if (bDate > aDate) return -1;
    return 0;
  });

  return (
    <div className='flex flex-col gap-10 p-6'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-3xl text-center'>Games</h1>
        <LinkList data={games} slug="/live" />
        <div className='max-w-120'>
          <Form
            title="Add a game"
            action={async (formData) => {
              'use server';
              const teams = formData.getAll('teams');
              if (teams?.length !== 2) return; // don't need to add error handling, just don't add
              const gameName = formData.get('gameName') as string;
              const date = new Date(formData.get('datetime') as string);
              await addGame(
                leagueId,
                seasonId,
                teams[0] as string,
                teams[1] as string,
                gameName,
                date
              );
              revalidatePath('/');
            }}
          >
            <div className='flex flex-col gap-3'>
              <fieldset className="border-1 rounded-sm p-2">
                <legend>Teams - must check 2</legend>
                {teams.map((t) => (
                  <div key={t.id} className='flex gap-1 items-center'>
                    <input type="checkbox" id={t.id} name="teams" value={t.id} />
                    <label htmlFor={t.id}>{t.name}</label>
                  </div>
                ))}
              </fieldset>
              <div>
                <label htmlFor="gameName">Description: </label>
                <input className='input-default' type="text" name="gameName" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="datetime">Date and time: </label>
                <input
                  type="datetime-local"
                  required
                  name="datetime"
                  autoComplete="off"
                  defaultValue={formatDate(today)}
                  className='input-default'
                />
              </div>
            </div>
            <button className='btn-blue mt-4' type="submit">Add Game</button>
          </Form>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <h1 className='text-3xl text-center'>Teams</h1>
        <LinkList data={teams} slug={`/admin/${leagueId}/${seasonId}/teams`} />
        <div className='max-w-120'>
          <Form
            title="Add a team"
            action={async (formData) => {
              'use server';
              const teamName = formData.get('teamName') as string;
              await addTeam(leagueId, seasonId, teamName);
              revalidatePath('/');
            }}
          >
            <div>
              <label htmlFor="teamName">Team Name: </label>
              <input className='input-default' type="text" name="teamName" autoComplete="off" />
            </div>
            <button className='btn-blue mt-4' type="submit">Add Team</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
