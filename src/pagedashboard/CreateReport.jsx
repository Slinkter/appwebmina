import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as XLSX from "xlsx";

import DashboardWrapper from "../components/DashboardWrapper";
import CDGeneratorListAll from "../PageReports/UI/CDGeneratorListAll";
import CardPedido from "../components/CardPedido";

import {
    getAllDocList,
    getNameAdminFirebase,
    getNameEmployerFirebase,
} from "../firebase/firebase";

import "../style/CreateReport.css";

function CreateReport() {
    const [listOrder, setListOrder] = useState(null);

    useEffect(() => {
        async function getAllPedidos() {
            try {
                // Obtener la lista de documentos
                const array = await getAllDocList();

                // Actualizar la lista con nombres de administrador y empleado
                const newArray = await Promise.all(
                    array.map(async (item) => {
                        item.nameAdmin = await getNameAdmin(item.userUID);
                        item.nameEmployer = await getNameEmployer(
                            item.empleadoUID
                        );
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
        getAllPedidos();
    }, []);

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

    return (
        <DashboardWrapper>
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1 className="h2_title">Generar reporte</h1>
                <>
                    {listOrder === null ? (
                        <h1> espero cargando </h1>
                    ) : (
                        <div>
                            <CardPedido
                                listOrder={listOrder}
                                handleBtnExport={handleBtnExport}
                            />
                        </div>
                    )}
                </>
            </Box>
        </DashboardWrapper>
    );
}

export default CreateReport;
