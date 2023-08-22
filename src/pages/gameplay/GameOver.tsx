import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home, Replay } from "@mui/icons-material";
import ReactConfetti from "react-confetti";
import FlexCenter from "components/FlexCenter";

type GameOverProps = {
  isWinner: boolean;
};

export default function GameOver({ isWinner }: GameOverProps) {
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
      {isWinner && (
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
            onClick={() => navigate('/')}
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
