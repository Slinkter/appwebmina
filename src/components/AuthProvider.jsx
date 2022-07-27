import React, { useEffect } from "react";

import {
    auth,
    registerNewUser,
    userExistes,
} from "../firebase/firebase";

import { onAuthStateChanged, } from "firebase/auth";

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
    }, [currentPage, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);

    return <div >{children}</div>;
}
