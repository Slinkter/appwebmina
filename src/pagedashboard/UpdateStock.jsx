import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function UpdateStock() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nameproduct: "",
            currentAmout: "",

            codigo: "",
        },
        validationSchema: Yup.object({
            nameproduct: Yup.string().max(150).required("campo faltante "),
            currentAmout: Yup.string().max(150).required("campo faltante "),

            codigo: Yup.string().max(150).required("campo faltante"),
        }),
        onSubmit: (values) => {
            // agregar uid
            // agregar fecha
            console.log(JSON.stringify(values, null, 2));
            navigate("/dashboard");
        },
    });
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
                                <Box sx={{ my: 3 }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h4"
                                    >
                                        Actualizar inventario stock producto
                                    </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(
                                        formik.touched.nameproduct &&
                                            formik.errors.nameproduct
                                    )}
                                    fullWidth
                                    helperText={
                                        formik.touched.nameproduct &&
                                        formik.errors.nameproduct
                                    }
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
                                    label="Actual Cantidad"
                                    disabled
                                    margin="normal"
                                    name="currentAmout"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.currentAmout}
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
                                    name="codigo"
                                    type="number"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    variant="outlined"
                                />

                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        disabled={formik.isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign Up Now
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

export default UpdateStock;
