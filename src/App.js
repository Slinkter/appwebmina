import "./App.css";
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UILoading from "./components/UILoading";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, getUserInfo } from "./firebase/firebase";
import { setUser, clearUser, selectAuthStatus } from "./redux/authSlice";
//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector(selectAuthStatus);

    useEffect(() => {
        // Listener central para el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Usuario está logueado
                const userInfo = await getUserInfo(user.uid);
                if (userInfo.processCompleted) {
                    dispatch(setUser(userInfo));
                    navigate("/dashboard");
                } else {
                    // Aún no ha completado el registro (elegir username)
                    dispatch(setUser(userInfo));
                    navigate("/choose-username");
                }
            } else {
                // Usuario no está logueado
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
    const handleLogin = async () => {
        const g_provider = new GoogleAuthProvider();
        await signInWithGoogle(g_provider);
    };

    if (authStatus === "unauthenticated") {
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

    // Muestra un loader mientras se verifica el estado de autenticación
    return <UILoading />;
}

export default App;
