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

function CreatePedido() {
    const navigate = useNavigate();
    const [products, setProducts] = useState({});
    const [employers, setEmployers] = useState({});
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [currentEmployer, setCurrentEmployer] = useState({});
    const [dniEmployer, setDniEmployer] = useState({});

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
    }

    function handleUserNotRegister(user) {}

    function handleUserNotLoggedIn() {}

    if (state === 1) {
        return (
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >
                <div>Loading... </div>
            </AuthProvider>
        );
    }

    function handleDni() {}

    function handleName() {}

    const handleSubmit = () => {};

    const handleChangeEmployer = (e) => {
        const dni = parseInt(e.target.value);
        setDniEmployer(dni);
        const obj = employers.filter((item) => {
            if (item.dni === dni) {
                setCurrentEmployer(item);
                return item;
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

                        <TextField
                            fullWidth
                            disabled
                            margin="normal"
                            name="nameproduct"
                            value={currentEmployer.dni}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            disabled
                            margin="normal"
                            name="detail"
                            value={currentEmployer.firstName}
                            variant="outlined"
                        />

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
                        >
                            {products.length > 0
                                ? products.map((option) => (
                                      <option
                                          key={option.docId}
                                          value={option.nameproduct}
                                      >
                                          {option.nameproduct}
                                      </option>
                                  ))
                                : null}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Stock actual"
                            disabled
                            margin="normal"
                            name="codigo"
                            type="number"
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Cantidad"
                            disabled
                            margin="normal"
                            name="codigo"
                            type="number"
                            variant="outlined"
                        />
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
