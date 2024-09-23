import HomeIcon from "../web/Icons/HomeIcon";
import LeagueIcon from "../web/Icons/LeagueIcon";
import PlayerIcon from "../web/Icons/PlayerIcon";
import StatsIcon from "../web/Icons/StatsIcon";
import TeamsIcon from "../web/Icons/TeamsIcon";


export default function AdminSidebar() {
    return (
        <aside className="sidebarGradiant min-h-full w-64 p-4  shadow-2xl">
            <ul className="text-white">
                <li><a href="/" className="sidebarli"><HomeIcon size={5} mr={5} />Dashboard</a></li>
                <li><a href="/" className="sidebarli"><LeagueIcon size={5} mr={5} />Leagues</a></li>
                <li><a href="/" className="sidebarli"><TeamsIcon size={5} mr={5} />Teams</a></li>
                <li><a href="/" className="sidebarli"><PlayerIcon size={5} mr={5} />Players</a></li>
                <li><a href="/steveWork/live/nxIQxmZ53A6LAoPlWdTW" className="sidebarli"><StatsIcon size={5} mr={5} />LiveGame</a></li>
            </ul>
        </aside >
    );
}
