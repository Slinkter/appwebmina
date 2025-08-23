import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, Box, Button, Container, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import DashboardWrapper from "../components/DashboardWrapper";
import AuthProvider from "../components/AuthProvider";
import UILoading from "../components/UILoading";
import FormField from "../components/FormField";

import { addNewEmployer } from "../firebase/firebase";


const areas = [
 
    { value: "a1", label: "Area 1" },
    { value: "a2", label: "Area 2" },
    { value: "a3", label: "Area 3" },
];

function NewEmployer() {
    //
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    //
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            dni: "",
            phone: "",
            email: "",
            area: "",
        }, // Set initial value for area
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(25, "El límite es de 25 caracteres")
                .required("Campo faltante"),
            lastName: Yup.string()
                .max(25, "El límite es de 25 caracteres")
                .required("Campo faltante"),
            dni: Yup.string()
                .length(8, "El DNI debe tener exactamente 8 caracteres")
                .matches(
                    /^\d{8}$/,
                    "El DNI debe contener exactamente 8 números"
                ),
            phone: Yup.string()
                .matches(/^\d+$/, "El teléfono debe contener solo números")
                .required("Campo faltante"),
            email: Yup.string()
                .email("Correo electrónico inválido")
                .required("Campo faltante"),
            area: Yup.string().notOneOf(["s"], "Debe seleccionar un área").required("Campo faltante"), // Added validation for area
        }),
        onSubmit: (values) => {
            // values.createdAt = new Date().toISOString();
            values.createdAt = new Date().toLocaleString("sv");
            values.adminUid = currentUser.uid;
            saveEmployer(values);
            navigate("/dashboard");
            console.log(JSON.stringify(values, null, 2));
        },
    });

    async function saveEmployer(employer) {
        const rpta = await addNewEmployer(employer);
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
            <Card>
                <CardContent>
                    <Container maxWidth="sm">
                        <Box sx={{ pt: 2 }}>
                            <Typography color="textPrimary" variant="h4">
                                Crear empleado
                            </Typography>
                        </Box>
                        <form onSubmit={formik.handleSubmit}>
                            <FormField
                                name="firstName"
                                label="Nombres"
                                formik={formik}
                                required
                            />
                            <FormField
                                name="lastName"
                                label="Apellidos"
                                formik={formik}
                                required
                            />
                            <FormField
                                name="dni"
                                label="DNI"
                                formik={formik}
                                required
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/\D/g, "");
                                    formik.setFieldValue("dni", newValue);
                                }}
                            />
                            <FormField
                                name="phone"
                                label="Teléfono"
                                type="number"
                                formik={formik}
                            />
                            <FormField
                                name="email"
                                label="Correo"
                                type="email"
                                formik={formik}
                                required
                            />
                            <FormField
                                name="area"
                                label="Area de Trabajo"
                                
                                formik={formik}
                                select
                                options={areas}
                            />

                            <Box sx={{ py: 2 }}>
                                <Button
                                    margin="normal"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                >
                                    Crear
                                </Button>
                            </Box>

                            <Box sx={{ py: 2 }}>
                                <Button
                                    margin="normal"
                                    color="error"
                                    fullWidth
                                    component={Link}
                                    to="/dashboard"
                                    variant="outlined"
                                >
                                    Regresar
                                </Button>
                            </Box>
                        </form>
                    </Container>
                </CardContent>
            </Card>
        </DashboardWrapper>
    );
}

export default NewEmployer;
