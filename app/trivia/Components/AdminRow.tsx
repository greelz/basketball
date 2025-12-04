"use client";

import { FaChevronRight } from "react-icons/fa";
import { IPlayer } from "@/app/trivia/Interfaces/Jeopardy";
import { ButtonHTMLAttributes, EventHandler, useCallback, useRef } from "react";
import AdminEditPopup from "./AdminEditPopup";
import { Timestamp } from "firebase/firestore";
import { useBuzzerStartTime } from "./hooks";
import { db } from "@/app/config";

interface IAdminRowProps {
  player: IPlayer;
  gameId: string;
  buzzData?: Timestamp;
  calledOn?: boolean;
}
export default function AdminRow({
  player,
  gameId,
  buzzData,
  calledOn,
}: IAdminRowProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const startTime = useBuzzerStartTime(gameId, db);

  const buzzMillis = buzzData?.toMillis();
  const startMillis = startTime?.toMillis();

  let diff;
  if (!buzzMillis || !startMillis) {
    diff = null;
  } else {
    diff = (buzzMillis - startMillis) / 1000;
  }

  const showPopup = useCallback(() => {
    popoverRef.current?.showPopover();
  }, []);

  const closePopup = useCallback(() => {
    popoverRef.current?.hidePopover();
  }, []);

  return (
    <>
      <div
        onClick={showPopup}
        className={`hover:cursor-pointer grid grid-cols-[2fr_1fr_1fr_15%] gap-2 items-center py-2 ${calledOn ? "bg-slate-600" : ""}`}
      >
        <div className="text-sm flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {player.name}
        </div>
        <div className="font-bold">{player.score ?? 0}</div>
        <div className="font-bold">{diff}</div>
        {calledOn && (
          <div className="flex items-center gap-2 justify-center">
            <button
              className="btn-green"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                alert("yes");
                e.stopPropagation();
              }}
            >
              Yes
            </button>
            <button className="btn-red">No</button>
          </div>
        )}
        <div className="flex justify-end opacity-20">
          <FaChevronRight size={".5em"} />
        </div>
      </div>
      <div
        className={`p-2 m-auto bg-black text-white max-w-[80%]
        shadow-slate-700 rounded-md border-slate-700 border-1`}
        ref={popoverRef}
        popover="auto"
      >
        <AdminEditPopup
          gameId={gameId}
          closePopup={closePopup}
          name={player.name}
          score={player.score}
        />
      </div>
    </>
  );
}
