// DashboardView.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material"; // No necesitas Stack
import { selectCurrentUser, selectAuthStatus } from "../redux/authSlice";

import DashboardWrapper from "../components/DashboardWrapper";
import CardDashBoard from "./CardDashBoard";

import UILoading from "../components/UILoading";
import "../style/Dashboard.css";

// 💡 Importa los íconos de Material-UI
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
            <Container>
                <Box
                    sx={{
                        display: "grid",
                        gap: 3,
                        py: 4,
                        // 💡 Para pantallas pequeñas (xs), una columna.
                        // 💡 Para pantallas medianas (md) y más grandes, 3 columnas.
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                    }}
                >
                    <CardDashBoard
                        label={"New Employer"}
                        url={"/createemploye"}
                        icon={GroupAddIcon}
                    />
                    <CardDashBoard
                        label={"New Product"}
                        url={"/createproduct"}
                        icon={AddCircleIcon}
                    />
                    <CardDashBoard
                        label={"Update Product"}
                        url={"/updateproduct"}
                        icon={UpgradeIcon}
                    />
                    <CardDashBoard
                        label={"Create Report"}
                        url={"/createreport"}
                        icon={BarChartIcon}
                    />
                    <CardDashBoard
                        label={"Create Order"}
                        url={"/createorder"}
                        icon={ShoppingCartIcon}
                    />
                </Box>
            </Container>
        </DashboardWrapper>
    );
}

export default DashboardView;
