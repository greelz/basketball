import SeasonContent from './SeasonContent';
import AdminFooter from '../../../steveWork/components/admin/AdminFooter';
import {
    findFinishedGameIdsByTeamId,
    findUpcomingGamesByTeamId,
    getGamesForSeason,
    getSeasons,
    getSeasonStatisticsRegenerate,
    getSeasonTeamStatsforAverages,
    getTeamsForSeason,
    getTeamStatsforGame,
} from "@/app/database";
import { Team } from "@/app/types";
import { getSeasonGamesTeams } from '@/app/uxDb';
import { getDatabase } from 'firebase/database';

interface IPage {
    params: { leagueId: string; seasonId: string };
}

const filterGamesbyIds = (games, gameIds) => {
    if (!Array.isArray(gameIds)) {
        console.error("gameIds is not an array");
        return [];
    }
    return games.filter(game => gameIds.includes(game.id));
}

const sortTeamsByWins = (teams: Team[]) => {
    return teams.sort((a, b) => b.wins - a.wins);
};


const combinePlayerStats = (teamPlayers) => {
    const playerStatTotals = {};
    teamPlayers.forEach(player => {
        const { id, teamId, name, ...stats } = player;
        // If the player already exists in playerStatTotals, accumulate their stats
        if (playerStatTotals[id]) {
            Object.keys(stats).forEach(stat => {
                playerStatTotals[id][stat] += stats[stat];
            });
        } else {
            // Otherwise, initialize this player's stats in playerStatTotals
            playerStatTotals[id] = { id, teamId, name, ...stats };
        }
    });
    // Convert playerStatTotals object back into an array
    return Object.values(playerStatTotals);
};

const groupPlayersByTeam = (allTeamsSeasonGameStats) => {
    const teamsWithPlayerStats = allTeamsSeasonGameStats.reduce((acc, teamStat) => {
        const { teamId, teamPlayerStats } = teamStat;
        if (!acc[teamId]) {
            acc[teamId] = [];
        }
        // Combine stats if teamPlayerStats exist for the same team
        acc[teamId] = combinePlayerStats([...acc[teamId], ...teamPlayerStats]);
        return acc;
    }, {});

    return teamsWithPlayerStats;
};

const combineTeamStats = (allTeamsSeasonPlayerStats) => {
    const teamStatTotals = {};

    // Iterate over each team's player stats array
    Object.keys(allTeamsSeasonPlayerStats).forEach(teamId => {
        const players = allTeamsSeasonPlayerStats[teamId];

        players.forEach(player => {
            const { name, id, teamId, ...stats } = player;

            // If the team already exists in teamStatTotals, accumulate their stats
            if (teamStatTotals[teamId]) {
                Object.keys(stats).forEach(stat => {
                    teamStatTotals[teamId][stat] = (teamStatTotals[teamId][stat] ?? 0) + (stats[stat] ?? 0);
                });
            } else {
                // Initialize this team's stats
                teamStatTotals[teamId] = { teamId, name, id, ...stats };
            }
        });
    });

    // Convert teamStatTotals object back into an array
    return Object.values(teamStatTotals);
};


export default async function SeasonLayout({ params }: IPage) {
    const leagueId = params.leagueId;
    const seasonId = params.seasonId;

    const seasons = await getSeasons(params.leagueId);
    const { teams, games } = await getSeasonGamesTeams(leagueId, seasonId)


    //get teamIds and names
    const teamIds = teams.map((t) => { t.id });
    const teamNames = teams.map((t) => t.name);
    //filtergames into finished and unfinished (id:string arrays)
    const unfinishedGameData = games.filter((g) => !g.gameover);
    const completedGameData = games.filter((g) => g.gameover);
    const finishedGameIds = completedGameData.map((g) => g.id);

    //get all player stats from all finished games returns{"teamplayerstats: [], "teamID"}
    const allTeamsSeasonGameStats = await Promise.all(
        teams.flatMap((t) =>  // use flatMap to flatten the nested arrays of promises
            finishedGameIds.map((g) =>
                getSeasonTeamStatsforAverages(leagueId, seasonId, g, t.id)
            )
        )

    );

    const allTeamsSeasonPlayerStats = groupPlayersByTeam(allTeamsSeasonGameStats);
    const allTeamsPlayerStatTotals = combineTeamStats(allTeamsSeasonPlayerStats);
    const completedGamesData = filterGamesbyIds(games, finishedGameIds);

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex-1 flex flex-col">
                    <SeasonContent params={params} games={games} gameSlug={"/steveWork/live"} teams={teams} teamSlug={`/steveWork/${leagueId}/${seasonId}/teams`} seasons={seasons} />
                </div>
                <AdminFooter />
            </div >
        </>
    );
}


