import AdminSidebar from '../../../../../../steveWork/components/admin/AdminSidebar';
import PlayerContent from './PlayerContent';
import AdminFooter from '../../../../../../steveWork/components/admin/AdminFooter';

interface IPage {
  params: {
    leagueId: string;
    seasonId: string;
    teamId: string;
    playerId: string;
  };
}

export default function PlayerLayout({ params }: IPage) {
  return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <PlayerContent params={params} />
          <AdminFooter />
        </div>
      </div>
  );
}