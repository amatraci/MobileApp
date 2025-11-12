import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCtLYj2PfVBxwZcJl4sARd0t-50ZKjDP5o",
  authDomain: "myapp-c51b6.firebaseapp.com",
  projectId: "myapp-c51b6",
  storageBucket: "myapp-c51b6.firebasestorage.app",
  messagingSenderId: "757453278185",
  appId: "1:757453278185:web:4dc37af9513a5370b2d978",
  measurementId: "G-N3ECG4LLS3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();

// Funksion ndihmës për login me GitHub
export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    console.log("Logged in with GitHub:", user);
    return user;
  } catch (error) {
    console.error("GitHub Login Error:", error);
  }
};

export default app;
