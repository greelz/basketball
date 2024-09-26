import AdminSidebar from '../../steveWork/components/admin/AdminSidebar';
import LeagueContent from './LeagueContent';
import AdminFooter from '../../steveWork/components/admin/AdminFooter';
import { getSeasons } from '@/app/database';

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

export default async function LeagueLayout({ params, data, slug }: LeaguePageProps & ILinkListProps) {
  // console.log('Data in LeagueLayout:', data);
  return (

    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col">
          <LeagueContent params={params} data={data} slug={slug} />
        </div>
        <AdminFooter />
      </div >
    </>
  );
}