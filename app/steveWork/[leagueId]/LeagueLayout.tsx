import AdminSidebar from '../../steveWork/components/admin/AdminSidebar';
import LeagueContent from './LeagueContent';
import AdminFooter from '../../steveWork/components/admin/AdminFooter';

interface LeaguePageProps {
  params: { leagueId: string };
}

export default function LeagueLayout({ params }: LeaguePageProps) {
  return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <LeagueContent params={params} />
          <AdminFooter />
        </div>
      </div>
  );
}