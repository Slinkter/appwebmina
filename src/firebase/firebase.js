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

// =================================================================
// 1. CONFIGURACIÓN DE FIREBASE
// =================================================================

// Carga las variables de entorno para una configuración segura.
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Inicializa y exporta los servicios de Firebase para su uso en toda la aplicación.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Para la base de datos de texto
export const storage = getStorage(app); // Para el almacenamiento de archivos (imágenes)

// =================================================================
// 2. FUNCIONES DE AUTENTICACIÓN Y DATOS DE USUARIO
// =================================================================

/**
 * Cierra la sesión del usuario actual.
 * @async
 */
export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}

/**
 * Verifica si un usuario existe en la colección "users".
 * @param {string} uid - El UID del usuario a verificar.
 * @returns {Promise<boolean>} - True si el usuario existe, de lo contrario false.
 */
export async function userExistes(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

/**
 * Verifica si un nombre de usuario ya existe en la base de datos.
 * @param {string} username - El nombre de usuario a verificar.
 * @returns {Promise<string|null>} - El UID del usuario si existe, de lo contrario null.
 */
export async function existsUsername(username) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        // Verifica si la consulta devolvió algún documento.
        if (!querySnapshot.empty) {
            // Devuelve el UID del primer documento encontrado.
            return querySnapshot.docs[0].id;
        }
        return null;
    } catch (error) {
        console.error("Error al verificar el nombre de usuario:", error);
        return null;
    }
}

/**
 * Registra un nuevo usuario en la colección "users" usando su UID como ID de documento.
 * @param {object} user - El objeto de usuario a registrar.
 */
export async function registerNewUser(user) {
    try {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, user);
    } catch (error) {
        console.error("Error al registrar el nuevo usuario:", error);
    }
}

/**
 * Actualiza la información de un usuario en la colección "users".
 * @param {object} user - El objeto de usuario con los datos actualizados.
 */
export async function updateUser(user) {
    try {
        const docRef = doc(db, "users", user.uid);
        // setDoc con merge: true para actualizar solo los campos provistos.
        await setDoc(docRef, user, { merge: true });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
    }
}

/**
 * Obtiene la información de un usuario de la colección "users".
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<object|null>} - Los datos del usuario o null si no se encuentra.
 */
export async function getUserInfo(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        return null;
    }
}

// =================================================================
// 3. FUNCIONES PARA ENLACES (LINKS)
// =================================================================

/**
 * Inserta un nuevo enlace en la colección "links".
 * @param {object} link - El objeto de enlace a insertar.
 * @returns {Promise<import("firebase/firestore").DocumentReference|null>} - Referencia al documento creado o null si falla.
 */
export async function insertNewLink(link) {
    try {
        const docRef = collection(db, "links");
        const res = await addDoc(docRef, link);
        return res;
    } catch (error) {
        console.error("Error al insertar un nuevo enlace:", error);
        return null;
    }
}

/**
 * Obtiene todos los enlaces de un usuario específico.
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<Array<object>>} - Un array de objetos de enlace con su docId.
 */
export async function getLinks(uid) {
    const links = [];
    try {
        const collectionRef = collection(db, "links");
        const q = query(collectionRef, where("uid", "==", uid));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            links.push({ ...doc.data(), docId: doc.id });
        });
        return links;
    } catch (error) {
        console.error("Error al obtener los enlaces:", error);
        return [];
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
        await setDoc(docRef, link, { merge: true });
    } catch (error) {
        console.error("Error al actualizar el enlace:", error);
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
        console.error("Error al eliminar el enlace:", error);
    }
}

// =================================================================
// 4. FUNCIONES DE ALMACENAMIENTO (STORAGE)
// =================================================================

/**
 * Sube la foto de perfil de un usuario a Firebase Storage.
 * @param {string} uid - El UID del usuario para nombrar el archivo.
 * @param {File} file - El archivo de imagen a subir.
 * @returns {Promise<import("firebase/storage").UploadResult|null>} - El resultado de la subida o null si falla.
 */
