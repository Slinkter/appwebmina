import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { logout } from "../firebase/firebase";
import Box from "@mui/material/Box";
import UILoading from "../components/UILoading";

function SingOutView() {
    const navigate = useNavigate();

    async function handleUserLoggedIn(user) {
        await logout();
        navigate("/");
    }

    function handleUserNotRegister() {
        navigate("/");
    }

    function handleUserNotLoggedIn(user) {
        navigate("/");
    }

    return (
        <AuthProvider
            currentPage={"SignOut.js"}
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegister={handleUserNotRegister}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <UILoading />SingOutView
            </Box>
        </AuthProvider>
    );
}

export default SingOutView;
