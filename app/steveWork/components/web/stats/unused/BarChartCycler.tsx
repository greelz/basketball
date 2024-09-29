import { useEffect, useState } from "react";
import BarChart from "./unused/BarChart";


interface Props {
    team: any
    variant: number
}



export default function BarChartCycler({ team, variant }: Props) {

    const stats = [
        "assists",
        "turnovers",
        "two_point_made",
        "three_point_made",
        "points",
        "D rebounds",
        "O rebounds",
        "steals",
        "blocks",
    ];
    const [currentStatidx, setCurrentStatidx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatidx((previdx) =>
                (previdx + 1) % stats.length
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [stats.length]);

    return (
        <div>
            <BarChart team={team} stat={stats[currentStatidx]} variant={variant} />
        </div>
    );
}