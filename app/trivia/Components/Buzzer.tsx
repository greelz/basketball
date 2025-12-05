'use client';

import { db } from '@/app/config';
import { doc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { useCallback, useRef, useState } from 'react';
import { IoMdRadioButtonOff } from 'react-icons/io';
import { useBuzzersEnabled, usePlayer } from './hooks';

interface IBuzzerProps {
  player: string;
  gameId: string;
}

export default function Buzzer({ player, gameId }: IBuzzerProps) {
  const [isBuzzing, setIsBuzzing] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const playerData = usePlayer(gameId, player, db);
  const buzzerEnabled = useBuzzersEnabled(gameId, db);

  const hasBuzzedAlready = playerData?.buzzedThisRound === true;
  const cooldownTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const enabled = !hasBuzzedAlready && !isBuzzing && buzzerEnabled && !isCoolingDown;

  const buzzIn = useCallback(async () => {
    // If the user clicks when the buzzer isn't enabled, give a .5s cooldown
    if (!enabled) {
      setIsCoolingDown(true);
      clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => {
        setIsCoolingDown(false);
        cooldownTimer.current = undefined;
      }, 500);
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
      <div className="absolute end-px top-px">
        {playerData?.score ? `\$${playerData.score}` : null}
      </div>
      <IoMdRadioButtonOff color="white" size={'20%'} />
      {(hasBuzzedAlready || isBuzzing) && <div className="text-xs">You buzzed!</div>}
    </div>
  );
}
