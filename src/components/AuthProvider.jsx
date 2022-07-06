import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, userExistes } from "../firebase/firebase";

export default function AuthProvider({
    children,
    onUserLoggedIn,
    onUserNotLoggedIn,
    onUserNotRegister,
}) {
    const navigate = useNavigate();

    useEffect(() => {
        /*   setCurrentState(1); */
        onAuthStateChanged(auth, handleUserStateChaned);

        async function handleUserStateChaned(user) {
            if (user) {
                const isRegister = await userExistes(user.uid);
                if (isRegister) {
                    //TODO : redirigir a Dashboard
                    /*   navigate("/dashboard");
                    setCurrentState(2); */
                    onUserLoggedIn(user);
                } else {
                    // TODO : redigiir a choose username
                    /* navigate("/choose-username");
                    setCurrentState(3); */
                    onUserNotRegister(user);
                }

                console.log(user.displayName);
            } else {
                /*         setCurrentState(4);
                console.log("No hay nadie autenticado ..."); */

                onUserNotLoggedIn();
            }
        }
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);

    return <div>{children} </div>;
}
