import React from 'react'
import ReactDOM from 'react-dom/client'
import Pages from "./pages";
import theme from './theme';
import { ThemeProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Pages/>
    </ThemeProvider>
  </React.StrictMode>,
)
