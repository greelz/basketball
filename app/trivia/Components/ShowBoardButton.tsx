"use client";

import { db } from "@/app/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import IJeopardyGame, { IServerBoard } from "@/app/trivia/Interfaces/Jeopardy";

interface IShowBoardButtonProps {
  gameId: string;
}

export async function showBoard(gameId: string) {
  const gameRef = doc(db, "trivia", gameId);
  const snap = await getDoc(gameRef);

  if (!snap.exists()) {
    console.error(`Couldn't find ${gameId}`);
    return;
  }

  const data = snap.data() as IServerBoard;
  const game = { ...(data.jeopardyGame as IJeopardyGame) };

  game.board.categories = game.board.categories?.map((cat) => ({
    ...cat,
    questions: cat.questions.map((q) => ({
      ...q,
      currentQuestion: false,
    })),
  }));

  await updateDoc(gameRef, {
    jeopardyGame: game,
  });
}

export default function ShowBoardButton({ gameId }: IShowBoardButtonProps) {
  return (
    <button
      onClick={() => showBoard(gameId)}
      type="button"
      className="btn-purple"
    >
      Show Board
    </button>
  );
}
