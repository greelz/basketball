'use client';

import {
  collection,
  doc,
  DocumentData,
  Firestore,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  IJeopardyBoard,
  IPlayer,
  IServerBoard,
  IJeopardyQuestion,
} from '@/app/trivia/Interfaces/Jeopardy';

export function useBoard(gameId: string, db: Firestore) {
  const [board, setBoard] = useState<IJeopardyBoard>();

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, 'trivia', gameId),
      (doc) => {
        if (doc.exists()) {
          const data: IServerBoard = doc.data() as IServerBoard;
          setBoard(data.jeopardyGame?.board);
        } else {
          setBoard(undefined);
        }
      },
      (e) => console.error(e)
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return board;
}

export function useHiddenQuestions(gameId: string, db: Firestore) {
  const [hiddenQuestions, setHiddenQuestions] = useState<string[] | undefined>();

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, 'trivia', gameId, 'state', 'hiddenQuestions'),
      (doc) => {
        if (doc.exists()) {
          setHiddenQuestions(doc.data().questions);
        } else {
          setHiddenQuestions(undefined);
        }
      },
      (e) => console.error(e)
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return hiddenQuestions;
}

export function useCurrentQuestionBuzzers(gameId: string, db: Firestore) {
  const [buzzedThisRound, setBuzzedThisRound] = useState<string[] | undefined>();

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, 'trivia', gameId, 'state', 'currentQuestion'),
      (doc) => {
        if (doc.exists()) {
          setBuzzedThisRound(doc.data().buzzedThisRound);
        } else {
          setBuzzedThisRound(undefined);
        }
      },
      (e) => console.error(e)
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return buzzedThisRound;
}

export function useCurrentQuestionId(gameId: string, db: Firestore) {
  const [questionId, setQuestionId] = useState<string | undefined>();

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, 'trivia', gameId, 'state', 'currentQuestion'),
      (doc) => {
        if (doc.exists()) {
          setQuestionId(doc.data().id);
        } else {
          setQuestionId(undefined);
        }
      },
      (e) => console.error(e)
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return questionId;
}

export function usePlayerList(gameId: string, db: Firestore) {
  const [players, setPlayers] = useState<IPlayer[]>();

  useEffect(() => {
    const colRef = collection(db, 'trivia', gameId, 'players');
    const realtime = onSnapshot(
      colRef,
      (snap) => {
        const temp: IPlayer[] = [];
        snap.forEach((q) => {
          const d = q.data();
          temp.push({
            name: q.id,
            score: d.score,
            t: d.t,
          });
        });
        setPlayers(temp);
      },
      (e) => console.error(e)
    );

    // Unsubscribe at the end
    return () => {
      realtime();
    };
  }, [gameId, db]);

  return players;
}

export function usePlayer(gameId: string, name: string, db: Firestore) {
  const [player, setPlayer] = useState<IPlayer | undefined>(undefined);

  useEffect(() => {
    const realtime = onSnapshot(doc(db, 'trivia', gameId, 'players', name), (doc) => {
      const data = doc.data();
      setPlayer({
        name: doc.id,
        ...data,
      });
    });

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, name]);

  return player;
}

interface IPlayerBuzz {
  name: string;
  ms: number;
}

export function useBuzzData(gameId: string, db: Firestore) {
  const [buzzData, setBuzzData] = useState<IPlayerBuzz[]>();

  useEffect(() => {
    const realtime = onSnapshot(doc(db, 'trivia', gameId, 'state', 'buzzers'), (doc) => {
      const d: IPlayerBuzz[] = [];
      const data = doc.data();
      if (!data) {
        setBuzzData(undefined);
        return;
      }

      Object.keys(data).forEach((player) => {
        d.push({ name: player, ms: data[player] });
      });

      setBuzzData(d);
    });

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId]);

  return buzzData;
}

export function usePlayerBuzzerData(gameId: string, name: string, db: Firestore) {
  const [buzzTime, setBuzzTime] = useState<number>();

  useEffect(() => {
    const realtime = onSnapshot(doc(db, 'trivia', gameId, 'state', 'buzzers'), (doc) => {
      const data = doc.data();
      setBuzzTime(data ? data[name] : undefined);
    });

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, name]);

  return buzzTime;
}

export function useHasBuzzed(gameId: string, db: Firestore, player: string) {
  const [hasBuzzed, setHasBuzzed] = useState(false);

  useEffect(() => {
    const realtime = onSnapshot(doc(db, 'trivia', gameId, 'players', player), (doc) => {
      const data = doc.data();
      setHasBuzzed(data?.buzzedThisRound === true);
    });

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db, player]);

  return hasBuzzed;
}

export function useBuzzerStartTime(gameId: string, db: Firestore) {
  const [time, setTime] = useState<Timestamp>();

  useEffect(() => {
    const realtime = onSnapshot(doc(db, 'trivia', gameId, 'state', 'game'), (doc) => {
      setTime(doc.data()?.buzzerStartTime);
    });

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return time;
}

export function useBuzzersEnabled(gameId: string, db: Firestore) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const realtime = onSnapshot(doc(db, 'trivia', gameId, 'state', 'game'), (doc) => {
      setEnabled(doc.data()?.enableBuzzers);
    });

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return enabled;
}
