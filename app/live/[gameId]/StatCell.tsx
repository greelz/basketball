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
      className={`cursor-pointer ${s.id === player ? "bg-slate-300" : ""}`}
      onClick={() => {
        if (player === s.id) {
          setPlayer("");
        } else {
          setPlayer(s.id);
        }
      }}
    >
      <td>{s.name}</td>
      <td className="text-xs">{totalTwosAttempted}</td>
      <td className="text-xs">{s.two_point_made ?? 0}</td>
      <td className="text-xs">{totalThreesAttempted}</td>
      <td className="text-xs">{s.three_point_made ?? 0}</td>
      <td>
        {totalMakes}-{totalAttempts}
      </td>
      <td>
        {s.three_point_made ?? 0}-{totalThreesAttempted}
      </td>
      <td>{s["O rebounds"]}</td>
      <td>{s["D rebounds"]}</td>
      <td>{s.assists}</td>
      <td>{s.steals}</td>
      <td>{s.blocks}</td>
      <td>{s.turnovers}</td>
      <td>{s.points}</td>
    </tr>
  );
}