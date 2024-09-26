"use client";
import React, { useState } from 'react';

const ShotTracker = ({ selectedPlayer }) => {

    const [playerShots, setPlayerShots] = useState({});
    const [showMarkers, setShowMarkers] = useState(true);
    const [hitOrmiss, setHitorMiss] = useState(true);

    // Handle court click for adding shots
    const handleCourtClick = (e) => {
        if (selectedPlayer) {
            const courtRect = e.target.getBoundingClientRect();
            const x = ((e.clientX - courtRect.left) / courtRect.width) * 100;  // X as percentage
            const y = ((e.clientY - courtRect.top) / courtRect.height) * 100;  // Y as percentage
            console.log(`court marked at x:${x}%, y:${y}% for ${selectedPlayer}`);

            // Ensure click is within bounds of the court
            if (x < 0 || x > 100 || y < 0 || y > 100) return;

            // Save the shot to the selected player's shot array
            setPlayerShots((prevShots) => ({
                ...prevShots,
                [selectedPlayer]: [...(prevShots[selectedPlayer] || []), { x, y, status: hitOrmiss }],
            }));
        }
    };

    // Handle removing a shot by clicking inside the X marker
    const handleShotClick = (index) => {
        if (selectedPlayer) {
            setPlayerShots((prevShots) => ({
                ...prevShots,
                [selectedPlayer]: prevShots[selectedPlayer].filter((_, shotIndex) => shotIndex !== index)
            }));
        };
    };

    // Hide markers (keeps data in array)
    const hideMarkers = () => {
        setShowMarkers(!showMarkers);
    };

    // Make or miss shot
    const handleShotBool = () => {
        setHitorMiss((prevStatus) => !prevStatus);
    };

    const clearShots = () => {
        setPlayerShots({});
    };

    return (<>
        <div className="relative w-[600px] h-auto">
            <img
                src='https://muralsyourway.vtexassets.com/arquivos/ids/236597/Wooden-Basketball-Court-Wallpaper-Mural.jpg'
                alt="Basketball Court"
                className="w-[600px] h-auto court-image cursor-cell shadow-lg"
                onClick={handleCourtClick}
            />
            {/* Render shots on the court for each player if showMarkers is true */}
            {showMarkers && selectedPlayer && playerShots[selectedPlayer]?.map((shot, index) => (
                <div
                    key={`${selectedPlayer}-${index}`}
                    className={`absolute ${shot.status ? 'bg-green-600' : 'bg-red-500'} text-white rounded-full w-6 h-6 flex items-center text-center justify-center cursor-no-drop`}
                    style={{ top: `${shot.y}%`, left: `${shot.x}%` }}
                    onClick={() => handleShotClick(index)} // Handle removing the shot
                    title={`Player: ${selectedPlayer}`}
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
                        style={{ top: `${shot.y}%`, left: `${shot.x}%` }}
                        onClick={() => handleShotClick(index)}
                        title={`Player: ${player}`}
                    >
                        {shot.status ? 'X' : 'O'}
                    </div>
                ))
            ))}
        </div>
        <div className="mt-2 flex flex-row">
            <button onClick={clearShots} className={"py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-600 "}>Clear All Shots</button>
            <button onClick={handleShotBool} className={hitOrmiss ? " py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-200" : "py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-200"}>{
                hitOrmiss ? "HIT !" : "MISS"}</button>
        </div>
    </>
    );
};

export default ShotTracker;
