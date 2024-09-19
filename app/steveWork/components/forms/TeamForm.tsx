import { addTeam } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
    params: { leagueId: string; seasonId: string };
}



export default async function TeamForm({ params }: IPage) {

    const leagueId = params.leagueId;
    const seasonId = params.seasonId;

    return (
        <form
            action={async (formData) => {
                "use server";
                const teamName = formData.get("teamName") as string;
                await addTeam(leagueId, seasonId, teamName);
                revalidatePath("/");
            }}
            className="min-w-full"
        >
            <div className="mb-4">
                <label htmlFor="teamName" className="block text-sm font-medium mb-1">Team Name:</label>
                <input type="text" name="teamName" id="teamName" autoComplete="off" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="btn btn-primary">Add Team</button>
        </form>
    )
}