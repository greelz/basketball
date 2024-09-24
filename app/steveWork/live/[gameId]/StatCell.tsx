import { PlayerStats } from "@/app/types";
import React from "react";

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

export default function StatCell({ s, setPlayer, player }: Props) {
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
  return (
    <tr
      key={s.id}
      className={`cursor-pointer ${s.id === player ? "bg-slate-300 hover:bg-orange-900" : " hover:bg-orange-900"}`}
      onClick={() => {
        if (player === s.id) {
          setPlayer("");
        } else {
          setPlayer(s.id);
        }
      }}
    >
      <td>{s.name}</td>
      <td className="text-xs text-center border-l">{totalTwosAttempted}</td>
      <td className="text-xs text-center border-l">{s.two_point_made ?? 0}</td>
      <td className="text-xs text-center border-l">{totalThreesAttempted}</td>
      <td className="text-xs text-center border-l">{s.three_point_made ?? 0}</td>
      <td className="text-xs text-center border-l">
        {totalMakes}-{totalAttempts}
      </td>
      <td className="text-xs text-center border-l">
        {s.three_point_made ?? 0}-{totalThreesAttempted}
      </td>
      <td className="text-xs text-center border-l">{s["O rebounds"]}</td>
      <td className="text-xs text-center border-l">{s["D rebounds"]}</td>
      <td className="text-xs text-center border-l">{s.assists}</td>
      <td className="text-xs text-center border-l">{s.steals}</td>
      <td className="text-xs text-center border-l">{s.blocks}</td>
      <td className="text-xs text-center border-l">{s.turnovers}</td>
      <td className="text-xs text-center border-l">{s.points}</td>
    </tr>
  );
}
