
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
        const auxArray = []
        const array = await getAllDocList()

        console.log("auxArray", auxArray)
    }


    /*    async function getNameAdmin(uid) {
           try {
               const getNameAdmin = await getNameAdminFirebase(uid)
               console.log("getNameAdmin", getNameAdmin)
           } catch (error) {
               console.log(error);
           }
       }
   
       async function getNameEmployer(uid) {
           try {
               const getNameEmployer = await getNameEmployerFirebase(uid)
               console.log("argetNameEmployerray", getNameEmployer)
           } catch (error) {
               console.log(error);
           }
       } */


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

                <div className="container">
                    <CDGeneratorListAll getAllPedidos={getAllPedidos} />
                    {listOrder === null ? <h1>es null</h1> : <h1> existe la lista</h1>}

                    <div>

                        {listOrder === null ? <h1> nada</h1> : <div>
                            {listOrder.map((item) => {




                                return (
                                    <div>
                                        <Typography sx={{ m: 1 }} variant="h5">
                                            Lista : {item.createdAt}
                                        </Typography>
                                        <Typography sx={{ m: 1 }} variant="h5">
                                            Admin : {name1}
                                        </Typography>

                                        <Typography sx={{ m: 1 }} variant="h5">
                                            Empleado :{name2}
                                        </Typography>

                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nro.</TableCell>
                                                    <TableCell>Prod</TableCell>
                                                    <TableCell>Cantidad</TableCell>
                                                </TableRow>
                                            </TableHead>

                                        </Table>
                                    </div>

                                )

                            })}

                        </div>}

                    </div>







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
