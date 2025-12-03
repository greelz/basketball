"use client";

import { db } from "@/app/config";
import { usePlayerList } from "./hooks";
import PlayerChip from "./PlayerChip";

interface IPlayerListProps {
  gameId: string;
}

export default function PlayerChipList({ gameId }: IPlayerListProps) {
  const players = usePlayerList(gameId, db);

  if (!players) {
    return null;
  }
  return (
    <div className="flex gap-2 p-2 flex-wrap">
      {players &&
        players.map((p, idx) => (
          <PlayerChip key={p.name} name={p.name} buzzingIn={p.t != null} />
        ))}
    </div>
  );
}
