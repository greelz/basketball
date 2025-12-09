'use client';

import { db } from '@/app/config';
import { doc, setDoc } from 'firebase/firestore';
import { useCallback, useRef, useState, useEffect } from 'react';
import { IoMdRadioButtonOff } from 'react-icons/io';
import { useBuzzersEnabled, usePlayer, usePlayerBuzzerData } from './hooks';

interface IBuzzerProps {
  player: string;
  gameId: string;
}

export default function Buzzer({ player, gameId }: IBuzzerProps) {
  const [isBuzzing, setIsBuzzing] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const playerData = usePlayer(gameId, player, db);
  const buzzerEnabled = useBuzzersEnabled(gameId, db);
  const buzzerData = usePlayerBuzzerData(gameId, player, db);

  const hasBuzzedAlready = buzzerData !== undefined;
  const cooldownTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const buzzEnabledLocalDate = useRef<Date | undefined>(undefined);

  // On/off switch for the buzzerEnabled hook
  useEffect(() => {
    if (buzzerEnabled) {
      if (!buzzEnabledLocalDate.current) {
        buzzEnabledLocalDate.current = new Date();
      }
    } else {
      // This block will run on every remount
      buzzEnabledLocalDate.current = undefined;
    }
  }, [buzzerEnabled]);

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

    if (!buzzEnabledLocalDate.current) return; // They never got an enabled timestamp, quit

    setIsBuzzing(true);
    // Just immediately submit the player's time based on an offset of buzzEnabledLocalDate

    const diff = Date.now() - buzzEnabledLocalDate.current!.getTime();

    setDoc(
      doc(db, 'trivia', gameId, 'state', 'buzzers'),
      {
        [player]: diff,
      },
      { merge: true }
    );

    setTimeout(() => setIsBuzzing(false), 5000);
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
