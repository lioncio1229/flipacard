import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppBar, Container, Toolbar, Paper } from "@mui/material";
import { Home, Replay } from "@mui/icons-material";
import Game from "./Game";
import FlexSpaceBetween from "components/FlexSpaceBetween";
import CustomButton from "components/CustomButton";
import { useTheme } from "@mui/material";
import FoodBg from "assets/foods-bg.jpg";
import { modes } from "config/config.json";
import RandomIcons from "components/RandomIcons";
import StatusIndicator from "components/StatusIndicator";
import GameOver, { GameOverInfo } from "./GameOver";
import { CountdownTimeDelta, zeroPad } from "react-countdown";

type HighScore = {
  timeRemaining: number;
  timeRemainingFormatted: string;
};

export default function Gameplay() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const modeName = params.get("mode");
  const mode = modes.find((mode) => mode.name === modeName);
  const [gameOverInfo, setGameOverInfo] = useState<GameOverInfo | null>(null);

  const highScoreStr: string | null = localStorage.getItem(`hs-${mode?.name}`);

  let highScore: HighScore | null = null;
  if (highScoreStr) {
    highScore = JSON.parse(highScoreStr) as HighScore;
  }

  const handleGameOver = (
    isWinner: boolean,
    timeDelta: CountdownTimeDelta | null
  ) => {
    if (!timeDelta) return;
    const { minutes, seconds, total } = timeDelta;
    const timeRemaining = `${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
    let isNewHighscore = false;

    if (
      isWinner &&
      (!highScore || (highScore && total > highScore.timeRemaining))
    ) {
      isNewHighscore = true;
      const newHighScore: HighScore = {
        timeRemaining: total,
        timeRemainingFormatted: timeRemaining.toString(),
      };
      localStorage.setItem(`hs-${mode?.name}`, JSON.stringify(newHighScore));
    }
    setGameOverInfo({
      isWinner,
      isNewHighscore,
      yourScore: timeRemaining,
    });
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
              <CustomButton
                startIcon={<Home color="secondary" />}
                variant="contained"
                onClick={() => navigate("/")}
              >
                Main Menu
              </CustomButton>
              <CustomButton
                startIcon={<Replay color="secondary" />}
                variant="contained"
                onClick={() => location.reload()}
              >
                Restart
              </CustomButton>
            </FlexSpaceBetween>
            {highScore && (
              <StatusIndicator
                name={`High Score (${mode?.name})`}
                value={highScore.timeRemainingFormatted}
              />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {gameOverInfo && <GameOver gameOverInfo={gameOverInfo} />}
      {!gameOverInfo && <RandomIcons />}

      <Container maxWidth="xl">
        {mode && (
          <Game
            mode={mode}
            duration={mode.duration}
            onGameOver={handleGameOver}
          />
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
          zIndex: -2,
        }}
      ></Paper>
    </>
  );
}
