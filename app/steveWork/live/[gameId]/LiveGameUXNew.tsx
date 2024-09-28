"use client"
import React, { useCallback, useEffect, useState } from "react";
import {
    Player,
    PlayerStat,
    PlayerStats,
} from "@/app/types";
import ShotTracker from "../../components/ShotTracker";
import Clock from "./ClockNew";
import LEDTracker from "../../components/web/stats/LEDTracker";
import PlayerIncrementorUX from "./PlayerIncrementorUX";
import LiveGamePlayerList from "../../components/web/stats/LiveGamePlayerList";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/config";


interface IHistory {
    player: string;
    type: string;
    val: number;
}

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


interface LiveGameParams {
    params: { gameId: string };
}

export default function LiveGameUXNew({
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
}: Props, { params }: LiveGameParams) {

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [assistingPlayer, setAssistingPlayer] = useState(null);



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

    const allPlayers = team1Players.concat(team2Players); // starting block for who to show on the screen



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


    // const team1 = Team1Stats.map(n => n.teamId);
    // const team2 = Team2Stats.map(n => n.teamId);
    // const team1Players = Team1Stats.map(n => n.name);
    // const team2Players = Team2Stats.map(n => n.name);
    // const team1points = Team1Stats.map(p => p.points).reduce((acc, cv) => acc + cv, 0);
    // const team2points = Team2Stats.map(p => p.points).reduce((acc, cv) => acc + cv, 0);;

    // const newSelectedStat1 = (stat: string) => {
    //     setSelectedStat1((prevStat) => stat);
    //     console.log(stat);
    // }

    // const newSelectedStat2 = (stat: string) => {
    //     setSelectedStat2((prevStat) => stat);
    //     console.log(stat);
    // }

    return (
        <main className="flex-1 min-h-0 bg-gray-100 homeRadial ">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-4 grid-rows-3 gap-4">
                {/* Left Column - Score, Player Names, Stats */}
                <div className=" bg-white p-4 rounded-lg shadow-md min-w-fit">
                    <div id="score" className="mb-2 text-center"><span className=" text-9xl "><LEDTracker amount={team1Score} variant={1} /></span></div>
                    <h2 className="text-4xl font-bold mb-4 border-t-2 text-black border-b-2">{team1Name}</h2>
                    <div className="flex flex-row justify-between">
                        <h3 className="font-semibold text-black mx-2">Players</h3>
                        <h3 className="font-semibold text-black mx-2">Points</h3>
                    </div>
                    <div className="flex-1 flex-col mx-2 ">
                        <LiveGamePlayerList
                            team={team1Players}
                            selectedPlayer={selectedPlayer}
                            assistingPlayer={assistingPlayer}
                            setSelectedPlayer={setSelectedPlayer}
                            setAssistingPlayer={setAssistingPlayer}
                            allPlayers={allPlayers}
                            playerStatistics={playerStatistics}
                        />
                    </div>
                </div>
                {/* Center Column - ScoreTimer */}
                <div className="col-span-2 bg-white p-4 rounded-lg shadow-md min-w-fit">
                    <div>
                        <Clock />
                    </div>
                    <div className="mb-5 flex flex-col items-center">
                        <ShotTracker selectedPlayer={selectedPlayer} />
                    </div>
                    <div className={selectedPlayer ? "content" : "hidden"}></div>
                </div>

                <div className="col-span-4 row-span-2 row-start-2">
                    <PlayerIncrementorUX
                        incrementStat={incrementStat}
                        finalizeGame={finalizeGame}
                        team1Id={team1Id}
                        team2Id={team2Id}
                        gameIsOver={gameIsOver}
                        leagueId={leagueId}
                        seasonId={seasonId}
                        gameId={gameId}
                        team1Players={team1Players}
                        team2Players={team2Players}
                        team1Name={team1Name}
                        team2Name={team2Name}
                        activePlayer={selectedPlayer}
                        setActivePlayer={setSelectedPlayer}
                        assistingPlayer={assistingPlayer}
                        setAssistingPlayer={setAssistingPlayer} />
                </div>
                {/* Right Column - Score, Player Names, Stats */}
                <div className="col-start-4 bg-white p-4 rounded-lg shadow-md min-w-fit">
                    <div className="mb-2 text-center"><span className="text-9xl  "><LEDTracker amount={team2Score} variant={1} /></span></div>
                    <h2 className="text-4xl font-bold mb-4 border-t-2 border-b-2 text-black">{team2Name}</h2>
                    <div className="flex flex-row justify-between">
                        <h3 className="font-semibold text-black mx-2">Players</h3>
                        <h3 className="font-semibold text-black mx-2">Points</h3>
                    </div>

                    <div className="flex-1 flex-col mx-2 mb-6">
                        <LiveGamePlayerList
                            team={team2Players}
                            selectedPlayer={selectedPlayer}
                            assistingPlayer={assistingPlayer}
                            setSelectedPlayer={setSelectedPlayer}
                            setAssistingPlayer={setAssistingPlayer}
                            allPlayers={allPlayers}
                            playerStatistics={playerStatistics}
                        />
                    </div>
                </div>

            </div>


        </main>
    );
}
