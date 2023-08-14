import { Paper, Button, useTheme } from "@mui/material";
import Flipable from "components/Flipable";

import { useState } from "react";

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
  const [flip, setFlip] = useState(false);

  return (
    <Flipable
      front={
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setFlip(!flip)}
          sx={{ border: "1px solid white", mt: "8rem" }}
        >
          Play
        </Button>
      }
      back={
        <Menu
          modes={["Easy", "Medium", "Hard", "Extreme"]}
          onClick={() => setFlip(!flip)}
        />
      }
      flip={flip}
      width={300}
      height={400}
    />
  );
}
