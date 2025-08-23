import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI
import DashboardWrapper from "../components/DashboardWrapper";
import AuthProvider from "../components/AuthProvider";
import { Card, CardContent } from "@mui/material";
import { Box, Button, TextField } from "@mui/material";

import { Container, Typography, MenuItem } from "@mui/material";

import { addNewEmployer } from "../firebase/firebase";
import UILoading from "../components/UILoading";

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
        },
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
            area: Yup.string().required("Campo faltante"),
        }),
        onSubmit: (values) => {
            if (values.area === "s") {
                alert("Debe seleccionar una area");
            } else {
                /* values.createdAt = new Date().toISOString(); */
                values.createdAt = new Date().toLocaleString("sv");
                values.adminUid = currentUser.uid;
                saveEmployer(values);
                navigate("/dashboard");
                console.log(JSON.stringify(values, null, 2));
            }

            console.log(values);
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
                                required
                                variant="outlined"
                                value={formik.values.dni}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                    // Solo permitimos números en el campo del DNI
                                    const newValue = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    ); // Elimina cualquier carácter no numérico
                                    formik.setFieldValue("dni", newValue); // Actualiza el valor en el formulario
                                }}
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
                                    formik.touched.phone && formik.errors.phone
                                )}
                                helperText={
                                    formik.touched.phone && formik.errors.phone
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
                                    formik.touched.email && formik.errors.email
                                )}
                                helperText={
                                    formik.touched.email && formik.errors.email
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
                                {areas.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

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
