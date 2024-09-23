import MiniCard from "../../../components/web/stats/MiniCard";

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

    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-4 h-full">
            {/* Player Name and Team */}
            <div className="col-span-3 w-full h-full">
                {player.name ? `${player.name} of ${player.teamId}` : 'No player selected'}
            </div>

            {/* Player Stats */}
            <div className="col-start-1 row-start-2 w-full h-full">
                <MiniCard team={[player]} stat={'assists'} variant={1} />
            </div>
            <div className="col-start-1 row-start-3 w-full h-full">
                <MiniCard team={[player]} stat={'points'} variant={1} />
            </div>
            <div className="col-start-1 row-start-4 w-full h-full">
                <MiniCard team={[player]} stat={'steals'} variant={1} />
            </div>
            <div className="col-start-2 row-start-2 w-full h-full">
                <MiniCard team={[player]} stat={'turnovers'} variant={2} />
            </div>
            <div className="col-start-2 row-start-3 w-full h-full">
                <MiniCard team={[player]} stat={'two_point_made'} variant={2} />
            </div>
            <div className="col-start-2 row-start-4 w-full h-full">
                <MiniCard team={[player]} stat={'three_point_made'} variant={2} />
            </div>
            <div className="col-start-3 row-start-2 w-full h-full">
                <MiniCard team={[player]} stat={'O rebounds'} variant={4} />
            </div>
            <div className="col-start-3 row-start-3 w-full h-full">
                <MiniCard team={[player]} stat={'D rebounds'} variant={4} />
            </div>
            <div className="row-start-4 w-full h-full">
                <MiniCard team={[player]} stat={'D rebounds'} variant={4} />
            </div>
        </div>
    );
}
