"use client";

import { db } from "@/app/config";
import { usePlayerList, useBuzzerStartTime } from "./hooks";
import AdminRow from "./AdminRow";
import { IPlayer } from "@/app/trivia/Interfaces/Jeopardy";

interface IAdminComponentProps {
  gameId: string;
}

function sortByScoreOrName(a: IPlayer, b: IPlayer) {
  if (!a.score && !b.score) return a.name.localeCompare(b.name);

  return (b.score ?? 0) - (a.score ?? 0);
}

function sortSpecial(a: IPlayer, b: IPlayer, startTime: number | undefined) {
  // If there's no start time, sort by points
  if (!startTime) {
    return sortByScoreOrName(a, b);
  }

  // If there's a start time, sort by buzzer submission, or points otherwise
  if (!a.t && !b.t) return sortByScoreOrName(a, b);
  if (!a.t) return 1;
  if (!b.t) return -1;

  const aDiff = a.t.toMillis() - startTime;
  const bDiff = b.t.toMillis() - startTime;

  if (aDiff < 0 && bDiff < 0) return 0;
  if (aDiff < 0) return 1;
  if (bDiff < 0) return -1;

  return aDiff - bDiff;
}

export default function AdminComponent(props: IAdminComponentProps) {
  console.log("here");
  const players = usePlayerList(props.gameId, db);
  const startTime = useBuzzerStartTime(props.gameId, db)?.toMillis();

  if (!players) {
    return null;
  }

  return (
    <div className="h-full p-2 flex flex-col">
      {players
        .sort((a, b) => sortSpecial(a, b, startTime))
        .map((p, idx) => (
          <div key={p.name + "asdf"}>
            <AdminRow gameId={props.gameId} player={p} buzzData={p.t} />
            {idx !== players.length - 1 && (
              <hr className="border-slate-700 flex items-center justify-center" />
            )}
          </div>
        ))}
    </div>
  );
}
