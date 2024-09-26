import TeamsLayout from './TeamsLayout';
import { addPlayer, getPlayersFromTeam } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
  params: {
    leagueId: string;
    seasonId: string;
    teamId: string;
  };
}

export default async function TeamsPage({ params }: IPage) {
  const { leagueId, seasonId, teamId } = params;
  const players = await getPlayersFromTeam(
    leagueId,
    seasonId,
    teamId
  );
  return (
    <TeamsLayout params={params} />
  );
}