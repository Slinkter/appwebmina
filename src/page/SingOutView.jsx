import React from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { logout } from "../firebase/firebase";

function SingOutView() {
    const navigate = useNavigate();

    async function handleUserLoggedIn(user) {
        await logout();
        navigate("/");
    }

    function handleUserNotRegister() {
        navigate("/login");
    }

    function handleUserNotLoggedIn(user) {
        navigate("/login");
    }

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegister={handleUserNotRegister}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
           
        </AuthProvider>
    );
}

export default SingOutView;
