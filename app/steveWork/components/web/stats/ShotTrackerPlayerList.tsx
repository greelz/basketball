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
            {team.map((player) => (

                <ToggleCollapse title={<button
                    key={`${player}team`}
                    onClick={() => handlePlayerClick(player)}
                    className={`py-2 px-4 text-white rounded-lg ${selectedPlayer === player ? 'bgorange' : 'bgdgray'}`}
                >
                    {player}
                </button>}
                    content={<PlayerCard selectedPlayer={player} Team1Stats={Team1Stats}
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
