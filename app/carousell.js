"use client";

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const items = [
    {
        name: "Nama Member 1",
        photoUrl: "https://via.placeholder.com/150", // Update with actual photo URLs
    },
    {
        name: "Nama Member 2",
        photoUrl: "https://via.placeholder.com/150", // Update with actual photo URLs
    },
    {
        name: "Nama Member 3",
        photoUrl: "https://via.placeholder.com/150", // Update with actual photo URLs
    },
];

function PhotoCarousel() {
    return (
        <Carousel
            next={(next, active) => (
                <IconButton
                    onClick={next}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2,
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            )}
            prev={(prev, active) => (
                <IconButton
                    onClick={prev}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2,
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            )}
        >
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props) {
    return (
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <img src={props.item.photoUrl} alt={props.item.name} style={{ width: '150px', borderRadius: '4px', marginBottom: '10px' }} />
                <Typography variant="h6">{props.item.name}</Typography>
            </Box>
        </Paper>
    );
}

export default PhotoCarousel;
