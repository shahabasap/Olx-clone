// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCopyHkJuyrL0hfW3R-dJGEifg1NY621Vg",
  authDomain: "olx-clone-2-225a4.firebaseapp.com",
  projectId: "olx-clone-2-225a4",
  storageBucket: "olx-clone-2-225a4.appspot.com",
  messagingSenderId: "261899634092",
  appId: "1:261899634092:web:dbd5c6e168012805a2e609",
  measurementId: "G-0P1TNXTT5B"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); 
const storage = getStorage(firebaseApp);

export { auth, db, storage };
