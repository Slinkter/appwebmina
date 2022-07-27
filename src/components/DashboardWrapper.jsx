import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "../style/ContainerWrapper.css";
//MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Grid, Button } from "@mui/material";

export default function DashboardWrapper(props) {
    const { children } = props;
    return (
        <React.Fragment>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{
                    borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button
                            variant="text"
                            component={RouterLink}
                            to="/dashboard"
                            sx={{ my: 1, mx: 2 }}
                        >
                            Menu
                        </Button>

                        <Button
                            component={RouterLink}
                            to="/dashboard/profile"
                            variant="text"
                            sx={{ my: 1, mx: 2 }}
                        >
                            Perfil
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/signout"
                            variant="text"
                            sx={{ my: 1, mx: 2 }}
                        >
                            Salir
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>

            <div className="containerWrapper">{children}</div>
        </React.Fragment>
    );
}
