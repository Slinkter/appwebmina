import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const CardDashBoard = ({ label, url }) => {

    const navigate = useNavigate()

    return (
        <Card sx={{ minWidth: 300 }}  onClick={() => navigate(url)}>
            <CardActionArea>
          
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                       {label}
                    </Typography>
               
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardDashBoard