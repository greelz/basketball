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
  let totalAttempts =
    convertToZeroOrOriginal(s.two_point_miss) +
    convertToZeroOrOriginal(s.three_point_miss);
  let totalMakes =
    convertToZeroOrOriginal(s.two_point_made) +
    convertToZeroOrOriginal(s.three_point_made);
  let totalThreesAttempted = convertToZeroOrOriginal(s.three_point_miss);
  let totalThreesMade = convertToZeroOrOriginal(s.three_point_made);
  return (
    <tr
      key={s.id}
      className={`cursor-pointer ${s.id === player ? "bg-slate-300" : ""}`}
      onClick={() => setPlayer(s.id)}
    >
      <td>{s.name}</td>
      <td>
        {totalMakes}-{totalAttempts}
      </td>
      <td>
        {totalThreesMade}-{totalThreesAttempted}
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