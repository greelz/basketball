
import LEDStatTracker from "./LEDStatTracker";

export default function PlayerStatBlock({ Team1Stats, Team2Stats, selectedPlayer }) {
    // Concatenate Team1Stats and Team2Stats into a single array of allPlayers
    const allPlayers = [...Team1Stats, ...Team2Stats];

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

    return (<>
        <div className="grid grid-cols-1 grid-rows-2 mb-3 py-4 bggrayd-nohov-inv text-center text-white">
            {/* Player Name and Team */}
            <p className="">STATBLOCK</p>
            <p className="text-xl font-semibold"> {player.name ? `${player.name} - ${player.teamId}` : 'No player selected'}</p>
        </div>

        <div className="grid grid-cols-3 grid-rows-3 gap-4  ">
            {/* Player Stats */}
            <div className="flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'assists'} variant={1} />
            </div>
            <div className="col-start-1 row-start-2 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'points'} variant={1} />
            </div>
            <div className="col-start-1 row-start-3 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'steals'} variant={1} />
            </div>
            <div className="col-start-2 row-start-1 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'turnovers'} variant={1} />
            </div>
            <div className="col-start-2 row-start-2 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'two_point_made'} variant={1} />
            </div>
            <div className="col-start-2 row-start-3 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'three_point_made'} variant={1} />
            </div>
            <div className="col-start-3 row-start-1 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'O rebounds'} variant={1} />
            </div>
            <div className="col-start-3 row-start-2 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'D rebounds'} variant={1} />
            </div>
            <div className=" col-start-3 row-start-3 flex justify-center items-center">
                <LEDStatTracker team={[player]} stat={'D rebounds'} variant={1} />
            </div>
        </div >
    </>
    );
}