export async function setUserProfilePhoto(uid, file) {
    try {
        const imageRef = ref(storage, `images/${uid}`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error("Error al subir la foto de perfil:", error);
        return null;
    }
}

/**
 * Obtiene la URL de descarga de una foto de perfil desde Firebase Storage.
 * @param {string} path - La ruta del archivo en Storage (ej. "images/uid").
 * @returns {Promise<string|null>} - La URL de descarga o null si no existe o falla.
 */
export async function getProfilePhotoUrl(path) {
    if (!path) {
        return null;
    }
    try {
        const imageRef = ref(storage, path);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.warn("Error al obtener la URL de la foto de perfil:", error);
        return null;
    }
}

/**
 * Obtiene el perfil público de un usuario, incluyendo su información y enlaces.
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<{profileInfo: object|null, linksInfo: Array<object>}>} - Un objeto con la información del perfil y los enlaces.
 */
export async function getUserPublicProfileInfo(uid) {
    try {
        const profileInfo = await getUserInfo(uid);
        const linksInfo = await getLinks(uid);
        return { profileInfo, linksInfo };
    } catch (error) {
        console.error("Error al obtener el perfil público:", error);
        return { profileInfo: null, linksInfo: [] };
    }
}

// =================================================================
// 5. FUNCIONES PARA EMPLEADOS, PRODUCTOS Y ÓRDENES
// =================================================================

/**
 * Añade un nuevo empleado a la colección "employers".
 * @param {object} employer - El objeto del empleado a añadir.
 */
export async function addNewEmployer(employer) {
    // 1. Crea una referencia a un nuevo documento.
    // ***`collection(db, "employers")` se refiere a la colección 'employers'.
    // ***`doc()` sin un ID específico se genere uno nuevo y único automáticamente.
    // 2. Asigna el ID autogenerado al objeto 'employer'.
    // ***`docRef.id` contiene el ID único que Firestore acaba de crear.

    try {
        const docRef = doc(collection(db, "employers"));
        employer.docId = docRef.id;
        await setDoc(docRef, employer);
        return docRef.id;
    } catch (error) {
        console.error("Error al añadir un nuevo empleado:", error);
        return null;
    }
}

/**
 * Añade un nuevo producto a la colección "products".
 * @param {object} product - El objeto del producto a añadir.
 */
export async function addNewProduct(product) {
    try {
        const docRef = doc(collection(db, "products"));
        product.docId = docRef.id;
        await setDoc(docRef, product);
    } catch (error) {
        console.error("Error al añadir un nuevo producto:", error);
    }
}

/**
 * Incrementa el stock de un producto de forma atómica.
 * @param {string} docId - El ID del documento del producto.
 * @param {number} cantidad - La cantidad a sumar al stock.
 */
export async function updatePlusStock(docId, cantidad) {
    try {
        const docRef = doc(db, "products", docId);
        await updateDoc(docRef, { cantidad: increment(cantidad) });
    } catch (error) {
        console.error("Error al incrementar el stock:", error);
    }
}

/**
 * Decrementa el stock de un producto de forma atómica.
 * @param {string} docId - El ID del documento del producto.
 * @param {number} cantidad - La cantidad a restar del stock.
 */
export async function updateStock(docId, cantidad) {
    try {
        const docRef = doc(db, "products", docId);
        await updateDoc(docRef, { cantidad: increment(-cantidad) });
    } catch (error) {
        console.error("Error al actualizar el stock:", error);
    }
}

/**
 * Obtiene los datos necesarios para crear una nueva orden (empleados y productos).
 * @returns {Promise<{employers: Array<object>, products: Array<object>}>}
 */
export async function getDataForNewOrder() {
    try {
        const employers = await getEmployers();
        const products = await getProducts();
        return { employers, products };
    } catch (error) {
        console.error("Error al obtener datos para la nueva orden:", error);
        return { employers: [], products: [] };
    }
}

/**
 * Guarda una orden y actualiza el stock de productos en una sola transacción atómica (batch).
 * @param {object} orderData - { userUID, employerDocId, items }
 * @returns {Promise<string|null>} - El ID del documento de la orden creada o null si falla.
 */
export async function saveOrderAndDecreaseStock(orderData) {
    try {
        const batch = writeBatch(db);
        const newOrderRef = doc(collection(db, "listOrden"));

        // 1. Crear el nuevo documento de la orden
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
    } catch (error) {
        console.error(
            "Error al guardar la orden y actualizar el stock:",
            error
        );
        return null;
    }
}

// =================================================================
// 6. FUNCIONES DE LECTURA DE COLECCIONES (ONE-TIME READS)
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
        console.error("Error al obtener los empleados:", error);
        return [];
    }
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
        console.error("Error al obtener los productos:", error);
        return [];
    }
}

/**
 * Obtiene una lista de las últimas 30 órdenes de venta.
 * @returns {Promise<Array<object>>} - Un array con los documentos de las órdenes.
 */
export async function getAllDocList() {
    try {
        const ref = collection(db, "listOrden");
        const q = query(ref, orderBy("createdAt", "desc"), limit(30));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
        }));
        return list;
    } catch (error) {
        console.error("Error al obtener la lista de órdenes:", error);
        return [];
    }
}

/**
 * Obtiene el nombre de un administrador (usuario) por su UID.
 * @param {string} uid - El UID del usuario.
 * @returns {Promise<string|null>} - El displayName del usuario o null si no se encuentra.
 */
export async function getNameAdminFirebase(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const res = await getDoc(docRef);
        return res.exists() ? res.data().displayName : null;
    } catch (error) {
        console.error("Error al obtener el nombre del administrador:", error);
        return null;
    }
}

/**
 * Obtiene el nombre de un empleado por su ID de documento.
 * @param {string} docId - El ID del documento del empleado.
 * @returns {Promise<string|null>} - El firstName del empleado o null si no se encuentra.
 */
export async function getNameEmployerFirebase(docId) {
    try {
        const docRef = doc(db, "employers", docId);
        const res = await getDoc(docRef);
        return res.exists() ? res.data().firstName : null;
    } catch (error) {
        console.error("Error al obtener el nombre del empleado:", error);
        return null;
    }
}

// =================================================================
// 7. FUNCIONES DE ESCUCHA EN TIEMPO REAL (REAL-TIME LISTENERS)
// =================================================================

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
