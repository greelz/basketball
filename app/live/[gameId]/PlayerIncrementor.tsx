"use client";

import { Player, PlayerStats, PlayerStatsStringForButtons } from "@/app/types";
import React, { useCallback, useState } from "react";
import StatCell from "./StatCell";
import StatIncrementButton from "./StatIncrementButton";

interface Props {
  incrementStat: (
    playerId: string,
    fieldName: string,
    incrementValue: number
  ) => void;
  playerStats: PlayerStats[];
  team1Id: string;
  team2Id: string;
}

interface IHistory {
  player: string;
  type: string;
  val: number;
}

export default function PlayerIncrementor({
  incrementStat,
  playerStats,
  team1Id,
  team2Id,
}: Props) {
  const [player, setPlayer] = useState("");
  const [history, setHistory] = useState<IHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const incrementAndAddToHistory = useCallback(
    (p: string, t: string, v: number) => {
      incrementStat(p, t, v);
      setHistory((curr) => {
        const temp = curr.slice(0, historyIndex ?? 0);
        temp.push({ player: p, type: t, val: v });
        return temp;
      });
      setHistoryIndex(historyIndex === null ? 1 : historyIndex + 1);
    },
    [incrementStat, setHistory, historyIndex]
  );

  let team1Score = 0;
  let team2Score = 0;
  playerStats.forEach((p) => {
    if (p.teamId === team1Id) team1Score += p.points ?? 0;
    if (p.teamId === team2Id) team2Score += p.points ?? 0;
  });

  const undoDisabled = historyIndex === null || historyIndex === 0;

  console.log(undoDisabled);
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-row flex-wrap">
        <table className="mx-2 text-right padding-2 flex-1">
          <tr>
            <td>NAME</td>
            <td>FG</td>
            <td>3PT</td>
            <td>OREB</td>
            <td>DREB</td>
            <td>AST</td>
            <td>STL</td>
            <td>BLK</td>
            <td>TO</td>
            <td className="font-bold">PTS</td>
          </tr>
          {playerStats
            .filter((p) => p.teamId === team1Id)
            .map((s) => (
              <StatCell player={player} s={s} setPlayer={setPlayer} />
            ))}
          <hr className="m-2" />
          {playerStats
            .filter((p) => p.teamId === team2Id)
            .map((s) => (
              <StatCell player={player} s={s} setPlayer={setPlayer} />
            ))}
        </table>
        <div className="text-7xl flex-1 flex justify-center gap-2 items-center text-center">
          <div>{team1Score}</div>-<div>{team2Score}</div>
        </div>
      </div>
      <div className="grid gap-3 grid-cols-6 text-xs justify-evenly items-center">
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(0, 2).map((t) => (
            <StatIncrementButton
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(2, 4).map((t) => (
            <StatIncrementButton
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(4, 6).map((t) => (
            <StatIncrementButton
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(6, 8).map((t) => (
            <StatIncrementButton
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(8).map((t) => (
            <StatIncrementButton
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <button
          className={`${undoDisabled ? "bg-slate-300" : ""} btn btn-blue`}
          onClick={() => {
            if (!historyIndex || historyIndex === 0) return;
            const { player, type, val } = history[historyIndex - 1];

            // do the opposite thing that just happened
            incrementStat(player, type, -val);

            // move history back one
            setHistoryIndex(historyIndex - 1);
          }}
          disabled={undoDisabled}
        >
          Undo
        </button>
      </div>
    </div>
  );
}
