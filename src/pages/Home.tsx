import { Paper, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import FlexSpaceBetween from "components/FlexSpaceBetween";

export default function Home() {
  return (
    <>
      <Paper elevation={1} square sx={{ height: "100vh" }}>
        <FlexSpaceBetween>
          <Typography variant="h4" color="primary" fontWeight="fontWeightBold">
            FlipaCard
          </Typography>
          <GitHub color="primary" fontSize="large" />
        </FlexSpaceBetween>
      </Paper>
    </>
  );
}
