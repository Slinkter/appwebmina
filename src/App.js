import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import UILoading from "./components/UILoading";
import { auth } from "./firebase/firebase";
//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// 
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

function App() {
    // -->
    const [state, setState] = useState(0);
    const navigate = useNavigate();
    // --->
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
    //-->
    function handleUserLoggedIn(user) {
        console.log("handleUserLoggedIn  : ");
        navigate("/dashboard");
        setState(2);
    }

    function handleUserNotRegister() {
        console.log("handleUserNotRegister  : ");
    }

    function handleUserNotLoggedIn(user) {
        setState(4);
        console.log("handleUserNotLoggedIn  : ");
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
                        Inventario 2
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        component="p"
                        margin="normal"
                        gutterBottom
                    >
                        demo de inventario
                    </Typography>

                    <Box sx={{ py: 2 }}>
                        <Button
                            fullWidth
                            type="submit"
                            size="large"
                            onClick={handleOnClick}
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
        <React.Fragment>
            <AuthProvider
                currentPage={"App.js"}
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
                    <UILoading /> App
                </Box>
            </AuthProvider>

        </React.Fragment>
    );
}

export default App;
