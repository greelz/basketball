import StarsIcon from "../Icons/StarsIcon";
import LEDStatTracker from "./LEDStatTracker";
import localFont from "next/font/local";

const statfont = localFont({ src: "../../../../../public/fonts/dsdigi.ttf" });

function getMaxStats(allPlayers) {
    const stats = {
        assists: 0,
        points: 0,
        steals: 0,
        turnovers: 0,
        "O rebounds": 0,
        "D rebounds": 0,
        two_point_made: 0,
        three_point_made: 0,
        blocks: 0,
        "two_point_miss": 0,
        "three_point_miss": 0,
    };

    allPlayers.forEach(player => {
        // Check and update max for each stat
        for (const stat in stats) {
            if (player[stat] !== null && player[stat] > stats[stat]) {
                stats[stat] = player[stat];
            }
        }
    });

    return stats;
}

const calcPlayerStatAverage = (player, divisor) => {
    const updatedPlayer = { ...player }; // Create a shallow copy of the player object

    // Iterate through the player's stats
    Object.keys(updatedPlayer).forEach(stat => {
        if (typeof updatedPlayer[stat] === 'number' && updatedPlayer[stat] !== null) {
            updatedPlayer[stat] = Math.floor(updatedPlayer[stat] / divisor);
        } else {
            // If the stat is null or not a number, set it to 0
            updatedPlayer[stat] = 0;
        }
    });

    return updatedPlayer;
};

export default function PlayerSeasonAverageBlock({ allPlayers, selectedPlayer, divisor }) {
    // Find the selected player by name
    const player = allPlayers.find(p => p.name === selectedPlayer) || {};

    // console.log(`allPlayers: ${JSON.stringify(allPlayers, null, 2)}********`);

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

    // console.log(`player: ${JSON.stringify(player, null, 2)}`);


    const maxStats = getMaxStats(allPlayers);
    const averageHighStat = calcPlayerStatAverage(maxStats, divisor);
    const playerStatAverage = calcPlayerStatAverage(player, divisor);

    return (
        <div className="w-full flex flex-row rounded-md transition-transform transform hover:scale-105 hover:-translate-y-2">
            <div className="grid grid-cols-9 gap-4 w-full">
                <div className="w-full py-2 bggrayd-hov-inv text-center text-white flex items-center justify-center">
                    {/* Player Name and Team */}
                    <p className={`text-xl font-semibold w-full`}>
                        {player.name ? `${player.name}` : 'No player selected'}
                    </p>
                </div>

                {/* Player Stats */}
                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat.assists <= playerStatAverage.assists) ? (
                        <div className="text-yellow-200" key={`${player.name}.assists.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={playerStatAverage} stat={'assists'} variant={2} key={`${player.name}.assists`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.assists.div`}>
                            <LEDStatTracker player={playerStatAverage} stat={'assists'} variant={2} key={`${player.name}.assists`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat.points <= playerStatAverage.points) ? (
                        <div className="text-yellow-200" key={`${player.name}.points.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={playerStatAverage} stat={'points'} variant={2} key={`${player.name}.points`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.points.div`}>
                            <LEDStatTracker player={playerStatAverage} stat={'points'} variant={2} key={`${player.name}.points`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat.steals <= playerStatAverage.steals) ? (
                        <div className="text-yellow-200" key={`${player.name}.steals.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={playerStatAverage} stat={'steals'} variant={2} key={`${player.name}.steals`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.steals.div`}>
                            <LEDStatTracker player={playerStatAverage} stat={'steals'} variant={2} key={`${player.name}.steals`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat.turnovers <= playerStatAverage.turnovers) ? (
                        <div className="text-yellow-200" key={`${player.name}.turnovers.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={playerStatAverage} stat={'turnovers'} variant={2} key={`${player.name}.turnovers`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.turnovers.div`}>
                            <LEDStatTracker player={playerStatAverage} stat={'turnovers'} variant={2} key={`${player.name}.turnovers`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat.two_point_made <= playerStatAverage.two_point_made) ? (
                        <div className="text-yellow-200" key={`${player.name}.two_point_made.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={playerStatAverage} stat={'two_point_made'} variant={2} key={`${player.name}.two_point_made`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.two_point_made.div`}>
                            <LEDStatTracker player={playerStatAverage} stat={'two_point_made'} variant={2} key={`${player.name}.two_point_made`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat.three_point_made <= playerStatAverage.three_point_made) ? (
                        <div className="text-yellow-200" key={`${player.name}.three_point_made.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={playerStatAverage} stat={'three_point_made'} variant={2} key={`${player.name}.three_point_made`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.three_point_made.div`}>
                            <LEDStatTracker player={playerStatAverage} stat={'three_point_made'} variant={2} key={`${player.name}.three_point_made`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat["O rebounds"] <= playerStatAverage["O rebounds"]) ? (
                        <div className="text-yellow-200" key={`${player.name}.O_rebounds.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'O rebounds'} variant={2} key={`${player.name}.O rebounds`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.O_rebounds.div`}>
                            <LEDStatTracker player={player} stat={'O rebounds'} variant={2} key={`${player.name}.O rebounds`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(averageHighStat["D rebounds"] <= playerStatAverage["D rebounds"]) ? (
                        <div className="text-yellow-200 " key={`${player.name}.D_rebounds.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'D rebounds'} variant={2} key={`${player.name}.D rebounds`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.name}.D_rebounds.div`}>
                            <LEDStatTracker player={player} stat={'D rebounds'} variant={2} key={`${player.name}.D rebounds`} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
