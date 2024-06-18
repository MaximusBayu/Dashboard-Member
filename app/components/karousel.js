"use client";

import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const COLORS = ['#8BC34A', '#F44336', '#2196F3', '#FFEB3B'];

class InfoMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Teknik Industri', value: 27 },
                { name: 'Sistem Informasi', value: 36 },
                { name: 'Teknik Elektro', value: 20 },
                { name: 'Informatika', value: 17 },
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
        const radius = canvas.height / 3 - 10;
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
            <div style={{ textAlign: 'center', padding: '10px', margin: 'auto', width: '250px' }}>
                <h2 style={{ fontSize: '14px' }}>Program Studi Member</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <canvas ref="canvas" width={150} height={150} />
                </div>
                <ul style={{ display: 'flex', justifyContent: 'center', listStyleType: 'none', padding: 0, fontSize: '10px' }}>
                    {this.props.data.map((data, index) => (
                        <li key={index} style={{ margin: '0 5px' }}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: this.props.colors[index],
                                    marginRight: '3px',
                                }}
                            ></span>
                            {data.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default InfoMember;
