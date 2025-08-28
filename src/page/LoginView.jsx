import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { selectAuthStatus } from "../redux/authSlice";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function LoginView() {
    const navigate = useNavigate();
    const authStatus = useSelector(selectAuthStatus);

    useEffect(() => {
        // Si el usuario ya está autenticado, lo redirigimos al dashboard.
        if (authStatus === "authenticated") {
            navigate("/dashboard");
        }
    }, [authStatus, navigate]);

    async function handleLogin() {
        const g_provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, g_provider);
            // La redirección ocurrirá automáticamente por el listener en App.js
            // y el useEffect de esta misma página.
        } catch (error) {
            console.error(
                "Error durante el inicio de sesión con Google:",
                error
            );
        }
    }

    return (
        <Container component="main">
            <Box
                display="flex"
                flexWrap="wrap"
                minHeight="100dvh"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
            >
                <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="text.primary"
                >
                    Inventario
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    component="p"
                    margin="normal"
                >
                    demo
                </Typography>

                <Stack marginTop={4} width={"80%"} maxWidth={400}>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handleLogin}
                        endIcon={<SendIcon />}
                    >
                        Login with Google
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
