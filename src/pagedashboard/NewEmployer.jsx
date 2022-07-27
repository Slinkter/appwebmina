import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from "@mui/material";



function NewEmployer() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        country: "",
    });


    const states = [
        {
            value: "a1",
            label: "Area 1",
        },
        {
            value: "a2",
            label: "Area 2",
        },
        {
            value: "a3",
            label: "Area 3",
        },
    ];
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <DashboardWrapper>
            <h1>Creando nuevo empleado</h1>

            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Nombres"
                            name="firstName"
                            onChange={handleChange}
                            required
                            value={values.firstName}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Apellidos"
                            name="lastName"
                            onChange={handleChange}
                            required
                            value={values.lastName}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="DNI"
                            name="email"
                            onChange={handleChange}
                            required
                            value={values.email}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Telefono"
                            name="phone"
                            onChange={handleChange}
                            type="number"
                            value={values.phone}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Correo"
                            type="email"
                            name="country"
                            onChange={handleChange}
                            required
                            value={values.country}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Area de Trabajo"
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
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <Button
                            fullWidth
                            component={Link}
                            to="/dashboard"
                            variant="contained"
                            color="primary"
                        >
                            Crear
                        </Button>
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <Button
                            color="error"
                            fullWidth
                            component={Link}
                            to="/dashboard"
                            variant="contained"
                            ariant="outlined"
                        >
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </DashboardWrapper>
    );
}

export default NewEmployer;
