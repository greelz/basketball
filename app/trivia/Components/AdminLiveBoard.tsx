'use client';

import LiveBoard from '@/app/trivia/Components/LiveBoard';
import { doc, arrayUnion, arrayRemove, deleteField, writeBatch } from 'firebase/firestore';
import { db } from '@/app/config';
import { IJeopardyQuestion, IJeopardyBoard } from '@/app/trivia/Interfaces/Jeopardy';
import { deleteCollectionInBatch } from '@/app/trivia/Components/apis';

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

  // gameId.state.questions is a document that holds a few fields:
  // -- currentQuestionId
  // -- hiddenQuestions (array of question IDs)

  //
  // gameId.state.game is a document that holds a few fields:
  // -- enableBuzzers: boolean
  // -- buzzerStartTime: Timestamp
  //
  // gameId.players is a collection of players and their data
  // gameId.players.<playerId> is a document with these fields:
  // -- buzzedThisRound: boolean
  // -- t: Timestamp of buzzer

  // So, to show a question, we want to...
  // 1. set state.questions.currentQuestionId to question.id
  // 2. Disable buzzers
  // 3. Remove all the buzzer data if it exists
  //
  // We need to do this in a transaction because we read player data first

  // This runs in a batch to delete all the player data
  const show = editType === 'show';

  const batch = writeBatch(db);

  deleteCollectionInBatch(`trivia.${gameId}.players`, batch);

  batch.set(
    doc(db, 'trivia', gameId, 'state', 'buzzers'),
    {
      enableBuzzers: deleteField(),
      buzzerStartTime: deleteField(),
    },
    { merge: true }
  );

  batch.set(
    doc(db, 'trivia', gameId, 'state', 'currentQuestion'),
    {
      id: show ? question.id : deleteField(),
    },
    { merge: true }
  );

  batch.set(doc(db, 'trivia', gameId, 'state', 'hiddenQuestions'), {
    questions: show ? arrayUnion(question.id) : arrayRemove(question.id),
  });

  return await batch.commit();
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
          onResetClick={(question) => editQuestion(gameId, question, 'reset')}
          onBoardClick={(question) => editQuestion(gameId, question, 'show')}
        />
      </div>
    </>
  );
}
