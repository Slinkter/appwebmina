import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";

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

function CreatePedido() {
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

    //

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCustomerIds.indexOf(id);
        let newSelectedCustomerIds = [];

        if (selectedIndex === -1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds,
                id
            );
        } else if (selectedIndex === 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(1)
            );
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, selectedIndex),
                selectedCustomerIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
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
                            error={Boolean(
                                formik.touched.nameproduct &&
                                    formik.errors.nameproduct
                            )}
                            fullWidth
                            helperText={
                                formik.touched.nameproduct &&
                                formik.errors.nameproduct
                            }
                            label="Codigo de empleado"
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
                            label="Nombre del empleado"
                            disabled
                            margin="normal"
                            name="detail"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.detail}
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
                            error={Boolean(
                                formik.touched.category &&
                                    formik.errors.category
                            )}
                            fullWidth
                            helperText={
                                formik.touched.category &&
                                formik.errors.category
                            }
                            label="Codigo de producto"
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
                            label="nombre del producto"
                            disabled
                            margin="normal"
                            name="codigo"
                            type="number"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
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
                            disabled
                            margin="normal"
                            name="codigo"
                            type="number"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
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
                            disabled={formik.isSubmitting}
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
