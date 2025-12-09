'use client';
import { MdPhoneEnabled } from 'react-icons/md';
import { removeBuzzData } from './apis';

interface IDeleteBuzzDataButtonProps {
  gameId: string;
}

export default function DeleteBuzzDataButton({ gameId }: IDeleteBuzzDataButtonProps) {
  return (
    <button
      onClick={async () => await removeBuzzData(gameId).commit()}
      type="button"
      className="btn-red flex items-center gap-1"
      title="Remove all buzz data"
    >
      Clear <MdPhoneEnabled />
    </button>
  );
}
