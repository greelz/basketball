"use client"
import React from 'react';
import ToggleCollapse from '../ToggleCollapse';
import PlayerCard from '../PlayerCard';

const ShotTrackerPlayerList = ({ team, selectedPlayer, onPlayerClick, Team1Stats, Team2Stats }) => {

    const handlePlayerClick = (player) => {
        if (selectedPlayer === player) {
            onPlayerClick(null); // Deselect player if clicked again
        } else {
            onPlayerClick(player);
        }
    };

    return (
        <div className="flex flex-col">
            {team.map((player, idx) => (

                <ToggleCollapse
                    key={`${player} ${idx}list`}
                    title={<button
                        key={`${player}button`}
                        onClick={() => handlePlayerClick(player)}
                        className={`py-2 px-4 text-white rounded-lg ${selectedPlayer === player ? 'bgorange' : 'bgdgray'}`}
                    >
                        {player}
                    </button>}
                    content={<PlayerCard key={`${player}teamcard`} selectedPlayer={player} Team1Stats={Team1Stats}
                        Team2Stats={Team2Stats} />}
                    player={player}
                    selectedPlayer={selectedPlayer}
                    onPlayerClick={onPlayerClick}
                />

            ))}
        </div>
    );
};

export default ShotTrackerPlayerList;
