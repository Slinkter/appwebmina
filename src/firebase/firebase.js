import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    setDoc,
    deleteDoc,
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    getBytes,
} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// funciones a exportar de manera asincrona

export async function userExistes(uid) {
    //buscar un documento
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    console.log("res", res);
    return res.exists();
}

export async function existsUsername(StringUsername) {
    try {
        //buscar en varios documento
        const users = [];
        const docsRef = collection(db, "users");
        const q = query(docsRef, where("username", "==", StringUsername));
        const querySnapShot = await getDocs();
        querySnapShot.forEach((doc) => {
            users.push(doc.data());
        });

        // retorna un booleando
        return users.length > 0 ? users[0].uid : null;
    } catch (error) {
        console.log(error);
    }
}

export async function registerNewUser(user) {
    try {
        // definir el lugar
        const collectionRef = collection(db, "users");
        // usamos setDoc  y no addDoc
        const docRef = doc(collectionRef, user.uid);
        // registramos al usuario
        await setDoc(docRef, user);
    } catch (error) {
        console.log(error);
    }
}
export async function updateUser(user) {
    try {
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    } catch (error) {
        console.log(error);
    }
}

export async function getUserInfo(uid) {
    try {
        //obtener un documento
        const docRef = doc(db, "users", uid);
        const documento = await getDoc(docRef);
        return documento.data();
    } catch (error) {
        console.log(error);
    }
}
