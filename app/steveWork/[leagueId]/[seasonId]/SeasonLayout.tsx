"use server"
import SeasonContent from './SeasonContent';
import AdminFooter from '../../../steveWork/components/admin/AdminFooter';
import {
    findFinishedGameIdsByTeamId,
    findUpcomingGamesByTeamId,
    getGamesForSeason,
    getSeasonStatisticsRegenerate,
    getSeasonTeamStatsforAverages,
    getTeamsForSeason,
    getTeamStatsforGame,
} from "@/app/database";
import { Team } from "@/app/types";

interface IPage {
    params: { leagueId: string; seasonId: string };
}

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
    return teams.find((t) => t.id === teamId)?.name;
}

const filterGamesbyIds = (games, gameIds) => {
    if (!Array.isArray(gameIds)) {
        console.error("gameIds is not an array");
        return [];
    }
    return games.filter(game => gameIds.includes(game.id));
}

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

const combineTeamStats = (allTeamsPlayerStatTotals) => {
    const teamStatTotals = {};

    allTeamsPlayerStatTotals.forEach(player => {
        const { teamId, name, id, ...stats } = player;

        // If the team already exists in teamStatTotals, accumulate their stats
        if (teamStatTotals[teamId]) {
            Object.keys(stats).forEach(stat => {
                teamStatTotals[teamId][stat] += stats[stat] || 0; // Use 0 to handle null or undefined values
            });
        } else {
            // Otherwise, initialize this team's stats in teamStatTotals
            teamStatTotals[teamId] = { teamId, name, id, ...stats };
        }
    });

    // Convert teamStatTotals object back into an array
    return Object.values(teamStatTotals);
};



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
    //get teamIds and names
    const teamIds = teams.map((t) => { t.id });
    const teamNames = teams.map((t) => t.name);
    // //filtergames into finished and unfinished (id:string arrays)
    // const unfinishedGameData = games.filter((g) => !g.gameover);
    // const completedGameData = games.filter((g) => g.gameover);
    // const finishedGameIds = completedGameData.map((g) => g.id);

    // //get all player stats from all finished games returns{"teamplayerstats: [], "teamID"}
    // const allTeamsSeasonGameStats = await Promise.all(
    //     teams.flatMap((t) =>  // use flatMap to flatten the nested arrays of promises
    //         finishedGameIds.map((g) =>
    //             getSeasonTeamStatsforAverages(leagueId, seasonId, g, t.id)
    //         )
    //     )
    // );

    // const allTeamsSeasonPlayerStats = groupPlayersByTeam(allTeamsSeasonGameStats);
    // const allTeamsPlayerStatTotals = combineTeamStats(allTeamsSeasonPlayerStats);

    // allTeamsSeasonGameStats.map((g, idx) => console.log(`g.TeamPlayerStats ${idx} **************: ${JSON.stringify(g.teamPlayerStats, null, 2)}`));
    // console.log(`allTeamsPlayerStatTotals **************: ${JSON.stringify(allTeamsPlayerStatTotals, null, 2)}`);

    // const completedGamesData = filterGamesbyIds(games, finishedGameIds);
    // console.log(`games *********: ${JSON.stringify(games, null, 2)}`);
    // console.log(`teams **************: ${JSON.stringify(teams, null, 2)}`);
    // console.log(`teamIds *********: ${JSON.stringify(teamIds, null, 2)}`);
    // console.log(`teamNames **************: ${JSON.stringify(teamNames, null, 2)}`);
    // console.log(`completedGamesData **************: ${JSON.stringify(completedGamesData, null, 2)}`);
    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex-1 flex flex-col">
                    <SeasonContent params={params} games={games} gameDates={gameDates} gameSlug={"/steveWork/live"} teams={teams} teamSlug={`/steveWork/${leagueId}/${seasonId}/teams`} />
                </div>
                <AdminFooter />
            </div >
        </>
    );
}