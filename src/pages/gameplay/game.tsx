import { useState, useEffect, useMemo } from "react";
import { Box, Paper, Avatar } from "@mui/material";
import FlexCenter from "components/FlexCenter";
import icons from "components/icons";
import generateNotListed from "utils/generateNotListed";
import shuffleArray from "utils/shuffleArray";
import Flipable from "components/Flipable";

type GameProps = {
  mode: string;
};

type GridProps = {
  name: string;
  isRevealed: boolean;
};

export default function Game({ mode }: GameProps) {
  const [grid, setGrid] = useState<GridProps[]>([]);
  const area = useMemo(() => Math.round(Math.sqrt(grid.length)), [grid]);

  useEffect(() => {
    let count = 0;
    switch (mode) {
      case "Easy":
        count = 12;
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
      name: icon,
      isRevealed: false,
    }));

    const remappedCopy = [...remapped];
    remapped.forEach((item) => {
      remappedCopy.push(item);
    });

    setGrid(shuffleArray<GridProps>(remappedCopy));
  }, []);

  const itemClicked = (item: GridProps) => {
    console.log("item: ", item);
    const gridCopy = grid.map((v) =>
      v.name === item.name ? { ...item, isRevealed: true } : v
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
            <Paper square sx={{ bgcolor: "secondary.main" }}>
              <Flipable
                flip={item.isRevealed}
                front={
                  <Avatar onClick={() => itemClicked(item)} src={item.name} />
                }
                back={<Box bgcolor="white">Hello</Box>}
              />
            </Paper>
          ))}
        </Box>
      </FlexCenter>
    </>
  );
}
