import React from "react";
// MUI
import { Card, CardContent } from "@mui/material";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

function CDCreateEmployer(props) {
    const { btn_NewEmployer, label, metodo } = props;

    function handleNewEmployer() {
        btn_NewEmployer();
    }

    return (
        <>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Card sx={{ height: "100%" }} onClick={handleNewEmployer}>
                    <CardContent>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
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
                                    <GroupAddIcon sx={{ fontSize: 40 }} />
                                </Avatar>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}

export default CDCreateEmployer;
