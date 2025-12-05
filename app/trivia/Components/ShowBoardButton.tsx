'use client';

import { showBoard } from "./apis";

interface IShowBoardButtonProps {
  gameId: string;
}

export default function ShowBoardButton({ gameId }: IShowBoardButtonProps) {
  return (
    <button onClick={() => showBoard(gameId)} type="button" className="btn-purple">
      Show Board
    </button>
  );
}
