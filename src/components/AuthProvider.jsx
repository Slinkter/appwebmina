import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    auth,
    getUserInfo,
    registerNewUser,
    userExistes,
} from "../firebase/firebase";

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";

export default function AuthProvider(props) {
    //
    const { onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister } = props;
    const { children } = props;
    const { currentPage } = props
    //   

    useEffect(() => {
        onAuthStateChanged(auth, handleUserStateChaned);
        async function handleUserStateChaned(user) {
            console.log("1-AuthProvider");
            console.log("2-auth", auth);
            console.log("3-user", user);
            console.log("4- currentpage", currentPage);
            if (user) {
                const isRegister = await userExistes(user.uid);
                console.log("isRegister", isRegister);
                if (isRegister) {
                    onUserLoggedIn(user);
                } else {
                    const newUser = {
                        uid: user.uid,
                        displayName: user.displayName,
                        username: user.displayName,
                        processCompleted: true,
                    };
                    await registerNewUser(newUser);
                    onUserLoggedIn(user);
                }

            } else {
                onUserNotLoggedIn();
            }
        }
    }, [currentPage, onUserLoggedIn, onUserNotLoggedIn,onUserNotRegister]);

    return <div >{children}</div>;
}
