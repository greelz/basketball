import { revalidatePath } from "next/cache";
import { addSeason, addTeam, getSeasons } from "@/app/database";
import LeagueContent from './LeagueContent';
import AdminFooter from '../components/admin/AdminFooter';

interface Props {
  params: { leagueId: string };
  slug: string;
}

export default async function LeaguePage({ params, slug }: Props) {
  const seasons = await getSeasons(params.leagueId);
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col">
          <LeagueContent params={params} data={seasons} slug={slug} />
        </div>
        <AdminFooter />
      </div >
    </>
  );
}
