import AdminSidebar from '../../../../../steveWork/components/admin/AdminSidebar';
import TeamsContent from './TeamsContent';
import AdminFooter from '../../../../../steveWork/components/admin/AdminFooter';

interface IPage {
    params: {
      leagueId: string;
      seasonId: string;
      teamId: string;
    };
  }

export default function TeamsLayout({ params }: IPage) {
    return (
        <div className="flex h-screen ">
            <AdminSidebar />
            <div className="flex-1 flex flex-col ">
                <TeamsContent params={params} />
                <AdminFooter />
            </div>
        </div>
    );
}