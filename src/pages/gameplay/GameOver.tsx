import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home, Replay } from "@mui/icons-material";
import ReactConfetti from "react-confetti";
import FlexCenter from "components/FlexCenter";
import StatusIndicator from "components/StatusIndicator";

export type GameOverInfo = {
  isWinner: boolean;
  yourScore: string;
  isNewHighscore: boolean;
};

type GameOverProps = {
  gameOverInfo: GameOverInfo;
};

export default function GameOver({
  gameOverInfo: { isWinner, yourScore, isNewHighscore },
}: GameOverProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(255, 255, 255, 0.8)",
        zIndex: 30,
      }}
    >
      {isWinner && isNewHighscore && (
        <ReactConfetti
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
      <FlexCenter sx={{ height: "100%", flexDirection: "column", gap: "1rem" }}>
        <Typography
          variant="h3"
          fontWeight={700}
          color={isWinner ? "success.light" : "error.main"}
        >
          {isWinner ? "YOU WON!" : "YOU LOSE😂"}
        </Typography>
        {isNewHighscore && (
          <Typography color="success.light" fontSize={14} fontWeight={600}>
            New High Score!
          </Typography>
        )}
        {isWinner && <StatusIndicator name="Your Score" value={yourScore} />}
        <FlexCenter sx={{ gap: "1rem" }}>
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
            onClick={() => navigate("/")}
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
            onClick={() => location.reload()}
          >
            Play Again
          </Button>
        </FlexCenter>
      </FlexCenter>
    </Box>
  );
}
