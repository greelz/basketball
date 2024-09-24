"use client"
import { useEffect, useState } from 'react';
import LEDStatTracker from './LEDStatTracker';

interface Props {
    title: JSX.Element | string;
    player: string;
    selectedPlayer: string | null;
    setSelectedPlayer: (player: string | null) => void;
    setAssistingPlayer: (player: string | null) => void;
    assistingPlayer: string | null;
    allPlayers: [string];
    playerStatistics: any;
    handlePlayerClick: any;
}

function LiveGamePlayerStatBar({ title, selectedPlayer, player, setSelectedPlayer, setAssistingPlayer, assistingPlayer, allPlayers, playerStatistics, handlePlayerClick }: Props) {
    const [isActive, setIsActive] = useState(false);
    const stats = playerStatistics;


    const findPlayerByName = (stats, player) => {
        return stats.find(p => p.name === player);
    };
    const playerToDisplay = findPlayerByName(stats, player);

    // // Effect to sync isActive state with selectedPlayer
    // useEffect(() => {
    //     setIsActive(selectedPlayer === player);
    // }, [selectedPlayer, player]);

    // const setActive = () => {
    //     const newIsActive = !isActive;
    //     setIsActive(newIsActive);

    //     // Select or unselect the player
    //     if (newIsActive) {
    //         setSelectedPlayer(player);
    //     } else {
    //         setSelectedPlayer(null)
    //     }
    // };

    return (
        <div className="border border-gray-300 rounded-md shadow-sm mb-4  min-w ">
            {/* Accordion Header */}
            <div
                className="w-full text-left p-4 rounded-md bggraygrad text-white font-medium flex justify-between items-center cursor-pointer"
                onClick={() => handlePlayerClick(player)}
            >
                {title}
                {/* Icon */}
                <LEDStatTracker player={playerToDisplay} stat={"points"} variant={3} />
            </div>

        </div>
    );
}

export default LiveGamePlayerStatBar;
