import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { auth, userExistes } from "../firebase/firebase";

// MUI

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function LoginView() {
    //MUI
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    /* const [currentUser, setCurrentUser] = useState(null); */
    const [state, setCurrentState] = useState(0);
    const navigate = useNavigate();

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
        setCurrentState(2);
    }

    function handleUserNotRegister() {
        navigate("/choose-username");
        setCurrentState(3);
    }

    function handleUserNotLoggedIn(user) {
        setCurrentState(4);
    }

    if (state === 4) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleOnClick}
                            >
                                Login with Google
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegister={handleUserNotRegister}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>
                <div>...Loading</div>
            </div>
        </AuthProvider>
    );
}

export default LoginView;
