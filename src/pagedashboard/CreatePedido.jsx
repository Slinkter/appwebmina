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
    CardContent,
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
    const [employers, setEmployers] = useState({});
    const [products, setProducts] = useState({});
    //
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentSelectEmployer, setCurrentSelectEmployer] = useState(null);
    const [currentSelectProduct, setCurrentSelectProduct] = useState(null);
    const [listItem, setListItem] = useState([]);
    const [item, setItem] = useState(null);
    const [count, setCount] = useState("");

    useEffect(() => {
        getAll();

        async function getAll() {
            try {
                const { ref1, ref2 } = await getNewOrden();

                ref1.unshift("seleccione");
                ref2.unshift("seleccione");
                console.log("ref1 : ", ref1);
                console.log("ref2 : ", ref2);
                setEmployers(ref1);
                setProducts(ref2);
            } catch (error) {
                console.error(error);
            }
        }
    }, [setListItem, item, count, setItem]);

    useEffect(() => {}, [setListItem, item, count, setItem]);

    function handleAddItem() {
        console.log("currentSelectProduct - 1 ", currentSelectProduct);
        const cantidad = parseInt(count);

        if (cantidad > currentSelectProduct.cantidad) {
            console.log(" no puede ser mayor al stock");
        } else {
            console.log(" hay stock");
            // actualizar el stock (decontar )
            console.log("Array products ", products);

            const uptatecount = currentSelectProduct.cantidad - cantidad;
            products.map((item) => {
                if (item.docId === currentSelectProduct.docId) {
                    item.cantidad = uptatecount;
                }
            });
            console.log("products ", products);
            currentSelectProduct.cantidad = uptatecount;
            console.log("currentSelectProduct -2 ", currentSelectProduct);
            ///
            const newItem = {};
            newItem.docId = currentSelectProduct.docId;
            newItem.nameproduct = currentSelectProduct.nameproduct;
            newItem.cantidad = parseInt(cantidad);
            console.log("newItem", newItem);
            listItem.push(newItem);
            setListItem(listItem);
            console.log(listItem);
            setCount("");
        }
    }

    const handleSubmit = () => {
        console.log("handleSubmit");
        console.log("currentSelectEmployer : ", currentSelectEmployer);
        console.log("Lista de producto seleccionado :", listItem.length);

        if (currentSelectEmployer === null || listItem.length === 0) {
            alert("falta ingresar datos");
            console.log("currentSelectEmployer : ", currentSelectEmployer);
            console.log("Lista de producto seleccionado :", listItem.length);
        }
    };

    const handleChangeEmployer = (e) => {
        console.log("handleChangeEmployer");
        console.log(e.target.value);
        const dni = parseInt(e.target.value);

        if (Number.isNaN(dni)) {
            // 👉️ this runs only if NaN and type of number
            console.log("no hacer nada ");
            setCurrentSelectEmployer(null);
        } else {
            employers.filter((item) => {
                if (item.dni === dni) {
                    setCurrentSelectEmployer(item);
                    return item;
                }
                return null;
            });
        }
    };

    const handleChangeProducto = (e) => {
        console.log("handleChangeProducto", e.target.value);
        const docIdProducto = e.target.value;
        products.filter((item) => {
            if (item.docId === docIdProducto) {
                console.log("item.docId : ", item.docId);
                console.log("docIdProducto : ", docIdProducto);
                setCurrentSelectProduct(item);
            }
        });
    };

    async function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(1);
        /*     const { ref1, ref2 } = await getNewOrden();
        setEmployers(ref1);
        setProducts(ref2); */
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

    return (
        <DashboardWrapper>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexGrow: 1,
                }}
            >
                <Card>
                    <CardContent>
                        <Container maxWidth="sm">
                            <form>
                                <Box sx={{ my: 3 }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h4"
                                    >
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
                                                  {option.dni
                                                      ? option.dni
                                                      : "Selecione DNI"}
                                                  {" : "}
                                                  {option.firstName
                                                      ? option.firstName
                                                      : ""}
                                                  {"  "}
                                                  {option.lastName
                                                      ? option.lastName
                                                      : ""}
                                              </option>
                                          ))
                                        : null}
                                </TextField>

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
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                onClick={() => {
                                                    handleAddItem();
                                                }}
                                            >
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

                                {currentSelectProduct !== null ? (
                                    <TextField
                                        fullWidth
                                        disabled
                                        margin="normal"
                                        name="codigo"
                                        type="number"
                                        value={currentSelectProduct.cantidad}
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

                                {currentSelectProduct !== null ? (
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="codigo"
                                        type="number"
                                        variant="outlined"
                                        label="Escribir cantidad"
                                        value={count}
                                        onChange={(e) =>
                                            setCount(e.target.value)
                                        }
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

                        <Container maxWidth="sm">
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
                                        lista
                                    </Typography>
                                    <Box sx={{ m: 1 }}>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                        >
                                            Limpiar
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
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
                                    {listItem.map((item) => (
                                        <TableRow>
                                            <TableCell>
                                                {item.docId.substring(1, 4)}
                                            </TableCell>
                                            <TableCell>
                                                {item.nameproduct}
                                            </TableCell>
                                            <TableCell>
                                                {item.cantidad}{" "}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    startIcon={
                                                        <DeleteIcon fontSize="small" />
                                                    }
                                                    sx={{ mr: 1 }}
                                                ></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </Container>
                    </CardContent>
                </Card>
            </Box>
        </DashboardWrapper>
    );
}

export default CreatePedido;
