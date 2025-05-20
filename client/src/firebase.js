import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  AUTH_LOGOUT,
  AUTH_SET_ID_TOKEN,
  AUTH_SET_LOADING,
  AUTH_SET_USER,
} from "./Store/actionTypes";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

function setupFirebaseAuthListener(store) {
  onAuthStateChanged(auth, async (user) => {
    store.dispatch({ type: AUTH_SET_LOADING, payload: true });

    if (user) {
      const token = await user.getIdToken();
      store.dispatch({ type: AUTH_SET_USER, payload: { ...user } });
      store.dispatch({ type: AUTH_SET_ID_TOKEN, payload: token });
    } else {
      store.dispatch({ type: AUTH_LOGOUT });
    }
    store.dispatch({ type: AUTH_SET_LOADING, payload: false });
  });
}
async function signOutUser() {
  return async (dispatch) => {
    dispatch({ type: AUTH_SET_LOADING, payload: true });
    try {
      await signOut(auth);
      dispatch({ type: AUTH_LOGOUT });
      console.log("User signed out.");
      //eslint-disable-next-line
    } catch (error) {
      // console.error("Error signing out:", error);
    } finally {
      dispatch({ type: AUTH_SET_LOADING, payload: false });
    }
  };
}
export {
  auth,
  provider,
  signInWithPopup,
  setupFirebaseAuthListener,
  signOutUser,
};
