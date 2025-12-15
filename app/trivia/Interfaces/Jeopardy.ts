import { Timestamp } from 'firebase/firestore';

export interface IJeopardyGame {
  title: string;
  board: IJeopardyBoard;
  author?: string;
}

export interface IJeopardyBoard {
  isDoubleJeopardy?: boolean;
  categories: IJeopardyCategory[];
}

export interface IPlayer {
  name: string;
  score?: number;
  t?: Timestamp;
  buzzedThisRound?: boolean;
}

export interface IJeopardyCategory {
  title: string;
  questions: IJeopardyQuestion[];
}

export interface IJeopardyQuestion {
  answer: string;
  prompt: string;
  value: number;
  id: string;
  isDailyDouble?: boolean;
  hide?: boolean;
  currentQuestion?: boolean;
}

export interface ILiveBoardProps {
  gameId: string;
}

export interface IServerGame {
  author: string;
  board: IJeopardyBoard;
  title: string;
}

export interface IServerGameState {
  current: string;
}

export interface IServerMetadata {
  createInstant: Date;
}

export interface IServerBoard {
  jeopardyGame?: IServerGame;
  gameState?: IServerGameState;
  metadata: IServerMetadata;
  players?: Record<string, IPlayer>;
}

export function parseTsv(tsv: string): IJeopardyBoard {
  const board: IJeopardyBoard = {
    isDoubleJeopardy: false,
    categories: [],
  };

  tsv.split('\n').forEach((line, index) => {
    if (index !== 0) {
      const [category, prompt, answer, value, isDailyDouble] = line.split('\t');
      const newQuestion: IJeopardyQuestion = {
        prompt: prompt,
        answer: answer,
        value: Number.parseInt(value),
        isDailyDouble: isDailyDouble.includes('TRUE'),
        id: index.toString(),
      };

      const idx = board.categories.find((cat) => cat.title === category);
      if (!idx) {
        board.categories.push({
          title: category,
          questions: [newQuestion],
        });
      } else {
        idx.questions.push(newQuestion);
      }
    }
  });

  return board;
}
