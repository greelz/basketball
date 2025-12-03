"use client";

import { db } from "@/app/config";
import { usePlayerList } from "./hooks";

interface IPlayersAndPointsListProps {
  gameId: string;
}
export default function PlayersAndPointsList(
  props: IPlayersAndPointsListProps
) {
  const players = usePlayerList(props.gameId, db);
  return (
    <div className="flex gap-2 flex-nowrap h-full overflow-auto">
      {players
        ?.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .map((p) => (
          <div className="flex flex-col p-1 border-2 border-slate-700 shadow-lg min-w-30 gap-1">
            <div className="h-[20%] p-[.25] text-center content-center text-2xl shadow-lg/50 bg-jeopardy">
              {p.score ? "$" + p.score?.toLocaleString("en-US") : null}
            </div>
            <div
              className={`h-[18%] ${p.t ? "bg-white" : "bg-jeopardy"}`}
            ></div>
            <div className="h-[40%] break-all text-sm text-center bg-jeopardy py-6">
              {p.name}
            </div>
            <div className={`${p.t ? "bg-white" : "bg-jeopardy"} flex-1`}></div>
          </div>
        ))}
    </div>
  );
}
