import { useState, useEffect, useMemo, useRef } from "react";
import { Box, Paper, Avatar, SxProps } from "@mui/material";
import FlexCenter from "components/FlexCenter";
import icons from "components/icons";
import generateNotListed from "utils/generateNotListed";
import shuffleArray from "utils/shuffleArray";
import Flipable from "components/Flipable";
import PancakeWhite from "assets/icons/pancake-white.svg";

type GameProps = {
  mode: string;
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

export default function Game({ mode }: GameProps) {
  const [grid, setGrid] = useState<GridProps[]>([]);
  const area = useMemo(() => Math.round(Math.sqrt(grid.length)), [grid]);
  const previousCard = useRef<GridProps | null>(null);
  const previousTimeout = useRef<number>(-1);

  useEffect(() => {
    let count = 0;
    switch (mode) {
      case "Easy":
        count = 16;
        break;
      case "Medium":
        count = 25;
        break;
      case "Hard":
        count = 49;
        break;
      case "Extreme":
        count = 64;
        break;
    }

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

  const setGridRevealed = (id: number, isRevealed: boolean) => {
    setGrid((grid) =>
      grid.map((cell) => (cell.id === id ? { ...cell, isRevealed } : cell))
    );
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

    const { current } = previousCard;
    setGridRevealed(item.id, true);

    if (current && current.path === item.path && current.isRevealed) {
      if (previousTimeout.current) {
        clearTimeout(previousTimeout.current);
        setGridRevealed(current.id, true);
      }
      setPaired(current.id, item.id);
      console.log("------Paired width ", current);
      return;
    }

    previousCard.current = { ...item, isRevealed: true };
    previousTimeout.current = setTimeout(() => {
      previousCard.current = { ...item, isRevealed: false };
      setGridRevealed(item.id, false);
    }, 1000);
  };

  return (
    <>
      <FlexCenter>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${area}, 1fr)`,
            gridTemplateRows: `repeat(${area}, 1fr)`,
            width: { xs: "90vw", md: 480, xl: 700 },
            height: { xs: "90vw", md: 480, xl: 700 },
            gap: "0.2rem",
          }}
        >
          {grid.map((item) => (
            <Paper>
              <Flipable
                flipSpeed={0.18}
                width="100%"
                height="100%"
                flip={item.isRevealed}
                front={
                  <Cell
                    imagePath={item.path}
                    item={item}
                    onClick={itemClicked}
                    sx={{ bgcolor: "secondary.main" }}
                  />
                }
                back={
                  <Cell
                    imagePath={item.path}
                    item={item}
                    onClick={itemClicked}
                    sx={{ bgcolor: "primary.main" }}
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
