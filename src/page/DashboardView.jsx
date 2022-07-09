import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
    delenteLink,
    getLinks,
    insertNewLink,
    updateLink,
} from "../firebase/firebase";
import Link from "../components/Link";
//css
import "../style/Dashboard.css";

// MUI

import {
    Container,
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import CardDashboard from "../components/CardDashboard";
import CDCreateProduct from "../components/CDCreateProduct";
import CDUpdateProduct from "../components/CDUpdateProduct";
import CDCreateReport from "../components/CDCreateReport";
import CDCreateOrder from "../components/CDCreateOrder";

function DashboardView() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

    const [title, setTitle] = useState("");
    const [url, setURL] = useState("");
    const [links, setLinks] = useState([]);

    async function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(2);
        // obtener la lista de links del usuarios
        const resLinks = await getLinks(user.uid);
        setLinks([...resLinks]);
    }

    function handleUserNotRegister(user) {
        navigate("/login");
    }

    function handleUserNotLoggedIn() {
        navigate("/login");
    }

    if (state === 0) {
        return (
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >
                <div>Loading... </div>
            </AuthProvider>
        );
    }

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
    }

    function btn_NewEmployer() {
        alert("ahora crear empleado");
    }

    return (
        <DashboardWrapper>
            <h1 className="text-center">Bienvenido {currentUser.displayName} </h1>
            <div className="container">
                <CardDashboard
                    btn_NewEmployer={btn_NewEmployer}
                    label={"crear"}
                    metodo={"empleado"}
                />

                <CDCreateProduct
                    btn_NewEmployer={btn_NewEmployer}
                    label={"crear"}
                    metodo={"producto"}
                />
                <CDUpdateProduct
                    btn_NewEmployer={btn_NewEmployer}
                    label={"actualizar"}
                    metodo={"Stock"}
                />
                <CDCreateReport
                    btn_NewEmployer={btn_NewEmployer}
                    label={"Crear"}
                    metodo={"Reporte"}
                />
                <CDCreateOrder
                    btn_NewEmployer={btn_NewEmployer}
                    label={"Crear"}
                    metodo={"Pedido"}
                />
            </div>
        </DashboardWrapper>
    );
}

export default DashboardView;
