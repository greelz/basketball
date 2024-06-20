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
  captain: string;
}

export interface Player {
  id: string; // Firestore document ID
  name: string;
  position?: string;
  teamId?: string; // what team are they on
}

export interface Game {
  id: string;
  name: string;
  team1: string;
  team2: string;
  date: unknown;
}

export interface PlayerStats extends Player {
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
