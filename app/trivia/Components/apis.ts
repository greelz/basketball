import { db } from "@/app/config";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  increment,
  writeBatch,
  Firestore,
} from "firebase/firestore";
import { IPlayer } from "@/app/trivia/Interfaces/Jeopardy";

export async function enableBuzzers(gameId: string) {
  await setDoc(
    doc(db, "trivia", gameId, "state", "game"),
    {
      enableBuzzers: true,
      buzzerStartTime: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function disableBuzzers(gameId: string) {
  return await setDoc(
    doc(db, "trivia", gameId, "state", "game"),
    {
      enableBuzzers: deleteField(),
    },
    { merge: true }
  );
}

export async function removeBuzzData(gameId: string) {
  setDoc(
    doc(db, "trivia", gameId, "state", "game"),
    {
      buzzerStartTime: deleteField(),
      enableBuzzers: deleteField(),
    },
    { merge: true }
  );
  const colRef = collection(db, "trivia", gameId, "players");
  const snapshot = await getDocs(colRef);

  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { t: deleteField() });
  });

  await batch.commit();
}

export async function tryAddPlayer(
  gameId: string,
  name: string
): Promise<string | undefined> {
  if (name.length === 0) return undefined;

  const nameForDb = name.replace(/[^A-Za-z0-9._~-]+/g, "");

  // If the gameId doesn't exist, return an error.
  const gameRef = doc(db, "trivia", gameId);
  if (!(await getDoc(gameRef)).exists()) return undefined;

  const nameRef = doc(db, "trivia", gameId, "players", nameForDb);

  await setDoc(nameRef, {}, { merge: true });
  return nameForDb;
}

export async function tryAddPlayerFormData(
  gameId: string,
  name: FormData
): Promise<string | undefined> {
  const str = name.get("Name")?.toString() ?? "";
  return tryAddPlayer(gameId, str);
}

export async function getPlayersList(gameId: string) {
  const players: IPlayer[] = [];
  const colRef = collection(db, "trivia", gameId, "players");
  const docs = await getDocs(colRef);
  docs.forEach((p) =>
    players.push({ name: p.id, score: p.data().score, t: p.data().t })
  );

  return players;
}

export async function awardPoints(
  gameId: string,
  name: string,
  value: number
): Promise<void> {
  const playerRef = doc(db, "trivia", gameId, "players", name);
  const snap = await getDoc(playerRef);

  if (!snap.exists()) {
    console.error(`Couldn't find ${name}`);
    return;
  }

  await updateDoc(playerRef, {
    score: increment(value),
  });
}
