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
import ShotTracker from "../../components/ShotTracker";
import ToggleCollapse from "../../components/web/ToggleCollapse";
import localFont from "next/font/local";
const shotfont = localFont({ src: "../../../../public/fonts/alarmclock.ttf" });

// BEGIN GREELZ DB CODE
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
  highlightedPlayer: string | null;
  activePlayer: string | null;
  setActivePlayer: () => void;
  assistingPlayer: string | null;
  setAssistingPlayer: () => void;
}

interface IHistory {
  player: string;
  type: string;
  val: number;
}

export default function PlayerIncrementorUX({
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
  activePlayer,
  setActivePlayer,
  assistingPlayer,
  setAssistingPlayer,
}: Props) {

  const [player, setPlayer] = useState("");
  const [history, setHistory] = useState<IHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [playerStatistics, setPlayerStatistics] = useState<
    PlayerStats[] | undefined
  >();


  //check if game is finalized before navigating away
  const [isGameSubmitted, setIsGameSubmitted] = useState(false);

  const submitGame = () => {
    setIsGameSubmitted(true);
    alert("Game finalized!");
    finalizeGame()
  };

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
  };

  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (!isGameSubmitted) {
        const confirmationMessage = "Are you sure you want to leave without finalizing your game?";
        e.returnValue = confirmationMessage; // For most browsers
        return confirmationMessage; // For older browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isGameSubmitted]);

  const allPlayers = [...team1Players, ...team2Players];

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

  // function selectAplayer(id:string){     maybe for selecting player based on graph choice or button choice?
  //   setPlayer((prevPlayer) => id);
  //   setSelectedPlayer((prevPlay)=> id);
  // }

  let team1Score = 0;
  let team2Score = 0;
  playerStatistics?.forEach((p) => {
    if (p.teamId === team1Id) team1Score += p.points ?? 0;
    if (p.teamId === team2Id) team2Score += p.points ?? 0;
  });

  const undoDisabled =
    historyIndex === null || historyIndex === 0 || gameIsOver;

  if (!playerStatistics) return "Couldn't find any stats to show.";
  const namesList1 = playerStatistics
    .filter((player) => player.teamId === team1Id)
    .map((player) => player.name);

  const namesList2 = playerStatistics
    .filter((player) => player.teamId === team2Id)
    .map((player) => player.name);

  // END GREELZ CODE

  //UPDATE REQ

  // const Team1Stats = [{

  //   name: "Jonas L",
  //   id: "CRkCwB34bxCKFSUowV40",
  //   teamId: "Banana Boat Boys",
  //   assists: 1,
  //   two_point_miss: 6,
  //   turnovers: 4,
  //   three_point_made: 3,
  //   "O rebounds": 1,
  //   steals: 1,
  //   two_point_made: 3,
  //   three_point_miss: 3,
  //   "D rebounds": 4,
  //   points: 16,
  // },
  // {
  //   name: "Caleb C",
  //   id: "WBDcCNHozLy8P3fPdIxZ",
  //   teamId: "Banana Boat Boys",
  //   points: 25
  // },
  // {
  //   name: "Dillon C",
  //   id: "dKhU7oWusmsKUyCbH1FQ",
  //   teamId: "Banana Boat Boys",
  //   three_point_made: 4,
  //   steals: 5,
  //   two_point_miss: 11,
  //   two_point_made: 10,
  //   "D rebounds": 6,
  //   "O rebounds": 10,
  //   three_point_miss: 9,
  //   blocks: 2,
  //   turnovers: 2,
  //   assists: 3,
  //   points: 32,
  // },
  // {
  //   name: "Cam H",
  //   id: "orfYYIQ4siHtJKD8kkMH",
  //   teamId: "Banana Boat Boys",
  //   steals: 2,
  //   three_point_miss: 12,
  //   "O rebounds": 4,
  //   two_point_miss: 9,
  //   turnovers: 1,
  //   blocks: 1,
  //   assists: 4,
  //   two_point_made: 5,
  //   three_point_made: 6,
  //   "D rebounds": 10,
  //   points: 28,
  // },];

  // const Team2Stats = [
  //   {
  //     name: "Trace H",
  //     id: "LM6fxBKqZeFE3Gv0jgoR",
  //     teamId: "AC130",
  //     two_point_made: 5,
  //     turnovers: 1,
  //     "D rebounds": 4,
  //     assists: 3,
  //     "O rebounds": 2,
  //     two_point_miss: 3,
  //     points: 10,
  //   },
  //   {
  //     name: "Nathan H",
  //     id: "c5R2tEgHAzkV1q9XCbGS",
  //     teamId: "AC130",
  //     two_point_miss: 9,
  //     two_point_made: 11,
  //     assists: 6,
  //     turnovers: 5,
  //     three_point_miss: 9,
  //     "D rebounds": 15,
  //     "O rebounds": 4,
  //     three_point_made: 1,
  //     points: 25,
  //   },
  //   {
  //     name: "Jon V",
  //     id: "heW0UypymlmfEtagwvjn",
  //     teamId: "AC130",
  //     "D rebounds": 2,
  //     three_point_miss: 4,
  //     turnovers: 2,
  //     assists: 4,
  //     two_point_made: 10,
  //     two_point_miss: 5,
  //     three_point_made: 3,
  //     steals: 1,
  //     "O rebounds": 2,
  //     points: 29,
  //   },
  //   {
  //     name: "Roscoe Z",
  //     id: "pUYrb84Q1Lz8xX3uxwHo",
  //     teamId: "AC130",
  //     two_point_miss: 3,
  //     "O rebounds": 2,
  //     steals: 1,
  //     three_point_miss: 7,
  //     assists: 4,
  //     three_point_made: 4,
  //     "D rebounds": 3,
  //     turnovers: 2,
  //     points: 12,
  //   }];

  // const stevePlayerStatistics = [...Team1Stats, ...Team2Stats];


  //dummyvalues
  // const dummyValue = 0;
  // const historyIndex = 2;
  // const team1 = Team1Stats.map(n => n.teamId);
  // const team2 = Team2Stats.map(n => n.teamId);
  // const team1Players = Team1Stats.map(n => n.name);
  // const team2Players = Team2Stats.map(n => n.name);
  // const team1points = Team1Stats.map(p => p.points).reduce((acc, cv) => acc + cv, 0);
  // const team2points = Team2Stats.map(p => p.points).reduce((acc, cv) => acc + cv, 0);;

  // const newSelectedStat1 = (stat: string) => {
  //   setSelectedStat1((prevStat) => stat);
  //   console.log(stat);
  // }

  // const newSelectedStat2 = (stat: string) => {
  //   setSelectedStat2((prevStat) => stat);
  //   console.log(stat);
  // }

  return (
    <>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Stats Table */}
          <div className="flex-1 border rounded-lg overflow-x-auto bg-white shadow-lg text-white bggrayd-nohov">
            <table className="min-w-full text-sm border-separate border-spacing-0 text-center  text-white">
              <thead>
                <tr className="border-b ">
                  <th className={`${shotfont.className} border`}>STATtrackR</th>
                  <th className={`${shotfont.className} border`}>2PA</th>
                  <th className={`${shotfont.className} border`} >2PM</th>
                  <th className={`${shotfont.className} border`} >3PA</th>
                  <th className={`${shotfont.className} border`}>3PM</th>
                  <th className={`${shotfont.className} border`}>FG</th>
                  <th className={`${shotfont.className} border`}>3PT</th>
                  <th className={`${shotfont.className} border`}>O REB</th>
                  <th className={`${shotfont.className} border`}>D REB</th>
                  <th className={`${shotfont.className} border`}>AST</th>
                  <th className={`${shotfont.className} border`}>STL</th>
                  <th className={`${shotfont.className} border`}>BLK</th>
                  <th className={`${shotfont.className} border`}>TO</th>
                  <th className="p-2 font-bold border">PTS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50 border-b">
                  <td className={`border-r border-b text-black font-bold`}>{team1Name}</td>
                </tr>
                {playerStatistics
                  .filter((p) => p.teamId === team1Id)
                  .map((s) => (
                    <StatCell
                      key={s.id}
                      player={player}
                      s={s}
                      setPlayer={setPlayer}
                      setActivePlayer={setActivePlayer}
                      setAssistingPlayer={setAssistingPlayer}
                      activePlayer={activePlayer}
                      assistingPlayer={assistingPlayer}
                    />
                  ))}
                <tr className="bg-gray-50 border-b">
                  <td className={`border-r border-b text-black font-bold`}>{team2Name}</td>
                </tr>
                {playerStatistics
                  .filter((p) => p.teamId === team2Id)
                  .map((s) => (
                    <StatCell
                      key={s.id}
                      player={player}
                      s={s}
                      setPlayer={setPlayer}
                      setActivePlayer={setActivePlayer}
                      setAssistingPlayer={setAssistingPlayer}
                      activePlayer={activePlayer}
                      assistingPlayer={assistingPlayer}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Player Stat Buttons and Undo Button */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 ">
          {PlayerStatsStringForButtons.map((buttonData, index) => (
            <StatIncrementButton
              key={buttonData.id}
              incrementStat={() => console.log('incrementStat')}
              player={player}
              t={buttonData}
            />
          ))}
          <button
            className={`col-span-2 ${undoDisabled ? "bg-slate-300 shadow-lg" : "shadow-lg bggrayd-nohov-inv text-white "} rounded-lg px-4 py-2`}
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
      </div>

      <div className="flex flex-col align-center justify-between mt-6">
        {/* Finalize Game Button */}
        < div className="flex flex-1 mt-12" >
          <button className="bg-green-500 text-white text-lg rounded-lg px-4 py-8 hover:bg-green-600 shadow-lg w-full" onClick={() => submitGame()}>
            Finalize Game
          </button>
        </div >
      </div >
    </>

  );
}



