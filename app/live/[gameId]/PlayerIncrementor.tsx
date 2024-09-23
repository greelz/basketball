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

  if (process.env.NODE_ENV === "development") {
    useEffect(() => setPlayerStatistics([
      {
        name: "Jonas L",
        id: "CRkCwB34bxCKFSUowV40",
        teamId: "74k0M13yM3kY6Gd92vO8",
        assists: 1,
        two_point_miss: 6,
        turnovers: 4,
        three_point_made: 3,
        "O rebounds": 1,
        steals: 1,
        two_point_made: 3,
        three_point_miss: 3,
        "D rebounds": 4,
        points: 15,
      },
      {
        name: "Caleb C",
        id: "WBDcCNHozLy8P3fPdIxZ",
        teamId: "74k0M13yM3kY6Gd92vO8",
      },
      {
        name: "Dillon C",
        id: "dKhU7oWusmsKUyCbH1FQ",
        teamId: "74k0M13yM3kY6Gd92vO8",
        three_point_made: 4,
        steals: 5,
        two_point_miss: 11,
        two_point_made: 10,
        "D rebounds": 6,
        "O rebounds": 10,
        three_point_miss: 9,
        blocks: 2,
        turnovers: 2,
        assists: 3,
        points: 32,
      },
      {
        name: "Cam H",
        id: "orfYYIQ4siHtJKD8kkMH",
        teamId: "74k0M13yM3kY6Gd92vO8",
        steals: 2,
        three_point_miss: 12,
        "O rebounds": 4,
        two_point_miss: 9,
        turnovers: 1,
        blocks: 1,
        assists: 4,
        two_point_made: 5,
        three_point_made: 6,
        "D rebounds": 10,
        points: 28,
      },
      {
        name: "Trace H",
        id: "LM6fxBKqZeFE3Gv0jgoR",
        teamId: "U89b93HpOFa0kEqHwonf",
        two_point_made: 5,
        turnovers: 1,
        "D rebounds": 4,
        assists: 3,
        "O rebounds": 2,
        two_point_miss: 3,
        points: 10,
      },
      {
        name: "Nathan H",
        id: "c5R2tEgHAzkV1q9XCbGS",
        teamId: "U89b93HpOFa0kEqHwonf",
        two_point_miss: 9,
        two_point_made: 11,
        assists: 6,
        turnovers: 5,
        three_point_miss: 9,
        "D rebounds": 15,
        "O rebounds": 4,
        three_point_made: 1,
        points: 25,
      },
      {
        name: "Jon V",
        id: "heW0UypymlmfEtagwvjn",
        teamId: "U89b93HpOFa0kEqHwonf",
        "D rebounds": 2,
        three_point_miss: 4,
        turnovers: 2,
        assists: 4,
        two_point_made: 10,
        two_point_miss: 5,
        three_point_made: 3,
        steals: 1,
        "O rebounds": 2,
        points: 29,
      },
      {
        name: "Roscoe Z",
        id: "pUYrb84Q1Lz8xX3uxwHo",
        teamId: "U89b93HpOFa0kEqHwonf",
        two_point_miss: 3,
        "O rebounds": 2,
        steals: 1,
        three_point_miss: 7,
        assists: 4,
        three_point_made: 4,
        "D rebounds": 3,
        turnovers: 2,
        points: 12,
      },
    ]), []);
  } else {
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
  }

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
        <div className="text-7xl flex-1 flex flex-wrap justify-around gap-2 items-center text-center">
          <div>
            {team1Score} - {team2Score}
          </div>
          <Clock />
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
