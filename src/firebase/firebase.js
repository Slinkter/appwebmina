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
    onSnapshot,
    writeBatch,
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

/**
 * Verifica si un usuario existe en la base de datos.
 * @param {string} uid - El UID del usuario a verificar.
 * @returns {Promise<boolean>} - Devuelve true si el usuario existe, de lo contrario false.
 */
export async function userExistes(uid) {
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    return res.exists();
}

/**
 * Verifica si un nombre de usuario ya existe en la base de datos.
 * @param {string} StringUsername - El nombre de usuario a verificar.
 * @returns {Promise<string|null>} - El UID del usuario si el nombre de usuario existe, de lo contrario null.
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

/**
 * Registra un nuevo usuario en la colección "users".
 * @param {object} user - El objeto de usuario que contiene el UID y otros datos.
 */
export async function registerNewUser(user) {
    try {
        const collectionRef = collection(db, "users");
        // Se usa setDoc para usar el UID de autenticación como ID del documento.
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    } catch (error) {
        console.log(error);
    }
}
export async function updateUser(user) {
    try {
        /**
         * Actualiza la información de un usuario en la colección "users".
         * @param {object} user - El objeto de usuario con los datos actualizados.
         */
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Obtiene la información de un usuario de la colección "users".
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<object|undefined>} - Los datos del usuario o undefined si no se encuentra.
 */
export async function getUserInfo(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const documento = await getDoc(docRef);
        return documento.data();
    } catch (error) {
        console.log(error);
    }
}

/**
 * Inserta un nuevo enlace en la colección "links".
 * Firestore generará un ID de documento automáticamente.
 * @param {object} link - El objeto de enlace a insertar.
 * @returns {Promise<import("firebase/firestore").DocumentReference>} - Una referencia al documento recién creado.
 */
