// TODO: FUNCTION TO FETCH TEAMS IN LEAGUE AND TOTAL SHOTS BY ALL PLAYERS

import BarChart from "./web/stats/BarChart";
import MiniCard from "./web/stats/MiniCard";
import ShotTracker from "./ShotTracker"

const teamData = {
    players: {
        John: { totalShots: 11 },
        Mike: { totalShots: 5 },
        Sarah: { totalShots: 22 },
        Emily: { totalShots: 8 },
        Tom: { totalShots: 20 },
        Bradley: { totalShots: 30 },
        Johnn: { totalShots: 11 },
        Mikne: { totalShots: 5 },
        Sarnah: { totalShots: 22 },
        Enmily: { totalShots: 8 },
        Tonm: { totalShots: 20 },
        Brandley: { totalShots: 30 },
    },
};

const team1 = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
const team2 = ['Player 5', 'Player 6', 'Player 7', 'Player 8'];
const courtImage = 'https://muralsyourway.vtexassets.com/arquivos/ids/236597/Wooden-Basketball-Court-Wallpaper-Mural.jpg';

export default async function TESTELEMENT() {
    return (
        <main className="flex-1 p-6 bg-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-black">Dashboard Overview</h2>
            <div className="flex-1 flex flex-row gap-8 justify-center">
                <BarChart team={teamData} /><div className="justify-evenly"><MiniCard team={teamData} /><MiniCard team={teamData} /></div><BarChart team={teamData} />
            </div>
            <div className="flex-1 flex flex-row gap-8 justify-center">
                <ShotTracker team1={team1} team2={team2} courtImage={courtImage} />
            </div>
        </main>
    );
}
