import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getNewOrden, updateStock } from "../firebase/firebase";
import UILoading from "../components/UILoading";
import { connectStorageEmulator } from "firebase/storage";
import { async } from "@firebase/util";

function CreatePedido() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    //
    const [employers, setEmployers] = useState({});
    const [products, setProducts] = useState({});
    //
    const [currentUser, setCurrentUser] = useState(null);
    //
    const [currentSelectEmployer, setCurrentSelectEmployer] = useState(null);
    const [currentSelectProduct, setCurrentSelectProduct] = useState(null);
    const [listItem, setListItem] = useState([]);
    const [item, setItem] = useState(null);
    const [count, setCount] = useState("");

    useEffect(() => {
        getAll();

        async function getAll() {
            try {
                loadInit()
            } catch (error) {
                console.error(error);
            }
        }
    }, [setListItem, item, setItem]);

    function handleAddItem() {
        console.group("handleAddItem");
        const cantidad = parseInt(count);

        if (Number.isNaN(cantidad) || cantidad === 0) {
            alert("Error al ingresar");
            currentSelectProduct.cantidad = 0;
            setCurrentSelectProduct(currentSelectProduct);
            setCount(0);
        } else {
            if (cantidad > currentSelectProduct.cantidad) {
                alert(" no hay stock !!!");
                console.log(" no puede ser mayor al stock");
            } else {
                console.log(" hay stock");
                console.log("cantidad ingresada ", cantidad);
                console.log(
                    "currentSelectProduct",
                    " = ",
                    currentSelectProduct
                );
                // actualizar el stock (decontar  en local )
                console.log("Lista de Productos =>  ", products);
                console.log("Pre descuento");
                const currentStockFirebase = currentSelectProduct.cantidad
                const uptatecount = currentSelectProduct.cantidad - cantidad;

                const newProduct = products.map((item) => {
                    if (item.docId === currentSelectProduct.docId) {
                        item.cantidad = uptatecount;
                    }
                    return item;
                });
                console.log("Post descuento");
                console.log("products =>", products);
                console.log("newProduct =>", newProduct);
                currentSelectProduct.cantidad = uptatecount;
                // Create Item
                const newItem = {};
                newItem.docId = currentSelectProduct.docId;
                newItem.nameproduct = currentSelectProduct.nameproduct;
                newItem.cantidad = parseInt(cantidad);
                newItem.currentStockFirebase = currentStockFirebase
                // Add Item to Array
                listItem.push(newItem);
                // Upadate listITem
                setListItem(listItem);
                // Set cantidad
                setCount(0);
                console.log("newItem", newItem);
                console.log(listItem);
            }
        }
        console.groupEnd();
    }

    async function loadInit() {
        const { ref1, ref2 } = await getNewOrden();
        ref1.unshift("seleccione");
        ref2.unshift({});

        console.log(
            "ref1 : ",
            ref1[1].docId,
            ref1[1].dni,
            ref1[1].firstName
        );
        console.group("Ref 01 ");
        ref1.map((item) => {
            console.log(item.dni, item);
        });
        console.groupEnd();
        console.group("Ref 02 ");
        ref2.map((item) => {
            console.log(item.nameproduct, "=>", item);
        });
        console.groupEnd();
        setEmployers(ref1);
        setProducts(ref2);

    }

    const handleSubmit = () => {
        console.group("handleSubmit");

        if (currentSelectEmployer === null || listItem.length === 0) {
            alert("falta ingresar datos");
        } else {
            console.log("currentSelectEmployer : ", currentSelectEmployer);
            console.log("Lista de producto seleccionado :", listItem);
            // actualizar el stock en firebase
            // se toma el docID en un for
            // cuando se tiene un for
            listItem.map(item => {
                updateDecreaseStockProduct(item.docId, item.currentStockFirebase, item.cantidad)
            })

        }
        console.groupEnd("handleSubmit");
    };


    async function updateDecreaseStockProduct(docId, stock, cantidad) {
        await updateStock(docId, stock, cantidad)
    }



    const handleChangeEmployer = (e) => {
        console.group("handleChangeEmployer");
        console.log("value : ", e.target.value);
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
        console.groupEnd();
    };

    const handleChangeProducto = (e) => {
        console.group("handleChangeProducto");
        const docIdProducto = e.target.value;
        console.log("docIdProducto : ", docIdProducto);
        if (docIdProducto === "Selecione Producto") {
            console.log("hola");
        }
        try {
            const rpta = products.filter((item) => {
                if (item.docId === docIdProducto) {
                    console.log("item.docId === docIdProducto ");
                    return item;
                }
                return null;
            });
            console.log("rpta = ", rpta);
            if (rpta.length === 1) {
                setCount(0);
                setCurrentSelectProduct(rpta[0]);
            } else {
                setCount(0);
                setCurrentSelectProduct(null);
            }
        } catch (error) {
            console.error(error);
        }
        console.groupEnd();
    };

    async function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(1);
    }

    function handleUserNotRegister(user) { }

    function handleUserNotLoggedIn() { }

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
                                                    : "Selecione Empleado"}
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
                                                {option.nameproduct
                                                    ? option.nameproduct
                                                    : "Selecione Producto"}
                                            </option>
                                        ))
                                        : null}
                                </TextField>
                                {/* mostrar stock*/}
                                {currentSelectProduct !== null ? (
                                    <TextField
                                        fullWidth
                                        disabled
                                        helperText={"Stock actual"}
                                        margin="normal"
                                        name="codigo"
                                        type="number"
                                        value={currentSelectProduct.cantidad}
                                        variant="outlined"
                                    />
                                ) : (
                                    <TextField
                                        helperText={"Stock actual"}
                                        fullWidth
                                        value={0}
                                        disabled
                                        margin="normal"
                                        type="number"
                                        variant="outlined"
                                    />
                                )}
                                {/* ingresar cantidad */}
                                {currentSelectProduct !== null ? (
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="cantidad"
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
                                        value={0}
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
                                        Orden de Pedido
                                    </Typography>
                                    <Box sx={{ m: 1 }}>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            onClick={() => {
                                                setListItem([])
                                                window.location.reload(false);

                                            }}
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
