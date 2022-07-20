import React from "react";
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardWrapper from "../components/DashboardWrapper";
import { useNavigate } from "react-router-dom";

function ErrorView() {

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate("/")
    };


    return (
        <DashboardWrapper>

            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,

                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="h1"
                        >
                            404
                        </Typography>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle2"
                        >
                            Esta pagina no existe
                        </Typography>

                        <NextLink
                            href="/"
                            passHref
                        >
                            <Button
                                type="submit"
                                onClick={handleOnClick}
                                component="a"
                                startIcon={(<ArrowBackIcon fontSize="small" />)}
                                sx={{ mt: 3 }}
                                variant="contained"
                            >
                                regresar
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
        </DashboardWrapper>
    );
}

export default ErrorView;
