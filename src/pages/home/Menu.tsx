import { useState, useEffect, useRef } from "react";
import { Paper, Button, useTheme } from "@mui/material";
import Flipable from "components/Flipable";
import { Link } from "react-router-dom";

type MenuProps = {
  modes: string[];
  onClick?: (mode: string) => void;
};

function Menu({ modes, onClick }: MenuProps) {
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={{
        width: "14rem",
        p: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: theme.spacing(7),
      }}
    >
      {modes.map((mode) => (
        <Button
          key={mode}
          component={Link}
          to="/iloveyou"
          onClick={() => onClick?.(mode)}
          sx={{
            bgcolor: "primary.light",
            borderRadius: "2rem",
            pl: "3rem",
            pr: "3rem",
            boxShadow: "0 4px 0 rgba(0, 0, 0, 0.25)",
            fontSize: "1em",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {mode}
        </Button>
      ))}
    </Paper>
  );
}

export default function FlipableMenu() {
  const [flip, setFlip] = useState<boolean>(false);
  const flipableRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      if (e.target !== flipableRef.current && e.target !== buttonRef.current) {
        setFlip(false);
      }
    });
  });

  return (
    <Flipable
      ref={flipableRef}
      front={
        <Button
          ref={buttonRef}
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setFlip(true)}
          sx={{
            border: "1px solid white",
            mt: "8rem",
          }}
        >
          Play
        </Button>
      }
      back={<Menu modes={["Easy", "Medium", "Hard", "Extreme"]} />}
      flip={flip}
      width={300}
      height={400}
    />
  );
}
