import { Box } from "@mui/material";
import { SxProps } from "@mui/system";

type Props = {
  children?: string | JSX.Element | JSX.Element[];
  sx?: SxProps;
};

export default function FlexCenter({ children, sx = {} }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
