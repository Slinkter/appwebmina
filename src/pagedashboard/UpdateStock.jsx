import React, { useEffect, useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../firebase/firebase";

function UpdateStock() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    //

    useEffect(() => {
        getAllProducts();

        async function getAllProducts() {
            try {
                const ref2 = await getProducts();
                console.log(ref2);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            cantidad: 0,
        },
        validationSchema: Yup.object({
            cantidad: Yup.number()
                .max(9999, "el limite es 4 digitos ")
                .positive()
                .required("campo faltante"),
        }),
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            /*   navigate("/dashboard"); */
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
                                    fullWidth
                                    label="Nombre Producto"
                                    margin="normal"
                                    name="nameproduct"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="stock actual"
                                    disabled
                                    margin="normal"
                                    name="currentAmout"
                                    type="text"
                                    variant="outlined"
                                />

                                <TextField
                                    error={Boolean(
                                        formik.touched.cantidad &&
                                            formik.errors.cantidad
                                    )}
                                    fullWidth
                                    helperText={
                                        formik.touched.cantidad &&
                                        formik.errors.cantidad
                                    }
                                    label="Cantidad"
                                    margin="normal"
                                    name="cantidad"
                                    type="number"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.cantidad}
                                    variant="outlined"
                                />

                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Actualizar
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
