"use client"
import React from 'react';
import LiveGamePlayerStatBar from './LiveGamePlayerStatBar';

const LiveGamePlayerList = ({ team, selectedPlayer, setSelectedPlayer, allPlayers, assistingPlayer, setAssistingPlayer, playerStatistics }) => {
    const players = { ...allPlayers };

    const teamMates = team.map(t => t.name);
    const handlePlayerClick = (player) => {
        if (selectedPlayer === player) {
            setSelectedPlayer(null);
            setAssistingPlayer(null);
        } else {
            if (assistingPlayer) {
                setSelectedPlayer(null);
                setAssistingPlayer(null);
            } else if (!selectedPlayer) {
                // Select the clicked player if no player is currently selected
                setSelectedPlayer(player);
            } else if (selectedPlayer && !assistingPlayer) {
                // Set assisting player if there's already a selected player
                setAssistingPlayer(player);
            }
        }
    }
    return (
        <div className="flex flex-col">
            {teamMates.map((player, idx) => (

                <LiveGamePlayerStatBar
                    key={`${player} ${idx}list`}
                    player={player}
                    selectedPlayer={selectedPlayer}
                    setSelectedPlayer={setSelectedPlayer}
                    allPlayers={allPlayers}
                    assistingPlayer={assistingPlayer}
                    handlePlayerClick={handlePlayerClick}
                    playerStatistics={playerStatistics}
                    title={<button
                        key={`${player}button`}
                        onClick={() => handlePlayerClick(player)}
                        className={`py-2 px-4 text-white rounded-lg ${selectedPlayer === player ? 'bgorange' : assistingPlayer === player ? 'bgbluegrad' : 'bgdgray'}`}
                    >
                        {player}
                    </button>}

                />

            ))}
        </div>
    );
};

export default LiveGamePlayerList;
