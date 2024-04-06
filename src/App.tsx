import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import {
  ThemeProvider,
  AppBar,
  CssBaseline,
  Link,
  Toolbar,
  createTheme,
  Typography,
} from '@mui/material';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { teal } from '@mui/material/colors';

const HeaderLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link component={RouterLink} to={to} variant="button" color="inherit" sx={{ my: 1, mx: 1.5 }}>
    {children}
  </Link>
);
const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#96000f',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <LiveTvOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            The Movies LIST
          </Typography>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar>

      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
