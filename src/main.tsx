import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import Pages from "./pages";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Pages />
    </ThemeProvider>
  </React.StrictMode>
);
