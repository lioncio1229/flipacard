import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Paper, Avatar, SxProps } from "@mui/material";
import FlexCenter from "components/FlexCenter";
import icons from "components/icons";
import generateNotListed from "utils/generateNotListed";
import shuffleArray from "utils/shuffleArray";
import Flipable from "components/Flipable";
import PancakeWhite from "assets/icons/pancake-white.svg";
import { ModeProps } from "config/config";
import { showcards } from "config/config.json";
import Timer from "components/Timer";

type GameProps = {
  mode: ModeProps;
  timeout: number;
};

type GridProps = {
  id: number;
  path: string;
  isRevealed: boolean;
  isPaired: boolean;
};

type CellProps = {
  imagePath: string;
  item: GridProps;
  onClick: (item: GridProps) => void;
  sx?: SxProps;
};

function Cell({ sx, imagePath, item, onClick }: CellProps) {
  return (
    <FlexCenter
      sx={{ width: "100%", height: "100%", cursor: "pointer", ...sx }}
      onClick={() => onClick(item)}
    >
      <Avatar src={imagePath} sx={{ width: "55%", height: "auto" }} />
    </FlexCenter>
  );
}

export default function Game({ mode, timeout }: GameProps) {
  const [grid, setGrid] = useState<GridProps[]>([]);
  const isWon = useRef<boolean>(false);
  const currentCard = useRef<GridProps | null>(null);
  const previousCard = useRef<GridProps | null>(null);
  const previousTimeout = useRef<number>(-1);
  const wrongMoveTimeout = useRef<number>(-1);
  const { rows, cols } = mode;

  useEffect(() => {
    const count = rows * cols;
    if (count > icons.length)
      throw new Error("Icons is not enough for the current mode");

    const _icons: string[] = [];

    for (let i = 0; i < count / 2; i++) {
      const icon = generateNotListed(_icons, icons);
      _icons.push(icon);
    }
    const remapped: GridProps[] = _icons.map((icon) => ({
      id: -1,
      path: icon,
      isRevealed: false,
      isPaired: false,
    }));

    let remappedCopy = [...remapped, ...remapped];
    remappedCopy = remappedCopy.map((item, id) => ({ ...item, id }));

    setGrid(shuffleArray<GridProps>(remappedCopy));
  }, []);

  useEffect(() => {
    if (grid.length === 0) return;
    const allPaired = grid.every((item) => item.isPaired === true);
    if (allPaired) {
      isWon.current = true;
      console.log("You Won!");
    }
  }, [grid]);

  const gameOver = useCallback(() => {
    if (isWon.current) return;
    console.log("Game Over!");
  }, []);

  const revealCard = (id: number, isRevealed: boolean): GridProps | null => {
    let modified = null;
    setGrid((grid) => {
      const _grid = grid.map((cell) =>
        cell.id === id ? { ...cell, isRevealed } : cell
      );
      modified = _grid.find((v) => v.id === id);
      return _grid;
    });
    return modified;
  };

  const setPaired = (...ids: number[]) => {
    setGrid((grid) =>
      grid.map((cell) =>
        ids.includes(cell.id) ? { ...cell, isPaired: true } : cell
      )
    );
  };

  const itemClicked = (item: GridProps) => {
    if (item.isPaired) return;

    if (currentCard.current && previousCard.current) {
      if (wrongMoveTimeout) clearTimeout(wrongMoveTimeout.current);
      revealCard(currentCard.current.id, false);
      revealCard(previousCard.current.id, false);
      currentCard.current = null;
      previousCard.current = null;
    }

    const { current: previous } = previousCard;
    const _item = revealCard(item.id, true);

    if (previous && previous.isRevealed && _item) {
      currentCard.current = _item;

      if (previousTimeout.current) clearTimeout(previousTimeout.current);

      const previousId = previous.id;
      const currentId = _item.id;

      if (previousId !== currentId && previous.path === _item.path) {
        revealCard(previousId, true);
        setPaired(previousId, currentId);
        previousCard.current = null;
        currentCard.current = null;
      } else {
        wrongMoveTimeout.current = setTimeout(() => {
          revealCard(currentId, false);
          revealCard(previousId, false);
          previousCard.current = null;
          currentCard.current = null;
        }, 350);
      }
      return;
    }

    previousCard.current = _item;
    previousTimeout.current = setTimeout(() => {
      revealCard(item.id, false);
      previousCard.current = null;
    }, 700);
  };

  return (
    <>
      <Timer duration={timeout} onComplete={gameOver} />
      <FlexCenter sx={{ mt: "1rem" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            width: { xs: "90vw", md: 480, xl: 700 },
            height: { xs: "90vw", md: 480, xl: 700 },
            gap: "0.3rem",
          }}
        >
          {grid.map((item) => (
            <Paper key={item.id} elevation={3}>
              <Flipable
                flipspeed={0.15}
                width="100%"
                height="100%"
                flip={item.isRevealed}
                front={
                  <Cell
                    imagePath={showcards ? item.path : PancakeWhite}
                    item={item}
                    onClick={itemClicked}
                    sx={{
                      bgcolor: "secondary.main",
                      transition: "all 0.2s",

                      "&:hover .MuiAvatar-root": {
                        transition: "all 0.15s",
                        width: "60%",
                        height: "auto",
                      },
                      "&:hover": {
                        bgcolor: "secondary.dark",
                      },
                    }}
                  />
                }
                back={
                  <Cell
                    imagePath={item.path}
                    item={item}
                    onClick={itemClicked}
                    sx={{ bgcolor: item.isPaired ? "primary.main" : "#fff" }}
                  />
                }
              />
            </Paper>
          ))}
        </Box>
      </FlexCenter>
    </>
  );
}
