import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
//
import { auth, getUserInfo } from "./firebase/firebase";
import { setUser, clearUser, selectAuthStatus } from "./redux/authSlice";

import UILoading from "./components/UILoading";

function App() {
    const navigate = useNavigate();
    //
    const authStatus = useSelector(selectAuthStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("init useEffect");

        // Listener central para el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                //----> Usuario está logueado
                const userInfo = await getUserInfo(user.uid);
                //
                if (userInfo.processCompleted) {
                    dispatch(setUser(userInfo));
                    navigate("/dashboard");
                } else {
                    // Aún no ha completado el registro (elegir username)
                    dispatch(setUser(userInfo));
                    navigate("/choose-username");
                }
            } else {
                //---->  Usuario no está logueado
                dispatch(clearUser());
            }
        });

        // Limpiar el listener al desmontar el componente
        return () => unsubscribe();
    }, [dispatch, navigate]);

    async function signInWithGoogle(g_provider) {
        try {
            const res = await signInWithPopup(auth, g_provider);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleLogin() {
        const g_provider = new GoogleAuthProvider();
        await signInWithGoogle(g_provider);
    }

    console.log(authStatus);

    if (authStatus === "unauthenticated") {
        return (
            <Container component="main">
                <Box
                    display="flex"
                    flexWrap="wrap"
                    minHeight="100dvh"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    border={"1px solid red"}
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

                    <Stack
                        marginTop={4}
                        width={"80%"}
                        border={"1px solid black"}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            margin="normal"
                            type="submit"
                            onClick={() => handleLogin()}
                            endIcon={<SendIcon />}
                        >
                            Login
                        </Button>
                    </Stack>
                </Box>
            </Container>
        );
    }

    // Muestra un loader mientras se verifica el estado de autenticación
    return <UILoading />;
}

export default App;
