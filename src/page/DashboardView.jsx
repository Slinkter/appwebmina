import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import UILoading from "../components/UILoading";
import CardDashBoard from "./CardDashBoard";
import "../style/Dashboard.css";

function DashboardView() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();


    return (
        <AuthProvider
            currentPage={"DashboardView"}
            onUserLoggedIn={(user) => setCurrentUser(user)}
            onUserNotLoggedIn={() => navigate("/login")}
            onUserNotRegister={() => navigate("/register")}
        >
            {!currentUser ? (
                <UILoading />
            ) : (
                <DashboardWrapper>
                    <Box className="dashboard-buttons">
                       
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
                </DashboardWrapper>
            )}
        </AuthProvider>
    );
}

export default DashboardView;



                    
