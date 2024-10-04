import { Timestamp } from "firebase/firestore";

export interface League {
  id: string;
  name: string;
  description: string;
}

export interface Season {
  id: string; // Firestore document ID
  name: string;
}

export interface Team {
  id: string;
  name: string;
  captain?: string;
  wins: number;
  losses: number;
  ties: number;
}

export interface Player {
  id: string; // Firestore document ID
  name: string;
  teamId: string; // what team are they on
  position?: string;
}

export interface Game {
  id: string;
  name: string;
  team1: string;
  team2: string;
  team1score: number;
  team2score: number;
  date: Timestamp;
  gameover: 1 | undefined;
  team1name?: string;
  team2name?: string;
  victor?: string;
  loser?: string;
  victorScore?: number;
  loserScore?: number;
  team1players?: Player[];
  team2players?: Player[];
  opponent?: string;
  opponentScore?: number;
  selectedTeamScore?: number;
}

export interface GameForSeason extends Game {
  team1ref: Team;
  team2ref: Team;
}

export interface TeamRecord {
  teamId: string;
  wins: number;
  losses: number;
  ties: number;
}

export interface PlayerStat {
  assists?: number;
  points?: number;
  two_point_miss?: number;
  two_point_made?: number;
  three_point_miss?: number;
  three_point_made?: number;
  "O rebounds"?: number;
  "D rebounds"?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
}

export interface PlayerStats extends PlayerStat, Player { }

export const PlayerStatsStringForButtons = [
  { id: "two_point_miss", name: "2-miss" },
  { id: "two_point_made", name: "2-make" },
  { id: "three_point_miss", name: "3-miss" },
  { id: "three_point_made", name: "3-make" },
  { id: "O rebounds", name: "O Reb" },
  { id: "D rebounds", name: "D Reb" },
  { id: "assists", name: "Assist" },
  { id: "steals", name: "Steal" },
  { id: "blocks", name: "Block" },
  { id: "turnovers", name: "Tnovr" },
];
