import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD-j3K5dpP60MiMIQNE13YlP1nta8sEvjE",
  authDomain: "unichat-3b8fa.firebaseapp.com",
  projectId: "unichat-3b8fa",
  storageBucket: "unichat-3b8fa.appspot.com",
  messagingSenderId: "496068313259",
  appId: "1:496068313259:web:53686c1b45f340259e37ee",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
