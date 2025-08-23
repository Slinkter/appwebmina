import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, registerNewUser, userExistes } from "../firebase/firebase";

export default function AuthProvider({
    currentPage,
    onUserLoggedIn,
    onUserNotLoggedIn,
    onUserNotRegister,
    children,
}) {
    /*  */
    async function checkStatusUser(user) {
        if (!user) {
            onUserNotLoggedIn();
        } else {
            const isRegister = await userExistes(user.uid);
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
    /*  */
    useEffect(() => {
        onAuthStateChanged(auth, checkStatusUser);
    }, []);
    /*  */
    return (
        <React.Fragment>
            {children}
            <div
                className=""
                style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid red",
                }}
            >
                <h1>hola</h1>
            </div>
        </React.Fragment>
    );
}
