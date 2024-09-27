
import LEDStatTracker from "./LEDStatTracker";
import localFont from "next/font/local";


const statfont = localFont({ src: "../../../../../public/fonts/dsdigi.ttf" });

export default function PlayerStatBlock({ allPlayers, selectedPlayer }) {
    // Concatenate Team1Stats and Team2Stats into a single array of allPlayers


    // Find the selected player by name
    const player = allPlayers.find(p => p.name === selectedPlayer) || {};


    // Ensure stats are zero if undefined
    const playerStats = {
        assists: player.assists || 0,
        "D rebounds": player["D rebounds"] || 0,
        "O rebounds": player["O rebounds"] || 0,
        points: player.points || 0,
        steals: player.steals || 0,
        turnovers: player.turnovers || 0,
        two_point_made: player.two_point_made || 0,
        three_point_made: player.three_point_made || 0,
    };
    console.log(`player: ${JSON.stringify(player, null, 2)}`);

    return (<div className="bggrayd-nohov flex-0 border-2 border-black rounded-md transition-transform transform hover:scale-105 hover:-translate-y-2 p-5 w-60 hover:border-white">
        <div className="py-2 bggrayd-hov-inv text-center text-white flex items-center justify-center">
            {/* Player Name and Team */}
            <p className={`text-xl font-semibold no-wrap whitespace-nowrap overflow-hidden flex-none `}> {player.name ? `${player.name}` : 'No player selected'}</p>
        </div>

        <div className="grid grid-cols-3 grid-rows-3 gap-4  ">
            {/* Player Stats */}
            <div className="flex justify-center items-center">
                <LEDStatTracker player={player} stat={'assists'} variant={2} />
            </div>
            <div className="col-start-1 row-start-2 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'points'} variant={2} />
            </div>
            <div className="col-start-1 row-start-3 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'steals'} variant={2} />
            </div>
            <div className="col-start-2 row-start-1 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'turnovers'} variant={2} />
            </div>
            <div className="col-start-2 row-start-2 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'two_point_made'} variant={2} />
            </div>
            <div className="col-start-2 row-start-3 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'three_point_made'} variant={2} />
            </div>
            <div className="col-start-3 row-start-1 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'O rebounds'} variant={2} />
            </div>
            <div className="col-start-3 row-start-2 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'D rebounds'} variant={2} />
            </div>
            <div className=" col-start-3 row-start-3 flex justify-center items-center">
                <LEDStatTracker player={player} stat={'D rebounds'} variant={2} />
            </div>
        </div >
    </div>
    );
}
