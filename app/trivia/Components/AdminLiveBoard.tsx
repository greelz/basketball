'use client';

import LiveBoard from '@/app/trivia/Components/LiveBoard';
import { writeBatch } from 'firebase/firestore';
import { db } from '@/app/config';
import { IJeopardyQuestion, IJeopardyBoard } from '@/app/trivia/Interfaces/Jeopardy';
import { hideQuestion, removeBuzzData, showQuestion } from '@/app/trivia/Components/apis';

interface IAdminLiveBoardProps {
  gameId: string;
  board?: IJeopardyBoard;
}

async function editQuestion(
  gameId: string,
  question: IJeopardyQuestion | undefined,
  editType: 'show' | 'reset'
) {
  if (!question) return;

  const show = editType === 'show';
  const batch = writeBatch(db);

  removeBuzzData(gameId, batch);

  if (show) {
    showQuestion(gameId, question.id, batch);
  } else {
    hideQuestion(gameId, question.id, batch);
  }

  return batch.commit();
}

export default function AdminLiveBoard({ gameId, board }: IAdminLiveBoardProps) {
  if (!board) {
    return <div>Loading the board...</div>;
  }

  return (
    <>
      <div className="min-h-100">
        <LiveBoard
          hostMode
          board={board}
          gameId={gameId}
          onResetClick={async (question) => await editQuestion(gameId, question, 'reset')}
          onBoardClick={async (question) => await editQuestion(gameId, question, 'show')}
        />
      </div>
    </>
  );
}
