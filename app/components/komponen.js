import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Box, IconButton, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const COLORS = ["#8BC34A", "#F44336", "#2196F3", "#FFEB3B"];

const KomponenPage = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [programStudiData, setProgramStudiData] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/get`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.response)) {
          const fakultasCount = data.response.reduce((acc, member) => {
            if (member.fakultas) {
              acc[member.fakultas] = (acc[member.fakultas] || 0) + 1;
            }
            return acc;
          }, {});

          const fakultasData = Object.entries(fakultasCount)
            .filter(([name, value]) => name !== null)
            .map(([name, value]) => ({
              name,
              value,
            }));

          setMemberCount(data.response.length);
          setProgramStudiData(fakultasData);

          // Randomly select up to 5 members with photos
          const membersWithPhotos = data.response.filter(member => member.foto);
          const shuffledMembers = membersWithPhotos.sort(() => 0.5 - Math.random());
          const selectedMembers = shuffledMembers.slice(0, Math.min(5, shuffledMembers.length));

          const carouselItems = selectedMembers.map(member => ({
            name: member.nama,
            photoUrl: member.foto,
          }));
          setCarouselItems(carouselItems);
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
          <PhotoCarousel items={carouselItems} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoMember data={programStudiData} />
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

function PhotoCarousel({ items }) {
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
      {items.slice(0, 5).map((item, i) => (
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
        style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }}
      />
      <Typography variant="subtitle1">{props.item.name}</Typography>
    </Box>
  );
}

class InfoMember extends React.Component {
  componentDidMount() {
    this.drawPieChart();
  }

  componentDidUpdate() {
    this.drawPieChart();
  }

  drawPieChart = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const radius = canvas.height / 3 - 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let totalValue = this.props.data.reduce((acc, data) => acc + data.value, 0);
    let currentAngle = -0.5 * Math.PI;

    this.props.data.forEach((data, index) => {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + (data.value / totalValue) * 2 * Math.PI,
        false
      );
      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fill();
      currentAngle += (data.value / totalValue) * 2 * Math.PI;
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
        <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>Program Studi Member</h2>
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
                  backgroundColor: COLORS[index % COLORS.length],
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
