"use client";

import {db} from "@/app/config";
import {disableBuzzers, enableBuzzers} from "./apis";
import {useBuzzersEnabled} from "./hooks";
import {MdOutlinePhoneEnabled, MdPhoneEnabled} from "react-icons/md";

interface IEnableBuzzersButtonProps {
  gameId: string;
}

export default function EnableBuzzersButton({
  gameId,
}: IEnableBuzzersButtonProps) {
  const buzzersEnabled = useBuzzersEnabled(gameId, db);
  return (
    <button
      onClick={() => {
        if (buzzersEnabled) disableBuzzers(gameId);
        else enableBuzzers(gameId);
      }}

      type="button"
      className={`!m-0 ${buzzersEnabled ? 'btn-red' : 'btn-green'}`}
    >
      {buzzersEnabled ? <MdPhoneEnabled /> : <MdOutlinePhoneEnabled />}
    </button>
  );
}
