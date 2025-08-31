import {
    Box,
    Button,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";

const CardPedido = ({ listOrder, handleBtnExport }) => {
    return (
        <>
            {listOrder?.map((item) => {
                return (
                    <Box
                        key={item.docId}
                        sx={{
                            width: { xs: "100%", md: "600px" },
                            border: "1px solid red",
                            mt: 1,
                            mb: 1,
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                                transform: "translateY(-1px)",
                                boxShadow: 4,
                            },
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Box>
                                    <Box
                                        sx={{
                                            m: 1,
                                            p: 1,
                                            gap: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            borderBottom={"1px solid red"}
                                        >
                                            Fecha : {item.createdAt}
                                        </Typography>
                                        <Typography>
                                            Admin : {item.nameAdmin}
                                        </Typography>
                                        <Typography>
                                            Empleado : {item.nameEmployer}
                                        </Typography>
                                    </Box>
                                    <Table id={`table_${item.docId}`}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Cod.</TableCell>
                                                <TableCell>Prod.</TableCell>
                                                <TableCell>Cant.</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {item.items.map((item) => {
                                                return (
                                                    <TableRow key={item.docId}>
                                                        <TableCell>
                                                            {item.docId.substring(
                                                                1,
                                                                4
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.nameproduct}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.cantidad}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Box>
                                <Box
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                >
                                    <Button
                                        sx={{
                                            mt: 2,
                                            mb: 2,
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "auto",
                                            },
                                        }}
                                        margin="normal"
                                        color="success"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        onClick={() =>
                                            handleBtnExport(
                                                `table_${item.docId}`
                                            )
                                        }
                                    >
                                        Export a Excel
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                );
            })}
        </>
    );
};

export default CardPedido;
