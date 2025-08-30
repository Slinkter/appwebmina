import "./App.css";
import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import {
    auth,
    getUserInfo,
    userExistes,
    registerNewUser,
    logout,
} from "./firebase/firebase";
import {
    setUser,
    clearUser,
    selectAuthStatus,
    selectCurrentUser,
} from "./redux/authSlice";

import UILoading from "./components/UILoading";

// Importa tus vistas/páginas
import LoginView from "./page/LoginView";
import DashboardView from "./page/DashboardView";
import NewProduct from "./pagedashboard/NewProduct";
import ChooseUsernameView from "./page/ChooseUsernameView"; // Asumo que tienes este componente
import ErrorView from "./page/ErrorView";
import NewEmployer from "./pagedashboard/NewEmployer";
import UpdateStock from "./pagedashboard/UpdateStock";
import CreateReport from "./pagedashboard/CreateReport";
import CreatePedido from "./pagedashboard/CreatePedido";
import PublicProfileView from "./page/PublicProfileView";
import EditProfileView from "./page/EditProfileView";
import SingOutView from "./page/SingOutView";

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 MINUTOS en milisegundos

function App() {
    const navigate = useNavigate();
    //
    const authStatus = useSelector(selectAuthStatus);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const timeoutRef = useRef(null);

    //
    const resetTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            logout();
            navigate("/login");
        }, SESSION_TIMEOUT);
    };

    useEffect(() => {
        // Listener central para el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                // User is not authenticated. Clear user state and timer
                dispatch(clearUser());
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            } else {
                // Usuario está logueado en Firebase Auth.
                // Verificamos si su documento existe en Firestore.
                const isRegistered = await userExistes(user.uid);
                if (!isRegistered) {
                    // Si no existe, es un nuevo usuario. Lo registramos en Firestore.
                    const userRef = {
                        uid: user.uid,
                        displayName: user.displayName || "Sin Nombre",
                        username: user.displayName || "sin_username",
                        processCompleted: false,
                    };
                    await registerNewUser(userRef);
                    dispatch(setUser(userRef));
                } else {
                    // Si ya existe, obtenemos su información completa.
                    const userInfo = await getUserInfo(user.uid);
                    if (userInfo) {
                        dispatch(setUser(userInfo));
                    }
                }
            }
        });
        // Limpiar el listener al desmontar el componente
        return () => unsubscribe();
    }, [dispatch]); // Quitamos navigate de las dependencias

    // Mientras el estado inicial se está verificando, podemos mostrar un loader general.
    // Esto solo se muestra una vez al cargar la app.
    if (authStatus === "loading") {
        console.log(authStatus);
        console.log(user);
        return <UILoading />;
    }

    // Una vez que el estado de auth está resuelto (authenticated o unauthenticated),
    // renderizamos el sistema de rutas.

    return (
        <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/choose-username" element={<ChooseUsernameView />} />
            <Route path="dashboard/profile" element={<EditProfileView />} />
            <Route path="u/:username" element={<PublicProfileView />} />
            <Route path="signout" element={<SingOutView />} />
            createemploye
            {/* Agrega aquí el resto de tus rutas */}
            <Route path="/createemploye" element={<NewEmployer />} />
            <Route path="/createproduct" element={<NewProduct />} />
            <Route path="/updateproduct" element={<UpdateStock />} />{" "}
            <Route path="/createreport" element={<CreateReport />} />
            <Route path="/createorder" element={<CreatePedido />} />
            {/* Ruta para errores 404 */}
            <Route path="*" element={<ErrorView />} />
        </Routes>
    );
}

export default App;
