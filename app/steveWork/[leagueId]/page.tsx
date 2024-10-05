import LeagueLayout from '../../steveWork/[leagueId]/LeagueLayout';
import { revalidatePath } from "next/cache";
import { addSeason, addTeam, getSeasons } from "@/app/database";
import LeagueContent from './LeagueContent';
import AdminFooter from '../components/admin/AdminFooter';

interface LeaguePageProps {
  params: { leagueId: string };
}

interface IIdAndName {
  id: string;
  name: string;
}
interface ILinkListProps {
  data: IIdAndName[];
  slug: string;
}

export default async function LeaguePage({ params, data, slug }: LeaguePageProps & ILinkListProps) {
  const seasons = await getSeasons(params.leagueId);
  console.log('Data in leagueID/page:', seasons);

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
