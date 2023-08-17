import { useState, useEffect, useMemo } from "react";
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
  id: number,
  path: string;
  isRevealed: boolean;
};

type CellProps = {
  imagePath: string,
  item: GridProps,
  onClick: (item: GridProps) => void,
  sx?: SxProps,
}

function Cell({sx, imagePath, item, onClick} : CellProps){
  return (
    <FlexCenter sx={{width: "100%", height: "100%", cursor: 'pointer', ...sx}} onClick={() => onClick(item)}>
      <Avatar src={imagePath} sx={{width: "55%", height: "auto"}} />
    </FlexCenter>
  )
}

export default function Game({ mode }: GameProps) {
  const [grid, setGrid] = useState<GridProps[]>([]);
  const area = useMemo(() => Math.round(Math.sqrt(grid.length)), [grid]);

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
    const remapped: GridProps[] = _icons.map(icon => ({
      id: -1,
      path: icon,
      isRevealed: false,
    }));

    let remappedCopy = [...remapped, ...remapped];
    remappedCopy = remappedCopy.map((item, id) => ({...item, id}));

    setGrid(shuffleArray<GridProps>(remappedCopy));
  }, []);

  const itemClicked = (item: GridProps) => {
    const gridCopy = grid.map((v) =>
      v.id === item.id ? { ...item, isRevealed: true } : v
    );

    setGrid(gridCopy);
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
                width="100%"
                height="100%"
                flip={item.isRevealed}
                front={<Cell imagePath={PancakeWhite} item={item} onClick={itemClicked} sx={{bgcolor: "secondary.main"}}/>}
                back={
                  <Cell imagePath={item.path} item={item} onClick={itemClicked} sx={{bgcolor: "primary.main"}}/>
                }
              />
            </Paper>
          ))}
        </Box>
      </FlexCenter>
    </>
  );
}
