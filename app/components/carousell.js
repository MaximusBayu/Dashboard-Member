"use client";

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Typography, Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const items = [
    {
        name: "Nama Member 1",
        photoUrl: "https://via.placeholder.com/150",
    },
    {
        name: "Nama Member 2",
        photoUrl: "https://via.placeholder.com/150",
    },
    {
        name: "Nama Member 3",
        photoUrl: "https://via.placeholder.com/150",
    },
];

function PhotoCarousel() {
    return (
        <Carousel
            next={(next, active) => (
                <IconButton
                    onClick={next}
                    style={{
                        top: '50%',
                        right: '5px',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2,
                        fontSize: '0.8rem',
                    }}
                >
                    <ArrowForwardIosIcon fontSize="inherit" />
                </IconButton>
            )}
            prev={(prev, active) => (
                <IconButton
                    onClick={prev}
                    style={{
                        top: '50%',
                        left: '5px',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2,
                        fontSize: '0.8rem',
                    }}
                >
                    <ArrowBackIosIcon fontSize="inherit" />
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
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            padding="10px"
            textAlign="center"
        >
            <img
                src={props.item.photoUrl}
                alt={props.item.name}
                style={{ width: '100px', borderRadius: '4px', marginBottom: '10px' }}
            />
            <Typography variant="subtitle1">{props.item.name}</Typography>
        </Box>
    );
}

export default PhotoCarousel;