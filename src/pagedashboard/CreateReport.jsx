import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import AuthProvider from "../components/AuthProvider";
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

    function handleBtnExport(id) {
        const fileName = id;
        const fileExtension = "xlsx";
        const elt = document.getElementById(id);
        let wb = XLSX.utils.book_new();
        wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
        XLSX.writeFile(wb, `${fileName}.${fileExtension}`);
    }
    /*  */

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
                        {listOrder?.map((item) => {
                            return <div>{item.docId}</div>;
                        })}
                    </div>
                )}
            </>
        </DashboardWrapper>
    );
}

export default CreateReport;
