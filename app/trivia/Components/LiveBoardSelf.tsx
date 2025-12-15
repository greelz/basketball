'use client';

import { db } from '@/app/config';
import { useBoard } from '@/app/trivia/Components/hooks';
import LiveBoard from '@/app/trivia/Components/LiveBoard';

interface ILiveBoardSelfProps {
  gameId: string;
  fontsize?: string;
}

export default function LiveBoardSelf({ gameId, fontsize }: ILiveBoardSelfProps) {
  const board = useBoard(gameId, db);

  return <LiveBoard board={board} fontsize={fontsize} gameId={gameId} />;
}
