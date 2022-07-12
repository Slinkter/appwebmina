import "./App.css";
import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
// end MUI

function App() {
    return (
        <React.Fragment>
            <Container component="main">
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Typography
                        component="h3"
                        variant="h3"
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
                        margin="normal"
                        gutterBottom
                    >
                        demo de inventario
                    </Typography>

                    <Box sx={{ py: 2 }}>
                        <Button
                            fullWidth
                            size="large"
                            component={Link}
                            to="/login"
                            variant="contained"
                            color="primary"
                            margin="normal"
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default App;
