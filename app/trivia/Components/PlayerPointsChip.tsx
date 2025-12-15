"use client";

import { db } from "@/app/config";
import { usePlayer } from "./hooks";

interface IPlayerPointsChipProps {
  gameId: string;
  name: string;
}
export default function PlayerPointsChip({
  gameId,
  name,
}: IPlayerPointsChipProps) {
  const player = usePlayer(gameId, name, db);
  return <div>{player?.score}</div>;
}
