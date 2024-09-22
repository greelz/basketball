"use client"
import React, { useState } from 'react';

const ShotTracker = ({ team1, team2, courtImage }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [playerShots, setPlayerShots] = useState({});
    const [showMarkers, setShowMarkers] = useState(true);
    const [hitOrmiss, setHitorMiss] = useState(true);

    // Handle selecting a player
    const handlePlayerClick = (player) => {
        setSelectedPlayer(prev => (prev === player ? null : player));
        console.log(`${player} has been selected`);
        console.log(`${playerShots}`);
    };

    // Handle court click for adding shots
    const handleCourtClick = (e) => {
        if (selectedPlayer) {
            const courtRect = e.target.getBoundingClientRect();
            const x = e.clientX - 12 - courtRect.left;
            const y = e.clientY - 12 - courtRect.top;
            console.log(`court marked at x:${x}, y:${y} for ${selectedPlayer}`)

            // Ensure click is within bounds of the court
            if (x < 0 || x > courtRect.width || y < 0 || y > courtRect.height) return;

            // Save the shot to the selected player's shot array
            setPlayerShots((prevShots) => ({
                ...prevShots,
                [selectedPlayer]: [...(prevShots[selectedPlayer] || []), { x, y, status: hitOrmiss }],
            }), console.log(selectedPlayer), console.log(playerShots));
        }
    };

    // Handle removing a shot by clicking inside the X marker
    const handleShotClick = (index) => {
        if (selectedPlayer) {
            setPlayerShots((prevShots) => ({
                ...prevShots,
                [selectedPlayer]: prevShots[selectedPlayer].filter((_, shotIndex) => shotIndex !== index)
            }), console.log(`removed a shot for ${player}`))
        };
    };

    // Hide markers (keeps data in array)
    const hideMarkers = () => {
        setShowMarkers(!showMarkers);
    };

    // Make or miss shot
    const handleShotBool = () => {
        setHitorMiss((prevStatus) => (prevStatus === true ? false : true));
    };

    // Flip x-values and show markers
    const flipXValues = () => {
        const courtRect = document.querySelector('.court-image').getBoundingClientRect();
        const flippedShots = {};
        Object.entries(playerShots).forEach(([player, shots]) => {
            flippedShots[player] = shots.map(shot => ({
                x: courtRect.width - shot.x, // Flip x value relative to the court width
                y: shot.y,
                status: shot.status,
            }));
        });
        setPlayerShots(flippedShots);
    };

    const clearShots = () => {
        setPlayerShots({});
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Buttons */}
            <div className="flex flex-row items-center space-x-4">
                <div className="flex space-y-4 mb-4 flex-col">
                    <button onClick={hideMarkers} className={showMarkers ? "py-2 px-4 bg-green-500 text-white rounded-lg" : "py-2 px-4 bg-red-500 text-white rounded-lg"}>{
                        showMarkers ? "Markers Visible" : "Markers Hidden"}</button>
                    <button onClick={flipXValues} className="py-2 px-4 bg-blue-500 text-white rounded-lg">Flip X Values</button>
                </div>
                <div className="flex space-y-4 mb-4 flex-col">
                    <button onClick={handleShotBool} className={hitOrmiss ? "py-2 px-4 bg-green-500 text-white rounded-lg" : "py-2 px-4 bg-red-500 text-white rounded-lg"}>{
                        hitOrmiss ? "HIT !" : "MISS"}</button>
                    <button onClick={clearShots} className={"py-2 px-4 bg-black text-white rounded-lg"}>Clear All Shots</button>
                </div>
            </div>

            {/* Main Shot Tracker Area */}
            <div className="flex justify-center space-x-4">
                {/* Team 1 Player List */}
                <div className="flex flex-col space-y-2">
                    {team1.map((player) => (
                        <button
                            key={player}
                            onClick={() => handlePlayerClick(player)}
                            className={`py-2 px-4 text-white rounded-lg ${selectedPlayer === player ? 'bg-blue-500' : 'bg-gray-500'}`}
                        >
                            {player}
                        </button>
                    ))}
                </div>

                {/* Basketball Court Image */}
                <div className="relative">
                    <img
                        src={courtImage}
                        alt="Basketball Court"
                        className="w-[700px] h-auto court-image cursor-cell"
                        onClick={handleCourtClick}
                    />
                    {/* Render shots on the court for each player if showMarkers is true */}

                    {showMarkers && selectedPlayer && playerShots[selectedPlayer]?.map((shot, index) => (
                        <div
                            key={`${selectedPlayer}-${index}`}
                            className={`absolute ${shot.status ? 'bg-green-600' : 'bg-red-500'} text-white rounded-full w-6 h-6 flex items-center text-center justify-center cursor-no-drop`}
                            style={{ top: `${shot.y}px`, left: `${shot.x}px` }}
                            onClick={() => handleShotClick(index)} // Handle removing the shot
                        >
                            {shot.status ? 'X' : 'O'}
                        </div>
                    ))
                    }
                    {showMarkers && !selectedPlayer && Object.entries(playerShots).map(([player, shots]) => (
                        shots.map((shot, index) => (
                            <div
                                key={`${player}-${index}`}
                                className={`absolute ${shot.status ? 'bg-green-600' : 'bg-red-500'} text-white rounded-full w-6 h-6 flex items-center text-center justify-center cursor-no-drop`}
                                style={{ top: `${shot.y}px`, left: `${shot.x}px` }}
                                onClick={() => handleShotClick(index)}
                            >
                                {shot.status ? 'X' : 'O'}
                            </div>
                        ))
                    ))}
                </div>

                {/* Team 2 Player List */}
                <div className="flex flex-col space-y-2">
                    {team2.map((player) => (
                        <button
                            key={player}
                            onClick={() => handlePlayerClick(player)}
                            className={`py-2 px-4 text-white rounded-lg ${selectedPlayer === player ? 'bg-blue-500' : 'bg-gray-500'}`}
                        >
                            {player}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShotTracker;
