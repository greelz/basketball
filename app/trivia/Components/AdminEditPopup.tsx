import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {db} from "@/app/config";

interface IAdminEditPopupProps {
  name: string;
  gameId: string;
  closePopup: () => void;
  score?: number;
}

async function submitChanges(gameId: string, name: string, formData: FormData) {
  const score = Number(formData.get("score"));

  const playerRef = doc(db, "trivia", gameId, "players", name);
  const snap = await getDoc(playerRef);

  if (!snap.exists()) {
    console.error(`Couldn't find ${name}`);
    return;
  }

  updateDoc(playerRef, {
    score: score,
  });
}

async function deletePlayer(gameId: string, name: string) {
  const playerRef = doc(db, "trivia", gameId, "players", name);
  deleteDoc(playerRef);
}

export default function AdminEditPopup({
  name,
  score,
  gameId,
  closePopup,
}: IAdminEditPopupProps) {
  return (
    <form
      action={(formData) => {
        submitChanges(gameId, name, formData);
        closePopup();
      }}
      className="flex flex-col gap-6"
    >
      <div className="text-center">Editing {name}</div>
      <div className="grid gap-2 grid-cols-[1fr_minmax(0,_2fr)] p-10">
        <label htmlFor="score">Score: </label>
        <input
          className="border-1 border-slate-700 px-2 rounded-sm focus:outline-1 focus:outline-slate-700 focus:outline-offset-1"
          id="score"
          name="score"
          type="number"
          defaultValue={score}
        />
      </div>
      <div className="flex-1" />
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="text-xs p-1 hover:cursor-pointer hover:bg-purple-800 active:bg-purple-800 bg-purple-700 rounded-md"
          onClick={() => {
            deletePlayer(gameId, name);
            closePopup();
          }}
        >
          Delete
        </button>
        <button
          type="submit"
          className="hover:cursor-pointer hover:bg-green-800 active:bg-green-900 px-4 py-2 bg-green-700 rounded-md"
        >
          Submit
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-800 hover:cursor-pointer hover:bg-red-900 rounded-md"
          onClick={closePopup}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
