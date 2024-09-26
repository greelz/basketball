import React from "react";

interface Prop {
  player: string;
  t: { id: string; name: string };
  incrementStat: (p: string, t: string, val: number) => void;
}
export default function StatIncrementButton({
  player,
  t,
  incrementStat,
}: Prop) {
  const disabled = player === "";
  return (
    <button
      key={t.id}
      className={`bggraygrad ${disabled ? "!bg-slate-300" : ""} btn`}
      type="button"
      disabled={player === ""}
      onClick={() => {
        incrementStat(player, t.id, 1);
      }}
    >
      {t.name}
    </button>
  );
}
