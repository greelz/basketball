import {db} from "@/app/config";
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
} from "firebase/firestore";

export async function enableBuzzers(gameId: string) {
  await setDoc(
    doc(db, "trivia", gameId, "state", "game"),
    {
      enableBuzzers: true,
      buzzerStartTime: serverTimestamp(),
    },
    {merge: true}
  );
}

export async function disableBuzzers(gameId: string) {
  return await setDoc(
    doc(db, "trivia", gameId, "state", "game"),
    {
      enableBuzzers: deleteField(),
    },
    {merge: true}
  );
}

export async function removeBuzzData(gameId: string) {
  setDoc(doc(db, 'trivia', gameId, 'state', 'game'), {
    buzzerStartTime: deleteField(),
    enableBuzzers: deleteField(),
  }, {merge: true});
  const colRef = collection(db, "trivia", gameId, "players");
  const snapshot = await getDocs(colRef);

  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {t: deleteField()});
  });

  await batch.commit();
}

export async function tryAddPlayer(gameId: string, name: string): Promise<boolean> {
  if (name.length === 0) return false;

  const nameForDb = name.replace(/[^A-Za-z0-9._~-]+/g, "")
  const gameRef = doc(db, "trivia", gameId, "players", nameForDb);

  if ((await getDoc(gameRef)).exists()) return false;
  await setDoc(gameRef, {}, {merge: true});
  return true;
}

export async function tryAddPlayerFormData(gameId: string, name: FormData): Promise<void> {
  const str = name.get("Name")?.toString() ?? "";
  tryAddPlayer(gameId, str);
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
