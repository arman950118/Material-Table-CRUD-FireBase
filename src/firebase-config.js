import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyANW-kRVd7FyQIoFuQNrZuJX3PpXovqebo",
  authDomain: "currency-project-b1add.firebaseapp.com",
  projectId: "currency-project-b1add",
  storageBucket: "currency-project-b1add.appspot.com",
  messagingSenderId: "757791050327",
  appId: "1:757791050327:web:c035c81d4866f85bca7112",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
