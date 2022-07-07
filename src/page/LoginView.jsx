import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { auth, userExistes } from "../firebase/firebase";

function LoginView() {
    /* const [currentUser, setCurrentUser] = useState(null); */
    const [state, setCurrentState] = useState(0);
    const navigate = useNavigate();

    const handleOnClick = async () => {
        const g_provider = new GoogleAuthProvider();
        await signInWithGoogle(g_provider);
    };

    async function signInWithGoogle(g_provider) {
        try {
            const res = await signInWithPopup(auth, g_provider);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    /*  if (state === 1) {
        return <div>...Loading</div>;
    } */

    function handleUserLoggedIn(user) {
        navigate("/dashboard");
        setCurrentState(2);
    }

    function handleUserNotRegister() {
        navigate("/choose-username");
        setCurrentState(3);
    }

    function handleUserNotLoggedIn(user) {
        setCurrentState(4);
    }

    /*  if (state === 2) {
        return <div> Estas autenticado y registrado </div>;
    }
    if (state === 3) {
        return <div> Estas autenticado pero no registrado en la db</div>;
    } */

    if (state === 4) {
        return <button onClick={handleOnClick}>Login with Google</button>;
    }

   

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegister={handleUserNotRegister}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>
                <div>...Loading</div>
            </div>
        </AuthProvider>
    );
}

export default LoginView;
