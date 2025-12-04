"use client";

import {
  collection,
  doc,
  Firestore,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  IJeopardyBoard,
  IPlayer,
  IServerBoard,
} from "@/app/trivia/Interfaces/Jeopardy";

export function useBoard(gameId: string, db: Firestore) {
  const [board, setBoard] = useState<IJeopardyBoard | null>();

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, "trivia", gameId),
      (doc) => {
        if (doc.exists()) {
          const data: IServerBoard = doc.data() as IServerBoard;
          setBoard(data.jeopardyGame?.board);
        } else {
          setBoard(null);
        }
      },
      (e) => console.error(e)
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return board;
}

export function usePlayerList(gameId: string, db: Firestore) {
  const [players, setPlayers] = useState<IPlayer[]>();

  useEffect(() => {
    const colRef = collection(db, "trivia", gameId, "players");
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
    const realtime = onSnapshot(
      doc(db, "trivia", gameId, "players", name),
      (doc) => {
        const data = doc.data();
        setPlayer({
          name: doc.id,
          score: data?.score,
          t: data?.t,
        });
      }
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, name]);

  return player;
}

export function useHasBuzzed(gameId: string, db: Firestore, player: string) {
  const [hasBuzzed, setHasBuzzed] = useState(false);

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, "trivia", gameId, "players", player),
      (doc) => {
        setHasBuzzed(doc.data()?.t != null);
      }
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db, player]);

  return hasBuzzed;
}

export function useBuzzerStartTime(gameId: string, db: Firestore) {
  const [time, setTime] = useState<Timestamp>();

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, "trivia", gameId, "state", "game"),
      (doc) => {
        setTime(doc.data()?.buzzerStartTime);
      }
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return time;
}

export function useBuzzersEnabled(gameId: string, db: Firestore) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const realtime = onSnapshot(
      doc(db, "trivia", gameId, "state", "game"),
      (doc) => {
        setEnabled(doc.data()?.enableBuzzers);
      }
    );

    // Unsubscribe at the end
    return () => realtime();
  }, [gameId, db]);

  return enabled;
}
