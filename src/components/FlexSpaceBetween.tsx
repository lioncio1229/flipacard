import { Box } from "@mui/material";

export default function FlexSpaceBetween({
  children,
}: {
  children: JSX.Element[];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
