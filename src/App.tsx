import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import Switcher from './components/Switcher/Switcher';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d1fb9b',
    },
    secondary: {
      main: '#32ac6d',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Switcher />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
