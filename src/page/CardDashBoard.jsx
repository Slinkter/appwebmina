import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

const CardDashBoard = ({ label, url }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                minWidth: 345,
                marginTop: 2,
                background: "#1976d2",
                "&:hover": {
                    backgroundColor: "#0a2d50ff", // color al hacer hover
                    boxShadow: 6, // sombra al hacer hover
                },
            }}
            onClick={() => navigate(url)}
        >
            <CardActionArea>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={"white"}
                    >
                        {label}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardDashBoard;
