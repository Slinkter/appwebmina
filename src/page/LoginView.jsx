import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { auth } from "../firebase/firebase";

// MUI


import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UILoading from "../components/UILoading";



const theme = createTheme();

function LoginView() {
    //
    const [state, setState] = useState(0);
    const navigate = useNavigate();
    //
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

    function handleUserLoggedIn(user) {
        navigate("/dashboard");
        setState(2);
    }

    function handleUserNotRegister() {
        navigate("/choose-username");
        setState(3);
    }

    function handleUserNotLoggedIn(user) {
        setState(4);
    }

    if (state === 4) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
              
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleOnClick}
                >
                    Login with Google
                </Button>
            </Box>
        );
    }

    return (
        <AuthProvider
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
                <UILoading />
            </Box>
        </AuthProvider>
    );
}

export default LoginView;
