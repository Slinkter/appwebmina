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
import { getProducts, updatePlusStock } from "../firebase/firebase";

function UpdateStock() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentSelectProduct, setCurrentSelectProduct] = useState({});
    //

    useEffect(() => {
        getAllProducts();

        async function getAllProducts() {
            try {
                const ref2 = await getProducts();
                setProducts(ref2);
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
            const docId = currentSelectProduct.docId;
            const stock = currentSelectProduct.cantidad;
            const cantidad = values.cantidad;

            console.log(
                "docId : ",
                docId,
                "stock:",
                stock,
                "cantidad:",
                cantidad
            );

            updatePlusStockProduct(docId, stock, cantidad);
            navigate("/dashboard");
        },
    });

    async function updatePlusStockProduct(docId, currentStock, cantidad) {
        await updatePlusStock(docId, cantidad);
    }

    const handleChangeProducto = (e) => {
        // recibirl del options solo el docIdproducto
        const docIdProduct = e.target.value;
        // obtener el producto por docId
        const productFound = products.filter((item) => {
            if (item.docId === docIdProduct) {
                return item;
            }
            return null;
        });
        console.log(productFound);

        if (productFound.length === 1) {
            setCurrentSelectProduct(productFound[0]);
            formik.values.cantidad = 0;
        } else {
            setCurrentSelectProduct(null);
            formik.values.cantidad = 0;
        }
    };

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
                                    margin="normal"
                                    fullWidth
                                    name="area"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
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

                                {/* mostrar el stock */}
                                {currentSelectProduct !== null ? (
                                    <TextField
                                        helperText={"Stock actual select"}
                                        fullWidth
                                        disabled
                                        margin="normal"
                                        name="stock"
                                        type="number"
                                        value={currentSelectProduct.cantidad}
                                        variant="outlined"
                                    />
                                ) : (
                                    <TextField
                                        helperText={"Stock actual nulll"}
                                        fullWidth
                                        disabled
                                        margin="normal"
                                        name="stock"
                                        type="number"
                                        value={0}
                                        variant="outlined"
                                    />
                                )}

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
                                    label="Cantidad a aumentar + "
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
