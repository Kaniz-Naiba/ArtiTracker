
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAsVwUf5zW8f_HsqFuOCrcKbg2E5vlYP9E",
  authDomain: "artifacts-tracker-e9e05.firebaseapp.com",
  projectId: "artifacts-tracker-e9e05",
storageBucket: "artifacts-tracker-e9e05.appspot.com",
  messagingSenderId: "1004290037381",
  appId: "1:1004290037381:web:cd6d7559abd7b58cd9bbec",
  measurementId: "G-541HFD4LW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;