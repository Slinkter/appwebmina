import "./App.css";
import * as React from "react";

//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

// end MUI

function App() {
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
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    ></Typography>

                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        color="primary"
                    >
                        Login 2
                    </Button>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container
                disableGutters
                maxWidth="sm"
                component="main"
                sx={{ pt: 8, pb: 6 }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Inventario
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    demo de inventario
                    <br></br>
                    <Link to="/login">Continuar</Link>
                </Typography>
            </Container>
            {/* End hero unit */}

            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            ></Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default App;
