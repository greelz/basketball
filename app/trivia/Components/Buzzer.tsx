'use client';

import { db } from '@/app/config';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdRadioButtonOff } from 'react-icons/io';
import { useHasBuzzed } from './hooks';

interface IBuzzerProps {
  player: string;
  gameId: string;
}

export default function Buzzer({ player, gameId }: IBuzzerProps) {
  const [isBuzzing, setIsBuzzing] = useState(false);
  const hasBuzzedAlready = useHasBuzzed(gameId, db, player);
  const [buzzerEnabled, setBuzzerEnabled] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const cooldownTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  // Buzzers enabled useEffect
  useEffect(() => {
    const gameRef = doc(db, 'trivia', gameId, 'state', 'game'); // assumes enableBuzzers is here

    const unsubscribe = onSnapshot(gameRef, (snap) => {
      if (!snap.exists()) {
        setBuzzerEnabled(false);
        return;
      }

      setBuzzerEnabled(snap.data().enableBuzzers === true);
    });

    return () => {
      unsubscribe();
      if (cooldownTimer.current) {
        clearTimeout(cooldownTimer.current);
      }
    };
  }, [gameId]);

  const enabled = !hasBuzzedAlready && !isBuzzing && buzzerEnabled && !isCoolingDown;

  const buzzIn = useCallback(async () => {
    // If the user clicks when the buzzer isn't enabled, give a .5s cooldown
    if (!enabled) {
      setIsCoolingDown(true);
      clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => {
        setIsCoolingDown(false);
        cooldownTimer.current = undefined;
      }, 1000);
      return;
    }

    setIsBuzzing(true);
    try {
      await runTransaction(db, async (tx) => {
        const ref = doc(db, 'trivia', gameId, 'players', player);
        const snap = await tx.get(ref);
        const tValInDb = snap.data()?.t;

        if (!tValInDb) {
          tx.set(ref, { t: serverTimestamp() }, { merge: true });
        }
      });
    } finally {
      // After 5 seconds, reset is buzzing
      setTimeout(() => setIsBuzzing(false), 5000);
    }
  }, [player, enabled, gameId]);

  return (
    <div
      onClick={buzzIn}
      className={`flex flex-col h-full justify-center items-center ${
        enabled ? 'bg-green-400' : 'bg-red-900'
      }`}
    >
      <IoMdRadioButtonOff color="white" size={'20%'} />
      {(hasBuzzedAlready || isBuzzing) && <div className="text-xs">You buzzed!</div>}
    </div>
  );
}
