import React, { useState, useEffect } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
// MUI

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
import { addNewEmployer } from "../firebase/firebase";
import UILoading from "../components/UILoading";

const areainput = [
    {
        value: "a1",
        label: "Area 1",
    },
    {
        value: "a2",
        label: "Area 2",
    },
    {
        value: "a3",
        label: "Area 3",
    },
];

function NewEmployer() {
    //
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

    const initvalue = {
        firstName: "",
        lastName: "",
        dni: "",
        phone: "",
        email: "",
        area: "",
    };

    const inityup = {
        firstName: Yup.string()
            .max(25, " el limite es de 25 caracteres")
            .required("campo faltante "),
        lastName: Yup.string()
            .max(25, " el limite es de 25 caracteres")
            .required("campo faltante "),
        dni: Yup.string()
            .max(8, "el limite es 8 digitos ")
            .required("campo faltante"),
        phone: Yup.string()
            .max(12, " el limite es de 12 caracteres")
            .required("campo faltante"),
        email: Yup.string()
            .max(40, " el limite es de 40 caracteres")
            .required("campo faltante"),
        area: Yup.string()
            .max(20, " el limite es de 20 caracteres")
            .required("campo faltante"),
    };

    const formik = useFormik({
        initialValues: initvalue,
        validationSchema: Yup.object(inityup),
        onSubmit: (values) => {
            values.adminUid = currentUser.uid;
            values.createdAt = new Date().toISOString();
            console.log(JSON.stringify(values, null, 2));
            saveEmployer(values);
            navigate("/dashboard");
        },
    });

    async function saveEmployer(values) {
        const rpta = await addNewEmployer(values);
        console.log(rpta);
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

    useEffect(() => {
        console.log("areainput", areainput);
    }, []);

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
            <Box display="flex" justifyContent="center" alignItems="center">
                <Card>
                    <CardContent>
                        <Container maxWidth="sm">
                            <form onSubmit={formik.handleSubmit}>
                                <Box sx={{ pt: 2 }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h4"
                                    >
                                        Crear empleado
                                    </Typography>
                                </Box>

                                <TextField
                                    error={Boolean(
                                        formik.touched.firstName &&
                                            formik.errors.firstName
                                    )}
                                    helperText={
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                    }
                                    margin="normal"
                                    fullWidth
                                    label="Nombres"
                                    name="firstName"
                                    required
                                    type="text"
                                    variant="outlined"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    sx={{ input: { color: "white" } }}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Apellidos"
                                    name="lastName"
                                    required
                                    variant="outlined"
                                    value={formik.values.lastName}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        formik.touched.lastName &&
                                            formik.errors.lastName
                                    )}
                                    helperText={
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                    }
                                />

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="DNI"
                                    name="dni"
                                    type="number"
                                    required
                                    variant="outlined"
                                    value={formik.values.dni}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        formik.touched.dni && formik.errors.dni
                                    )}
                                    helperText={
                                        formik.touched.dni && formik.errors.dni
                                    }
                                />

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Telefono"
                                    name="phone"
                                    type="number"
                                    variant="outlined"
                                    value={formik.values.phone}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        formik.touched.phone &&
                                            formik.errors.phone
                                    )}
                                    helperText={
                                        formik.touched.phone &&
                                        formik.errors.phone
                                    }
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Correo"
                                    type="email"
                                    name="email"
                                    required
                                    variant="outlined"
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        formik.touched.email &&
                                            formik.errors.email
                                    )}
                                    helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                    }
                                />

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Area de Trabajo"
                                    name="area"
                                    onChange={formik.handleChange}
                                    value={formik.values.area}
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    {areainput.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>

                                <Box sx={{ py: 2 }}>
                                    <Button
                                        margin="normal"
                                        color="primary"
                                        fullWidth
                                        disabled={formik.isSubmitting}
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Crear
                                    </Button>
                                </Box>

                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="error"
                                        fullWidth
                                        margin="normal"
                                        component={Link}
                                        to="/dashboard"
                                        variant="contained"
                                        ariant="outlined"
                                        size="large"
                                    >
                                        Regresar
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

export default NewEmployer;
