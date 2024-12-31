import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import UILoading from "./components/UILoading";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function App() {
    const [state, setState] = useState(0);
    const navigate = useNavigate();
    const auth = getAuth();

    async function signInWithGoogle(g_provider) {
        try {
            const res = await signInWithPopup(auth, g_provider);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    const handleLogin = async () => {
        const g_provider = new GoogleAuthProvider();
        await signInWithGoogle(g_provider);
    };

    function handleUserLoggedIn() {
        setState(2);
        navigate("/dashboard");
    }

    function handleUserNotRegister() {
        console.log("handleUserNotRegister");
    }

    function handleUserNotLoggedIn() {
        setState(4);
    }

    if (state === 4) {
        return (
            <Container component="main">
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Typography
                        component="h3"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Inventario
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        component="p"
                        margin="normal"
                        gutterBottom
                    >
                        demo
                    </Typography>

                    <Box sx={{ py: 2 }}>
                        <Button
                            fullWidth
                            type="submit"
                            size="large"
                            onClick={() => handleLogin()}
                            variant="contained"
                            color="primary"
                            margin="normal"
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return (
        <>
            <AuthProvider
                currentPage={"App.js"}
                onUserLoggedIn={handleUserLoggedIn} // state 2
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn} // state 4
            >
                <UILoading />
            </AuthProvider>
        </>
    );
}

export default App;
