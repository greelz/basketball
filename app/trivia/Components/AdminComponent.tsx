'use client';

import { db } from '@/app/config';
import { usePlayerList, useBuzzerStartTime, useCurrentQuestion } from './hooks';
import AdminRow from './AdminRow';
import { IPlayer } from '@/app/trivia/Interfaces/Jeopardy';
import { useRef, useState, useCallback } from 'react';
import {
  awardPointsInBatch,
  disableBuzzers,
  enableBuzzersInBatch,
  removeBuzzDataInBatch,
  setBuzzedThisRound,
  showBoard,
} from './apis';
import { writeBatch } from 'firebase/firestore';

interface IAdminComponentProps {
  gameId: string;
}

function sortByScoreOrName(a: IPlayer, b: IPlayer) {
  if (!a.score && !b.score) return a.name.localeCompare(b.name);

  return (b.score ?? 0) - (a.score ?? 0);
}

export default function AdminComponent({ gameId }: IAdminComponentProps) {
  const players = usePlayerList(gameId, db);
  const currentQuestion = useCurrentQuestion(gameId, db);
  const startTime = useBuzzerStartTime(gameId, db);
  const timeout = useRef<NodeJS.Timeout>(null);

  const [calledOnPlayer, setCalledOnPlayer] = useState<IPlayer | undefined>();

  const answered = useCallback(
    async (correctly: boolean, gameId: string, name: string) => {
      const batch = writeBatch(db);
      if (correctly) {
        awardPointsInBatch(gameId, name, currentQuestion?.value ?? 0, batch);
        removeBuzzDataInBatch(gameId, true, batch);
        showBoard(gameId);
      } else {
        removeBuzzDataInBatch(gameId, false, batch);
        enableBuzzersInBatch(gameId, batch);
      }
      await batch.commit();
      setCalledOnPlayer(undefined);
    },
    [gameId, currentQuestion]
  );

  if (!players) {
    return null;
  }

  if (startTime && !timeout.current) {
    if (players.some((p) => p.t && p.t > startTime)) {
      timeout.current = setTimeout(() => {
        // Get the fastest player
        const bestPlayer = players.sort((a, b) => {
          const at = a.t;
          const bt = b.t;
          if (!at && !bt) return 0;
          if (!at) return 1;
          if (!bt) return -1;

          if (at < startTime) return 1;
          if (bt < startTime) return -1;

          return at.toMillis() - bt.toMillis();
        })[0];

        setCalledOnPlayer(bestPlayer);
        setBuzzedThisRound(gameId, bestPlayer.name);
        disableBuzzers(gameId);
      }, 500);
    }
  } else if (!startTime) {
    timeout.current = null;
  }

  return (
    <div className="h-full p-2 flex flex-col">
      {players.sort(sortByScoreOrName).map((p, idx) => {
        const isCalledOn = calledOnPlayer?.name === p.name;
        return (
          <div className={`px-2 ${isCalledOn ? 'bg-slate-800' : null}`} key={p.name}>
            <AdminRow gameId={gameId} player={p} buzzData={p.t} buzzerStartTime={startTime} />
            {isCalledOn && (
              <div className="flex gap-2 items-center">
                <span>
                  Did <i>{p.name}</i> answer correctly?
                </span>
                <button
                  className="btn-green"
                  onClick={(e) => {
                    answered(true, gameId, p.name);
                    e.stopPropagation();
                  }}
                >
                  Yes
                </button>
                <button
                  className="btn-red"
                  onClick={(e) => {
                    answered(false, gameId, p.name);
                    e.stopPropagation();
                  }}
                >
                  No
                </button>
              </div>
            )}
            {idx !== players.length - 1 && (
              <hr className="border-slate-700 flex items-center justify-center" />
            )}
          </div>
        );
      })}
    </div>
  );
}
