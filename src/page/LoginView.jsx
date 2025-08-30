import React, { useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress"; // Importa CircularProgress
import Alert from "@mui/material/Alert"; // Importa Alert para los mensajes de error

export default function LoginView() {
    const navigate = useNavigate();
    const authStatus = useSelector(selectAuthStatus);

    // 💡 Nuevo estado para manejar la carga y los errores
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authStatus === "authenticated") {
            navigate("/dashboard");
        }
    }, [authStatus, navigate]);

    async function handleLogin() {
        const g_provider = new GoogleAuthProvider();
        setIsLoading(true); // Inicia el estado de carga
        setError(null); // Resetea cualquier error previo
        g_provider.setCustomParameters({
            prompt: "select_account",
        });

        try {
            await signInWithPopup(auth, g_provider);
            // La redirección se maneja en el useEffect, por lo que no es necesaria aquí.
        } catch (error) {
            console.error(
                "Error durante el inicio de sesión con Google:",
                error
            );
            setIsLoading(false); // Detiene el estado de carga
            setError("Error al iniciar sesión. Por favor, inténtalo de nuevo."); // Muestra un mensaje de error
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

                {/* 💡 Muestra el mensaje de error si existe */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{ width: "100%", maxWidth: 400 }}
                    >
                        {error}
                    </Alert>
                )}

                <Stack marginTop={2} width={"50%"} maxWidth={400}>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handleLogin}
                        startIcon={
                            isLoading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <SendIcon />
                            )
                        }
                        disabled={isLoading} // Deshabilita el botón durante la carga
                    >
                        {isLoading
                            ? "Iniciando sesión..."
                            : "Login with Google"}
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
