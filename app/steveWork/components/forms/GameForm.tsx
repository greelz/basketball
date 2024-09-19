import { addGame, getTeamsForSeason, } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
    params: { leagueId: string; seasonId: string };
}



export default async function GameForm({ params }: IPage) {

    const leagueId = params.leagueId;
    const seasonId = params.seasonId;

    const teams = await getTeamsForSeason(leagueId, seasonId);

    return (
        <form
            action={async (formData) => {
                "use server";
                const teams = formData.getAll("teams");
                if (teams.length !== 2) return; // Ensure exactly 2 teams are selected
                const gameName = formData.get("gameName") as string;
                const date = new Date(formData.get("datetime") as string);
                await addGame(leagueId, seasonId, teams[0] as string, teams[1] as string, gameName, date);
                revalidatePath("/");
            }}
            className="min-w-full"
        >
            <fieldset className="mb-4 flex-1">
                <legend className="font-semibold">Teams - must check 2</legend>
                {teams.map((team) => (
                    <div key={team.id} className="flex items-center mb-2">
                        <input type="checkbox" id={team.id} name="teams" value={team.id} className="mr-2" />
                        <label htmlFor={team.id} className="text-sm">{team.name}</label>
                    </div>
                ))}
            </fieldset>
            <div className="mb-4">
                <label htmlFor="gameName" className="block text-sm font-medium mb-1">Description:</label>
                <input type="text" name="gameName" id="gameName" autoComplete="off" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
                <label htmlFor="datetime" className="block text-sm font-medium mb-1">Date and time:</label>
                <input
                    type="datetime-local"
                    name="datetime"
                    id="datetime"
                    required
                    autoComplete="off"
                    defaultValue="2024-06-01T17:30"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button type="submit" className="btn btn-primary mt-auto ">Add Game</button>
        </form>
    )
}