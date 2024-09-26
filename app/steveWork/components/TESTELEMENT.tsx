
import { addGame, getTeamsForSeason, } from "@/app/database";
import { revalidatePath } from "next/cache";

interface IPage {
    params: { leagueId: string; seasonId: string };
}



export default async function GameForm2({ params }: IPage) {

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
            className="max-w-sm mx-auto bg-gray-100"
        >
            <fieldset className="">
                <legend className=""></legend>
                {teams.map((team) => (
                    <div key={team.id} className="flex items-center mb-2">
                        <input type="checkbox" id={team.id} name="teams" value={team.id} className="w-4 h-4 text-orange-800 bg-gray-100 border-gray-300 rounded focus:ring-orange-700 focus:ring-2" />
                        <label htmlFor={team.id} className="ms-2 text-sm font-medium text-gray-900 ">{team.name}</label>
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


















// // TODO: FUNCTION TO FETCH TEAMS IN LEAGUE AND TOTAL SHOTS BY ALL PLAYERS

// import BarChart from "./web/stats/BarChart";
// import MiniCard from "./web/stats/MiniCard";
// import ShotTracker from "./ShotTracker"

// const teamData = {
//     players: {
//         John: { totalShots: 11 },
//         Mike: { totalShots: 5 },
//         Sarah: { totalShots: 22 },
//         Emily: { totalShots: 8 },
//         Tom: { totalShots: 20 },
//         Bradley: { totalShots: 30 },
//         Johnn: { totalShots: 11 },
//         Mikne: { totalShots: 5 },
//         Sarnah: { totalShots: 22 },
//         Enmily: { totalShots: 8 },
//         Tonm: { totalShots: 20 },
//         Brandley: { totalShots: 30 },
//     },
// };

// const team1 = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
// const team2 = ['Player 5', 'Player 6', 'Player 7', 'Player 8'];
// const courtImage = 'https://muralsyourway.vtexassets.com/arquivos/ids/236597/Wooden-Basketball-Court-Wallpaper-Mural.jpg';

// export default async function TESTELEMENT() {
//     return (
//         <main className="flex-1 p-6 bg-gray-200">
//             <h2 className="text-2xl font-semibold mb-6 text-black">Dashboard Overview</h2>
//             <div className="flex-1 flex flex-row gap-8 justify-center">
//                 <BarChart team={teamData} /><div className="justify-evenly"><MiniCard team={teamData} /><MiniCard team={teamData} /></div><BarChart team={teamData} />
//             </div>
//             <div className="flex-1 flex flex-row gap-8 justify-center">
//                 <ShotTracker team1={team1} team2={team2} courtImage={courtImage} />
//             </div>
//         </main>
//     );
// }

