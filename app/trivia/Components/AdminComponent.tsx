'use client';

import {db} from '@/app/config';
import {usePlayerList, useCurrentQuestionId, useBuzzData} from './hooks';
import AdminRow from './AdminRow';
import {IPlayer, IJeopardyBoard} from '@/app/trivia/Interfaces/Jeopardy';
import {useRef, useState, useCallback} from 'react';
import {
  awardPoints,
  removeBuzzData,
  enableBuzzers,
  disableBuzzers,
  setBuzzedThisRound,
  showBoard,
} from './apis';
import {writeBatch} from 'firebase/firestore';

interface IAdminComponentProps {
  gameId: string;
  board: IJeopardyBoard;
}

function sortByScoreOrName(a: IPlayer, b: IPlayer) {
  if (!a.score && !b.score) return a.name.localeCompare(b.name);

  return (b.score ?? 0) - (a.score ?? 0);
}

export default function AdminComponent({gameId, board}: IAdminComponentProps) {
  const players = usePlayerList(gameId, db);
  const buzzers = useBuzzData(gameId, db);
  const questionId = useCurrentQuestionId(gameId, db);
  const currentQuestion = board.categories
    .flatMap((c) => c.questions)
    .find((q) => q.id === questionId);

  const timeout = useRef<NodeJS.Timeout>(null);

  const [calledOnPlayer, setCalledOnPlayer] = useState<IPlayer | undefined>();

  const answered = useCallback(
    async (correctly: boolean, gameId: string, name: string) => {
      const batch = writeBatch(db);
      const val = currentQuestion?.value || 0;
      if (correctly) {
        awardPoints(gameId, name, val, batch);
        removeBuzzData(gameId, batch);
        showBoard(gameId, batch);
      } else {
        awardPoints(gameId, name, -val, batch);
        removeBuzzData(gameId, batch);
        enableBuzzers(gameId, batch);
        setBuzzedThisRound(gameId, name, batch);
      }
      await batch.commit();
      setCalledOnPlayer(undefined);
    },
    [gameId, currentQuestion]
  );

  if (!players) {
    return null;
  }

  if (buzzers && !timeout.current && currentQuestion) {
    timeout.current = setTimeout(() => {
      // Get the fastest player
      const bestPlayer = buzzers.sort((a, b) => {
        const at = a.ms;
        const bt = b.ms;
        if (!at && !bt) return 0;
        if (!at) return 1;
        if (!bt) return -1;

        return at - bt;
      })[0];

      setCalledOnPlayer(bestPlayer);
      setBuzzedThisRound(gameId, bestPlayer.name);
      disableBuzzers(gameId);
    }, 500);
  } else if (!buzzers) {
    timeout.current = null;
  }

  return (
    <div className="h-full p-2 flex flex-col">
      {players.sort(sortByScoreOrName).map((p, idx) => {
        const isCalledOn = calledOnPlayer?.name === p.name;
        return (
          <div className={`px-2 ${isCalledOn ? 'bg-slate-800' : null}`} key={p.name}>
            <AdminRow
              gameId={gameId}
              player={p}
              ms={buzzers ? buzzers.find((p_ms) => p_ms.name === p.name)?.ms : undefined}
            />
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
