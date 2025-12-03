"use client";

import {FaRemoveFormat} from "react-icons/fa";
import {disableBuzzers} from "./apis";

interface IDisableBuzzersButtonProps {
  gameId: string;
}

export default function DisableBuzzersButton({
  gameId,
}: IDisableBuzzersButtonProps) {
  return (
    <button
      onClick={() => disableBuzzers(gameId)}
      type="button"
      className="btn-red"
    >
      <FaRemoveFormat />
    </button>
  );
}
