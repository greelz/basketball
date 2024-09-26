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
        <div className="flex flex-col">
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
                className="w-full mx-auto bgdgray px-0 py-2 m-0 text-black"
            >
                <fieldset className="flex space-x-4 border-transparent">
                    <legend className="">Choose Your Teams</legend>

                    {/* First select dropdown */}
                    <select name="teams" className="w-full p-2 m-0 border-gray-300 rounded focus:ring-blue-800 focus:border-blue-800 text-black">
                        {teams.map((team) => (
                            <option className="w-full" key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex flex-1 justify-center align-center items-center">
                        <p className="align-center text-center">VS</p>
                    </div>
                    {/* Second select dropdown */}
                    <select name="teams" className="w-full p-2 m-0 border-gray-300 rounded focus:ring-blue-800 focus:border-blue-800 text-black">
                        {teams.map((team) => (
                            <option className="w-full" key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <div className="mb-4">
                    <label htmlFor="gameName" className="block  mb-1">Location:</label>
                    <input type="text" name="gameName" id="gameName" autoComplete="off" className="w-full p-2 border border-gray-300 rounded text-black" />
                </div>
                <div className="mb-4">
                    <label htmlFor="datetime" className="block  mb-1">Date and time:</label>
                    <input
                        type="datetime-local"
                        name="datetime"
                        id="datetime"
                        required
                        autoComplete="off"
                        defaultValue="2024-06-01T17:30"
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <button type="submit" className="bgbblue mx-auto ">Add Game</button>
            </form>
        </div>
    )
}