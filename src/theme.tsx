import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#E8F9FF",
      main: "#2B8FAE",
      dark: "#155a68",
    },
    secondary: {
      light: "#ffa518",
      main: "#FF7A0D",
      dark: "#b95300",
    },
  },
  spacing: [0, 2, 4, 8, 12, 14, 16, 32, 64],
});

export default theme;
