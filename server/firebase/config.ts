/** @format */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA7gc-jkCGncucaEU-Meys3gZiV4nlqhJ0",
    authDomain: "sadot-sanchez-developer-test.firebaseapp.com",
    projectId: "sadot-sanchez-developer-test",
    storageBucket: "sadot-sanchez-developer-test.appspot.com",
    messagingSenderId: "964261069634",
    appId: "1:964261069634:web:1f00edf8156310fe127edb",
};

const firebaseApp = initializeApp(firebaseConfig);

const firestoreDb = getFirestore(firebaseApp);

export { firestoreDb };
