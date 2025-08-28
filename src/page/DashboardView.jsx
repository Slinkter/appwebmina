import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import DashboardWrapper from "../components/DashboardWrapper";
import UILoading from "../components/UILoading";
import CardDashBoard from "./CardDashBoard";
import "../style/Dashboard.css";
import { useSelector } from "react-redux";
// Asumo que tienes selectores `selectUser` y `selectAuthStatus` en tu authSlice.
import { selectCurrentUser, selectAuthStatus } from "../redux/authSlice";

function DashboardView() {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const authStatus = useSelector(selectAuthStatus);

    useEffect(() => {
        if (authStatus === "unauthenticated") {
            navigate("/login");
        }
    }, [authStatus, navigate]);

    if (authStatus === "loading" || !currentUser) {
        return <UILoading />;
    }

    return (
        <DashboardWrapper>
            {/* El Container ya centra y añade padding. El Box puede usarse solo para el layout de los items. */}
            <Container sx={{ py: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <CardDashBoard
                        label={"New Employer "}
                        url={"/createemploye"}
                    />

                    <CardDashBoard
                        label={"New Product"}
                        url={"/createproduct"}
                    />
                    <CardDashBoard
                        label={"Update Product"}
                        url={"/updateproduct"}
                    />
                    <CardDashBoard
                        label={"Create Report"}
                        url={"/createreport"}
                    />
                    <CardDashBoard
                        label={"Create Order"}
                        url={"/createorder"}
                    />
                </Box>
            </Container>
        </DashboardWrapper>
    );
}

export default DashboardView;
