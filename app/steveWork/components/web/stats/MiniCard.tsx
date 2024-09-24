// components/MiniCard.js
import React from 'react';
import StatsIcon from '../Icons/StatsIcon';

const MiniCard = ({ team, stat, variant }) => {
    const players = Object.entries(team);

    // Define color based on the variant
    let color = "";
    if (variant === 1) {
        color = "rounded-lg w-16 h-16 flex items-center justify-center absolute bottom-12 left-5 z-10 text-white bg-gradient-to-b from-blue-400 to-blue-800";
    } else if (variant === 2) {
        color = "rounded-lg w-16 h-16 flex items-center justify-center absolute bottom-12 left-5 z-10 text-white bg-gradient-to-b from-red-400 to-red-800";
    } else if (variant === 3) {
        color = "rounded-lg w-16 h-16 flex items-center justify-center absolute bottom-12 left-5 z-10 text-white bg-gradient-to-b from-green-400 to-green-800";
    } else if (variant === 4) {
        color = "rounded-lg w-16 h-16 flex items-center justify-center absolute bottom-12 left-5 z-10 text-white bg-gradient-to-b from-orange-400 to-orange-800";
    }

    // Calculate total of the specified stat, defaulting to 0 if undefined
    const totalStats = players.reduce((sum, [_, player]) => sum + (player[stat] || 0), 0);

    // Find the player with the most of the specified stat, defaulting to 0 if undefined
    const playerWithMostStats = players.reduce((max, player) => {
        const playerStat = player[1][stat] || 0;
        return playerStat > (max[1][stat] || 0) ? player : max;
    }, players[0]);

    const playerName = playerWithMostStats[1]?.name || "N/A"; // Default name to "N/A" if undefined

    return (
        <div className="w-200 min-w-content max-w-fit">
            <div className="py-4 bg-white rounded-lg shadow-lg relative flex items-start min-w-fit">
                {/* Dynamic Color Background */}
                <div className={color}>
                    <StatsIcon size={8} mr={0} />
                </div>

                {/* Data Section */}
                <div className="ml-20">
                    <h3 className="text-xl font-semibold text-black whitespace-nowrap">
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}: {totalStats}
                    </h3>
                    <p className="text-sm text-black text-center whitespace-nowrap">
                        <span className="font-semibold">MVP: </span>{playerName}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MiniCard;
