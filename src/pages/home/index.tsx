import { Paper, Typography, Container } from "@mui/material";

import FoodBg from "assets/foods-bg.jpg";
import FlipableMenu from "./FlipableMenu";
import FlexCenter from "components/FlexCenter";
import RandomIcons from "components/RandomIcons";

export default function Home() {
  return (
    <>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          color="primary"
          fontWeight="fontWeightBold"
          sx={{
            "& .MuiTypography": {
              paddingTop: "20px",
            },
          }}
        >
          FlipaCard
        </Typography>
      </Container>
      <RandomIcons />
      <FlexCenter sx={{ height: "calc(100% - 140px)" }}>
        <FlipableMenu />
      </FlexCenter>
      <Paper
        elevation={1}
        square
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${FoodBg})`,
          opacity: "0.1",
          zIndex: -2,
        }}
      ></Paper>
    </>
  );
}
