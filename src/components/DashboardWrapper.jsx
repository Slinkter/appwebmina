import React from "react";
import { Link as RouterLink } from "react-router-dom";

import "../style/ContainerWrapper.css";

//MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";

export default function DashboardWrapper(props) {
    const { children } = props;
    return (
        <React.Fragment >
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
                        <Link
                            component={RouterLink}
                            to="/dashboard"
                            variant="contained"
                            color="primary"
                            sx={{ my: 1, mx: 2 }}
                        >
                            Dashboard
                        </Link>

                        <Link
                            component={RouterLink}
                            to="/dashboard/profile"
                            variant="contained"
                            color="primary"
                            sx={{ my: 1, mx: 2 }}
                        >
                            Profile
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/signout"
                            variant="contained"
                            color="primary"
                            sx={{ my: 1, mx: 2 }}
                        >
                            Signout
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>

            <div className="containerWrapper">{children}</div>
        </React.Fragment>
    );
}
