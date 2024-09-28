import StarsIcon from "../Icons/StarsIcon";
import LEDStatTracker from "./LEDStatTracker";
import localFont from "next/font/local";

const statfont = localFont({ src: "../../../../../public/fonts/dsdigi.ttf" });

export default function PlayerStatBlock({ allPlayers, selectedPlayer }) {
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

    const maxStats = getMaxStats(allPlayers);

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
                    {(maxStats.assists <= playerStats.assists) ? (
                        <div className="text-yellow-200" key={`${player.id}.assists.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'assists'} variant={2} key={`${player.id}.assists`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.assists.div`}>
                            <LEDStatTracker player={player} stat={'assists'} variant={2} key={`${player.id}.assists`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(maxStats.points <= playerStats.points) ? (
                        <div className="text-yellow-200" key={`${player.id}.points.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'points'} variant={2} key={`${player.id}.points`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.points.div`}>
                            <LEDStatTracker player={player} stat={'points'} variant={2} key={`${player.id}.points`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(maxStats.steals <= playerStats.steals) ? (
                        <div className="text-yellow-200" key={`${player.id}.steals.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'steals'} variant={2} key={`${player.id}.steals`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.steals.div`}>
                            <LEDStatTracker player={player} stat={'steals'} variant={2} key={`${player.id}.steals`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(maxStats.turnovers <= playerStats.turnovers) ? (
                        <div className="text-yellow-200" key={`${player.id}.turnovers.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'turnovers'} variant={2} key={`${player.id}.turnovers`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.turnovers.div`}>
                            <LEDStatTracker player={player} stat={'turnovers'} variant={2} key={`${player.id}.turnovers`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(maxStats.two_point_made <= playerStats.two_point_made) ? (
                        <div className="text-yellow-200" key={`${player.id}.two_point_made.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'two_point_made'} variant={2} key={`${player.id}.two_point_made`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.two_point_made.div`}>
                            <LEDStatTracker player={player} stat={'two_point_made'} variant={2} key={`${player.id}.two_point_made`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(maxStats.three_point_made <= playerStats.three_point_made) ? (
                        <div className="text-yellow-200" key={`${player.id}.three_point_made.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'three_point_made'} variant={2} key={`${player.id}.three_point_made`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.three_point_made.div`}>
                            <LEDStatTracker player={player} stat={'three_point_made'} variant={2} key={`${player.id}.three_point_made`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(maxStats["O rebounds"] <= playerStats["O rebounds"]) ? (
                        <div className="text-yellow-200" key={`${player.id}.O_rebounds.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'O rebounds'} variant={2} key={`${player.id}.O rebounds`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.O_rebounds.div`}>
                            <LEDStatTracker player={player} stat={'O rebounds'} variant={2} key={`${player.id}.O rebounds`} />
                        </div>
                    )}
                </div>

                <div className="relative flex flex-col justify-center items-center w-full">
                    {(maxStats["D rebounds"] <= playerStats["D rebounds"]) ? (
                        <div className="text-yellow-200 " key={`${player.id}.D_rebounds.div`}>
                            <div className="absolute top-0 left-2 transform -translate-x-1/2 z-10 text-yellow-200 shadow-lg" >
                                <StarsIcon size={8} />
                            </div>
                            <LEDStatTracker player={player} stat={'D rebounds'} variant={2} key={`${player.id}.D rebounds`} />
                        </div>
                    ) : (
                        <div className="text-white" key={`${player.id}.D_rebounds.div`}>
                            <LEDStatTracker player={player} stat={'D rebounds'} variant={2} key={`${player.id}.D rebounds`} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
