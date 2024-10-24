import { initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "basketball-c4795.firebaseapp.com",
  projectId: "basketball-c4795",
  storageBucket: "basketball-c4795.appspot.com",
  messagingSenderId: "297250367051",
  appId: "1:297250367051:web:08c7533822b3fcf723cfce",
  measurementId: "G-0DM5FRK907",
};

let app, db: Firestore;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  if (process.env.NODE_ENV === "development") {
    connectFirestoreEmulator(db, "localhost", 8080); // 8080 is the default port for the Firestore emulator
  }
} catch (e) {
  console.error(`Error initializing Firebase ${e}`);
}

export { db };
