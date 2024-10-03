import { getGamesForSeason, getSeasons, getTeamsForSeason } from '@/app/database';
import AdminPanel from './AdminPanel';
import { useState } from 'react';

const leagueId = "PzZH38lp1R6wYs5Luf67";


export default async function AdminPage() {
    const seasons = await getSeasons(leagueId);

    // const handleSelectSeason = async (leagueId: string, seasonId: string) => {
    //     console.log("Selected Season:", seasonId);
    //     const teams = await getTeamsForSeason(leagueId, seasonId);
    //     const games = await getGamesForSeason(leagueId, seasonId);
    //     return { games, teams }

    // };

    if (!seasons || seasons.length === 0) {
        return <div>Loading...</div>; // loader
    }
    return (
        <AdminPanel leagueId={leagueId} seasons={seasons} />
    );
}