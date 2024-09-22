// components/MiniCard.js
import React from 'react';
import StatsIcon from '../Icons/StatsIcon';


const MiniCard = ({ team }) => {
    const players = Object.entries(team.players);
    const totalShots = players.reduce((sum, [_, { totalShots }]) => sum + totalShots, 0);

    // Find the player with the most shots
    const playerWithMostShots = players.reduce((max, player) => {
        return player[1].totalShots > max[1].totalShots ? player : max;
    });

    const playerName = playerWithMostShots[0];

    return (
        <div className=" min-w-64 ">
            <div className="mt-4 p-4 bg-white rounded-lg shadow-lg relative flex items-start">
                {/* Blue Chart Background */}
                <div className="bg-gradient-to-b from-blue-400 to-blue-800 rounded-lg w-16 h-16 flex items-center justify-center absolute bottom-12 left-5 z-10 text-white">
                    <StatsIcon size={8} mr={0} />
                </div>

                {/* Data Section */}
                <div className="ml-24">
                    <h3 className="text-xl font-semibold text-black">Shots: {totalShots}</h3>
                    <p className="text-sm text-black">Player with Most Shots: {playerName}</p>
                </div>
            </div>
        </div>
    );
};

export default MiniCard;
