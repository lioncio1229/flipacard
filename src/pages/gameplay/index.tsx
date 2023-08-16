import { useSearchParams } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Home, Replay } from "@mui/icons-material";
import FlexSpaceBetween from "components/FlexSpaceBetween";
import { useTheme } from "@mui/material";
import FoodBg from "assets/foods-bg.jpg";

function StatusIndicator({ name, value }: { name: string; value: string }) {
  return (
    <div>
      <Typography
        fontSize="1rem"
        variant="caption"
        color="secondary"
        fontWeight={700}
      >{`${name}:`}</Typography>
      <Typography
        fontSize="1rem"
        variant="caption"
        color="primary"
        fontWeight={700}
      >
        {value}
      </Typography>
    </div>
  );
}

export default function Gameplay() {
  const theme = useTheme();
  const [params] = useSearchParams();

  return (
    <>
      <AppBar color="transparent" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <FlexSpaceBetween sx={{ gap: theme.spacing(3) }}>
              <Button
                startIcon={<Home color="secondary" />}
                variant="contained"
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.main",
                  borderRadius: "2rem",
                  boxShadow: "0 4px 0 rgba(0, 0, 0, 0.25)",
                  fontWeight: 700,
                }}
              >
                Main Menu
              </Button>
              <Button
                startIcon={<Replay color="secondary" />}
                variant="contained"
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.main",
                  borderRadius: "2rem",
                  boxShadow: "0 4px 0 rgba(0, 0, 0, 0.25)",
                  fontWeight: 700,
                }}
              >
                Restart
              </Button>
            </FlexSpaceBetween>
            <FlexSpaceBetween sx={{ gap: theme.spacing(7) }}>
              <StatusIndicator
                name={`High Score (${params.get("mode")})`}
                value="20"
              />
              <StatusIndicator name={"Remaining Cards"} value="20" />
            </FlexSpaceBetween>
          </Toolbar>
        </Container>
      </AppBar>
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
