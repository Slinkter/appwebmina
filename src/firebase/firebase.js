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
// seguridad
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
export const db = getFirestore(app); // texto
export const storage = getStorage(app); // archivos -imagenes

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
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            users.push(doc.data());
        });

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

export async function insertNewLink(link) {
    try {
        // usamos addDoc para generar automaticamente una id ,
        const docRef = collection(db, "links");
        const res = await addDoc(docRef, link);
        console.log(docRef);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getLinks(uid) {
    const links = [];

    try {
        // bloque que buscar en la collecion de links todo que
        // pertenescan al usuario con su uid
        // se obtiene los documentos y se traen al nivel local
        // a los documentos se agrega/setea el nuevo campo docId
        // se carga a la web con useState
        const collectionRef = collection(db, "links");
        const q = query(collectionRef, where("uid", "==", uid));
        const querySnapShot = await getDocs(q);
        // se inserto/agrego un campo mas al docID
        querySnapShot.forEach((doc) => {
            const link = { ...doc.data() };
            link.docId = doc.id;
            links.push(link);
        });

        return links;
    } catch (error) {
        console.error(error);
    }
}

export async function updateLink(docId, link) {
    try {
        const docRef = doc(db, "links", docId);
        const res = await setDoc(docRef, link);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function delenteLink(docId) {
    try {
        const docRef = doc(db, "links", docId);
        const res = await deleteDoc(docRef);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function setUserProfilePhoto(uid, file) {
    try {
        // db_storage
        // funciona como un link
        // el archivo(imagen,audio,video)
        const imageRef = ref(storage, `images/${uid}`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}

export async function getProfilePhotoUrl(path) {
    //
    try {
        const imageRef = ref(storage, path);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserPublicProfileInfo(uid) {
    try {
        const profileInfo = await getUserInfo(uid);
        const linksInfo = await getLinks(uid);
        return { profileInfo: profileInfo, linksInfo: linksInfo };
    } catch (error) {
        console.log(error);
    }
}

export async function logout() {
    await auth.signOut();
}

////////////////////////////////////////////////////////////////////////
export async function addNewEmployer(employer) {
    try {
        console.group("addNewEmployer");
        const colleRef = collection(db, "employers");
        const res = await addDoc(colleRef, employer);
        //
        console.log(colleRef);
        console.log(res);
        console.groupEnd();
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function addNewProduct(product) {
    try {
        console.group("addNewProduct");
        const docRef = collection(db, "products");
        const res = await addDoc(docRef, product);
        console.log(docRef);
        console.log(res);
        console.groupEnd();
        return res;
    } catch (error) {
        console.log(error);
    }
}
