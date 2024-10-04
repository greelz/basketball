"use client"
import React, { useEffect, useState } from "react";
import { Game, Player, PlayerStat, PlayerStats } from "@/app/types";
import localFont from "next/font/local";
import LEDDisplayColor from "../../components/web/stats/LEDDisplayColor";
import { db } from "@/app/config";
import { onSnapshot, collection } from "firebase/firestore";
import { getTeamPlayersFromGame, isGameOver } from "@/app/database";
import DropdownSelector from "./DropdownSelector";
import HistStatCell from "../../hist/[gameId]/HistStatCell";
import AdminStatCell from "./AdminStatCell";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

interface IHistory {
    player: string;
    type: string;
    val: number;
}

interface Props {
    selectedGame: Game;
    team1: string;
    team2: string;
    team1players: Player[];
    team2players: Player[];
    leagueId: string;
    seasonId: string;
    gameId: string;
    gg: boolean;
    team1Name: string;
    team2Name: string;
    gameStatOptions: [];
    handleTeamofGameSelect: (teamId: string) => void;
    selectedTeamofGame: string;
}

//THIS COMPONENT IS NOT IN USE
//THIS COMPONENT IS TENTATIVE FOR REPLACING THE ADMINPANELFORM/TEAM DATA SUBMISSION


