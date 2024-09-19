"use client";

import {
  Player,
  PlayerStat,
  PlayerStats,
  PlayerStatsStringForButtons,
} from "@/app/types";
import React, { useCallback, useEffect, useState } from "react";
import StatCell from "./StatCell";
import StatIncrementButton from "./StatIncrementButton";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/config";
import Clock from "./Clock";

interface Props {
  incrementStat: (
    playerId: string,
    fieldName: string,
    incrementValue: number
  ) => void;
  finalizeGame: () => void;
  team1Id: string;
  team2Id: string;
  team1Players: Player[];
  team2Players: Player[];
  leagueId: string;
  seasonId: string;
  gameId: string;
  gameIsOver: boolean;
  team1Name: string;
  team2Name: string;
}

interface IHistory {
  player: string;
  type: string;
  val: number;
}

export default function PlayerIncrementor({
  incrementStat,
  finalizeGame,
  team1Id,
  team2Id,
  team1Players,
  team2Players,
  leagueId,
  seasonId,
  gameId,
  gameIsOver,
  team1Name,
  team2Name,
}: Props) {
  const [player, setPlayer] = useState("");
  const [history, setHistory] = useState<IHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [playerStatistics, setPlayerStatistics] = useState<
    PlayerStats[] | undefined
  >();

  const allPlayers = team1Players.concat(team2Players); // starting block for who to show on the screen

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(
        db,
        `leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/playerStatistics`
      ),
      (snapshot) => {
        const tempStats: PlayerStats[] = allPlayers.map((p) => ({ ...p }));
        snapshot.docs.forEach((s) => {
          const two_point_made = s.data()["two_point_made"] ?? 0;
          const three_point_made = s.data()["three_point_made"] ?? 0;
          const specificPlayerIdx = tempStats.findIndex((a) => a.id === s.id);
          if (specificPlayerIdx === -1) return;
          tempStats[specificPlayerIdx] = {
            ...tempStats[specificPlayerIdx],
            ...(s.data() as PlayerStat),
            points: two_point_made * 2 + three_point_made * 3,
          };
        });
        setPlayerStatistics(tempStats);
      }
    );
    return () => unsubscribe();
  }, []);

  const incrementAndAddToHistory = useCallback(
    (p: string, t: string, v: number) => {
      if (gameIsOver) return;
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
  playerStatistics?.forEach((p) => {
    if (p.teamId === team1Id) team1Score += p.points ?? 0;
    if (p.teamId === team2Id) team2Score += p.points ?? 0;
  });

  const undoDisabled =
    historyIndex === null || historyIndex === 0 || gameIsOver;

  if (!playerStatistics) return "Couldn't find any stats to show.";
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Stats Table */}
        <div className="flex-1 border rounded-lg overflow-x-auto bg-white shadow-md">
          <table className="min-w-full text-sm text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 font-semibold border">NAME</th>
                <th className="p-2 text-xs border">2PA</th>
                <th className="p-2 text-xs border">2PM</th>
                <th className="p-2 text-xs border">3PA</th>
                <th className="p-2 text-xs border">3PM</th>
                <th className="p-2 border">FG</th>
                <th className="p-2 border">3PT</th>
                <th className="p-2 border">OREB</th>
                <th className="p-2 border">DREB</th>
                <th className="p-2 border">AST</th>
                <th className="p-2 border">STL</th>
                <th className="p-2 border">BLK</th>
                <th className="p-2 border">TO</th>
                <th className="p-2 font-bold border">PTS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 border-b">
                <td className="font-bold p-2 border-r border-b">{team1Name}</td>
              </tr>
              {playerStatistics
                .filter((p) => p.teamId === team1Id)
                .map((s) => (
                  <StatCell
                    key={s.id}
                    player={player}
                    s={s}
                    setPlayer={setPlayer}
                  />
                ))}
              <tr className="bg-gray-50 border-b">
                <td className="font-bold p-2 border-r border-b">{team2Name}</td>
              </tr>
              {playerStatistics
                .filter((p) => p.teamId === team2Id)
                .map((s) => (
                  <StatCell
                    key={s.id}
                    player={player}
                    s={s}
                    setPlayer={setPlayer}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {/* Score and Clock */}
        <div className="flex flex-col justify-center items-center flex-1 text-5xl font-semibold bg-white rounded-full max-w-xs border-black border-2">
          <span className="text-base mb-1">Score</span>
          <div className="text-center mb-4 border-black border-2 p-4">
            {team1Score} - {team2Score}
          </div>
          <Clock />
        </div>
      </div>

      {/* Player Stat Buttons and Undo Button */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {PlayerStatsStringForButtons.map((buttonData, index) => (
          <StatIncrementButton
            key={buttonData.id}
            incrementStat={incrementAndAddToHistory}
            player={player}
            t={buttonData}
          />
        ))}
        <button
          className={`col-span-2 ${undoDisabled ? "bg-slate-300" : "bg-blue-500 text-white hover:bg-blue-600"} rounded-lg px-4 py-2`}
          onClick={() => {
            if (!historyIndex || historyIndex === 0 || gameIsOver) return;
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

      {/* Finalize Game Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600" onClick={() => finalizeGame()}>
          Finalize Game
        </button>
      </div>
    </div>
  );
}
