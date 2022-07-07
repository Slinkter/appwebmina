import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    auth,
    getUserInfo,
    registerNewUser,
    userExistes,
} from "../firebase/firebase";

export default function AuthProvider(props) {
    const { onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister } = props;
    const { children } = props;
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, handleUserStateChaned);

        async function handleUserStateChaned(user) {
            console.log("user 1 : ", user);
            if (user) {
                console.log(user.displayName);
                console.log(user.email);
                console.log(user.uid);
                const isRegister = await userExistes(user.uid);
                console.log("isRegister", isRegister);
                if (isRegister) {
                    const userInfo = await getUserInfo(user.uid);
                    if (userInfo.processCompleted) {
                        /* navigate("/dashboard"); */
                        onUserLoggedIn(userInfo);
                    } else {
                        /* navigate("/choose-username"); */
                        onUserNotRegister(userInfo);
                    }
                    console.log("onUserLoggedIn  1: ");
                    console.log(userInfo);
                } else {
                    console.log("onUserNotRegister  : ");
                    /* navigate("/choose-username"); */
                    const newUser = {
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: "",
                        username: "",
                        processCompleted: false,
                    };
                    await registerNewUser(newUser);
                    onUserNotRegister(user);
                }
            } else {
                /*         
                navigate("/login")
                 */
                console.log("onUserNotLoggedIn  : ");
                onUserNotLoggedIn();
            }
        }
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);

    return <div>{children}</div>;
}
