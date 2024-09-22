// components/Chart.js
import React from 'react';

const BarChart = ({ team }) => {
    const players = Object.entries(team.players);
    const totalShots = players.reduce((sum, [_, { totalShots }]) => sum + totalShots, 0);
    const yaxis = Math.max(...players.map(([, { totalShots }]) => totalShots));

    const yLabels = Array.from({ length: 5 }, (_, index) => Math.floor((yaxis / 4) * (4 - index)));

    return (
        <div className="mt-12 flex-1">
            {/* Bar Chart Section */}
            <div className="bg-white rounded-lg shadow-lg p-4 relative">
                <div className="min-w-fit px-2 bg-gradient-to-b from-blue-400 to-blue-800 rounded-lg h-36 flex items-end justify-center min-w absolute -top-16 left-2 right-2 w-auto z-10">
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

                    {players.map(([playerName, { totalShots }], index) => {
                        const barHeight = `${(totalShots / yaxis) * 100}%`;

                        return (
                            <div
                                key={playerName}
                                className="flex flex-col items-center group"
                                style={{
                                    width: '2rem',
                                    height: barHeight,
                                    maxHeight: '95%',
                                    marginRight: index < players.length - 1 ? '8px' : '0',
                                }}
                            >
                                <div className="w-full bg-white transition-transform duration-300 ease-in-out transform group-hover:bg-gray-200" style={{ height: '100%' }} />
                                <span className="text-white text-xs">
                                    {playerName}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Data Section */}
                <div className="bg-white p-4 rounded-b-lg mt-16 z-0">
                    <h3 className="text-xl font-semibold text-black">Total Shots: {totalShots}</h3>
                    <p className="text-sm text-black">Game Performance</p>
                    <div className="flex items-center text-black mt-2">
                        <p className="text-sm">Game analysis based on shots taken</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarChart;
