import LeagueLayout from '../../steveWork/[leagueId]/LeagueLayout';
import { revalidatePath } from "next/cache";
import { addSeason, addTeam, getSeasons } from "@/app/database";

interface LeaguePageProps {
  params: { leagueId: string };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const seasons = await getSeasons(params.leagueId);
  console.log('Data in leagueID/page:', seasons);

  return (
      <LeagueLayout params={params} data={seasons} slug={`/steveWork/${params.leagueId}`} />
  );
}
