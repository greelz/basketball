import { getGamesForSeason, getSeasons, getTeamsForSeason } from '@/app/database';
import AdminPanel from './AdminPanel';
const leagueId = "v6Drfl2JmEDvFaWzwYvm";


export default async function AdminPage() {
    const seasons = await getSeasons(leagueId);



    if (!seasons || seasons.length === 0) {
        return <div>Loading content...</div>; // loader
    }
    return (
        <AdminPanel leagueId={leagueId} seasons={seasons} />
    );
}