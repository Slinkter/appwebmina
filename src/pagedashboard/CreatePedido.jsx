import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import UILoading from "../components/UILoading";
import DashboardWrapper from "../components/DashboardWrapper";
import {
    listenToEmployers,
    listenToProducts,
    saveOrderAndDecreaseStock,
} from "../firebase/firebase";
import { setEmployer, setEmployerLoading } from "../redux/employersSlice";
import { setProducts, setProductsLoading } from "../redux/productsSlice";
import { selectCurrentUser } from "../redux/authSlice";
import {
    addItemToOrder,
    removeItemFromOrder,
    setOrderEmployer,
    clearOrder,
} from "../redux/orderSlice";

//
import {
    Button,
    Box,
    Container,
    TextField,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

function CreatePedido() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Obtener datos del store de Redux
    const currentUser = useSelector(state => state.auth.user);
    
    const { items: employers, status: employersStatus } = useSelector((state) => state.employers  );
    const { items: products, status: productsStatus } = useSelector((state) => state.products );
    const { selectedEmployer, items: listItem } = useSelector((state) => state.order);

    // Estado local solo para los inputs del formulario
    const [currentSelectProduct, setCurrentSelectProduct] = useState(null);
    const [count, setCount] = useState("");

    useEffect(() => {
        // Iniciar listeners de Firebase en tiempo real
        dispatch(setProductsLoading());
        const unsubscribeProducts = listenToProducts((data) => {
            dispatch(setProducts(data));
        });

        dispatch(setEmployerLoading());
        const unsubscribeEmployers = listenToEmployers((data) => {
            dispatch(setEmployer(data));
        });
        // Limpiar listeners y el estado de la orden al salir del componente
        return () => {
            unsubscribeProducts();
            unsubscribeEmployers();
            dispatch(clearOrder());
        };
    }, [dispatch]);

    function handleAddItem() {
        const cantidad = parseInt(count);

        if (cantidad <= 0 || Number.isNaN(cantidad)) {
            alert("La cantidad debe ser un número mayor a cero.");
            setCount("");
            return;
        }

        if (cantidad > currentSelectProduct.cantidad) {
            alert("No hay suficiente stock disponible.");
            return;
        }

        // Create Item
        const newItem = {};
        newItem.docId = currentSelectProduct.docId;
        newItem.nameproduct = currentSelectProduct.nameproduct;
        newItem.cantidad = cantidad;

        dispatch(addItemToOrder(newItem));
        setCount("");
    }

    const handleSubmit = async () => {
        if (!selectedEmployer || listItem.length === 0) {
            alert(
                "Debe seleccionar un empleado y agregar al menos un producto."
            );
        } else {
            try {
                await saveOrderAndDecreaseStock({
                    userUID: currentUser.uid,
                    employerDocId: selectedEmployer.docId,
                    items: listItem,
                });
                alert("Orden guardada exitosamente");
                navigate("/dashboard");
            } catch (error) {
                console.error("Error al guardar la orden:", error);
                alert("Hubo un error al guardar la orden.");
            }
        }
    };

    const handleChangeEmployer = (e) => {
        const dni = parseInt(e.target.value);
        if (Number.isNaN(dni)) {
            dispatch(setOrderEmployer(null));
        } else {
            const employee = employers.find((employee) => employee.dni === dni);
            if (employee) {
                dispatch(setOrderEmployer(employee));
            } else {
                dispatch(setOrderEmployer(null));
            }
        }
    };

    const handleChangeProducto = (e) => {
        const docIdProducto = e.target.value;
        if (docIdProducto === "Selecione Producto") {
            setCurrentSelectProduct(null);
            return;
        }
        try {
            const productFound = products.find(
                (item) => item.docId === docIdProducto
            );
            if (!productFound) {
                setCurrentSelectProduct(null);
                setCount("");
            } else {
                setCurrentSelectProduct(productFound);
                setCount("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (item) => {
        // Eliminar el ítem de la lista de pedidos
        const updateList = listItem.filter((x) => x.docId !== item.docId);
       // setListItem(updateList);

        // Restaurar el producto seleccionado a su estado previo
        setCurrentSelectProduct(
            products.find((product) => product.docId === item.docId)
        );

        // Restaurar el campo "count" con la cantidad que tenía el producto antes de ser añadido
    };

    return (
        <DashboardWrapper>
            <Box
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
                            <form>
                                <Box sx={{ my: 3 }}>
                                    <Typography variant="h2">
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
                                    </Box>
                                </Box>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    select
                                    variant="standard"
                                    SelectProps={{ native: true }}
                                    onChange={handleChangeEmployer}
                                >
                                    {employers.length > 0
                                        ? employers.map((obj) => (
                                              <option
                                                  key={obj.docId}
                                                  value={obj.dni}
                                              >
                                                  {obj.dni
                                                      ? obj?.dni +
                                                        " : " +
                                                        obj?.firstName +
                                                        " " +
                                                        obj?.lastName
                                                      : "Selecione Empleado"}
                                              </option>
                                          ))
                                        : null}
                                </TextField>

                                <Box sx={{ py: 3 }}>
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
                                    </Box>
                                </Box>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="area"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="standard"
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
                                {/* mostrar stock*/}
                                {currentSelectProduct !== null ? (
                                    <TextField
                                        fullWidth
                                        disabled
                                        label={"Stock actual"}
                                        margin="normal"
                                        name="codigo"
                                        type="number"
                                        value={currentSelectProduct.cantidad}
                                        variant="outlined"
                                    />
                                ) : (
                                    <TextField
                                        label={"Stock actual"}
                                        fullWidth
                                        value={0}
                                        disabled
                                        margin="normal"
                                        type="number"
                                        variant="outlined"
                                    />
                                )}
                                {/* ingresar cantidad */}
                                {currentSelectProduct !== null ? (
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="cantidad"
                                        type="number"
                                        variant="outlined"
                                        label="Escribir cantidad"
                                        value={count}
                                        onChange={(e) =>
                                            setCount(e.target.value)
                                        }
                                    />
                                ) : (
                                    <TextField
                                        label="Escribir cantidad"
                                        fullWidth
                                        disabled
                                        margin="normal"
                                        name="codigo"
                                        value={0}
                                        type="number"
                                        variant="outlined"
                                    />
                                )}

                                {/*  <SelectTextFields /> */}

                                <Box sx={{ m: 1 }}>
                                    <Button
                                        fullWidth
                                        color="success"
                                        variant="contained"
                                        onClick={() => {
                                            handleAddItem();
                                        }}
                                    >
                                        Agregar
                                    </Button>
                                </Box>
                            </form>
                        </Container>

                        <Container maxWidth="sm">
                            <Box sx={{ py: 2 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        m: 0,
                                    }}
                                >
                                    <Typography sx={{ m: 1 }} variant="h4">
                                        Lista
                                    </Typography>
                                    <Box sx={{ m: 1 }}>
                                        <Button
                                            type="submit"
                                            color="warning"
                                            variant="contained"
                                            onClick={() => {}}
                                        >
                                            Limpiar
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            {/*  */}
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
                                    {listItem.map((item) => (
                                        <TableRow>
                                            <TableCell>
                                                {item.docId.substring(1, 4)}
                                            </TableCell>
                                            <TableCell>
                                                {item.nameproduct}
                                            </TableCell>
                                            <TableCell>
                                                {item.cantidad}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                    startIcon={
                                                        <DeleteIcon fontSize="small" />
                                                    }
                                                    sx={{ mr: 1 }}
                                                ></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </Button>
                            </Box>
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="error"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        navigate("/dashboard");
                                    }}
                                >
                                    Salir
                                </Button>
                            </Box>
                        </Container>
                    </CardContent>
                </Card>
                <Box>
                    <pre>{JSON.stringify(listItem, null, 2)}</pre>
                </Box>
            </Box>
        </DashboardWrapper>
    );
}

export default CreatePedido;
