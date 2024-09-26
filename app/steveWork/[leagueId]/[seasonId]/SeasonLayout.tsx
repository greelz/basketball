"use server"
import SeasonContent from './SeasonContent';
import AdminFooter from '../../../steveWork/components/admin/AdminFooter';
import {
    getGamesForSeason,
    getTeamsForSeason,
} from "@/app/database";
import { Team } from "@/app/types";

interface IPage {
    params: { leagueId: string; seasonId: string };
}

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
    return teams.find((t) => t.id === teamId)?.name;
}

export default async function SeasonLayout({ params }: IPage) {
    const leagueId = params.leagueId;
    const seasonId = params.seasonId;

    const teams = await getTeamsForSeason(leagueId, seasonId);
    const games = await getGamesForSeason(leagueId, seasonId);

    // Format games with team names and timestamps
    games.forEach((game) => {
        const teamA = getTeamNameFromCachedTeams(game.team1, teams);
        const teamB = getTeamNameFromCachedTeams(game.team2, teams);
        // const timestamp = game.date.toDate().toLocaleString();
        game.name = `${teamA} vs ${teamB}${game.name ? ` [${game.name}]` : ""}`;
    });

    // Sort games by date
    games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());
    //Separate Date and Time of games to variable
    const gameDates = games.map((game) => {
        const date = game.date.toDate().toLocaleDateString();
        const time = game.date.toDate().toLocaleTimeString();
        return { date: date, time: time };
    });
    console.log('Data in LeagueLayout:', games);

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex-1 flex flex-col">
                    <SeasonContent params={params} games={games} gameDates={gameDates} gameSlug={"/steveWork/live"} teams={teams} teamSlug={`/admin/${leagueId}/${seasonId}/teams`} />
                </div>
                <AdminFooter />
            </div >
        </>
    );
}