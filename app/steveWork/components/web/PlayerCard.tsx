interface PlayerCardProps {
    Team1Stats: any[]; // Array of team 1 stats
    Team2Stats: any[]; // Array of team 2 stats
    selectedPlayer: string | null; // Name of the selected player
}

export default function PlayerCard({ Team1Stats, Team2Stats, selectedPlayer }: PlayerCardProps) {
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
        <div className={"container items-center flex-1"}>
            <div id="playerCard" className="grid grid-cols-3 grid-rows-3 gap-4 px-3 py-3 block rounded-lg bg-white shadow-lg dark:bg-neutral-700 text-black">
                {/* Avatar Section */}
                <div className="row-span-3" id="avatar">
                    <a href="#!">
                        <img className="rounded-lg max-w-25" src='https://i.pinimg.com/236x/7a/97/31/7a9731ac03ecf452406b669abe800839.jpg' alt="Player Avatar" />
                    </a>
                </div>

                {/* Card Content with Stats */}
                <div id="cardContent" className="col-span-2 row-span-3">
                    <div className="p-6">
                        {/* Player Name and Stat Snapshot Header */}
                        <h5 className="mb-4 text-xl font-bold tracking-wide text-neutral-800 dark:text-neutral-50">
                            {player.name || 'Player Not Found'} - STAT SNAPSHOT
                        </h5>

                        {/* Stats Grid - 2 Columns, 4 Rows */}
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Points: {playerStats.points}
                            </p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Assists: {playerStats.assists}
                            </p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Steals: {playerStats.steals}
                            </p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Turnovers: {playerStats.turnovers}
                            </p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Two Pointers: {playerStats.two_point_made}
                            </p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Three Pointers: {playerStats.three_point_made}
                            </p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Off. Rebounds: {playerStats["O rebounds"]}
                            </p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">
                                Def. Rebounds: {playerStats["D rebounds"]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
