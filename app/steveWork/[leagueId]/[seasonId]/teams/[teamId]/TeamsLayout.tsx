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
        <>
            <TeamsContent params={params} />
            <AdminFooter />
        </>
    );
}