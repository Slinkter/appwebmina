
import React, { useEffect, useState } from "react";
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
import { async } from "@firebase/util";

function CreateReport() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [listOrder, setListOrder] = useState(null)

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

                <h1 className="h2_title">
                    Generar reporte

                </h1>

                <div className="">
                    <CDGeneratorListAll label={"GENERAR"} metodo={"Lista de Pedido"} getAllPedidos={getAllPedidos} />

                    {listOrder === null ? <h1> </h1> : <div>
                        {listOrder.map((item) => {

                            return (
                                <Box key={item.docId} sx={{ m: 1 }}
                                >
                                    <Card sx={{ height: "100%" }} margin="normal">
                                        <CardContent>
                                            <Typography sx={{ m: 1 }} variant="h5">
                                                Fecha : {item.createdAt}
                                            </Typography>
                                            <Typography sx={{ m: 1 }} variant="h5">
                                                Admin : {item.nameAdmin}
                                            </Typography>

                                            <Typography sx={{ m: 1 }} variant="h5">
                                                Empleado :{item.nameEmployer}
                                            </Typography>

                                            <Table>
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
