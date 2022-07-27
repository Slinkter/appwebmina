
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import {
    Avatar,
    Button,
    Box,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Grid,
} from "@mui/material";
//
import CDGeneratorListAll from "../PageReports/UI/CDGeneratorListAll";

//
import UILoading from "../components/UILoading";
import { getAllDocList, getNameAdminFirebase, getNameEmployerFirebase } from "../firebase/firebase";

//
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SendIcon from '@mui/icons-material/Send';
//
import "../style/CreateReport.css"
// export data excel 2
import * as XLSX from 'xlsx';

function CreateReport() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [listOrder, setListOrder] = useState(null)
    const btnRefExcel = useRef(null)

    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")


    useEffect(() => {



    }, [name1, name2])


    async function getAllPedidos() {

        const array = await getAllDocList()
        const updateArray = await Promise.all(array.map(async (item) => {
            item.nameAdmin = await getNameAdmin(item.userUID)
            item.nameEmployer = await getNameEmployer(item.empleadoUID)
            return await item;
        }))
        console.log("updateArray", updateArray)
        setListOrder(updateArray)

    }


    async function getNameAdmin(uid) {
        try {
            const getNameAdmin = await getNameAdminFirebase(uid)
            /*   console.log("getNameAdmin", getNameAdmin) */
            return getNameAdmin;

        } catch (error) {
            console.log(error);
        }
    }

    async function getNameEmployer(uid) {
        try {
            const getNameEmployer = await getNameEmployerFirebase(uid)
            /*   console.log("argetNameEmployerray", getNameEmployer) */
            return getNameEmployer;

        } catch (error) {
            console.log(error);
        }
    }

    function generateExcel(id) {
        //getting data from our table

        /*  var data_type = 'data:application/vnd.ms-excel'; */
        var data_type = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        /* var table_div = document.getElementById('table_with_data'); */
        var table_div = document.getElementById(id);
        var table_html = table_div.outerHTML.replace(/ /g, '%20');

        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        /*  a.download = '.xls'; */
        /*  a.download = `${id}.xls` */
        /*  a.download = `${id}.xls` */
        a.setAttribute('download', `${id}.xls`,)


        console.log("a", a);
        console.log("a.href", a.href);
        console.log("a.download", a.download);
        a.click();
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
    //
    function handleBtnExport(id) {
        const fileName = id
        const fileExtension = 'xlsx'
        var elt = document.getElementById(id);
        var wb = XLSX.utils.book_new();
        wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
        return XLSX.writeFile(wb, fileName + "." + fileExtension || ('MySheetName.' + (fileExtension || 'xlsx')));

    }

    if (state === 2) {
        return (
            <DashboardWrapper>

                <h1 className="h2_title">
                    Generar reporte

                </h1>

                <div className="">
                    <CDGeneratorListAll label={"GENERAR"} metodo={"Lista de Pedido"} getAllPedidos={getAllPedidos} />

                    {listOrder === null ? <h1> </h1> : <div>
                        {listOrder.map((item) => {

                            return (
                                <Box
                                    key={item.docId}
                                    sx={{ mt: 1, mb: 1 }}
                                >
                                    <Card sx={{ height: "100%" }}>
                                        <CardContent>

                                            <div className="containerCR">
                                                <div>
                                                    <Table id={item.docId}>
                                                        <Typography sx={{ m: 1 }} variant="h6">
                                                            Fecha : {item.createdAt}
                                                        </Typography>
                                                        <Typography sx={{ m: 1 }} variant="h6">
                                                            Admin : {item.nameAdmin}
                                                        </Typography>

                                                        <Typography sx={{ m: 1 }} variant="h6">
                                                            Empleado :{item.nameEmployer}
                                                        </Typography>

                                                        <div hidden >
                                                            <TableRow >
                                                                <TableCell>
                                                                    Fecha : {item.createdAt}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow >
                                                                <TableCell>
                                                                    Admin : {item.nameAdmin}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow >
                                                                <TableCell>
                                                                    Fecha : {item.createdAt}
                                                                </TableCell>

                                                            </TableRow>
                                                        </div>

                                                        <Table id="table_with_data">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Cod.</TableCell>
                                                                    <TableCell>Prod</TableCell>
                                                                    <TableCell>Cantidad</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {item.item.map((item) => (
                                                                    <TableRow >
                                                                        <TableCell>
                                                                            {item.docId.substring(1, 4)}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {item.nameproduct}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {item.cantidad}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>

                                                        </Table>


                                                    </Table>
                                                </div>


                                                <Box sx={{ mt: 2, mb: 1 }} >
                                                    <Button
                                                        fullWidth
                                                        margin="normal"
                                                        color="success"
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        onClick={() => { handleBtnExport(item.docId) }}> Exporta a Excel </Button>
                                                </Box>
                                            </div>




                                        </CardContent>
                                    </Card>
                                </Box>

                            )

                        })}

                    </div>}







                </div>
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
                <UILoading />DashboardView
            </Box>

        </AuthProvider>
    );

}

export default CreateReport;
   /* {<ReactHTMLTableToExcel
 
id="export-button"
table={item.docId}
filename={item.docId}
sheet="pagina"
buttonText=" Export a Excel" />}  */