export default async function AdminTeamEditor({
    selectedGame,
    team1,
    team2,
    leagueId,
    seasonId,
    gameId,
    gg,
    team1Name,
    team2Name,
    gameStatOptions,
    handleTeamofGameSelect,
    selectedTeamofGame,
}: Props) {



    const [player, setPlayer] = useState("");
    const [history, setHistory] = useState<IHistory[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const [playerStatistics, setPlayerStatistics] = useState<
        PlayerStats[] | undefined
    >();

    const allPlayers = selectedGame.team1players!.concat(selectedGame.team2players!); // starting block for who to show on the screen

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
    let team1Score = 0;
    let team2Score = 0;
    if (selectedGame.team1score && selectedGame.team2score) {
        team1Score = selectedGame.team1score;
        team2Score = selectedGame.team2score;
    }
    let victor = {
        id: "",
        name: "",
        score: 0
    };
    let loser = {
        id: "",
        name: "",
        score: 0
    };
    if (!selectedGame.team1score && !selectedGame.team2score) {
        playerStatistics?.forEach((p) => {
            if (p.teamId === team1) team1Score += p.points ?? 0;
            if (p.teamId === team2) team2Score += p.points ?? 0;
        });
    }

    if (team1Score > team2Score) { victor!.score = team1Score; victor!.id = team1; loser!.score = team2Score; loser!.id = team2; victor!.name = team1Name; loser!.name = team2Name; };
    if (team2Score > team1Score) { victor!.score = team2Score; victor!.id = team2; loser!.score = team1Score; loser!.id = team1; victor!.name = team2Name; loser!.name = team1Name; };

    if (!playerStatistics) return "Couldn't find any stats to show.";

    const victorTotals = playerStatistics
        .filter((p) => p.teamId === victor!.id)
        .reduce(
            (acc, s) => {
                acc.twosAttempted += (s.two_point_made ?? 0) + (s.two_point_miss ?? 0);
                acc.twosMade += s.two_point_made ?? 0;
                acc.threesAttempted += (s.three_point_made ?? 0) + (s.three_point_miss ?? 0);
                acc.threesMade += s.three_point_made ?? 0;
                acc.oReb += s["O rebounds"] ?? 0;
                acc.dReb += s["D rebounds"] ?? 0;
                acc.totalReb += (s["O rebounds"] ?? 0) + (s["D rebounds"] ?? 0);
                acc.assists += s.assists ?? 0;
                acc.steals += s.steals ?? 0;
                acc.blocks += s.blocks ?? 0;
                acc.turnovers += s.turnovers ?? 0;
                acc.points += s.points ?? 0;
                return acc;
            },
            {
                twosAttempted: 0,
                twosMade: 0,
                threesAttempted: 0,
                threesMade: 0,
                fgMakes: 0,
                fgAttempts: 0,
                oReb: 0,
                dReb: 0,
                totalReb: 0,
                assists: 0,
                steals: 0,
                blocks: 0,
                turnovers: 0,
                points: 0,
            }
        );

    const loserTotals = playerStatistics
        .filter((p) => p.teamId === loser!.id)
        .reduce(
            (acc, s) => {
                acc.twosAttempted += (s.two_point_made ?? 0) + (s.two_point_miss ?? 0);
                acc.twosMade += s.two_point_made ?? 0;
                acc.threesAttempted += (s.three_point_made ?? 0) + (s.three_point_miss ?? 0);
                acc.threesMade += s.three_point_made ?? 0;
                acc.oReb += s["O rebounds"] ?? 0;
                acc.dReb += s["D rebounds"] ?? 0;
                acc.totalReb += (s["O rebounds"] ?? 0) + (s["D rebounds"] ?? 0);
                acc.assists += s.assists ?? 0;
                acc.steals += s.steals ?? 0;
                acc.blocks += s.blocks ?? 0;
                acc.turnovers += s.turnovers ?? 0;
                acc.points += s.points ?? 0;
                return acc;
            },
            {
                twosAttempted: 0,
                twosMade: 0,
                threesAttempted: 0,
                threesMade: 0,
                fgMakes: 0,
                fgAttempts: 0,
                oReb: 0,
                dReb: 0,
                totalReb: 0,
                assists: 0,
                steals: 0,
                blocks: 0,
                turnovers: 0,
                points: 0,
            }
        );

    return (<>
        {/* start stats */}
        <DropdownSelector title="Select Team" options={gameStatOptions} onSelect={handleTeamofGameSelect} />
        <table className="w-full bggrayd-nohov border-separate border-spacing-0 text-center mt-4 ">
            <thead>
                <tr className="border-b ">
                    <th className="text-center text-md border-gray-600 border-b border-t border-r"></th>
                    <th className="text-center border-gray-600 border-b border-t">2PT</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">2PT+</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">3PT</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">3PT+</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">FG%</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">OREB</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">DREB</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">TREB</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">AST</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">STL</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">BLK</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">TO</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">eFG%</th>
                    <th className="text-center border-gray-600 border-b border-t border-l">PTS</th>
                </tr>
            </thead>
            {selectedTeamofGame === victor.id ? (
                <>
                    <tbody>
                        {playerStatistics
                            .filter((p) => p.teamId === victor!.id)
                            .map((s) => (
                                <AdminStatCell
                                    key={s.id}
                                    s={s} />
                            ))}
                    </tbody>
                    <tfoot className="min-w-full border-black border-2 bggrayd-nohov w-full">
                        <tr>
                            <td className="text-center text-md text-center text-xl py-4 font-normal border-gray-600 border-r">Team Totals</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.twosAttempted}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.twosMade}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.threesAttempted}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.threesMade}</td>
                            <td className={`${statfont.className} text-2xl`}>{0}%</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.oReb}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.dReb}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.totalReb}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.assists}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.steals}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.blocks}</td>
                            <td className={`${statfont.className} text-2xl`}>{victorTotals.turnovers}</td>
                            <td className={`${statfont.className} text-2xl border-gray-600 border-l border-r`}></td>
                            <td className={`${statfont.className} text-3xl text-green-200`}>{victorTotals.points}</td>
                        </tr>
                    </tfoot>
                </>) : (<>
                    <tbody>
                        {playerStatistics
                            .filter((p) => p.teamId === loser!.id)
                            .map((s) => (
                                <HistStatCell
                                    key={s.id}
                                    player={player}
                                    s={s}
                                    setPlayer={setPlayer} />
                            ))}
                    </tbody>
                    <tfoot className="min-w-full border-black border-2 bggrayd-nohov w-full">
                        <tr>
                            <td className="text-center text-md text-center text-xl py-4 font-normal border-gray-600 border-r">Team Totals</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.twosAttempted}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.twosMade}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.threesAttempted}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.threesMade}</td>
                            <td className={`${statfont.className} text-2xl`}>{0}%</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.oReb}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.dReb}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.totalReb}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.assists}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.steals}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.blocks}</td>
                            <td className={`${statfont.className} text-2xl`}>{loserTotals.turnovers}</td>
                            <td className={`${statfont.className} text-2xl border-gray-600 border-l border-r`}></td>
                            <td className={`${statfont.className} text-3xl text-red-200`}>{loserTotals.points}</td>
                        </tr>
                    </tfoot>
                </>)}
        </table>
    </>
    )
}