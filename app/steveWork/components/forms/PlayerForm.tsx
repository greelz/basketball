import LinkList from "@/app/components/LinkList";
import { addPlayer, getPlayersFromTeam } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
    params: {
        leagueId: string;
        seasonId: string;
        teamId: string;
    };
}


export default async function PlayerForm({ params }: IPage) {
    const { leagueId, seasonId, teamId } = params;
    const players = await getPlayersFromTeam(
        leagueId,
        seasonId,
        teamId
    );
    return (
        <form
            action={async (formData) => {
                "use server";
                const playerName = formData.get("playerName") as string;
                await addPlayer(
                    params.leagueId,
                    params.seasonId,
                    params.teamId,
                    playerName
                );
                revalidatePath("/");
            }}
            className="min-w-full"
        >
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="playerName">Name: </label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="playerName" name="playerName" autoComplete="off" />
            </div>
            <button className="btn btn-primary" type="submit">Add Player</button>

        </form>
    )
}