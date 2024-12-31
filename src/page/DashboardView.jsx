import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import UILoading from "../components/UILoading";
import "../style/Dashboard.css";
import { Box } from "@mui/material";

function DashboardView() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Navigation functions
    const navigateTo = (path) => () => navigate(path);

    return (
        <AuthProvider
            currentPage={"DashboardView"}
            onUserLoggedIn={(user) => setCurrentUser(user)}
            onUserNotLoggedIn={() => navigate("/login")}
            onUserNotRegister={() => navigate("/register")}
        >
            {currentUser ? (
                <DashboardWrapper>
                    <Box className="dashboard-buttons">
                        <button onClick={navigateTo("/createemploye")}>
                            New Employer
                        </button>
                        <button onClick={navigateTo("/createproduct")}>
                            New Product
                        </button>
                        <button onClick={navigateTo("/updateproduct")}>
                            Update Product
                        </button>
                        <button onClick={navigateTo("/createreport")}>
                            Create Report
                        </button>
                        <button onClick={navigateTo("/createorder")}>
                            Create Order
                        </button>
                    </Box>
                </DashboardWrapper>
            ) : (
                <UILoading />
            )}
        </AuthProvider>
    );
}

export default DashboardView;
