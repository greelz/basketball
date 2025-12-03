'use client'

import {usePlayerList} from "@/app/trivia/Components/hooks";
import {db} from "@/app/config";
import {useRef, useState} from "react";
import {awardPoints} from "./apis";

interface IAwardPointsButtonProps {
  gameId: string;
}
export default function AwardPointsButton(props: IAwardPointsButtonProps) {

  const possiblePoints = [100, 200, 300, 400, 500, 600, 800, 1000];
  const players = usePlayerList(props.gameId, db);
  const [points, setPoints] = useState(100);
  const [player, setPlayer] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <button className="btn-yellow" popoverTarget="awardPointsPopover">Award</button>
      <div ref={ref} popover="auto" id="awardPointsPopover" className="bg-black text-white m-auto w-[80%] md:w-[40%] max-h-[70%] shadow-md border-1 border-slate-700 p-4">
        <div className="flex flex-col gap-4">
          <div className="text-center">Award <span className="text-lg mx-1">{points}</span> points to <span className="mx-1 text-lg">{player}</span></div>
          <label>Points</label>
          <div className="flex gap-3 flex-wrap justify-evenly">
            {possiblePoints.map(p => <button key={p} className="btn-blue" onClick={() => setPoints(p)}>{p}</button>)}
          </div>
          <label>Player</label>
          <div className="flex gap-2 flex-wrap justify-evenly">
            {players?.map(p => <button key={p.name} className="w-[30%] break-all btn-green" onClick={() => setPlayer(p.name)}>{p.name}</button>)}
          </div>

          <button onClick={() => {
            awardPoints(props.gameId, player, points);
            ref.current?.hidePopover();
          }} className="mt-10 btn-blue" > Submit</button>
        </div>
      </div >
    </>
  );


}
