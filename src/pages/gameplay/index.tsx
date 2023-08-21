import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { Home, Replay } from "@mui/icons-material";
import Game from "./Game";
import FlexSpaceBetween from "components/FlexSpaceBetween";
import { useTheme } from "@mui/material";
import FoodBg from "assets/foods-bg.jpg";
import { modes } from "config/config.json";
import RandomIcons from "components/RandomIcons";
import StatusIndicator from "components/StatusIndicator";
import GameOver from "./GameOver";

type GameOverInfoProps = { isWinner: boolean; timeRemaining: number };

export default function Gameplay() {
  const theme = useTheme();
  const [params] = useSearchParams();
  const modeName = params.get("mode");
  const mode = modes.find((mode) => mode.name === modeName);
  const [gameOverInfo, setGameOverInfo] = useState<GameOverInfoProps | null>(
    null
  );

  const handleGameOver = (isWinner: boolean, timeRemaining: number) => {
    setGameOverInfo({ isWinner, timeRemaining });
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              gap: "1rem",
              mt: { xs: "1.5rem", md: 0 },
              mb: { xs: "1.5rem", md: 0 },
            }}
          >
            <FlexSpaceBetween
              sx={{
                gap: theme.spacing(2),
              }}
            >
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
              <StatusIndicator name={`High Score (${mode?.name})`} value="20" />
            </FlexSpaceBetween>
          </Toolbar>
        </Container>
      </AppBar>
      {gameOverInfo && <GameOver isWinner={gameOverInfo.isWinner} />}
      {!gameOverInfo && <RandomIcons />}

      <Container maxWidth="xl">
        {mode && (
          <Game mode={mode} timeout={60 * 1000} onGameOver={handleGameOver} />
        )}
      </Container>

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
