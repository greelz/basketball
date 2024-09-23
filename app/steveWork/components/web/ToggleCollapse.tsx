"use client"
import { useEffect, useState } from 'react';

interface Props {
    title: JSX.Element | string;
    content: JSX.Element | string;
    player: string;  // The player associated with this accordion
    selectedPlayer: string | null;  // Currently selected player
    onPlayerClick: (player: string | null) => void;  // Click handler for player selection
}

function ToggleCollapse({ title, content, player, selectedPlayer, onPlayerClick }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    // Effect to sync isOpen state with selectedPlayer
    useEffect(() => {
        setIsOpen(selectedPlayer === player);
    }, [selectedPlayer, player]);

    const toggleAccordion = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);

        // Select or unselect the player based on the new accordion state
        if (newIsOpen) {
            onPlayerClick(player);  // Select player if opening
        } else {
            onPlayerClick(null);     // Deselect player if closing
        }
    };

    return (
        <div className="border border-gray-300 rounded-md shadow-sm mb-4  min-w-fit ">
            {/* Accordion Header */}
            <div
                className={`${selectedPlayer === player ? "w-full text-left p-4 rounded-md bggraygrad text-white hover:bg-blue-200 hover:text-black font-medium flex justify-between items-center" : "w-full text-left p-4 rounded-md bggraygrad font-medium flex justify-between items-center hover:bg-blue-200 hover:text-white"}`}
                onClick={toggleAccordion}
            >
                {title}
                {/* Icon for expand/collapse */}
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </div>

            {/* Accordion Content - Expanded */}
            <div
                className={`shadow-md bg-gray-100 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
                <div className="p-4 bg-gray-100 max-h-[calc(100vh-4rem)] overflow-auto whitespace-nowrap">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default ToggleCollapse;
