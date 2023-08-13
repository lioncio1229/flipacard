import { Box } from "@mui/material";
import { SxProps } from "@mui/system";

type Props = {
  children: JSX.Element[];
  sx: SxProps;
};

export default function FlexSpaceBetween({
  children,
  sx = {},
}: Partial<Props>) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
