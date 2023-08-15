import { useState, useEffect, useRef } from "react";
import {
  Paper,
  Button,
  useTheme,
  Stack,
  Avatar,
  Box,
  styled,
} from "@mui/material";
import Flipable from "components/Flipable";
import { Link } from "react-router-dom";
import Cat from "assets/icons/cat.svg";
import Fries from "assets/icons/fries.svg";
import Pancake from "assets/icons/pancake.svg";
import { CSSTransition } from "react-transition-group";

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

const StyledStack = styled(Stack)`
  position: absolute;
  top: 3rem;

  &.icons-top-enter-active {
    top: 3rem;
  }
  &.icons-top-enter-done {
    top: -4.5rem;
    transition: top 0.5s;
  }
  &.icons-top-exit-active {
    top: -4.5rem;
  }
  &.icons-top-exit-done {
    top: 3rem;
    transition: top 0.5s;
  }
`;

const StyledStackBottom = styled(Stack)`
  position: absolute;
  bottom: 3.5rem;

  &.icons-bottom-enter-active {
    bottom: 3.5rem;
  }
  &.icons-bottom-enter-done {
    bottom: -4.5rem;
    transition: bottom 0.5s;
  }
  &.icons-bottom-exit-active {
    bottom: -4.5rem;
  }
  &.icons-bottom-exit-done {
    bottom: 3.5rem;
    transition: bottom 0.5s;
  }
`;

const icons: string[] = [Cat, Fries, Pancake];

export default function FlipableMenu() {
  const [flip, setFlip] = useState<boolean>(false);
  const [stickers, setStickers] = useState<string[]>([]);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const flipableRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (e.target !== flipableRef.current && e.target !== buttonRef.current) {
        setFlip(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  useEffect(() => {
    const state: string[] = Array(10)
      .fill("")
      .map((_) => {
        const index = Math.abs(Math.round(Math.random() * (icons.length - 1)));
        return icons[index];
      });
    setStickers(state);
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <CSSTransition
        in={flip}
        classNames="icons-top"
        timeout={0}
        nodeRef={topRef}
      >
        <StyledStack ref={topRef} gap="1.55rem" direction="row">
          {stickers.slice(0, 5).map((sticker) => (
            <Avatar src={sticker} variant="square" />
          ))}
        </StyledStack>
      </CSSTransition>

      <CSSTransition
        in={flip}
        classNames="icons-bottom"
        timeout={0}
        nodeRef={bottomRef}
      >
        <StyledStackBottom ref={bottomRef} gap="1.55rem" direction="row">
          {stickers.slice(5, 10).map((sticker) => (
            <Avatar src={sticker} variant="square" />
          ))}
        </StyledStackBottom>
      </CSSTransition>

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
        height={320}
      />
    </Box>
  );
}
