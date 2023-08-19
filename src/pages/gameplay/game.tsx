import { useState, useEffect, useRef } from "react";
import { Box, Paper, Avatar, SxProps } from "@mui/material";
import FlexCenter from "components/FlexCenter";
import icons from "components/icons";
import generateNotListed from "utils/generateNotListed";
import shuffleArray from "utils/shuffleArray";
import Flipable from "components/Flipable";
import PancakeWhite from "assets/icons/pancake-white.svg";
import { ModeProps } from "config/config";

type GameProps = {
  mode: ModeProps;
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
  const previousCard = useRef<GridProps | null>(null);
  const previousTimeout = useRef<number>(-1);
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

  const setGridRevealed = (
    id: number,
    isRevealed: boolean
  ): GridProps | null => {
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

    const { current } = previousCard;
    const newItem = setGridRevealed(item.id, true);

    console.log("-----------------------------------");
    console.log("item: ", newItem);
    console.log("previous: ", current);

    if (
      current &&
      newItem &&
      current.path === newItem.path &&
      current.id !== newItem.id
    ) {
      if (previousTimeout.current) {
        clearTimeout(previousTimeout.current);
        setGridRevealed(current.id, true);
        console.log("previoustimeout: ", previousTimeout.current);
        console.log("cleared");
      }
      setPaired(current.id, newItem.id);
      console.log("------Paired width ", current);
      return;
    }

    previousCard.current = newItem;
    previousTimeout.current = setTimeout(() => {
      setGridRevealed(item.id, false);
      previousCard.current = null;
    }, 1070);
  };

  return (
    <>
      <FlexCenter>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            width: { xs: "90vw", md: 480, xl: 700 },
            height: { xs: "90vw", md: 480, xl: 700 },
            gap: "0.2rem",
          }}
        >
          {grid.map((item) => (
            <Paper key={item.id}>
              <Flipable
                flipspeed={0.15}
                width="100%"
                height="100%"
                flip={item.isRevealed}
                front={
                  <Cell
                    imagePath={PancakeWhite}
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
