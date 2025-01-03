import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
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
    updateDoc,
    increment,
    orderBy,
    limit,
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
    return res.exists();
}

/**
 * Checks if a username exists in the Firestore database.
 * @param {string} StringUsername - The username to check.
 * @returns {string|null} - The UID of the user if the username exists, otherwise null.
 */
export async function existsUsername(StringUsername) {
    try {
        // Reference to the 'users' collection
        const listRef = collection(db, "users");

        // Create a query against the collection
        const q = query(listRef, where("username", "==", StringUsername));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Extract user data from the query results
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });

        // Return the UID of the first user found, or null if no users found
        return users.length > 0 ? users[0].uid : null;
    } catch (error) {
        console.error("Error checking username existence:", error);
        return null;
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
    await auth.signOut().then(() => {
        window.location.reload(false);
    });
}

////////////////////////////////////////////////////////////////////////
export async function addNewEmployer(employer) {
    try {
        const docRef = doc(collection(db, "employers")); // solo crear un doc sin nada
        employer.docId = docRef.id; // se obtiene el id del documento creado vacio
        const res = await setDoc(docRef, employer); // se setea el docuemnto los datos
        console.log("docRef", docRef);
        console.log("res", res);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function addNewProduct(product) {
    try {
        console.group("addNewProduct");
        // Add a new document with a generated id
        const docRef = doc(collection(db, "products"));
        console.log(docRef.id);
        product.docId = docRef.id;
        await setDoc(docRef, product);
        console.groupEnd();
    } catch (error) {
        console.log(error);
    }
}

export async function updatePlusStock(docId, cantidad) {
    const docRef = doc(db, "products", docId);
    await updateDoc(docRef, {
        cantidad: increment(cantidad),
    });
}

export async function updateStock(docId, currentStock, cantidad) {
    const docRef = doc(db, "products", docId);
    await updateDoc(docRef, { cantidad: currentStock - cantidad });
}

export async function saveAllList(day, userUID, empleadoUID, listOrden) {
    try {
        // grabar lista
        console.group("saveAllList");
        console.log("createdAt ", day);
        console.log("userUID", userUID);
        console.log("empleadoUID", empleadoUID);
        console.log("listOrden", listOrden);

        const list = {};
        /*  list.docId = docRef1.id; */
        list.createdAt = day;
        list.userUID = userUID;
        list.empleadoUID = empleadoUID;
        list.item = listOrden;

        const docRef1 = doc(collection(db, "listOrden"));
        list.docId = docRef1.id;
        await setDoc(docRef1, list);
        console.log("list", list);

        // grabar uid
        /*         const docRef2 = await addDoc(collection(db, "DetalleOrden"), {
                    createAt: day,
                    userUID: userUID,
                    empleadoUID: empleadoUID,
                    listOrdenUID: docRef1.id
                })
        
                console.log("docRef1.id: ", docRef1.id);
                console.log("docRef2.id: ", docRef2.id);
         */

        console.groupEnd();
    } catch (error) {
        console.log(error);
    }
}

export async function getNewOrden() {
    console.group("addNewOrden");
    try {
        const listEmployeers = await getEmployers();
        const listProducts = await getProducts();
        return { ref1: listEmployeers, ref2: listProducts };
    } catch (error) {
        console.log(error);
    }
    console.groupEnd();
}

export async function getEmployers() {
    try {
        const list = await getDocs(collection(db, "employers"));
        const employers = list.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
        }));

        return employers;
    } catch (error) {
        console.error(error);
    }
}

export async function getProducts() {
    try {
        const list = await getDocs(collection(db, "products"));
        const products = list.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
        }));
        return products;
    } catch (error) {
        console.error(error);
    }
}

export async function getAllDocList() {
    console.group("getAllDocList");

    try {
        const q = query(
            collection(db, "listOrden"),
            orderBy("createdAt", "desc"),
            limit(30)
        );
        const querySnapshot = await getDocs(q);
        const list = [];

        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });

        return list;
    } catch (error) {
        console.error(error);
    }
    console.groupEnd();
}

export async function getNameAdminFirebase(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const res = await getDoc(docRef);
        return res.data().displayName;
    } catch (error) {
        console.error(error);
    }
}

export async function getNameEmployerFirebase(uid) {
    try {
        const docRef = doc(db, "employers", uid);
        const res = await getDoc(docRef);
        return res.data().firstName;
    } catch (error) {
        console.error(error);
    }
}
