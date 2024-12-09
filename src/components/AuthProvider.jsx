import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, registerNewUser, userExistes } from "../firebase/firebase";

export default function AuthProvider(props) {
    //
    const { children } = props;
    const { currentPage } = props;
    const { onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister } = props;

    async function checkchangeStateUser(user) {
        if (!user) {
            onUserNotLoggedIn();
        } else {
            //
            const isRegister = await userExistes(user.uid);
            //
            if (!isRegister) {
                const newUser = {
                    uid: user.uid,
                    displayName: user.displayName,
                    username: user.displayName,
                    processCompleted: true,
                };
                await registerNewUser(newUser);
                onUserLoggedIn(user);
            } else {
                onUserLoggedIn(user);
            }
        }
    }
    //
    useEffect(() => {
        // -->
        onAuthStateChanged(auth, checkchangeStateUser);
        //
    }, [currentPage, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);

    return <React.Fragment>{children}</React.Fragment>;
}
