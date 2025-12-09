import { db } from '@/app/config';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  serverTimestamp,
  setDoc,
  increment,
  writeBatch,
  WriteBatch,
} from 'firebase/firestore';
import { IPlayer, IJeopardyBoard } from '@/app/trivia/Interfaces/Jeopardy';

export function enableBuzzers(gameId: string, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  b.set(
    doc(db, 'trivia', gameId, 'state', 'game'),
    {
      enableBuzzers: true,
      buzzerStartTime: serverTimestamp(),
    },
    { merge: true }
  );

  return b;
}

export function disableBuzzers(gameId: string, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  b.set(
    doc(db, 'trivia', gameId, 'state', 'game'),
    {
      enableBuzzers: deleteField(),
    },
    { merge: true }
  );

  return b;
}

export function setBuzzedThisRound(gameId: string, name: string, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  b.set(
    doc(db, 'trivia', gameId, 'state', 'currentQuestion'),
    {
      buzzedThisRound: arrayUnion(name),
    },
    { merge: true }
  );

  return b;
}

export function removeBuzzData(gameId: string, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  b.set(
    doc(db, 'trivia', gameId, 'state', 'game'),
    {
      buzzerStartTime: deleteField(),
      enableBuzzers: deleteField(),
    },
    { merge: true }
  );

  b.delete(doc(db, 'trivia', gameId, 'state', 'buzzers'));

  return b;
}

export async function tryAddPlayer(gameId: string, name: string): Promise<string | undefined> {
  if (name.length === 0) return undefined;

  const nameForDb = name.replace(/[^A-Za-z0-9._~-]+/g, '');

  if (name === 'host') return;

  // If the gameId doesn't exist, return an error.
  const gameRef = doc(db, 'trivia', gameId);
  if (!(await getDoc(gameRef)).exists()) return undefined;

  const nameRef = doc(db, 'trivia', gameId, 'players', nameForDb);

  await setDoc(nameRef, {}, { merge: true });
  return nameForDb;
}

export async function tryAddPlayerFormData(
  gameId: string,
  name: FormData
): Promise<string | undefined> {
  const str = name.get('Name')?.toString() ?? '';
  return tryAddPlayer(gameId, str);
}

export function awardPoints(gameId: string, name: string, value: number, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  const playerRef = doc(db, 'trivia', gameId, 'players', name);
  b.update(playerRef, { score: increment(value) });

  return b;
}

export function showQuestion(gameId: string, questionId: string, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  b.set(
    doc(db, 'trivia', gameId, 'state', 'currentQuestion'),
    {
      id: questionId,
    },
    { merge: true }
  );

  b.set(
    doc(db, 'trivia', gameId, 'state', 'hiddenQuestions'),
    {
      questions: arrayUnion(questionId),
    },
    { merge: true }
  );

  return b;
}

export function hideQuestion(gameId: string, questionId?: string, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  b.delete(doc(db, 'trivia', gameId, 'state', 'currentQuestion'));

  if (questionId !== undefined) {
    b.update(doc(db, 'trivia', gameId, 'state', 'hiddenQuestions'), {
      questions: arrayRemove(questionId),
    });
  }

  return b;
}

export function showBoard(gameId: string, batch?: WriteBatch) {
  const b = batch ?? writeBatch(db);

  removeBuzzData(gameId, b);
  hideQuestion(gameId, undefined, b);

  return b;
}

// ****************** GET ********************

export async function getBoard(gameId: string) {
  const gameRef = doc(db, 'trivia', gameId);
  const snap = await getDoc(gameRef);

  if (!snap.exists()) {
    console.error(`Couldn't find ${gameId}`);
    return;
  }

  return snap.data()?.jeopardyGame?.board as IJeopardyBoard;
}

export async function getPlayersList(gameId: string) {
  const players: IPlayer[] = [];
  const colRef = collection(db, 'trivia', gameId, 'players');
  const docs = await getDocs(colRef);
  docs.forEach((p) => players.push({ name: p.id, score: p.data().score, t: p.data().t }));

  return players;
}

export async function deleteCollection(path: string, batchSize = 50) {
  const colRef = collection(db, path);

  while (true) {
    // 1. Get a page of documents
    const q = query(colRef, limit(batchSize));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('Done deleting collection:', path);
      return;
    }

    // 2. Create a batch
    const batch = writeBatch(db);

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // 3. Commit the batch
    await batch.commit();
  }
}
