import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";

import CDCreateEmployer from "../pageDashboardUI/CDCreateEmployer";
import CDCreateProduct from "../pageDashboardUI/CDCreateProduct";
import CDUpdateProduct from "../pageDashboardUI/CDUpdateProduct";
import CDCreateReport from "../pageDashboardUI/CDCreateReport";
import CDCreateOrder from "../pageDashboardUI/CDCreateOrder";
//
import UILoading from "../components/UILoading";
//css
import "../style/Dashboard.css";

import { Box } from "@mui/material";

function DashboardView() {
    const [currentUser, setCurrentUser] = useState(null);
    const [state, setState] = useState(0);
    const navigate = useNavigate();

    //-->
    function btn_NewEmployer() {
        navigate("/createemploye");
    }

    function btn_NewProduct() {
        navigate("/createproduct");
    }

    function btn_UpdateProductt() {
        navigate("/updateproduct");
    }

    function btn_CreateReport() {
        navigate("/createreport");
    }

    function btn_CreateOrder() {
        navigate("/createorder");
    }

    // -->
    function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(2);
    }

    function handleUserNotRegister() {
        navigate("/");
    }

    function handleUserNotLoggedIn() {
        navigate("/");
    }

    if (state === 2) {
        return (
            <DashboardWrapper>
                <h2 className="">Bienvenido {currentUser.displayName}</h2>

                <Box className="container">
                    <CDCreateEmployer
                        btn_NewEmployer={btn_NewEmployer}
                        label={"crear"}
                        metodo={"Empleado"}
                    />

                    <CDCreateProduct
                        btn_NewEmployer={btn_NewProduct}
                        label={"crear"}
                        metodo={"Producto"}
                    />

                    <CDCreateOrder
                        btn_NewEmployer={btn_CreateOrder}
                        label={"Crear"}
                        metodo={"Pedido"}
                    />
                    <CDUpdateProduct
                        btn_NewEmployer={btn_UpdateProductt}
                        label={"actualizar"}
                        metodo={"Stock"}
                    />
                    <CDCreateReport
                        btn_NewEmployer={btn_CreateReport}
                        label={"Crear"}
                        metodo={"Reporte"}
                    />
                </Box>
            </DashboardWrapper>
        );
    }

    return (
        <AuthProvider
            currentPage={"DashboardView.js"}
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
                <UILoading />
                DashboardView
            </Box>
        </AuthProvider>
    );
}

export default DashboardView;

/* 
const handleSubmit = (e) => {
    e.preventDefault();
    addLink();
};

const handleOnChange = (e) => {
    const value = e.target.value;
    const e_name = e.target.name;

    if (e_name === "title") {
        setTitle(value);
    }
    if (e_name === "url") {
        setURL(value);
    }
};

function addLink() {
    if (title !== "" && url !== "") {
        const newLink = {
            id: uuidv4(),
            title: title,
            url: url,
            uid: currentUser.uid,
        };
        const res = insertNewLink(newLink);
        newLink.docId = res.id;
        setTitle("");
        setURL("");
        setLinks([...links, newLink]); // de la lista links que tengo le add newLink
    }
}

async function handleUpdateLink(docId, currentTitle, currentUrl) {
    const link = links.find((item) => item.docId === docId);
    console.log(docId, currentTitle, currentUrl);
    link.title = currentTitle;
    link.url = currentUrl;
    // al crear el link ya tenia el docID pero no estaba en su campo y ahora del local se va a actualizar
    await updateLink(docId, link);
}
async function handleDeleteLink(docId) {
    // eliminar un link al nivel firebase
    await delenteLink(docId);
    // eliminar un link al nivel local
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
} */
