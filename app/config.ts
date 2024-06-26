import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

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
} catch (e) {
  console.error(`Error initializing Firebase ${e}`);
}

export { db };
