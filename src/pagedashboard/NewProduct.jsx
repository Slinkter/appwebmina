import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Style } from "@mui/icons-material";

function NewProduct() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nameproduct: "",
            detail: "",
            category: "",
            codigo: "",
        },
        validationSchema: Yup.object({
            nameproduct: Yup.string().max(150).required("campo faltante "),
            detail: Yup.string().max(150).required("campo faltante "),
            category: Yup.string().max(150).required("campo faltante"),
            codigo: Yup.string().max(150).required("campo faltante"),
        }),
        onSubmit: (values) => {
            // agregar uid
            // agregar fecha
            console.log(JSON.stringify(values, null, 2));
            navigate("/dashboard");
        },
    });

    const states = [
        {
            value: "C1",
            label: "Categoria 1",
        },
        {
            value: "C2",
            label: "Categoria 2",
        },
        {
            value: "C3",
            label: "Categoria 3",
        },
    ];

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        country: "",
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
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
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h3">
                                Crear un Producto
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
                            label="Codigo Producto"
                            margin="normal"
                            name="nameproduct"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.nameproduct}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(
                                formik.touched.detail && formik.errors.detail
                            )}
                            fullWidth
                            helperText={
                                formik.touched.detail && formik.errors.detail
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
                            margin="normal"
                            fullWidth
                            label="Categoria"
                            name="state"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.state}
                            variant="outlined"
                        >
                            {states.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

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
                            hidden={true}
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
            </Box>
        </DashboardWrapper>
    );
}

export default NewProduct;
