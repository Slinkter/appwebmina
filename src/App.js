import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthProvider from "./components/AuthProvider";
import UILoading from "./components/UILoading";
import { setUserLoggedIn, setUserLoggedOut } from "./redux/appSlice";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function App() {
    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch();
    const appStatus = useSelector((state) => state.app.status);

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
        navigate("/dashboard");
    }

    function handleUserNotRegister() {
        dispatch(setUserLoggedOut());
    }

    function handleUserNotLoggedIn() {
        dispatch(setUserLoggedOut());
    }

    if (appStatus === "loggedOut") {
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
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >
                <UILoading />
            </AuthProvider>
        </>
    );
}

export default App;
