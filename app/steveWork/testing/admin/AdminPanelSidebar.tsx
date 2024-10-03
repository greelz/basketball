"use client";
import HomeIcon from "../../components/web/Icons/HomeIcon";
import { useEffect, useState } from "react";
import LeagueIcon from "../../components/web/Icons/LeagueIcon";
import PlayerIcon from "../../components/web/Icons/PlayerIcon";
import StatsIcon from "../../components/web/Icons/StatsIcon";
import TeamsIcon from "../../components/web/Icons/TeamsIcon";


export default function AdminSidebar({ }) {
    const [sidebarWidth, setSidebarWidth] = useState(175); // Initial width
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newWidth = Math.max(100, e.clientX); // Prevents the width from going below 100px
            setSidebarWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="flex">
            <aside
                className={`sidebarGradiant min-h-full py-4 px-8 transition-width`}
                style={{ maxWidth: `${sidebarWidth}px`, width: `${sidebarWidth}px` }}
            >
                <ul className="text-white">
                    <li>
                        <a href="/" className="sidebarli hover:bg-gray-700 block py-2 px-4 rounded transition-colors">
                            <HomeIcon size={5} mr={5} />Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/" className="sidebarli hover:bg-gray-700 block py-2 px-4 rounded transition-colors">
                            <LeagueIcon size={5} mr={5} />Leagues
                        </a>
                    </li>
                    <li>
                        <a href="/" className="sidebarli hover:bg-gray-700 block py-2 px-4 rounded transition-colors">
                            <TeamsIcon size={5} mr={5} />Teams
                        </a>
                    </li>
                    <li>
                        <a href="/" className="sidebarli hover:bg-gray-700 block py-2 px-4 rounded transition-colors">
                            <PlayerIcon size={5} mr={5} />Players
                        </a>
                    </li>
                    <li>
                        <a href="/steveWork/live/nxIQxmZ53A6LAoPlWdTW" className="sidebarli hover:bg-gray-700 block py-2 px-4 rounded transition-colors">
                            <StatsIcon size={5} mr={5} />LiveGame
                        </a>
                    </li>
                </ul>
            </aside>
            <div
                onMouseDown={handleMouseDown}
                className="cursor-ew-resize bg-white"
                style={{
                    width: "10px", // Width of the resize handle
                    height: "100vh", // Full height of the sidebar
                }}
            />
        </div>
    );
}
