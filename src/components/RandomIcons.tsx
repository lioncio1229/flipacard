import { useRef, useEffect, useState } from "react";
import { Box, Avatar } from "@mui/material";
import generateNotListed from "utils/generateNotListed";
import icons from "./icons";

type Icons = {
  src: string;
  top: string;
  left: string;
  size: string;
};

export default function RandomIcons() {
  const nodeRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<Icons[] | null>(null);

  useEffect(() => {
    const { current } = nodeRef;
    if (!current) return;
    const _icons: string[] = [];

    for (let i = 0; i < 10; i++) {
      const icon = generateNotListed(_icons, icons);
      _icons.push(icon);
    }

    const _pos: Icons[] = _icons.map((icon) => {
      const top: string =
        Math.round(Math.random() * current.clientHeight) + "px";
      const left: string = Math.round(Math.random() * 100) + "vw";

      const size: string = Math.max(40, Math.round(Math.random() * 100)) + "px";

      return { src: icon, top, left, size };
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
      }}
    >
      {pos?.map((icon) => (
        <Avatar
          key={icon.src}
          variant="square"
          src={icon.src}
          sx={{
            position: "absolute",
            top: icon.top,
            left: icon.left,
            width: icon.size,
            height: "auto",
          }}
        />
      ))}
    </Box>
  );
}
