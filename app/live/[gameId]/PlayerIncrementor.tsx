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
import { spec } from "node:test/reporters";

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

function findPlayerName(team1: Player[], team2: Player[], id: string) {
  const team1_team2 = team1.concat(team2);
  return team1_team2.find((t) => t.id === id)?.name;
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
        const tempStats: PlayerStats[] = allPlayers.map(p => ({...p}));
        snapshot.docs.forEach((s) => {
          const specificPlayerIdx = tempStats.findIndex((a) => a.id === s.id);
          if (specificPlayerIdx === -1) return;
          tempStats[specificPlayerIdx] = {
            ...tempStats[specificPlayerIdx],
            ...(s.data() as PlayerStat),
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
    <div className="flex flex-1 gap-4 flex-col">
      <div className="flex flex-row flex-wrap">
        <table className="mx-2 text-right padding-2 flex-1">
          <thead>
            <tr>
              <td>NAME</td>
              <td className="text-xs">2PA</td>
              <td className="text-xs">2PM</td>
              <td className="text-xs">3PA</td>
              <td className="text-xs">3PM</td>
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
          </thead>
          <tbody>
            <tr>
              <td className="font-bold">{team1Name}</td>
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
            <tr>
              <td className="font-bold">{team2Name}</td>
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
        <div className="text-7xl flex-1 flex justify-center gap-2 items-center text-center">
          <div>{team1Score}</div>-<div>{team2Score}</div>
        </div>
      </div>
      <div className="grid gap-3 grid-cols-6 text-xs justify-evenly items-center">
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(0, 2).map((t) => (
            <StatIncrementButton
              key={t.id}
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(2, 4).map((t) => (
            <StatIncrementButton
              key={t.id}
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(4, 6).map((t) => (
            <StatIncrementButton
              key={t.id}
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(6, 8).map((t) => (
            <StatIncrementButton
              key={t.id}
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {PlayerStatsStringForButtons.slice(8).map((t) => (
            <StatIncrementButton
              key={t.id}
              incrementStat={incrementAndAddToHistory}
              player={player}
              t={t}
            />
          ))}
        </div>
        <button
          className={`${undoDisabled ? "bg-slate-300" : ""} btn btn-blue`}
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
      <button className="btn ml-auto mt-auto" onClick={() => finalizeGame()}>
        Finalize Game
      </button>
    </div>
  );
}
