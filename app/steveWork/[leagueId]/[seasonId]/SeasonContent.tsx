"use server";
import LinkListGames from "@/app/components/LinkListGames";
import {
    getGamesForSeason,
    getTeamsForSeason,
} from "@/app/database";
import { Team } from "@/app/types";
import ToggleCollapse from "../../components/web/ToggleCollapse";
import GameForm from "../../components/forms/GameForm";
import TeamForm from "../../components/forms/TeamForm";

interface IPage {
    params: { leagueId: string; seasonId: string };
}

function getTeamNameFromCachedTeams(teamId: string, teams: Team[]) {
    return teams.find((t) => t.id === teamId)?.name;
}


export default async function SeasonContent({ params }: IPage) {
    const leagueId = params.leagueId;
    const seasonId = params.seasonId;

    const teams = await getTeamsForSeason(leagueId, seasonId);
    const games = await getGamesForSeason(leagueId, seasonId);

    // Format games with team names and timestamps
    games.forEach((game) => {
        const teamA = getTeamNameFromCachedTeams(game.team1, teams);
        const teamB = getTeamNameFromCachedTeams(game.team2, teams);
        const timestamp = game.date.toDate().toLocaleString();
        game.name = `${teamA} vs ${teamB} - ${timestamp}${game.name ? ` [${game.name}]` : ""}`;
    });

    // Sort games by date
    games.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());

    return (
        <main className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-hidden">
            <ToggleCollapse title={`All Games (${games.length})`} content={<div className="mb-20"><LinkListGames data={games} slug="/steveWork/live" /></div>} />
            <ToggleCollapse title="Add Game" content={<div className="mb-20"><GameForm params={params} /></div>} />
            <ToggleCollapse title={`All Teams (${teams.length})`} content={<div className="mb-20"><LinkListGames data={teams} slug={`/steveWork/${leagueId}/${seasonId}/teams`} /></div>} />
            <ToggleCollapse title="Add Team" content={<div className="mb-20"><TeamForm params={params} /></div>} />
        </main>
    );
}