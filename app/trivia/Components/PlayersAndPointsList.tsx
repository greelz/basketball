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
    <div className="flex gap-6 flex-nowrap h-full overflow-x-auto justify-center">
      {players
        ?.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .map((p) => (
          <div
            key={p.name}
            className="flex flex-col flex-[0_0_150px] p-1 border-2 border-slate-700 shadow-lg gap-1"
          >
            <div className="h-[20%] p-[.25] text-center content-center text-2xl shadow-lg/50 bg-jeopardy">
              {p.score ? "$" + p.score?.toLocaleString("en-US") : null}
            </div>
            <div
              className={`h-[18%] ${p.t ? "bg-white" : "bg-jeopardy"}`}
            ></div>
            <div className="h-[40%] flex items-center justify-center break-all text-sm overflow-hidden text-ellipsis text-center bg-jeopardy py-6">
              {p.name}
            </div>
            <div className={`${p.t ? "bg-white" : "bg-jeopardy"} flex-1`}></div>
          </div>
        ))}
    </div>
  );
}
