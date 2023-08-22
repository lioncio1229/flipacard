import { useRef, useEffect, useState } from "react";
import { Box, Avatar, keyframes } from "@mui/material";
import generateNotListed from "utils/generateNotListed";
import icons from "./icons";

type Icons = {
  src: string;
  top: number;
  left: number;
  size: number;
  animDelay: number;
};

const upAndDown = keyframes`
    from{
        transform: translate(0);
    }
    to{
        transform: translateY(-40px);
    }
`;

export default function RandomIcons() {
  const nodeRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<Icons[] | null>(null);

  useEffect(() => {
    const { current } = nodeRef;
    if (!current) return;

    const iconCount: number = 10;
    const _icons: string[] = [];

    for (let i = 0; i < iconCount; i++) {
      const icon = generateNotListed(_icons, icons);
      _icons.push(icon);
    }

    const _pos: Icons[] = _icons.map((icon) => {
      const top: number = Math.round(Math.random() * current.clientHeight);
      const left: number = Math.round(Math.random() * 100);
      const size: number = Math.max(30, Math.round(Math.random() * 80));
      const animDelay: number = Math.random() * 1.2;

      return { src: icon, top, left, size, animDelay };
    });

    setPos(_pos);
  }, []);

  return (
    <Box
      ref={nodeRef}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      {pos?.map((icon) => (
        <Avatar
          key={icon.src}
          variant="square"
          src={icon.src}
          sx={{
            position: "absolute",
            top: icon.top + "px",
            left: icon.left + "vw",
            width: icon.size,
            height: "auto",
            animation: `${upAndDown} 3s ease-in-out ${icon.animDelay}s infinite alternate`,
            filter: `blur(${(10 / icon.size) * 2}px) grayscale(${
              (10 / icon.size) * 1.2
            })`,
          }}
        />
      ))}
    </Box>
  );
}
