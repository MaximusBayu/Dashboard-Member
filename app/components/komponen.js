"use client";

import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Box, IconButton, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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

const COLORS = ["#8BC34A", "#F44336", "#2196F3", "#FFEB3B"];

const KomponenPage = () => {
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/get`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.response)) {
          setMemberCount(data.response.length);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the member data!", error);
      });
  }, []);

  return (
    <div>
      <div style={{ textAlign: "start", marginBottom: "20px", fontWeight: "bold" }}>
        <h1>Halo Admin,</h1>
        <h1>Selamat Datang di Dashboard Member Humic Engineering</h1>
      </div>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <PhotoCarousel />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoMember />
        </Grid>
        <Grid item xs={12} md={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              textAlign: "center",
              background: "#f5f5f5",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              Jumlah Member Humic
            </Typography>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              {memberCount}
            </Typography>
            <Typography variant="subtitle1" style={{ color: "gray" }}>
              member
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

function PhotoCarousel() {
  return (
    <Carousel
      next={(next, active) => (
        <IconButton
          onClick={next}
          style={{
            top: "50%",
            right: "5px",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            fontSize: "0.8rem",
          }}
        >
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
      )}
      prev={(prev, active) => (
        <IconButton
          onClick={prev}
          style={{
            top: "50%",
            left: "5px",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            fontSize: "0.8rem",
          }}
        >
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
      )}
    >
      {items.map((item, i) => (
        <PhotoCarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
}

function PhotoCarouselItem(props) {
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
        style={{ width: "100px", borderRadius: "4px", marginBottom: "10px" }}
      />
      <Typography variant="subtitle1">{props.item.name}</Typography>
    </Box>
  );
}

class InfoMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Teknik Industri", value: 27 },
        { name: "Sistem Informasi", value: 36 },
        { name: "Teknik Elektro", value: 20 },
        { name: "Informatika", value: 17 },
      ],
    };
  }

  render() {
    return (
      <Carousel>
        <PieChartItem data={this.state.data} colors={COLORS} />
      </Carousel>
    );
  }
}

class PieChartItem extends React.Component {
  componentDidMount() {
    this.drawPieChart();
  }

  drawPieChart = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
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
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          margin: "auto",
          width: "250px",
        }}
      >
        <h2 style={{ fontSize: "14px" }}>Program Studi Member</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <canvas ref="canvas" width={150} height={150} />
        </div>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            listStyleType: "none",
            padding: 0,
            fontSize: "10px",
          }}
        >
          {this.props.data.map((data, index) => (
            <li key={index} style={{ margin: "0 5px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  backgroundColor: this.props.colors[index],
                  marginRight: "3px",
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

export default KomponenPage;
