/** @format */

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    setDoc,
    collectionGroup,
    Timestamp,
} from "firebase/firestore";
import { firestoreDb } from "~~/server/firebase/config";

const queryByCollection = async (col: string) => {
    const colRef = collection(firestoreDb, col);

    const snapshot = await getDocs(colRef);

    const docs = Array.from(snapshot.docs).map((doc) => {
        return { ...doc.data(), id: doc.id };
    });

    return docs;
};

const set = async (col: string, document: any) => {
    const docRef = doc(firestoreDb, col, document.id);
    return await setDoc(docRef, document);
};

const add = async (col: string, document: Object) => {
    const colRef = collection(firestoreDb, col);

    const docRef = await addDoc(colRef, document);

    return docRef;
};

const del = async (col: string, id: string) => {
    const docRef = doc(firestoreDb, col, id);
    return await deleteDoc(docRef);
};

const get = async (col: string, id: string) => {
    const docRef = doc(firestoreDb, col, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
    } else {
        return null;
    }
};

export { queryByCollection, set, add, del, get };
