import AdminSidebar from '../../../steveWork/components/admin/AdminSidebar';
import SeasonContent from './SeasonContent';
import AdminFooter from '../../../steveWork/components/admin/AdminFooter';

interface IPage {
    params: { leagueId: string; seasonId: string };
}

export default function SeasonLayout({ params }: IPage) {
    return (
        <div className="flex h-screen ">
            <AdminSidebar />
            <div className="flex-1 flex flex-col ">
                <SeasonContent params={params} />
                <AdminFooter />
            </div>
        </div>
    );
}