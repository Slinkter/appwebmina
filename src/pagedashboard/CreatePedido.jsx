import React, { useEffect, useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import AuthProvider from "../components/AuthProvider";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Box,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

//
import {
    Avatar,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { getNewOrden } from "../firebase/firebase";
import UILoading from "../components/UILoading";

function CreatePedido() {
    const navigate = useNavigate();
    //
    const [products, setProducts] = useState({});
    const [employers, setEmployers] = useState({});
    //
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentEmployer, setCurrentEmployer] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);
    //

    useEffect(() => {
        getAll();

        async function getAll() {
            try {
                const { ref1, ref2 } = await getNewOrden();
                setEmployers(ref1);
                setProducts(ref2);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    async function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(1);
        const { ref1, ref2 } = await getNewOrden();
        setEmployers(ref1);
        setProducts(ref2);
    }

    function handleUserNotRegister(user) {}

    function handleUserNotLoggedIn() {}

    if (state === 0) {
        return (
            <AuthProvider
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
                </Box>
            </AuthProvider>
        );
    }

    function handleDni() {}

    function handleName() {}

    const handleSubmit = () => {};

    const handleChangeEmployer = (e) => {
        const dni = parseInt(e.target.value);

        employers.filter((item) => {
            if (item.dni === dni) {
                setCurrentEmployer(item);
                return item;
            }
        });
    };

    const handleChangeProducto = (e) => {
        console.log("handleChangeProducto", e.target.value);
        const docIdProducto = e.target.value;
        products.filter((item) => {
            if (item.docId === docIdProducto) {
                console.log("item.docId : ", item.docId);
                console.log("docIdProducto : ", docIdProducto);
                setCurrentProduct(item);
            }
        });
    };

    return (
        <DashboardWrapper>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    minHeight: "100%",
                }}
            >
                <Container maxWidth="sm">
                    <form>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h3">
                                Crear Orden
                            </Typography>
                        </Box>

                        <Box sx={{ py: 2 }}>
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    m: -1,
                                }}
                            >
                                <Typography sx={{ m: 1 }} variant="h4">
                                    Empleado
                                </Typography>
                                <Box sx={{ m: 1 }}>
                                    <Button color="primary" variant="contained">
                                        Limpiar
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        <TextField
                            margin="normal"
                            fullWidth
                            select
                            SelectProps={{ native: true }}
                            variant="outlined"
                            onChange={handleChangeEmployer}
                        >
                            {employers.length > 0
                                ? employers.map((option) => (
                                      <option
                                          key={option.docId}
                                          value={option.dni}
                                      >
                                          [ DNI:{option.dni}] - [
                                          {option.firstName} {option.lastName}]
                                      </option>
                                  ))
                                : null}
                        </TextField>

                        {currentEmployer !== null ? (
                            <TextField
                                fullWidth
                                disabled
                                margin="normal"
                                name="nameproduct"
                                value={currentEmployer.dni}
                                variant="outlined"
                            />
                        ) : (
                            <TextField
                                fullWidth
                                disabled
                                margin="normal"
                                name="detail"
                                variant="outlined"
                            />
                        )}

                        {currentEmployer !== null ? (
                            <TextField
                                fullWidth
                                disabled
                                margin="normal"
                                name="detail"
                                value={currentEmployer.firstName}
                                variant="outlined"
                            />
                        ) : (
                            <TextField
                                fullWidth
                                disabled
                                margin="normal"
                                name="detail"
                                variant="outlined"
                            />
                        )}

                        <Box sx={{ py: 2 }}>
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    m: -1,
                                }}
                            >
                                <Typography sx={{ m: 1 }} variant="h4">
                                    Producto
                                </Typography>
                                <Box sx={{ m: 1 }}>
                                    <Button color="primary" variant="contained">
                                        Agregar
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        <TextField
                            margin="normal"
                            fullWidth
                            name="area"
                            select
                            SelectProps={{ native: true }}
                            variant="outlined"
                            onChange={handleChangeProducto}
                        >
                            {products.length > 0
                                ? products.map((option) => (
                                      <option
                                          key={option.docId}
                                          value={option.docId}
                                      >
                                          {option.nameproduct}
                                      </option>
                                  ))
                                : null}
                        </TextField>

                        {currentProduct !== null ? (
                            <TextField
                                fullWidth
                                disabled
                                margin="normal"
                                name="codigo"
                                type="number"
                                value={currentProduct.cantidad}
                                variant="outlined"
                            />
                        ) : (
                            <TextField
                                fullWidth
                                label="Stock actual"
                                disabled
                                margin="normal"
                                type="number"
                                variant="outlined"
                            />
                        )}

                        {currentProduct !== null ? (
                            <TextField
                                fullWidth
                                margin="normal"
                                name="codigo"
                                type="number"
                                variant="outlined"
                                label="Escribir cantidad"
                            />
                        ) : (
                            <TextField
                                label="Escribir cantidad"
                                fullWidth
                                disabled
                                margin="normal"
                                name="codigo"
                                type="number"
                                variant="outlined"
                            />
                        )}
                    </form>
                </Container>
            </Box>

            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    minHeight: "100%",
                }}
            >
                <Container maxWidth="sm">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>cod.</TableCell>
                                <TableCell>Producto</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>123</TableCell>
                                <TableCell>Seguro</TableCell>
                                <TableCell>5 </TableCell>
                                <TableCell>
                                    <Button
                                        startIcon={
                                            <DeleteIcon fontSize="small" />
                                        }
                                        sx={{ mr: 1 }}
                                    ></Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Box sx={{ py: 2 }}>
                        <Button
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Guardar
                        </Button>
                    </Box>
                </Container>
            </Box>
        </DashboardWrapper>
    );
}

export default CreatePedido;
