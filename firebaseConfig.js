import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD01hxf-47ayGgoqK-OvYDTc6v7wdq4JXE",
  authDomain: "tasteful-app.firebaseapp.com",
  projectId: "tasteful-app",
  storageBucket: "tasteful-app.firebasestorage.app",
  messagingSenderId: "656047588105",
  appId: "1:656047588105:web:8d20fb85a7ef895727c9d8",
  databaseURL: "https://tasteful-app-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };