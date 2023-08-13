import { Paper, Typography, useTheme } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import FlexSpaceBetween from "components/FlexSpaceBetween";
import FoodBg from "assets/foods-bg.jpg";
import FlipableButton from "components/FlipableButton";

export default function Home() {
  const { spacing } = useTheme();

  return (
    <>
      <FlexSpaceBetween sx={{ pt: spacing(2), pb: spacing(2) }}>
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
        <GitHub color="primary" fontSize="large" />
      </FlexSpaceBetween>
      <FlipableButton />
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
          zIndex: -1,
        }}
      ></Paper>
    </>
  );
}
