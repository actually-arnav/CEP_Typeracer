import './App.css';
import Typing from './Typing.js';
import Typing2 from './Typing2.js';
import Typing3 from './Typing3.js';

// config to connect to firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBoFv8NLpdCrsMvYPbhlJXP4_NMMaFYm0U",
  authDomain: "typeracer-no-fail.firebaseapp.com",
  projectId: "typeracer-no-fail",
  storageBucket: "typeracer-no-fail.appspot.com",
  messagingSenderId: "1021740562247",
  appId: "1:1021740562247:web:699ac17a10f8b488c2fe62",
  measurementId: "G-J8Y0PTG2YS"
};

firebase.initializeApp({
  apiKey: "AIzaSyBoFv8NLpdCrsMvYPbhlJXP4_NMMaFYm0U",
  authDomain: "typeracer-no-fail.firebaseapp.com",
  projectId: "typeracer-no-fail",
  storageBucket: "typeracer-no-fail.appspot.com",
  messagingSenderId: "1021740562247",
  appId: "1:1021740562247:web:699ac17a10f8b488c2fe62",
  measurementId: "G-J8Y0PTG2YS"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


const app = initializeApp(firebaseConfig);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "#ffce47", borderRadius: '0' }}>
        {user ? (
          <div>
            <Typing3 />
            <div style={{ height: 50 }} />
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </header>
    </div>
  );
}


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="btn btn-primary btn-block" style={{ borderRadius: '15px' }} onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="btn btn-secondary btn-block" style={{ borderRadius: '15px' }} onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
