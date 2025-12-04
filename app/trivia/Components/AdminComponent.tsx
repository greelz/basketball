'use client';

import { db } from '@/app/config';
import { usePlayerList, useBuzzerStartTime } from './hooks';
import AdminRow from './AdminRow';
import { IPlayer } from '@/app/trivia/Interfaces/Jeopardy';
import { useRef, useState } from 'react';

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
  const players = usePlayerList(props.gameId, db);
  const startTime = useBuzzerStartTime(props.gameId, db)?.toMillis();
  const timeout = useRef<NodeJS.Timeout>(null);

  const [calledOnPlayer, setCalledOnPlayer] = useState<IPlayer | undefined>();

  if (!players) {
    return null;
  }

  if (startTime && !timeout.current) {
    if (players.some((p) => p.t)) {
      timeout.current = setTimeout(() => {
        // Get the fastest player
        const bestPlayer = players.sort((a, b) => {
          const at = a.t;
          const bt = b.t;
          if (!at && !bt) return 0;
          if (!at) return 1;
          if (!bt) return -1;

          return at.toMillis() - bt.toMillis();
        })[0];

        setCalledOnPlayer(bestPlayer);
      }, 1000);
    }
  }

  return (
    <div className="h-full p-2 flex flex-col">
      <div>{startTime && calledOnPlayer && `The best player is ${calledOnPlayer?.name}`}</div>
      {players
        .sort((a, b) => sortSpecial(a, b, startTime))
        .map((p, idx) => (
          <div key={p.name + 'asdf'}>
            <AdminRow
              gameId={props.gameId}
              player={p}
              buzzData={p.t}
              calledOn={calledOnPlayer?.name === p.name}
            />
            {idx !== players.length - 1 && (
              <hr className="border-slate-700 flex items-center justify-center" />
            )}
          </div>
        ))}
    </div>
  );
}
