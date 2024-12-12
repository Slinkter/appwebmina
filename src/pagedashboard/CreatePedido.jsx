import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import DashboardWrapper from "../components/DashboardWrapper";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthProvider from "../components/AuthProvider";

//
import {
    Button,
    Box,
    Container,
    TextField,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import { getNewOrden, saveAllList, updateStock } from "../firebase/firebase";
import UILoading from "../components/UILoading";

function CreatePedido() {
    const [state, setState] = useState(0);
    const navigate = useNavigate();
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
    }, [setCurrentSelectProduct, setProducts]);

    async function getAll() {
        console.log("-----------> getAll() ");

        try {
            loadInit();
        } catch (error) {
            console.error(error);
        }
    }

    async function loadInit() {
        const { ref1, ref2 } = await getNewOrden();
        ref1.unshift({});
        ref2.unshift({});

        setEmployers(ref1);
        setProducts(ref2);
    }

    function handleAddItem() {
        console.group("handleAddItem");
        const cantidad = parseInt(count);

        if (Number.isNaN(cantidad) || cantidad === 0 || cantidad < 0) {
            alert("Error : solo numero entero ");
            setCurrentSelectProduct(currentSelectProduct);
            setCount(0);
        } else {
            if (cantidad > currentSelectProduct.cantidad) {
                alert(" no hay stock !!!");
                console.log(" no puede ser mayor al stock");
            } else {
                console.log(" hay stock");
                console.log("cantidad ingresada ", cantidad);

                const currentStockFirebase = currentSelectProduct.cantidad;
                const uptatecount = currentSelectProduct.cantidad - cantidad;
                currentSelectProduct.cantidad = uptatecount;
                // Create Item
                const newItem = {};
                newItem.docId = currentSelectProduct.docId;
                newItem.nameproduct = currentSelectProduct.nameproduct;
                newItem.cantidad = parseInt(cantidad);
                newItem.currentStockFirebase = currentStockFirebase;
                // Add Item to Array
                setListItem([...listItem, newItem]);
                // Set cantidad
                setCount(0);
                console.log("newItem", newItem);
                console.log(listItem);
            }
        }
        console.groupEnd();
    }

    const handleSubmit = () => {
        console.group("handleSubmit");

        if (currentSelectEmployer === null || listItem.length === 0) {
            console.log(currentSelectEmployer);
            console.log(listItem.length);
            alert("falta ingresar datos");
        } else {
            listItem.map((item) =>
                updateDecreaseStockProduct(
                    item.docId,
                    item.currentStockFirebase,
                    item.cantidad
                )
            );

            saveAllListProductEmployerByUser(
                currentSelectEmployer,
                listItem,
                currentUser
            );
            navigate("/dashboard");
        }
        console.groupEnd("handleSubmit");
    };

    async function saveAllListProductEmployerByUser(empleado, list, user) {
        const daycreated = new Date().toLocaleString("sv");
        saveAllList(daycreated, user.uid, empleado.docId, list);
    }

    async function updateDecreaseStockProduct(docId, stock, cantidad) {
        await updateStock(docId, stock, cantidad);
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
        const docIdProducto = e.target.value;
        console.group("handleChangeProducto");
        console.log("docIdProducto : ", docIdProducto);
        if (docIdProducto === "Selecione Producto") {
            setCurrentSelectProduct(null);
            return;
        }
        try {
            const isProductFound = products.filter((item) => {
                if (item.docId === docIdProducto) {
                    return item;
                }
                return null;
            });
            console.log("isProductFound = ", isProductFound);
            if (isProductFound.length !== 1) {
                setCurrentSelectProduct(null);
                setCount(0);
            } else {
                setCurrentSelectProduct(isProductFound[0]);
                setCount(0);
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

    function handleUserNotRegister(user) {}

    function handleUserNotLoggedIn() {}

    if (state === 0) {
        return (
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >
                <UILoading />
            </AuthProvider>
        );
    }

    return (
        <DashboardWrapper>
            <Box
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
                                    <Typography variant="h2">
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
                                    variant="standard"
                                    SelectProps={{ native: true }}
                                    onChange={handleChangeEmployer}
                                >
                                    {employers.length > 0
                                        ? employers.map((obj) => (
                                              <option
                                                  key={obj.docId}
                                                  value={obj.dni}
                                              >
                                                  {obj.dni
                                                      ? obj.dni +
                                                        " : " +
                                                        obj.firstName +
                                                        " " +
                                                        obj.lastName
                                                      : "Selecione Empleado"}
                                              </option>
                                          ))
                                        : null}
                                </TextField>

                                <Box sx={{ py: 3 }}>
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
                                    </Box>
                                </Box>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="area"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="standard"
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
                                        label={"Stock actual"}
                                        margin="normal"
                                        name="codigo"
                                        type="number"
                                        value={currentSelectProduct.cantidad}
                                        variant="outlined"
                                    />
                                ) : (
                                    <TextField
                                        label={"Stock actual"}
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

                                {/*  <SelectTextFields /> */}

                                <Box sx={{ m: 1 }}>
                                    <Button
                                        fullWidth
                                        color="success"
                                        variant="contained"
                                        onClick={() => {
                                            handleAddItem();
                                        }}
                                    >
                                        Agregar
                                    </Button>
                                </Box>
                            </form>
                        </Container>

                        <Container maxWidth="sm">
                            <Box sx={{ py: 2 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        m: 0,
                                    }}
                                >
                                    <Typography sx={{ m: 1 }} variant="h4">
                                        Lista
                                    </Typography>
                                    <Box sx={{ m: 1 }}>
                                        <Button
                                            type="submit"
                                            color="warning"
                                            variant="contained"
                                            onClick={() => {
                                                setCurrentSelectProduct(null);
                                                setProducts([]);
                                                setListItem([]);
                                                loadInit();
                                            }}
                                        >
                                            Limpiar
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            {/*  */}
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
                                                {item.cantidad}
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
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="error"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        navigate("/dashboard");
                                    }}
                                >
                                    Salir
                                </Button>
                            </Box>
                        </Container>
                    </CardContent>
                </Card>
                <Box></Box>
            </Box>
        </DashboardWrapper>
    );
}

export default CreatePedido;

const currencies = [
    {
        value: "USD",
        label: "$",
    },
    {
        value: "EUR",
        label: "€",
    },
    {
        value: "BTC",
        label: "฿",
    },
    {
        value: "JPY",
        label: "¥",
    },
];

function SelectTextFields() {
    return (
        <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 0, width: "100%" } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label="Select"
                    defaultValue="EUR"
                    helperText="Please select your currency"
                    select
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}
