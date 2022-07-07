import React from "react";
import AuthProvider from "../components/AuthProvider";

function handleUserLoggedIn(user) {}

function handleUserNotRegister(user) {}

function handleUserNotLoggedIn() {}

function DashboardView() {
    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegister={handleUserNotRegister}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>DashboardView</div>
        </AuthProvider>
    );
}

export default DashboardView;
