import { db } from '@/app/config';
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  serverTimestamp,
  setDoc,
  updateDoc,
  increment,
  writeBatch,
  WriteBatch,
} from 'firebase/firestore';
import {
  IPlayer,
  IServerBoard,
  IJeopardyGame,
  IJeopardyBoard,
} from '@/app/trivia/Interfaces/Jeopardy';

export async function enableBuzzers(gameId: string) {
  await setDoc(
    doc(db, 'trivia', gameId, 'state', 'game'),
    {
      enableBuzzers: true,
      buzzerStartTime: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function enableBuzzersInBatch(gameId: string, batch: WriteBatch) {
  const gameRef = doc(db, 'trivia', gameId, 'state', 'game');
  batch.set(
    gameRef,
    {
      enableBuzzers: true,
      buzzerStartTime: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function disableBuzzers(gameId: string) {
  return await setDoc(
    doc(db, 'trivia', gameId, 'state', 'game'),
    {
      enableBuzzers: deleteField(),
    },
    { merge: true }
  );
}

export async function setBuzzedThisRound(gameId: string, name: string) {
  return await setDoc(
    doc(db, 'trivia', gameId, 'players', name),
    {
      buzzedThisRound: true,
    },
    { merge: true }
  );
}

export async function removeBuzzData(gameId: string, removeAll?: boolean) {
  const batch = writeBatch(db);

  batch.set(
    doc(db, 'trivia', gameId, 'state', 'game'),
    {
      buzzerStartTime: deleteField(),
      enableBuzzers: deleteField(),
    },
    { merge: true }
  );

  batch.delete(doc(db, 'trivia', gameId, 'state', 'buzzers'));

  await batch.commit();
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

export async function getPlayersList(gameId: string) {
  const players: IPlayer[] = [];
  const colRef = collection(db, 'trivia', gameId, 'players');
  const docs = await getDocs(colRef);
  docs.forEach((p) => players.push({ name: p.id, score: p.data().score, t: p.data().t }));

  return players;
}

export async function awardPointsInBatch(
  gameId: string,
  name: string,
  value: number,
  batch: WriteBatch
) {
  const playerRef = doc(db, 'trivia', gameId, 'players', name);
  batch.update(playerRef, { score: increment(value) });
}

export async function removeBuzzDataInBatch(gameId: string, removeAll: boolean, batch: WriteBatch) {
  const gameRef = doc(db, 'trivia', gameId, 'state', 'game');
  const playersRef = collection(db, 'trivia', gameId, 'players');

  batch.set(
    gameRef,
    { buzzerStartTime: deleteField(), enableBuzzers: deleteField() },
    { merge: true }
  );

  const snapshot = await getDocs(playersRef);

  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { t: deleteField() });
    if (removeAll) {
      batch.update(doc.ref, { buzzedThisRound: deleteField() });
    }
  });
}

export async function showBoardInBatch(gameId: string, batch: WriteBatch) {
  const gameRef = doc(db, 'trivia', gameId);
  const snap = await getDoc(gameRef);

  if (!snap.exists()) {
    console.error(`Couldn't find ${gameId}`);
    return;
  }

  const data = snap.data() as IServerBoard;
  const game = { ...(data.jeopardyGame as IJeopardyGame) };

  game.board.categories = game.board.categories?.map((cat) => ({
    ...cat,
    questions: cat.questions.map((q) => ({
      ...q,
      currentQuestion: false,
    })),
  }));

  await updateDoc(gameRef, {
    jeopardyGame: game,
  });
}

export async function awardPoints(gameId: string, name: string, value: number): Promise<void> {
  const playerRef = doc(db, 'trivia', gameId, 'players', name);
  const snap = await getDoc(playerRef);

  if (!snap.exists()) {
    console.error(`Couldn't find ${name}`);
    return;
  }

  await updateDoc(playerRef, {
    score: increment(value),
  });
}

export async function showBoard(gameId: string) {
  const gameRef = doc(db, 'trivia', gameId);
  const snap = await getDoc(gameRef);

  if (!snap.exists()) {
    console.error(`Couldn't find ${gameId}`);
    return;
  }

  const data = snap.data() as IServerBoard;
  const game = { ...(data.jeopardyGame as IJeopardyGame) };

  game.board.categories = game.board.categories?.map((cat) => ({
    ...cat,
    questions: cat.questions.map((q) => ({
      ...q,
      currentQuestion: false,
    })),
  }));

  await updateDoc(gameRef, {
    jeopardyGame: game,
  });
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

export async function deleteCollectionInBatch(path: string, batch: WriteBatch) {
  const colRef = collection(db, path);

  // 1. Get a page of documents
  const q = query(colRef);
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return;
  }

  // 2. Create a batch
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // 3. Commit the batch
}
