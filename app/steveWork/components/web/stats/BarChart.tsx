// components/Chart.js
import React from 'react';

const BarChart = ({ team, stat, variant }) => {
    const players = Object.entries(team);

    // Calculate total based on the provided stat
    const totalStat = players.reduce((sum, [, player]) => sum + (player[stat] || 0), 0);

    // Find the maximum value for the y-axis scaling based on the stat
    const yaxis = Math.max(...players.map(([, player]) => player[stat] || 0));

    const yLabels = Array.from({ length: 5 }, (_, index) => Math.floor((yaxis / 4) * (4 - index)));

    // Define color based on the variant
    let color = "";
    if (variant === 1) {
        color = "min-w-fit px-2 rounded-lg h-36 flex items-end justify-center min-w absolute -top-16 left-2 right-2 w-auto z-10 bg-gradient-to-b from-blue-400 to-blue-800 ";
    } else if (variant === 2) {
        color = "min-w-fit px-2 rounded-lg h-36 flex items-end justify-center min-w absolute -top-16 left-2 right-2 w-auto z-10 bg-gradient-to-b from-red-400 to-red-800";
    } else if (variant === 3) {
        color = "min-w-fit px-2 rounded-lg h-36 flex items-end justify-center min-w absolute -top-16 left-2 right-2 w-auto z-10 bg-gradient-to-b from-green-400 to-green-800";
    } else if (variant === 4) {
        color = "min-w-fit px-2 rounded-lg h-36 flex items-end justify-center min-w absolute -top-16 left-2 right-2 w-auto z-10 bg-gradient-to-b from-orange-400 to-orange-800";
    }

    return (
        <div className="mt-12 w-200 min-w-content max-w-fit">
            {/* Bar Chart Section */}
            <div className="bg-white rounded-lg shadow-lg p-4 relative">
                <div className={color}>
                    <div className="flex flex-col justify-between h-full absolute left-2 pl-2 pb-3">
                        {yLabels.map((label, index) => (
                            <span key={index} className="text-white text-xs">
                                {label}
                            </span>
                        ))}
                    </div>

                    {/* Dotted lines extending across the full width */}
                    {yLabels.map((_, index) => (
                        <div
                            key={index}
                            className="absolute w-full border-b border-dotted border-white pt-2"
                            style={{
                                top: `${((index) / 5) * 102}%`, // Adjust position based on index
                            }}
                        />
                    ))}

                    {players.map(([_, player], index) => {
                        const playerValue = player[stat] || 0; // Get the value for the specified stat
                        const barHeight = yaxis > 0 ? `${(playerValue / yaxis) * 100}%` : '0%'; // Calculate height

                        return (
                            <div
                                key={player.id} // Use player ID for the key
                                className="flex flex-col items-center group"
                                style={{
                                    width: '2rem',
                                    height: barHeight,
                                    maxHeight: '95%',
                                    marginRight: index < players.length - 1 ? '20px' : '0',
                                }}
                            >
                                <div className="w-full bg-white transition-transform duration-300 ease-in-out transform group-hover:bg-gray-200" style={{ height: '100%' }} />
                                <span className="text-white text-xs whitespace-nowrap">
                                    {player.name} {/* Display player name correctly */}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Data Section */}
                <div className="bg-white p-4 rounded-b-lg mt-16 z-0">
                    <h3 className="whitespace-nowrap text-xl font-semibold text-black">Total {stat.charAt(0).toUpperCase() + stat.slice(1)}: {totalStat}</h3>
                </div>
            </div>
        </div>
    );
};

export default BarChart;
