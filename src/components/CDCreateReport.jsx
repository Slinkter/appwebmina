import React, { useState } from "react";
// MUI
import { Container } from "@mui/material";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
// icon-generar reporte
import AssessmentIcon from "@mui/icons-material/Assessment";

function CDCreateReport(props) {
    const { btn_NewEmployer, label, metodo } = props;

    function handleNewEmployer() {
        btn_NewEmployer();
    }

    return (
        <React.Fragment>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Card sx={{ height: "100%" }} onClick={handleNewEmployer}>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            sx={{ justifyContent: "space-between" }}
                        >
                            <Grid item>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="overline"
                                >
                                    {label}
                                </Typography>
                                <Typography color="textPrimary" variant="h4">
                                    {metodo}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar
                                    sx={{
                                        backgroundColor: "error.main",
                                        height: 80,
                                        width: 80,
                                    }}
                                >
                                    <AssessmentIcon  sx={{ fontSize: 40 }} />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    );
}

export default CDCreateReport;
