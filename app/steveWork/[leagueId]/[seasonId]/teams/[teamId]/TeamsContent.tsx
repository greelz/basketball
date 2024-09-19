import LinkListAdmin from "@/app/components/LinkListAdmin";
import { getPlayersFromTeam } from "@/app/database";
import PlayerForm from "@/app/steveWork/components/forms/PlayerForm";
import ToggleCollapse from "@/app/steveWork/components/web/ToggleCollapse";

interface IPage {
    params: {
        leagueId: string;
        seasonId: string;
        teamId: string;
    };
}
export default async function TeamsContent({ params }: IPage) {
    const { leagueId, seasonId, teamId } = params;
    const players = await getPlayersFromTeam(
        leagueId,
        seasonId,
        teamId
    );
    return (
        <main className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-hidden">
            <ToggleCollapse title={`Add a player to ${teamId}`} content={<div className="mb-20"><PlayerForm params={params} /></div>} />
            <h2 className="text-2xl font-semibold mb-6 text-black">Players</h2>
            <LinkListAdmin data={players} slug={`/steveWork/${leagueId}/${seasonId}/teams/${teamId}`} />
        </main>
    );
}