export async function insertNewLink(link) {
    try {
        const docRef = collection(db, "links");
        const res = await addDoc(docRef, link);
        console.log(docRef);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Obtiene todos los enlaces de un usuario específico.
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<Array<object>>} - Un array de objetos de enlace, cada uno con su docId.
 */
export async function getLinks(uid) {
    const links = [];

    try {
        const collectionRef = collection(db, "links");
        const q = query(collectionRef, where("uid", "==", uid));
        const querySnapShot = await getDocs(q);
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

/**
 * Actualiza un enlace existente en la colección "links".
 * @param {string} docId - El ID del documento del enlace a actualizar.
 * @param {object} link - El objeto con los nuevos datos del enlace.
 */
export async function updateLink(docId, link) {
    try {
        const docRef = doc(db, "links", docId);
        await setDoc(docRef, link);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Elimina un enlace de la colección "links".
 * @param {string} docId - El ID del documento del enlace a eliminar.
 */
export async function deleteLink(docId) {
    try {
        const docRef = doc(db, "links", docId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Sube la foto de perfil de un usuario a Firebase Storage.
 * @param {string} uid - El UID del usuario para nombrar el archivo.
 * @param {File} file - El archivo de imagen a subir.
 * @returns {Promise<import("firebase/storage").UploadResult>} - El resultado de la subida.
 */
export async function setUserProfilePhoto(uid, file) {
    try {
        const imageRef = ref(storage, `images/${uid}`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Obtiene la URL de descarga de una foto de perfil desde Firebase Storage.
 * @param {string} path - La ruta del archivo en Storage (ej. "images/uid").
 * @returns {Promise<string>} - La URL de descarga del archivo.
 */
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

/**
 * Obtiene el perfil público de un usuario, incluyendo su información y enlaces.
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<{profileInfo: object, linksInfo: Array<object>}>} - Un objeto con la información del perfil y los enlaces.
 */
export async function getUserPublicProfileInfo(uid) {
    try {
        const profileInfo = await getUserInfo(uid);
        const linksInfo = await getLinks(uid);
        return { profileInfo: profileInfo, linksInfo: linksInfo };
    } catch (error) {
        console.log(error);
    }
}

/**
 * Cierra la sesión del usuario actual y recarga la página.
 */
export async function logout() {
    await auth.signOut().then(() => {
        window.location.reload(false);
    });
}

////////////////////////////////////////////////////////////////////////

/**
 * Añade un nuevo empleado a la colección "employers".
 * @param {object} employer - El objeto del empleado a añadir.
 */
export async function addNewEmployer(employer) {
    try {
        // Crea una referencia de documento con un ID autogenerado.
        const docRef = doc(collection(db, "employers"));
        // Asigna el ID autogenerado al objeto del empleado.
        employer.docId = docRef.id;
        // Guarda el empleado en la base de datos.
        await setDoc(docRef, employer);
    } catch (error) {
        console.error(error);
    }
}
/**
 * Añade un nuevo producto a la colección "products".
 * @param {object} product - El objeto del producto a añadir.
 */
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

/**
 * Incrementa el stock de un producto de forma atómica.
 * @param {string} docId - El ID del documento del producto.
 * @param {number} cantidad - La cantidad a sumar al stock (puede ser negativo para restar).
 */
export async function updatePlusStock(docId, cantidad) {
    const docRef = doc(db, "products", docId);
    await updateDoc(docRef, {
        cantidad: increment(cantidad),
    });
}

/**
 * Decrementa el stock de un producto de forma atómica.
 * @param {string} docId - El ID del documento del producto.
 * @param {number} cantidadADescontar - La cantidad a restar del stock.
 */
export async function updateStock(docId, cantidadADescontar) {
    const docRef = doc(db, "products", docId);
    // Usamos un número negativo para restar de forma atómica.
    await updateDoc(docRef, { cantidad: increment(-cantidadADescontar) });
}

/**
 * Obtiene los datos necesarios para crear una nueva orden (empleados y productos).
 * @returns {Promise<{employers: Array<object>, products: Array<object>}>}
 */
export async function getDataForNewOrder() {
    console.group("getDataForNewOrder");
    try {
        const employers = await getEmployers();
        const products = await getProducts();
        return { employers, products };
    } catch (error) {
        console.log("Error fetching data for new order:", error);
    }
    console.groupEnd();
}

/**
 * Guarda una orden y actualiza el stock de productos en una sola transacción atómica.
 * @param {object} orderData - { userUID, employerDocId, items }
 */
export async function saveOrderAndDecreaseStock(orderData) {
    const batch = writeBatch(db);

    // 1. Crear el nuevo documento de la orden
    const newOrderRef = doc(collection(db, "listOrden"));
    batch.set(newOrderRef, {
        docId: newOrderRef.id,
        userUID: orderData.userUID,
        empleadoUID: orderData.employerDocId,
        items: orderData.items,
        createdAt: new Date().toLocaleString("sv"),
    });

    // 2. Actualizar el stock para cada item en la orden
    orderData.items.forEach((item) => {
        const productRef = doc(db, "products", item.docId);
        batch.update(productRef, { cantidad: increment(-item.cantidad) });
    });

    // 3. Ejecutar todas las operaciones en el batch
    await batch.commit();
    return newOrderRef.id;
}

// =================================================================
// FUNCIONES DE ESCUCHA EN TIEMPO REAL (REAL-TIME LISTENERS)
// =================================================================

/**
 * Obtiene una lista de todos los empleados una sola vez.
 * @returns {Promise<Array<object>>} - Un array de objetos de empleados.
 */
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

/**
 * Escucha cambios en la colección de empleados en tiempo real.
 * @param {function} onDataChange - Callback que se ejecuta con la nueva lista de empleados.
 * @returns {function} - Función para cancelar la suscripción (unsubscribe).
 */
export function listenToEmployers(onDataChange) {
    const q = query(collection(db, "employers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const employers = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
        }));
        onDataChange(employers);
    });
    return unsubscribe;
}

/**
 * Obtiene una lista de todos los productos una sola vez.
 * @returns {Promise<Array<object>>} - Un array de objetos de producto.
 */
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

/**
 * Escucha cambios en la colección de productos en tiempo real.
 * @param {function} onDataChange - Callback que se ejecuta con la nueva lista de productos.
 * @returns {function} - Función para cancelar la suscripción (unsubscribe).
 */
export function listenToProducts(onDataChange) {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
        }));
        onDataChange(products);
    });
    return unsubscribe;
}

/**
 * Obtiene una lista de las últimas 30 órdenes de venta.
 * @returns {Promise<Array<object>>} - Un array con los documentos de las órdenes.
 */
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

/**
 * Obtiene el nombre de un administrador (usuario) por su UID.
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<string|undefined>} - El displayName del usuario.
 */
export async function getNameAdminFirebase(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const res = await getDoc(docRef);
        return res.data().displayName;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Obtiene el nombre de un empleado por su ID de documento.
 * @param {string} uid - El ID del documento del empleado.
 * @returns {Promise<string|undefined>} - El firstName del empleado.
 */
export async function getNameEmployerFirebase(uid) {
    try {
        const docRef = doc(db, "employers", uid);
        const res = await getDoc(docRef);
        return res.data().firstName;
    } catch (error) {
        console.error(error);
    }
}
