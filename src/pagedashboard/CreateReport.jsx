import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import {
    Button,
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import CDGeneratorListAll from "../PageReports/UI/CDGeneratorListAll";
import UILoading from "../components/UILoading";
import {
    getAllDocList,
    getNameAdminFirebase,
    getNameEmployerFirebase,
} from "../firebase/firebase";

import "../style/CreateReport.css";
import * as XLSX from "xlsx";

function CreateReport() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [listOrder, setListOrder] = useState(null);

    async function getAllPedidos() {
        try {
            // Obtener la lista de documentos
            const array = await getAllDocList();

            // Actualizar la lista con nombres de administrador y empleado
            const newArray = await Promise.all(
                array.map(async (item) => {
                    item.nameAdmin = await getNameAdmin(item.userUID);
                    item.nameEmployer = await getNameEmployer(item.empleadoUID);
                    return item;
                })
            );

            // Actualizar el estado con la lista de pedidos
            setListOrder(newArray);
            console.log("updateArray", newArray);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
        }
    }

    async function getNameAdmin(uid) {
        try {
            return await getNameAdminFirebase(uid);
        } catch (error) {
            console.log(error);
        }
    }

    async function getNameEmployer(uid) {
        try {
            return await getNameEmployerFirebase(uid);
        } catch (error) {
            console.log(error);
        }
    }

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

    function handleBtnExport(id) {
        const fileName = id;
        const fileExtension = "xlsx";
        const elt = document.getElementById(id);
        let wb = XLSX.utils.book_new();
        wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
        XLSX.writeFile(wb, `${fileName}.${fileExtension}`);
    }
    /*  */
    if (state === 2) {
        return (
            <DashboardWrapper>
                <h1 className="h2_title">Generar reporte</h1>
                <>
                    <CDGeneratorListAll
                        label={"GENERAR"}
                        metodo={"Lista de Pedido"}
                        getAllPedidos={getAllPedidos}
                    />

                    {listOrder === null ? (
                        <h1> dale click </h1>
                    ) : (
                        <div>
                            {listOrder.map((item) => (
                                <Box key={item.docId} sx={{ mt: 1, mb: 1 }}>
                                    <Card sx={{ height: "100%" }}>
                                        <CardContent>
                                            <div className="containerCR">
                                                <div>
                                                    <Table id={item.docId}>
                                                        <Typography
                                                            sx={{ m: 1 }}
                                                            variant="h6"
                                                        >
                                                            Fecha :{" "}
                                                            {item.createdAt}
                                                        </Typography>
                                                        <Typography
                                                            sx={{ m: 1 }}
                                                            variant="h6"
                                                        >
                                                            Admin :{" "}
                                                            {item.nameAdmin}
                                                        </Typography>
                                                        <Typography
                                                            sx={{ m: 1 }}
                                                            variant="h6"
                                                        >
                                                            Empleado :{" "}
                                                            {item.nameEmployer}
                                                        </Typography>
                                                        <div hidden>
                                                            <TableRow>
                                                                <TableCell>
                                                                    Fecha :{" "}
                                                                    {
                                                                        item.createdAt
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    Admin :{" "}
                                                                    {
                                                                        item.nameAdmin
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    Fecha :{" "}
                                                                    {
                                                                        item.createdAt
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        </div>
                                                        <Table id="table_with_data">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        Cod.
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Prod
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        Cantidad
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {item.item.map(
                                                                    (item) => (
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                {item.docId.substring(
                                                                                    1,
                                                                                    4
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {
                                                                                    item.nameproduct
                                                                                }
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {
                                                                                    item.cantidad
                                                                                }
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                )}
                                                            </TableBody>
                                                        </Table>
                                                    </Table>
                                                </div>
                                                <Box sx={{ mt: 2, mb: 1 }}>
                                                    <Button
                                                        fullWidth
                                                        margin="normal"
                                                        color="success"
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        onClick={() => {
                                                            handleBtnExport(
                                                                item.docId
                                                            );
                                                        }}
                                                    >
                                                        Exporta a Excel
                                                    </Button>
                                                </Box>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </div>
                    )}
                </>
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

export default CreateReport;
