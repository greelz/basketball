import { PlayerStats } from "@/app/types";
import React from "react";
import localFont from "next/font/local";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });


interface Props {
    s: PlayerStats;
    setPlayer: (p: string) => void;
    player: string;
}

const convertToZeroOrOriginal = (val: any) => {
    if (typeof val === "number" && !isNaN(val)) {
        return val;
    } else {
        return 0;
    }
};

export default function HistStatCell({ s, setPlayer, player }: Props) {
    let totalTwosAttempted =
        convertToZeroOrOriginal(s.two_point_miss) +
        convertToZeroOrOriginal(s.two_point_made);
    let totalThreesAttempted =
        convertToZeroOrOriginal(s.three_point_miss) +
        convertToZeroOrOriginal(s.three_point_made);
    let totalAttempts =
        convertToZeroOrOriginal(s.two_point_miss) +
        convertToZeroOrOriginal(s.two_point_made) +
        convertToZeroOrOriginal(s.three_point_miss) +
        convertToZeroOrOriginal(s.three_point_made);
    let totalMakes =
        convertToZeroOrOriginal(s.two_point_made) +
        convertToZeroOrOriginal(s.three_point_made);
    const oReb = convertToZeroOrOriginal(s["O rebounds"]) ?? 0;
    const dReb = convertToZeroOrOriginal(s["D rebounds"]) ?? 0;

    return (
        <tr className={`border-gray-600 border-b hover:bg-orange-600/50 cursor-pointer ${s.id === player ? "bg-orange-600" : ""}`}
            key={s.id}
            onClick={() => {
                if (player === s.id) {
                    setPlayer("");
                } else {
                    setPlayer(s.id);
                }
            }}
        >
            <td className="border-gray-600 border-b border-r text-white">{s.name}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{totalTwosAttempted ?? 0}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{s.two_point_made ?? 0}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{totalThreesAttempted ?? 0}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{s.three_point_made ?? 0}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{`${convertToZeroOrOriginal(Math.floor((totalMakes / totalAttempts) * 100))}%`}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{oReb}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{dReb}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{dReb + oReb}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{s.assists ?? 0}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{s.steals ?? 0} </td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{s.blocks ?? 0}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{s.turnovers ?? 0}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl `}>{`${convertToZeroOrOriginal(Math.floor(((((s.two_point_made ?? 0) + (s.three_point_made ?? 0) + (s.three_point_made ?? 0)) * 0.5) / (totalTwosAttempted + totalThreesAttempted)) * 100) ?? 0)}%`}</td>
            <td className={`${statfont.className} border-gray-600 border-b text-2xl`}>{s.points ?? 0}</td>
        </tr>
    );
}
