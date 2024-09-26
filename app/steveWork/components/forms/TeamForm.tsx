import { addTeam } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
    params: { leagueId: string; seasonId: string };
}



export default async function TeamForm({ params }: IPage) {

    const leagueId = params.leagueId;
    const seasonId = params.seasonId;

    return (
        <div className="flex flex-col">
            <form
                action={async (formData) => {
                    "use server";
                    const teamName = formData.get("teamName") as string;
                    await addTeam(leagueId, seasonId, teamName);
                    revalidatePath("/");
                }}
                className="w-full mx-auto bgdgray px-0 py-2 m-0 text-black"
            >
                <div className="w-full p-2 mx-0">
                    <label htmlFor="teamName" className="block text-sm font-medium mb-1">Team Name:</label>
                    <input type="text" name="teamName" id="teamName" autoComplete="off" className="w-full p-2 border border-gray-300 rounded text-black" />
                </div>
                <button type="submit" className="bgbblue mx-auto">Add Team</button>
            </form>
        </div>
    )
}