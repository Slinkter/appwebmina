import React from "react";
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
        onSubmit: () => {
            navigate("/dashboard");
        },
    });

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
                            <Typography color="textPrimary" variant="h4">
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
