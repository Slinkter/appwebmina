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
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, handleUserStateChaned);
        console.log("1-AuthProvider");
        console.log("2-auth" ,auth);
        async function handleUserStateChaned(user) {
           console.log("3-user" ,user);
            if (user) {
                const isRegister = await userExistes(user.uid);
                console.log("isRegister", isRegister);
                console.log(user);
                if (isRegister) {
                    const userInfo = await getUserInfo(user.uid);
                    console.log(userInfo);
                    if (userInfo.processCompleted) {
                        onUserLoggedIn(userInfo);
                        console.log("onUserLoggedIn");
                    } else {
                        onUserNotRegister(userInfo);
                        console.log("onUserNotRegister");
                    }

                } else {

                    const newUser = {
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: "",
                        username: user.displayName,
                        processCompleted: true,
                    };
                    await registerNewUser(newUser);
                    onUserNotRegister(user);
                    console.log("onUserNotRegister  : ");
                }
            } else {
                console.log("onUserNotLoggedIn  : ");
                onUserNotLoggedIn();
            }
        }
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);

    return <div >{children}</div>;
}
