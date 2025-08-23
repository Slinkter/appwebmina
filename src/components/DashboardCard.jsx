import React from "react";
import { Card, CardContent, Avatar, Grid, Typography } from "@mui/material";

function DashboardCard({ 
    onClick, 
    label, 
    value, 
    Icon,
    backgroundColor = "error.main",
    iconSize = 40,
    avatarSize = 80 
}) {
    return (
        <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card sx={{ height: "100%" }} onClick={onClick}>
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
                                {value}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar
                                sx={{
                                    backgroundColor,
                                    height: avatarSize,
                                    width: avatarSize,
                                }}
                            >
                                <Icon sx={{ fontSize: iconSize }} />
                            </Avatar>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default DashboardCard;
