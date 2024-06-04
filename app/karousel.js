"use client";

import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const COLORS = ['#F44336', '#4CAF50', '#2196F3', '#FFEB3B'];

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Sistem Informasi', value: 30 },
                { name: 'Teknik Industri', value: 25 },
                { name: 'Teknik Elektro', value: 20 },
                { name: 'Informatika', value: 25 },
            ],
        };
    }

    render() {
        return (
            <Carousel>
                <Item data={this.state.data} colors={COLORS} />
            </Carousel>
        );
    }
}

class Item extends Component {
    componentDidMount() {
        this.drawPieChart();
    }

    drawPieChart = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const radius = canvas.height / 2 - 20;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        let currentAngle = -0.5 * Math.PI;
        this.props.data.forEach((data, index) => {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(
                centerX,
                centerY,
                radius,
                currentAngle,
                currentAngle + (data.value / 100) * 2 * Math.PI,
                false
            );
            ctx.fillStyle = this.props.colors[index];
            ctx.fill();
            currentAngle += (data.value / 100) * 2 * Math.PI;
        });
    };

    render() {
        return (
            <Paper>
                <h2>Program Studi Member</h2>
                <canvas ref="canvas" width={400} height={400} />
                <ul>
                    {this.props.data.map((data, index) => (
                        <li key={index}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: this.props.colors[index],
                                    marginRight: '5px',
                                }}
                            ></span>
                            {data.name}
                        </li>
                    ))}
                </ul>
            </Paper>
        );
    }
}

export default Example;