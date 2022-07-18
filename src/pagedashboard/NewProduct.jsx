import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { addNewProduct } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import UILoading from "../components/UILoading";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Container,
    FormHelperText,
    Typography,
} from "@mui/material";

function NewProduct() {
    //
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    //
    const initvalue = {
        nameproduct: "",
        detail: "",
        category: "",
        cantidad: "",
    };
    const inityup = {
        nameproduct: Yup.string().max(150).required("campo faltante "),
        detail: Yup.string().max(150).required("campo faltante "),
        category: Yup.string().max(150).required("campo faltante"),
        cantidad: Yup.string().max(150).required("campo faltante"),
    };
    //
    const formik = useFormik({
        initialValues: initvalue,
        validationSchema: Yup.object(inityup),
        onSubmit: (values) => {
            values.userUid = currentUser.uid;
            values.id = uuidv4();
            values.createdAt = new Date().toISOString();
            console.log(JSON.stringify(values, null, 2));
            saveProduct(values);
            navigate("/dashboard");
        },
    });
    //

    async function saveProduct(values) {
        await addNewProduct(values);
    }

    function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(2);
    }

    function handleUserNotRegister(user) {
        navigate("/login");
    }

    function handleUserNotLoggedIn() {
        navigate("/login");
    }

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
                            <form onSubmit={formik.handleSubmit}>
                                <Box sx={{ pt: 2 }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h4"
                                    >
                                        Crear producto
                                    </Typography>
                                </Box>

                                <TextField
                                    error={Boolean(
                                        formik.touched.nameproduct &&
                                            formik.errors.nameproduct
                                    )}
                                    helperText={
                                        formik.touched.nameproduct &&
                                        formik.errors.nameproduct
                                    }
                                    fullWidth
                                    label="Nombre Producto"
                                    margin="normal"
                                    name="nameproduct"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.nameproduct}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(
                                        formik.touched.detail &&
                                            formik.errors.detail
                                    )}
                                    fullWidth
                                    helperText={
                                        formik.touched.detail &&
                                        formik.errors.detail
                                    }
                                    label="Detalle del producto"
                                    margin="normal"
                                    name="detail"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.detail}
                                    variant="outlined"
                                />

                                <TextField
                                    error={Boolean(
                                        formik.touched.category &&
                                            formik.errors.category
                                    )}
                                    fullWidth
                                    helperText={
                                        formik.touched.category &&
                                        formik.errors.category
                                    }
                                    label="Categoria"
                                    margin="normal"
                                    name="category"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.category}
                                    variant="outlined"
                                />

                                <TextField
                                    error={Boolean(
                                        formik.touched.lastName &&
                                            formik.errors.lastName
                                    )}
                                    fullWidth
                                    helperText={
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                    }
                                    label="Cantidad"
                                    margin="normal"
                                    name="cantidad"
                                    type="number"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    variant="outlined"
                                />

                                <Box sx={{ py: 2 }}>
                                    <Button
                                        margin="normal"
                                        color="primary"
                                        disabled={formik.isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Guardar
                                    </Button>
                                </Box>
                            </form>
                        </Container>
                    </CardContent>
                </Card>
            </Box>
        </DashboardWrapper>
    );
}

export default NewProduct;
