// CardDashBoard.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { Box, SvgIcon } from "@mui/material";

// 💡 Nuevo prop: icon
const CardDashBoard = ({
    label,
    url,
    icon: IconComponent, // Renombramos el prop a IconComponent para que sea más claro
    backgroundColor = "#1976d2",
    hoverColor = "#0a2d50ff",
    ...props
}) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                minWidth: 200,
                marginTop: 2,
                backgroundColor: backgroundColor,
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    backgroundColor: hoverColor,
                    boxShadow: 6,
                },
            }}
            onClick={() => navigate(url)}
        >
            <CardActionArea sx={{ padding: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {/* 💡 Muestra el ícono si se proporciona */}
                    {IconComponent && (
                        <SvgIcon
                            component={IconComponent}
                            sx={{ fontSize: 60, color: "white" }}
                        />
                    )}
                    <CardContent sx={{ p: 0 }}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            color={"white"}
                            align="center"
                        >
                            {label}
                        </Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default CardDashBoard;
