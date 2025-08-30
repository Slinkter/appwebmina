import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import AuthProvider from "../components/AuthProvider";
import { logout } from "../firebase/firebase";
import Box from "@mui/material/Box";

function SingOutView() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate("/");
        };
        performLogout();
    }, [navigate]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            SingOutView
        </Box>
    );
}

export default SingOutView;
